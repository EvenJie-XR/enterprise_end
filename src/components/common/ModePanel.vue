<template>
    <!-- 
        模块面板组件
        实现效果：
            1. 顶部模块名字占一行
            2. 下面部分为模块内容
     -->
    <div class="mode-panel-container">
        <!-- 头部 -->
        <div class="header-container">
            <slot name="header"></slot>
        </div>
        <!-- 内容 -->
        <div class="content-container">
            <slot name="content"></slot>
        </div>
    </div>
</template>
<script lang="ts" setup>
</script>

<style lang="scss" scoped>
.header-container {
    font-weight: 550;
    margin-bottom: 12px;
}
</style>
