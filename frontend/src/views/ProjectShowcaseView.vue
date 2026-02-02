<script setup lang="ts">
import { ref, defineComponent, h, computed } from 'vue'
import { useRoute } from 'vue-router'
import { ElMenu, ElMenuItem, ElIcon, ElAnchor, ElAnchorLink, ElCard, ElButton, ElTag, ElCollapse, ElCollapseItem, ElDialog, ElInput, ElSelect, ElSelectV2, ElOption, ElSteps, ElStep } from 'element-plus'
import {
  Document, Folder, Code, Setting, Check, View, Download, ChatDotRound, Search, Reading, Collection, Connection, Grid, List, FolderOpened
} from '@element-plus/icons-vue'

// 自定义图标
const ProjectIcon = defineComponent({
  render: () => h('svg', { viewBox: '0 0 24 24', fill: 'currentColor' }, [
    h('path', { d: 'M20 6h-8l-2-2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zm0 12H4V8h16v10z' })
  ])
})

const StructureIcon = defineComponent({
  render: () => h('svg', { viewBox: '0 0 24 24', fill: 'currentColor' }, [
    h('path', { d: 'M4 4h4v4H4V4zm6 0h4v4h-4V4zm6 0h4v4h-4V4zM4 10h4v4H4v-4zm6 0h4v4h-4v-4zm6 0h4v4h-4v-4zM4 16h4v4H4v-4zm6 0h4v4h-4v-4zm6 0h4v4h-4v-4z' })
  ])
})

const CodeIcon = defineComponent({
  render: () => h('svg', { viewBox: '0 0 24 24', fill: 'currentColor' }, [
    h('path', { d: 'M9.4 16.6L4.8 12l4.6-4.6L8 6l-6 6 6 6 1.4-1.4zm5.2 0l4.6-4.6-4.6-4.6L16 6l6 6-6 6-1.4-1.4z' })
  ])
})

const DatabaseIcon = defineComponent({
  render: () => h('svg', { viewBox: '0 0 24 24', fill: 'currentColor' }, [
    h('path', { d: 'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z' })
  ])
})

const APIcon = defineComponent({
  render: () => h('svg', { viewBox: '0 0 24 24', fill: 'currentColor' }, [
    h('path', { d: 'M14.6 16.6l4.6-4.6-4.6-4.6L16 6l6 6-6 6-1.4-1.4zm-5.2 0L4.8 12l4.6-4.6L8 6l-6 6 6 6 1.4-1.4z' })
  ])
})

const DeployIcon = defineComponent({
  render: () => h('svg', { viewBox: '0 0 24 24', fill: 'currentColor' }, [
    h('path', { d: 'M19.35 10.04C18.67 6.59 15.64 4 12 4 9.11 4 6.6 5.64 5.35 8.04 2.34 8.36 0 10.91 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96zM19 18H6c-2.21 0-4-1.79-4-4s1.79-4 4-4h.71C7.37 7.69 9.48 6 12 6c3.04 0 5.5 2.46 5.5 5.5v.5H19c1.66 0 3 1.34 3 3s-1.34 3-3 3z' })
  ])
})

const route = useRoute()
const activeSection = ref('intro')
const isMobileMenuOpen = ref(false)

// 侧边栏菜单
const sidebarMenus = [
  { id: 'intro', title: '服务介绍', icon: Document },
  { id: 'projects', title: '项目展示', icon: Folder },
  { id: 'structure', title: '代码结构', icon: StructureIcon },
  { id: 'documents', title: '文档规范', icon: Reading },
  { id: 'pricing', title: '价格说明', icon: Setting },
]

