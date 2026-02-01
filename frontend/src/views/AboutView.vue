<script setup lang="ts">
import { onMounted, ref, defineComponent, h } from 'vue'
import { api } from '@/api'
import type { AboutInfo, Skill, Experience } from '@/types'
import { ElProgress, ElSkeleton, ElTag } from 'element-plus'
import { 
  User, Place, Calendar, 
  Link, Message,
  Monitor, DataAnalysis, Cloudy
} from '@element-plus/icons-vue'

// Icons - Custom icons since Element Plus doesn't have them
const Github = defineComponent({
  render: () => h('svg', { viewBox: '0 0 24 24', fill: 'currentColor' }, [
    h('path', { d: 'M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z' })
  ])
})

const Server = defineComponent({
  render: () => h('svg', { viewBox: '0 0 24 24', fill: 'currentColor' }, [
    h('path', { d: 'M4 1h16c1.1 0 2 .9 2 2v4c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V3c0-1.1.9-2 2-2zm0 8h16c1.1 0 2 .9 2 2v4c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2v-4c0-1.1.9-2 2-2zm0 8h16c1.1 0 2 .9 2 2v4c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2v-4c0-1.1.9-2 2-2z' })
  ])
})

const OfficeBuilding = defineComponent({
  render: () => h('svg', { viewBox: '0 0 24 24', fill: 'currentColor' }, [
    h('path', { d: 'M12 7V3H2v18h20V7H12zM6 19H4v-2h2v2zm0-4H4v-2h2v2zm0-4H4V9h2v2zm0-4H4V5h2v2zm4 12H8v-2h2v2zm0-4H8v-2h2v2zm0-4H8V9h2v2zm0-4H8V5h2v2zm10 12h-8v-2h2v-2h-2v-2h2v-2h-2V9h8v10zm-2-8h-2v2h2v-2zm0 4h-2v2h2v-2z' })
  ])
})

// State
const about = ref<AboutInfo | null>(null)
const skills = ref<Skill[]>([])
const experience = ref<Experience[]>([])
const loading = ref(true)

// Computed
const categoryIcons: Record<string, any> = {
  '后端开发': Server,
  '前端开发': Monitor,
  '数据库': DataAnalysis,
  'DevOps': Cloudy,
}

