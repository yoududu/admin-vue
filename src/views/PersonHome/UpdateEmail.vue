<template>
    <div class="upemail_box">
        <el-steps :active="activenum" finish-status="success" align-center>
            <el-step description="获取旧邮箱验证码"></el-step>
            <el-step description="提交旧邮箱验证码"></el-step>
            <el-step description="获取新邮箱验证码"></el-step>
            <el-step description="提交新邮箱验证码"></el-step>
        </el-steps>
        <el-form :label-position="labelPosition" label-width="90px" :model="ruleForm" ref="ruleForm" class="demo-ruleForm">
            <el-form-item label="旧邮箱：" prop="oldEmail">
                <el-input v-model="ruleForm.oldEmail" clearable placeholder="请输入旧邮箱地址">
                </el-input>
                <el-button type="success" plain style="margin-left:10px;" @click="oldcode">发送验证码</el-button>
            </el-form-item>
            <el-form-item label="验证码：" prop="firstcode">
                <el-input v-model="ruleForm.firstcode" clearable  placeholder="请输入旧邮箱验证码" class="emailbox"></el-input>
                <el-button type="primary" plain style="margin-left:10px;" @click="submit_olecode">提交验证码</el-button>
            </el-form-item>
            <el-form-item label="新邮箱：" prop="newEmail">
                <el-input v-model="ruleForm.newEmail" clearable  placeholder="请输入新邮箱地址"></el-input>
                <el-button type="success" plain style="margin-left:10px;" @click="newcode">发送验证码</el-button>
            </el-form-item>
            <el-form-item label="验证码：" prop="secondcode">
                <el-input v-model="ruleForm.secondcode" clearable  placeholder="请输入新邮箱验证码" class="emailbox"></el-input>
                <el-button type="primary" plain style="margin-left:10px" @click="submit_newcode">提交验证码</el-button>
            </el-form-item>
            <el-form-item class="buttombtn">
                <el-button type="success" plain @click="submitForm('ruleForm')">完成</el-button>
                <el-button @click="resetForm('ruleForm')">重置</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
    export default {
        inject: ['reload'],
    data() {
        return {
            labelPosition: 'right',
            ruleForm: {
                oldEmail: '',
                firstcode: '',
                newEmail: '',
                secondcode:'',
                // resource:'',
            },
            activenum:0,
        };
    },
    created(){
        this.ruleForm.oldEmail = this.$store.state.user.email 
    },
    methods:{
        // 完成
        submitForm(ruleForm){
            this.reload()
        },
        // 重置按钮
        resetForm(formName) {
        this.$refs[formName].resetFields();
      },
    //   第一次发验证码
      oldcode(){
        if(this.ruleForm.oldEmail !== this.$store.state.user.email ){
            this.$message({
                type: 'error',
                message: "旧邮箱地址错误！"
            });
            this.ruleForm.oldEmail='';
        }else{
            this.$http({
                url:"/api/superchangeemail",
                method:"POST",
            }).then(res => {
                let response = res.data;
                if(response.status == "error"){
                    this.$message.error(response.msg)
                }else{
                    this.$alert("邮箱验证码发送成功，请注意查收，2分钟后过期作废！", "提示", {
                        confirmButtonText: '确定',
                        callback: action => {
                            this.$message({
                                type: 'success',
                                message: "验证码发送成功"
                            });
                            this.activenum=1;
                        }
                    });
                }
            })
        }
      },
    //   提交旧邮箱验证码
    submit_olecode(){
        if(/^\w{4}$/.test(this.ruleForm.firstcode)){
            let oldtext = this.ruleForm.firstcode
            this.$http({
                url:"/api/superchangeemail",
                method:"PUT",
                data:`text=${oldtext}`,
                headers: {
                    'Content-Type': "application/x-www-form-urlencoded"
                }
            }).then(res => {
                let response = res.data;
                if(response.status == "error"){
                    this.$message.error(response.msg)
                }else{
                    this.$alert("邮箱验证码验证成功", "提示", {
                        confirmButtonText: '确定',
                        callback: action => {
                            this.$message({
                                type: 'success',
                                message: "验证成功！"
                            });
                            this.activenum=2;
                        }
                    });
                }
            })
        }else{
            this.$message({
                type: 'error',
                message: "验证码错误！"
            });
            this.ruleForm.firstcode="";
        }
    },
    // 绑定新邮箱
    newcode(){
        if(/^[A-z0-9_]{4,16}@(163|qq|gmail|outlook|126)\.(com|cn|org)/.test(this.ruleForm.newEmail)){
            let email1 = this.ruleForm.newEmail;
            let email2 = this.ruleForm.newEmail;
            this.$http({
                url:"/api/superbindnewemail",
                method:"POST",
                data:`email1=${email1}&email2=${email2}`,
                headers: {
                    'Content-Type': "application/x-www-form-urlencoded"
                }
            }).then(res => {
                let response = res.data;
                if(response.status == "error"){
                    this.$message.error(response.msg)
                }else{
                    this.$alert("邮箱验证码发送成功，请注意查收，2分钟后过期作废！", "提示", {
                        confirmButtonText: '确定',
                        callback: action => {
                            this.$message({
                                type: 'success',
                                message: "验证码发送成功！"
                            });
                            this.activenum=3;
                        }
                    });
                }
            })
        }else{
            this.$message({
                type: 'error',
                message: "邮箱格式错误！"
            });
            this.ruleForm.newEmail=""
        }
    },
    // 新邮箱验证码
    submit_newcode(){
        if(/^\w{4}$/.test(this.ruleForm.secondcode)){
            let newtext = this.ruleForm.secondcode;
            // console.log(newtext)
            this.$http({
                url:"/api/superbindnewemail",
                method:"PUT",
                data:`text=${newtext}`,
                headers: {
                    'Content-Type': "application/x-www-form-urlencoded"
                }
            }).then(res => {
                let response = res.data;
                if(response.status == "error"){
                    this.$message.error(response.msg)
                    console.log(response.msg)
                    console.log(111111)
                    
                }else{
                    this.$alert("邮箱验证码验证成功", "提示", {
                        confirmButtonText: '确定',
                        callback: action => {
                            this.$message({
                                type: 'success',
                                message: "验证成功！"
                            });
                            this.activenum=4;
                        }
                    });
                }
            })
        }else{
            this.$message({
                type: 'error',
                message: "验证码错误！"
            });
            this.ruleForm.secondcode=""
        }
    }
    }
}
</script>
<style>
.upemail_box .is-process{
    color: #C0C4CC;
    border-color: #C0C4CC;
}
.upemail_box .el-step.is-center .el-step__description{
    width: 100px;
    padding: 10px 0px;
    margin: auto;
}
.upemail_box .demo-ruleForm{
    width: 540px;
    margin: auto;
}
.upemail_box .emailbox{
    width: 339px;
}
.upemail_box .el-form-item__content{
    display: flex;
    align-items: center;
}
.el-steps--horizontal{
    margin: 20px auto;
}
.upemail_box .el-input-group__append, .el-input-group__prepend{
    color: #67C23A;
    background: #f0f9eb;
    border-color: #c2e7b0;
    cursor: pointer;
}
.upemail_box .el-input-group__append:hover{
    background: #67C23A;
    border-color: #67C23A;
    color: #FFF;
}


</style>
<style scoped>
.upemail_box{
    width: 800px;
    padding: 0px 29px;
}


</style>