// 项目展示数据
const projects = [
  {
    id: 'campus-social',
    title: '校园社交 App 后端',
    category: '毕设项目',
    tags: ['Go', 'Gin', 'MySQL', 'Redis'],
    description: '完整的校园社交系统后端，包含用户、动态、评论、消息等核心功能',
    features: ['用户认证', '动态发布', '评论点赞', '消息推送', '好友关系'],
    difficulty: '中等',
    duration: '4周',
    score: '优秀',
    fullDescription: `本项目是一个完整的校园社交平台后端服务，采用 Go 语言开发，基于 Gin 框架。

系统采用分层架构设计，包括 Controller、Service、Repository 三层，代码结构清晰，易于维护和扩展。数据库采用 MySQL + Redis 的组合，MySQL 负责持久化存储，Redis 负责缓存和 Session 管理。

主要功能模块包括用户模块（注册、登录、个人信息）、动态模块（发布、浏览、删除）、互动模块（评论、点赞、收藏）、消息模块（站内信、系统通知）、好友模块（关注、取关、好友列表）。`,
    techDetails: {
      backend: ['Go 1.21', 'Gin 1.9', 'GORM 2.0', 'JWT', 'WebSocket'],
      database: ['MySQL 8.0', 'Redis 7.0'],
      deployment: ['Docker', 'Nginx', '阿里云 ECS'],
      testing: ['Go testing', 'Postman']
    },
    database: {
      tables: [
        { name: 'users', desc: '用户信息表', fields: ['id', 'username', 'email', 'password_hash', 'avatar', 'bio', 'created_at'] },
        { name: 'posts', desc: '动态表', fields: ['id', 'user_id', 'content', 'images', 'likes_count', 'comments_count', 'created_at'] },
        { name: 'comments', desc: '评论表', fields: ['id', 'post_id', 'user_id', 'content', 'parent_id', 'created_at'] },
        { name: 'likes', desc: '点赞表', fields: ['id', 'user_id', 'post_id', 'type', 'created_at'] },
        { name: 'follows', desc: '关注表', fields: ['id', 'follower_id', 'following_id', 'created_at'] },
        { name: 'messages', desc: '消息表', fields: ['id', 'from_user_id', 'to_user_id', 'content', 'read', 'created_at'] }
      ],
      erDiagram: `users ||--o{ posts : "发布"
users ||--o{ comments : "评论"
users ||--o{ likes : "点赞"
users ||--o{ follows : "关注"
posts ||--o{ comments : "包含"
posts ||--o{ likes : "拥有"`
    },
    apiEndpoints: [
      { method: 'POST', path: '/api/users/register', desc: '用户注册' },
      { method: 'POST', path: '/api/users/login', desc: '用户登录' },
      { method: 'GET', path: '/api/users/:id', desc: '获取用户信息' },
      { method: 'POST', path: '/api/posts', desc: '发布动态' },
      { method: 'GET', path: '/api/posts', desc: '获取动态列表' },
      { method: 'POST', path: '/api/posts/:id/comments', desc: '评论动态' },
      { method: 'POST', path: '/api/posts/:id/like', desc: '点赞动态' }
    ]
  },
  {
    id: 'ecommerce',
    title: '电商系统',
    category: '商业项目',
    tags: ['Vue3', 'Go', 'MySQL', 'RabbitMQ'],
    description: '完整的电商平台，包含商品、订单、支付、购物车等核心功能',
    features: ['商品管理', '订单流程', '支付对接', '库存管理', '物流追踪'],
    difficulty: '较难',
    duration: '8周',
    score: '已上线',
    fullDescription: `本项目是一个完整的电商平台系统，采用前后端分离架构。

后端使用 Go 语言开发，基于 Gin 框架，采用 CQRS 架构模式，将读写操作分离。前端使用 Vue3 + Element Plus 开发，响应式设计，适配各种设备。

系统支持多种支付方式（支付宝、微信）、完整的订单流程（下单、支付、发货、收货、评价）、库存实时更新、优惠券使用、促销活动等功能。`,
    techDetails: {
      backend: ['Go 1.21', 'Gin 1.9', 'gRPC', 'RabbitMQ'],
      database: ['MySQL 8.0', 'Redis 7.0', 'Elasticsearch'],
      deployment: ['Docker', 'K8s', '阿里云'],
      testing: ['Go testing', 'Vue Test Utils']
    },
    database: {
      tables: [
        { name: 'products', desc: '商品表', fields: ['id', 'name', 'category_id', 'price', 'stock', 'status'] },
        { name: 'orders', desc: '订单表', fields: ['id', 'user_id', 'order_no', 'status', 'total_amount'] },
        { name: 'order_items', desc: '订单商品表', fields: ['id', 'order_id', 'product_id', 'quantity', 'price'] },
        { name: 'carts', desc: '购物车表', fields: ['id', 'user_id', 'product_id', 'quantity'] },
        { name: 'payments', desc: '支付表', fields: ['id', 'order_id', 'amount', 'status', 'pay_type'] }
      ],
      erDiagram: `products ||--o{ order_items : "包含"
orders ||--o{ order_items : "包含"
users ||--o{ orders : "下单"
users ||--o{ carts : "购物"`
    },
    apiEndpoints: [
      { method: 'GET', path: '/api/products', desc: '商品列表' },
      { method: 'GET', path: '/api/products/:id', desc: '商品详情' },
      { method: 'POST', path: '/api/carts', desc: '加入购物车' },
      { method: 'POST', path: '/api/orders', desc: '创建订单' },
      { method: 'POST', path: '/api/payments/alipay', desc: '支付宝支付' }
    ]
  },
  {
    id: 'graduation-docs',
    title: '毕业设计文档模板',
    category: '文档服务',
    tags: ['Word', 'Visio', 'ProcessOn'],
    description: '专业的毕业设计文档撰写服务，包含全套软件工程文档',
    features: ['需求分析', '系统设计', '数据库设计', '接口文档', '答辩PPT'],
    difficulty: '基础',
    duration: '1-2周/份',
    score: '通过率100%',
    fullDescription: `专业的毕业设计文档撰写服务，帮助计算机专业毕业生完成高质量的毕业论文和答辩材料。

服务包括但不限于：可行性分析报告、需求规格说明书、系统设计文档（概要设计+详细设计）、数据库设计文档、接口设计文档、测试报告、部署文档、用户手册等。

文档严格遵循 GB/T 8567-2006《计算机软件文档编制规范》，格式规范、内容详实、图表丰富。`,
    techDetails: {
      frontend: ['不需要'],
      backend: ['不需要'],
      database: ['不需要'],
      tools: ['Word', 'Visio', 'ProcessOn', 'PowerPoint']
    },
    database: {
      tables: [],
      erDiagram: ''
    },
    apiEndpoints: []
  }
]

