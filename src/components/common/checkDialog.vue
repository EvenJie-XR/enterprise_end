<!-- 查看订单详情 -->
<template>
  <el-dialog v-model="props.dialogTableVisible"
  @closed="props.dialogTableVisible = false"
   title="订单信息" 
   width="30%"
    top="10vh" style="background-color: #F1F3EF; border-radius: 10px;" >
      <div class="container">
        <div class="order-infor">
          <el-descriptions column="2">
            <el-descriptions-item label="订单号">{{ props.data.no }}</el-descriptions-item>
            <el-descriptions-item label="下单时间">{{ props.data.completeTime }}</el-descriptions-item>
            <el-descriptions-item label="订单状态">{{ props.data.status }}</el-descriptions-item>
            <el-descriptions-item label="订单金额">{{ props.data.price }}</el-descriptions-item>
            <el-descriptions-item label="用户名">{{ props.data.username }}</el-descriptions-item>
            <el-descriptions-item label="手机号">{{ props.data.phoneNumber }}</el-descriptions-item>
          </el-descriptions>
          <el-descriptions column="1">
            <el-descriptions-item label="地址">{{ props.data.addresss }}</el-descriptions-item>
            <el-descriptions-item label="取消原因">原神不好玩</el-descriptions-item>
          </el-descriptions>
        </div>

        <div class="bottom-infor">
          <h3>菜品</h3>
          <div class="dish-infor">
            <div  v-for="(item, index) in dishes" :key="index" class="dish-item">
              <span>{{ item.name }}</span>
              <div style="display: flex; width: 40%; justify-content: space-between;">
                <span>*{{ item.count }}</span>
                <span>{{ item.price }}</span>
              </div>
            </div>
          </div>

          <div class="fee-infor">
            <div v-for="(item, index) in fee" :key="index" style="display: flex; justify-content: space-between;">
              <span>{{ item.name }}</span>
              <span>{{ item.price }}元</span>
            </div>
          </div>

        </div>
      </div>
        

  </el-dialog>
</template>

<script setup lang="ts">

const props = defineProps({
    data: Object,
    dialogTableVisible: Boolean,
})

let dishes =   [{
    name: "鱼香肉丝",
    price:  "52.00元",
    count: "1"
  },
  {
    name: "鱼香肉丝",
    price:  "52.00元",
    count: "1"
  },
  {
    name: "鱼香肉丝",
    price:  "52.00元",
    count: "1"
  },  
  {
    name: "鱼香肉丝",
    price:  "52.00元",
    count: "1"
  },
]

let fee = [
  {
    name: "打包费",
    price: "9"
  },
  {
    name: "配送费",
    price: "9"
  },
  {
    name: "合计",
    price: "9"
  }
]




</script>

<style lang="scss">




  .el-dialog__body{
    padding: 10px !important;
    padding-bottom: 20px !important;
  }
  .container{
    .order-infor{
      background-color: #fff;
      padding: 20px;
      margin-bottom: 10px;
        span{
          font-size: 16px !important;
        }
    }
    .bottom-infor{
      padding: 20px;
      background-color: #fff;
      .dish-infor{
        border-bottom: 1px solid #999999;
        padding-bottom: 10px;
        .dish-item{
          display: flex;
          justify-content: space-between;
          padding-bottom: 10px;
        }
      }
      .fee-infor{
        padding: 5px;
        div{
          display: flex;
          justify-content: space-between;
        }
      }
    }
  }

  .el-descriptions__table{
      padding: 10px !important;
  }



</style>