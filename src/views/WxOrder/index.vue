<template>
    <div>
        <el-table 
            :data="wxData" 
            style="width: 100%" 
            :default-sort="{ prop: 'date', order: 'descending' }"
           >
            <el-table-column prop="id" label="编号" sortable ></el-table-column>
            <el-table-column prop="name" label="用户名" sortable></el-table-column>
            <el-table-column prop="money" label="交易金额" sortable></el-table-column>
            <el-table-column prop="plat" label="交易平台" sortable ></el-table-column>
            <el-table-column prop="create_time" label="交易时间" sortable></el-table-column>
        </el-table>
    </div>
</template>
<script>
export default {
    name: "wxOrder",
    components: {},
    data() {
        return {
            wxData: [
                {
                    id:'1',
                    name:'ltt',
                    money:"200",
                    plat:"微信",
                    create_time:"2022-7-21 15:25"
                },
                {
                    id:'2',
                    name:'yll',
                    money:"200",
                    plat:"微信",
                    create_time:"2022-7-22 15:25"
                }
            ],
            state: false,
            fullscreenLoading: false,
        };
    },
    created() {
        this.getList();
    },
    methods: {
        getList() {
            this.$http({
                method: "GET",
                url: 'api/alipay_order_query?page=1',
            }).then(res => {
                console.log(res);
                let response = res.data;
                if (response.status == 'success') {
                    response.data.forEach(item => {
                        item.create_time = new Date(item.create_time).toLocaleString();//转换为年月日
                    })
                    // this.wxData = response.data;
                } else {
                    this.$message.error(response.msg);
                }
            })
        },
    },
};

</script>
<style>

</style>