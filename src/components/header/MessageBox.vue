<template>
    <el-dialog align-center id="message-box-dialog-container" center title="系统消息通知">
        <template #default>
            <el-scrollbar max-height="80vh">
                <div class="message-item" v-for="message in messageHistoryList" :key="message.id">
                    <div class="time">{{ message.createTime }}</div>
                    <el-card shadow="hover">
                        <template #header>
                            <strong>{{ message.message.type === 1 ? '新订单来啦!!!' : '取消订单' }}</strong>
                        </template>
                        <span>{{ message.message.content }}</span>
                    </el-card>
                </div>
            </el-scrollbar>
        </template>
    </el-dialog>
</template>
<script lang="ts" setup>
import { ElMessage } from 'element-plus';
import { queryShopHistoryMessage } from '../../api/Header';
import { useShopInfo } from '../../stores/Shop';
import { ref } from 'vue';
import { MessageEventTypeEnum, useMessageHook } from '../../hooks/messageHook';

const emit = defineEmits(['newMessage']);
const useMessageHookInstance = useMessageHook();


const useShopInfoInstance = useShopInfo();
const messageHistoryList = ref();
const updateShopHistoryMessage = () => {
    queryShopHistoryMessage(useShopInfoInstance.id).then((res) => {
        if(res.data.code) {
            const historyMessageList = res.data.data as any[] | undefined;
            if(historyMessageList) {
                messageHistoryList.value = historyMessageList.map((message) => {
                    return {
                        createTime: message.createTime,
                        id: message.id,
                        message: JSON.parse(message.message)
                    }
                });
            }
        } else {
            ElMessage({
                message: "获取店铺历史消息失败",
                type: "error"
            })
        }
    })
}
updateShopHistoryMessage();


// 创建一个WebSocket实例，指定要连接的服务器URL
const socket = new WebSocket(`ws://110.41.166.41:8080/ws/${useShopInfoInstance.id}`);
// 当WebSocket连接成功建立时触发
socket.onopen = () => {
    console.log('WebSocket连接已建立');
};
// 当接收到来自服务器的消息时触发
socket.onmessage = (event) => {
    console.log('收到消息：', event.data);
    updateShopHistoryMessage();
    emit('newMessage');
    const message = JSON.parse(event.data) as {
        orderId: number,
        type: number,
        content: string
    };
    const messageTypeToMessageEventTypeEnumMap = {
        1: MessageEventTypeEnum.newOrder,
        2: MessageEventTypeEnum.cancelOrder
    }
    // @ts-ignore
    useMessageHookInstance.emitEventListener(messageTypeToMessageEventTypeEnumMap[message.type])
};
// 当WebSocket连接关闭时触发
socket.onclose = () => {
    ElMessage({
        message: "实时接收系统消息连接异常断开,请重新进入系统",
        type: "error"
    })
};
// 当发生错误时触发
socket.onerror = (error) => {
    console.error('WebSocket发生错误：', error);
};
</script>

<style lang="scss">
    #message-box-dialog-container {
        width: 60vw;
        .el-dialog__body {
            background-color: #f1f3ef;
            .message-item {
                margin-bottom: 40px;
                .time {
                    text-align: center;
                    margin-bottom: 10px;
                }
            }
        }
    }
    // 手机端竖屏
    @media screen and (max-width: 1024px) {
        #message-box-dialog-container {
            width: 90vw;
        }
    }
</style>
<style lang="scss" scoped>
//
</style>
