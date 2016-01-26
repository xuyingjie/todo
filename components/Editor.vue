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
  .label.on {
    box-shadow: 0 2px 2px 0 rgba(0,0,0,.14),0 3px 1px -2px rgba(0,0,0,.2),0 1px 5px 0 rgba(0,0,0,.42);
  }
  .upload {
    position: relative;
    width: 150px;
  }
  .button .progress {
    position: absolute;
    height: 100%;
    left: 0;
    bottom: 0;
    background: rgba(33, 153, 232, 0.2);
  }
</style>

<template>
  <div class="layer">
    <div class="row {{item.color}} editor">
      <button type="button" name="cancel" @click="cancel">CANCEL</button>
      <textarea rows="24" v-el:textarea v-model="item.content"></textarea>

      <div class="footer">
        <span class="select-label item">
          <i class="{{c}} label {{c===item.color?'on':''}}" v-for="c in color" @click="switchColor(c)"></i>
        </span>
        <label class="upload button {{uploadStatus?'hover':''}}">
          INSERT FILE
          <input type="file" @change="readAndUpload($event)">
          <i class="progress" v-el:progress></i>
        </label>
        <button type="button" @click="save">SAVE</button>
      </div>

    </div>
  </div>
</template>

<script lang="babel">
  import {upload} from '../utils/http'
  import {insertText} from '../utils/others'
  import * as crypto from '../utils/crypto'

  export default {
    props: ['item'],

    data() {
      return {
        color: ['primary', 'secondary', 'success', 'warning', 'alert'],
        uploadStatus: false,
      }
    },

    methods: {
      switchColor(c) {
        this.item.color = c
      },
      cancel() {
        this.$dispatch('cancel')
      },
      save() {
        this.$dispatch('save', this.item)
      },

      readAndUpload(event) {
        this.uploadStatus = true
        let file = event.target.files[0]
        let reader = new FileReader()
        reader.onload = () => {
          let key = 'u/' + crypto.timeDiff()
          upload({
            key,
            data: reader.result,
            buf: true,
            progress: this.$els.progress,
          }).then(() => {
              this.uploadStatus = false
              let c = `\n![${file.name},${(file.size/1024).toFixed(2)}KB,${file.type},${key}]`
              let textarea = this.$els.textarea
              insertText(textarea, c)
              this.item.content = textarea.value
            })
        }
        reader.readAsArrayBuffer(file)
      },
    }

  }
</script>
