<style>
  .x-bar {
    height: 2.5rem;
    background-color: #007095;
    margin-bottom: 1.25rem;
  }
  .x-bar input[name=search] {
    width: 200px;
  }
</style>

<template>
  <nav class="x-bar">
    <div class="row">
      <div class="large-12 columns space-between">

        <input type="text" name="search" placeholder="SEARCH" v-show="status.auth">
        <div v-show="status.auth">
          <button type="button" @click="all">SHOW ALL</button>
          <button type="button" @click="sort">SORT BY CREATE TIME</button>
          <button type="button" @click="add">ADD</button>
          <button type="button" @click="logout">LOGOUT</button>
        </div>

        <form class="space-between" @submit.prevent="login" v-else>
          <input type="password" placeholder="Little Pei's birthday" v-model="passwd">
          <input type="text" placeholder="The meaning of DZT" v-model="iv">
          <input type="submit" value="LOGIN" @click="login">
        </form>

      </div>
    </div>
  </nav>
</template>

<script lang="babel">
  import {get} from '../utils/http';

  export default {
    props: ['status'],

    data() {
      return {
        passwd: '',
        iv: '',
      }
    },

    methods: {
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
