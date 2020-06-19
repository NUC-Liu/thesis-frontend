<template>
  <div class="mod-config">
    <h2>{{studentNo}}</h2>
    <el-form :inline="true" :model="dataForm" @keyup.enter.native="getDataList()">
      <el-form-item>
        <el-button v-if="studentNo !== '请在学生阶段页面选取周报'" type="primary" @click="addOrUpdateHandle()">添加周报</el-button>
      </el-form-item>
    </el-form>
    <div class="block">
      <el-timeline>
        <div v-for="(o, index) in dataList" :key="index">
          <el-timeline-item :timestamp="o.gmtModified.split('.')[0].replace('T',' ') + ' ' + o.editor" placement="top">
          <el-card>
            <p v-html="o.content"></p>
          </el-card>
          <div v-if="o.grade"><el-alert type="success" :closable=false >教师阶段评分： {{o.grade}} 分</el-alert></div>
        </el-timeline-item>
        </div>
      </el-timeline>
    </div> 
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
        addOrUpdateVisible: false,
        studentNo: ''
      }
    },
    computed: {
      userNo: {
        get () { return this.$store.state.user.no }
      }
    },
    components: {
    },
    activated () {
      this.getRouterData()
      if (this.studentNo !== undefined) {
        this.getDataList()
      } else {
        this.studentNo = '请在学生阶段页面选取周报'
      }
    },
    methods: {
      // 获取数据列表
      getDataList () {
        this.dataListLoading = true
        this.$http({
          url: this.$http.adornUrl('/thesis/weekly/listByStudent'),
          method: 'get',
          params: this.$http.adornParams({
            'studentNo': this.studentNo
          })
        }).then(({data}) => {
          console.log(data)
          if (data && data.code === 0) {
            this.dataList = data.weekly.reverse()
          } else {
            this.dataList = []
            this.totalPage = 0
          }
          this.dataListLoading = false
        })
      },
      // 新增 / 修改
      addOrUpdateHandle (id) {
        this.addOrUpdateVisible = true
        this.$router.push({
          name: 'admin-thesis/ueditor',
          params: {studentNo: this.studentNo}
        })
      },
      getRouterData () {
        this.studentNo = this.$route.params.studentNo
        console.log('studentNo', this.studentNo)
      }
    }
  }
</script>
