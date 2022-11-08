<template>
  <div class="videohtml">
    <el-tree :data="treechoice"
         :props="defaultProps" 
         accordion
         @node-click="handleNodeClick"
         @current-change="handid" ref="lala" 
         :default-expanded-keys="[0,1]"
         :load="loadNode" :titleidd="titleid" :chapteridd="chapterid">
      </el-tree>
      <div class="video_right">
    <header class="video_header">
      <el-button type="primary" @click="showAdd">新增标题</el-button>
    </header>
    <Add :state="state" @cancel="cancel" @success="success" :chapterid="chapterid"></Add>
    <el-table :data="videoData" style="width: 100%" :default-sort="{ prop: 'date', order: 'descending' }">
      <el-table-column prop="id" label="编号" sortable>
      </el-table-column>
      <el-table-column prop="name" label="章节" sortable>
      </el-table-column>
      <el-table-column prop="chapter_id" label="章节编号" sortable>
      </el-table-column>
      <el-table-column prop="video_permission" label="视频许可" :formatter="permission" sortable>
      </el-table-column>
      <el-table-column prop="mp4_url" label="视频地址" sortable>
        <el-button size="mini" type="primary" plain @click="open">播放视频</el-button>
      </el-table-column>
      <el-table-column prop="create_time" label="创建时间" sortable>
      </el-table-column>
      <el-table-column prop="update_time" label="更新日期" sortable>
      </el-table-column>
      <div id="dplayer" ref="dpl"></div>
      <el-table-column label="操作">
        <template #default="scope">
          <el-button size="mini" @click="handleEdit(scope.$index, scope.row)"
            v-loading.fullscreen.lock="fullscreenLoading" :videoid="videoid" :videoname="videoname">编辑</el-button>
            <UpDate @upcancel="upcancel" @upsuccess="upsuccess" :upstate="upstate" :chapterid="chapterid" :videoid="videoid" :videoname="videoname"></UpDate>
          <el-button style="margin-left: 10px" size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)"
            v-loading.fullscreen.lock="fullscreenLoading">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
  </div>
</template>
<script>
import Add from './Add';
import UpDate from './UpDate'
import DPlayer from 'dplayer';
export default {
  components:{
    Add,
    UpDate,
  },
  data() {
    return {
      videoData: [{
      }],
      titledata: {
        name: ''
      },
      state:false,
      upstate:false,
      fullscreenLoading: false,
      videotitle: [],
      videochapter: [],
      titlefor: 1 - 1 - 1,
      index: '',
      sum: '',
      chapterid: 25,
      titleid:33,
      treechoice: [{
        label: '请选择',
        children: []
      },],
      defaultProps: {
        children: 'children',
        label: 'label'
      },
      videoid:0,
      videoname:"",
    }
  },
  created() {
    this.rerenderVideoData();
    this.videoTitle();

  },
  methods: {
    bf(){
      const dp = new DPlayer({
        container: this.$refs.dpl,
        video: {
          url: 'demo.mp4',
        },
      });
    },
    open(){},
    loadNode(node, resolve) {
        if (node.level === 0) {
          return resolve([{ name: 'region' }]);
        }
      },
    handleNodeClick(treechoice) {
      console.log(this.chapterid)
    },
    handid(a,b){
      if(b.level == 3){
        this.chapterid = a.id
      }else if(b.level ==2){
        this.titleid = a.id
      }
      this.rerenderVideoData(); 
    },
    videoTitle() {
      this.$http({
        url: "/api/classify"
      }).then(res => {
        let response = res.data;
        if (response.status == 'success') {
          let treedata = response.data;
          let newArr = [];
          treedata.forEach(item => { //一级标题数组
            newArr.push(
              this.$http({
              url: '/api/chapter',
              params:{
                pk:item.id
              }
            }))
          });
          console.log(newArr)
          Promise.all(newArr).then(res => {
            res.forEach((item,index) => {
              let arr = [];
              item.data.data.forEach(itemm => {
                arr.push({
                  id:itemm.id,
                  label:itemm.name
                })
              })  //章节数组
              this.treechoice[0].children.push({
                id:treedata[index].id,
                label:treedata[index].name,
                children:arr
              })
            })
          })
        }else{
          this.$message.error(response.msg)
        }
      })
    },
    rerenderVideoData() {
      this.$http({
        url: `/api/chapter_video?pk=${this.chapterid}`,
        method: "GET",
      }).then(res => {
        let response = res.data;
        if (response.status == 'success') {
          response.data.forEach(item => {
            item.create_time = new Date(item.create_time).toLocaleString();//转换为年月日
            item.update_time = new Date(item.update_time).toLocaleString();
          })
          this.videoData = response.data;
          // console.log(response);
        } else {
          this.$message.error(response.msg);
        }
      })
    },
    handleEdit(index,row){
      this.upstate = true
      this.dialogFormVisible = true
      this.upindex = index;
      let newvideo = this.videoData[index];
      this.videoid = newvideo.id;
      this.videoname = newvideo.name;
      console.log(this.videoname)
      console.log(this.videoid)
      // console.log(this)
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
            url: "/api/chapter_video",
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
              this.rerenderVideoData();
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
    showAdd() { 
      this.state = true;
    },
    cancel() {
      this.state = false;
      this.dialogFormVisible = false;
    },
    success() {
      // this.state = false
      this.fullscreenLoading = true;
      if(res.status == 'error'){
                this.$message.error(res.msg)
            }else{
                this.$message({
                type:"success",
                message:'创建成功！'
            })
            this.fullscreenLoading = false;
            }
      this.rerenderVideoData();
      
    },
    upcancel() {
      this.upstate = false;
    },
    upsuccess() {
      this.rerenderVideoData();
    },
    permission(ow, column, cellValue){
    if (cellValue == 1) {
      return "免费"
    } else {
      return "VIP"
    }
  }
  },
  
}
</script>
<style scoped>
.video_header {
  background-color: #fff;
  margin-bottom: 10px;
  padding: 10px;
}
</style>
<style>
#dplayer{
  position: relative;
  right: 20px;
  top: 20px;
}
.videohtml .el-table .el-table__header colgroup col:nth-child(1),
.videohtml .el-table .el-table__header colgroup col:nth-child(2),
.videohtml .el-table .el-table__header colgroup col:nth-child(3),
.videohtml .el-table .el-table__header colgroup col:nth-child(4){
  width: 88px;
}
.videohtml .el-table .el-table__body colgroup col:nth-child(1),
.videohtml .el-table .el-table__body colgroup col:nth-child(2),
.videohtml .el-table .el-table__body colgroup col:nth-child(3),
.videohtml .el-table .el-table__body colgroup col:nth-child(4){
  width: 88px;
}
.videohtml .chapteri .el-icon-arrow-down:before {
  display: none;
}

.videohtml .el-menu-vertical-demo:not(.el-menu--collapse) {
  min-height: 56px !important;
  position: absolute;
  left: 10px;
  top: 2px;
  z-index: 9;
}

.videohtml .el-tree {
  width: 300px;
  margin-right: 10px;
}
.videohtml .video_right{
  width: 100%;
  height: auto;
}
.videohtml{
  display: flex;
  justify-content: space-between;
}
</style>