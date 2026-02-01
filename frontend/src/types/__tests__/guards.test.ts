/**
 * 类型守卫函数测试
 */

import { describe, it, expect } from 'vitest'
import {
  isApiSuccess,
  isApiError,
  isAboutInfo,
  isSkill,
  isProject,
  isExperience,
  isContactForm,
  parseApiResponse,
} from '@/types'

describe('类型守卫函数', () => {
  describe('isApiSuccess', () => {
    it('应该返回 true 当 success 为 true 且 data 存在', () => {
      const response = { success: true, data: { name: 'test' } }
      expect(isApiSuccess(response)).toBe(true)
    })

    it('应该返回 false 当 success 为 false', () => {
      const response = { success: false, error: 'error' }
      expect(isApiSuccess(response)).toBe(false)
    })

    it('应该返回 false 当 data 不存在', () => {
      const response = { success: true }
      expect(isApiSuccess(response)).toBe(false)
    })
  })

  describe('isApiError', () => {
    it('应该返回 true 当 success 为 false 且 error 存在', () => {
      const response = { success: false, error: 'error message' }
      expect(isApiError(response)).toBe(true)
    })

    it('应该返回 false 当 success 为 true', () => {
      const response = { success: true, data: {} }
      expect(isApiError(response)).toBe(false)
    })
  })

  describe('isAboutInfo', () => {
    it('应该返回 true 当对象包含有效的 AboutInfo 字段', () => {
      const data = {
        name: 'Sen',
        title: 'Golang 工程师',
        email: 'test@example.com',
        avatar: 'https://example.com/avatar.png',
      }
      expect(isAboutInfo(data)).toBe(true)
    })

    it('应该返回 false 当缺少必需字段', () => {
      const data = { name: 'Sen' }
      expect(isAboutInfo(data)).toBe(false)
    })

    it('应该返回 false 当输入不是对象', () => {
      expect(isAboutInfo(null)).toBe(false)
      expect(isAboutInfo('string')).toBe(false)
      expect(isAboutInfo(123)).toBe(false)
    })
  })

  describe('isSkill', () => {
    it('应该返回 true 当对象包含有效的 Skill 字段', () => {
      const data = {
        name: 'Go',
        category: 'Backend',
        proficiency: 95,
        icon: 'go',
      }
      expect(isSkill(data)).toBe(true)
    })

    it('应该返回 false 当 proficiency 超出范围', () => {
      const data = {
        name: 'Go',
        category: 'Backend',
        proficiency: 150,
        icon: 'go',
      }
      expect(isSkill(data)).toBe(false)
    })
  })

  describe('isProject', () => {
    it('应该返回 true 当对象包含有效的 Project 字段', () => {
      const data = {
        id: '1',
        name: '项目名称',
        description: '描述',
        techStack: ['Go', 'Gin'],
      }
      expect(isProject(data)).toBe(true)
    })

    it('应该返回 false 当 techStack 不是数组', () => {
      const data = {
        id: '1',
        name: '项目名称',
        description: '描述',
        techStack: 'not an array',
      }
      expect(isProject(data)).toBe(false)
    })
  })

  describe('isExperience', () => {
    it('应该返回 true 当对象包含有效的 Experience 字段', () => {
      const data = {
        id: '1',
        company: '公司名',
        position: '职位',
        startDate: '2023-01',
      }
      expect(isExperience(data)).toBe(true)
    })
  })

  describe('isContactForm', () => {
    it('应该返回 true 当对象包含有效的 ContactForm 字段', () => {
      const data = {
        name: '张三',
        email: 'zhang@example.com',
        subject: '主题',
        message: '这是一条消息',
      }
      expect(isContactForm(data)).toBe(true)
    })
  })

  describe('parseApiResponse', () => {
    it('应该正确解析有效的 API 响应', () => {
      const response = {
        success: true,
        data: {
          name: 'Sen',
          title: '工程师',
          email: 'test@example.com',
          avatar: 'url',
        },
      }
      const result = parseApiResponse(response, isAboutInfo)
      expect(result).not.toBeNull()
      expect(result?.name).toBe('Sen')
    })

    it('应该返回 null 当响应无效', () => {
      const response = { success: false, error: 'error' }
      const result = parseApiResponse(response, isAboutInfo)
      expect(result).toBeNull()
    })
  })
})
