<!-- 
    快速创建风格表格组件：
    <Sheet :table-data="tableData" >
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
        <el-table-column prop="name" label="订单菜品"/>
        <el-table-column prop="address" label="地址" />
        <el-table-column prop="time" sortable label="预计送达时间" />
        <el-table-column prop="money" label="实收金额" width="100" />
        <el-table-column prop="notes" label="备注" />
        <el-table-column prop="control" label="操作">
            <template #default>
                <el-button text class="control-btn">接单</el-button>
                <el-button text class="control-btn">拒单</el-button>
                <el-button text class="control-btn">查看</el-button>
            </template>
        </el-table-column>
    </Sheet>
-->
<template>
    <el-table :data="props.tableData" style="width: 100%" :class="{'sheet-container': true, 'pinto': pinto, 'tbody-pinto': !pinto}" height="100%">
        <slot></slot>
    </el-table>
</template>
<script lang="ts" setup>
    const props = defineProps({
        tableData: Object,
        pinto: {
            type: Boolean,
            default: true
        }
    })
</script>

<style lang="scss" scoped>
.sheet-container {
    &:deep(thead) {
        th {
            background-color: #A9EBC1;
            color: black;
        }
    }
    &.tbody-pinto:deep(tbody) {
        tr:nth-child(even) {
            background: rgba(169, 235, 193, 0.34);
        }
    }
    &.pinto:deep(thead) {
        th {
            background-color: #A9EBC1;
            color: black;
            &:nth-child(even) {
                background-color: #389E79;
                color: white;
            }
        }
    }
}
</style>
