<style>
  .layer {
    position: absolute;
    top: 3rem;
    right: 0;
    bottom: 0;
    left: 0;
    background-color: rgba(255, 255, 255, 1);

    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .editor {
    display: flex;
    flex-direction: column;
  }
  .editor .footer {
    display: flex;
  }
  .editor input[type=file] {
    display: none;
  }
  .editor textarea {
    padding: 12px;
    border-bottom: none;
    box-shadow: 0 2px 2px 0 rgba(0,0,0,.14),0 3px 1px -2px rgba(0,0,0,.2),0 1px 5px 0 rgba(0,0,0,.12);
  }
  .select-label {
    display: flex;
    align-items: center;
  }
  .on {
    box-shadow: 0 2px 2px 0 rgba(0,0,0,.14),0 3px 1px -2px rgba(0,0,0,.2),0 1px 5px 0 rgba(0,0,0,.12);
  }
</style>

<template>
  <div class="layer">
    <div class="row editor">
      <textarea rows="20" v-model="item.content"></textarea>

      <div class="footer">
        <span class="select-label item">
          <i class="primary label on"></i>
          <i class="secondary label"></i>
          <i class="success label"></i>
          <i class="alert label"></i>
          <i class="warning label"></i>
        </span>
        <label class="button">
          INSERT FILE
          <input type="file">
        </label>
        <button type="button" @click="save">SAVE</button>
      </div>

    </div>
  </div>
</template>

<script lang="babel">

  export default {
    props: ['item'],

    methods: {
      save() {
        this.$dispatch('save', this.item);
      }
    }

  }

</script>
