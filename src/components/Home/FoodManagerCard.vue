<template>
    <div class="food-manager-card-container">
        <div class="title">{{ props.title }}</div>
        <div class="data-or-control">
            <slot></slot>
        </div>
    </div>
</template>
<script lang="ts" setup>
    const props = defineProps({
        title: String
    })
</script>

<style lang="scss" scoped>
.food-manager-card-container {
    width: 296px;
    height: 43px;
    background-color: white;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 26px 0 16px;
    box-sizing: border-box;
}
</style>
