<template>
    <div>
        <div class="box">
            <p class="aname">基本资料</p>
            <div class="acontent">
                <el-tabs v-model="activeName" @tab-click="handleClick">
                    <el-tab-pane label="修改信息" name="first">
                        <BasicInform></BasicInform>
                    </el-tab-pane>
                    <el-tab-pane label="修改邮箱" name="second">
                        <UpdateEmail></UpdateEmail>
                    </el-tab-pane>
                    <el-tab-pane label="修改密码" name="third">
                        <ChagePass></ChagePass>
                    </el-tab-pane>
                </el-tabs>
            </div>
        </div>
    </div>
</template>

<script>
import BasicInform from './BasicInform.vue';
import ChagePass from './ChagePass.vue'
import UpdateEmail from './UpdateEmail.vue'
    export default {
        components:{
            BasicInform,
            ChagePass,
            UpdateEmail,
        },
    data() {
        return {
            activeName: 'first'
        };
    },
    methods: {
        handleClick(tab, event) {
            console.log(tab, event);
        },
    }
    }
        
    
</script>

<style scoped>
.box{
    width: 898px;
    margin-left: 10px;
    margin-bottom: 25px;
    background-color: #fff;
    border: 1px solid #ddd;
    border-radius: 4px;
    height: 100%;
    box-shadow: 0 1px 1px rgb(0 0 0 / 5%);
}
.aname{
    width: 872px;
    background-color: rgb(56 80 111);
    color: rgb(191, 203, 217);
    font-weight: 700;
    border-radius: 2px 2px 0 0;
    padding: 13px;
    border-bottom: 1px solid #eee;
    text-align: left;
    margin: 0px !important;
}
.acontent{
    width: 858px;
    height: auto;
    background-color: #fff;
    color: inherit;
    padding: 15px 20px 20px 20px;
    border-color: #e7eaec;
    -webkit-border-image: none;
    -o-border-image: none;
    border-image: none;
    border-style: solid solid none;
    border-width: 1px 0;
}
</style>