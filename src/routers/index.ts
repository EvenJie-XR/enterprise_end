import { createRouter, createWebHistory } from "vue-router"
import { useUserInfo } from "../stores/Login"

const router = createRouter({
    history: createWebHistory(),
    routes: [
        // 工作台
        {
            path: '/',
            name: 'Main',
            component: () => import('../pages/Main/Main.vue'),
            redirect: "/Home",
            children: [
                // 工作台
                {
                    path: "/Home",
                    name: "Home",
                    component: () => import("../pages/Main/Home.vue")
                },
                // 订单管理
                {
                    path: '/OrderformManager',
                    name: "OrderformManager",
                    component: () => import('../pages/Main/OrderformManager.vue')
                },
                // 分类管理
                {
                    path: '/CategoryManager',
                    name: 'CategoryManager',
                    component: () => import("../pages/Main/CategoryManager.vue"),
                },
                // 菜品管理
                {
                    path: '/FoodCategoryManager',
                    name: 'FoodCategoryManager',
                    component: () => import("../pages/Main/FoodCategoryManager.vue"),
                },
                // 数据统计
                {
                    path: '/DataStatistics',
                    name: 'DataStatistics',
                    component: () => import("../pages/Main/DataStatistics.vue"),
                },
            ]
        },

        {
            path: "/Login",
            name: "Login",
            component: () => import("../pages/Login.vue")
        },
        {
            path: "/Shop",
            name: "Shop",
            component: () => import("../pages/ShopChoice.vue")
        }
    ]
})

// 鉴权用户是否登录，没有登录就跳转到Login页面，登录了就给他进入他想进入的页面
// @ts-ignore
router.beforeEach((to, from, next) => {
    const userInfo = useUserInfo();
    if (to.name !== 'Login' && !userInfo.token) {
        next({
            name: "Login"
        })
    } else {
        next();
    }
})

export {
    router
}