// 当前选中的项目
const selectedProject = ref(projects[0])
const showProjectDetail = ref(false)

function selectProject(project: typeof projects[0]) {
  selectedProject.value = project
  showProjectDetail.value = true
}

// 价格方案
const pricingPlans = [
  {
    title: '基础版',
    price: '¥5,000',
    desc: '适合毕业设计',
    features: ['完整项目代码', '数据库脚本', '部署文档', '使用说明'],
    suitable: ['毕业设计', '课程设计', '学习参考']
  },
  {
    title: '标准版',
    price: '¥15,000',
    desc: '适合比赛项目',
    features: ['基础版全部', '单元测试', 'API 文档', '技术方案文档', '部署视频'],
    suitable: ['创新创业比赛', '项目演示', '简历加分']
  },
  {
    title: '商业版',
    price: '面议',
    desc: '适合生产环境',
    features: ['标准版全部', '高并发优化', 'CI/CD 配置', '运维文档', '技术支持'],
    suitable: ['创业项目', '企业内部系统', '长期维护']
  }
]

// 毕业文档价格
const documentPrices = [
  { title: '需求分析文档', price: '¥500-800', desc: '2000-5000字，含用例图' },
  { title: '系统设计文档', price: '¥800-1500', desc: '5000-10000字，含架构图' },
  { title: '数据库设计文档', price: '¥500-1000', desc: '含ER图、表结构、索引设计' },
  { title: '接口设计文档', price: '¥300-800', desc: '含 OpenAPI 规范' },
  { title: '完整毕设文档', price: '¥2500-4000', desc: '6-8份文档全套' },
  { title: '答辩PPT', price: '¥300-500', desc: '20-30页，含演讲稿' }
]

// 侧边栏状态
const viewMode = ref<'grid' | 'list'>('grid')
const searchQuery = ref('')
const selectedStructure = ref('frontend')

// 代码结构分类数据
const structureCategories = [
  { 
    name: 'frontend', 
    icon: '📁',
    path: 'frontend/src',
    desc: '前端项目源代码',
    children: [
      { name: 'api/', desc: 'API 接口封装，统一管理请求' },
      { name: 'components/', desc: '公共组件，可复用的 UI 组件' },
      { name: 'composables/', desc: '组合式函数，抽取通用逻辑' },
      { name: 'views/', desc: '页面组件，每个页面一个文件夹' },
      { name: 'router/', desc: '路由配置，定义页面路由' },
      { name: 'stores/', desc: '状态管理，Pinia store' },
      { name: 'utils/', desc: '工具函数，日期格式化等' },
      { name: 'assets/', desc: '静态资源，图片、字体等' }
    ]
  },
  { 
    name: 'backend', 
    icon: '📁',
    path: 'backend',
    desc: '后端项目源代码',
    children: [
      { name: 'cmd/', desc: '程序入口，main.go' },
      { name: 'internal/config/', desc: '配置管理，读取配置文件' },
      { name: 'internal/handler/', desc: '处理器层，处理 HTTP 请求' },
      { name: 'internal/service/', desc: '业务逻辑层，核心业务' },
      { name: 'internal/repository/', desc: '数据访问层，操作数据库' },
      { name: 'internal/model/', desc: '数据模型，定义结构体' },
      { name: 'internal/middleware/', desc: '中间件，JWT 鉴权等' },
      { name: 'pkg/', desc: '公共包，日志、响应封装' }
    ]
  },
  { 
    name: 'config', 
    icon: '⚙️',
    path: 'config',
    desc: '配置文件',
    children: [
      { name: 'vite.config.ts', desc: 'Vite 构建配置' },
      { name: 'tsconfig.json', desc: 'TypeScript 编译配置' },
      { name: 'go.mod', desc: 'Go 依赖管理' },
      { name: '.env', desc: '环境变量配置' }
    ]
  },
  { 
    name: 'scripts', 
    icon: '🔧',
    path: 'scripts',
    desc: '构建和部署脚本',
    children: [
      { name: 'build.sh', desc: '前端构建脚本' },
      { name: 'deploy.sh', desc: '部署脚本' },
      { name: 'start.sh', desc: '启动脚本' }
    ]
  }
]

const selectedStructureDetail = computed(() => {
  return structureCategories.find(c => c.name === selectedStructure.value)
})

function scrollToSection(id: string) {
  activeSection.value = id
  const el = document.getElementById(id)
  if (el) {
    el.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }
}

const filteredProjects = computed(() => {
  if (!searchQuery.value) return projects
  const query = searchQuery.value.toLowerCase()
  return projects.filter(p => 
    p.title.toLowerCase().includes(query) || 
    p.description.toLowerCase().includes(query) ||
    p.tags.some(t => t.toLowerCase().includes(query))
  )
})
</script>

