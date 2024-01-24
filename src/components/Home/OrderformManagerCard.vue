<template>
    <div class="orderform-manager-card-container" :style="{
        'background-color': props.backgroundColor || '#417BD3'
    }">
        <div class="data">{{ props.data }}</div>
        <div class="title">{{ props.title }}</div>
    </div>
</template>
<script lang="ts" setup>
const props = defineProps({
    backgroundColor: String,
    data: String,
    title: String
})
</script>

<style lang="scss" scoped>
.orderform-manager-card-container {
    width: 103px;
    height: 126px;
    border-radius: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    color: white;
    .data {
        font-size: 18px;
        font-weight: bold;
    }
    .title {
        margin-top: 20px;
        font-size: 14px;
    }
}
</style>
