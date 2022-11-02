<template>
    <div class="mark" v-if="upstate">
        <div class="up_from">
            <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
            <el-form-item label="名称">
                <el-input type="text" @nameindex="okk"></el-input>
            </el-form-item>
            <el-form-item label="创建时间" >
                <el-input type="text"></el-input>
            </el-form-item>
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
        return{
            ruleForm:{
                name:'',
                create_time:'',
            },
            contee:'1',
            rules:{}
        }
    },
    props:{
            upstate:{
                type:Boolean,
                default(){
                    return false
                }
            },
            
    },
    methods:{
        cancelForm(){
            this.$emit('upcancel')
        },
        okk(val){
            this.contee=val;
            console.log(val);
            console.log(234)
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