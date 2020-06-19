<template>
  <el-form :model="dataForm" :rules="dataRule" ref="dataForm" @keyup.enter.native="dataFormSubmit()" label-width="80px">
    <el-form-item label="账号" prop="username">
      <el-input v-model="dataForm.username" placeholder="账号" :disabled="true"></el-input>
    </el-form-item>
    <!-- <el-form-item label="密码" prop="password">
      <el-input type="password" v-model="dataForm.password" placeholder="密码"></el-input>
    </el-form-item>
    <el-form-item label="盐" prop="salt">
      <el-input type="password" v-model="dataForm.salt" placeholder="盐" :disabled="true"></el-input>
    </el-form-item> -->
    <el-form-item label="手机" prop="mobile">
      <el-input v-model="dataForm.mobile" placeholder="手机"></el-input>
    </el-form-item>
    <el-form-item label="邮箱" prop="email">
      <el-input v-model="dataForm.email" placeholder="邮箱"></el-input>
    </el-form-item>
    <el-form-item label="姓名" prop="name">
      <el-input v-model="dataForm.name" placeholder="姓名" :disabled="true"></el-input>
    </el-form-item>
    <el-form-item label="状态  0：禁用   1：正常" prop="status">
      <el-input v-model="dataForm.status" placeholder="状态  0：禁用   1：正常" :disabled="true"></el-input>
    </el-form-item>
    <el-form-item label="创建者id" prop="createUserId">
      <el-input v-model="dataForm.createUserId" placeholder="创建者id" :disabled="true"></el-input>
    </el-form-item>
    <el-form-item label="创建时间" prop="createTime">
      <el-input v-model="dataForm.createTime" placeholder="创建时间" :disabled="true"></el-input>
    </el-form-item>
    <!-- <el-form-item label="修改时间" prop="updateTime">
      <el-input v-model="dataForm.updateTime" placeholder="修改时间" :disabled="true"></el-input>
    </el-form-item> -->
    <el-form-item>
    <el-button type="primary" @click="dataFormSubmit()">修改</el-button>
  </el-form-item>
    </el-form>
</template>

<script>
  export default {
    data () {
      return {
        visible: false,
        dataForm: {
          userId: 0,
          username: '',
          password: '',
          salt: '',
          mobile: '',
          email: '',
          name: '',
          status: '',
          createUserId: '',
          createTime: ''
        },
        dataRule: {
          username: [
            { required: true, message: '账号不能为空', trigger: 'blur' }
          ],
          password: [
            { required: true, message: '密码不能为空', trigger: 'blur' }
          ],
          salt: [
            { required: true, message: '盐不能为空', trigger: 'blur' }
          ],
          mobile: [
            { required: true, message: '手机不能为空', trigger: 'blur' }
          ],
          email: [
            { required: true, message: '邮箱不能为空', trigger: 'blur' }
          ],
          status: [
            { required: false, message: '状态  0：禁用   1：正常不能为空', trigger: 'blur' }
          ],
          createUserId: [
            { required: false, message: '创建者id不能为空', trigger: 'blur' }
          ],
          createTime: [
            { required: false, message: '创建时间不能为空', trigger: 'blur' }
          ]
        }
      }
    },
    methods: {
      // 表单提交
      dataFormSubmit () {
        this.$refs['dataForm'].validate((valid) => {
          if (valid) {
            this.$http({
              url: this.$http.adornUrl(`/sys/user/update`),
              method: 'post',
              data: this.$http.adornData({
                'userId': this.dataForm.userId || undefined,
                'username': this.dataForm.username,
                'password': this.dataForm.password,
                'salt': this.dataForm.salt,
                'mobile': this.dataForm.mobile,
                'email': this.dataForm.email,
                'name': this.dataForm.name,
                'status': this.dataForm.status,
                'createUserId': this.dataForm.createUserId,
                'createTime': this.dataForm.createTime
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
    },
    created () {
      this.$http({
        url: this.$http.adornUrl('/sys/user/info'),
        method: 'get',
        params: this.$http.adornParams()
      }).then(({data}) => {
        if (data && data.code === 0) {
          this.dataForm.userId = data.user.userId
          this.dataForm.username = data.user.username
          this.dataForm.password = data.user.password
          this.dataForm.salt = data.user.salt
          this.dataForm.mobile = data.user.mobile
          this.dataForm.email = data.user.email
          this.dataForm.name = data.user.name
          this.dataForm.status = data.user.status
          this.dataForm.createUserId = data.user.createUserId
          this.dataForm.createTime = data.user.createTime
        }
      })
    }
  }
</script>