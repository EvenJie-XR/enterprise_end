<template>
    <div class="home-container">
        <!-- 今日数据 -->
        <ModelPanel class="today-data-container">
            <template v-slot:header>
                <div class="today-data-card-title-container">
                    <div class="title">今日数据 / 2022.4.22 18:30</div>
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
                    <div class="more-info-btn">查看订单明细 ></div>
                </template>
            </ModelPanel>
            <div class="slice-line"></div>
            <!-- 菜品总览 -->
            <ModelPanel class="food-manager-panel">
                <template v-slot:header>
                    菜品/套餐总览
                </template>
                <template v-slot:content>
                    <!-- 总容器 -->
                    <div class="food-container">
                        <!-- 菜品管理 -->
                        <div class="food-category-manager-container">
                            <FoodManagerCard title="已起售">12</FoodManagerCard>
                            <FoodManagerCard title="已停售">02</FoodManagerCard>
                            <FoodManagerCard title="新增菜品">
                                <SVGIcon icon-name="add" class="icon"></SVGIcon>
                            </FoodManagerCard>
                            <div class="more-info">
                                查看菜品管理 >
                            </div>
                        </div>
                        <!-- 套餐管理 -->
                        <div class="foodcombo-manager-container">
                            <FoodManagerCard title="已起售">12</FoodManagerCard>
                            <FoodManagerCard title="已停售">02</FoodManagerCard>
                            <FoodManagerCard title="新增菜品">
                                <SVGIcon icon-name="add" class="icon"></SVGIcon>
                            </FoodManagerCard>
                            <div class="more-info">
                                查看套餐管理 >
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
                        <el-button size="large" plain color="rgb(40, 167, 103)">待接单(12)</el-button>
                        <el-button size="large" plain color="rgb(40, 167, 103)">待派送(10)</el-button>
                    </div>
                </div>
            </template>
            <!-- 表格数据 -->
            <template v-slot:sheet>
                <Sheet :table-data="tableData" :pinto="true" >
                    <el-table-column prop="no" label="订单号">
                        <template #header="{ column }">
                            <div class="check-box-of-column">
                                <el-checkbox />
                                {{ column.label }}
                            </div>
                        </template>
                        <template #default="{row}">
                            <div class="check-box-of-column">
                                <el-checkbox />
                                {{ row.no }}
                            </div>
                        </template>
                    </el-table-column>
                    <el-table-column prop="status" label="派送状态"/>
                    <el-table-column prop="name" label="订单菜品"/>
                    <el-table-column prop="address" label="地址" />
                    <el-table-column prop="time" sortable label="预计送达时间" />
                    <el-table-column prop="money" label="实收金额" width="100" />
                    <el-table-column prop="notes" label="备注" />
                    <el-table-column prop="control" label="操作">
                        <template #default="row">
                            <el-button text class="control-btn" @click="acceptOrder(row, row.$index)">接单</el-button>
                            <el-button text class="control-btn" @click="cancelandRefuseOrder(row, row.$index, '拒单原因')">拒单</el-button>
                            <el-button text class="control-btn">查看</el-button>
                            <!-- TODO 取消按钮出现的条件 -->
                            <el-button text class="control-btn" @click="cancelandRefuseOrder(row, row.$index, '取消原因')">取消</el-button>
                        </template>
                    </el-table-column>
                </Sheet>
            </template>
            <template #pagination>
                <el-pagination background layout="prev, pager, next, sizes, jumper" :total="1000" />
            </template>
        </SheetLayout>
            <!-- 接单和拒单的弹窗 -->
            <el-dialog v-model="dialogVisible" :title="dialogTittle" style="background-color: #F1F3EF; border-radius: 10px;">
    <el-form :model="reason">
      <el-form-item :label="dialogTittle" label-width="100px">
        <el-input v-model="reason.reason" autocomplete="off" :placeholder= "`请输入${dialogTittle}`"/>
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogVisible = false" size="large">取消</el-button>
        <el-button type="primary" @click="dialogVisible = false" size="large">确认</el-button>
      </span>
    </template>
  </el-dialog>
    </div>


  <!-- 永达无界弹窗 -->
  <el-dialog v-model="systemNoticeVisible" append-to=".home-container" title="系统通知" width="30%" class="systemNotice" style="border-radius: 10px; background: #F1F3EF;" center>
    <template #default>
        <div class="systemNotice-container">
            <div class="systemNotice-time">2023-08-17 18：33</div>
            <div class="systemNotice-content">
                <div class="systemNotice-top">
                    <div class="header">欢迎使用永达无界</div>
                    <div class="content">欢迎使用永达无界外卖商家端</div>
                </div>
                <a class="systemNotice-footer">
                        <span>查看详情</span>
                        <span> > </span>
                </a>
                
            </div>
        </div>
    </template>
  </el-dialog>
