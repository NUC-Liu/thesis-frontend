<template>
  <el-upload
    class="upload-demo"
    action="http://thesis-liu.oss-cn-beijing.aliyuncs.com"
    :data="dataObj"
    accept=".doc,.docx,.wps"
    :on-preview="handlePreview"
    :on-remove="handleRemove"
    :before-remove="beforeRemove"
    :before-upload="beforeUpload"
    :on-success="handleUploadSuccess"
    :on-error="handleError"
    :limit="1"
    :file-list="fileList">
    <el-button size="mini" type="primary">上传</el-button>
  </el-upload>
</template>

<script>
  import {policy} from './policy'
  export default {
    name: 'singleUpload',
    props: {
      id: String,
      uptype: String,
      stuno: {
        type: String,
        default: null
      },
      stuname: {
        type: String,
        default: null
      }
    },
    data () {
      return {
        dataObj: {
          policy: '',
          signature: '',
          key: '',
          ossaccessKeyId: '',
          dir: '',
          host: ''
          // callback:'',
        }
      }
    },
    methods: {
      handleRemove (file, fileList) {
        console.log(file, fileList)
      },
      handlePreview (file) {
        console.log(file)
      },
      beforeRemove (file, fileList) {
        return this.$confirm(`确定移除 ${file.name}？`)
      },
      beforeUpload (file) {
        let _self = this
        return new Promise((resolve, reject) => {
          policy().then(response => {
            _self.dataObj.policy = response.data.policy
            _self.dataObj.signature = response.data.signature
            _self.dataObj.ossaccessKeyId = response.data.accessid
            _self.dataObj.key = this.uptype + '/' + this.id + '/' + (this.stuno ? this.stuno + this.stuname : this.id) + '_' + file.name
            _self.dataObj.dir = this.uptype
            _self.dataObj.host = response.data.host
            resolve(true)
          }).catch(err => {
            reject(err)
          })
        })
      },
      handleUploadSuccess (res, file) {
        let url = '/thesis/stage/update'
        let params = {}
        switch (this.uptype) {
          case 'task':
            url = '/thesis/info/update'
            params = {
              'id': this.id,
              'taskPath': this.dataObj.host + '/' + this.dataObj.key
            }
            break

          case 'proposal':
            params = {
              'id': this.id,
              'proposalPath': this.dataObj.host + '/' + this.dataObj.key
            }
            break

          case 'mid':
            params = {
              'id': this.id,
              'midPath': this.dataObj.host + '/' + this.dataObj.key
            }
            break

          case 'final':
            params = {
              'id': this.id,
              'finalPath': this.dataObj.host + '/' + this.dataObj.key
            }
            break

          default:
            break
        }
        this.$http({
          url: this.$http.adornUrl(url),
          method: 'post',
          data: this.$http.adornData(params)
        }).then(({data}) => {
          if (data && data.code === 0) {
            this.$message({
              message: '写入数据库成功',
              type: 'success',
              duration: 1500
            })
          } else {
            this.$message.error(data.msg)
          }
        })
        console.log('上传成功...')
        this.$message({
          message: file.name + ' 上传成功，清刷新',
          type: 'success',
          duration: 1500
        })
      },
      handleError (err, file, fileList) {
        this.$message({
          message: '上传失败，错误' + err,
          type: 'error',
          duration: 1500
        })
        console.log(file, fileList)
      }
    }
  }
</script>
