<template>
    <div class="basic_box">
        <el-form :label-position="labelPosition" label-width="100px" :model="ruleForm" ref="ruleForm" class="demo-ruleForm">
            <el-form-item label="用户昵称：" prop="name">
                <el-input v-model="ruleForm.name" clearable placeholder="请输入新的用户昵称"></el-input>
            </el-form-item>
            <el-form-item label="手机号码：" prop="phone">
                <el-input v-model="ruleForm.phone" clearable  placeholder="请输入新的手机号"></el-input>
            </el-form-item>
            <el-form-item label="部门：" prop="department">
                <el-select v-model="ruleForm.department" placeholder="请选择">
                    <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="性别：" prop="gender">
                <el-radio-group v-model="ruleForm.gender">
                    <el-radio label="男"></el-radio>
                    <el-radio label="女"></el-radio>
                </el-radio-group>
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
        return {
            labelPosition: 'right',
            ruleForm: {
                name: '',
                phone: '',
                department: '',
                gender:''
            },
            activenum:1,
            options: [{
                value: '选项1',
                label: '财务部'
            }, {
                value: '选项2',
                label: '技术部'
            }, {
                value: '选项3',
                label: '后勤部'
            }, {
                value: '选项4',
                label: '人事部'
            }, {
                value: '选项5',
                label: '营销部'
            }],
        };
    },
    methods:{
        resetForm(formName) {
        this.$refs[formName].resetFields();
      },
      submitForm(){}
    }
}
</script>
<style>
.basic_box .demo-ruleForm{
    width: 540px;
    margin: auto;
}
/* .basic_box .el-tabs__content{
    margin-top: 70px;
} */
/* .basic_box .buttombtn{
    text-align: center;
} */
</style>
<style scoped>
.basic_box{
    width: 800px;
    padding: 0px 29px;
    margin-top: 65px;
}


</style>