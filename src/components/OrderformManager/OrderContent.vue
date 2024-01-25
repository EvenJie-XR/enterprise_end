<script setup lang="ts">

import { Ref, ref } from "vue";
import SheetLayout from "../common/SheetLayout.vue";
import Sheet from "../common/Sheet.vue";
import SelectionLayout from "./SelectionLayout.vue";
type Order = {
  orderNum: number,
  orderStatus: number
  userName: string
  phoneNum: number
  address: string
  orderTime: string
  amount: number
  notes: string
}
const dataList: Ref<Order[]> = ref([
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
  { label: "订单号", visible: true},
  { label: "订单状态", visible: true },
  { label: "用户名", visible: true },
  { label: "手机号", visible: true },
  { label: "地址", visible:true },
  { label: "下单时间", visible:true},
  { label: "实收金额", visible:true},
  { label: "操作", visible:true},
  // { label: "备注", property: "notes" },
  // "订单菜品",
  // "地址",
  // "预计送达时间",
  // "实收金额",
  // "备注",
  // "操作"
]

let checkAll = ref(false)
let isIndeterminate = ref(false)
const handleCheckAllChange = () => {
//TODO 全选框逻辑
}


</script>

<template>
  <SheetLayout :table-data="dataList" class="container">
    <template #header>
      <SelectionLayout class="seletionBar">
      </SelectionLayout>
    </template>

    <template #sheet>
      <Sheet :table-data="dataList" class="tableBody">
        <el-Table-column prop="orderNum" label="订单号">
          <template #header="{ column }">
            <div class="checkBoxOfColumn">
              <el-checkbox></el-checkbox>
              {{ column.label }}
            </div>
            </template>
        </el-Table-column>
        <el-table-column prop="orderStatus" label="订单状态"/>
        <el-table-column prop="userName" label="用户名" />
        <el-table-column prop="phoneNum" sortable label="手机号" />
        <el-table-column prop="address" label="地址" width="100" />
        <el-table-column prop="orderTime" label="下单时间" />
        <el-table-column prop="amount" label="实收金额" />
        <el-table-column prop="control" label="操作">
            <template #default>
                <el-button text class="control-btn">接单</el-button>
                <el-button text class="control-btn">拒单</el-button>
                <el-button text class="control-btn">查看</el-button>
            </template>
        </el-table-column>
      </Sheet>
    </template>

    <template #pagination>
      <el-pagination class="pagination" background layout="prev, pager, next, sizes, jumper" :total="1000" />
      
    </template>
  </SheetLayout>


</template>

<style scoped lang="scss">
  .container{
    
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    // align-items: center;
    .seletionBar{
      width: 100%;

    }
    .tableBody{
      margin-top: 20px;
    }
    .pagination{
      margin-top: 20px;
    }
    

  }
</style>







