<script setup lang="ts">
import { computed } from 'vue'
import { RouterLink } from 'vue-router'

interface Props {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
  disabled?: boolean
  loading?: boolean
  href?: string
  type?: 'button' | 'submit' | 'reset'
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'primary',
  size: 'md',
  disabled: false,
  loading: false,
  type: 'button'
})

const emit = defineEmits<{
  click: [event: MouseEvent]
}>()

const classes = computed(() => {
  const base = 'btn'
  const variantClass = `btn-${props.variant}`
  const sizeClass = `btn-${props.size}`
  const loadingClass = props.loading ? 'btn-loading' : ''
  
  return [base, variantClass, sizeClass, loadingClass].filter(Boolean).join(' ')
})

const handleClick = (event: MouseEvent) => {
  if (!props.disabled && !props.loading) {
    emit('click', event)
  }
}
</script>

<template>
  <component
    :is="href ? RouterLink : 'button'"
    :class="classes"
    :disabled="disabled || loading"
    :href="href"
    :type="href ? undefined : type"
    @click="handleClick"
  >
    <span v-if="loading" class="spinner"></span>
    <slot />
  </component>
</template>

<style scoped>
/* 使用主题变量 */
.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  border-radius: var(--radius-lg);
  font-weight: var(--font-semibold);
  text-decoration: none;
  transition: all var(--transition DEFAULT);
  cursor: pointer;
  border: none;
  position: relative;
  overflow: hidden;
}

/* 变体样式 */
.btn-primary {
  background: linear-gradient(135deg, var(--color-primary) 0%, var(--color-primary-dark) 100%);
  color: var(--color-text-inverse);
  box-shadow: var(--shadow-glow);
}

.btn-primary:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: var(--shadow-glow-hover);
}

.btn-secondary {
  background: var(--color-bg-card);
  color: var(--color-text-primary);
  border: 2px solid var(--color-border-light);
}

.btn-secondary:hover:not(:disabled) {
  border-color: var(--color-primary);
  color: var(--color-primary-dark);
}

.btn-outline {
  background: transparent;
  color: var(--color-text-primary);
  border: 2px solid var(--color-border-default);
}

.btn-outline:hover:not(:disabled) {
  border-color: var(--color-primary);
  color: var(--color-primary);
}

.btn-ghost {
  background: transparent;
  color: var(--color-text-secondary);
}

.btn-ghost:hover:not(:disabled) {
  background: var(--color-bg-secondary);
  color: var(--color-text-primary);
}

/* 尺寸样式 */
.btn-sm {
  padding: 0.5rem 1rem;
  font-size: var(--text-sm);
  border-radius: var(--radius-md);
}

.btn-md {
  padding: 0.75rem 1.5rem;
  font-size: var(--text-base);
  border-radius: var(--radius-lg);
}

.btn-lg {
  padding: 1rem 2rem;
  font-size: var(--text-lg);
  border-radius: var(--radius-xl);
}

/* 禁用状态 */
.btn:disabled,
.btn.loading {
  opacity: 0.6;
  cursor: not-allowed;
  transform: none !important;
}

/* 加载状态 */
.spinner {
  width: 1em;
  height: 1em;
  border: 2px solid currentColor;
  border-top-color: transparent;
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
}

.btn-loading {
  cursor: wait;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}
</style>
