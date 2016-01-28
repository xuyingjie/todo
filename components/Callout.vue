<style>
.card {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
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
</style>

<template>
  <div class="row card">
    <section>
      <img :src="src" v-for="src in img">
      {{{item.text}}}
    </section>
    <nav>
      <span class="item">{{new Date(item.lastChange).toDateString()}}</span>
      <button type="button" @click="edit(item.id)">EDIT</button>
    </nav>
  </div>
</template>


<script lang="babel">
  import marked from 'marked'
  import { url, dns, get, decStr } from '../tools'

  export default {
    props: ['id'],

    data() {
      return {
        item: {
          id: '',
          img: [],
          text: '',
          lastChange: '',
        }
      }
    },
    computed: {
      img() {
        return this.item.img.map(id => `${dns}/img/${id}@.webp`)
      }
    },

    compiled() {
      get(`set/${this.id}`).then(out => {
        decStr(out.text).then(str => {
          out.text = marked(str, { breaks: true, sanitize: true })
          this.item = out
        })
      })
    },

    methods: {
      edit(id) {
        this.$dispatch('edit', id)
      }
    }
  }
</script>