const skillsByCategory = computed(() => {
  const grouped: Record<string, Skill[]> = {}
  skills.value.forEach((skill: Skill) => {
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
    <!-- Hero Section -->
    <section class="about-hero">
      <div class="hero-bg"></div>
      <div class="container">
        <div v-if="loading" class="loading">
          <el-skeleton :rows="4" animated />
        </div>
        <template v-else-if="about">
          <div class="profile-section animate-fade-in">
            <div class="avatar-wrapper">
              <div class="avatar-ring"></div>
              <img :src="about.avatar" :alt="about.name" class="avatar" />
            </div>
            <div class="profile-info">
              <div class="profile-badge animate-slide-up">
                <el-icon><User /></el-icon>
                <span>关于我</span>
              </div>
              <h1 class="profile-name animate-slide-up stagger-1">{{ about.name }}</h1>
              <p class="profile-title animate-slide-up stagger-2">{{ about.title }}</p>
        <div class="profile-meta animate-slide-up stagger-3">
          <span class="meta-item">
            <el-icon><Place /></el-icon>
            {{ about.location }}
          </span>
          <span class="meta-item">
            <el-icon><Calendar /></el-icon>
            {{ new Date().getFullYear() - 2020 }}+ 年经验
          </span>
        </div>
        <p class="profile-bio animate-slide-up stagger-4">{{ about.bio }}</p>
        <div class="social-links animate-slide-up stagger-5">
          <a :href="about.socialLinks.github" target="_blank" rel="noopener noreferrer" class="social-btn">
            <el-icon :size="20"><Github /></el-icon>
          </a>
          <a :href="about.socialLinks.linkedin" target="_blank" rel="noopener noreferrer" class="social-btn">
            <el-icon :size="20"><Link /></el-icon>
          </a>
          <a :href="`mailto:${about.email}`" class="social-btn">
            <el-icon :size="20"><Message /></el-icon>
          </a>
        </div>
            </div>
          </div>
        </template>
      </div>
    </section>

    <!-- Skills Section -->
    <section class="skills-section">
      <div class="container">
        <div class="section-header animate-fade-in">
          <h2 class="section-title">技术栈</h2>
          <p class="section-subtitle">不断学习，持续进步</p>
        </div>
        
        <div v-for="(categorySkills, category) in skillsByCategory" :key="category" class="skill-category animate-slide-up">
          <div class="category-header">
            <div class="category-icon">
              <el-icon :size="24"><component :is="categoryIcons[category] || Server" /></el-icon>
            </div>
            <h3 class="category-title">{{ category }}</h3>
          </div>
          <div class="skills-grid">
            <div 
              v-for="(skill, index) in categorySkills" 
              :key="skill.name" 
              class="skill-card"
              :style="{ animationDelay: `${index * 0.05}s` }"
            >
              <div class="skill-header">
                <span class="skill-name">{{ skill.name }}</span>
                <span class="skill-percent">{{ skill.proficiency }}%</span>
              </div>
              <el-progress 
                :percentage="skill.proficiency" 
                :stroke-width="8"
                :show-text="false"
                class="skill-progress-bar"
              />
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Experience Section -->
    <section class="experience-section">
      <div class="container">
        <div class="section-header animate-fade-in">
          <h2 class="section-title">工作经历</h2>
          <p class="section-subtitle">经验积累，厚积薄发</p>
        </div>
        
        <div class="timeline">
          <div 
            v-for="(exp, index) in experience" 
            :key="exp.id" 
            class="timeline-item animate-slide-up"
            :style="{ animationDelay: `${index * 0.1}s` }"
          >
            <div class="timeline-marker">
              <div class="marker-dot"></div>
            </div>
            <div class="timeline-content">
              <div class="timeline-header">
                <div class="header-title">
                  <h3 class="position">{{ exp.position }}</h3>
                  <span class="company">
                    <el-icon><OfficeBuilding /></el-icon>
                    {{ exp.company }}
                  </span>
                </div>
                <span class="period">
                  {{ exp.startDate }} - {{ exp.current ? '至今' : exp.endDate }}
                </span>
              </div>
              <p class="description">{{ exp.description }}</p>
              <div class="tech-tags">
                <el-tag 
                  v-for="tech in exp.techStack" 
                  :key="tech" 
                  size="small"
                  effect="plain"
                >
                  {{ tech }}
                </el-tag>
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

/* Hero Section */
.about-hero {
  padding: 4rem 0 6rem;
  background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%);
  position: relative;
  overflow: hidden;
}

.hero-bg {
  position: absolute;
  inset: 0;
  background-image: 
    radial-gradient(circle at 30% 20%, rgba(64, 158, 255, 0.08) 0%, transparent 50%),
    radial-gradient(circle at 70% 80%, rgba(103, 194, 58, 0.05) 0%, transparent 50%);
  pointer-events: none;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
  position: relative;
  z-index: 1;
}

.loading {
  padding: 4rem 0;
}

.profile-section {
  display: grid;
  grid-template-columns: 280px 1fr;
  gap: 4rem;
  align-items: start;
}

.avatar-wrapper {
  position: relative;
  width: 280px;
  height: 280px;
}

.avatar-ring {
  position: absolute;
  inset: -8px;
  border-radius: 50%;
  background: linear-gradient(135deg, var(--color-primary, #409EFF) 0%, #337ecc 100%);
  opacity: 0.2;
  animation: pulse-ring 2s ease-in-out infinite;
}

@keyframes pulse-ring {
  0%, 100% {
    transform: scale(1);
    opacity: 0.2;
  }
  50% {
    transform: scale(1.05);
    opacity: 0.3;
  }
}

.avatar {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 20px;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
}

.profile-info {
  padding-top: 1rem;
}

.profile-badge {
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

.profile-name {
  font-size: 2.75rem;
  font-weight: 700;
  color: #1a1a2e;
  margin-bottom: 0.5rem;
}

.profile-title {
  font-size: 1.375rem;
  color: var(--color-primary, #409EFF);
  font-weight: 500;
  margin-bottom: 1rem;
}

.profile-meta {
  display: flex;
  gap: 1.5rem;
  margin-bottom: 1.5rem;
}

.meta-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #64748b;
  font-size: 0.9rem;
}

.meta-item .el-icon {
  color: var(--color-primary, #409EFF);
}

.profile-bio {
  color: #4b5563;
  line-height: 1.8;
  max-width: 600px;
  margin-bottom: 2rem;
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
  background: white;
  border-radius: 12px;
  color: #4b5563;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05);
  transition: all 0.3s ease;
}

.social-btn:hover {
  background: var(--color-primary, #409EFF);
  color: white;
  transform: translateY(-3px);
  box-shadow: 0 6px 20px rgba(64, 158, 255, 0.3);
}

/* Skills Section */
.skills-section,
.experience-section {
  padding: 5rem 0;
}

.section-header {
  text-align: center;
  margin-bottom: 3rem;
}

.section-title {
  font-size: 2rem;
  font-weight: 700;
  color: #1a1a2e;
  margin-bottom: 0.5rem;
}

.section-subtitle {
  text-align: center;
  color: #64748b;
}

.skill-category {
  margin-bottom: 3rem;
}

.category-header {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1.5rem;
}

.category-icon {
  width: 48px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, rgba(64, 158, 255, 0.1) 0%, rgba(64, 158, 255, 0.05) 100%);
  border-radius: 12px;
  color: var(--color-primary, #409EFF);
}

.category-title {
  font-size: 1.25rem;
  font-weight: 600;
  color: #1a1a2e;
}

.skills-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 1.5rem;
}

.skill-card {
  background: white;
  padding: 1.5rem;
  border-radius: 16px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05);
  transition: all 0.3s ease;
  animation: fadeIn 0.5s ease forwards;
  opacity: 0;
}

.skill-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
}

.skill-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
}

.skill-name {
  font-weight: 500;
  color: #1a1a2e;
}

.skill-percent {
  font-size: 0.875rem;
  color: var(--color-primary, #409EFF);
  font-weight: 600;
}

.skill-progress-bar {
  --el-progress-bg-color: var(--color-primary, #409EFF);
}

/* Timeline */
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
  background: linear-gradient(180deg, var(--color-primary, #409EFF) 0%, #e5e7eb 100%);
}

.timeline-item {
  position: relative;
  padding-bottom: 2.5rem;
  animation: fadeIn 0.5s ease forwards;
  opacity: 0;
}

.timeline-item:last-child {
  padding-bottom: 0;
}

.timeline-marker {
  position: absolute;
  left: -2rem;
  top: 0;
  width: 16px;
  height: 16px;
  transform: translateX(-7px);
}

.marker-dot {
  width: 100%;
  height: 100%;
  background: white;
  border: 3px solid var(--color-primary, #409EFF);
  border-radius: 50%;
  transition: all 0.3s ease;
}

.timeline-item:hover .marker-dot {
  background: var(--color-primary, #409EFF);
  transform: scale(1.2);
}

.timeline-content {
  background: white;
  padding: 1.5rem;
  border-radius: 16px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05);
  transition: all 0.3s ease;
}

.timeline-item:hover .timeline-content {
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
}

.timeline-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 0.75rem;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.header-title {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.position {
  font-size: 1.125rem;
  font-weight: 600;
  color: #1a1a2e;
}

.company {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: var(--color-primary, #409EFF);
  font-weight: 500;
  font-size: 0.9rem;
}

.period {
  font-size: 0.875rem;
  color: #64748b;
  background: #f1f5f9;
  padding: 0.25rem 0.75rem;
  border-radius: 50px;
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

@media (max-width: 1024px) {
  .profile-section {
    grid-template-columns: 1fr;
    text-align: center;
    gap: 2rem;
  }

  .avatar-wrapper {
    margin: 0 auto;
  }

  .profile-meta {
    justify-content: center;
  }

  .profile-bio {
    margin-left: auto;
    margin-right: auto;
  }

  .social-links {
    justify-content: center;
  }
}

@media (max-width: 640px) {
  .profile-name {
    font-size: 2rem;
  }

  .skills-grid {
    grid-template-columns: 1fr;
  }

  .timeline-header {
    flex-direction: column;
    align-items: flex-start;
  }
}
</style>
