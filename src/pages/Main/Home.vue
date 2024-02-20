<template>
    <div class="home-container">
        <!-- 今日数据 -->
        <ModelPanel class="today-data-container">
            <template v-slot:header>
                <div class="today-data-card-title-container">
                    <div class="title">今日数据 / {{ todayDateStr }}</div>
                    <div class="more-info-btn">查看详细数据 ></div>
                </div>
            </template>
            <template v-slot:content>
                <div class="today-data-card-list-container">
                    <TodayDataCard v-for="todayData in todayDataList" :key="todayData.title" class="today-data-card-item" :title="todayData.title" :data="todayData.data"></TodayDataCard>
                </div>
            </template>
        </ModelPanel>
        <!-- 订单管理和菜品总览 -->
        <div class="orderform-manager-and-food-manager-container">
            <!-- 订单管理 -->
            <ModelPanel class="orderform-manager-panel">
                <template v-slot:header>
                    订单管理
                </template>
                <template v-slot:content>
                    <div class="orderform-manager-card-container">
                        <OrderformManagerCard class="orderform-manager-card-item" v-for="orderformData in orderformDataList" :key="orderformData.title" :title="orderformData.title" :data="orderformData.data" :background-color="orderformData.backgroundColor"></OrderformManagerCard>
                    </div>
                    <div class="more-info-btn" @click="$router.push({name: 'OrderformManager'})">查看订单明细 ></div>
                </template>
            </ModelPanel>
            <div class="slice-line"></div>
            <!-- 菜品总览 -->
            <ModelPanel class="food-manager-panel">
                <template v-slot:header>
                    菜品总览
                </template>
                <template v-slot:content>
                    <!-- 总容器 -->
                    <div class="food-container">
                        <!-- 菜品管理 -->
                        <div class="food-category-manager-container">
                            <FoodManagerCard title="已启售">{{ overviewDishes.sold }}</FoodManagerCard>
                            <FoodManagerCard title="已停售">{{ overviewDishes.discontinued }}</FoodManagerCard>
                            <FoodManagerCard title="新增菜品">
                                <SVGIcon icon-name="add" class="icon" @click="$router.push({name: 'FoodCategoryManager'})"></SVGIcon>
                            </FoodManagerCard>
                            <div class="more-info" @click="$router.push({name: 'FoodCategoryManager'})">
                                查看菜品管理 >
                            </div>
                        </div>
                    </div>
                </template>
            </ModelPanel>
        </div>
        <!-- 表格布局容器 -->
        <SheetLayout class="sheet-container">
            <!-- 头部工具栏 -->
            <template v-slot:header>
                <div class="header-container">
                    <div class="title">订单信息</div>
                    <div class="right-tool">
                        <OrderStatusSwitchBtn @active-change="handleOrderStatusSwitchChange" :pending-orders-count="pendingOrdersCount" :to-be-delivered-count="toBeDeliveredCount"></OrderStatusSwitchBtn>
                    </div>
                </div>
            </template>
            <!-- 表格数据 -->
            <template v-slot:sheet>
                <Sheet :table-data="tableData" :pinto="true" >
                    <el-table-column prop="number" label="订单号" width="140"></el-table-column>
                    <el-table-column prop="orderDishes" label="订单菜品"/>
                    <el-table-column prop="sendState" label="派送状态" width="100">
                        <template #default="{row}">
                            {{ 
                                // @ts-ignore
                                statusCodeMap[row.status]
                            }}
                        </template>
                    </el-table-column>
                    <el-table-column prop="address" label="地址" />
                    <el-table-column prop="estimatedDeliveryTime" sortable label="预计送达时间" width="160" />
                    <el-table-column prop="amount" label="实收金额" width="100" />
                    <el-table-column prop="remark" label="备注" />
                    <el-table-column prop="control" label="操作" width="170">
                        <template #default="{row}">
                            <div class="control-container">
                                <el-button text class="control-btn" v-show="row.status === 2" type="success" @click="onJieDanBtnClick(row)">接单</el-button>
                                <el-button text class="control-btn" v-show="row.status === 2" type="danger" @click="onJuDanBtnClick(row)">拒单</el-button>
                                <el-button text class="control-btn" v-show="row.status === 3" type="danger" @click="onTuiDanBtnClick(row)">取消</el-button>
                                <el-button text class="control-btn" @click="onChaKanBtnClick(row)">查看</el-button>
                            </div>
                        </template>
                    </el-table-column>
                </Sheet>
            </template>
            <template #pagination>
                <el-pagination background layout="total, prev, pager, next, sizes, jumper" :total="total" v-model:page-size="pageSize" v-model:current-page="currentPage" @change="onCurrentPageOrPageSizeChange" />
            </template>
        </SheetLayout>
        <ConfirmDialog v-model="jieDanConfirmDialogVisible" tip="确认接单？" btn-text="接单" @confirm="onConfirmJieDanBtnClick" />
        <RejectOrderDialog v-model="juDanDialogVisible" title="拒单原因" tip="拒单原因:" placeholder="请输入拒单原因..." btn="拒单" @confirm="onConfirmJuDanBtnClick" />
        <RejectOrderDialog v-model="tuiDanDialogVisible" title="取消原因" tip="取消原因:" placeholder="请输入取消原因..." btn="取消" @confirm="onConfirmTuiDanBtnClick" />
        <OrderInfoDialog v-model="orderInfoDialogVisible" v-model:detail="orderDetailInfo"></OrderInfoDialog>
    </div>
