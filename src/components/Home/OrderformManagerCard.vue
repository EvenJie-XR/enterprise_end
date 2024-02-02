<template>
    <div class="card-container" :style="{
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
.card-container {
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

// 手机端竖屏
@media screen and (max-width: 768px) {
    .card-container {
        width: 100%;
        margin-bottom: 10px;
        &:last-child {
            margin-bottom: 0;
        }
    }
}

// ipad或手机端横屏
@media screen and (min-width: 769px) and (max-width: 1200px) {
    .card-container {
        width: 100%;
        margin-bottom: 10px;
        &:last-child {
            margin-bottom: 0;
        }
    }
}

@media screen and (min-width: 1200px) and (max-width: 1690px) {
    .card-container {
        width: 146px;
    }
}
</style>