</template>
<script lang="ts" setup>
import { ref } from "vue";
import ModelPanel from "../components/common/ModePanel.vue"
import TodayDataCard from "../components/Home/TodayDataCard.vue"
import OrderformManagerCard from "../components/Home/OrderformManagerCard.vue"
import FoodManagerCard from "../components/Home/FoodManagerCard.vue"
import SVGIcon from "../components/common/SVGIcon.vue"
import SheetLayout from "../components/common/SheetLayout.vue"
import Sheet from "../components/common/Sheet.vue"
import { Notification } from "../components/common/Notification.vue";
// 取消和拒单的数据
let dialogVisible = ref(false)
let dialogTittle = ref("")
let reason = ref({
    reason: ""
})

// 今日数据模拟数据
const todayDataList = ref([
    {
        title: "营业额",
        data: "200.34"
    },
    {
        title: "有效订单",
        data: "12"
    },
    {
        title: "订单完成率",
        data: "16%"
    },
    {
        title: "平均客单价",
        data: "30"
    },
    {
        title: "新增用户",
        data: "18"
    }
]);

// 菜单套餐总览模拟数据
const orderformDataList = ref([
    {
        title: "待接单",
        data: "12",
        backgroundColor: "rgb(255,128,0)"
    },
    {
        title: "待派送",
        data: "10",
        backgroundColor: "rgb(255,128,0)"
    },
    {
        title: "已完成",
        data: "18",
        backgroundColor: "#28A767"
    },
    {
        title: "已取消",
        data: "1",
        backgroundColor: "#28A767"
    },
    {
        title: "全部订单",
        data: "41",
        backgroundColor: "#28A767"
    }
])

// 订单信息模拟数据
const tableData = ref([
    {
        no: 2021010200001,
        status: "派送中",
        name: "宫保鸡丁*1 红烧带鱼*1 农家小炒肉*2",
        address: "金燕楼办公楼（建材城西路九号）四层--宾馆北侧办公室",
        time: "2021-01-02 11：11：11",
        money: "40.00",
        notes: "不要香菜",
    },
    {
        no: 2021010200001,
        status: "派送中",
        name: "宫保鸡丁*1 红烧带鱼*1 农家小炒肉*2",
        address: "金燕楼办公楼（建材城西路九号）四层--宾馆北侧办公室",
        time: "2021-01-02 11：11：11",
        money: "40.00",
        notes: "不要香菜",
    },

])


// 取消和拒绝订单处理函数
const cancelandRefuseOrder = (row: any, index: number, tittle: string) => {
    // 记录被点击的数据
    console.log(row, index);
    dialogTittle.value = tittle
    dialogVisible.value = true
}

// TODO 拒单和取消弹订单窗确认后的逻辑函数

// TODO 查看订单逻辑函数

// 系统提示可见变量
let systemNoticeVisible = ref(true)

const acceptOrder = (row: any, index: number) => {
    Notification("确认接单").then( () => {
        console.log("接单成功");
        
    } )
}

</script>

<style lang="scss" scoped>
.home-container {
    width: 100%;
    height: 100%;
    padding-top: 28px;
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
        margin-bottom: 16px;
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
            .right-tool {

            }
        }
        .control-btn {
            color: #2d3478;
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

// 系统消息内部样式
:deep(.el-dialog__header){
        border-top-right-radius: 10px;
        border-top-left-radius: 10px;
        padding: 10px;
        margin: 0px !important;
        background-color: white;
}
:deep(.el-dialog__body){
    // display: flex;
    // justify-content: center;
    padding: 100px;
}
.systemNotice{

    .systemNotice-container{
        // width: 40%;
        // padding-top: 60px;
        // padding-bottom: 60px;
        // padding-left: auto;
        min-height: 300px;
        display: flex;
        flex-direction: column;
        // justify-content: space-evenly;
        align-items: center;
        .systemNotice-time{
            margin-top: 30px;
            margin-bottom: 20px;
            text-align: center;
        }
        .systemNotice-content{
            background-color: white;
            border-radius: 10px;
            width: 70%;
            margin-bottom: 80px;
            .systemNotice-top{
                padding: 10px;
                .header{
                    font-size: 20px;
                    margin-bottom: 10px;
                }
                .content{
                    font-size: 14px;
                    min-height: 100px;
                }
            }
            .systemNotice-footer{
                padding: 10px;
                border-top: 1px solid #888888 ;
                height: 20px;
                display: flex;
                justify-content: space-between;
            }
        }
    }
}

:deep(.el-dialog__header){
    margin: 0px !important;
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
    background-color: white !important;
    border-bottom: 1px solid #999999;
  }

</style>
