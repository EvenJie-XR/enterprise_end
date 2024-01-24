<template>
    <el-table :data="props.tableData" style="width: 100%">
        <el-table-column prop="date" label="Date" width="180" />
        <el-table-column prop="name" label="Name" width="180" />
        <el-table-column prop="address" label="Address" />
    </el-table>
</template>
<script lang="ts" setup>
    const props = defineProps({
        tableData: Object
    })
</script>

<style lang="scss" scoped>
//
</style>
