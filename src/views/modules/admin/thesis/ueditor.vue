<template>
  <div class="mod-demo-ueditor">
    <el-alert
      title="提示："
      type="warning"
      :closable="false">
    </el-alert>

    <script :id="ueId" class="ueditor-box" type="text/plain" style="width: 100%; height: 260px;">hello world!</script>

    <el-form :model="dataForm" :rules="dataRule" ref="dataForm" @keyup.enter.native="submit()" label-width="80px">
      <el-form-item label="分数" prop="grade">
        <el-input v-model="dataForm.grade" placeholder="分数"></el-input>
      </el-form-item>
    </el-form>
    
    <p><el-button type="success" @click="submit()">提交</el-button></p>
  </div>
</template>

<script>
  import ueditor from 'ueditor'
  export default {
    data () {
      return {
        ue: null,
        ueId: `J_ueditorBox_${new Date().getTime()}`,
        ueContent: '',
        dialogVisible: false,
        studentNo: '',
        dataForm: {
          grade: ''
        },
        dataRule: {
          grade: [
            { required: true, message: '分数不能为空', trigger: 'blur' }
          ]
        }
      }
    },
    computed: {
      userName: {
        get () { return this.$store.state.user.name }
      }
    },
    mounted () {
      this.ue = ueditor.getEditor(this.ueId, {
        // serverUrl: '', // 服务器统一请求接口路径
        zIndex: 3000
      })
      this.getRouterData()
    },
    methods: {
      getContent () {
        this.dialogVisible = true
        this.ue.ready(() => {
          this.ueContent = this.ue.getContent()
        })
      },
      getRouterData () {
        this.studentNo = this.$route.params.studentNo
        console.log('studentNo', this.studentNo)
      },
      submit () {
        this.$refs['dataForm'].validate((valid) => {
          if (valid) {
            this.getContent()
            this.$http({
              url: this.$http.adornUrl('/thesis/weekly/save'),
              method: 'post',
              data: this.$http.adornData({
                'id': undefined,
                'content': this.ueContent,
                'studentNo': this.studentNo,
                'editor': this.userName,
                'role': '2',
                'grade': this.dataForm.grade,
                'gmtCreate': undefined,
                'gmtModified': new Date()
              })
            }).then(({data}) => {
              if (data && data.code === 0) {
                this.$message({
                  message: '操作成功',
                  type: 'success',
                  duration: 1500,
                  onClose: () => {
                    this.$router.push({
                      name: 'admin-thesis/weekly'
                    })
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

<style lang="scss">
  .mod-demo-ueditor {
    position: relative;
    z-index: 510;
    > .el-alert {
      margin-bottom: 10px;
    }
  }
</style>
