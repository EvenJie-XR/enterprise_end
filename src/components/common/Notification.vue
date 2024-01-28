<template>

</template>
<!-- 删除和修改状态的弹窗 -->
<script lang="ts">
    import { ElMessageBox , ElMessage} from 'element-plus'
    
    const Notification = async (message: string) => {
        // 不同的调用模块提供相应的message
        console.log(message);
        
        const result = await ElMessageBox.confirm(
            message,
            {
            confirmButtonText: '确定',
            cancelButtonText: '返回',
            center: true,
            buttonSize: "large",
            showClose: false,
            dangerouslyUseHTMLString: true,
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

<style lang="scss" >
    .el-message-box{
        // height: 20%;
        width: 20% !important;
        padding: 0 !important;
    }
    .el-message-box__btns{
        padding: 0 !important;
        margin: 0 !important;
        display: flex;

        .el-button{
            margin: 0 !important;
            padding: 0 !important;
            width: 50%;
            border: 0 !important;
            border-radius: 0;
            // TODO: 按钮有白色边框
            
        }
        .el-button--primary{
            background-color: #389E79 !important;
        }
    }
    .reminding-text{
        color: #666666;
        size: 24px;
    }

</style>