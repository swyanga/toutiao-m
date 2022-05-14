<template>
  <div id="app">
    <!-- 路由的出口 -->
    <router-view/>
    <h1>黑马头条</h1>
    <div>
      <i class="toutiao toutiao-dianzan"></i>
    </div>
    <van-button type="primary">默认按钮</van-button>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style lang="less">

</style>
