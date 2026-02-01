# SenWork 前端技术设计

## 上下文

前端代码已完成基础功能，包含 4 个页面视图和 3 个公共组件。设计目标是建立统一的开发规范，提升代码质量和可维护性，同时不破坏现有功能的稳定性。

## 目标

1. **建立组件规范**: 统一组件开发模式和最佳实践
2. **完善类型系统**: 确保类型安全，减少运行时错误
3. **优化样式管理**: 建立主题系统和响应式策略
4. **统一 API 处理**: 规范数据获取和错误处理流程

## 技术决策

### 1. 组件架构决策

**组合式 API**: 使用 Vue 3 Composition API 和 `<script setup>` 语法

```typescript
<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'

//  Props 定义
interface Props {
  title: string
  size?: 'sm' | 'md' | 'lg'
}

const props = withDefaults(defineProps<Props>(), {
  size: 'md'
})

//  Emits 定义
const emit = defineEmits<{
  (e: 'click', value: string): void
}>()

//  组合式函数
const counter = useCounter()
</script>
```

**决策理由**: 
- 更好的类型推断
- 逻辑复用更灵活
- 代码更简洁

### 2. 类型管理决策

**集中式类型定义**: 所有类型定义集中在 `types/index.ts`

```typescript
// types/index.ts
export interface ApiResponse<T> {
  success: boolean
  data?: T
  message?: string
  error?: string
}

// 组件类型
export interface ComponentProps { ... }

// 枚举类型
export enum SkillCategory { ... }
```

**决策理由**:
- 类型查找方便
- 避免循环依赖
- IDE 提示更准确

### 3. 样式策略决策

**CSS 变量 + scoped CSS**: 使用 CSS 变量管理主题

```css
:root {
  --color-primary: #4ade80;
  --color-text: #1a1a2e;
  --color-bg: #f8fafc;
  --spacing-md: 1rem;
}

.component {
  background: var(--color-bg);
  padding: var(--spacing-md);
}
```

**决策理由**:
- 原生支持，无需构建工具
- 主题切换简单
- 保持 scoped CSS 的隔离性

### 4. API 处理决策

**统一 API 层**: 所有接口调用通过 `api` 对象封装

```typescript
// api/index.ts
async function fetchApi<T>(url: string): Promise<T> {
  const response = await fetch(`${API_BASE}${url}`)
  if (!response.ok) {
    throw new ApiError(response.status, '请求失败')
  }
  return response.json()
}

// 使用
const { data } = await api.getProjects()
```

**决策理由**:
- 统一错误处理
- 方便添加公共逻辑（如 loading 状态）
- 测试时容易 mock

## 组件设计

### 基础组件

| 组件名 | 功能 | 状态 |
|--------|------|------|
| Button | 按钮，支持变体和尺寸 | 待重构 |
| Card | 卡片容器 | 待重构 |
| Input | 输入框 | 待重构 |
| Loading | 加载动画 | 待新增 |
| Modal | 模态框 | 待新增 |

### 业务组件

| 组件名 | 功能 | 状态 |
|--------|------|------|
| NavBar | 导航栏 | 已完成 |
| HeroSection | 首页英雄区 | 已完成 |
| FooterSection | 页脚 | 已完成 |
| SkillCard | 技能卡片 | 待新增 |
| ProjectCard | 项目卡片 | 待重构 |
| Timeline | 时间线 | 待重构 |
| ContactForm | 联系表单 | 待重构 |

## 响应式设计

### 断点定义

| 断点 | 宽度 | 用途 |
|------|------|------|
| xs | < 640px | 窄屏手机 |
| sm | 640px - 767px | 手机横屏 |
| md | 768px - 1023px | 平板竖屏 |
| lg | 1024px - 1279px | 平板横屏/小笔记本 |
| xl | >= 1280px | 桌面显示器 |

### 布局策略

- **导航栏**: xs-sm 为汉堡菜单，md+ 为水平导航
- **卡片网格**: xs 为 1 列，sm 为 2 列，md 为 3 列，lg+ 为 4 列
- **时间线**: xs-sm 为垂直布局，md+ 为左侧时间线右侧内容

## 性能优化

### 加载优化

1. **路由懒加载**: Vue Router 自动代码分割
2. **组件异步加载**: 大组件使用 defineAsyncComponent
3. **图片懒加载**: 使用 `loading="lazy"` 属性

### 运行时优化

1. **v-memo**: 缓存不变的虚拟 DOM
2. **shallowRef**: 深层响应对象使用 shallowRef
3. **computed 缓存**: 避免重复计算

## 无障碍支持

### 基础要求

- 所有交互元素可键盘访问
- 图片提供 alt 描述
- 表单关联 label
- 颜色对比度符合 WCAG AA 标准

### ARIA 属性

```typescript
<button
  aria-label="关闭弹窗"
  aria-expanded="true"
  aria-controls="modal-content"
>
```

## 测试策略

### 单元测试

- 工具函数测试（Vitest）
- 组合式函数测试
- 组件 Props 验证

### E2E 测试

- 关键用户流程（Playwright）
- 响应式布局测试
- 表单提交测试

## 风险与权衡

### 性能风险

**风险**: 大量组件可能导致包体积过大
**缓解**: 使用路由懒加载和组件动态导入

### 兼容风险

**风险**: 旧浏览器不支持 CSS 变量
**缓解**: 当前项目目标浏览器为现代浏览器，无需兼容 IE

### 学习成本

**风险**: 新规范增加学习成本
**缓解**: 渐进式引入，文档完善
