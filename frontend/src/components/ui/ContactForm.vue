<script setup lang="ts">
import { ref, reactive } from 'vue'
import type { ContactForm } from '@/types'
import Button from './Button.vue'
import Loading from './Loading.vue'
import Modal from './Modal.vue'

interface Props {
  endpoint?: string
}

const props = withDefaults(defineProps<Props>(), {
  endpoint: '/api/contact'
})

const emit = defineEmits<{
  success: []
  error: [message: string]
}>()

const form = reactive<ContactForm>({
  name: '',
  email: '',
  subject: '',
  message: ''
})

const errors = reactive<Partial<Record<keyof ContactForm, string>>>({})
const loading = ref(false)
const showSuccessModal = ref(false)

const validate = (): boolean => {
  Object.keys(errors).forEach(key => {
    errors[key as keyof ContactForm] = ''
  })
  
  if (!form.name.trim()) {
    errors.name = '请输入您的姓名'
    return false
  }
  
  if (!form.email.trim()) {
    errors.email = '请输入您的邮箱'
    return false
  }
  
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(form.email)) {
    errors.email = '请输入有效的邮箱地址'
    return false
  }
  
  if (!form.subject.trim()) {
    errors.subject = '请输入主题'
    return false
  }
  
  if (!form.message.trim()) {
    errors.message = '请输入消息内容'
    return false
  }
  
  if (form.message.trim().length < 10) {
    errors.message = '消息内容至少需要 10 个字符'
    return false
  }
  
  return true
}

const submitForm = async () => {
  if (!validate()) return
  
  loading.value = true
  
  try {
    const response = await fetch(props.endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(form)
    })
    
    const data = await response.json()
    
    if (data.success) {
      showSuccessModal.value = true
      emit('success')
      // 重置表单
      form.name = ''
      form.email = ''
      form.subject = ''
      form.message = ''
    } else {
      emit('error', data.error || '提交失败，请稍后重试')
    }
  } catch (error) {
    emit('error', '网络错误，请检查网络连接')
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <form class="contact-form" @submit.prevent="submitForm">
    <div class="form-group">
      <label for="name" class="form-label">姓名 <span class="required">*</span></label>
      <input
        id="name"
        v-model="form.name"
        type="text"
        class="form-input"
        :class="{ 'has-error': errors.name }"
        placeholder="请输入您的姓名"
        :disabled="loading"
      />
      <p v-if="errors.name" class="form-error">{{ errors.name }}</p>
    </div>
    
    <div class="form-group">
      <label for="email" class="form-label">邮箱 <span class="required">*</span></label>
      <input
        id="email"
        v-model="form.email"
        type="email"
        class="form-input"
        :class="{ 'has-error': errors.email }"
        placeholder="请输入您的邮箱"
        :disabled="loading"
      />
      <p v-if="errors.email" class="form-error">{{ errors.email }}</p>
    </div>
    
    <div class="form-group">
      <label for="subject" class="form-label">主题 <span class="required">*</span></label>
      <input
        id="subject"
        v-model="form.subject"
        type="text"
        class="form-input"
        :class="{ 'has-error': errors.subject }"
        placeholder="请输入邮件主题"
        :disabled="loading"
      />
      <p v-if="errors.subject" class="form-error">{{ errors.subject }}</p>
    </div>
    
    <div class="form-group">
      <label for="message" class="form-label">消息 <span class="required">*</span></label>
      <textarea
        id="message"
        v-model="form.message"
        class="form-textarea"
        :class="{ 'has-error': errors.message }"
        rows="5"
        placeholder="请输入您的消息内容，至少 10 个字符"
        :disabled="loading"
      ></textarea>
      <p v-if="errors.message" class="form-error">{{ errors.message }}</p>
    </div>
    
    <div class="form-actions">
      <Button type="submit" :loading="loading" size="lg">
        发送消息
      </Button>
    </div>
    
    <p class="form-hint">
      提交即表示您同意隐私政策，我会尽快回复您。
    </p>
  </form>
  
  <!-- 成功提示模态框 -->
  <Modal v-model:open="showSuccessModal" title="发送成功" size="sm">
    <p class="success-message">
      感谢您的咨询！我会尽快回复您。
    </p>
    <template #footer>
      <Button @click="showSuccessModal = false">确定</Button>
    </template>
  </Modal>
</template>

<style scoped>
.contact-form {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-6);
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-2);
}

.form-label {
  font-size: var(--text-sm);
  font-weight: var(--font-medium);
  color: var(--color-text-primary);
}

.required {
  color: var(--color-error);
}

.form-input,
.form-textarea {
  padding: var(--spacing-4);
  font-size: var(--text-base);
  color: var(--color-text-primary);
  background: var(--color-bg-card);
  border: 1px solid var(--color-border-light);
  border-radius: var(--radius-lg);
  transition: all var(--transition-fast);
}

.form-input:focus,
.form-textarea:focus {
  outline: none;
  border-color: var(--color-primary);
  box-shadow: 0 0 0 3px var(--color-primary-glow);
}

.form-input.has-error,
.form-textarea.has-error {
  border-color: var(--color-error);
}

.form-textarea {
  resize: vertical;
  min-height: 120px;
}

.form-error {
  font-size: var(--text-sm);
  color: var(--color-error);
  margin: 0;
}

.form-actions {
  margin-top: var(--spacing-2);
}

.form-hint {
  font-size: var(--text-xs);
  color: var(--color-text-muted);
  text-align: center;
  margin: 0;
}

.success-message {
  color: var(--color-text-secondary);
  line-height: var(--leading-relaxed);
}
</style>
