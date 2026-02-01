import type { AboutInfo, Skill, Service, Experience, ContactForm, Project, ApiResponse } from '@/types'

const API_BASE = 'http://localhost:8080/api'

// ==================== 错误处理 ====================

export class ApiError extends Error {
  statusCode?: number
  code?: string
  
  constructor(
    message: string,
    statusCode?: number,
    code?: string
  ) {
    super(message)
    this.name = 'ApiError'
    this.statusCode = statusCode
    this.code = code
  }
}

const handleResponse = async <T>(response: Response): Promise<T> => {
  if (!response.ok) {
    const errorText = await response.text()
    throw new ApiError(
      errorText || '请求失败',
      response.status,
      `HTTP_${response.status}`
    )
  }
  return response.json()
}

// ==================== API 调用封装 ====================

async function fetchApi<T>(url: string, options?: RequestInit): Promise<T> {
  const response = await fetch(`${API_BASE}${url}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...options?.headers,
    },
  })
  return handleResponse<T>(response)
}

// ==================== Loading 状态管理 ====================

const loadingStates = new Map<string, boolean>()

export function getLoadingState(endpoint: string): boolean {
  return loadingStates.get(endpoint) || false
}

export function setLoadingState(endpoint: string, loading: boolean): void {
  loadingStates.set(endpoint, loading)
}

// ==================== API 方法 ====================

export const api = {
  async getAbout() {
    return fetchApi('/about')
  },
  async getSkills() {
    return fetchApi('/skills')
  },
  async getExperience() {
    return fetchApi('/experience')
  },
  async getProjects() {
    return fetchApi('/services')
  },

  // 获取技能列表
  async getSkills(): Promise<ApiResponse<Skill[]>> {
    const endpoint = '/skills'
    setLoadingState(endpoint, true)
    try {
      const result = await fetchApi<ApiResponse<Skill[]>>(endpoint)
      return result
    } finally {
      setLoadingState(endpoint, false)
    }
  },

  // 获取项目列表
  async getProjects(): Promise<ApiResponse<Project[]>> {
    const endpoint = '/projects'
    setLoadingState(endpoint, true)
    try {
      const result = await fetchApi<ApiResponse<Project[]>>(endpoint)
      return result
    } finally {
      setLoadingState(endpoint, false)
    }
  },

  // 获取服务列表
  async getServices(): Promise<ApiResponse<Service[]>> {
    const endpoint = '/services'
    setLoadingState(endpoint, true)
    try {
      const result = await fetchApi<ApiResponse<Service[]>>(endpoint)
      return result
    } finally {
      setLoadingState(endpoint, false)
    }
  },

  // 获取工作经历
  async getExperience(): Promise<ApiResponse<Experience[]>> {
    const endpoint = '/experience'
    setLoadingState(endpoint, true)
    try {
      const result = await fetchApi<ApiResponse<Experience[]>>(endpoint)
      return result
    } finally {
      setLoadingState(endpoint, false)
    }
  },

  // 提交联系表单
  async submitContact(form: ContactForm): Promise<ApiResponse<undefined>> {
    const endpoint = '/contact'
    setLoadingState(endpoint, true)
    try {
      const result = await fetchApi<ApiResponse<undefined>>(endpoint, {
        method: 'POST',
        body: JSON.stringify(form),
      })
      return result
    } finally {
      setLoadingState(endpoint, false)
    }
  },
}

// ==================== 批量请求 ====================

interface BatchResult<T> {
  success: T[]
  failed: Array<{ endpoint: string; error: Error }>
}

export async function batchFetch<T>(
  requests: Array<() => Promise<T>>
): Promise<BatchResult<T>> {
  const results = await Promise.allSettled(requests.map(req => req()))
  
  const success: T[] = []
  const failed: Array<{ endpoint: string; error: Error }> = []
  
  results.forEach((result, index) => {
    if (result.status === 'fulfilled') {
      success.push(result.value as T)
    } else {
      failed.push({
        endpoint: `request-${index}`,
        error: result.reason,
      })
    }
  })
  
  return { success, failed }
}

// ==================== 请求重试配置 ====================

interface RetryConfig {
  maxAttempts?: number
  delay?: number
  backoff?: number
}

const defaultRetryConfig: Required<RetryConfig> = {
  maxAttempts: 3,
  delay: 1000,
  backoff: 2,
}

export async function fetchWithRetry<T>(
  url: string,
  config: RetryConfig = {}
): Promise<T> {
  const mergedConfig = { ...defaultRetryConfig, ...config }
  const { maxAttempts, delay, backoff } = mergedConfig
  
  let attempts = 0
  let currentDelay = delay
  
  while (attempts < maxAttempts) {
    try {
      return await fetchApi<T>(url)
    } catch (error) {
      attempts++
      
      if (attempts >= maxAttempts) {
        throw error
      }
      
      // 指数退避
      await new Promise(resolve => setTimeout(resolve, currentDelay))
      currentDelay *= backoff
    }
  }
  
  throw new Error('Maximum retry attempts reached')
}
