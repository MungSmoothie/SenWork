<script setup lang="ts">
import type { Project } from '@/types'
import Card from './Card.vue'
import Button from './Button.vue'

interface Props {
  project: Project
}

defineProps<Props>()
</script>

<template>
  <Card hoverable padding="none" class="project-card">
    <div class="project-image">
      <img :src="project.image" :alt="project.name" loading="lazy" />
      <div v-if="project.featured" class="featured-badge">精选</div>
    </div>
    
    <div class="project-content">
      <h3 class="project-title">{{ project.name }}</h3>
      <p class="project-description">{{ project.description }}</p>
      
      <div class="tech-stack">
        <span
          v-for="tech in project.techStack.slice(0, 4)"
          :key="tech"
          class="tech-tag"
        >
          {{ tech }}
        </span>
        <span
          v-if="project.techStack.length > 4"
          class="tech-more"
        >
          +{{ project.techStack.length - 4 }}
        </span>
      </div>
      
      <div class="project-actions">
        <Button
          v-if="project.demoUrl && project.demoUrl !== '#'"
          :href="project.demoUrl"
          variant="primary"
          size="sm"
        >
          查看演示
        </Button>
        <Button
          v-if="project.repoUrl && project.repoUrl !== '#'"
          :href="project.repoUrl"
          variant="outline"
          size="sm"
        >
          查看源码
        </Button>
      </div>
    </div>
  </Card>
</template>

<style scoped>
.project-card {
  overflow: hidden;
  height: 100%;
  display: flex;
  flex-direction: column;
}

.project-image {
  position: relative;
  aspect-ratio: 16 / 9;
  overflow: hidden;
}

.project-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform var(--transition DEFAULT);
}

.project-card:hover .project-image img {
  transform: scale(1.05);
}

.featured-badge {
  position: absolute;
  top: var(--spacing-3);
  right: var(--spacing-3);
  padding: var(--spacing-1) var(--spacing-3);
  background: linear-gradient(135deg, var(--color-primary) 0%, var(--color-primary-dark) 100%);
  color: white;
  font-size: var(--text-xs);
  font-weight: var(--font-semibold);
  border-radius: var(--radius-full);
}

.project-content {
  padding: var(--spacing-6);
  flex: 1;
  display: flex;
  flex-direction: column;
}

.project-title {
  font-size: var(--text-lg);
  font-weight: var(--font-semibold);
  color: var(--color-text-primary);
  margin: 0 0 var(--spacing-2);
}

.project-description {
  font-size: var(--text-sm);
  color: var(--color-text-secondary);
  line-height: var(--leading-relaxed);
  margin: 0 0 var(--spacing-4);
  flex: 1;
}

.tech-stack {
  display: flex;
  flex-wrap: wrap;
  gap: var(--spacing-2);
  margin-bottom: var(--spacing-4);
}

.tech-tag {
  padding: var(--spacing-1) var(--spacing-3);
  background: var(--color-bg-secondary);
  color: var(--color-text-secondary);
  font-size: var(--text-xs);
  border-radius: var(--radius-full);
  transition: all var(--transition-fast);
}

.project-card:hover .tech-tag {
  background: rgba(74, 222, 128, 0.1);
  color: var(--color-primary-dark);
}

.tech-more {
  padding: var(--spacing-1) var(--spacing-2);
  font-size: var(--text-xs);
  color: var(--color-text-muted);
}

.project-actions {
  display: flex;
  gap: var(--spacing-3);
}
</style>
