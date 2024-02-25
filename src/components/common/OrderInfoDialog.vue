<template>
    <el-dialog id="order-info-dialog-container" align-center title="订单信息">
        <el-scrollbar height="60vh">
            <el-card shadow="never" class="card">
                <el-row :gutter="20">
                    <el-col :span="12" :xs="20" :sm="20" :md="12" class="item">
                        <span class="key">订单号:</span>
                        <span>{{ detailOrderInfo["订单号"] }}</span>
                    </el-col>
                    <el-col :span="12" :xs="20" :sm="20" :md="12" class="item">
                        <span class="key">下单时间:</span>
                        <span>{{ detailOrderInfo["下单时间"] }}</span>
                    </el-col>
                    <el-col :span="12" :xs="20" :sm="20" :md="12" class="item">
                        <span class="key">订单状态:</span>
                        <span>
                            {{ detailOrderInfo["订单状态"] }}
                        </span>
                    </el-col>
                    <el-col :span="12" :xs="20" :sm="20" :md="12" class="item">
                        <span class="key">订单金额:</span>
                        <span>
                            {{ detailOrderInfo["订单金额"] }}
                        </span>
                    </el-col>
                    <el-col :span="12" :xs="20" :sm="20" :md="12" class="item">
                        <span class="key">用户名:</span>
                        <span>
                            {{ detailOrderInfo["用户名"] }}
                        </span>
                    </el-col>
                    <el-col :span="12" :xs="20" :sm="20" :md="12" class="item">
                        <span class="key">手机号:</span>
                        <span>
                            {{ detailOrderInfo["手机号"] }}
                        </span>
                    </el-col>
                    <el-col :span="12" :xs="20" :sm="20" :md="12" class="item">
                        <span class="key">地址:</span>
                        <span>
                            {{ detailOrderInfo["地址"] }}
                        </span>
                    </el-col>
                    <el-col :span="12" :xs="20" class="item" v-if="detail?.status === 6">
                        <span class="key">取消原因:</span>
                        <span>
                            {{ detailOrderInfo["取消原因"] }}
                        </span>
                    </el-col>
                </el-row>
            </el-card>
            <el-card shadow="never" class="card dishes-container">
                <div class="title">
                    菜品
                </div>
                <div class="dishes-list">
                    <div class="dishes-item" v-for="dishes in detail?.orderDetailList" :key="dishes.id">
                        <div class="name-left">
                            {{ dishes.name }}
                        </div>
                        <div class="amount-right">
                            <span>*{{ dishes.number }}</span>
                            <span>{{ dishes.amount }}元</span>
                        </div>
                    </div>
                </div>
                <hr/>
                <div class="order-other-info-list">
                    <div class="order-other-info-item">
                        <div class="key-left">派送费</div>
                        <div class="amount-right">9.00元</div>
                    </div>
                    <div class="order-other-info-item">
                        <div class="key-left">打包费</div>
                        <div class="amount-right">9.00元</div>
                    </div>
                    <div class="order-other-info-item">
                        <div class="key-left">合计</div>
                        <div class="amount-right" style="font-weight: bold;">{{ detail?.amount }}元</div>
                    </div>
                </div>
            </el-card>
        </el-scrollbar>
    </el-dialog>
</template>
<script lang="ts" setup>
import { computed } from 'vue';
import { statusCodeMap } from "../../api/Home"

const detail = defineModel<any>('detail');

const detailOrderInfo = computed(() => {
    return {
        "订单号": detail?.value?.number,
        "下单时间": detail?.value?.orderTime,
        // @ts-ignore
        "订单状态": statusCodeMap[detail?.value?.status],
        "订单金额": detail?.value?.amount,
        "用户名": detail?.value?.userName,
        "手机号": detail?.value?.phone,
        "地址": detail?.value?.address,
        "取消原因": detail?.value?.cancelReason
    }
});
</script>
<style lang="scss">
#order-info-dialog-container {
    width: 40vw;
}
// 手机端竖屏
@media screen and (max-width: 1024px) {
    #order-info-dialog-container {
        width: 90vw;
    }
}
</style>
<style lang="scss" scoped>
.card {
    margin-bottom: 10px;
    .item {
        margin: 10px 0;
        .key {
            margin-right: 20px;
            font-weight: bold;
        }
    }
}
.dishes-container {
    .title {
        font-size: 16px;
        font-weight: bold;
        margin-bottom: 10px;
    }
    .dishes-list {
        .dishes-item {
            display: flex;
            justify-content: space-between;
            margin-bottom: 10px;
            .amount-right {
                width: 40%;
                display: flex;
                justify-content: space-between;
            }
        }
    }
}
.order-other-info-list {
    .order-other-info-item {
        display: flex;
        justify-content: space-between;
        margin-bottom: 10px;
    }
}
</style>
