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
</style>

<template>
  <div class="bar">
    <nav class="row">
      <template v-if="status.auth">
        <input class="item" type="text" name="search" placeholder="Search..." v-model="keyWord" @input="search">
        <button type="button" class="{{status.showAll?'active':''}}" @click="all">SHOW ALL</button>
        <button type="button" class="{{status.sortByCreateTime?'active':''}}" @click="sort">SORT BY CREATE TIME</button>
        <button type="button" @click="add">ADD</button>
        <button type="button" @click="logout">LOGOUT</button>
      </template>

      <form @submit.prevent="login" v-else>
        <input type="password" placeholder="Little Pei's birthday" v-model="passwd">
        <input type="text" placeholder="The meaning of DZT" v-model="iv">
        <input class="button" type="submit" value="LOGIN" @click="login">
      </form>

    </nav>
  </div>
</template>

<script lang="babel">
  import {get} from '../utils/http'

  export default {
    props: ['status'],

    data() {
      return {
        keyWord: '',

        passwd: '',
        iv: '',
      }
    },

    methods: {
      search() {
        this.$dispatch('search', this.keyWord)
      },
      all() {
        this.$dispatch('all')
      },
      sort() {
        this.$dispatch('sort')
      },
      add() {
        this.$dispatch('add')
      },
      logout() {
        this.$dispatch('auth', false)
      },
      login() {
        get({
          key: 'user',
          passwd: this.passwd,
          iv: this.iv,
          success: data => {
            localStorage.user = JSON.stringify(data.user)
            this.$dispatch('auth', true)
          },
        })
      },
    }
  }
</script>
