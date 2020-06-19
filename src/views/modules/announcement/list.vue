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

    <el-row :gutter="24">
      <el-col :span="4"><div><br></div></el-col>
      <el-col :span="16">
        <el-col v-for="o in dataList" :key="o" style="margin-bottom:10px">
          <el-card :body-style="{ padding: '0px'}">
            <div style="padding: 14px;">
              <div style="line-height:30px;font-size:16px">{{o.content}}</div>
              <div class="bottom clearfix">
                <el-divider/>
                <div class="time">{{ o.editor }}&nbsp;&nbsp;发表于&nbsp;{{ o.gmtModified.split('.')[0].replace("T"," ") }} </div>
              </div>
            </div>
          </el-card>
        </el-col>
      </el-col>
      <el-col :span="4"><div><br></div></el-col>
    </el-row>

    <!-- <el-timeline>
      <div v-for="(o, index) in dataList" :key="index">
        <el-timeline-item :timestamp="o.gmtModified.split('.')[0].split('T')[0]+ ' ' +o.gmtModified.split('.')[0].split('T')[1] + ' ' + o.editor" placement="top">
        <el-card>
          <h4>{{o.content}}</h4>
        </el-card>
      </el-timeline-item>
      </div>
    </el-timeline> -->

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
          url: this.$http.adornUrl('/announcement/list'),
          method: 'get',
          params: this.$http.adornParams({
            'page': this.pageIndex,
            'limit': this.pageSize,
            'key': this.dataForm.key
          })
        }).then(({data}) => {
          if (data && data.code === 0) {
            this.dataList = data.page.list.reverse()
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

<style>
  .time {
    font-size: 13px;
    color: #999;
  }
  
  .bottom {
    margin-top: 13px;
    line-height: 12px;
    text-align: right;
  }

  .button {
    padding: 0;
    float: right;
  }

  .image {
    width: 100%;
    display: block;
  }

  .clearfix:before,
  .clearfix:after {
      display: table;
      content: "";
  }
  
  .clearfix:after {
      clear: both
  }
</style>