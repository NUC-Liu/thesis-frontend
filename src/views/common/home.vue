<template>
  <div>
    <el-divider content-position="left">阶段任务</el-divider>
    <el-row label-width="80px" :gutter="5">

    <el-col v-for="(o,index) in dataList" :key='index'>
      <el-col :span="3">
        <!-- <div style="text-align:center">{{ o.stageName }}</div> -->
      </el-col>
      <el-col :span="5">
        <el-date-picker
          :value=[o.startTime,o.deadline]
          type="daterange"
          :clearable="false"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          :default-time="['00:00:00', '23:59:59']">
        </el-date-picker>
      </el-col>

      <el-col :span="2"><br></el-col>

      <el-col :span="14">
        <el-input placeholder="任务描述" v-model="o.description" :readonly="true"></el-input>
      </el-col>
    </el-col>

  </el-row>
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
    methods: {
      // 获取数据列表
      getDataList () {
        this.dataListLoading = true
        this.$http({
          url: this.$http.adornUrl('/thesis/stageTable/list'),
          method: 'get',
          params: this.$http.adornParams({
            'page': this.pageIndex,
            'limit': this.pageSize,
            'key': this.dataForm.key
          })
        }).then(({data}) => {
          console.log(data)
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
      }
    }
  }
</script>