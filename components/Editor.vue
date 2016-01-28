<style>
  .layer {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background-color: rgba(255, 255, 255, 1);
    z-index: 20;

    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .editor {
    display: flex;
    flex-direction: column;
    /*align-items: flex-end;*/
  }
  .editor .footer {
    display: flex;
    justify-content: space-between;
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
  .upload {
    position: relative;
    width: 150px;
  }
</style>

<template>
  <div class="layer">
    <div class="row {{item.color}} editor">

      <p>{{item.img}}</p>

      <label class="upload button {{uploadStatus?'hover':''}}">
        INSERT FILE
        <input type="file" @change="readAndUpload($event)">
      </label>

      <textarea rows="20" v-el:textarea v-model="item.text"></textarea>

      <div class="footer">
        <button type="button" @click="cancel">CANCEL</button>
        <button type="button" @click="save">SAVE</button>
      </div>

    </div>
  </div>
</template>

<script lang="babel">
  import { upload, form, encStr } from '../tools'

  export default {
    props: ['item'],

    data() {
      return {
        uploadStatus: false
      }
    },

    methods: {
      cancel() {
        this.$dispatch('cancel')
      },
      save() {
        encStr(this.item.text).then(str => {
          this.item.text = str
          this.item.lastChange = new Date().toString()
          if (!this.item.id) {
            this.item.id = Date.now()
            this.$dispatch('save', this.item, true)
          } else {
            this.$dispatch('save', this.item, false)
          }
        })
      },

      readAndUpload(event) {
        this.uploadStatus = true
        let file = event.target.files[0]
        let reader = new FileReader()
        reader.onload = () => {
          let id = Date.now()
          let f = form(`img/${id}`, reader.result) // type: file.type,
          upload(f).then(() => {
            this.item.img.push(id)
            this.uploadStatus = false
          })
        }
        reader.readAsArrayBuffer(file)
      },
    }

  }
</script>
