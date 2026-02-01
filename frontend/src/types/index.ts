export interface AboutInfo {
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

export interface Skill {
  name: string
  category: string
  proficiency: number
  icon: string
}

export interface Service {
  id: string
  name: string
  shortDesc: string
  fullDesc: string
  category: ServiceCategory
  features: string[]
  deliverables: string[]
  priceRange: string
  deliveryTime: string
  techStack: string[]
  featured: boolean
  popular: boolean
}

export type ServiceCategory = 'golang' | 'ai-agent' | 'cloud-native' | 'app' | 'web' | 'other'

export const SERVICE_CATEGORIES: Record<ServiceCategory, string> = {
  golang: 'Go 开发',
  'ai-agent': 'AI Agent 开发',
  'cloud-native': '云原生开发',
  app: 'App 开发',
  web: 'Web 开发',
  other: '其他服务',
}

export const SERVICE_CATEGORY_COLORS: Record<ServiceCategory, string> = {
  golang: '#00ADD8',      // Go 蓝色
  'ai-agent': '#FF6B6B',   // AI 红色
  'cloud-native': '#4ECDC4', // 云原生青色
  app: '#9B59B6',          // App 紫色
  web: '#4ADE80',          // Web 绿色
  other: '#64748B',        // 其他灰色
}

export interface Experience {
  id: string
  company: string
  position: string
  startDate: string
  endDate: string
  current: boolean
  description: string
  techStack: string[]
}

export interface ContactForm {
  name: string
  email: string
  subject: string
  message: string
}

export interface Project {
  id: string
  name: string
  description: string
  image: string
  demoUrl: string
  repoUrl: string
  techStack: string[]
  featured: boolean
  createdAt: string
}

export interface ApiResponse<T> {
  success: boolean
  data?: T
  message?: string
  error?: string
}

// ==================== 类型守卫函数 ====================

/**
 * 检查 ApiResponse 是否成功
 */
export function isApiSuccess<T>(response: ApiResponse<T>): response is ApiResponse<T> & { success: true; data: T } {
  return response.success === true && response.data !== undefined
}

/**
 * 检查 ApiResponse 是否失败
 */
export function isApiError<T>(response: ApiResponse<T>): response is ApiResponse<T> & { success: false; error: string } {
  return response.success === false && response.error !== undefined
}

/**
 * 检查值是否为有效的 AboutInfo
 */
export function isAboutInfo(value: unknown): value is AboutInfo {
  if (!value || typeof value !== 'object') return false
  const info = value as AboutInfo
  return (
    typeof info.name === 'string' &&
    typeof info.title === 'string' &&
    typeof info.email === 'string' &&
    typeof info.avatar === 'string'
  )
}

/**
 * 检查值是否为有效的 Skill
 */
export function isSkill(value: unknown): value is Skill {
  if (!value || typeof value !== 'object') return false
  const skill = value as Skill
  return (
    typeof skill.name === 'string' &&
    typeof skill.category === 'string' &&
    typeof skill.proficiency === 'number' &&
    skill.proficiency >= 0 &&
    skill.proficiency <= 100
  )
}

/**
 * 检查值是否为有效的 Service
 */
export function isService(value: unknown): value is Service {
  if (!value || typeof value !== 'object') return false
  const service = value as Service
  return (
    typeof service.id === 'string' &&
    typeof service.name === 'string' &&
    typeof service.shortDesc === 'string' &&
    typeof service.category === 'string' &&
    Array.isArray(service.features)
  )
}

/**
 * 检查值是否为有效的 Experience
 */
export function isExperience(value: unknown): value is Experience {
  if (!value || typeof value !== 'object') return false
  const exp = value as Experience
  return (
    typeof exp.id === 'string' &&
    typeof exp.company === 'string' &&
    typeof exp.position === 'string' &&
    typeof exp.startDate === 'string'
  )
}

/**
 * 检查值是否为有效的 ContactForm
 */
export function isContactForm(value: unknown): value is ContactForm {
  if (!value || typeof value !== 'object') return false
  const form = value as ContactForm
  return (
    typeof form.name === 'string' &&
    typeof form.email === 'string' &&
    typeof form.subject === 'string' &&
    typeof form.message === 'string'
  )
}

/**
 * 安全解析 API 响应
 */
export function parseApiResponse<T>(response: unknown, validator: (value: unknown) => value is T): T | null {
  if (!response || typeof response !== 'object') return null
  const apiResponse = response as ApiResponse<T>
  if (!isApiSuccess(apiResponse)) return null
  if (!validator(apiResponse.data)) return null
  return apiResponse.data
}

// ==================== 组件类型定义 ====================

/**
 * 特性卡片类型
 */
export interface FeatureCard {
  icon: string
  title: string
  description: string
}

/**
 * 按钮变体类型
 */
export type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost'
export type ButtonSize = 'sm' | 'md' | 'lg'

/**
 * 按钮属性类型
 */
export interface ButtonProps {
  variant?: ButtonVariant
  size?: ButtonSize
  disabled?: boolean
  loading?: boolean
  href?: string
}

/**
 * 加载状态类型
 */
export interface LoadingProps {
  size?: 'sm' | 'md' | 'lg'
  text?: string
}

/**
 * 模态框属性类型
 */
export interface ModalProps {
  open: boolean
  title?: string
  size?: 'sm' | 'md' | 'lg' | 'full'
  closable?: boolean
}

/**
 * 分页类型
 */
export interface Pagination {
  page: number
  pageSize: number
  total: number
}

/**
 * 筛选选项类型
 */
export interface FilterOption {
  value: string
  label: string
  count?: number
}

// ==================== 路由类型定义 ====================

/**
 * 路由元信息类型
 */
export interface RouteMeta {
  title: string
  icon?: string
  keepAlive?: boolean
}

/**
 * 路由配置扩展
 */
export interface AppRoute {
  path: string
  name: string
  component: () => Promise<typeof import('*.vue')>
  meta?: RouteMeta
  children?: AppRoute[]
}
