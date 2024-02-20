<template>
    <div class="header-container">
        <!-- 左侧容器 -->
        <div class="left-container">
            <!-- logo -->
            <div class="logo">
                <SVGIcon icon-name="logo" class="icon"></SVGIcon>
            </div>
            <!-- 营业状态 -->
            <div :class="{
                'business-state': true,
                'closed': shopStatusList[shopStatus].label === '已打烊'
                }
            ">
                {{ shopStatusList[shopStatus].label }}
            </div>
        </div>
        <!-- 右侧容器 -->
        <div class="right-container">
            <!-- 营业状态切换按钮 -->
            <div class="business-state-change-btn" @click="onSwitchShopStatusBtnClick">
                营业状态
            </div>
            <!-- 消息 -->
            <div class="message-box have-message">
                <SVGIcon icon-name="message" class="icon"></SVGIcon>
            </div>
            <!-- 商家信息 -->
            <AvatarLogin></AvatarLogin>
        </div>
    </div>
    <el-dialog v-model="dialogSwitchShopStatus" title="设置营业状态" align-center>
        <el-select
            v-model="shopStatus"
            class="m-2"
            placeholder="请选择营业状态"
            @change="onSelectShopStatusChange"
        >
            <el-option
            v-for="item in shopStatusList"
            :key="item.value"
            :label="item.label"
            :value="item.value"
            />
        </el-select>
    </el-dialog>
</template>
<script lang="ts" setup>
import SVGIcon from "../common/SVGIcon.vue"
import AvatarLogin from "../common/AvatarLogin.vue"
import { getShopStatus, setShopStatus } from "../../api/Header";
import { ref } from "vue";
import { ElMessage } from "element-plus";

// 选择店铺营业状态弹窗是否显示
const dialogSwitchShopStatus = ref(false);
// 切换店铺营业状态按钮被点击了
const onSwitchShopStatusBtnClick = () => {
    // 显示切换营业状态弹窗
    dialogSwitchShopStatus.value = true;
}
const onSelectShopStatusChange = (value: any) => {
    setShopStatus(value).then((res) => {
        if(res.data.code) { // code == 1 营业状态切换成功
            ElMessage({
                message: "营业状态切换成功",
                type: "success"
            })
        } else {
            ElMessage({
                message: "营业状态切换失败",
                type: "error"
            })
        }
    })
}

// 当前店铺营业状态
const shopStatus = ref(0);
// 营业状态列表
const shopStatusList = ref([
    {
        label: "已打烊",
        value: 0
    },
    {
        label: "营业中",
        value: 1
    }
])
// 获取当前店铺营业状态
getShopStatus().then((res) => {
    if(res.data.code) { // code == 1 获取店铺状态成功
        const status = res.data.data; // 1营业中 0已打烊
        shopStatus.value = status;
    }
})
</script>

<style lang="scss" scoped>
.header-container {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 100%;
    // 左侧容器
    .left-container {
        display: flex;
        align-items: center;
        // logo
        .logo {
            width: 150px;
            height: 53px;
            margin-left: 52px;
            margin-right: 121px;
            .icon {
                width: 150px;
                height: 53px;
            }
        }
        // 营业状态
        .business-state {
            width: 120px;
            height: 46px;
            background-color: #389E79;
            border-radius: 8px;
            font-size: 24px;
            color: white;
            display: flex;
            justify-content: center;
            align-items: center;
            font-weight: 400;
            &.closed {
                background-color: #d3d4d4;
            }
        }
    }
    // 右侧容器
    .right-container {
        display: flex;
        align-items: center;
        // 营业状态切换按钮
        .business-state-change-btn {
            width: 142px;
            height: 46px;
            background-color: #389E79;
            border-radius: 8px;
            font-size: 24px;
            color: white;
            display: flex;
            justify-content: center;
            cursor: pointer;
            align-items: center;
            font-weight: 400;
            margin-right: 32px;
        }
        // 消息
        .message-box {
            margin-right: 80px;
            width: 45px;
            height: 45px;
            position: relative;
            cursor: pointer;
            // 图标
            .icon {
                width: 45px;
                height: 45px;
            }

            &.have-message::after {
                content: '';
                display: block;
                width: 10px;
                height: 10px;
                background-color: red;
                border-radius: 50%;
                position: absolute;
                top: 3px;
                right: 0;
            }
        }
    }
}

// 手机端竖屏
@media screen and (max-width: 768px) {
    .header-container {
        justify-content: center;
        .left-container {
            .logo {
                margin: 0;
            }
            .business-state {
                display: none;
            }
        }
        // 隐藏营业状态，商家头像等放到nav里面展示，手机端的导航栏只展示一个logo和侧边栏展开按钮
        .right-container {
            display: none;
        }
    }
}

// ipad或手机端横屏
@media screen and (min-width: 769px) and (max-width: 1200px) {
    .header-container {
        justify-content: center;
        .left-container {
            .logo {
                margin: 0;
            }
            .business-state {
                display: none;
            }
        }
        // 隐藏营业状态，商家头像等放到nav里面展示，手机端的导航栏只展示一个logo和侧边栏展开按钮
        .right-container {
            display: none;
        }
    }
}
</style>
