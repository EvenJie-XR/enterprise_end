export enum MessageEventTypeEnum {
    newOrder = 'newOrder',
    cancelOrder = 'cancelOrder'
}

const listenerList = {
    newOrder: [] as (() => void)[],
    cancelOrder: [] as (() => void)[]
}

/**
 * 消息通知相关hook
 * @returns 
 */
export const useMessageHook = () => {
    /**
     * 添加事件监听者
     * @param callback 事件触发时的回调函数
     * @param type 事件类型
     * @returns 
     */
    const addEventListener = (callback: () => void, type: MessageEventTypeEnum) => {
        const length = listenerList[type].push(callback);
        const index = length - 1;
        return () => {
            // index = length - 1
            listenerList[type].splice(index, 1);
            // console.log("取消监听事件", listenerList[type]);
        }
    }
    /**
     * 触发事件监听者
     * @param type 事件类型
     */
    const emitEventListener = (type: MessageEventTypeEnum) => {
        console.log("触发事件函数", listenerList[type]);
        listenerList[type].forEach((callback) => callback());
    }
    return {
        addEventListener,
        emitEventListener
    }
}