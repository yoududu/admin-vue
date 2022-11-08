<template>
    <div class="mark videoadd" v-if="state" >
        <div class="title_from">
        <el-form class="video_add" 
            ref="ruleForm"
            :rules="rules"
            label-position="right" 
            label-width="auto" 
            :model="formLabelAlign"
            
            >
            <el-form-item label="章节编号：">
                {{chapterid}}
            </el-form-item>
            <el-form-item label="视频名称：" prop="name">
                <el-input v-model="formLabelAlign.name"></el-input>
            </el-form-item>
            <el-form-item label="视频许可：" prop="video_permission">
                <el-radio-group v-model="formLabelAlign.video_permission">
                    <el-radio :label="1" >免费</el-radio>
                    <el-radio :label="2">VIP</el-radio>
                </el-radio-group>
            </el-form-item>
            <el-form-item class="addvid" label="添加视频：" prop="video">
                <el-upload 
                    class="avatar-uploader"
                    action="http://81.68.121.52:8000/api/chapter_video"
                    :show-file-list="false"
                    :auto-upload="false"
                    :data="videocont"
                    name="video"
                    ref="upload"
                    :headers="header"
                    :on-change="change"  
                    :on-success="successs"
                    :namee="name"
                    :zs="video_permission"
                    >
                    <img v-if="imageUrl" :src="imageUrl" class="avatar">
                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
            </el-form-item> 
            <el-form-item>
                <el-button type="primary" @click="submitUpload" v-loading.fullscreen.lock="fullscreenLoading">确认</el-button>
                <el-button @click="cancelForm('ruleForm')">取消</el-button>
            </el-form-item>
        </el-form>
    </div>
    </div>
</template>
<script>
// $chilren $parent $root $emit props ref注册 this.$refs去找你注册的这个组件
export default{
    data(){
        const validateName = (rule,value,callback) => {
            if(value == ""){
                callback(new Error('请输入标题名称'));
            }else{
                callback();
            }
        }
        return{
            formLabelAlign:{
                name:"",
                chapter_id:"",
                video_permission:"",
                video:"",
            },
            rules:{
                name:[{validator:validateName,trigger:"blur"}]
                //      自定义函数               触发方式
            },
            videocont:{
                name:'',
                chapter_id:'',
                video_permission:"",
            },
            header:{
                authorization:`Bearer ${this.$store.state.token}`
            },
            imageUrl:'',
            // visiable:true
            fileList: [ ],
            action:'',
            name:"",
            video_permission:"",
            chapter_id:0,
            fullscreenLoading:false
            
        }
    },
    props:{
            state:{
                type:Boolean,
                default(){
                    return false
                }
            },
            chapterid:{
                type:Number,
                required:true,
            },
    },
    // created(){
    //     // this.visiable = this.state;
    // },
    methods:{
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
        submitUpload(){
            this.$refs.upload.submit();
            this.fullscreenLoading=true;
            // this.$emit('success');
        },
        successs(res){
            if(res.status == 'error'){
                this.$message.error(res.msg)
            }else{
                this.$message({
                type:"success",
                message:'创建成功！'
            })
            this.state = false
            this.fullscreenLoading=false;
            this.rerenderVideoData();
            }
        },
        change(file){
            // let result = URL.createObjectURL(file.raw);
            // this.image = result,
            // let reader = new FileReader();
            // reader.onload = (e) => {
            //     // console.log(e.target.result);
            //     // this.src = e.target.result;
            //     this.imageURL = e.target.result;
            //     // console.log(this.src)
            // }
            // reader.readAsDataURL(file.raw)
            this.imageUrl = URL.createObjectURL(file.raw);
            this.videocont['name']=this.formLabelAlign.name;
            this.videocont['video_permission']=this.formLabelAlign.video_permission;
            this.videocont['chapter_id']=this.chapterid;
            
            console.log(file,1)  
        },
        submitForm(name){
            this.$refs[name].validate((state) => {
                if(state){
                    // let video = this.$refs.upload;
                    let name = this.formLabelAlign.name;
                    let chapter_id = this.chapterid;
                    let video_permission = this.formLabelAlign.video_permission;
                    let formData = new FormData();
                    // formData.append('video',video);
                    formData.append('chapter_id',chapter_id);
                    formData.append('video_permission',video_permission);
                    formData.append('name',name);
                    // console.log(video,chapter_id,video_permission,name)
                    this.$http({   //发请求
                        url:"/api/chapter_video",
                        method:'POST',
                        data:formData
                    }).then(res => {
                        let response = res.data;
                        console.log(response)
                        if (response.status == 'success'){
                            this.formLabelAlign.name = "";
                            this.$emit('cancel');
                            this.$message({
                                type:'success',
                                message:`${response.msg}:${response.title}`
                            })
                            this.$emit('success')
                        }else{
                            this.$message.error(response.msg);
                        }
                    }).catch(error => {
                        this.$message.error('接口错误');
                    })
                }else{
                    return false;
                }
            })
        },
        cancelForm(){
            this.formLabelAlign.name = "";
            // this.visiable = false;
            this.$emit('cancel')
        }
    }
}
</script>
<style>
.videoadd .addvid{
    line-height: 100px;
}
 .videoadd .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .videoadd .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .videoadd .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 100px;
    height: 100px;
    line-height: 100px;
    text-align: center;
  }
  .videoadd .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
.mark{
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom:0;
    background-color: rgba(0,0,0,.4);
    z-index: 999;
}
.videoadd .el-upload-list{
    width: 280px;
}
.videoadd .upload-demo{
    height: 110px;
}
</style>
<style scoped>
.title_from{
    width: 400px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
    background-color: #fff;
    padding: 40px;
    border-radius: 5px;
    padding-top: 40px;
}
</style>