<style>
.fade-enter {
  animation: fadeInDown .5s;
}
.fade-leave {
  animation: fadeOutDown .5s;
}
</style>

<template>
  <Navbar :status="status"></Navbar>
  <Callout transition="fade" v-for="item in list" :item="item" v-show="hasKeyword(item.content) && !status.edit && (!item.complete || this.status.showAll)"></Callout>
  <Editor :item="current" v-show="status.edit"></Editor>
</template>

<script lang="babel">
  import Navbar from './Navbar.vue'
  import Callout from './Callout.vue'
  import Editor from './Editor.vue'

  import {get, upload} from '../utils/http'
  import { timeDiff } from '../utils/crypto'

  export default {
    data() {
      return {
        version: {
          todo: 0,
        },
        todo: [
          // {
          //   id: '123',
          //   content: 'todo',
          //   createTime: '',
          //   lastChange: '',
          //   color: 'primary',
          //   complete: false,
          // }
        ],

        keyword: '',

        status: {
          auth: false,
          edit: false,
          showAll: false,
          sortByCreateTime: false,
        },

        current: {},
      }
    },

    computed: {
      list() {
        let out = [...this.todo]
        if (this.status.sortByCreateTime) {
          out.reverse()
        } else {
          out.sort((a, b) => {
            return Date.parse(b.lastChange) - Date.parse(a.lastChange)
          })
        }
        return out
      }
    },

    events: {
      auth(status) {
        if (status) {
          this.init()
        } else {
          localStorage.removeItem('user')
          this.version = {}
          this.todo = []
          this.current = {}
        }
        this.status.auth = status
      },
      search(keyword) {
        this.keyword = keyword
      },
      all() {
        this.status.showAll = this.status.showAll ? false : true
      },
      sort() {
        this.status.sortByCreateTime = this.status.sortByCreateTime ? false : true
      },
      cancel() {
        this.status.edit = false
      },
      add() {
        this.current = {color: 'primary', complete: false}
        this.status.edit = true
      },
      edit(id) {
        this.current = Object.assign({}, this.todo.filter(element => {
          return element.id === id
        })[0])

        this.status.edit = true
      },
      done(id) {
        let out = [...this.todo]
        out = out.map(el => {
          if (el.id === id) {
            el.complete = el.complete ? false : true
            return el
          } else {
            return el
          }
        })

        this.sync(out, () => {
          this.todo = out
        })
      },
      save(item) {
        let out = [...this.todo]
        item.lastChange = new Date().toString()
        if (!item.id) {
          item.id = timeDiff()
          item.createTime = item.lastChange
          out.push(item)
        } else {
          out = out.map(el => {
            if (el.id === item.id) {
              return item
            } else {
              return el
            }
          })
        }

        this.sync(out, () => {
          this.todo = out
          this.status.edit = false
        })
      },
      rm(id) {
        let out = [...this.todo]
        out = out.filter(el => {
          return el.id !== id
        })

        this.sync(out, () => {
          this.todo = out
        })
      },
      del(key) {
        let reg = new RegExp('!\\[.*?,.*?,.*?,' + key + ']')
        let out = [...this.todo]
        out = out.map(el => {
          if (el.content.match(reg)) {
            // 直接更新 el 视图不更新
            let item = Object.assign({}, el)
            item.content = item.content.replace(reg, '')
            item.lastChange = new Date().toString()
            return item
          } else {
            return el
          }
        })

        upload({
          key,
          data: 'x',
          success: () => {
            this.sync(out, () => {
              this.todo = out
            })
          },
        })
      },

    },

    methods: {
      init() {
        get({
          key: 'version',
          success: data => {
            this.version = data

            get({
              key: 'todo/' + this.version.todo,
              success: data => {
                this.todo = data
              }
            })

          }
        })
      },
      sync(out, callback) {
        this.version.todo += 1
        upload({
          key: 'todo/' + this.version.todo,
          data: JSON.stringify(out),
          success: () => {

            upload({
              key: 'version',
              data: JSON.stringify(this.version),
              success: () => {
                callback()
              }
            })

          }
        })
      },
      hasKeyword(str) {
        let re = new RegExp(this.keyword, 'i')
        if (str.match(re)) {
          return true
        } else {
          return false
        }
      },
    },

    compiled() {
      if (localStorage.user) {
        this.status.auth = true
        this.init()
      }
    },

    components: {
      Navbar,
      Callout,
      Editor,
    }

  }
</script>
