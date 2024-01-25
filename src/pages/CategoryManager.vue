<template>
    <h2>订单信息</h2>
    <div class="container">
      <div class="TopBar">
        <SearchBar></SearchBar>
      </div>

      <div class="content">
        <ContentManager></ContentManager>
      </div>

    </div>
  
  </template>
  <script lang="ts" setup>
    import SearchBar from "../components/ClassificationManager/SearchBar.vue";
    import ContentManager from "../components/ClassificationManager/ContentManager.vue";
  </script>
  
  <style lang="scss" scoped>
    .container{
      margin-right: 40px;
      .TopBar{
        height: 80px;
        border-radius: 10px;
        background-color: #fff;
      }
      .content{
        margin-top: 30px;
        background-color: white;
      }

    }
  </style>
  