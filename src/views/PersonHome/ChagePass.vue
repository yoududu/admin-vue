<template>
    <div class="uppass_box">
        <el-steps :active="activenum" finish-status="success" align-center>
            <el-step description="获取验证码"></el-step>
            <el-step description="获取旧邮箱验证码" ></el-step>
            <el-step description="获取旧邮箱验证码"></el-step>
            <el-step description="获取旧邮箱验证码"></el-step>
        </el-steps>
        <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
            <el-form-item label="发送验证码：" prop="oldPass">
                <!-- <el-input type="password" v-model="ruleForm.oldPass" autocomplete="off" placeholder="请输入旧密码"></el-input> -->
                <el-button type="success" plain  @click="passcode">点击发送验证到邮箱</el-button>
            </el-form-item>
            <el-form-item label="验证码：" prop="oldpasscode">
                <el-input v-model="ruleForm.oldpasscode" clearable  placeholder="请输入验证码" ></el-input><!--class="emailbox"-->
                <!-- <el-button type="primary" plain style="margin-left:10px;">提交验证码</el-button> -->
            </el-form-item>
            <el-form-item label="新密码：" prop="newpass">
                <el-input type="password" v-model="ruleForm.newpass" autocomplete="off" placeholder="请输入新密码"></el-input>
            </el-form-item>
            <el-form-item label="确认新密码：" prop="twonewpass">
                <el-input type="password" v-model="ruleForm.twonewpass" autocomplete="off"  placeholder="请再次输入新密码"></el-input>
            </el-form-item>
            <el-form-item class="buttombtn">
                <el-button type="success" plain @click="submitForm('ruleForm')">提交</el-button>
                <el-button @click="resetForm('ruleForm')">重置</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
    export default {
    data() {
        // var validateoldnewPass = (rule, value, callback) => {
        //     if (!value) {
        //         return callback(new Error('密码不能为空'));
        //     }
        // };
        var validatenewPass = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('请输入密码'));
            } else {
                if (this.ruleForm.checkPass !== '') {
                    this.$refs.ruleForm.validateField('twonewpass');
                }
                callback();
            }
        };
        var validatenewPasstwo = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('请再次输入密码'));
            } else if (value !== this.ruleForm.newpass) {
                callback(new Error('两次输入密码不一致!'));
            } else {
                callback();
            }
        };
        return {
            ruleForm: {
                oldPass: '',
                oldpasscode: '',
                newpass: '',
                twonewpass:''
            },
            activenum:1,
            rules: {
                newpass: [
                    { validator: validatenewPass, trigger: 'blur' }
                ],
                twonewpass: [
                    { validator: validatenewPasstwo, trigger: 'blur' }
                ],
            }
        };
    },
    methods: {
        // submitForm(formName) {
        //     this.$refs[formName].validate((valid) => {
        //         if (valid) {
        //             alert('submit!');
        //         } else {
        //             console.log('error submit!!');
        //             return false;
        //         }
        //     });
        // },
        resetForm(formName) {
            this.$refs[formName].resetFields();
        },
        passcode(){
            // if(this.ruleForm.oldPass){}
            this.$http({
                url:"api/superchangepwd",
                method:"POST"
            }).then(res => {
                let response = res.data;
                if(response.status == "error"){
                    this.$message.error(response.msg)
                }else{
                    const h = this.$createElement;
                    this.$alert((h('p', null, [
                        h('p', null, '验证码发送成功，请注意查收，2分钟后失效！'),
                        h('p', { style: 'color: teal' }, '请输入验证码和两次密码并提交！')
                    ])), "提示", {
                        confirmButtonText: '确定',
                        callback: action => {
                            this.$message({
                                type: 'success',
                                message: "验证码发送成功！"
                            });
                        }
                    });
                }
            })
        },
        submitForm(ruleForm){
            this.$refs[ruleForm].validate((valid) => {
                if (valid) {
                    let text = this.ruleForm.oldpasscode;
                    let pwd1 = this.ruleForm.newpass;
                    let pwd2 = this.ruleForm.twonewpass;
                    this.$http({
                        url:"/api/superchangepwd",
                        method:"PUT",
                        data:`text=${text}&pwd1=${pwd1}&pwd2=${pwd2}`,
                        headers:{
                            'Content-Type': "application/x-www-form-urlencoded"
                        }
                    }).then(res => {
                        let respone = res.data;
                        if(respone.status == "error"){
                            this.$message.error(respone.msg)
                        }else{
                            this.$alert("密码修改成功！", "提示", {
                                confirmButtonText: '确定',
                                callback: action => {
                                    // this.$message({
                                    //     type: 'success',
                                    //     message: "密码修改成功！"
                                    // });
                                    this.$store.commit('removeToken'); //调用removeToken
                                    this.$cookie.remove('rh_id'); //删除rh_id
                                    this.$router.push('/login');  //跳转
                                    this.$message({
                                        type: 'error',
                                        message: "登录身份过期，请重新登录！"
                                    });
                                }
                            });
                            
                        }
                    })
                } else {
                    return false;
                }
            })

        }
    }
}
</script>
<style>
.uppass_box .demo-ruleForm{
    width: 540px;
    margin: auto;
}
.uppass_box .emailbox{
    width: 339px;
}
.uppass_box .el-form-item__content{
    display: flex;
    align-items: center;
}
.uppass_box .el-input-group__append, .el-input-group__prepend{
    color: #67C23A;
    background: #f0f9eb;
    border-color: #c2e7b0;
    cursor: pointer;
}
.uppass_box .el-input-group__append:hover{
    background: #67C23A;
    border-color: #67C23A;
    color: #FFF;
}
.uppass_box .is-process{
    color: #C0C4CC;
    border-color: #C0C4CC;
}
.uppass_box .el-step.is-center .el-step__description{
    width: 100px;
    padding: 10px 0px;
    margin: auto;
}
/* .uppass_box .buttombtn .el-form-item__content{
    display: block;
    margin-left: 0px;
    text-align: center;
} */
</style>

<style scoped>
.uppass_box{
    width: 800px;
    padding: 0px 29px;
}

</style>