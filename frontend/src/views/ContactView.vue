<script setup lang="ts">
import { ref, reactive, defineComponent, h } from 'vue'
import { api } from '@/api'
import type { ContactForm } from '@/types'
import { ElForm, ElFormItem, ElInput, ElButton, ElAlert } from 'element-plus'
import { 
  ChatDotRound, Place, Link, Connection, Message, Timer
} from '@element-plus/icons-vue'

// State
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
    <!-- Hero Section -->
    <section class="contact-hero">
      <div class="hero-bg"></div>
      <div class="container">
        <div class="hero-content animate-fade-in">
          <div class="hero-badge">
            <el-icon><Message /></el-icon>
            <span>联系我</span>
          </div>
          <h1 class="hero-title">期待与您的合作</h1>
          <p class="hero-subtitle">有任何项目合作意向，欢迎随时联系</p>
        </div>
      </div>
    </section>

    <!-- Contact Content -->
    <section class="contact-content">
      <div class="container">
        <div class="contact-grid">
          <!-- Contact Info -->
          <div class="contact-info animate-slide-up">
            <h2>联系方式</h2>
            <p class="info-desc">期待与您的合作！</p>

            <div class="info-items">
              <div class="info-item">
                <div class="info-icon">
                  <el-icon :size="22"><ChatDotRound /></el-icon>
                </div>
                <div class="info-text">
                  <span class="info-label">邮箱</span>
                  <a href="mailto:sen@example.com">sen@example.com</a>
                </div>
              </div>
              <div class="info-item">
                <div class="info-icon">
                  <el-icon :size="22"><Place /></el-icon>
                </div>
                <div class="info-text">
                  <span class="info-label">位置</span>
                  <span>中国</span>
                </div>
              </div>
              <div class="info-item">
                <div class="info-icon">
                  <el-icon :size="22"><Timer /></el-icon>
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
                <a href="#" target="_blank" rel="noopener noreferrer" title="GitHub" class="social-btn">
                  <el-icon :size="20"><Link /></el-icon>
                </a>
                <a href="#" target="_blank" rel="noopener noreferrer" title="LinkedIn" class="social-btn">
                  <el-icon :size="20"><Link /></el-icon>
                </a>
                <a href="#" target="_blank" rel="noopener noreferrer" title="Twitter" class="social-btn">
                  <el-icon :size="20"><Connection /></el-icon>
                </a>
              </div>
            </div>

            <!-- Quote -->
            <div class="contact-quote">
              <el-icon :size="24"><Message /></el-icon>
              <blockquote>
                "代码改变世界，协作创造未来"
              </blockquote>
            </div>
          </div>

          <!-- Contact Form -->
          <div class="contact-form-wrapper animate-slide-up stagger-1">
            <h2>发送消息</h2>
            <el-form 
              @submit.prevent="handleSubmit" 
              class="contact-form"
              :model="form"
              label-position="top"
            >
              <el-alert
                v-if="success"
                title="发送成功"
                type="success"
                :closable="false"
                show-icon
                class="form-alert"
              >
                <template #default>
                  感谢您的留言，我会尽快回复您！
                </template>
              </el-alert>

              <el-alert
                v-if="error"
                :title="error"
                type="error"
                :closable="false"
                show-icon
                class="form-alert"
              />

              <el-form-item label="姓名" prop="name" :rules="{ required: true, message: '请输入您的姓名', trigger: 'blur' }">
                <el-input 
                  v-model="form.name"
                  placeholder="请输入您的姓名"
                  prefix-icon="User"
                />
              </el-form-item>

              <el-form-item label="邮箱" prop="email" :rules="[
                { required: true, message: '请输入您的邮箱', trigger: 'blur' },
                { type: 'email', message: '请输入有效的邮箱地址', trigger: 'blur' }
              ]">
                <el-input 
                  v-model="form.email"
                  placeholder="请输入您的邮箱"
                  prefix-icon="Message"
                />
              </el-form-item>

              <el-form-item label="主题" prop="subject" :rules="{ required: true, message: '请输入邮件主题', trigger: 'blur' }">
                <el-input 
                  v-model="form.subject"
                  placeholder="请输入邮件主题"
                  prefix-icon="ChatLineRound"
                />
              </el-form-item>

              <el-form-item label="内容" prop="message" :rules="{ required: true, message: '请输入留言内容', trigger: 'blur' }">
                <el-input
                  v-model="form.message"
                  type="textarea"
                  placeholder="请输入您的留言内容（至少10个字符）"
                  :rows="5"
                  maxlength="500"
                  show-word-limit
                />
              </el-form-item>

              <el-button 
                type="primary" 
                native-type="submit"
                :loading="submitting"
                class="submit-btn"
                size="large"
              >
                <el-icon v-if="!submitting"><Message /></el-icon>
                {{ submitting ? '发送中...' : '发送消息' }}
              </el-button>
            </el-form>
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

