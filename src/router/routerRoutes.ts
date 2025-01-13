import { type RouteRecordRaw } from 'vue-router'

/** 線稿框_三樣式: 左側、頭部、內容 */
const Layout = () => import('@/views/Layout.vue')

/** 主畫面 */
const Home = () => import('@/views/Home.vue')


const routerRoutes: Readonly<RouteRecordRaw[]> = [

    /** 根路徑路由 導轉至 主畫面(homePage) 由 路由守衛 決定後續 */
    { path: '/', redirect: { name: 'homePage', params: {} } },
    /** 非預期路由,導轉至 主畫面(homePage) 由 路由守衛 決定後續 */
    { path: '/:path*', redirect: { name: 'homePage', params: {} } },

    {/** 根路徑 */
        path: '/', component: Layout, meta: {},
        children: [
            /** Dashboard */
            { path: 'home', component: Home, name: 'homePage', meta: { title: "" } },
        ]
    }
]
// end-routes

export default routerRoutes;