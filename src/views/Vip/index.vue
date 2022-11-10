<template>
    <div class="viphtml">
        <header class="vip_header">
        <el-button class="addbtn" type="primary" @click="vipAdd">新增会员</el-button>
      </header>
      <VipAdd :state="state" @cancel="cancel" @success="success"></VipAdd>
      <el-table
    :data="vipData"
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
      label="名称"
      sortable>
    </el-table-column>
    <el-table-column
      prop="description"
      label="描述"
      sortable>
    </el-table-column>
    <el-table-column
      prop="origin_price"
      label="原价"
      sortable>
    </el-table-column>
    <el-table-column
      prop="price"
      label="单价"
      sortable>
    </el-table-column>
    <el-table-column
      prop="expires"
      label="期限"
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
        <el-button size="mini" @click="handleEdit(scope.$index, scope.row)" v-loading.fullscreen.lock="fullscreenLoading">编辑</el-button>
        <el-dialog title="" :visible.sync="dialogFormVisible">
          <el-form :model="form" id="okk">
            <el-form-item label="编号：" :label-width="formLabelWidth">
              <el-form-item v-model="form.id" autocomplete="off">{{form.id}}</el-form-item>
            </el-form-item>
            <el-form-item label="名称：" :label-width="formLabelWidth">
              <el-input v-model="form.name" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="描述：" :label-width="formLabelWidth">
              <el-input v-model="form.description" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="原价：" :label-width="formLabelWidth">
              <el-input v-model="form.origin_price" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="单价：" :label-width="formLabelWidth">
              <el-input v-model="form.price" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="期限：" :label-width="formLabelWidth">
              <el-input v-model="form.expires" autocomplete="off"></el-input>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="vipcancel">取 消</el-button>
            <el-button type="primary" @click="vipupdate(scope.$index,scope.row)">确 定</el-button>
          </div>
        </el-dialog>
      
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
import VipAdd from './VipAdd'
export default {
  name:"Vip",
  components:{
    VipAdd,
  },
    data() {
      return {
        vipData: [],
        fullscreenLoading: false,
        state: false,
        vipindex: 0,
        dialogFormVisible: false,
        form: {
          name: '',
          description:'',
          origin_price:'',
          price:'',
          expires:'',
          delivery: false,
          type: [],
          resource: '',
          desc: ''
        },
        formLabelWidth: '100px',
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
            url:"/api/vip",
            // method: "GET",
        }).then(res => {
            console.log(res);
            let response = res.data;
            if(response.status == 'success'){
              response.data.forEach(item => {
                    item.expires = item.expires + '天';
                    item.create_time = new Date(item.create_time).toLocaleString();//转换为年月日
                    item.update_time = new Date(item.update_time).toLocaleString();
                })
                this.vipData = response.data;
            }else{
                this.$message.error(response.msg);
            }
        })
      },
      handleEdit(index,row) {
        this.dialogFormVisible = true
        this.vipindex=index;
        let newvipData = this.vipData[index];
        // let keys = Object.keys(this.form);
        this.form.name = newvipData.name;
        this.form.id = newvipData.id;
        this.form.expires = newvipData.expires;
        this.form.description = newvipData.description;
        this.form.origin_price = newvipData.origin_price;
        this.form.price = newvipData.price;
        console.log(newvipData)
        console.log(this)
      
      },
      vipupdate(index,row){
        console.log(this.form.name)
        this.$confirm('确认修改文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'denger'
        }).then(() => {
          // let name=this.form.name;
          this.fullscreenLoading = true;
          this.$http({
            url: "/api/vip",
            method: "PUT",
            data: `pk=${this.form.id}&name=${this.form.name}&description=${this.form.description}&origin_price=${this.form.origin_price}&price=${this.form.price}&expires=${this.form.expires}`,
            headers: {
              'Content-Type': "application/x-www-form-urlencoded"
            }
          }).then(res => {
            this.fullscreenLoading = false;
            // console.log(res)
            let response = res.data;
            // console.log(response)
            if (response.status == 'success') {
              // console.log(response.status)
              this.$message({
                type: "success",
                message: "修改成功!!",
              });
              this.rerenderTableData();
            } else {
              this.$message.error(response.msg);
            }
          }).catch(error => {
                        this.$message.error('接口错误');
                    })
        }).catch(() => {
            this.fullscreenLoading = false;
            this.$message({
              type: 'info',
              message: '已取消修改！'
            });
          });
        this.dialogFormVisible = false;
      },
      vipcancel(){
        this.dialogFormVisible = false;
      },
      handleDelete(index, row) {
        this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'denger'
        }).then(() => {
          // let formData = new FormData();
          // formData.append('pk',row.id);
          this.fullscreenLoading = true;
          this.$http({
            url: "/api/vip",
            method: "DELETE",
            data: `pk=${row.id}`,
            headers: {
              'Content-Type': "application/x-www-form-urlencoded"
            }
          }).then(res => {
            console.log(res)
            this.fullscreenLoading = false;
            let response = res.data;
            if (response.status == 'success') {
              this.$message({
                type: "success",
                message: "删除成功！"
              });
              this.rerenderTableData();
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
      },

      vipAdd(){
        this.state = true;
      },
      cancel(){
          this.state = false;
          // this.dialogFormVisible = false;
        },
          success(){
          this.rerenderTableData();
        }
    },
    
}
</script>
<style>
.viphtml .el-dialog {
    width: 500px;
    position: absolute !important;
    top: 50% !important;
    left: 50% !important;
    transform: translate(-50%,-50%) !important;
    background-color: #fff;
    padding: 20px;
    border-radius: 5px;
    padding-top: 40px;
    box-shadow: none !important;
    margin-top: 0vh !important;
}
.viphtml .el-dialog__header{
  padding: 0px;
}
.viphtml .el-dialog__body{
  padding-bottom: 10px;
}
.viphtml .el-table .el-table__header-wrapper .el-table__header colgroup col:nth-child(1),
.viphtml .el-table .el-table__header-wrapper .el-table__header colgroup col:nth-child(2),
.viphtml .el-table .el-table__header-wrapper .el-table__header colgroup col:nth-child(3),
.viphtml .el-table .el-table__header-wrapper .el-table__header colgroup col:nth-child(4),
.viphtml .el-table .el-table__header-wrapper .el-table__header colgroup col:nth-child(5),
.viphtml .el-table .el-table__header-wrapper .el-table__header colgroup col:nth-child(6){
  width: 90px;
}
.viphtml .el-table .el-table__body-wrapper .el-table__body colgroup col:nth-child(1),
.viphtml .el-table .el-table__body-wrapper .el-table__body colgroup col:nth-child(2),
.viphtml .el-table .el-table__body-wrapper .el-table__body colgroup col:nth-child(3),
.viphtml .el-table .el-table__body-wrapper .el-table__body colgroup col:nth-child(4),
.viphtml .el-table .el-table__body-wrapper .el-table__body colgroup col:nth-child(5),
.viphtml .el-table .el-table__body-wrapper .el-table__body colgroup col:nth-child(6){
  width: 90px;
}
.vip_header{
  background-color: #fff;
  margin-bottom: 10px;
  padding: 10px;
  display: flex;
  flex-direction: row-reverse;
}
</style>