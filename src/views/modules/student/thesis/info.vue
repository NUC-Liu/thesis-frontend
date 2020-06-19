<template>
  <div class="mod-config">
    <el-form :inline="true" :model="dataForm" @keyup.enter.native="getDataList()">
      <el-form-item>
        <el-input v-model="dataForm.key" placeholder="参数名" clearable></el-input>
      </el-form-item>
      <el-form-item>
        <el-button @click="getDataList()">查询</el-button>
      </el-form-item>
    </el-form>
    <el-table
      :data="dataList"
      border
      v-loading="dataListLoading"
      @selection-change="selectionChangeHandle"
      style="width: 100%;">
      <el-table-column
        prop="thesisNo"
        header-align="center"
        align="center"
        label="论文号">
      </el-table-column>
      <el-table-column
        prop="title"
        header-align="center"
        align="center"
        label="论文标题">
      </el-table-column>
      <el-table-column
        prop="teacherName"
        header-align="center"
        align="center"
        label="教师">
      </el-table-column>
      <el-table-column
        prop="taskPath"
        header-align="center"
        align="center"
        label="任务书">
        <template slot-scope="scope">
          <el-button
            v-if="scope.row.taskPath != null"
            size="mini"
            type="success"
            @click="download(scope.row.taskPath)">下载</el-button>
        </template>
      </el-table-column>
      <el-table-column
        prop="proposalPath"
        header-align="center"
        align="center"
        label="开题报告">
        <template slot-scope="scope">
          <SingleUpload :id=scope.row.id :uptype="'proposal'" :stuno="userNo" :stuname="userName" ></SingleUpload>
          <el-button
            v-if="scope.row.proposalPath != null"
            size="mini"
            type="success"
            @click="download(scope.row.proposalPath)">下载</el-button>
        </template>
      </el-table-column>
      <el-table-column
        prop="proposalGrade"
        header-align="center"
        align="center"
        label="开题报告成绩">
      </el-table-column>
      <el-table-column
        prop="midPath"
        header-align="center"
        align="center"
        label="中期报告">
        <template slot-scope="scope">
          <SingleUpload :id=scope.row.id :uptype="'mid'" :stuno="userNo" :stuname="userName" ></SingleUpload>
          <el-button
            v-if="scope.row.midPath != null"
            size="mini"
            type="success"
            @click="download(scope.row.midPath)">下载</el-button>
        </template>
      </el-table-column>
      <el-table-column
        prop="midGrade"
        header-align="center"
        align="center"
        label="中期报告成绩">
      </el-table-column>
      <el-table-column
        prop="finalPath"
        header-align="center"
        align="center"
        label="毕设说明书">
        <template slot-scope="scope">
          <SingleUpload :id=scope.row.id :uptype="'final'" :stuno="userNo" :stuname="userName" ></SingleUpload>
          <el-button
            v-if="scope.row.finalPath != null"
            size="mini"
            type="success"
            @click="download(scope.row.finalPath)">下载</el-button>
        </template>
      </el-table-column>
      <el-table-column
        prop="finalGrade"
        header-align="center"
        align="center"
        label="毕设成绩">
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
  import SingleUpload from '@/components/upload/singleUpload'
  export default {
    components: {
      SingleUpload
    },
    data () {
      return {
        dataForm: {
          key: ''
        },
        dataList: [],
        pageIndex: 1,
        pageSize: 10,
        totalPage: 0,
        dataListLoading: false,
        dataListSelections: [],
        addOrUpdateVisible: false
      }
    },
    activated () {
      this.getDataList()
    },
    computed: {
      userId: {
        get () { return this.$store.state.user.id }
      },
      userNo: {
        get () { return this.$store.state.user.no }
      },
      userName: {
        get () { return this.$store.state.user.name }
      }
      // thesisId: {
      //   get () { return this.$store.state.thesis.thesisId },
      //   set (val) { this.$store.commit('thesis/updateThesisId', val) }
      // }
    },
    methods: {
      // 获取当前用户论文
      getDataList () {
        console.log('请求论文信息')
        this.dataListLoading = true
        this.$http({
          url: this.$http.adornUrl('/thesis/info/selected'),
          method: 'get',
          params: this.$http.adornParams({
            'studentNo': this.userNo
          })
        }).then(({data}) => {
          console.log('请求到论文信息')
          console.log(data)
          if (data && data.code === 0) {
            this.dataList = []
            this.dataList.push(data.thesis)
          } else {
            this.$message.error(data.msg)
          }
          this.dataListLoading = false
        })
      },
      download (val) {
        let a = document.createElement('a')
        a.href = val
        a.click()
      }
    }
  }
</script>
