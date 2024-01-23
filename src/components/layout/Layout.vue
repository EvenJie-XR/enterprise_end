<template>
    <!-- 整体页面框架容器 -->
    <div class="layout-container">
        <!-- 头部栏容器 -->
        <div class="header-container">
            <Header></Header>
        </div>
        <!-- 内容容器 -->
        <div class="content-container">
            <!-- 左侧导航栏容器 -->
            <div class="nav-container">
                <Nav></Nav>
            </div>
            <!-- 主体页面内容容器 -->
            <div class="page-container">
                <RouterView></RouterView>
            </div>
        </div>
    </div>
</template>
<script lang="ts" setup>
import Nav from "./Nav.vue"
import Header from "./Header.vue"
</script>

<style lang="scss" scoped>
// 布局容器
.layout-container {
    width: 100%;
    height: 100%;
    background-color: #f1f3ef;
    // 头部容器
    .header-container {
        height: 60px;
        background-color: white;
    }
    // 内容容器
    .content-container {
        height: calc(100% - 60px);
        display: flex;
        // 导航栏容器
        .nav-container {
            width: 200px;
            height: 100%;
            padding: 60px 20px;
            box-sizing: border-box;
        }
        // 页面容器
        .page-container {
            width: calc(100% - 200px);
            box-sizing: border-box;
        }
    }
}
</style>
