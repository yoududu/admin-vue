<template>
    <div class="top">
        <div class="mainn" ref="main"></div>
        <!-- <div class="mainn" ref="kuxuan"></div> -->
        <!-- <xuanKu></xuanKu> -->
        <zhu></zhu>
    </div>
</template>

<script>
import xuanKu from './xuanKu.vue'
import zhu from './zhuzhang.vue'
import * as echarts from 'echarts'
export default {
    components:{
        xuanKu,
        zhu,
    },
    data() {
        return {

        }
    },
    mounted() {
        // 基于准备好的dom，初始化echarts实例
        var myChart = echarts.init(this.$refs.main);
        console.log(this.$refs.main)
        var option = {
            legend: {
                top: 'bottom'
            },
            toolbox: {
                show: true,
                feature: {
                    mark: { show: true },
                    dataView: { show: true, readOnly: false },
                    restore: { show: true },
                    saveAsImage: { show: true }
                }
            },
            series: [
                {
                    name: 'Nightingale Chart',
                    type: 'pie',
                    radius: [50, 150],
                    center: ['50%', '50%'],
                    roseType: 'area',
                    itemStyle: {
                        borderRadius: 8
                    },
                    data: [
                        { value: 40, name: 'rose 1' },
                        { value: 38, name: 'rose 2' },
                        { value: 32, name: 'rose 3' },
                        { value: 30, name: 'rose 4' },
                        { value: 28, name: 'rose 5' },
                        { value: 26, name: 'rose 6' },
                        { value: 22, name: 'rose 7' },
                        { value: 18, name: 'rose 8' }
                    ]
                }
            ]
        };
        myChart.setOption(option);
    }
}
</script>

<style scoped>
.mainn {
    width: 500px;
    height: 500px;
    background-color: #fff;
}
.top{
    padding: 50px 0px;
    display: flex;
    justify-content: space-between;
    background-color: #fff;
}
</style>