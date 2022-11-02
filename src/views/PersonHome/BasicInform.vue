<template>
    <div class="basic_box">
        <el-form :label-position="labelPosition" label-width="100px" :model="ruleForm" ref="ruleForm" class="demo-ruleForm">
            <el-form-item label="用户名称：" prop="name">
                <el-input v-model="ruleForm.name" clearable></el-input>
            </el-form-item>
            <el-form-item label="手机号码：" prop="region">
                <el-input v-model="ruleForm.region" clearable></el-input>
            </el-form-item>
            <el-form-item label="邮箱：" prop="type">
                <el-input v-model="ruleForm.type" clearable></el-input>
            </el-form-item>
            <el-form-item label="性别：" prop="resource">
                <el-radio-group v-model="ruleForm.resource">
                    <el-radio label="男"></el-radio>
                    <el-radio label="女"></el-radio>
                </el-radio-group>
            </el-form-item>
            <el-form-item>
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
                region: '',
                type: '',
                // resource:'',
            },
        };
    },
    methods:{
        resetForm(formName) {
        this.$refs[formName].resetFields();
      }
    }
}
</script>

<style scoped>
.basic_box{
    width: 800px;
    padding: 0px 29px;
}

</style>