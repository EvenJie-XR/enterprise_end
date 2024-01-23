<template>
  <h2>订单信息</h2>
  <div class="Content">
    <div class="TopBar">
      <SearchBar></SearchBar>
    </div>

    <div class="Orders">
      <div class="OrderBar">
        <SelectionLayout>
        </SelectionLayout>
      </div>

      <div class="OrderContent">
        <OrderContent>
        </OrderContent>
      </div>

    </div>
  </div>

</template>
<script lang="ts" setup>
  import SearchBar from "../components/OrderformManager/SearchBar.vue";
  import SelectionLayout from "../components/OrderformManager/SelectionLayout.vue";
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

      .OrderBar{
        height: 80px;
        border-bottom: 1px solid #B7BFDD;
      }
    }
  }
</style>