/* Hero Section */
.contact-hero {
  padding: 4rem 0 5rem;
  background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%);
  text-align: center;
  position: relative;
  overflow: hidden;
}

.hero-bg {
  position: absolute;
  inset: 0;
  background-image: 
    radial-gradient(circle at 30% 50%, rgba(64, 158, 255, 0.05) 0%, transparent 50%),
    radial-gradient(circle at 70% 50%, rgba(103, 194, 58, 0.05) 0%, transparent 50%);
  pointer-events: none;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
  position: relative;
  z-index: 1;
}

.hero-badge {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  background: rgba(64, 158, 255, 0.1);
  color: var(--color-primary, #409EFF);
  border-radius: 50px;
  font-size: 0.875rem;
  font-weight: 500;
  margin-bottom: 1rem;
}

.hero-title {
  font-size: 2.75rem;
  font-weight: 700;
  color: #1a1a2e;
  margin-bottom: 0.5rem;
}

.hero-subtitle {
  color: #64748b;
  font-size: 1.125rem;
}

/* Contact Content */
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

.info-desc {
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
  width: 52px;
  height: 52px;
  background: linear-gradient(135deg, rgba(64, 158, 255, 0.1) 0%, rgba(64, 158, 255, 0.05) 100%);
  border-radius: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--color-primary, #409EFF);
}

.info-text {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.info-label {
  font-size: 0.8rem;
  color: #94a3b8;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.info-text a,
.info-text span:last-child {
  color: #1a1a2e;
  font-weight: 500;
  text-decoration: none;
  transition: color 0.3s ease;
}

.info-text a:hover {
  color: var(--color-primary, #409EFF);
}

.social-section {
  margin-top: 2.5rem;
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

.social-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 48px;
  height: 48px;
  background: #f1f5f9;
  border-radius: 12px;
  color: #4b5563;
  transition: all 0.3s ease;
}

.social-btn:hover {
  background: var(--color-primary, #409EFF);
  color: white;
  transform: translateY(-3px);
  box-shadow: 0 6px 20px rgba(64, 158, 255, 0.3);
}

/* Contact Quote */
.contact-quote {
  margin-top: 2.5rem;
  padding: 1.5rem;
  background: linear-gradient(135deg, rgba(64, 158, 255, 0.05) 0%, rgba(64, 158, 255, 0.02) 100%);
  border-radius: 16px;
  display: flex;
  align-items: flex-start;
  gap: 1rem;
}

.contact-quote .el-icon {
  color: var(--color-primary, #409EFF);
  flex-shrink: 0;
}

.contact-quote blockquote {
  margin: 0;
  font-size: 0.95rem;
  color: #4b5563;
  font-style: italic;
  line-height: 1.6;
}

/* Contact Form */
.contact-form-wrapper h2 {
  font-size: 1.5rem;
  font-weight: 600;
  color: #1a1a2e;
  margin-bottom: 2rem;
}

.contact-form {
  background: white;
  padding: 2rem;
  border-radius: 20px;
  box-shadow: 0 4px 25px rgba(0, 0, 0, 0.05);
}

.form-alert {
  margin-bottom: 1.5rem;
}

.submit-btn {
  width: 100%;
  height: 52px;
  font-size: 1rem;
  font-weight: 600;
  margin-top: 1rem;
}

.submit-btn .el-icon {
  margin-right: 0.5rem;
}

@media (max-width: 1024px) {
  .contact-grid {
    grid-template-columns: 1fr;
    gap: 3rem;
  }
}

@media (max-width: 640px) {
  .hero-title {
    font-size: 2rem;
  }

  .contact-form {
    padding: 1.5rem;
  }

  .social-links {
    justify-content: flex-start;
  }
}
</style>
