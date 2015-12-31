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
      <button type="button" @click="redo(item.id)" v-else>REDO</button>
    </nav>
  </div>
</template>


<script lang="babel">
  import marked from 'marked';

  export default {
    props: ['item'],

    computed: {
      content() {
        return marked(this.item.content, {
          breaks: true,
          sanitize: true,
        });
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
    }
  }

</script>
