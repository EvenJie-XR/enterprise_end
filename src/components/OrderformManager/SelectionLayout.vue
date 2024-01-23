<script setup lang="ts">

</script>

<template>
  <div class="SelectBar">
    <div class="BarText active">全部订单</div>
    <div class="BarText">待接单</div>
    <div class="BarText">待派送</div>
    <div class="BarText">派送中</div>
    <div class="BarText">已完成</div>
    <div class="BarText">已取消</div>

  </div>


</template>

<style scoped lang="scss">
  .SelectBar{
    height: 100%;
    display: flex;
    justify-content: space-evenly;
    font-weight: 400;
    font-size: 30px;

    .BarText{
      display: flex;
      align-items: center;
    }
    .active{
      color: #0982DA;
      border-bottom: 3px solid #0982DA;
    }
    .BarText:hover{
      cursor: pointer;

    }

  }
</style>
