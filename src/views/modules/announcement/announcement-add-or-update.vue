<template>
  <el-dialog
    :title="!dataForm.id ? '新增' : '修改'"
    :close-on-click-modal="false"
    :visible.sync="visible">
    <el-form :model="dataForm" :rules="dataRule" ref="dataForm" @keyup.enter.native="dataFormSubmit()" label-width="80px">
    <el-form-item label="公告内容" prop="content">
      <el-input type="textarea" clearable :size="3" v-model="dataForm.content"></el-input>
    </el-form-item>
    <el-form-item label="发布人" prop="editor">
      <el-input v-model="dataForm.editor" placeholder="发布人" :disabled="true"></el-input>
    </el-form-item>
    <!-- <el-form-item label="修改时间" prop="gmtModified">
      <el-date-picker
        v-model="dataForm.gmtModified"
        v-show="modified"
        type="datetime"
        placeholder="选择日期时间">
      </el-date-picker>
    </el-form-item> -->
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="visible = false">取消</el-button>
      <el-button type="primary" @click="dataFormSubmit()">确定</el-button>
    </span>
  </el-dialog>
</template>

<script>
  export default {
    data () {
      return {
        visible: false,
        create: false,
        modified: false,
        dataForm: {
          id: 0,
          content: '',
          editor: '',
          gmtCreate: '',
          gmtModified: ''
        },
        dataRule: {
          content: [
            { required: true, message: '公告内容不能为空', trigger: 'blur' }
          ],
          editor: [
            { required: false, message: '发布人不能为空', trigger: 'blur' }
          ],
          gmtCreate: [
            { required: false, message: '创建时间不能为空', trigger: 'blur' }
          ],
          gmtModified: [
            { required: false, message: '修改时间不能为空', trigger: 'blur' }
          ]
        }
      }
    },
    computed: {
      userName: {
        get () { return this.$store.state.user.name }
      }
    },
    methods: {
      init (id) {
        if (id) {
          this.create = false
          this.modified = true
        } else {
          this.create = false
          this.modified = true
        }
        this.dataForm.id = id || 0
        this.visible = true
        this.$nextTick(() => {
          this.$refs['dataForm'].resetFields()
          if (this.dataForm.id) {
            this.$http({
              url: this.$http.adornUrl(`/announcement/info/${this.dataForm.id}`),
              method: 'get',
              params: this.$http.adornParams()
            }).then(({data}) => {
              if (data && data.code === 0) {
                this.dataForm.content = data.announcement.content
                this.dataForm.editor = data.announcement.editor
                this.dataForm.gmtCreate = data.announcement.gmtCreate
                this.dataForm.gmtModified = data.announcement.gmtModified
              }
            })
          }
        })
      },
      // 表单提交
      dataFormSubmit () {
        let date = new Date()
        this.$refs['dataForm'].validate((valid) => {
          if (valid) {
            this.$http({
              url: this.$http.adornUrl(`/announcement/${!this.dataForm.id ? 'save' : 'update'}`),
              method: 'post',
              data: this.$http.adornData({
                'id': this.dataForm.id || undefined,
                'content': this.dataForm.content,
                'editor': this.userName,
                'gmtCreate': this.dataForm.gmtCreate,
                'gmtModified': date
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
          }
        })
      }
    }
  }
</script>
