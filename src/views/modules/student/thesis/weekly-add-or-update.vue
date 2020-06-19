<template>
  <el-dialog
    :title="!dataForm.id ? '新增' : '修改'"
    :close-on-click-modal="false"
    :visible.sync="visible">
      <quill-editor @setContent='setContent'>
      </quill-editor>
    <span slot="footer" class="dialog-footer">
      <el-button size="small" type="primary" @click='dataFormSubmit()' visible = false>确定发布</el-button>
      <el-button size="small" @click="visible = false">取 消</el-button>
    </span>
  </el-dialog>
</template>

<script>
  import quillEditor from '@/components/vue-quill-editor/Quilleditor'
  export default {
    data () {
      return {
        visible: false,
        dataForm: {
          id: 0,
          content: '',
          studentNo: '',
          editor: '',
          role: '',
          grade: '',
          gmtCreate: '',
          gmtModified: ''
        },
        content: '',
        dataRule: {
          content: [
            { required: true, message: '周报内容不能为空', trigger: 'blur' }
          ],
          studentNo: [
            { required: true, message: '学生不能为空', trigger: 'blur' }
          ],
          editor: [
            { required: true, message: '编辑人不能为空', trigger: 'blur' }
          ],
          role: [
            { required: true, message: '角色不能为空', trigger: 'blur' }
          ],
          grade: [
            { required: true, message: '分数不能为空', trigger: 'blur' }
          ],
          gmtCreate: [
            { required: true, message: '创建时间不能为空', trigger: 'blur' }
          ],
          gmtModified: [
            { required: true, message: '修改时间不能为空', trigger: 'blur' }
          ]
        }
      }
    },
    computed: {
      userNo: {
        get () { return this.$store.state.user.no }
      },
      userName: {
        get () { return this.$store.state.user.name }
      }
    },
    components: {
      quillEditor
    },
    methods: {
      init (id) {
        this.dataForm.id = id || 0
        this.visible = true
        this.$nextTick(() => {
          // this.$refs['dataForm'].resetFields()
          if (this.dataForm.id) {
            this.$http({
              url: this.$http.adornUrl(`/thesis/weekly/info/${this.dataForm.id}`),
              method: 'get',
              params: this.$http.adornParams()
            }).then(({data}) => {
              if (data && data.code === 0) {
                this.dataForm.content = data.weekly.content
                this.dataForm.studentNo = data.weekly.studentNo
                this.dataForm.editor = data.weekly.editor
                this.dataForm.role = data.weekly.role
                this.dataForm.grade = data.weekly.grade
                this.dataForm.gmtCreate = data.weekly.gmtCreate
                this.dataForm.gmtModified = data.weekly.gmtModified
              }
            })
          }
        })
      },
      // 表单提交
      dataFormSubmit () {
        if (this.content) {
          this.$http({
            url: this.$http.adornUrl(`/thesis/weekly/${!this.dataForm.id ? 'save' : 'update'}`),
            method: 'post',
            data: this.$http.adornData({
              'id': this.dataForm.id || undefined,
              'content': this.content,
              'studentNo': this.userNo,
              'editor': this.userName,
              'role': '1',
              'grade': '',
              'gmtCreate': this.dataForm.gmtCreate,
              'gmtModified': new Date()
            })
          }).then(({data}) => {
            if (data && data.code === 0) {
              this.$message({
                message: '操作成功',
                type: 'success',
                duration: 1500,
                onClose: () => {
                  this.visible = false
                  this.$emit('refreshDataList')
                }
              })
            } else {
              this.$message.error(data.msg)
            }
          })
        } else {
          alert('周报不能为空')
        }
      },
      setContent (val) {
        this.content = val
      }
    }
  }
</script>
