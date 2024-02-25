<template>
    <el-dialog id="reject-order-dialog-container" align-center :title="props.title">
        <div class="content-container">
            <span>{{ props.tip }}</span>
            <el-input
                v-model="textAreaValue"
                :autosize="{ minRows: 2, maxRows: 4 }"
                type="textarea"
                :placeholder="props.placeholder"
                style="width: 400px;"
            />
        </div>
        <template #footer>
            <div class="footer-container">
                <el-button color="#389e79" class="btn" @click="emit('confirm', textAreaValue)">{{ props.btn }}</el-button>
            </div>
        </template>
    </el-dialog>
</template>
<script lang="ts" setup>
import { ref } from 'vue';

const textAreaValue = ref("");
const props = defineProps({
    title: {
        type: String,
        default: "标题"
    },
    tip: {
        type: String,
        default: "取消原因:"
    },
    placeholder: {
        type: String,
        default: "请输入取消原因"
    },
    btn: {
        type: String,
        default: "确认取消"
    }
})
const emit = defineEmits<{
    confirm: [reason: string]
}>()
</script>

<style lang="scss">
#reject-order-dialog-container {
    width: 600px;
}
// 手机端竖屏
@media screen and (max-width: 1024px) {
    #reject-order-dialog-container {
        width: 360px;
    }
}
</style>
<style lang="scss" scoped>
.content-container {
    display: flex;
    justify-content: center;
    span {
        margin-right: 10px;
    }
}
.footer-container {
    display: flex;
    justify-content: center;
    .btn {
        width: 50%;
    }
}
</style>
