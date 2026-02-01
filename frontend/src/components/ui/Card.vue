<script setup lang="ts">
interface Props {
  hoverable?: boolean
  bordered?: boolean
  padding?: 'none' | 'sm' | 'md' | 'lg'
}

withDefaults(defineProps<Props>(), {
  hoverable: false,
  bordered: true,
  padding: 'md'
})
</script>

<template>
  <div :class="['card', `card-padding-${padding}`, { 'card-hover': hoverable, 'card-bordered': bordered }]">
    <slot />
  </div>
</template>

<style scoped>
.card {
  background: var(--color-bg-card);
  border-radius: var(--radius-xl);
  transition: all var(--transition DEFAULT);
}

.card-bordered {
  border: 1px solid var(--color-border-light);
}

.card-hover:hover {
  transform: translateY(-4px);
  box-shadow: var(--shadow-lg);
}

.card-padding-none { padding: 0; }
.card-padding-sm { padding: var(--spacing-4); }
.card-padding-md { padding: var(--spacing-6); }
.card-padding-lg { padding: var(--spacing-8); }
</style>
