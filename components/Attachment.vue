<template>
  <img :src="src" id="{{id}}" data-key="{{key}}" v-if="isImage">

  <p class="down button" title="{{name}}" @click="download" v-else>
    {{name}} {{size}}
    <i class="delete" title="DELETE" @click.stop="del">X</i>
    <i id="{{id}}" class="progress"></i>
  </p>
</template>

<script lang="babel">
  import {get} from '../utils/http';

  export default {
    props: ['name', 'size', 'type', 'key'],

    data() {
      return {
        src: ''
      };
    },

    computed: {
      id() {
        return this.key.split('/')[1];
      },
      isImage() {
        if (this.type.split('/')[0] === 'image') {
          get({
            key: this.key,
            arrayBuffer: true,
            success: data => {
              let blob = new Blob([data], {'type': this.type});
              this.src = URL.createObjectURL(blob);
            },
          });
          return true;
        } else {
          return false;
        }
      },
    },

    methods: {
      download() {
        let key = this.key;
        let type = this.type;
        let name = this.name;
        let progress = document.getElementById(this.id);
        get({
          key,
          progress,
          arrayBuffer: true,
          success: data => {
            let blob = new Blob([data], { type });
            let objecturl = URL.createObjectURL(blob);

            // 生成下载
            let anchor = document.createElement('a');
            anchor.href = objecturl;

            // 新标签页打开
            // anchor.target = '_blank';

            // 直接下载
            anchor.download = name;

            document.body.appendChild(anchor);
            let evt = document.createEvent('MouseEvents');
            evt.initEvent('click', true, true);
            anchor.dispatchEvent(evt);
            document.body.removeChild(anchor);

            if (progress) {
              progress.value = 0;
            }
          },
        });
      },
      del() {
        this.$dispatch('del', this.key);
      },
    }
  }
</script>