<template>
  <div class="showcase-page">
    <!-- 顶部导航 -->
    <header class="showcase-header">
      <div class="header-content">
        <RouterLink to="/" class="logo">
          <span class="logo-text">Sen</span>
          <span class="logo-accent">Work</span>
        </RouterLink>
        <nav class="header-nav">
          <RouterLink to="/">首页</RouterLink>
          <RouterLink to="/services">服务</RouterLink>
          <RouterLink to="/showcase" class="active">项目展示</RouterLink>
          <RouterLink to="/about">关于</RouterLink>
          <RouterLink to="/contact">联系</RouterLink>
        </nav>
      </div>
    </header>

    <div class="showcase-container">
      <!-- 侧边栏 -->
      <aside :class="['sidebar', { collapsed: sidebarCollapsed }]">
        <div class="sidebar-header">
          <el-icon v-if="!sidebarCollapsed"><Document /></el-icon>
          <span v-if="!sidebarCollapsed">目录</span>
          <el-button text @click="sidebarCollapsed = !sidebarCollapsed">
            <el-icon>{{ sidebarCollapsed ? 'Expand' : 'Fold' }}</el-icon>
          </el-button>
        </div>
        <el-menu
          :default-active="activeSection"
          class="sidebar-menu"
          :collapse="sidebarCollapsed"
        >
          <el-menu-item 
            v-for="menu in sidebarMenus" 
            :key="menu.id"
            :index="menu.id"
            @click="scrollToSection(menu.id)"
          >
            <el-icon><component :is="menu.icon" /></el-icon>
            <span>{{ menu.title }}</span>
          </el-menu-item>
        </el-menu>
      </aside>

      <!-- 主内容区 -->
      <main class="main-content">
        <!-- 服务介绍 -->
        <section id="intro" class="content-section">
          <div class="section-header">
            <h1>项目展示 & 毕业设计</h1>
            <p class="subtitle">展示已完成的优质项目，提供毕业设计和项目开发服务</p>
          </div>

          <div class="intro-cards">
            <div class="intro-card">
              <div class="card-icon">
                <el-icon :size="32"><CodeIcon /></el-icon>
              </div>
              <h3>完整项目代码</h3>
              <p>从零开发的完整项目，代码规范、注释详细、可直接运行</p>
              <el-tag type="primary">毕设/比赛/商业</el-tag>
            </div>
            <div class="intro-card">
              <div class="card-icon">
                <el-icon :size="32"><Document /></el-icon>
              </div>
              <h3>专业文档撰写</h3>
              <p>毕业设计文档、接口文档、部署文档等各类技术文档</p>
              <el-tag type="success">通过率 100%</el-tag>
            </div>
            <div class="intro-card">
              <div class="card-icon">
                <el-icon :size="32"><Setting /></el-icon>
              </div>
              <h3>全程技术支持</h3>
              <p>需求沟通、开发指导、答辩培训、后期维护</p>
              <el-tag type="warning">7×24h 响应</el-tag>
            </div>
          </div>
        </section>

        <!-- 项目展示 -->
        <section id="projects" class="content-section">
          <div class="section-header">
            <h2>精选项目展示</h2>
            <p class="subtitle">已完成的优质项目，可作为毕设参考或直接使用</p>
          </div>

          <!-- 搜索和筛选 -->
          <div class="filter-bar">
            <el-input
              v-model="searchQuery"
              placeholder="搜索项目..."
              prefix-icon="Search"
              class="search-input"
            />
            <div class="view-toggle">
              <el-button :type="viewMode === 'grid' ? 'primary' : 'default'" @click="viewMode = 'grid'" text>
                <el-icon><Grid /></el-icon>
              </el-button>
              <el-button :type="viewMode === 'list' ? 'primary' : 'default'" @click="viewMode = 'list'" text>
                <el-icon><List /></el-icon>
              </el-button>
            </div>
          </div>

          <!-- 项目卡片 -->
          <div :class="['projects-grid', { 'list-view': viewMode === 'list' }]">
            <div 
              v-for="project in filteredProjects" 
              :key="project.id"
              class="project-card"
              @click="selectProject(project)"
            >
              <div class="project-header">
                <el-tag size="small" type="info">{{ project.category }}</el-tag>
                <el-tag size="small" :type="project.difficulty === '较难' ? 'danger' : 'success'">
                  {{ project.difficulty }}
                </el-tag>
              </div>
              <h3 class="project-title">{{ project.title }}</h3>
              <p class="project-desc">{{ project.description }}</p>
              <div class="project-tags">
                <el-tag v-for="tag in project.tags" :key="tag" size="small" effect="plain">
                  {{ tag }}
                </el-tag>
              </div>
              <div class="project-footer">
                <span class="meta">
                  <el-icon><Clock /></el-icon>
                  {{ project.duration }}
                </span>
                <span class="meta">
                  <el-icon><Trophy /></el-icon>
                  {{ project.score }}
                </span>
              </div>
            </div>
          </div>
        </section>

        <!-- 代码结构 -->
        <section id="structure" class="content-section">
          <div class="section-header">
            <h2>代码结构规范</h2>
            <p class="subtitle">清晰的项目结构，便于维护和扩展</p>
          </div>

          <div class="code-structure-editor">
            <!-- 左侧文件树 -->
            <div class="file-tree">
              <div class="tree-header">
                <el-icon><FolderOpened /></el-icon>
                <span>project</span>
              </div>
              <div class="tree-content">
                <div 
                  v-for="category in structureCategories" 
                  :key="category.name"
                  class="tree-item"
                  :class="{ active: selectedStructure === category.name }"
                  @click="selectedStructure = category.name"
                >
                  <span class="tree-icon">{{ category.icon }}</span>
                  <span class="tree-name">{{ category.name }}</span>
                </div>
              </div>
            </div>

            <!-- 右侧详情 -->
            <div class="file-detail">
              <div class="detail-header">
                <el-icon><Document /></el-icon>
                <span>{{ selectedStructureDetail?.name }}</span>
              </div>
              <div class="detail-path">/{{ selectedStructureDetail?.path }}</div>
              <div class="detail-desc">{{ selectedStructureDetail?.desc }}</div>
              <div class="detail-files" v-if="selectedStructureDetail?.children">
                <div class="files-list">
                  <div v-for="item in selectedStructureDetail.children" :key="item.name" class="file-item">
                    <code class="file-name">{{ item.name }}</code>
                    <span class="file-desc">{{ item.desc }}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <!-- 文档规范 -->
        <section id="documents" class="content-section">
          <div class="section-header">
            <h2>文档规范说明</h2>
            <p class="subtitle">遵循软件工程规范，专业的文档撰写</p>
          </div>

          <div class="docs-grid">
            <div class="doc-card">
              <div class="doc-icon">
                <el-icon :size="28"><Document /></el-icon>
              </div>
              <h4>需求分析文档</h4>
              <ul>
                <li>功能需求规格说明</li>
                <li>用例图和用例描述</li>
                <li>非功能需求说明</li>
                <li>需求追溯矩阵</li>
              </ul>
            </div>
            <div class="doc-card">
              <div class="doc-icon">
                <el-icon :size="28"><Connection /></el-icon>
              </div>
              <h4>系统设计文档</h4>
              <ul>
                <li>系统架构设计</li>
                <li>模块划分和职责</li>
                <li>技术选型说明</li>
                <li>关键算法设计</li>
              </ul>
            </div>
            <div class="doc-card">
              <div class="doc-icon">
                <el-icon :size="28"><DatabaseIcon /></el-icon>
              </div>
              <h4>数据库设计文档</h4>
              <ul>
                <li>ER 图设计</li>
                <li>数据表结构说明</li>
                <li>索引设计策略</li>
                <li>数据库范式检查</li>
              </ul>
            </div>
            <div class="doc-card">
              <div class="doc-icon">
                <el-icon :size="28"><APIcon /></el-icon>
              </div>
              <h4>接口设计文档</h4>
              <ul>
                <li>OpenAPI 3.0 规范</li>
                <li>接口参数说明</li>
                <li>请求/响应示例</li>
                <li>错误码说明</li>
              </ul>
            </div>
          </div>
        </section>

        <!-- 价格说明 -->
        <section id="pricing" class="content-section">
          <div class="section-header">
            <h2>价格说明</h2>
            <p class="subtitle">透明定价，按需选择</p>
          </div>

          <!-- 项目开发价格 -->
          <h3 class="subsection-title">项目开发</h3>
          <div class="pricing-cards">
            <div v-for="plan in pricingPlans" :key="plan.title" class="pricing-card">
              <div class="plan-header">
                <h4>{{ plan.title }}</h4>
                <span class="price">{{ plan.price }}</span>
              </div>
              <p class="plan-desc">{{ plan.desc }}</p>
              <ul class="plan-features">
                <li v-for="feature in plan.features" :key="feature">
                  <el-icon><Check /></el-icon>
                  {{ feature }}
                </li>
              </ul>
              <el-tag v-for="tag in plan.suitable" :key="tag" size="small" class="plan-tag">
                {{ tag }}
              </el-tag>
            </div>
          </div>

          <!-- 文档价格 -->
          <h3 class="subsection-title">文档服务</h3>
          <el-table :data="documentPrices" stripe style="width: 100%">
            <el-table-column prop="title" label="文档类型" />
            <el-table-column prop="price" label="价格" width="150">
              <template #default="{ row }">
                <span class="price-tag">{{ row.price }}</span>
              </template>
            </el-table-column>
            <el-table-column prop="desc" label="说明" />
          </el-table>

          <el-alert
            title="温馨提示"
            type="info"
            :closable="false"
            class="pricing-note"
          >
            <template #default>
              价格仅供参考，具体费用根据项目复杂度、需求细节、工期要求等因素综合评估。
              支持分期付款，支持加急服务（加收 30-50%）。
            </template>
          </el-alert>
        </section>
      </main>
    </div>

    <!-- 项目详情弹窗 -->
    <el-dialog
      v-model="showProjectDetail"
      :title="selectedProject.title"
      width="900px"
      destroy-on-close
      class="project-detail-dialog"
    >
      <div v-if="selectedProject" class="project-detail">
        <div class="detail-header">
          <el-tag>{{ selectedProject.category }}</el-tag>
          <div class="detail-tags">
            <el-tag v-for="tag in selectedProject.tags" :key="tag" type="info" effect="plain">
              {{ tag }}
            </el-tag>
          </div>
        </div>

        <p class="detail-desc">{{ selectedProject.fullDescription }}</p>

        <el-tabs type="border-card">
          <el-tab-pane label="技术栈">
            <div class="tech-grid">
              <div v-for="(techs, category) in selectedProject.techDetails" :key="category" class="tech-category">
                <h4>{{ category }}</h4>
                <div class="tech-list">
                  <el-tag v-for="tech in techs" :key="tech" size="small">{{ tech }}</el-tag>
                </div>
              </div>
            </div>
          </el-tab-pane>

          <el-tab-pane label="数据库设计" v-if="selectedProject.database.tables.length > 0">
            <div class="database-section">
              <h4>数据表</h4>
              <el-table :data="selectedProject.database.tables" stripe size="small">
                <el-table-column prop="name" label="表名" />
                <el-table-column prop="desc" label="说明" />
                <el-table-column prop="fields" label="字段">
                  <template #default="{ row }">
                    <el-tag v-for="field in row.fields" :key="field" size="small" type="info">
                      {{ field }}
                    </el-tag>
                  </template>
                </el-table-column>
              </el-table>
            </div>
          </el-tab-pane>

          <el-tab-pane label="API 接口" v-if="selectedProject.apiEndpoints.length > 0">
            <div class="api-section">
              <div v-for="api in selectedProject.apiEndpoints" :key="api.path" class="api-item">
                <el-tag :type="api.method === 'GET' ? 'success' : 'primary'" size="small">
                  {{ api.method }}
                </el-tag>
                <code>{{ api.path }}</code>
                <span>{{ api.desc }}</span>
              </div>
            </div>
          </el-tab-pane>
        </el-tabs>
      </div>

      <template #footer>
        <el-button @click="showProjectDetail = false">关闭</el-button>
        <RouterLink to="/contact" class="contact-btn" @click="showProjectDetail = false">
          <el-icon><ChatDotRound /></el-icon>
          咨询定制
        </RouterLink>
      </template>
    </el-dialog>

    <!-- 底部CTA -->
    <section class="cta-section">
      <div class="cta-content">
        <h2>需要定制项目或文档？</h2>
        <p>告诉我你的需求，为你提供专业的解决方案</p>
        <RouterLink to="/contact" class="cta-btn">
          <el-icon><ChatDotRound /></el-icon>
          立即咨询
        </RouterLink>
      </div>
    </section>
  </div>
