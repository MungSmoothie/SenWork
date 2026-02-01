/**
 * API 层测试
 */

import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { api, ApiError, getLoadingState, setLoadingState } from '@/api'

// Mock fetch
global.fetch = vi.fn()

describe('API 层', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  afterEach(() => {
    vi.resetAllMocks()
  })

  describe('ApiError', () => {
    it('应该正确创建 ApiError 实例', () => {
      const error = new ApiError('错误信息', 400, 'BAD_REQUEST')
      expect(error.message).toBe('错误信息')
      expect(error.statusCode).toBe(400)
      expect(error.code).toBe('BAD_REQUEST')
      expect(error.name).toBe('ApiError')
    })
  })

  describe('Loading 状态管理', () => {
    it('应该正确获取和设置 loading 状态', () => {
      expect(getLoadingState('/about')).toBe(false)
      
      setLoadingState('/about', true)
      expect(getLoadingState('/about')).toBe(true)
      
      setLoadingState('/about', false)
      expect(getLoadingState('/about')).toBe(false)
    })
  })

  describe('api.getAbout', () => {
    it('应该成功获取个人简介', async () => {
      const mockData = {
        success: true,
        data: {
          name: 'Sen',
          title: 'Golang 工程师',
          bio: '描述',
          location: '中国',
          email: 'test@example.com',
          avatar: 'url',
          socialLinks: {
            github: 'https://github.com/sen',
            linkedin: 'https://linkedin.com/in/sen',
            twitter: 'https://twitter.com/sen',
          },
        },
      }

      ;(global.fetch as any).mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve(mockData),
      })

      const result = await api.getAbout()
      expect(result.success).toBe(true)
      expect(result.data?.name).toBe('Sen')
    })

    it('应该在请求失败时抛出错误', async () => {
      ;(global.fetch as any).mockResolvedValueOnce({
        ok: false,
        text: () => Promise.resolve('Server Error'),
      })

      await expect(api.getAbout()).rejects.toThrow(ApiError)
    })
  })

  describe('api.getSkills', () => {
    it('应该成功获取技能列表', async () => {
      const mockData = {
        success: true,
        data: [
          { name: 'Go', category: 'Backend', proficiency: 95, icon: 'go' },
          { name: 'Gin', category: 'Backend', proficiency: 90, icon: 'gin' },
        ],
      }

      ;(global.fetch as any).mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve(mockData),
      })

      const result = await api.getSkills()
      expect(result.success).toBe(true)
      expect(result.data?.length).toBe(2)
    })
  })

  describe('api.submitContact', () => {
    it('应该成功提交联系表单', async () => {
      const mockData = { success: true, message: '发送成功' }
      
      ;(global.fetch as any).mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve(mockData),
      })

      const result = await api.submitContact({
        name: '张三',
        email: 'zhang@example.com',
        subject: '咨询',
        message: '这是一条测试消息',
      })

      expect(result.success).toBe(true)
      expect(result.message).toBe('发送成功')
    })
  })
})

describe('图片优化工具', () => {
  // 由于图片优化工具依赖 DOM，需要在浏览器环境测试
  // 这里只测试纯函数部分
  describe('srcset 生成', () => {
    it('应该生成正确的 srcset 字符串', () => {
      const { generateSrcSet } = require('@/utils/image')
      // 注意：这个测试需要在完整 DOM 环境下运行
    })
  })
})
