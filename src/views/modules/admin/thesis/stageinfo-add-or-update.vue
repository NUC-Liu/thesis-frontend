<template>
  <el-dialog
    :title="!dataForm.id ? '新增' : '修改'"
    :close-on-click-modal="false"
    :visible.sync="visible">
    <el-form :model="dataForm" :rules="dataRule" ref="dataForm" @keyup.enter.native="dataFormSubmit()" label-width="80px">
    <el-form-item label="学号" prop="studentNo">
      <el-input v-model="dataForm.studentNo" placeholder="学号"></el-input>
    </el-form-item>
    <el-form-item label="论文id" prop="thesisId">
      <el-input v-model="dataForm.thesisId" placeholder="论文id"></el-input>
    </el-form-item>
    <el-form-item label="开题报告路径" prop="proposalPath">
      <el-input v-model="dataForm.proposalPath" placeholder="开题报告路径"></el-input>
    </el-form-item>
    <el-form-item label="开题报告成绩" prop="proposalGrade">
      <el-input v-model="dataForm.proposalGrade" placeholder="开题报告成绩"></el-input>
    </el-form-item>
    <el-form-item label="中期报告路径" prop="midPath">
      <el-input v-model="dataForm.midPath" placeholder="中期报告路径"></el-input>
    </el-form-item>
    <el-form-item label="中期报告成绩" prop="midGrade">
      <el-input v-model="dataForm.midGrade" placeholder="中期报告成绩"></el-input>
    </el-form-item>
    <el-form-item label="毕设说明书路径" prop="finalPath">
      <el-input v-model="dataForm.finalPath" placeholder="毕设说明书路径"></el-input>
    </el-form-item>
    <el-form-item label="毕设成绩" prop="finalGrade">
      <el-input v-model="dataForm.finalGrade" placeholder="毕设成绩"></el-input>
    </el-form-item>
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
        dataForm: {
          id: 0,
          studentNo: '',
          thesisId: '',
          proposalPath: '',
          proposalGrade: '',
          midPath: '',
          midGrade: '',
          finalPath: '',
          finalGrade: ''
        },
        dataRule: {
          studentNo: [
            { required: true, message: '学生学号不能为空', trigger: 'blur' }
          ],
          thesisId: [
            { required: true, message: '论文id不能为空', trigger: 'blur' }
          ],
          proposalPath: [
            { required: false, message: '开题报告路径不能为空', trigger: 'blur' }
          ],
          proposalGrade: [
            { required: false, message: '开题报告成绩不能为空', trigger: 'blur' }
          ],
          midPath: [
            { required: false, message: '中期报告路径不能为空', trigger: 'blur' }
          ],
          midGrade: [
            { required: false, message: '中期报告成绩不能为空', trigger: 'blur' }
          ],
          finalPath: [
            { required: false, message: '毕设说明书路径不能为空', trigger: 'blur' }
          ],
          finalGrade: [
            { required: false, message: '毕设成绩不能为空', trigger: 'blur' }
          ]
        }
      }
    },
    methods: {
      init (id) {
        this.dataForm.id = id || 0
        this.visible = true
        this.$nextTick(() => {
          this.$refs['dataForm'].resetFields()
          if (this.dataForm.id) {
            this.$http({
              url: this.$http.adornUrl(`/thesis/stage/info/${this.dataForm.id}`),
              method: 'get',
              params: this.$http.adornParams()
            }).then(({data}) => {
              if (data && data.code === 0) {
                this.dataForm.studentNo = data.stageInfo.studentNo
                this.dataForm.thesisId = data.stageInfo.thesisId
                this.dataForm.proposalPath = data.stageInfo.proposalPath
                this.dataForm.proposalGrade = data.stageInfo.proposalGrade
                this.dataForm.midPath = data.stageInfo.midPath
                this.dataForm.midGrade = data.stageInfo.midGrade
                this.dataForm.finalPath = data.stageInfo.finalPath
                this.dataForm.finalGrade = data.stageInfo.finalGrade
              }
            })
          }
        })
      },
      // 表单提交
      dataFormSubmit () {
        this.$refs['dataForm'].validate((valid) => {
          if (valid) {
            this.$http({
              url: this.$http.adornUrl(`/thesis/stage/${!this.dataForm.id ? 'save' : 'update'}`),
              method: 'post',
              data: this.$http.adornData({
                'id': this.dataForm.id || undefined,
                'studentNo': this.dataForm.studentNo,
                'thesisId': this.dataForm.thesisId,
                'proposalPath': this.dataForm.proposalPath,
                'proposalGrade': this.dataForm.proposalGrade,
                'midPath': this.dataForm.midPath,
                'midGrade': this.dataForm.midGrade,
                'finalPath': this.dataForm.finalPath,
                'finalGrade': this.dataForm.finalGrade
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
