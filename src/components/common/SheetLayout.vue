<template>
    <div class="sheet-layout-container">
        <div class="header-container">
            <slot name="header"></slot>
        </div>
        <div class="sheet-container">
            <slot name="sheet"></slot>
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
    height: 400px;
    .header-container {
        height: 66px;
    }
    .sheet-container {
        height: calc(400px - 66px);
        padding: 0 10px;
    }
}
</style>
