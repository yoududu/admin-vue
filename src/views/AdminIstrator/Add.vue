<template>
    <div class="adminadd">
        <p class="title">新增管理员账号</p>
        <el-form ref="form" :model="form" class="adduser">
            <el-form-item prop="username">
                <el-input v-model="form.username"></el-input>
            </el-form-item>
            <el-form-item class="btnuser">
                <el-button type="primary" @click="submitForm">提交</el-button>
                <el-button @click="resetForm('form')">重置</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>


    export default {
        data(){
            var validateName = (rule, value, callback) => {
                if (/\w{6,18}/.test(value)) {
                    callback();
                }else{
                    callback(Error('用户名必须是6~18位'))
                }
            }
            return{
                
                form:{
                username:''
                },
                rules:{
                username: [
                    { validator: validateName, trigger: 'blur' }
                ],
                }
            }
        },
        // adminydd 
        // 密码：3L93N6WLUR
        methods:{
            submitForm() {
                this.$refs.form.validate((valid) => {
                    if (valid) {
                        let username = this.form.username
                        let formdata = new FormData;
                        formdata.append('username',username)
                        this.$http({
                            url:"/api/createsuperuser",
                            method:"POST",
                            data:formdata
                        }).then(res => {
                            let response = res.data;
                            if(response.status == "error"){
                                this.$message.error(response.msg)
                            }else{
                                this.$alert(`用户名：${response.username}\n密码：${response.password}`, "新增账号信息提示", {
                                    confirmButtonText: '确定',
                                    callback: action => {
                                        this.$message({
                                            type: 'success',
                                            message: "用户名创建成功！"
                                        });
                                        this.form.username=""
                                    }
                                });
                            }
                        })
                    } else {
                        
                        return false;
                    }
                });
            },
            resetForm(form) {
                this.$refs.form.resetFields();
            }
        }
            
    }
</script>

<style scoped>
.adminadd .title{
    text-align: center;
    margin: 0px;
    padding: 150px 0px 100px 0px;
    color: #909399;
    font-size: 50px;
    letter-spacing: 5px;
    font-family: "Helvetica Neue",Helvetica,"PingFang SC","Hiragino Sans GB","Microsoft YaHei","微软雅黑",Arial,sans-serif;
}
.adminadd{
    height: 600px;
    background-color: #fff;
    box-sizing: border-box;
}
.adminadd .adduser{
    width: 300px;
    margin: auto;
    text-align: center;
}
.adminadd .btnuser{
    margin-top: 30px;
}
</style>