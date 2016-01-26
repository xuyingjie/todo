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
  import {upload} from '../utils/http'

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
        upload({
          key: this.name,
          data: JSON.stringify({
            user: this.user,
          }),
          passwd: this.secret,
        }).then(() => {
            location.replace('#')
          })
      },
    },
  }
</script>
