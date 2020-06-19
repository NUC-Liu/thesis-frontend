<template>
  <div class="mod-config">
    <el-form :inline="true" :model="dataForm" @keyup.enter.native="getDataList()">
      <el-form-item>
        <el-input v-model="dataForm.key" placeholder="参数名" clearable></el-input>
      </el-form-item>
      <el-form-item>
        <el-button @click="getDataList()">查询</el-button>
        <!-- <el-button v-if="isAuth('thesis:stageinfo:save')" type="primary" @click="addOrUpdateHandle()">新增</el-button> -->
        <!-- <el-button v-if="isAuth('thesis:stageinfo:delete')" type="danger" @click="deleteHandle()" :disabled="dataListSelections.length <= 0">批量删除</el-button> -->
      </el-form-item>
    </el-form>
    <el-table
      :data="dataList"
      border
      v-loading="dataListLoading"
      @selection-change="selectionChangeHandle"
      style="width: 100%;">
      <el-table-column
        type="selection"
        header-align="center"
        align="center"
        width="50">
      </el-table-column>
      <el-table-column
        prop="studentNo"
        header-align="center"
        align="center"
        label="学号">
      </el-table-column>
      <el-table-column
        prop="thesisId"
        header-align="center"
        align="center"
        label="论文id">
      </el-table-column>
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
        prop="proposalPath"
        header-align="center"
        align="center"
        label="开题报告路径">
        <template slot-scope="scope">
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
        label="中期报告路径">
        <template slot-scope="scope">
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
        label="毕设说明书路径">
        <template slot-scope="scope">
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
      <el-table-column
        fixed="right"
        header-align="center"
        align="center"
        width="150"
        label="操作">
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="addOrUpdateHandle(scope.row.id)">修改</el-button>
          <!-- <el-button type="text" size="small" @click="deleteHandle(scope.row.id)">删除</el-button> -->
          <el-button type="text" size="small" @click="weeklyHandle(scope.row.studentNo)">周报</el-button>
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
    <!-- 弹窗, 新增 / 修改 -->
    <add-or-update v-if="addOrUpdateVisible" ref="addOrUpdate" @refreshDataList="getDataList"></add-or-update>
    <weekly v-if="weeklyVisible" ref="weekly"></weekly>
  </div>
</template>

<script>
  import AddOrUpdate from './stageinfo-add-or-update'
  import Weekly from './weekly'
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
        addOrUpdateVisible: false,
        weeklyVisible: false
      }
    },
    computed: {
      userNo: {
        get () { return this.$store.state.user.no }
      }
    },
    components: {
      AddOrUpdate,
      Weekly
    },
    activated () {
      this.getDataList()
    },
    methods: {
      // 获取数据列表
      getDataList () {
        this.dataListLoading = true
        this.$http({
          url: this.$http.adornUrl('/thesis/stage/listByTeacher'),
          method: 'get',
          params: this.$http.adornParams({
            'teacherNo': this.userNo
          })
        }).then(({data}) => {
          if (data && data.code === 0) {
            this.dataList = data.stages
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
      // 多选
      selectionChangeHandle (val) {
        this.dataListSelections = val
      },
      // 新增 / 修改
      addOrUpdateHandle (id) {
        this.addOrUpdateVisible = true
        this.$nextTick(() => {
          this.$refs.addOrUpdate.init(id)
        })
      },
      // 删除
      deleteHandle (id) {
        var ids = id ? [id] : this.dataListSelections.map(item => {
          return item.id
        })
        this.$confirm(`确定对[id=${ids.join(',')}]进行[${id ? '删除' : '批量删除'}]操作?`, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$http({
            url: this.$http.adornUrl('/thesis/stageinfo/delete'),
            method: 'post',
            data: this.$http.adornData(ids, false)
          }).then(({data}) => {
            if (data && data.code === 0) {
              this.$message({
                message: '操作成功',
                type: 'success',
                duration: 1500,
                onClose: () => {
                  this.getDataList()
                }
              })
            } else {
              this.$message.error(data.msg)
            }
          })
        })
      },
      download (val) {
        let a = document.createElement('a')
        a.href = val
        a.click()
      },
      weeklyHandle (val) {
        console.log('转发前', val)
        this.$router.push({
          name: 'teacher-thesis/weekly',
          params: {studentNo: val}
        })
      }
    }
  }
</script>
