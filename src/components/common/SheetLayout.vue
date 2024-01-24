<template>
    <div class="sheet-layout-container">
        <div class="header-container">
            <slot name="header"></slot>
        </div>
        <div class="sheet-container">
            <slot name="sheet"></slot>
        </div>
        <div class="pagination-container">
            <slot name="pagination"></slot>
        </div>
    </div>
</template>
<script lang="ts" setup>

</script>

<style lang="scss" scoped>
.sheet-layout-container {
    background-color: white;
    margin-right: 36px;
    border-radius: 10px;
    .header-container {
        height: 54px;
    }
    .sheet-container {
        height: calc(100% - 66px - 35px);
        padding: 0 10px;
        margin-bottom: 10px;
    }
    .pagination-container {
        height: 35px;
        display: flex;
        justify-content: center;
    }
}
</style>
