<template>
  <h2>订单信息</h2>
  <div class="Content">
    <!-- 顶部的搜索框 -->
    <div class="TopBar">
      <SearchBar></SearchBar>
    </div>

    <!-- 订单的显示页面 -->
    <div class="Orders">
        <OrderContent>
        </OrderContent>
    </div>
  </div>

</template>
<script lang="ts" setup>
  import SearchBar from "../components/OrderformManager/SearchBar.vue";
  import OrderContent from "../components/OrderformManager/OrderContent.vue";
</script>

<style lang="scss" scoped>
  .Content{
    margin-right: 40px;
    .TopBar{
      height: 80px;
      border-radius: 10px;
      background-color: #fff;
    }
    .Orders{
      margin-top: 20px;
      background-color: #fff;
      border-radius: 10px;
      padding: 20px;
      // display: flex;
      // justify-content: center;
    }
  }
</style>