</template>

<style scoped>
.showcase-page {
  min-height: 100vh;
  background: #f8fafc;
}

/* Header */
.showcase-header {
  background: white;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.05);
  position: sticky;
  top: 0;
  z-index: 100;
}

.header-content {
  max-width: 1400px;
  margin: 0 auto;
  padding: 1rem 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.logo {
  font-size: 1.5rem;
  font-weight: 700;
  text-decoration: none;
}

.logo-text {
  color: #1a1a2e;
}

.logo-accent {
  color: var(--color-primary, #409EFF);
}

.header-nav {
  display: flex;
  gap: 2rem;
}

.header-nav a {
  color: #64748b;
  text-decoration: none;
  font-weight: 500;
  transition: color 0.3s;
}

.header-nav a:hover,
.header-nav a.active {
  color: var(--color-primary, #409EFF);
}

/* Layout */
.showcase-container {
  display: flex;
  max-width: 1400px;
  margin: 0 auto;
}

/* Sidebar */
.sidebar {
  width: 240px;
  background: white;
  border-right: 1px solid #e5e7eb;
  padding: 1.5rem 0;
  position: sticky;
  top: 65px;
  height: calc(100vh - 65px);
  overflow-y: auto;
  transition: width 0.3s;
}

.sidebar.collapsed {
  width: 64px;
}

.sidebar-header {
  padding: 0 1rem 1rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-weight: 600;
  color: #1a1a2e;
}

.sidebar-menu {
  border-right: none;
}

.sidebar-menu:not(.el-menu--collapse) {
  width: 100%;
}

/* Main Content */
.main-content {
  flex: 1;
  padding: 2rem 3rem;
  max-width: calc(100% - 240px);
}

.content-section {
  margin-bottom: 4rem;
}

.section-header {
  margin-bottom: 2rem;
}

.section-header h1 {
  font-size: 2.5rem;
  font-weight: 700;
  color: #1a1a2e;
  margin-bottom: 0.5rem;
}

.section-header h2 {
  font-size: 1.75rem;
  font-weight: 600;
  color: #1a1a2e;
  margin-bottom: 0.5rem;
}

.subsection-title {
  font-size: 1.25rem;
  font-weight: 600;
  color: #1a1a2e;
  margin: 2rem 0 1rem;
}

.subtitle {
  color: #64748b;
  font-size: 1.1rem;
}

/* Intro Cards */
.intro-cards {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.5rem;
}

.intro-card {
  background: white;
  border-radius: 16px;
  padding: 2rem;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
  transition: all 0.3s;
}

.intro-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.1);
}

.card-icon {
  width: 56px;
  height: 56px;
  border-radius: 14px;
  background: linear-gradient(135deg, rgba(64, 158, 255, 0.1) 0%, rgba(64, 158, 255, 0.05) 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--color-primary, #409EFF);
  margin-bottom: 1rem;
}

.intro-card h3 {
  font-size: 1.25rem;
  font-weight: 600;
  color: #1a1a2e;
  margin-bottom: 0.5rem;
}

.intro-card p {
  color: #64748b;
  font-size: 0.95rem;
  line-height: 1.6;
  margin-bottom: 1rem;
}

/* Filter Bar */
.filter-bar {
  display: flex;
  gap: 1rem;
  margin-bottom: 1.5rem;
}

.search-input {
  width: 300px;
}

.view-toggle {
  display: flex;
  gap: 0.5rem;
}

/* Projects Grid */
.projects-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 1.5rem;
}

.projects-grid.list-view {
  grid-template-columns: 1fr;
}

.project-card {
  background: white;
  border-radius: 16px;
  padding: 1.5rem;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
  cursor: pointer;
  transition: all 0.3s;
}

.project-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.1);
}

