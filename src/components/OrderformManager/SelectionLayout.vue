<script setup lang="ts">
  import {ref, Ref} from "vue";
  type BarItemType = {
    label: string
    active: boolean
  }
  const BarList: Ref<BarItemType[]> = ref([
    {label: "全部订单", active: true},
    {label: "待接单", active: false},
    {label: "待派送", active: false},
    {label: "派送中", active: false},
    {label: "已完成", active: false},
    {label: "已取消", active: false},
  ])

  const handleBarChange = (targetItem: BarItemType) => {
    BarList.value.forEach((item) => {
      item.active = false
    })
    targetItem.active = true
  //TODO 更改LabelList
  }

</script>

<template>
  <div class="SelectBar">
    <div v-for="(item, index) in BarList" :key="index" :class="{'BarText': true, 'active': item.active}" @click="handleBarChange(item)"><span>{{item.label}}</span></div>
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
