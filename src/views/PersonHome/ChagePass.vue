<template>
    <div class="uppass_box">
        <el-steps :active="activenum" finish-status="success" align-center>
            <el-step title="步骤1"></el-step>
            <el-step title="步骤2" ></el-step>
            <el-step title="步骤3"></el-step>
            <el-step title="步骤4"></el-step>
        </el-steps>
        <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
            <el-form-item label="旧密码：" prop="oldPass">
                <el-input type="password" v-model="ruleForm.oldPass" autocomplete="off" placeholder="请输入旧密码">
                    <template slot="append">发送验证码</template></el-input>
            </el-form-item>
            <el-form-item label="验证码：" prop="region">
                <el-input v-model="ruleForm.region" clearable  placeholder="请输入验证码" class="emailbox"></el-input>
                <el-button type="primary" plain style="margin-left:10px;">提交验证码</el-button>
            </el-form-item>
            <el-form-item label="新密码：" prop="pass">
                <el-input type="password" v-model="ruleForm.pass" autocomplete="off" placeholder="请输入新密码"></el-input>
            </el-form-item>
            <el-form-item label="确认新密码：" prop="checkPass">
                <el-input type="password" v-model="ruleForm.checkPass" autocomplete="off"  placeholder="请再次输入新密码"></el-input>
            </el-form-item>
            <el-form-item class="buttombtn">
                <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
                <el-button @click="resetForm('ruleForm')">重置</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
    export default {
    data() {
        var validateoldPass = (rule, value, callback) => {
            if (!value) {
                return callback(new Error('密码不能为空'));
            }
        };
        var validatePass = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('请输入密码'));
            } else {
                if (this.ruleForm.checkPass !== '') {
                    this.$refs.ruleForm.validateField('checkPass');
                }
                callback();
            }
        };
        var validatePass2 = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('请再次输入密码'));
            } else if (value !== this.ruleForm.pass) {
                callback(new Error('两次输入密码不一致!'));
            } else {
                callback();
            }
        };
        return {
            ruleForm: {
                pass: '',
                checkPass: '',
                oldPass: ''
            },
            activenum:1,
            rules: {
                pass: [
                    { validator: validatePass, trigger: 'blur' }
                ],
                checkPass: [
                    { validator: validatePass2, trigger: 'blur' }
                ],
                oldPass: [
                    { validator: validateoldPass, trigger: 'blur' }
                ]
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