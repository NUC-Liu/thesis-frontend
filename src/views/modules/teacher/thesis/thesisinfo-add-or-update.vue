<template>
  <el-dialog
    :title="!dataForm.id ? '新增' : '修改'"
    :close-on-click-modal="false"
    :visible.sync="visible">
    <el-form :model="dataForm" :rules="dataRule" ref="dataForm" @keyup.enter.native="dataFormSubmit()" label-width="80px">
    <el-form-item label="论文号" prop="thesisNo">
      <el-input v-model="dataForm.thesisNo" placeholder="论文号"></el-input>
    </el-form-item>
    <el-form-item label="论文标题" prop="title">
      <el-input v-model="dataForm.title" placeholder="论文标题"></el-input>
    </el-form-item>
    <el-form-item label="教师编号" prop="teacherNo">
      <el-input v-model="dataForm.teacherNo" placeholder="教师编号" :disabled="true"></el-input>
    </el-form-item>
    <el-form-item label="教师姓名" prop="teacherName">
      <el-input v-model="dataForm.teacherName" placeholder="教师姓名"></el-input>
    </el-form-item>
    <el-form-item label="摘要" prop="description">
      <el-input type="textarea" v-model="dataForm.description" placeholder="摘要"></el-input>
    </el-form-item>
    <el-form-item label="备选状态" prop="studentNo">
      <el-input v-model="dataForm.studentNo" placeholder="备选状态"></el-input>
    </el-form-item>
    <!-- <el-form-item label="任务书路径" prop="taskPath">
      <el-input v-model="dataForm.taskPath" placeholder="任务书路径" :disabled="true"></el-input>
    </el-form-item> -->
    <el-form-item label="创建时间" prop="gmtCreate">
      <el-date-picker
        v-model="dataForm.gmtCreate"
        v-show="create"
        type="datetime"
        placeholder="选择日期时间">
      </el-date-picker>
    </el-form-item>
    <el-form-item label="修改时间" prop="gmtModified">
      <el-date-picker
        v-model="dataForm.gmtModified"
        v-show="modified"
        type="datetime"
        placeholder="选择日期时间">
      </el-date-picker>
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
        create: false,
        modified: false,
        dataForm: {
          id: 0,
          thesisNo: '',
          title: '',
          teacherNo: '',
          teacherName: '',
          description: '',
          studentNo: null,
          taskPath: null,
          gmtCreate: '',
          gmtModified: ''
        },
        dataRule: {
          thesisNo: [
            { required: true, message: '论文号不能为空', trigger: 'blur' }
          ],
          title: [
            { required: true, message: '论文标题不能为空', trigger: 'blur' }
          ],
          teacherNo: [
            { required: false, message: '教师编号不能为空', trigger: 'blur' }
          ],
          teacherName: [
            { required: true, message: '教师姓名不能为空', trigger: 'blur' }
          ],
          description: [
            { required: true, message: '摘要不能为空', trigger: 'blur' }
          ],
          studentNo: [
            { required: false, message: '备选状态不能为空', trigger: 'blur' }
          ],
          taskPath: [
            { required: false, message: '任务书路径不能为空', trigger: 'blur' }
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
      userNo: {
        get () { return this.$store.state.user.no }
      }
    },
    methods: {
      init (id) {
        if (id) {
          this.create = false
          this.modified = true
        } else {
          this.create = true
          this.modified = false
        }
        this.dataForm.id = id || 0
        this.visible = true
        this.$nextTick(() => {
          this.$refs['dataForm'].resetFields()
          if (this.dataForm.id) {
            this.$http({
              url: this.$http.adornUrl(`/thesis/info/info/${this.dataForm.id}`),
              method: 'get',
              params: this.$http.adornParams()
            }).then(({data}) => {
              if (data && data.code === 0) {
                this.dataForm.thesisNo = data.thesisInfo.thesisNo
                this.dataForm.title = data.thesisInfo.title
                this.dataForm.teacherNo = data.thesisInfo.teacherNo
                this.dataForm.teacherName = data.thesisInfo.teacherName
                this.dataForm.description = data.thesisInfo.description
                this.dataForm.studentNo = data.thesisInfo.studentNo
                this.dataForm.taskPath = data.thesisInfo.taskPath
                this.dataForm.gmtCreate = data.thesisInfo.gmtCreate
                this.dataForm.gmtModified = data.thesisInfo.gmtModified
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
              url: this.$http.adornUrl(`/thesis/info/${!this.dataForm.id ? 'save' : 'update'}`),
              method: 'post',
              data: this.$http.adornData({
                'id': this.dataForm.id || undefined,
                'thesisNo': this.dataForm.thesisNo,
                'title': this.dataForm.title,
                'teacherNo': this.userNo,
                'teacherName': this.dataForm.teacherName,
                'description': this.dataForm.description,
                'studentNo': this.dataForm.studentNo,
                'taskPath': this.dataForm.taskPath,
                'gmtCreate': this.dataForm.gmtCreate,
                'gmtModified': this.dataForm.gmtModified
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
