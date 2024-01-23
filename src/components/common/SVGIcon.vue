<template>
    <!-- svg图标组件，方标使用svg图标 -->
    <!-- 
        使用方法（实现原理在vite.config.ts里面用node来处理这些文件）：
        1. 把svg图标放入src/svgs
        2. <SVGIcon icon-name="logo" class="icon"></SVGIcon>使用组件，icon-name的值是.svg文件的名字
     -->
    <svg class="icon">
        <use :xlink:href="`#icon-${props.iconName}`"></use>
    </svg>
</template>
<script lang="ts" setup>
    const props = defineProps({
        iconName: String
    })
</script>

<style lang="scss" scoped>
.icon {
    fill: currentColor;
}
</style>
