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
        <!--   分类名称   -->
        <div class="name">
          <span class="text">分类名称：</span>
          <el-select
              v-model="value"
              filterable
              placeholder="Select"
              style="width: 280px"
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

        <!--   分类类型   -->
        <div class="category">
          <span class="text">分类类型：</span>
          <el-select
              v-model="value"
              filterable
              placeholder="Select"
              style="width: 280px"
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
      </div>



      <div class="right">
        <el-button color="#389E79">搜索</el-button>
      </div>

    </div>
</template> 

<style scoped lang="scss">
  .Content{
    display: flex;
    height: 100%;
    justify-content: space-between;
    align-items: center;
    .left{
      margin-left: 50px;
      display: flex;
      width: 70%;
      justify-content: space-around;
      .Search{
        margin-bottom: 10px;
      }
    }
    .right{
      width: 15%;
      display: flex;
      justify-self: left;
    }
    .text{
      font-weight: 400;
      font-size: 30px;
    }


  }
</style>
