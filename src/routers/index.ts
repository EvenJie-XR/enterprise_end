import { createRouter, createWebHashHistory } from "vue-router"
import Home from "../pages/Home.vue"
import OrderformManager from "../pages/OrderformManager.vue"
import CategoryManager from "../pages/CategoryManager.vue"
import FoodCategoryManager from "../pages/FoodCategoryManager.vue"
import DataStatistics from "../pages/DataStatistics.vue"

const router = createRouter({
    history: createWebHashHistory(),
    routes: [
        // 工作台
        {
            path: '/',
            name: 'Home',
            component: Home,
        },
        // 订单管理
        {
            path: '/OrderformManager',
            name: "OrderformManager",
            component: OrderformManager
        },
        // 分类管理
        {
            path: '/CategoryManager',
            name: 'CategoryManager',
            component: CategoryManager,
        },
        // 菜品管理
        {
            path: '/FoodCategoryManager',
            name: 'FoodCategoryManager',
            component: FoodCategoryManager,
        },
        // 数据统计
        {
            path: '/DataStatistics',
            name: 'DataStatistics',
            component: DataStatistics,
        },
    ]
})

export {
    router
}