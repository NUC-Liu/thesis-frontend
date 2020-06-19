<template>
  <div>
    <!-- 图片上传组件辅助-->
    <el-upload
      class='avatar-uploader'
      action='http://localhost:88/thesis/weekly/uploadImg'
      name='file'
      :show-file-list='false'
      :on-success='uploadSuccess'
      :on-error='uploadError'
      :before-upload='beforeUpload'
    ></el-upload>
    <!--富文本编辑器组件-->
    <el-row v-loading='quillUpdateImg'>
      <quill-editor
        v-model='detailContent'
        ref='myQuillEditor'
        :options='editorOption'
        @change='onEditorChange($event)'
      ></quill-editor>
    </el-row>
  </div>
</template>
<script>
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'

import { quillEditor } from 'vue-quill-editor'

// 工具栏配置
const toolbarOptions = [
  ['bold', 'italic', 'underline', 'strike'], // toggled buttons
  ['blockquote', 'code-block'],

  [
    {
      header: 1
    },
    {
      header: 2
    }
  ], // custom button values
  [
    {
      list: 'ordered'
    },
    {
      list: 'bullet'
    }
  ],
  [
    {
      script: 'sub'
    },
    {
      script: 'super'
    }
  ], // superscript/subscript
  [
    {
      indent: '-1'
    },
    {
      indent: '+1'
    }
  ], // outdent/indent
  [
    {
      direction: 'rtl'
    }
  ], // text direction
  [
    {
      size: ['small', false, 'large', 'huge']
    }
  ], // custom dropdown
  [
    {
      header: [1, 2, 3, 4, 5, 6, false]
    }
  ],
  [
    {
      color: []
    },
    {
      background: []
    }
  ], // dropdown with defaults from theme
  [
    {
      font: []
    }
  ],
  [
    {
      align: []
    }
  ],
  ['link', 'image', 'video'],
  ['clean'] // remove formatting button
]

export default {
  data () {
    return {
      quillUpdateImg: '',
      detailContent: '',
      editorOption: {
        placeholder: '',
        theme: 'snow', // or 'bubble'
        modules: {
          toolbar: {
            container: toolbarOptions, // 工具栏
            handlers: {
              image: function (value) {
                if (value) {
                  // 触发input框选择图片文件
                  document.querySelector('.avatar-uploader input').click()
                } else {
                  this.quill.format('image', false)
                }
              }
            }
          }
        }
      }
    }
  },
  props: ['setContent'],
  components: {
    'quill-editor': quillEditor
  },
  methods: {
    beforeUpload () {
      // 显示loading动画
      this.quillUpdateImg = true
    },
    uploadSuccess (res, file) {
      // res为图片服务器返回的数据
      // 获取富文本组件实例
      let quill = this.$refs.myQuillEditor.quill
      // 如果上传成功
      if (res.code === 0 && res.fullUrl !== null) {
        // 获取光标所在位置
        let length = quill.getSelection().index
        // 插入图片  res.info为服务器返回的图片地址
        quill.insertEmbed(length, 'image', res.fullUrl)
        // 调整光标到最后
        quill.setSelection(length + 1)
      } else {
        this.$message.error('图片插入失败')
      }
      // loading动画消失
      this.quillUpdateImg = false
    },
    // 富文本图片上传失败
    uploadError () {
      // loading动画消失
      this.quillUpdateImg = false
      this.$message.error('图片插入失败')
    },
    onEditorChange (val) {
      this.$emit('setContent', this.detailContent)
    }
  }
}
</script>