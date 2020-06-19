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
        prop="description"
        header-align="center"
        align="center"
        label="摘要">
      </el-table-column>
      <el-table-column
        fixed="right"
        header-align="center"
        align="center"
        width="150"
        label="操作">
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="selectThesis(scope.row.id)">选题</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      @size-change="sizeChangeHandle"
      @current-change="currentChangeHandle"
      :current-page="pageIndex"
      :page-sizes="[10, 20, 50, 100]"
      :page-size="pageSize"
      :total="totalPage"
      layout="total, sizes, prev, pager, next, jumper">
    </el-pagination>

  </div>
</template>

<script>
  export default {
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
      }
      // thesisId: {
      //   get () { return this.$store.state.thesis.thesisId },
      //   set (val) { this.$store.commit('thesis/updateThesisId', val) }
      // }
    },
    methods: {
      // 获取数据列表
      getDataList () {
        this.dataListLoading = true
        this.$http({
          url: this.$http.adornUrl('/thesis/info/unSelectedList'),
          method: 'get',
          params: this.$http.adornParams({
            'page': this.pageIndex,
            'limit': this.pageSize,
            'key': this.dataForm.key
          })
        }).then(({data}) => {
          if (data && data.code === 0) {
            this.dataList = data.page.list
            this.totalPage = data.page.totalCount
          } else {
            this.dataList = []
            this.totalPage = 0
          }
          this.dataListLoading = false
        })
      },
      // 每页数
      sizeChangeHandle (val) {
        this.pageSize = val
        this.pageIndex = 1
        this.getDataList()
      },
      // 当前页
      currentChangeHandle (val) {
        this.pageIndex = val
        this.getDataList()
      },
      // TODO
      selectThesis (val) {
        console.log(this.thesisId)
        // if (this.thesisId !== 0 ) {
        //   this.dataListLoading = false
        //   this.$message({
        //     message: '已选论文，不可重复选取',
        //     type: 'error',
        //     duration: 1500
        //   })
        //   return
        // }
        this.dataListLoading = true
        this.$http({
          url: this.$http.adornUrl('/thesis/info/selectThesis'),
          method: 'post',
          params: this.$http.adornParams({
            'studentNo': this.userNo,
            'thesisId': val
          })
        }).then(({data}) => {
          if (data && data.code === 0) {
            this.$router.replace({ name: 'student-thesis/info' })
          } else {
            this.$message.error(data.msg)
          }
          this.dataListLoading = false
        })
      }
    }
  }
</script>
