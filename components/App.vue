<template>
  <Navbar @search="search" @add="add" @auth="auth" @sort="sort" @showAll="showAll"></Navbar>
  <tag></tag>
  <Callout v-for="item in list" :item="item" v-if="item.content | hasKeyword | hasTag" transition=""></Callout>
  <Editor :current="current" @save="save" v-show="" transition=""></Editor>
</template>


<script lang="babel">
  import Navbar from './Navbar.vue';
  import Callout from './Callout.vue';
  import Editor from './Editor.vue';

  export default {
    data: {
      todo: [{
        id: '',
        content: '',
        color: '',
        createTime: '',
        lastChange: '',
        status: false,
        tags: [],
      }],
      done: [],

      tagGroup: [],
      tag: '',
      keyWord: '',

      showAll: false,
      sortByCreateTime: false,

      current: {},
      currentIndex: 0,
    },

    computed: {
      list() {
        let out = [...this.todo];
        if (this.showAll) {
          out.concat(this.done);
        }
        if (this.sortByCreateTime) {

        } else {

        }
        return out;
      }
    },

    components: {
      Navbar,
      Callout,
      Editor,
    }

  }
</script>
