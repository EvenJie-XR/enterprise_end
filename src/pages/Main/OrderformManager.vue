<template>
    <div class="food-category-manager-container">
        <!-- 筛选部分 -->
        <ModelPanel class="food-manager-container">
            <template #header>
                <div class="header-container">
                    订单管理
                </div>
            </template>
            <template #content>
                <div class="content-container">
                    <div class="form-contianer">
                        <div class="form-item">
                            <div class="form-key">
                                订单号:
                            </div>
                            <div class="form-value">
                                <el-input v-model="no" size="large" placeholder="请输入订单号..." clearable />
                            </div>
                        </div>
                        <div class="form-item">
                            <div class="form-key">
                                手机号:
                            </div>
                            <div class="form-value">
                                <el-input v-model="phone" size="large" placeholder="请输入手机号..." clearable />
                            </div>
                        </div>
                        <div class="form-item">
                            <div class="form-key">
                                下单时间:
                            </div>
                            <div class="form-value">
                                <el-date-picker
                                    v-model="orderTime"
                                    type="datetimerange"
                                    start-placeholder="开始时间"
                                    end-placeholder="结束时间"
                                    size="large"
                                    format="YYYY-MM-DD HH:mm:ss"
                                    date-format="YYYY-MM-DD"
                                    time-format="hh:mm:ss"
                                    style="width: 240px;"
                                />
                            </div>
                        </div>
                    </div>
                    <el-button color="#389E79" class="search-btn" size="large" @click="updateTableData">查询</el-button>
                    <el-button class="search-btn" size="large" @click="reset">重置</el-button>
                </div>
            </template>
        </ModelPanel>
        <!-- 数据 -->
        <ModelPanel class="data-sheet-container">
            <template #header>
                <div class="header-container">
                    <el-tabs v-model="activeCategoryName" class="category-tabs" @tab-change="handleActiveCategoryNameChange">
                        <el-tab-pane label="全部订单" :name="0"></el-tab-pane>
                        <el-tab-pane label="待付款" :name="1"></el-tab-pane>
                        <el-tab-pane label="待接单" :name="2"></el-tab-pane>
                        <el-tab-pane label="已接单" :name="3"></el-tab-pane>
                        <el-tab-pane label="派送中" :name="4"></el-tab-pane>
                        <el-tab-pane label="已完成" :name="5"></el-tab-pane>
                        <el-tab-pane label="已取消" :name="6"></el-tab-pane>
                    </el-tabs>
                </div>
            </template>
            <template #content>
                <div class="content-container">
                    <Sheet class="sheet-container" tooltip-effect :pinto="true" :table-data="tableData" height="500px">
                        <el-table-column prop="number" label="订单号" />
                        <el-table-column prop="orderDishes" label="订单菜品" />
                        <el-table-column prop="username" label="订单状态">
                            <template #default="{row}">
                                {{ 
                                    // @ts-ignore
                                    statusCodeMap[row.status]
                                }}
                            </template>
                        </el-table-column>
                        <el-table-column prop="userName" label="用户名" />
                        <el-table-column prop="phone" label="手机号" />
                        <el-table-column prop="address" label="地址" />
                        <el-table-column prop="orderTime" sortable label="下单时间" />
                        <el-table-column prop="amount" label="实收金额">
                            <template #default="{row}">
                                {{ 
                                    // @ts-ignore
                                    "￥" + row.amount
                                }}
                            </template>
                        </el-table-column>
                        <el-table-column prop="remark" label="备注" />
                        <el-table-column label="操作">
                            <template #default="{row}">
                                <div class="control-container">
                                    <el-button text class="control-btn" type="success" @click="onTableJieDanBtnClick(row)" v-if="row.status === 2">接单</el-button>
                                    <el-button text class="control-btn" type="danger" v-if="row.status === 2" @click="onTableJuDanBtnClick(row)">拒单</el-button>
                                    <el-button text class="control-btn" type="danger" v-if="row.status === 3" @click="onTableCancelBtnClick(row)">取消</el-button>
                                    <el-button text class="control-btn" @click="onTableViewDeatilBtnClick(row)">查看</el-button>
                                </div>
                            </template>
                        </el-table-column>
                    </Sheet>
                    <div class="pagination-container">
                        <el-pagination background layout="prev, pager, next, sizes, jumper" :total="total" v-model:page-size="pageSize" v-model:current-page="currentPage" @change="onPaginationChange" />
                    </div>
                </div>
            </template>
        </ModelPanel>
    </div>
    <ConfirmDialog v-model="jieDanConfirmDialogVisible" tip="确定接单?" btn-text="接单" @confirm="onJieDanConfirmBtnClick" />
    <RejectOrderDialog v-model="juDanConfirmDialogVisible" title="拒单原因" tip="拒单原因" placeholder="请输入拒单原因..." btn="拒单" @confirm="onJuDanConfirmBtnClick" />
    <RejectOrderDialog v-model="cancelConfirmDialogVisible" title="取消原因" tip="取消原因" placeholder="请输入取消原因..." btn="取消订单" @confirm="onCancelConfirmBtnClick"/>
    <OrderInfoDialog v-model="viewDetailConfirmDialogVisible" :detail="detailOrderInfo" />
