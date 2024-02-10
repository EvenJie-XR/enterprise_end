<template>
    <!-- 导航栏元素 -->
    <div :class="{'nav-item': true, 'active': item.active}" v-for="item in navList" :key="item.iconName" @click="handleNavItemClick(item)">
        <SVGIcon :iconName="item.iconName"></SVGIcon>
        <div class="title">{{ item.title }}</div>
    </div>
</template>
<script lang="ts" setup>
import SVGIcon from "../common/SVGIcon.vue"
import { Ref, onMounted, ref, watch } from "vue";
import { useRoute } from "vue-router"
import { router } from "../../routers/index"

// 当前路由信息对象
const route = useRoute();
const handleNavActive = () => {
    // 根据当前路由信息判断导航栏需要高亮的元素
    route.matched.forEach((matchedItem) => {
        navList.value.forEach((navItem) => {
            navItem.active = false;
            if(navItem.routerName === matchedItem.name) {
                navItem.active = true;
            }
        })
    })
}
onMounted(() => {
    handleNavActive();
})
// 监听路由发生了切换
watch(route, () => {
    handleNavActive();
})

// 导航栏元素typescript类型声明
type NavItemType = {
    title: string;
    iconName: string;
    active: boolean;
    routerName: string;
}
// 导航栏列表
const navList: Ref<NavItemType[]> = ref([
    {
        title: "工作台",
        iconName: "home",
        active: false,
        routerName: "Home"
    },
    {
        title: "订单管理",
        iconName: "calendar",
        active: false,
        routerName: "OrderformManager"
    },
    {
        title: "分类管理",
        iconName: "stack",
        active: false,
        routerName: "CategoryManager"
    },
    {
        title: "菜品管理",
        iconName: "restaurant",
        active: false,
        routerName: "FoodCategoryManager"
    },
    {
        title: "数据统计",
        iconName: "bar-chart",
        active: false,
        routerName: "DataStatistics"
    },
])
// 导航栏元素点击事件
const handleNavItemClick = (navItem: NavItemType) => {
    router.push({
        name: navItem.routerName
    })
}
</script>

<style lang="scss" scoped>
// 导航栏元素容器
.nav-item {
    height: 48px;
    width: 148px;
    font-size: 20px;
    display: flex;
    align-items: center;
    margin-bottom: 50px;
    color: #666;
    border-radius: 5px;
    cursor: pointer;
    transition: .2s all;
    // 元素激活状态的样式
    &.active {
        background-color: #389e79;
        color: white;
        .icon {
            color: #ffffff;
        }
    }
    // 元素图标
    .icon {
        width: 30px;
        height: 30px;
        color: #666;
        margin-left: 14px;
    }
    // 元素文本
    .title {
        margin-left: 10px;
    }
}
</style>
