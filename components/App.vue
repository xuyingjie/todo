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
  <Callout transition="fade" v-for="id in list" :id="id" v-show="!status.edit"></Callout>
  <Editor :item="current" v-show="status.edit"></Editor>
</template>

<script lang="babel">
  import Navbar from './Navbar.vue'
  import Callout from './Callout.vue'
  import Editor from './Editor.vue'
  import { url, form } from '../tools'

  export default {
    data() {
      return {
        list: [],
        // set: {
        //   {
        //     id: Date.now(),
        //     img: [],
        //     text: '',  //encrypt
        //     lastChange: Date.now()
        //   }
        // },

        status: {
          auth: false,
          edit: false,
          sortByCreateTime: false,
        },

        current: {},
      }
    },

    events: {
      auth(status) {
        this.status.auth = status
      },
      cancel() {
        this.status.edit = false
      },
      add() {
        this.current = {img: [], text: ''}
        this.status.edit = true
      },
      edit(id) {
        fetch(`${url}/set/${id}`)
          .then(res => res.json())
          .then(out => {
            this.current = out
          })
        this.status.edit = true
      },

      save(item, newItem) {
        let out = [...this.list]
        if (newItem) out.push(item.id)

        fetch(url, {
          method: 'POST',
          body: form({
            key: `set/${item.id}`,
            data: JSON.stringify(item)
          })
        }).then(() => {
          if (newItem) {
            fetch(url, {
              method: 'POST',
              body: form({
                key: `list`,
                data: JSON.stringify({ list: out })
              })
            }).then(() => {
              this.list = out
              this.status.edit = false
            })
          } else {
            this.status.edit = false
          }
        })

      },
    },

    methods: {
    },

    compiled() {
      fetch(`${url}/list`)
        .then(res => res.json())
        .then(out => {
          this.list = out.list
        })

      if (localStorage.user) {
        this.status.auth = true
      }
    },

    components: {
      Navbar,
      Callout,
      Editor,
    }

  }
</script>
