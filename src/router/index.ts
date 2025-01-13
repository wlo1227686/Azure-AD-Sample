import { createRouter, createWebHistory } from 'vue-router'
/** scripts */

import routerBeforeEach from './routerBeforeEach'   // 路由守衛
import routerRoutes from './routerRoutes'           // 路由表

// 配置 router
const router = createRouter({
    history: createWebHistory(import.meta.env.VITE_BASE),
    // 配置路由
    routes: routerRoutes,
});

// 設置路由守衛
router.beforeEach(routerBeforeEach);

export default router
