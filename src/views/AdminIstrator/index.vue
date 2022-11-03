<template>
    <div class="adminhtml">
        <el-table
            :data="adminData"
            style="width: 100%"
            :default-sort = "{prop: 'date', order: 'descending'}"
            >
            <el-table-column
            prop="id"
            label="编号"
            sortable>
            </el-table-column>
            <el-table-column
            prop="username"
            label="用户名"
            sortable>
            </el-table-column>
            <el-table-column
            :formatter="gener"
            prop="gender"
            label="性别"
            sortable>
            </el-table-column>
            <el-table-column
            prop="avator"
            label="头像"
            sortable>
            <template #default="{row}">
            <el-avatar shape="square" :size="40" :src="url + row.avator"></el-avatar>
            </template></el-table-column>
            <el-table-column
            prop="phone"
            label="电话"
            sortable>
            </el-table-column>
            <el-table-column
            prop="email"
            label="邮箱"
            sortable>
            </el-table-column>
            <el-table-column
            prop="create_time"
            label="创建时间"
            sortable>
            </el-table-column>
            <el-table-column
            prop="update_time"
            label="更新日期"
            sortable>
            </el-table-column>
            <el-table-column
            label="操作">
            <template #default="scope">
            <el-button
                size="mini"
                type="danger"
                @click="handleDelete(scope.$index, scope.row)" v-loading.fullscreen.lock="fullscreenLoading">删除</el-button>
            </template>
            </el-table-column>
        </el-table>
    </div>
</template>

<script>
import { url } from '@/axios'
    export default {
        data(){
            return{
                adminData:[],
                url,
                fullscreenLoading:""
            }
        },
        created(){
            this.render()
        },
        methods:{
            render(){
                this.$http({
                    url:"/api/superusers",
                    methods:"GET",
                }).then(res => {
                    let response = res.data;
                    // console.log(response)
                    if(response.status == 'error'){
                        this.$message.error(response.msg);
                    }else{
                        response.data.forEach(item => {
                            item.id = item.id++
                            item.create_time = new Date(item.create_time).toLocaleString();//转换为年月日
                            item.update_time = new Date(item.update_time).toLocaleString();
                        })
                        this.adminData= response.data;
                        
                    }
                })
            },
            handleDelete(index,row){
                this.$confirm('确认删除用户名, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'denger'
        }).then(() => {
          // let name=this.form.name;
          this.fullscreenLoading = true;
          this.$http({
            url: "/api/removesuperuser",
            method: "DELETE",
            data: `pk=${row.id}`,
            headers: {
              'Content-Type': "application/x-www-form-urlencoded"
            }
          }).then(res => {
            this.fullscreenLoading = false;
            let response = res.data;
            if (response.status == 'success') {
              this.$message({
                type: "success",
                message: "删除成功!",
              });
              this.render();
            } else {
              this.$message.error(response.msg);
            }
          })
        }).catch(() => {
            this.fullscreenLoading = false;
            this.$message({
              type: 'info',
              message: '已取消删除'
            });
          });
        this.dialogFormVisible = false;
            },
            gener(ow,column,cellValue,index){
                if(cellValue == 1){
                    return "男"
                }else{
                    return "女"
                }
            }
        }
    }
</script>

<style>
.adminhtml .el-table .el-table__header colgroup col:nth-child(1),
.adminhtml .el-table .el-table__header colgroup col:nth-child(3),
.adminhtml .el-table .el-table__header colgroup col:nth-child(4){
    width: 70px;
}
.adminhtml .el-table .el-table__header colgroup col:nth-child(2){
    width: 120px;
}
.adminhtml .el-table .el-table__header colgroup col:nth-child(5),
.adminhtml .el-table .el-table__header colgroup col:nth-child(7),
.adminhtml .el-table .el-table__header colgroup col:nth-child(8){
    width: 125px;
}
.adminhtml .el-table .el-table__header colgroup col:nth-child(9){
    width: 80px;
}
.adminhtml .el-table .el-table__body colgroup col:nth-child(1),
.adminhtml .el-table .el-table__body colgroup col:nth-child(3),
.adminhtml .el-table .el-table__body colgroup col:nth-child(4){
    width: 70px;
}
.adminhtml .el-table .el-table__body colgroup col:nth-child(2){
    width: 120px;
}
.adminhtml .el-table .el-table__body colgroup col:nth-child(5),
.adminhtml .el-table .el-table__body colgroup col:nth-child(7),
.adminhtml .el-table .el-table__body colgroup col:nth-child(8){
    width: 125px;
}
.adminhtml .el-table .el-table__body colgroup col:nth-child(9){
    width: 80px;
}
</style>