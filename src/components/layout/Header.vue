<template>
    <div class="header-container">
        <!-- 左侧容器 -->
        <div class="left-container">
            <!-- logo -->
            <div class="logo">
                <SVGIcon icon-name="logo" class="icon"></SVGIcon>
            </div>
            <!-- 营业状态 -->
            <div class="business-state">
                营业中
            </div>
        </div>
        <!-- 右侧容器 -->
        <div class="right-container">
            <!-- 营业状态切换按钮 -->
            <div class="business-state-change-btn">
                营业状态
            </div>
            <!-- 消息 -->
            <div class="message-box have-message">
                <SVGIcon icon-name="message" class="icon"></SVGIcon>
            </div>
            <!-- 商家信息 -->
            <div class="avatar-container">
                <div class="avatar"></div>
                <div class="name">管理员</div>
            </div>
        </div>
    </div>
</template>
<script lang="ts" setup>
import SVGIcon from "../common/SVGIcon.vue"
</script>

<style lang="scss" scoped>
.header-container {
    display: flex;
    align-items: center;
    justify-content: space-between;
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
            cursor: pointer;
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
        .avatar-container {
            display: flex;
            align-items: center;
            margin-right: 52px;
            cursor: pointer;
            .avatar {
                width: 50px;
                height: 50px;
                border-radius: 50%;
                background-color: #AED7BD;
                margin-right: 12px;
            }
            .name {
                font-size: 18px;
                font-weight: 400;
            }
        }
    }
}
</style>
