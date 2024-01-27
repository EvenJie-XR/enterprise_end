<template>

</template>

<script lang="ts">
    import { ElMessageBox , ElMessage} from 'element-plus'
    
    const Notification = async (message: string) => {
        // 不同的调用模块提供相应的message
        const result = await ElMessageBox.confirm(
            message,
            {
            confirmButtonText: '确定',
            cancelButtonText: '返回',
            center: true,
            buttonSize: "large",
            showClose: false,
        })
        if (result == "confirm"){
            ElMessage({
                type: 'success',
                message: '操作成功',
            })
        }
        else {
            ElMessage({
                type: 'info',
                message: '操作取消',
            })
        }   
    }


    export {Notification}

</script>

<style lang="scss" scoped>
</style>