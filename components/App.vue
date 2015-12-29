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
  <Navbar :status="status"></Navbar>

  <div class="row">
    <div class="large-12 columns">
      <Tag></Tag>
      <Callout v-for="item in list" :item="item" v-show="item.content | hasKeyword keyWord"></Callout>
    </div>
  </div>

  <Editor :item="current" v-show="status.edit"></Editor>
</template>


<script lang="babel">
  import Navbar from './Navbar.vue';
  import Tag from './Tag.vue';
  import Callout from './Callout.vue';
  import Editor from './Editor.vue';

  import {get, upload} from '../utils/http';
  import { timeDiff } from '../utils/crypto';

  export default {
    data() {
      return {
        version: {
          todo: 0,
          done: 0,
        },
        todo: [
          // {
          //   id: '123',
          //   content: 'todo',
          //   createTime: '',
          //   lastChange: '',
          //   color: 'primary',
          //   tags: ['vue', 'js'],
          //   complete: false,
          // }
        ],
        done: [],

        tagGroup: [],
        tag: '',
        keyWord: '',

        status: {
          auth: false,
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
          out.reverse();
        } else {
          out.sort((a, b) => {
            return Date.parse(b.lastChange) - Date.parse(a.lastChange);
          })
        }
        return out;
      }
    },

    events: {
      auth(v) {
        this.status.auth = v;
      },
      search(keyWord) {
        this.keyWord = keyWord;
      },
      all() {
        this.status.showAll = this.status.showAll ? false : true;
      },
      sort() {
        this.status.sortByCreateTime = this.status.sortByCreateTime ? false : true;
      },
      add() {
        this.current = {color: 'primary'};
        this.status.edit = true;
      },
      edit(id) {
        this.current = Object.assign({}, this.todo.filter(element => {
          return element.id === id;
        })[0]);

        this.status.edit = true;
      },
      save(item) {
        this.version.todo += 1;

        let out = [...this.todo];

        item.lastChange = new Date().toString();
        if (!item.id) {
          item.id = timeDiff();
          item.createTime = item.lastChange;
          out.push(item);
        } else {
          out = out.map(el => {
            if (el.id === item.id) {
              return item;
            } else {
              return el;
            }
          })
        }

        upload({
          key: 'todo/' + this.version.todo,
          data: JSON.stringify(out),
          success: () => {

            upload({
              key: 'version',
              data: JSON.stringify(this.version),
              success: () => {
                this.todo = out;
                this.status.edit = false;
              }
            });

          }
        });
      },

    },

    compiled() {
      if (localStorage.user) {
        this.status.auth = true;
        get({
          key: 'version',
          success: data => {
            this.version = data;

            get({
              key: 'todo/' + this.version.todo,
              success: data => {
                this.todo = data;
              }
            });

            // get({
            //   key: 'done/' + this.version.done,
            //   success: data => {
            //     this.done = data;
            //   }
            // });

          }
        })
      }
    },

    components: {
      Navbar,
      Tag,
      Callout,
      Editor,
    }

  }
</script>
