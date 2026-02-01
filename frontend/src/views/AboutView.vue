<script setup lang="ts">
import { onMounted, ref, computed } from 'vue'
import { api } from '@/api'
import type { AboutInfo, Skill, Experience } from '@/types'

const about = ref<AboutInfo | null>(null)
const skills = ref<Skill[]>([])
const experience = ref<Experience[]>([])
const loading = ref(true)

const categories = computed(() => {
  const cats = new Set(skills.value.map(s => s.category))
  return Array.from(cats)
})

const skillsByCategory = computed(() => {
  const grouped: Record<string, Skill[]> = {}
  skills.value.forEach(skill => {
    if (!grouped[skill.category]) {
      grouped[skill.category] = []
    }
    grouped[skill.category]!.push(skill)
  })
  return grouped
})

onMounted(async () => {
  try {
    const [aboutRes, skillsRes, expRes] = await Promise.all([
      api.getAbout(),
      api.getSkills(),
      api.getExperience(),
    ])
    if (aboutRes.success && aboutRes.data) about.value = aboutRes.data
    if (skillsRes.success && skillsRes.data) skills.value = skillsRes.data
    if (expRes.success && expRes.data) experience.value = expRes.data
  } catch (e) {
    console.error('Failed to load data:', e)
  } finally {
    loading.value = false
  }
})
</script>

<template>
  <div class="about-page">
    <section class="about-hero">
      <div class="container">
        <div v-if="loading" class="loading">
          <div class="spinner"></div>
        </div>
        <template v-else-if="about">
          <div class="profile-section">
            <div class="avatar-wrapper">
              <img :src="about.avatar" :alt="about.name" class="avatar" />
            </div>
            <div class="profile-info">
              <h1>{{ about.name }}</h1>
              <p class="title">{{ about.title }}</p>
              <p class="location">📍 {{ about.location }}</p>
              <p class="bio">{{ about.bio }}</p>
              <div class="social-links">
                <a :href="about.socialLinks.github" target="_blank" rel="noopener noreferrer">
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
                  </svg>
                </a>
                <a :href="about.socialLinks.linkedin" target="_blank" rel="noopener noreferrer">
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                </a>
                <a :href="`mailto:${about.email}`">
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </template>
      </div>
    </section>

    <section class="skills-section">
      <div class="container">
        <h2 class="section-title">技术栈</h2>
        <p class="section-subtitle">不断学习，持续进步</p>
        <div v-for="category in categories" :key="category" class="skill-category">
          <h3 class="category-title">{{ category }}</h3>
          <div class="skills-grid">
            <div v-for="skill in skillsByCategory[category]" :key="skill.name" class="skill-card">
              <div class="skill-header">
                <span class="skill-name">{{ skill.name }}</span>
                <span class="skill-percent">{{ skill.proficiency }}%</span>
              </div>
              <div class="skill-bar">
                <div class="skill-progress" :style="{ width: `${skill.proficiency}%` }"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="experience-section">
      <div class="container">
        <h2 class="section-title">工作经历</h2>
        <p class="section-subtitle">经验积累，厚积薄发</p>
        <div class="timeline">
          <div v-for="exp in experience" :key="exp.id" class="timeline-item">
            <div class="timeline-marker"></div>
            <div class="timeline-content">
              <div class="timeline-header">
                <h3 class="position">{{ exp.position }}</h3>
                <span class="period">
                  {{ exp.startDate }} - {{ exp.current ? '至今' : exp.endDate }}
                </span>
              </div>
              <p class="company">{{ exp.company }}</p>
              <p class="description">{{ exp.description }}</p>
              <div class="tech-tags">
                <span v-for="tech in exp.techStack" :key="tech" class="tech-tag">
                  {{ tech }}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
.about-page {
  padding-top: 80px;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
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

.about-hero {
  padding: 4rem 0;
  background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%);
}

.profile-section {
  display: grid;
  grid-template-columns: 200px 1fr;
  gap: 3rem;
  align-items: start;
}

.avatar-wrapper {
  width: 200px;
  height: 200px;
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
}

.avatar {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.profile-info h1 {
  font-size: 2.5rem;
  font-weight: 700;
  color: #1a1a2e;
  margin-bottom: 0.5rem;
}

.title {
  font-size: 1.25rem;
  color: #4ade80;
  font-weight: 500;
  margin-bottom: 0.5rem;
}

.location {
  color: #64748b;
  margin-bottom: 1rem;
}

.bio {
  color: #4b5563;
  line-height: 1.8;
  max-width: 600px;
}

.social-links {
  display: flex;
  gap: 1rem;
  margin-top: 1.5rem;
}

.social-links a {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 44px;
  height: 44px;
  background: white;
  border-radius: 12px;
  color: #4b5563;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05);
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

.skills-section,
.experience-section {
  padding: 5rem 0;
}

.section-title {
  font-size: 2rem;
  font-weight: 700;
  color: #1a1a2e;
  text-align: center;
  margin-bottom: 0.5rem;
}

.section-subtitle {
  text-align: center;
  color: #64748b;
  margin-bottom: 3rem;
}

.skill-category {
  margin-bottom: 3rem;
}

.category-title {
  font-size: 1.25rem;
  font-weight: 600;
  color: #1a1a2e;
  margin-bottom: 1.5rem;
}

.skills-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 1.5rem;
}

.skill-card {
  background: white;
  padding: 1.25rem;
  border-radius: 12px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05);
}

.skill-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.75rem;
}

.skill-name {
  font-weight: 500;
  color: #1a1a2e;
}

.skill-percent {
  font-size: 0.875rem;
  color: #4ade80;
  font-weight: 600;
}

.skill-bar {
  height: 8px;
  background: #f1f5f9;
  border-radius: 4px;
  overflow: hidden;
}

.skill-progress {
  height: 100%;
  background: linear-gradient(90deg, #4ade80, #22c55e);
  border-radius: 4px;
  transition: width 0.8s ease;
}

.timeline {
  position: relative;
  padding-left: 2rem;
}

.timeline::before {
  content: '';
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  width: 2px;
  background: #e5e7eb;
}

.timeline-item {
  position: relative;
  padding-bottom: 3rem;
}

.timeline-item:last-child {
  padding-bottom: 0;
}

.timeline-marker {
  position: absolute;
  left: -2rem;
  top: 0;
  width: 12px;
  height: 12px;
  background: #4ade80;
  border-radius: 50%;
  transform: translateX(-5px);
}

.timeline-content {
  background: white;
  padding: 1.5rem;
  border-radius: 12px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05);
}

.timeline-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 0.5rem;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.position {
  font-size: 1.125rem;
  font-weight: 600;
  color: #1a1a2e;
}

.period {
  font-size: 0.875rem;
  color: #64748b;
}

.company {
  color: #4ade80;
  font-weight: 500;
  margin-bottom: 0.75rem;
}

.description {
  color: #4b5563;
  line-height: 1.7;
  margin-bottom: 1rem;
}

.tech-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.tech-tag {
  padding: 0.25rem 0.75rem;
  background: #f1f5f9;
  border-radius: 50px;
  font-size: 0.8rem;
  color: #64748b;
}

@media (max-width: 768px) {
  .profile-section {
    grid-template-columns: 1fr;
    text-align: center;
  }

  .avatar-wrapper {
    margin: 0 auto;
  }

  .social-links {
    justify-content: center;
  }

  .skills-grid {
    grid-template-columns: 1fr;
  }
}
</style>
