<style>
.card {
  display: flex;
  flex-direction: column;
  background: #fff;
  border-radius: 2px;
  box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 3px 1px -2px rgba(0, 0, 0, 0.2), 0 1px 5px 0 rgba(0, 0, 0, 0.12);
  margin: 1rem 0;
}
.card section {
  padding: 16px;
}
.card nav {
  border-top: 1px solid rgba(0,0,0,.1);
}
.card nav span {
  padding: 0 16px;
  line-height: 36px;
}
.card img {
  border: 4px solid rgba(255, 255, 255, 0.5);
  transition: border .5s ease;
}
.card img:hover {
  border: 4px solid rgba(255, 255, 255, 0.8);
}
.down {
  text-transform: none;
  margin-right: 1rem;
  background-color: rgba(255, 255, 255, 0.5);
}
.down:hover {
  background-color: rgba(255, 255, 255, 0.8);
}
.down:active {
  background-color: rgba(255, 255, 255, 0.6);
}
.down .delete {
  position: absolute;
  height: 100%;
  width: 12px;
  top: 0;
  right: 0;
  color: rgba(255, 255, 255, 0);
  background: rgba(236, 88, 64, 0.2);
  transition: all .5s linear;
}
.down .delete:hover {
  width: 24px;
  color: rgba(255, 255, 255, 1);
  background: rgba(236, 88, 64, 0.8);
}
.remove {
  color: rgba(255, 0, 0, 0.8);
}
</style>

<template>
  <div class="row {{item.color}} card">
    <section>
      {{{content}}}
    </section>
    <nav>
      <span class="item">{{new Date(item.lastChange).toDateString()}}</span>
      <template v-if="!item.complete">
        <button type="button" @click="edit(item.id)">EDIT</button>
        <button type="button" @click="done(item.id)">DONE</button>
      </template>
      <template v-else>
        <button type="button" class="remove" @click="rm(item.id)">DELETE</button>
        <button type="button" @click="redo(item.id)">REDO</button>
      </template>
    </nav>
  </div>
</template>


<script lang="babel">
  import marked from 'marked';
  import {get} from '../utils/http';

  export default {
    props: ['item'],

    computed: {
      content() {
        let x = this.item.content;
        let parts = x.split(/(!\[.*?,.*?,.*?,.*?\])/);
        for (let i in parts) {
          if (i % 2 === 0) {
            if (parts[i] !== '') {
              parts[i] = marked(parts[i], {
                breaks: true,
                sanitize: true,
              });
            }
          } else {
            let m = parts[i].match(/!\[(.*?),(.*?),(.*?),(.*?)\]/);
            let file = {
              name: m[1],
              size: m[2],
              type: m[3],
              key: m[4],
            };

            let id = file.key.split('/')[1];
            if (file.type.split('/')[0] === 'image') {
              get({
                key: file.key,
                arrayBuffer: true,
                success: data => {
                  let blob = new Blob([data], {'type': file.type});
                  document.getElementById(id).src = URL.createObjectURL(blob);
                },
              });
              parts[i] = `<img src="" id="${id}" data-key="${file.key}">`;
            } else {
              parts[i] = `
              <span class="down button" title="${file.name}" onclick="download('${file.name}','${file.type}','${file.key}')">
                ${file.name} ${file.size}
                <i class="delete" title="DELETE" onclick="event.stopPropagation();console.log('delete');">X</i>
                <i id="${id}" class="progress"></i>
              </span>`;
            }
          }
        }
        return parts.join('');
      }
    },

    methods: {
      edit(id) {
        this.$dispatch('edit', id);
      },
      done(id) {
        this.$dispatch('done', id);
      },
      redo(id) {
        this.$dispatch('done', id);
      },
      rm(id) {
        this.$dispatch('rm', id);
      },
    }
  }

  // function download(name, type, key) {
  //   let id = key.split('/')[1];
  //   let progress = document.getElementById(id);
  //   get({
  //     key,
  //     progress,
  //     arrayBuffer: true,
  //     success: data => {
  //       let blob = new Blob([data], { type });
  //       let objecturl = URL.createObjectURL(blob);
  //
  //       // 生成下载
  //       let anchor = document.createElement('a');
  //       anchor.href = objecturl;
  //
  //       // 新标签页打开
  //       // anchor.target = '_blank';
  //
  //       // 直接下载
  //       anchor.download = name;
  //
  //       document.body.appendChild(anchor);
  //       let evt = document.createEvent('MouseEvents');
  //       evt.initEvent('click', true, true);
  //       anchor.dispatchEvent(evt);
  //       document.body.removeChild(anchor);
  //
  //       if (progress) {
  //         progress.value = 0;
  //       }
  //     },
  //   });
  // }

</script>
