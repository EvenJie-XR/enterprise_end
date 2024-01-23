<script setup lang="ts">
import {ref} from "vue";
const value = ref('')
const options = [
  {
    value: '123123',
    label: '',
  },

]
</script>

<template>
    <div class="Content">
      <div class="left">
        <!--   订单单号   -->
        <div class="Order">
          <span class="text">订单号：</span>
          <el-select
              v-model="value"
              filterable
              placeholder="Select"
              style="width: 180px"
              class="Search"
          >
            <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
            />
          </el-select>
        </div>

        <!--   手机查询   -->
        <div class="Phone">
          <span class="text">手机号：</span>
          <el-select
              v-model="value"
              filterable
              placeholder="Select"
              style="width: 180px"
              class="Search"
          >
            <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
            />
          </el-select>
        </div>

        <!--   下单时间  -->
        <div class="Time">
          <span class="text">下单时间：</span>
          <el-input v-model="input" placeholder="请输入下单时间" class="Search" style="width: 180px"/>
        </div>
      </div>



      <div class="right">
        <el-button color="#389E79">查询</el-button>
        <el-button color="#389E79">重置</el-button>
      </div>

    </div>
</template>

<style scoped lang="scss">
  .Content{
    display: flex;
    height: 100%;
    justify-content: space-around;
    align-items: center;

    .left{
      display: flex;
      width: 75%;
      justify-content: space-evenly;
      .Search{
        margin-bottom: 10px;
      }
    }
    .right{
      display: flex;
    }
    .text{
      font-weight: 400;
      font-size: 30px;
    }


  }
</style>
