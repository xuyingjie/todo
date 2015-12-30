<style>
  .bar {
    width: 100%;
    display: flex;
    justify-content: center;
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

      <input class="item" type="text" name="search" placeholder="Search..." v-model="keyWord" @input="search" v-show="status.auth">
      <div v-show="status.auth">
        <button type="button" @click="all">SHOW ALL</button>
        <button type="button" @click="sort">SORT BY CREATE TIME</button>
        <button type="button" @click="add">ADD</button>
        <button type="button" @click="logout">LOGOUT</button>
      </div>

      <form @submit.prevent="login" v-else>
        <input type="password" placeholder="Little Pei's birthday" v-model="passwd">
        <input type="text" placeholder="The meaning of DZT" v-model="iv">
        <input class="button" type="submit" value="LOGIN" @click="login">
      </form>

    </nav>
  </div>
</template>

<script lang="babel">
  import {get} from '../utils/http';

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
        this.$dispatch('search', this.keyWord);
      },
      all() {
        this.$dispatch('all');
      },
      sort() {
        this.$dispatch('sort');
      },
      add() {
        this.$dispatch('add');
      },
      logout() {
        this.$dispatch('auth', false);
      },
      login() {
        get({
          key: 'user',
          passwd: this.passwd,
          iv: this.iv,
          success: data => {
            localStorage.user = JSON.stringify(data.user);
            this.$dispatch('auth', true);
          },
        });
      },
    }
  }

</script>
