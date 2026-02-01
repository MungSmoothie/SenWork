<script setup lang="ts">
import { ref, reactive } from 'vue'
import { api } from '@/api'
import type { ContactForm } from '@/types'

const form = reactive<ContactForm>({
  name: '',
  email: '',
  subject: '',
  message: '',
})

const submitting = ref(false)
const success = ref(false)
const error = ref('')

async function handleSubmit() {
  submitting.value = true
  error.value = ''
  success.value = false

  try {
    const res = await api.submitContact(form)
    if (res.success) {
      success.value = true
      form.name = ''
      form.email = ''
      form.subject = ''
      form.message = ''
    } else {
      error.value = res.message || '提交失败，请稍后重试'
    }
  } catch (e) {
    error.value = '网络错误，请稍后重试'
  } finally {
    submitting.value = false
  }
}
</script>

<template>
  <div class="contact-page">
    <section class="contact-hero">
      <div class="container">
        <h1>联系我</h1>
        <p>有任何项目合作意向，欢迎随时联系</p>
      </div>
    </section>

    <section class="contact-content">
      <div class="container">
        <div class="contact-grid">
          <div class="contact-info">
            <h2>联系方式</h2>
            <p>期待与您的合作！</p>

            <div class="info-items">
              <div class="info-item">
                <div class="info-icon">
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
                  </svg>
                </div>
                <div class="info-text">
                  <span class="info-label">邮箱</span>
                  <a href="mailto:sen@example.com">sen@example.com</a>
                </div>
              </div>
              <div class="info-item">
                <div class="info-icon">
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                  </svg>
                </div>
                <div class="info-text">
                  <span class="info-label">位置</span>
                  <span>中国</span>
                </div>
              </div>
              <div class="info-item">
                <div class="info-icon">
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67z"/>
                  </svg>
                </div>
                <div class="info-text">
                  <span class="info-label">响应时间</span>
                  <span>24 小时内</span>
                </div>
              </div>
            </div>

            <div class="social-section">
              <h3>社交媒体</h3>
              <div class="social-links">
                <a href="#" target="_blank" rel="noopener noreferrer" title="GitHub">
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
                  </svg>
                </a>
                <a href="#" target="_blank" rel="noopener noreferrer" title="LinkedIn">
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                </a>
                <a href="#" target="_blank" rel="noopener noreferrer" title="Twitter">
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                  </svg>
                </a>
              </div>
            </div>
          </div>

          <div class="contact-form-wrapper">
            <h2>发送消息</h2>
            <form @submit.prevent="handleSubmit" class="contact-form">
              <div v-if="success" class="form-success">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                </svg>
                <span>感谢您的留言，我会尽快回复您！</span>
              </div>

              <div v-if="error" class="form-error">
                {{ error }}
              </div>

              <div class="form-group">
                <label for="name">姓名</label>
                <input
                  id="name"
                  v-model="form.name"
                  type="text"
                  placeholder="请输入您的姓名"
                  required
                />
              </div>

              <div class="form-group">
                <label for="email">邮箱</label>
                <input
                  id="email"
                  v-model="form.email"
                  type="email"
                  placeholder="请输入您的邮箱"
                  required
                />
              </div>

              <div class="form-group">
                <label for="subject">主题</label>
                <input
                  id="subject"
                  v-model="form.subject"
                  type="text"
                  placeholder="请输入邮件主题"
                  required
                />
              </div>

              <div class="form-group">
                <label for="message">内容</label>
                <textarea
                  id="message"
                  v-model="form.message"
                  placeholder="请输入您的留言内容（至少10个字符）"
                  rows="5"
                  required
                ></textarea>
              </div>

              <button type="submit" :disabled="submitting" class="submit-btn">
                {{ submitting ? '发送中...' : '发送消息' }}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
.contact-page {
  padding-top: 80px;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
}

.contact-hero {
  padding: 4rem 0;
  background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%);
  text-align: center;
}

.contact-hero h1 {
  font-size: 2.5rem;
  font-weight: 700;
  color: #1a1a2e;
  margin-bottom: 0.5rem;
}

.contact-hero p {
  color: #64748b;
  font-size: 1.125rem;
}

.contact-content {
  padding: 4rem 0;
}

.contact-grid {
  display: grid;
  grid-template-columns: 1fr 1.5fr;
  gap: 4rem;
}

.contact-info h2 {
  font-size: 1.5rem;
  font-weight: 600;
  color: #1a1a2e;
  margin-bottom: 0.5rem;
}

.contact-info > p {
  color: #64748b;
  margin-bottom: 2rem;
}

.info-items {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.info-item {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.info-icon {
  width: 48px;
  height: 48px;
  background: rgba(74, 222, 128, 0.1);
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #4ade80;
}

.info-icon svg {
  width: 24px;
  height: 24px;
}

.info-text {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.info-label {
  font-size: 0.875rem;
  color: #64748b;
}

.info-text a,
.info-text span:last-child {
  color: #1a1a2e;
  font-weight: 500;
  text-decoration: none;
}

.info-text a:hover {
  color: #4ade80;
}

.social-section {
  margin-top: 3rem;
  padding-top: 2rem;
  border-top: 1px solid #e5e7eb;
}

.social-section h3 {
  font-size: 1rem;
  font-weight: 600;
  color: #1a1a2e;
  margin-bottom: 1rem;
}

.social-links {
  display: flex;
  gap: 1rem;
}

.social-links a {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 44px;
  height: 44px;
  background: #f1f5f9;
  border-radius: 12px;
  color: #4b5563;
  transition: all 0.3s ease;
}

.social-links a:hover {
  background: #4ade80;
  color: white;
  transform: translateY(-2px);
}

.social-links svg {
  width: 20px;
  height: 20px;
}

.contact-form-wrapper h2 {
  font-size: 1.5rem;
  font-weight: 600;
  color: #1a1a2e;
  margin-bottom: 2rem;
}

.contact-form {
  background: white;
  padding: 2rem;
  border-radius: 16px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
}

.form-success {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 1rem;
  background: rgba(74, 222, 128, 0.1);
  color: #16a34a;
  border-radius: 12px;
  margin-bottom: 1.5rem;
}

.form-success svg {
  width: 24px;
  height: 24px;
  flex-shrink: 0;
}

.form-error {
  padding: 1rem;
  background: rgba(239, 68, 68, 0.1);
  color: #dc2626;
  border-radius: 12px;
  margin-bottom: 1.5rem;
}

.form-group {
  margin-bottom: 1.5rem;
}

.form-group label {
  display: block;
  font-size: 0.9rem;
  font-weight: 500;
  color: #374151;
  margin-bottom: 0.5rem;
}

.form-group input,
.form-group textarea {
  width: 100%;
  padding: 0.875rem 1rem;
  border: 2px solid #e5e7eb;
  border-radius: 10px;
  font-size: 1rem;
  transition: all 0.3s ease;
  background: #fafafa;
}

.form-group input:focus,
.form-group textarea:focus {
  outline: none;
  border-color: #4ade80;
  background: white;
}

.form-group input::placeholder,
.form-group textarea::placeholder {
  color: #9ca3af;
}

.submit-btn {
  width: 100%;
  padding: 1rem;
  background: linear-gradient(135deg, #4ade80 0%, #22c55e 100%);
  color: white;
  border: none;
  border-radius: 10px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
}

.submit-btn:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(74, 222, 128, 0.4);
}

.submit-btn:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

@media (max-width: 768px) {
  .contact-grid {
    grid-template-columns: 1fr;
    gap: 2rem;
  }

  .contact-form {
    padding: 1.5rem;
  }
}
</style>
