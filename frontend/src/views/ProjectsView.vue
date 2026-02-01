<script setup lang="ts">
import { onMounted, ref, computed } from 'vue'
import { api } from '@/api'
import type { Project } from '@/types'

const projects = ref<Project[]>([])
const loading = ref(true)
const selectedTech = ref<string | null>(null)

const allTechs = computed(() => {
  const techs = new Set<string>()
  projects.value.forEach(p => p.techStack.forEach(t => techs.add(t)))
  return Array.from(techs)
})

const filteredProjects = computed(() => {
  if (!selectedTech.value) return projects.value
  return projects.value.filter(p => p.techStack.includes(selectedTech.value!))
})

const featuredProjects = computed(() => filteredProjects.value.filter(p => p.featured))
const otherProjects = computed(() => filteredProjects.value.filter(p => !p.featured))

onMounted(async () => {
  try {
    const res = await api.getProjects()
    if (res.success && res.data) projects.value = res.data
  } catch (e) {
    console.error('Failed to load projects:', e)
  } finally {
    loading.value = false
  }
})
</script>

<template>
  <div class="projects-page">
    <section class="projects-hero">
      <div class="container">
        <h1>项目作品</h1>
        <p>用代码创造价值，用项目证明实力</p>
      </div>
    </section>

    <section class="projects-filter">
      <div class="container">
        <div class="filter-tabs">
          <button
            :class="['filter-tab', { active: selectedTech === null }]"
            @click="selectedTech = null"
          >
            全部
          </button>
          <button
            v-for="tech in allTechs"
            :key="tech"
            :class="['filter-tab', { active: selectedTech === tech }]"
            @click="selectedTech = tech"
          >
            {{ tech }}
          </button>
        </div>
      </div>
    </section>

    <section class="projects-list">
      <div class="container">
        <div v-if="loading" class="loading">
          <div class="spinner"></div>
        </div>
        <template v-else>
          <div v-if="featuredProjects.length > 0" class="project-group">
            <h2 class="group-title">精选项目</h2>
            <div class="projects-grid">
              <div v-for="project in featuredProjects" :key="project.id" class="project-card featured">
                <div class="project-image">
                  <img :src="project.image" :alt="project.name" />
                  <div class="project-overlay">
                    <a :href="project.demoUrl" target="_blank" rel="noopener noreferrer" class="project-link">
                      <span>查看演示</span>
                    </a>
                    <a :href="project.repoUrl" target="_blank" rel="noopener noreferrer" class="project-link">
                      <span>查看源码</span>
                    </a>
                  </div>
                </div>
                <div class="project-info">
                  <h3>{{ project.name }}</h3>
                  <p>{{ project.description }}</p>
                  <div class="tech-stack">
                    <span v-for="tech in project.techStack" :key="tech" class="tech-tag">
                      {{ tech }}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div v-if="otherProjects.length > 0" class="project-group">
            <h2 class="group-title">其他项目</h2>
            <div class="projects-grid small">
              <div v-for="project in otherProjects" :key="project.id" class="project-card">
                <div class="project-image">
                  <img :src="project.image" :alt="project.name" />
                </div>
                <div class="project-info">
                  <h3>{{ project.name }}</h3>
                  <p>{{ project.description }}</p>
                  <div class="tech-stack">
                    <span v-for="tech in project.techStack" :key="tech" class="tech-tag">
                      {{ tech }}
                    </span>
                  </div>
                  <div class="project-links">
                    <a :href="project.repoUrl" target="_blank" rel="noopener noreferrer">
                      <svg viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </template>
      </div>
    </section>
  </div>
</template>

<style scoped>
.projects-page {
  padding-top: 80px;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
}

.projects-hero {
  padding: 4rem 0;
  background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%);
  text-align: center;
}

.projects-hero h1 {
  font-size: 2.5rem;
  font-weight: 700;
  color: #1a1a2e;
  margin-bottom: 0.5rem;
}

.projects-hero p {
  color: #64748b;
  font-size: 1.125rem;
}

.projects-filter {
  padding: 2rem 0;
  background: white;
  border-bottom: 1px solid #f1f5f9;
  position: sticky;
  top: 70px;
  z-index: 100;
}

.filter-tabs {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
  justify-content: center;
}

.filter-tab {
  padding: 0.5rem 1.25rem;
  border: none;
  background: #f1f5f9;
  color: #64748b;
  border-radius: 50px;
  font-size: 0.9rem;
  cursor: pointer;
  transition: all 0.3s ease;
}

.filter-tab:hover {
  background: #e2e8f0;
}

.filter-tab.active {
  background: #4ade80;
  color: white;
}

.projects-list {
  padding: 4rem 0;
}

.loading {
  display: flex;
  justify-content: center;
  padding: 4rem 0;
}

.spinner {
  width: 40px;
  height: 40px;
  border: 3px solid #e5e7eb;
  border-top-color: #4ade80;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

.project-group {
  margin-bottom: 4rem;
}

.group-title {
  font-size: 1.5rem;
  font-weight: 600;
  color: #1a1a2e;
  margin-bottom: 2rem;
  padding-left: 1rem;
  border-left: 4px solid #4ade80;
}

.projects-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 2rem;
}

.projects-grid.small {
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
}

.project-card {
  background: white;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
  transition: all 0.3s ease;
}

.project-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 15px 40px rgba(0, 0, 0, 0.1);
}

.project-card.featured {
  grid-column: span 1;
}

.project-image {
  position: relative;
  height: 220px;
  overflow: hidden;
}

.project-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s ease;
}

.project-card:hover .project-image img {
  transform: scale(1.05);
}

.project-overlay {
  position: absolute;
  inset: 0;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.project-card:hover .project-overlay {
  opacity: 1;
}

.project-link {
  padding: 0.75rem 1.5rem;
  background: white;
  color: #1a1a2e;
  border-radius: 8px;
  text-decoration: none;
  font-weight: 500;
  transition: all 0.3s ease;
}

.project-link:hover {
  background: #4ade80;
  color: white;
}

.project-info {
  padding: 1.5rem;
}

.project-info h3 {
  font-size: 1.25rem;
  font-weight: 600;
  color: #1a1a2e;
  margin-bottom: 0.75rem;
}

.project-info p {
  color: #64748b;
  line-height: 1.6;
  margin-bottom: 1rem;
}

.tech-stack {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 1rem;
}

.tech-tag {
  padding: 0.25rem 0.75rem;
  background: #f1f5f9;
  border-radius: 50px;
  font-size: 0.8rem;
  color: #64748b;
}

.project-links {
  display: flex;
  gap: 1rem;
}

.project-links a {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #64748b;
  text-decoration: none;
  font-size: 0.9rem;
  transition: color 0.3s ease;
}

.project-links a:hover {
  color: #4ade80;
}

.project-links svg {
  width: 18px;
  height: 18px;
}

@media (max-width: 768px) {
  .projects-grid {
    grid-template-columns: 1fr;
  }

  .filter-tabs {
    justify-content: flex-start;
    overflow-x: auto;
    padding-bottom: 0.5rem;
  }

  .filter-tab {
    flex-shrink: 0;
  }
}
</style>
