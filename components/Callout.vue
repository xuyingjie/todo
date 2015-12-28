<template>
  <section class="{{item.color}} callout">
    <nav>
      <span class="label" v-for="tag in item.tags">{{tag}}</span>
      <button type="button" @click="edit(item.id)">EDIT</button>
      <button type="button">DONE</button>
    </nav>
    {{item.content}}
  </section>
</template>


<script lang="babel">
  export default {
    props: ['item'],

    methods: {
      edit(id) {
        this.$dispatch('edit', id);
      },
    }
  }

</script>
