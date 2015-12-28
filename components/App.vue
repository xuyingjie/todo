<style>
  .space-between {
    display: flex;
    justify-content: space-between;
  }
  .middle {
    display: flex;
    align-items: center;
  }

</style>


<template>
  <Navbar :status="status" @search="search" @add="add" @auth="auth" @sort="sort" @all="all"></Navbar>

  <div class="row">
    <div class="large-12 columns">
      <Tag></Tag>
      <Callout v-for="item in list" :item="item" @edit="edit" v-if="item.content | hasKeyword | hasTag"></Callout>
    </div>
  </div>

  <Editor :current="current" @save="save" v-show="status.edit"></Editor>
</template>


<script lang="babel">
  import Navbar from './Navbar.vue';
  import Tag from './Tag.vue';
  import Callout from './Callout.vue';
  import Editor from './Editor.vue';

  export default {
    data() {
      return {
        todo: [{
          id: '123',
          content: 'todo',
          createTime: '',
          lastChange: '',
          color: 'primary',
          tags: ['vue', 'js'],
          complete: false,
        }],
        done: [{
          id: '345',
          content: 'done',
          createTime: '',
          lastChange: '',
          color: 'success',
          tags: ['vue'],
          complete: true,
        }],

        tagGroup: [],
        tag: '',
        keyWord: '',

        status: {
          auth: true,
          edit: false,
          showAll: false,
          sortByCreateTime: false,
        },

        current: {},
      };
    },

    computed: {
      list() {
        let out = [...this.todo];
        if (this.status.showAll) {
          out = out.concat(this.done);
        }
        if (this.status.sortByCreateTime) {
          console.log('sortByCreateTime');
        } else {
          console.log('sortByChangeTime');
        }
        return out;
      }
    },

    methods: {
      auth(v) {
        this.status.auth = v;
      },
      all() {
        this.status.showAll = this.status.showAll ? false : true;
      },
      sort() {
        this.status.sortByCreateTime = this.status.sortByCreateTime ? false : true;
      },
      search() {

      },
      add() {
        this.status.edit = true;
      },
      edit(id) {
        this.status.edit = true;
        // TEST
        // this.current = this.todo[0];
      },
      save() {

      },

    },

    components: {
      Navbar,
      Tag,
      Callout,
      Editor,
    }

  }
</script>
