<template>
    <div>
        <header class="title_header">
        <el-button type="primary" @click="showAdd">新增标题</el-button>
      </header>
      <el-table
    :data="modelData"
    style="width: 100%"
    :default-sort = "{prop: 'date', order: 'descending'}"
    >
    <el-table-column
      prop="id"
      label="编号"
      sortable>
    </el-table-column>
    <el-table-column
      prop="name"
      label="章节"
      sortable>
    </el-table-column>
    <el-table-column
      prop="classify_id"
      label="分类编号"
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
        <!-- <el-button
                size="mini"
                @click="handleEdit(scope.$index, scope.row)">编辑</el-button> -->
        <!-- <UpDate :upstate="upstate" @upcancel="upcancel"></UpDate> -->
      
        <el-button size="mini" @click="handleEdit(scope.$index, scope.row)" v-loading.fullscreen.lock="fullscreenLoading">编辑</el-button>
        <!-- <el-dialog title="" :visible.sync="dialogFormVisible">
          <el-form :model="form" id="okk">
            <el-form-item label="编号：" :label-width="formLabelWidth">
              <el-form-item v-model="form.id" autocomplete="off">{{form.id}}</el-form-item>
            </el-form-item>
            <el-form-item label="章节：" :label-width="formLabelWidth">
              <el-input v-model="form.name" autocomplete="off"></el-input>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="upcancel">取 消</el-button>
            <el-button type="primary" @click="updateok(scope.$index,scope.row)">确 定</el-button>
          </div>
        </el-dialog> -->
      
      <el-button
        style="margin-left: 10px"
          size="mini"
          type="danger"
          @click="handleDelete(scope.$index, scope.row)" v-loading.fullscreen.lock="fullscreenLoading">删除</el-button>
      </template>
    </el-table-column>
  </el-table>
    </div>
</template>
<script>
export default {
    data(){
        return{
            modelData:[{
                id:'12',
                name:'',
                classify_id:'61',
                course_id:'',
                update_time:'',
                
            }],
            fullscreenLoading: false,
            
        }
    },
    created(){
        this.rerenderTableData();
    },
    methods: {
      rerenderTableData(){
        //  let formData = new FormData();
        //     formData.append('pk',row.id);
        this.$http({
            url:"/api/course?pk=33",
            method: "GET",
            // data:`pk=${this.chapterData.classify_id}`
        }).then(res => {
            
            let response = res.data;
            if(response.status == 'success'){
                response.data.forEach(item => {

                    item.create_time = new Date(item.create_time).toLocaleString();//转换为年月日
                    item.update_time = new Date(item.update_time).toLocaleString();
                })
                this.modelData = response.data;
                console.log(response);
            }else{
                this.$message.error(response.msg);
            }
        })
      },

      showAdd(){}
    }
}
</script>
<style scoped>
.title_header{
  background-color: #fff;
  margin-bottom: 10px;
  padding: 10px;
}</style>