.project-header {
  display: flex;
  gap: 0.5rem;
  margin-bottom: 1rem;
}

.project-title {
  font-size: 1.25rem;
  font-weight: 600;
  color: #1a1a2e;
  margin-bottom: 0.5rem;
}

.project-desc {
  color: #64748b;
  font-size: 0.9rem;
  line-height: 1.5;
  margin-bottom: 1rem;
}

.project-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 1rem;
}

.project-footer {
  display: flex;
  gap: 1.5rem;
}

.meta {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #94a3b8;
  font-size: 0.85rem;
}

/* Structure Section */
.code-structure-editor {
  display: flex;
  background: #1e1e2e;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.15);
}

.file-tree {
  width: 240px;
  background: #181825;
  border-right: 1px solid #313244;
}

.tree-header {
  padding: 12px 16px;
  background: #11111b;
  color: #cdd6f4;
  font-size: 0.85rem;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 8px;
  border-bottom: 1px solid #313244;
}

.tree-content {
  padding: 8px;
}

.tree-item {
  padding: 8px 12px;
  border-radius: 6px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 8px;
  color: #a6adc8;
  font-size: 0.9rem;
  transition: all 0.2s;
}

.tree-item:hover {
  background: rgba(137, 180, 250, 0.1);
  color: #cdd6f4;
}

