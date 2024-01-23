<script setup lang="ts">

import { Ref, ref } from "vue";


const dataList: Ref<order[]> = ref([
  {
    orderNum: 2021010200001,
    orderStatus: 1,
    userName: "Blank",
    phoneNum: 123123,
    address: "SZU",
    orderTime: "2024",
    amount: 50,
    notes: "123"
  },
  {
    orderNum: 2021010200001,
    orderStatus: 1,
    userName: "Blank",
    phoneNum: 123123,
    address: "SZU",
    orderTime: "2024",
    amount: 50,
    notes: "123"
  },
  {
    orderNum: 2021010200001,
    orderStatus: 1,
    userName: "Blank",
    phoneNum: 123123,
    address: "SZU",
    orderTime: "2024",
    amount: 50,
    notes: "123"
  }
])

const columnList = [
  { label: "订单号", property: "orderNum" },
  { label: "订单状态", property: "orderStatus" },
  { label: "用户名", property: "userName" },
  { label: "手机号", property: "phoneNum" },
  { label: "地址", property: "address" },
  { label: "下单时间", property: "orderTime" },
  { label: "实收金额", property: "amount" },
  { label: "操作", property: "" },
  // { label: "备注", property: "notes" },
  // "订单菜品",
  // "地址",
  // "预计送达时间",
  // "实收金额",
  // "备注",
  // "操作"
]

</script>

<template>
  <div class="Content">
    <el-table
        :data="dataList"
        style="width: 100%"
    >
      <el-table-column type="selection" width="55" />
      <el-table-column v-for="(column, index) in columnList" :key=index :label="column.label" :prop="column.property"></el-table-column>
    </el-table>
    <div style="margin-top: 20px">
    </div>
  </div>
</template>

<style scoped lang="scss">
  .Content{
    color: #253FCA;
    font-size: 18px;
    font-weight: 400;

  }
</style>







