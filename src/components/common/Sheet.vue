<template>
    <el-table :data="props.tableData" style="width: 100%" class="sheet-container" height="100%">
        <slot></slot>
    </el-table>
</template>
<script lang="ts" setup>
    const props = defineProps({
        tableData: Object
    })
</script>

<style lang="scss" scoped>
.sheet-container {
    &:deep(thead) {
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
