import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'

// 预加载组件
const HomeView = () => import('@/views/HomeView.vue')
const AboutView = () => import('@/views/AboutView.vue')
const ServicesView = () => import('@/views/ServicesView.vue')
const ProjectShowcaseView = () => import('@/views/ProjectShowcaseView.vue')
const ContactView = () => import('@/views/ContactView.vue')

// 路由配置
const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
    meta: {
      title: '首页',
      keepAlive: true,
    },
  },
  {
    path: '/about',
    name: 'about',
    component: AboutView,
    meta: {
      title: '关于我',
    },
  },
  {
    path: '/services',
    name: 'services',
    component: ServicesView,
    meta: {
      title: '服务项目',
    },
  },
  {
    path: '/showcase',
    name: 'showcase',
    component: ProjectShowcaseView,
    meta: {
      title: '项目展示',
      hideNavbar: true, // 页面自带导航栏
    },
  },
  {
    path: '/contact',
    name: 'contact',
    component: ContactView,
    meta: {
      title: '联系',
    },
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  scrollBehavior(_to, _from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { top: 0 }
    }
  },
})

// 路由守卫：页面标题更新
router.beforeEach((to, _from, next) => {
  document.title = `${to.meta.title || 'SenWork'} | Golang 后端工程师`
  next()
})

export default router