</template>
<script lang="ts" setup>
import { statusCodeMap } from "../../api/Home";
import ModelPanel from "../../components/common/ModePanel.vue"
import Sheet from "../../components/common/Sheet.vue"
import { useOrderformManager } from "../../hooks/page/OrderformManagerHook";
import ConfirmDialog from "../../components/common/ConfirmDialog.vue";
import RejectOrderDialog from "../../components/common/RejectOrderDialog.vue";
import OrderInfoDialog from "../../components/common/OrderInfoDialog.vue";

const { 
    tableData, jieDanConfirmDialogVisible, onTableJieDanBtnClick, onJieDanConfirmBtnClick, juDanConfirmDialogVisible, onTableJuDanBtnClick, cancelConfirmDialogVisible, onTableCancelBtnClick, viewDetailConfirmDialogVisible, onTableViewDeatilBtnClick, detailOrderInfo, // 表格部分
    no, phone, orderTime, reset, // 查询订单部分
    activeCategoryName, handleActiveCategoryNameChange, // 订单状态选择部分
    currentPage, pageSize, total, // 分页部分
    updateTableData, onPaginationChange, onJuDanConfirmBtnClick, onCancelConfirmBtnClick // 一些全局的方法
} = useOrderformManager();
</script>

<style lang="scss" scoped>
.food-category-manager-container {

    .food-manager-container {
        margin-bottom: 37px;

        .header-container {
            font-size: 26px;
        }

        .content-container {
            height: 70px;
            background: #FFF;
            display: flex;
            align-items: center;
            padding: 0 18px;
            border-radius: 10px;
            box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);

            .form-contianer {
                display: flex;
                align-items: center;

                .form-item {
                    display: flex;
                    align-items: center;
                    margin-right: 43px;

                    .form-key {
                        font-size: 22px;
                    }

                    .form-value {
                        margin-left: 10px;
                    }
                }
            }

            .search-btn {
                font-size: 22px;
                padding: 20px 40px;
                margin-left: 40px;
            }
        }
    }

    .data-sheet-container {
        border-radius: 10px 10px 10px 10px;
        background-color: white;
        height: 640px;

        .header-container {
            display: flex;
            .category-tabs {
                width: 100%;
                height: 100%;
                padding: 10px 0 0 0;
                :deep(.el-tabs__header) {
                    margin: 0;
                }
                :deep(.el-tabs__nav) {
                    .el-tabs__item {
                        font-size: 20px;
                        padding: 20px 60px;
                    }
                }
            }
            .btn {
                font-size: 20px;
                padding: 20px 40px;
            }
        }

        .content-container {
            padding: 0 10px;

            .sheet-container {
                border-radius: 5px;
                margin-bottom: 15px;

                .check-box-of-column {
                    display: flex;
                    align-items: center;

                    .checkbox {
                        margin-right: 10px;
                    }
                }
                .control-container {
                    display: flex;
                    flex-wrap: wrap;
                    .el-button+.el-button {
                        margin: 0;
                    }
                }
            }
        }

        .pagination-container {
            display: flex;
            justify-content: center;
        }
    }
}
</style>
