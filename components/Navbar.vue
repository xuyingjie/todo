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

        <form class="space-between" @submit="login" v-else>
          <input type="password" placeholder="Little Pei's birthday">
          <input type="text" placeholder="The meaning of DZT">
          <input type="submit" value="LOGIN">
        </form>

      </div>
    </div>
  </nav>
</template>

<script lang="babel">
  export default {
    props: ['status'],

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
        this.$dispatch('auth', true);
      },
    }
  }

</script>
