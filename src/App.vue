<template>
  <div id="app">
    <router-view v-if="isRouterAlive"/>
  </div>
</template>
<script>
export default{
  name:'app',
  provide() {
    return {
      reload : this.reload,
    }
  },
  data(){
    return{
      isRouterAlive:true,
    }
  },
  methods: {
    // 通过声明reload方法，控制router-view的显示或隐藏，从而控制页面的再次加载
    reload(){
      this.isRouterAlive = false;
      this.$nextTick(() => {
        this.isRouterAlive = true;
      })
    },
  },
}
</script>

<style>
html,body,#app{
  height: 100%;
}
</style>
