<style>
.image {
  display: inline-block;
  position: relative;
}
.file {
  cursor: auto;
  text-transform: none;
  margin-right: 1rem;
  background-color: rgba(255, 255, 255, 0.5);
}
.file:hover {
  background-color: rgba(255, 255, 255, 0.8);
}
.file:active {
  background-color: rgba(255, 255, 255, 0.6);
}
.ctrl {
  display: flex;
  position: absolute;
  top: 0;
  right: 0;
  cursor: pointer;
}
.ctrl .download, .ctrl .delete {
  height: 36px;
  width: 12px;
  text-align: center;
  line-height: 36px;
  font-size: 14px;
  color: rgba(255, 255, 255, 0);
  transition: all .5s linear;
}
.ctrl .download {
  background: rgba(119, 119, 119, 0.1);
}
.ctrl .delete {
  background: rgba(236, 88, 64, 0.1);

}
.ctrl .download:hover {
  width: 48px;
  color: rgba(255, 255, 255, 1);
  background: rgba(119, 119, 119, 0.9);
}
.ctrl .delete:hover {
  width: 36px;
  color: rgba(255, 255, 255, 1);
  background: rgba(236, 88, 64, 0.9);
}
video {
  max-width: 100%;
}
</style>

<template>
  <p class="image" v-if="isImage">
    <img :src="src" v-if="mtype === 'img'">
    <video :src="src" controls v-if="mtype === 'video'">
    </video>
    <partial name="ctrl"></partial>
  </p>

  <p class="file button" v-else>
    {{name}} {{size}}
    <partial name="ctrl"></partial>
    <i id="{{id}}" class="progress"></i>
  </p>
</template>

<script lang="babel">
  import {get} from '../utils/http'

  export default {
    props: ['name', 'size', 'type', 'key'],

    data() {
      return {
        mtype: '',
        src: ''
      }
    },

    partials: {
      ctrl: `<span class="ctrl">
        <i class="download" title="DOWNLOAD" @click="down">DOWN</i>
        <i class="delete" title="DELETE" @click="del">DEL</i>
      </span>`
    },

    computed: {
      id() {
        return this.key.split('/')[1]
      },
      isImage() {
        if (this.type.match(/jpeg|icon|png|gif/)) {
          this.mtype = 'img'
          this.load()
          return true
        } else if (this.type.match(/mp4/)) {
          this.mtype = 'video'
          this.load()
          return true
        } else {
          return false
        }
      },
    },

    methods: {
      load() {
        get({
          key: this.key,
          buf: true,
        }).then(data => {
            let blob = new Blob([data], {'type': this.type})
            this.src = URL.createObjectURL(blob)
          })
      },
      down() {
        let key = this.key
        let type = this.type
        let name = this.name
        let progress = document.getElementById(this.id)
        get({
          key,
          progress,
          buf: true,
        }).then(data => {
            let blob = new Blob([data], { type })
            let objecturl = URL.createObjectURL(blob)

            // 生成下载
            let anchor = document.createElement('a')
            anchor.href = objecturl

            // 新标签页打开
            // anchor.target = '_blank'

            // 直接下载
            anchor.download = name

            document.body.appendChild(anchor)
            let evt = document.createEvent('MouseEvents')
            evt.initEvent('click', true, true)
            anchor.dispatchEvent(evt)
            document.body.removeChild(anchor)

            if (progress) {
              progress.value = 0
            }
          })
      },
      del() {
        this.$dispatch('del', this.key)
      },
    }
  }
</script>