</template>
<script lang="ts" setup>
import ModelPanel from "../../components/common/ModePanel.vue"
import TodayDataCard from "../../components/Home/TodayDataCard.vue"
import OrderformManagerCard from "../../components/Home/OrderformManagerCard.vue"
import FoodManagerCard from "../../components/Home/FoodManagerCard.vue"
import SVGIcon from "../../components/common/SVGIcon.vue"
import SheetLayout from "../../components/common/SheetLayout.vue"
import Sheet from "../../components/common/Sheet.vue"
import OrderStatusSwitchBtn from "../../components/Home/OrderStatusSwitchBtn.vue";
import { useOrderInfo, useOrderManager, useOverviewDishes, useOverviewSetmeals, useTodayData } from "../../hooks/page/HomeHook"
import ConfirmDialog from "../../components/common/ConfirmDialog.vue"
import RejectOrderDialog from "../../components/common/RejectOrderDialog.vue"
import OrderInfoDialog from "../../components/common/OrderInfoDialog.vue"
import { statusCodeMap } from "../../api/Home"

// 订单信息
const { 
    tableData, 
    handleOrderStatusSwitchChange, 
    pageSize, 
    currentPage, 
    total, 
    onCurrentPageOrPageSizeChange, 
    jieDanConfirmDialogVisible, 
    onJieDanBtnClick, 
    onConfirmJieDanBtnClick, 
    juDanDialogVisible, 
    onJuDanBtnClick, 
    tuiDanDialogVisible, 
    onTuiDanBtnClick,
    onConfirmJuDanBtnClick,
    onConfirmTuiDanBtnClick,
    orderInfoDialogVisible,
    onChaKanBtnClick,
    orderDetailInfo,
    pendingOrdersCount,
    toBeDeliveredCount
} = useOrderInfo();

// 今日数据
const { todayDateStr, todayDataList } = useTodayData();

// 订单管理
const { orderformDataList } = useOrderManager();

// 菜品总览
const { overviewDishes } = useOverviewDishes();

// 套餐总览
const { overviewSetmeals } = useOverviewSetmeals();
</script>

<style lang="scss" scoped>
.home-container {
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    .today-data-container {
        margin-bottom: 10px;
    }
    .today-data-card-title-container {
        display: flex;
        justify-content: space-between;
        .more-info-btn {
            margin-right: 20px;
            color: #253FCA;
            cursor: pointer;
        }
    }
    .today-data-card-list-container {
        display: flex;
        
        .today-data-card-item {
            margin-right: 85px;
            &:last-child {
                margin-right: 0px;
            }
        }
    }
    .orderform-manager-and-food-manager-container {
        display: flex;
        .slice-line {
            width: 1px;
            height: 169px;
            background-color: #B7BFDD;
            margin: 12px 44px;
        }
        .orderform-manager-panel {
            .orderform-manager-card-container {
                display: flex;
                .orderform-manager-card-item {
                    margin-right: 54px;
                    &:last-child {
                        margin-right: 0px;
                    }
                }
            }
            .more-info-btn {
                color: #253FCA;
                cursor: pointer;
                text-align: right;
                margin-top: 20px;
            }
        }
        .food-manager-panel {
            .food-container {
                display: flex;
            }
            .food-category-manager-container, .foodcombo-manager-container {
                margin-right: 58px;
                &:last-child {
                    margin-right: 0;
                }
                & > div {
                    margin-bottom: 11px;
                    .icon {
                        width: 24px;
                        height: 24px;
                        cursor: pointer;
                    }
                }
                .more-info {
                    color: #253FCA;
                    text-align: right;
                    cursor: pointer;
                }
            }
        }
    }
    .sheet-container {
        height: 400px;
        .header-container {
            display: flex;
            align-items: center;
            justify-content: space-between;
            height: 100%;
            padding: 0 22px;
            .title {
                font-size: 24px;
                font-weight: bold;
            }
        }
        .control-container {
            display: flex;
            flex-wrap: wrap;
            justify-content: flex-end;
            .control-btn {
                // color: #2d3478;
            }
        }
        .check-box-of-column {
            display: flex;
            align-items: center;
            .el-checkbox {
                margin-right: 10px;
            }
        }
    }
}

// 手机端竖屏
@media screen and (max-width: 768px) {
    .home-container {
        .today-data-card-list-container {
            flex-direction: column;
        }
        .orderform-manager-and-food-manager-container {
            flex-direction: column;
            .slice-line {
                display: none;
            }
            .orderform-manager-panel {
                .orderform-manager-card-container {
                    flex-direction: column;
                }
            }
        }
    }
}

// ipad或手机端横屏
@media screen and (min-width: 769px) and (max-width: 1200px) {
    .home-container {
        .today-data-card-list-container {
            flex-direction: column;
        }
        .orderform-manager-and-food-manager-container {
            flex-direction: column;
            .slice-line {
                display: none;
            }
            .orderform-manager-panel {
                .orderform-manager-card-container {
                    flex-direction: column;
                }
            }
        }
    }
}

@media screen and (min-width: 1200px) and (max-width: 1690px) {
    .home-container {
        .orderform-manager-and-food-manager-container {
            flex-direction: column;
            .slice-line {
                display: none;
            }
            .orderform-manager-card-container {
                justify-content: space-around;
            }
            .food-manager-panel {
                .food-container {
                    justify-content: space-around;
                }
            }
        }
    }
}
</style>
