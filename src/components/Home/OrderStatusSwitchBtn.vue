<template>
    <div class="order-status-switch-btn-container">
        <div 
            :class="{
                active: isActivedPendingOrder === 'pending-order'
            }" 
            @click="handleActive('pending-order')">
            待接单({{ pendingOrdersCount }})
        </div>
        <div 
            :class="{
                active: isActivedPendingOrder === 'to-be-delivered'
            }" 
            @click="handleActive('to-be-delivered')">
            待派送({{ toBeDeliveredCount }})
        </div>
    </div>
</template>
<script lang="ts" setup>
import { ref } from 'vue';

const emit = defineEmits<{
    activeChange: [activeName: string] // 具名元组语法
}>()

/**
 * 激活状态字符串
 * "" 显示全部
 * pending-order 待接单激活
 * to-be-delivered 待派送激活
 */
const isActivedPendingOrder = ref("");
/**
 * 处理按钮激活状态
 * @param activeName 激活状态字符串
 */
const handleActive = (activeName: string) => {
    if(isActivedPendingOrder.value === activeName) {
        isActivedPendingOrder.value = "";
    } else {
        isActivedPendingOrder.value = activeName;
    }
    // 触发激活更改事件
    emit("activeChange", isActivedPendingOrder.value);
}

// 待接单数量
const pendingOrdersCount = defineModel('pendingOrdersCount');
// 待派送数量
const toBeDeliveredCount = defineModel('toBeDeliveredCount');
</script>

<style lang="scss" scoped>
.order-status-switch-btn-container {
    display: flex;
    & > div {
        padding: 10px 20px;
        border: 1px solid black;
        border-radius: 4px;
        margin-right: 20px;
        cursor: pointer;
        &:last-child {
            margin-right: 0;
        }
        &.active {
            background-color: #28A767;
            color: white;
            border-color: white;
        }
    }
}
// 手机端竖屏
@media screen and (max-width: 1024px) {
    .order-status-switch-btn-container {
        & > div {
            padding: 8px 10px;
        }
    }
}
</style>
