<template>
  <div class="logshtml">
    <el-table
      :data="logsData"
      style="width: 100%"
      :default-sort="{ prop: 'date', order: 'descending' }"
    >
      <el-table-column prop="id" label="编号" sortable> </el-table-column>
      <el-table-column prop="username" label="名称" sortable> </el-table-column>
      <el-table-column prop="ip" label="ip地址" sortable> </el-table-column>
      <el-table-column prop="create_time" label="创建时间" sortable>
      </el-table-column>
    </el-table>
    <div class="logspage">
      <el-pagination background 
        layout="prev, pager, next" 
        :total="total" 
        @current-change="handleCurrentChange" 
        v-model="page">
      </el-pagination>
    </div>
  </div>
</template>
<script>

export default {
  name: "Logs",
  components: {
    
  },
  data() {
    return {
      logsData: [],
      total:0,
      page:1
    };
  },
    created() {
        this.getList();
    },
    methods: {
      handleCurrentChange(val) {
        // console.log(`当前页: ${val}`);
        // this.page=this.$refs.lala.internalCurrentPage
        this.page = val;
        this.getList()
        // console.log(this.page)

      },
        getList(){
          let pages=this.page;
          // console.log('lalal'+pages)
            this.$http({
            url:`/api/supersigninlogs?page=${pages}`,
            // data:`page=${this.pages}`,
            method: "GET",
        }).then(res => {
            console.log(res);
            // console.log(111111)
            let response = res.data;
            if(response.status == 'success'){
              response.data.forEach(item => {
                    item.create_time = new Date(item.create_time).toLocaleString();//转换为年月日
                })
                this.logsData = response.data;
                this.total =(response.count)*10
                // console.log(this.total)
            }else{
                this.$message.error(response.msg);
            }
        })
        },
    },
};
</script>
<style>
.logshtml .el-pagination{
  background-color: #fff;
  padding: 10px;
}
.logshtml .logspage{
  display: flex;
  justify-content: center;
  width: 100%;
  background-color: #fff;
  /* text-align: center; */
  position: absolute;
  bottom: 0px;
}
.logshtml 
.el-pagination.is-background .btn-next, .el-pagination.is-background .btn-prev, .el-pagination.is-background .el-pager li{
  color: #606266e3;
} 
.logshtml{
  height: 588px;
  position: relative;
}
  </style>
  