<template>
    <div class="mark" v-if="upstate">
        <div class="up_from">
            <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
            <el-form-item label="章节编号：">
                {{chapterid}}
            </el-form-item>
            <el-form-item label="视频名称：" >
                <el-input type="text" v-model="ruleForm.name"></el-input>
            </el-form-item>
            <el-form-item style="color:red">如需更改视频请删除重新上传</el-form-item>
            <el-form-item>
                <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
                <el-button @click="cancelForm('ruleForm')">取消</el-button>
            </el-form-item>
        </el-form>
        </div>
    </div>
</template>
<script>

export default{
    data(){
        const validateName = (rule,value,callback) => {
            if(value == ""){
                callback(new Error('请输入视频名称'));
            }else{
                callback();
            }
        }
        return{
            ruleForm:{
                name:'',
            },
            contee:'1',
            rules:{
                name:[{validator:validateName,trigger:"blur"}]
                //      自定义函数               触发方式
            },
        }
    },
    props:{
            upstate:{
                type:Boolean,
                default(){
                    return false
                }
            },
            chapterid:{
                type:Number,
                required:true,
            },
            videoid:{
                type:Number,
                required:true,
            },
            videoname:{
                type:String,
                required:true,
            },
            
            
    },
    created(){
        this.ruleForm.name= this.videoname;
    },
    methods:{
        cancelForm(){
            console.log(1111111)
            this.$emit('upcancel')
            // this.upstate = false
        },
        submitForm(name){
            this.$refs[name].validate((upstate) => {
                if(upstate){
                    this.$confirm('是否修改该文件?', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'denger'
                    }).then(() => {
                    this.$http({
                        url:"/api/chapter_video",
                        method:"PUT",
                        data:`pk=${this.videoid}&name=${this.ruleForm.name}&chapter_id=${this.chapterid}`,
                        header:{
                            "Content-Type":"application/x-www-form-urlencoded"
                        }
                    }).then(res =>{
                        let response = res.data;
                        if(response.status == 'success'){
                            this.$emit('upcancel');
                            this.$message({
                                type:'success',
                                message:"修改成功!"
                            })
                            this.$emit('upsuccess')
                        }else{
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
                    })
                }else{
                    return false;
                }
            })
        }
    }
}
</script>
<style>
.mark{
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom:0;
    background-color: rgba(0,0,0,.04);
    z-index: 999;
}
.up_from{
    width: 400px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
    background-color: #fff;
    padding: 20px;
    border-radius: 5px;
    padding-top: 40px;
}
.el-form-item__content{
    margin-right: 18px;
}
</style>