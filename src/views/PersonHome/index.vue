<template>
    <div class="home_content">
        <HomeLeft></HomeLeft>
        <HomeRight></HomeRight>
    </div>
    
</template>

<script>
import HomeLeft from './HomeLeft.vue';
import HomeRight from './HomeRight.vue';
export default {
    components:{
        HomeLeft,
        HomeRight,
    }
}
</script>
<style>
.home_content{
    display: flex;
    flex-direction: row;
    height: 569.4px;
}
</style>