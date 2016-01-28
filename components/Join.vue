<style>
  .join {
    width: 100%;
  }
</style>

<template>
  <form class="row join" @submit.prevent="join">
    <label>Name
      <input type="text" v-model="name" />
    </label>
    <label>Password
      <input type="text" v-model="secret" />
    </label>
    <label>Random Password
      <input type="text" v-model="user.passwd" />
    </label>
    <label>iv
      <input type="text" v-model="user.iv" />
    </label>
    <label>AK
      <input type="text" v-model="user.AK" />
    </label>
    <label>SK
      <input type="text" v-model="user.SK" />
    </label>
    <button type="submit">JOIN</button>
  </form>
</template>

<script lang="babel">
  import { url, encrypt, strToArrayBuffer, form } from '../utils/http'

  export default {
    data() {
      return {
        name: '',
        secret: '',

        user: {
          AK: '',
          SK: '',
          passwd: '',
          iv: '',
        },
      }
    },

    methods: {
      join() {
        localStorage.user = JSON.stringify(this.user)

        let buf = strToArrayBuffer(JSON.stringify(this.user))
        encrypt(this.secret, this.user.iv, buf)
          .then(out => {
            fetch(url, {
              method: 'POST',
              body: form({
                key: this.name,
                data: out
              })
            }).then(() => {
              location.replace('#')
            })
          })
      },
    },
  }
</script>
