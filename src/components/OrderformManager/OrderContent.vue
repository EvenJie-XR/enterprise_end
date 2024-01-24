<script setup lang="ts">

import { Ref, ref } from "vue";

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
  <div class="Content">
    <div class="label">
      <div class="checkBoxAll">
        <el-checkbox
            v-model="checkAll"
            :indeterminate="isIndeterminate"
            @change="handleCheckAllChange"
            size='large'
        ></el-checkbox>
      </div>
      <div v-for="(item, index) in columnList" :key="index" v-show="item.visible" :style="{backgroundColor: index % 2 === 1 ? '#389E79' : '#A9EBC1'}" class="BarTable">
        <div class="TableText">
          {{item.label}}
        </div>
      </div>
    </div>

    <div class="Orders">
      <div class="checkBoxes">
        <el-checkbox-group class="checkBoxGroup">
          <el-checkbox v-for="index in dataList.length" :key="index" class="checkBoxSingle"></el-checkbox>
        </el-checkbox-group>
      </div>
      <div class="orderData">
        <div v-for="item in dataList" :key="item.orderNum" class="OrderInfor">
          <div>{{item.orderNum}}</div>
          <div>{{item.orderStatus}}</div>
          <div>{{item.userName}}</div>
          <div>{{item.phoneNum}}</div>
          <div>{{item.address}}</div>
          <div>{{item.orderTime}}</div>
          <div>{{item.amount}}</div>
          <div>1</div>
        </div>
      </div>
    </div>


    <div class="demo-pagination-block">
      <el-pagination
          v-model:current-page="currentPage4"
          v-model:page-size="pageSize4"
          :page-sizes="[100, 200, 300, 400]"
          :small="large"
          :background="true"
          layout="total, sizes, prev, pager, next, jumper"
          :total="400"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
      />
    </div>
  </div>


</template>

<style scoped lang="scss">
  .Content{
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-bottom: 20px;
    //justify-content: center;
    .label{
      height: 60px;
      width: 98%;
      border-radius: 10px;
      // 隐藏多出来的子元素颜色颜色
      overflow: hidden;

      display: flex;
      justify-content: space-evenly;
      .TableText{
        display: flex;
        align-items: center;
        font-weight: 400;
        font-size: 24px;
      }
      .checkBoxAll{
        width: 3%;
        height: 100%;
        display: flex;
        justify-content: right;
        align-items: center;
        background-color: #A9EBC1;
      }
      .BarTable{
        flex: 1;
        display: flex;
        justify-content: center;
      }
    }
    .Orders{
      margin-top: 10px;
      width: 100%;
      display: flex;
      justify-content: space-between;
      margin-bottom: 20px;

      .checkBoxes{
        width: 4%;
        .checkBoxGroup{
          height: 100%;
          display: flex;
          flex-direction: column;
          .checkBoxSingle{
            padding-top: 10px;
            height: 100%;
            width: 100%;
            display: flex;
            justify-content: right;
          }
        }

      }

      .orderData{
        width: 96%;
        display: flex;
        flex-direction: column;
        .OrderInfor{
          display: flex;
          padding-top: 10px;
          div{
            flex: 1;
            text-align: center;
          }
        }
      }
    }

  }
</style>







