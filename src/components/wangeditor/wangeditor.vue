<template>
  <div class="wangeditor" ref="editorElem"></div>
</template>

<script>
  // 这里很重要，要不能会报错；在el-dialog里不这样用会报错，
  import E from 'wangeditor/release/wangEditor.min.js'
  export default {
    data () {
      return {
        editor: null
      }
    },
    watch: {
      content (val) {
        if (this.editor !== '') {
          this.editor.txt.html(val)
        }
      }
    },
    props: ['setEditorValue', 'content', 'path'],
    mounted () {
      this.editor = new E(this.$refs.editorElem)
      this.editor.customConfig = {
        onchange: (html) => {
          this.$emit('setEditorValue', html)
        },
        uploadImgShowBase64: false,
        uploadImgServer: 'http://localhost:88/thesis/weekly/uploadImg',
        uploadFileName: 'file',
        uploadImgMaxSize: 3 * 1024 * 1024,
        uploadImgMaxLength: 1,
        uploadImgTimeout: 3 * 60 * 1000,
        onchangeTimeout: 1000,
        success: function (xhr, editor, result) {
        // 图片上传并返回结果，图片插入成功之后触发
        // xhr 是 XMLHttpRequst 对象，editor 是编辑器对象，result 是服务器端返回的结果
          alert('上传成功')
        },
        fail: function (xhr, editor, result) {
            // 图片上传并返回结果，但图片插入错误时触发
            // xhr 是 XMLHttpRequst 对象，editor 是编辑器对象，result 是服务器端返回的结果
          alert('上传错误')
        },
        error: function (xhr, editor) {
            // 图片上传出错时触发
            // xhr 是 XMLHttpRequst 对象，editor 是编辑器对象
          alert('上传错误')
        },
        timeout: function (xhr, editor) {
            // 图片上传超时时触发
            // xhr 是 XMLHttpRequst 对象，editor 是编辑器对象
          alert('上传超时')
        }
      }
      this.editor.create()
      if (this.content) {
        this.editor.txt.html(`<p>${this.content}</p>`)
      }
    }
  }
</script>