.tree-item.active {
  background: rgba(137, 180, 250, 0.15);
  color: #89b4fa;
}

.tree-icon {
  font-size: 1rem;
}

.tree-name {
  flex: 1;
}

.file-detail {
  flex: 1;
  padding: 20px;
  color: #cdd6f4;
}

.detail-header {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 1rem;
  font-weight: 600;
  margin-bottom: 4px;
  color: #f5e0dc;
}

.detail-path {
  font-family: 'Fira Code', monospace;
  font-size: 0.85rem;
  color: #6c7086;
  margin-bottom: 16px;
}

.detail-desc {
  color: #a6adc8;
  font-size: 0.95rem;
  line-height: 1.6;
  margin-bottom: 20px;
  padding-bottom: 16px;
  border-bottom: 1px solid #313244;
}

.detail-files {
  background: #11111b;
  border-radius: 8px;
  padding: 12px;
}

.files-list {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.file-item {
  display: flex;
  align-items: flex-start;
  gap: 12px;
  padding: 8px 12px;
  border-radius: 6px;
  transition: background 0.2s;
}

.file-item:hover {
  background: rgba(137, 180, 250, 0.08);
}

.file-name {
  font-family: 'Fira Code', monospace;
  font-size: 0.85rem;
  color: #89b4fa;
  background: rgba(137, 180, 250, 0.1);
  padding: 2px 8px;
  border-radius: 4px;
  white-space: nowrap;
}

.file-desc {
  color: #a6adc8;
  font-size: 0.85rem;
  line-height: 1.5;
}

/* Docs Grid */
.docs-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1.5rem;
}

.doc-card {
  background: white;
  border-radius: 12px;
  padding: 1.5rem;
  border: 1px solid #e5e7eb;
}

