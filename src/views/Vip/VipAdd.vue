<template>
    <div class="mark" v-if="state">
        <div class="vip_from">
        <el-form class="vip_add" 
            ref="ruleForm"
            :rules="rules"
            label-position="right" 
            label-width="100px" 
            :model="formLabelAlign">
            <el-descriptions title="新增会员"></el-descriptions>
            <el-form-item label="名称：" prop="name">
                <el-input v-model="formLabelAlign.name"></el-input>
            </el-form-item>
            <el-form-item label="描述：" prop="description">
                <el-input v-model="formLabelAlign.description"></el-input>
            </el-form-item>
            <el-form-item label="原价：" prop="origin_price">
                <el-input v-model.number="formLabelAlign.origin_price"></el-input>
            </el-form-item>
            <el-form-item label="单价：" prop="price">
                <el-input v-model.number="formLabelAlign.price"></el-input>
            </el-form-item>
            <el-form-item label="期限：" prop="expires">
                <el-input v-model.number="formLabelAlign.expires"></el-input>
            </el-form-item>

            <el-form-item>
                <el-button type="primary" @click="submitForm('ruleForm')" v-loading.fullscreen.lock="fullscreenLoading">确认</el-button>
                <el-button @click="cancelForm('ruleForm')" v-loading.fullscreen.lock="fullscreenLoading">取消</el-button>
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
                callback(new Error('请输入会员名称'));
            }else{
                callback();
            }
        }
        const validateDescription = (rule,value,callback) => {
            if(value == ""){
                callback(new Error('请输入会员描述'));
            }else{
                callback();
            }
        }
        const validateOrigin = (rule, value, callback) => {
            if (!value) {
                return callback(new Error('请输入会员原价'));
            }
            setTimeout(() => {
                if (!Number.isInteger(value)) {
                    callback(new Error('请输入数字值'));
                } else {
                    callback();
                }
            }, 1000);
        }
        const validatePrice = (rule, value, callback) => {
            if (!value) {
                return callback(new Error('请输入会员单价'));
            }
            setTimeout(() => {
                if (!Number.isInteger(value)) {
                    callback(new Error('请输入数字值'));
                } else {
                    callback();
                }
            }, 1000);
        }
        const validateExpires = (rule, value, callback) => {
            if (!value) {
                return callback(new Error('请输入会员期限'));
            }
            setTimeout(() => {
                if (!Number.isInteger(value)) {
                    callback(new Error('请输入数字值'));
                } else {
                    callback();
                }
            }, 1000);
        }
        return{
            formLabelAlign:{
                name:"",
                description:"",
                origin_price:"",
                price:"",
                expires:"",
            },
            fullscreenLoading: false,
            rules:{
                name:[{validator:validateName,trigger:"blur"}],
                //      自定义函数               触发方式
                description:[{validator:validateDescription,trigger:"blur"}],
                origin_price:[{validator:validateOrigin,trigger:"blur"}],
                price:[{validator:validatePrice,trigger:"blur"}],
                expires:[{validator:validateExpires,trigger:"blur"}],
            },
            // visiable:true
        }
    },
    props:{
            state:{
                type:Boolean,
                default(){
                    return false
                }
            }
    },
    methods:{
        submitForm(ruleForm){
            console.log(this.formLabelAlign)
            this.$refs[ruleForm].validate((state) => {
                if(state){
                    let name = this.formLabelAlign.name;
                    let description = this.formLabelAlign.description;
                    let origin_price = this.formLabelAlign.origin_price;
                    let price = this.formLabelAlign.price;
                    let expires = this.formLabelAlign.expires;
                    let formData = new FormData();
                    formData.append('name',name);
                    formData.append('description',description);
                    formData.append('origin_price',origin_price);
                    formData.append('price',price);
                    formData.append('expires',expires);
                    this.fullscreenLoading = true;
                    this.$http({   //发请求
                        url:"/api/vip",
                        method:'POST',
                        data:formData
                    }).then(res => {
                        this.fullscreenLoading = false;
                        let response = res.data;
                        // console.log(response)
                        if (response.status == 'success'){
                            this.formLabelAlign.name = "";
                            this.formLabelAlign.description = "";
                            this.formLabelAlign.origin_price = "";
                            this.formLabelAlign.price = "";
                            this.formLabelAlign.expires = "";
                            this.$emit('cancel');
                            this.$message({
                                type:'success',
                                message:'会员创建成功！'
                            })
                            this.$emit('success')
                        }else{
                            this.$message.error(response.msg);
                        }
                    }).catch(error => {
                        this.fullscreenLoading = false;
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
<style scoped>
.mark{
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom:0;
    background-color: rgba(0,0,0,.4);
    z-index: 999;
}</style>
<style scoped>
.vip_from{
    width: 360px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
    background-color: #fff;
    padding: 50px 70px 50px 50px;
    border-radius: 5px;
}
</style>