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
      <partial :name="content"></partial>
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
  import Vue from 'vue';
  import Attachment from './Attachment.vue';
  import marked from 'marked';

  export default {
    props: ['item'],

    data() {
      return {
        content: 'empty'
      }
    },

    partials: {
      empty: '<template></template>'
    },

    compiled() {
      let x = this.item.content;
      let parts = x.split(/(!\[.*?,.*?,.*?,.*?\])/);
      for (let i in parts) {
        if (i % 2 === 0) {
          if (parts[i] !== '') {
            parts[i] = marked(parts[i], { breaks: true, sanitize: true });
          }
        } else {
          let m = parts[i].match(/!\[(.*?),(.*?),(.*?),(.*?)\]/);
          parts[i] = `<Attachment name="${m[1]}" size="${m[2]}" type="${m[3]}" key="${m[4]}"></Attachment>`;
        }
      }
      Vue.partial(this.item.id, parts.join(''));
      this.content = this.item.id;
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
    },

    components: {
      Attachment
    }
  }
</script>
