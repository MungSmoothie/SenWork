# SenWork 前端规范

## 概述

SenWork 前端采用 Vue 3 (Composition API) + TypeScript + Vite 技术栈，构建了一个现代化的个人作品集网站。设计风格采用渐变色彩、动画效果和响应式布局，适配各种设备尺寸。

## 技术栈

| 技术 | 版本/用途 |
|------|-----------|
| Vue 3 | 3.x，使用 Composition API |
| TypeScript | 4.x，类型安全 |
| Vue Router | 4.x，路由管理 |
| Vite | 5.x，构建工具 |
| @vueuse/core | 实用工具函数 |

## 项目结构

```
frontend/
├── src/
│   ├── api/
│   │   └── index.ts          # API 调用层
│   ├── components/
│   │   ├── NavBar.vue        # 导航栏组件
│   │   ├── HeroSection.vue   # 首页英雄区
│   │   └── FooterSection.vue # 页脚组件
│   ├── views/
│   │   ├── HomeView.vue      # 首页
│   │   ├── AboutView.vue     # 关于页面
│   │   ├── ProjectsView.vue  # 项目作品页
│   │   └── ContactView.vue   # 联系页面
│   ├── router/
│   │   └── index.ts          # 路由配置
│   ├── types/
│   │   └── index.ts          # TypeScript 类型定义
│   ├── App.vue               # 根组件
│   └── main.ts               # 入口文件
└── dist/                     # 构建产物
```

## 类型定义 (types/index.ts)

### ApiResponse<T>

所有 API 响应的统一包装类型：

```typescript
interface ApiResponse<T> {
  success: boolean
  data?: T
  message?: string
  error?: string
}
```

### 核心数据类型

**AboutInfo**:
```typescript
interface AboutInfo {
  name: string
  title: string
  bio: string
  location: string
  email: string
  avatar: string
  socialLinks: {
    github: string
    linkedin: string
    twitter: string
  }
}
```

**Skill**:
```typescript
interface Skill {
  name: string
  category: string
  proficiency: number  // 1-100
  icon: string
}
```

**Project**:
```typescript
interface Project {
  id: string
  name: string
  description: string
  techStack: string[]
  image: string
  demoUrl: string
  repoUrl: string
  featured: boolean
}
```

**Experience**:
```typescript
interface Experience {
  id: string
  company: string
  position: string
  startDate: string
  endDate: string
  current: boolean
  description: string
  techStack: string[]
}
```

**ContactForm**:
```typescript
interface ContactForm {
  name: string
  email: string
  subject: string
  message: string
}
```

## API 层 (api/index.ts)

采用单例模式封装所有 API 调用：

```typescript
const API_BASE = 'http://localhost:8080/api'

export const api = {
  async getAbout(): Promise<ApiResponse<AboutInfo>>
  async getSkills(): Promise<ApiResponse<Skill[]>>
  async getProjects(): Promise<ApiResponse<Project[]>>
  async getExperience(): Promise<ApiResponse<Experience[]>>
  async submitContact(form: ContactForm): Promise<ApiResponse<undefined>>
}
```

**错误处理**: 所有 API 调用使用 `try-catch` 包装，错误信息输出到控制台。

## 路由配置 (router/index.ts)

```typescript
const routes = [
  { path: '/', name: 'Home', component: HomeView },
  { path: '/about', name: 'About', component: AboutView },
  { path: '/projects', name: 'Projects', component: ProjectsView },
  { path: '/contact', name: 'Contact', component: ContactView },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    return { top: 0 }
  }
})
```

## 组件规范

### NavBar.vue

- **功能**: 响应式导航栏，滚动时切换暗色主题
- **响应式**: 移动端显示汉堡菜单
- **状态**: 监听滚动事件，动态更新样式

### HeroSection.vue

- **功能**: 首页英雄区域，展示个人品牌
- **动画**: 代码窗口动画效果
- **交互**: 技术栈标签展示

### AboutView.vue

**页面结构**:
1. 个人简介区（头像、姓名、简介、社交链接）
2. 技能展示区（分类进度条）
3. 工作经历区（时间线）

**响应式**:
- 桌面端: 两列布局（头像 + 信息）
- 移动端: 单列堆叠

**加载状态**: 使用 `loading` ref 控制加载动画

### ProjectsView.vue

- **布局**: 精选项目大卡片展示
- **功能**: 技术栈筛选（待实现）
- **交互**: 项目详情卡片悬停效果

### ContactView.vue

- **功能**: 联系表单提交
- **验证**: 必填字段和格式验证
- **反馈**: 提交成功/失败提示

## 样式规范

### 颜色方案

| 用途 | 颜色代码 | 说明 |
|------|----------|------|
| 主背景 | #f8fafc | 浅灰白 |
| 强调色 | #4ade80 | 绿色 |
| 文字主色 | #1a1a2e | 深蓝黑 |
| 文字次色 | #64748b | 灰色 |
| 卡片背景 | #ffffff | 纯白 |

### 响应式断点

| 断点 | 宽度 | 布局变化 |
|------|------|----------|
| sm | 640px | - |
| md | 768px | 两列布局 |
| lg | 1024px | 标准布局 |
| xl | 1280px | 宽屏布局 |

### 动画效果

- **过渡**: `all 0.3s ease`
- **悬停**: `transform: translateY(-2px)`
- **加载**: `spin 1s linear infinite`

## 性能优化

1. **代码分割**: Vue Router 实现路由级别懒加载
2. **图片优化**: 使用 Unsplash CDN 提供优化图片
3. **API 缓存**: 考虑添加接口数据缓存
4. **构建优化**: Vite 默认支持 tree-shaking

## 开发规范

### Git 提交规范

```
feat: 新功能
fix: 修复 bug
docs: 文档更新
style: 代码格式调整
refactor: 重构
```

### 组件开发

1. 使用 `<script setup lang="ts">` 语法
2. 组件文件使用 PascalCase 命名
3. Props 定义使用 TypeScript 类型
4. 样式使用 scoped 限制作用域

## 扩展建议

1. **国际化**: 添加 i18n 支持多语言
2. **主题切换**: 亮色/暗色主题切换
3. **SEO 优化**: 添加 meta 标签和 Open Graph
4. **PWA**: 添加渐进式 Web 应用支持
5. **数据分析**: 集成访问统计
