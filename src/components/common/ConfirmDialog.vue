<!-- 再次确认的弹窗 -->
<template>
    <el-dialog id="confirm-dialog-container" align-center>
        <span class="tip">{{ props.tip }}</span>
        <template #footer>
            <div class="dialog-footer">
                <el-button color="#389e79" class="button" @click="emit('confirm')">{{ props.btnText }}</el-button>
            </div>
        </template>
    </el-dialog>
</template>
<script lang="ts" setup>
const props = defineProps({
    tip: {
        type: String,
        default: "tip..."
    },
    btnText: {
        type: String,
        default: "确定"
    }
})
const emit = defineEmits(["confirm"])
</script>

<style lang="scss">
#confirm-dialog-container {
    width: 400px;
}
// 手机端竖屏
@media screen and (max-width: 1024px) {
    #confirm-dialog-container {
        width: 300px;
    }
}
</style>
<style lang="scss" scoped>
.tip {
    display: flex;
    justify-content: center;
    font-size: 20px;
    font-weight: bold;
}
.dialog-footer {
    display: flex;
    justify-content: center;
    .button {
        width: 50%;
    }
}
</style>
