import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'

// 预加载组件
const HomeView = () => import('@/views/HomeView.vue')
const AboutView = () => import('@/views/AboutView.vue')
const ServicesView = () => import('@/views/ServicesView.vue')
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
      title: '服务',
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

// 预加载预测：用户Hover链接时预加载对应页面
const preloadOnHover = (e: MouseEvent) => {
  const target = e.target as HTMLAnchorElement
  if (target.tagName === 'A') {
    const href = target.getAttribute('href')
    if (href) {
      const route = router.getRoutes().find(r => r.path === href)
      if (route && route.components) {
        const component = route.components.default as () => Promise<typeof import('*.vue')>
        if ('preload' in component) {
          component.preload()
        }
      }
    }
  }
}

// 监听链接Hover进行预加载（可选优化）
// document.addEventListener('mouseover', preloadOnHover)

export default router
