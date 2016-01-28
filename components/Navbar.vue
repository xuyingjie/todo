<style>
  .bar {
    width: 100%;
    display: flex;
    justify-content: center;

    background-color: rgba(255, 255, 255, 0.9);
    color: rgb(66, 66, 66);
    box-shadow: 0 2px 2px 0 rgba(0,0,0,.14),0 3px 1px -2px rgba(0,0,0,.2),0 1px 5px 0 rgba(0,0,0,.12);
    padding: 7px 0;

    position: fixed;
    left: 0;
    top: 0;
    z-index: 10;
  }
  .bar input[type=text] {
    margin-right: 10px;
  }
  .bar form {
    width: 100%;
    display: flex;
  }
  .bar form input {
    margin-right: 10px;
  }
  .bar h1 {
    margin: 0;
    line-height: inherit;
  }
</style>

<template>
  <div class="bar">
    <nav class="row">
      <template v-if="status.auth">
        <h1 class="item">title</h1>
        <button type="button" @click="add">ADD</button>
        <button type="button" @click="logout">LOGOUT</button>
      </template>

      <form @submit.prevent="login" v-else>
        <input type="text" placeholder="Name" v-model="iv">
        <input type="password" placeholder="Password" v-model="passwd">
        <input class="button" type="submit" value="LOGIN" @click="login">
      </form>

    </nav>
  </div>
</template>

<script lang="babel">
  import { get, decrypt, arrayBufferToStr } from '../tools'

  export default {
    props: ['status'],

    data() {
      return {
        passwd: '',
        iv: '',
      }
    },

    methods: {
      add() {
        this.$dispatch('add')
      },
      logout() {
        localStorage.removeItem('user')
        this.$dispatch('auth', false)
      },
      login() {
        get('user', {responseType: 'arraybuffer'}).then(buf => {
          decrypt(this.passwd, this.iv, buf).then(out => {
            localStorage.user = arrayBufferToStr(out)
            this.$dispatch('auth', true)
          })
        })
      },
    }
  }
</script>
