<template>
  <div class="mod-config">
    <el-form :inline="true" :model="dataForm" @keyup.enter.native="getDataList()">
      <el-form-item>
        <el-button type="primary" @click="addOrUpdateHandle()">添加周报</el-button>
      </el-form-item>
    </el-form>
    <div class="block">
      <el-timeline>
        <div v-for="(o, index) in dataList" :key="index">
          <el-timeline-item :timestamp="o.gmtModified.split('.')[0].replace('T',' ') + ' ' + o.editor" placement="top">
          <el-card>
            <p v-html="o.content"></p>
          </el-card>
          <div v-if="o.grade"><el-alert type="success" :closable=false>教师周报评分： {{o.grade}} 分</el-alert></div>
        </el-timeline-item>
        </div>
      </el-timeline>
    </div> 
    <!-- 弹窗, 新增 / 修改 -->
    <add-or-update v-if="addOrUpdateVisible" ref="addOrUpdate" @refreshDataList="getDataList"></add-or-update>
  </div>
</template>

<script>
  import AddOrUpdate from './weekly-add-or-update'
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
    computed: {
      userNo: {
        get () { return this.$store.state.user.no }
      }
    },
    components: {
      AddOrUpdate
    },
    activated () {
      this.getDataList()
    },
    methods: {
      // 获取数据列表
      getDataList () {
        this.dataListLoading = true
        this.$http({
          url: this.$http.adornUrl('/thesis/weekly/listByStudent'),
          method: 'get',
          params: this.$http.adornParams({
            'studentNo': this.userNo
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
        this.$nextTick(() => {
          this.$refs.addOrUpdate.init(id)
        })
      }
    }
  }
</script>
