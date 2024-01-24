<template>
    <div class="sheet-container">
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
.sheet-container {
    background-color: white;
    margin-right: 36px;
    border-radius: 10px;
    .header-container {
        height: 66px;
        
    }
    .sheet-container {
        
    }
}
</style>
