<style>
  .layer {
    position: absolute;
    top: 0;
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
    align-items: flex-end;
  }
  .editor button[name=cancel] {
    margin: 3em 0;
  }
  .editor .footer {
    display: flex;
    width: 100%;
  }
  .editor input[type=file] {
    display: none;
  }
  .editor textarea {
    width: 100%;
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
  .upload {
    position: relative;
    width: 150px;
  }
  .button .progress {
    position: absolute;
    height: 100%;
    width: 70%;
    left: 0;
    bottom: 0;
    background: rgba(33, 153, 232, 0.2);
  }
</style>

<template>
  <div class="layer">
    <div class="row {{item.color}} editor">
      <button type="button" name="cancel">CANCEL</button>
      <textarea rows="24" v-model="item.content"></textarea>

      <div class="footer">
        <span class="select-label item">
          <i class="primary label on"></i>
          <i class="secondary label"></i>
          <i class="success label"></i>
          <i class="warning label"></i>
          <i class="alert label"></i>
        </span>
        <label class="upload button">
          INSERT FILE
          <input type="file">
          <i class="progress"></i>
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
