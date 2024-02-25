<template>
    <!-- 整体页面框架容器 -->
    <div class="layout-container">
        <!-- 头部栏容器 -->
        <div class="header-container">
            <el-icon class="nav-expand-logo" @click="expandNav"><Expand /></el-icon>
            <Header></Header>
        </div>
        <!-- 内容容器 -->
        <div class="content-container">
            <!-- 左侧导航栏容器 -->
            <div :class="{'nav-container': true, 'expand': expand}">
                <div class="fold-line">
                    <el-icon class="nav-fold-btn" @click="foldNav"><Fold /></el-icon>
                </div>
                <Nav></Nav>
            </div>
            <el-scrollbar class="scroll-bar">
                <!-- 主体页面内容容器 -->
                <div class="page-container">
                    <RouterView></RouterView>
                </div>
            </el-scrollbar>
            <!-- 移动端展开导航栏的时候才显示的蒙层 -->
            <div :class="{'mobile-nav-mask': true, 'expand': expand}" @click="foldNav"></div>
        </div>
    </div>
</template>
<script lang="ts" setup>
import Nav from "./Nav.vue"
import Header from "./Header.vue"
import { ref } from "vue";

const expand = ref(false);
const expandNav = () => {
    expand.value = true;
}
const foldNav = () => {
    expand.value = false;
}
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
        .nav-expand-logo {
            display: none;
            cursor: pointer;
        }
    }
    // 内容容器
    .content-container {
        height: calc(100% - 60px);
        display: flex;
        .mobile-nav-mask {
            display: none;
            cursor: pointer;
        }
        // 导航栏容器
        .nav-container {
            width: 200px;
            height: 100%;
            padding: 60px 20px;
            box-sizing: border-box;
            .fold-line {
                .nav-fold-btn {
                    display: none;
                    cursor: pointer;
                }
            }
        }
        // 页面容器
        .scroll-bar {
            width: 100%;
            .page-container {
                width: 100%;
                height: 100%;
                box-sizing: border-box;
                padding: 20px;
            }
        }
    }
}

// 手机端竖屏
@media screen and (max-width: 1024px) {
    .layout-container {
        .header-container {
            position: relative;
            display: flex;
            width: 100%;
            align-items: center;
            justify-content: center;
            .nav-expand-logo {
                font-size: 28px;
                position: absolute;
                left: 20px;
                color: #389e79;
                z-index: 80;
                display: block;
            }
        }
        .content-container {
            .mobile-nav-mask {
                position: absolute;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                background-color: #00000080;
                z-index: 9998;
                &.expand {
                    display: block;
                }
            }
            .nav-container {
                position: fixed;
                top: 0;
                left: -200px;
                background-color: white;
                bottom: 0;
                z-index: 9999;
                transition: .3s all;
                &.expand {
                    left: 0px;
                }
                .fold-line {
                    display: flex;
                    width: 148px;
                    justify-content: center;
                    margin-bottom: 20px;
                    .nav-fold-btn {
                        font-size: 28px;
                        color: #389e79;
                        text-align: center;
                        display: block;
                    }
                }
            }
            .page-container {
                width: 100%;
            }
        }
    }
}
</style>