.doc-icon {
  width: 48px;
  height: 48px;
  border-radius: 12px;
  background: linear-gradient(135deg, rgba(64, 158, 255, 0.1) 0%, rgba(64, 158, 255, 0.05) 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--color-primary, #409EFF);
  margin-bottom: 1rem;
}

.doc-card h4 {
  font-size: 1rem;
  font-weight: 600;
  color: #1a1a2e;
  margin-bottom: 0.75rem;
}

.doc-card ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.doc-card li {
  color: #64748b;
  font-size: 0.875rem;
  padding: 0.25rem 0;
  position: relative;
  padding-left: 1rem;
}

.doc-card li::before {
  content: '•';
  position: absolute;
  left: 0;
  color: var(--color-primary, #409EFF);
}

/* Pricing */
.pricing-cards {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.5rem;
  margin-bottom: 2rem;
}

.pricing-card {
  background: white;
  border-radius: 16px;
  padding: 1.5rem;
  border: 1px solid #e5e7eb;
  position: relative;
}

.pricing-card.featured {
  border-color: var(--color-primary, #409EFF);
  box-shadow: 0 8px 30px rgba(64, 158, 255, 0.15);
}

.plan-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.5rem;
}

.plan-header h4 {
  font-size: 1.125rem;
  font-weight: 600;
  color: #1a1a2e;
}

.price {
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--color-primary, #409EFF);
}

.plan-desc {
  color: #64748b;
  font-size: 0.9rem;
  margin-bottom: 1rem;
}

.plan-features {
  list-style: none;
  padding: 0;
  margin: 0 0 1rem;
}

.plan-features li {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #4b5563;
  font-size: 0.875rem;
  padding: 0.25rem 0;
}

.plan-features .el-icon {
  color: #67C23A;
}

.plan-tag {
  margin-right: 0.5rem;
  margin-bottom: 0.5rem;
}

.price-tag {
  color: var(--color-primary, #409EFF);
  font-weight: 600;
}

.pricing-note {
  margin-top: 1.5rem;
}

/* CTA Section */
.cta-section {
  background: linear-gradient(135deg, #1a1a2e 0%, #16162a 100%);
  padding: 4rem 2rem;
  text-align: center;
  margin-top: 2rem;
}

.cta-content h2 {
  font-size: 2rem;
  font-weight: 700;
  color: white;
  margin-bottom: 0.5rem;
}

.cta-content p {
  color: #94a3b8;
  font-size: 1.1rem;
  margin-bottom: 2rem;
}

.cta-btn {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 1rem 2.5rem;
  background: linear-gradient(135deg, var(--color-primary, #409EFF) 0%, #337ecc 100%);
  color: white;
  border-radius: 12px;
  font-weight: 600;
  text-decoration: none;
  transition: all 0.3s;
}

.cta-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(64, 158, 255, 0.4);
}

/* Project Detail Dialog */
.project-detail {
  padding: 0;
}

.detail-header {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1.5rem;
}

.detail-tags {
  display: flex;
  gap: 0.5rem;
}

.detail-desc {
  color: #4b5563;
  line-height: 1.8;
  margin-bottom: 1.5rem;
}

.tech-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1.5rem;
}

.tech-category h4 {
  font-size: 0.9rem;
  font-weight: 600;
  color: #1a1a2e;
  margin-bottom: 0.75rem;
  text-transform: capitalize;
}

.tech-list {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.api-section {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.api-item {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 0.75rem;
  background: #f8fafc;
  border-radius: 8px;
}

.api-item code {
  color: var(--color-primary, #409EFF);
  font-family: 'Fira Code', monospace;
  flex: 1;
}

.api-item span {
  color: #64748b;
  font-size: 0.9rem;
}

.contact-btn {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.5rem;
  background: linear-gradient(135deg, var(--color-primary, #409EFF) 0%, #337ecc 100%);
  color: white;
  border-radius: 8px;
  font-weight: 600;
  text-decoration: none;
  transition: all 0.3s;
}

.contact-btn:hover {
  transform: translateY(-2px);
}

@media (max-width: 1024px) {
  .sidebar {
    display: none;
  }

  .main-content {
    max-width: 100%;
    padding: 2rem;
  }

  .intro-cards {
    grid-template-columns: 1fr;
  }

  .docs-grid {
    grid-template-columns: repeat(2, 1fr);
  }

  .pricing-cards {
    grid-template-columns: 1fr;
  }

  .tech-grid {
    grid-template-columns: 1fr;
  }

  .code-structure-editor {
    flex-direction: column;
  }

  .file-tree {
    width: 100%;
    border-right: none;
    border-bottom: 1px solid #313244;
  }

  .tree-content {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    padding: 12px;
  }

  .tree-item {
    padding: 6px 12px;
    background: rgba(137, 180, 250, 0.08);
    border-radius: 6px;
  }
}

@media (max-width: 768px) {
  .header-content {
    flex-direction: column;
    gap: 1rem;
  }

  .header-nav {
    flex-wrap: wrap;
    justify-content: center;
    gap: 1rem;
  }

  .detail-list {
    grid-template-columns: 1fr;
  }

  .docs-grid {
    grid-template-columns: 1fr;
  }
}
</style>
