<style>
  .layer {
    position: absolute;
    top: 2.5rem;
    right: 0;
    bottom: 0;
    left: 0;
    background-color: rgba(255, 255, 255, 0.8);
  }
</style>

<template>
  <div class="layer middle">
    <div class="row">
      <div class="large-12 columns">

        <nav class="space-between">
          <input type="text" name="tag" v-model="item.tags">
          <select>
            <option value="primary">PRIMARY</option>
            <option value="secondary">SECONDARY</option>
            <option value="success">SUCCESS</option>
            <option value="warning">WARNING</option>
            <option value="alert">ALERT</option>
          </select>
        </nav>
        <textarea rows="8" cols="40"></textarea>
        <label>INSERT FILE
          <input type="file">
        </label>
        <button type="button" class="button">SAVE</button>

      </div>
    </div>
  </div>
</template>

<script lang="babel">

  export default {
    props: ['current'],

    data() {
      return {
        // item: this.current,
      }
    },

  }

</script>
