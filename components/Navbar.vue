<template>
  <nav v-show="auth">
    <input type="text" placeholder="SEARCH">
    <button type="button">SHOW ALL</button>
    <button type="button">SORT BY CREATE TIME</button>
    <button type="button">ADD</button>
    <button type="button">LOGOUT</button>
  </nav>
  <form v-else>
    <input type="password" placeholder="Little Pei's birthday">
    <input type="text" placeholder="The meaning of DZT">
    <input type="submit" value="LOGIN">
  </form>
</template>
