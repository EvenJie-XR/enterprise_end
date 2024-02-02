<template>
    <div class="today-data-card-container">
        <div class="title">
            <slot name="title">{{ props.title }}</slot>
        </div>
        <div class="data">
            <slot name="data">{{ props.data }}</slot>
        </div>
    </div>
</template>
<script lang="ts" setup>
const props = defineProps({
    title: String,
    data: String
})
</script>

<style lang="scss" scoped>
.today-data-card-container {
    width: 230px;
    height: 120px;
    border-radius: 10px;
    background: linear-gradient(90deg, #099562 0%, rgba(9, 186, 5, 0.25) 119.55%, rgba(6, 139, 51, 0.91) 119.57%);
    padding: 20px;
    box-sizing: border-box;
    color: white;
    .data {
        font-weight: 550;
        font-size: 26px;
        margin-top: 22px;
    }
}

// 手机端竖屏
@media screen and (max-width: 768px) {
    .today-data-card-container {
        width: 100%;
        margin-bottom: 10px;
    }
}

// ipad或手机端横屏
@media screen and (min-width: 769px) and (max-width: 1200px) {
    .today-data-card-container {
        width: 100%;
        margin-bottom: 10px;
    }
}
</style>
