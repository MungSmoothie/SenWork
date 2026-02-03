<script setup lang="ts">
import { ref, onMounted, computed, defineComponent, h } from 'vue'
import { api } from '@/api'
import type { Service } from '@/types'
import { ElSkeleton, ElTag } from 'element-plus'

// Inline SVG Icons
const Monitor = defineComponent({
  render: () => h('svg', { viewBox: '0 0 24 24', fill: 'currentColor' }, [
    h('path', { d: 'M20 18c1.1 0 1.99-.9 1.99-2L22 6c0-1.1-.9-2-2-2H4c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2H0v2h24v-2h-4zM4 6h16v10H4V6z' })
  ])
})

const Chip = defineComponent({
  render: () => h('svg', { viewBox: '0 0 24 24', fill: 'currentColor' }, [
    h('path', { d: 'M6 4h12v2h2v2h-2v3h2v2h-2v3h2v2H4v-2h2v-2H4v-3H2V8h2V6H4c-1.1 0-2-.9-2-2zm0 2v2h12V6H6zm0 4v2h12v-2H6zm0 4v2h12v-2H6zm0 4v2h12v-2H6zm0 4v2h12v-2H6z' })
  ])
})

const Cloudy = defineComponent({
  render: () => h('svg', { viewBox: '0 0 24 24', fill: 'currentColor' }, [
    h('path', { d: 'M19.35 10.04C18.67 6.59 15.64 4 12 4 9.11 4 6.6 5.64 5.35 8.04 2.34 8.36 0 10.91 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96z' })
  ])
})

const Box = defineComponent({
  render: () => h('svg', { viewBox: '0 0 24 24', fill: 'currentColor' }, [
    h('path', { d: 'M21 3L3 10.53v.98l6.84 2.65L12.48 21h.98L21 3z' })
  ])
})

const Mobile = defineComponent({
  render: () => h('svg', { viewBox: '0 0 24 24', fill: 'currentColor' }, [
    h('path', { d: 'M17 1.01L7 1c-1.1 0-2 .9-2 2v18c0 1.1.9 2 2 2h10c1.1 0 2-.9 2-2V3c0-1.1-.9-1.99-2-1.99zM17 19H7V5h10v14z' })
  ])
})

const Document = defineComponent({
  render: () => h('svg', { viewBox: '0 0 24 24', fill: 'currentColor' }, [
    h('path', { d: 'M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z' })
  ])
})

const Reading = defineComponent({
  render: () => h('svg', { viewBox: '0 0 24 24', fill: 'currentColor' }, [
    h('path', { d: 'M21 5c-1.11-.35-2.33-.5-3.5-.5-1.95 0-4.05.4-5.5 1.5-1.45-1.1-3.55-1.5-5.5-1.5S2.45 4.9 1 6v14.65c0 .25.25.5.5.5.1 0 .15-.05.25-.05C3.1 20.45 5.05 20 6.5 20c1.95 0 4.05.4 5.5 1.5 1.35-.85 3.8-1.5 5.5-1.5 1.65 0 3.35.3 4.75 1.05.1.05.15.05.25.05.25 0 .5-.25.5-.5V6c-.6-.45-1.25-.75-2-1zm0 13.5c-1.1-.35-2.3-.5-3.5-.5-1.7 0-4.15.65-5.5 1.5V8c1.35-.85 3.8-1.5 5.5-1.5 1.2 0 2.4.15 3.5.5v11.5z' })
  ])
})

const ArrowRight = defineComponent({
  render: () => h('svg', { viewBox: '0 0 24 24', fill: 'currentColor' }, [
    h('path', { d: 'M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z' })
  ])
})

const Check = defineComponent({
  render: () => h('svg', { viewBox: '0 0 24 24', fill: 'currentColor' }, [
    h('path', { d: 'M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z' })
  ])
})

// State
const services = ref<Service[]>([])
const loading = ref(true)
const selectedCategory = ref('all')

// Icons mapping
const categoryIcons: Record<string, any> = {
  'golang': Monitor,
  'ai-agent': Chip,
  'cloud-native': Cloudy,
  'app': Mobile,
  'web': Box,
  'other': Document
}

const categoryNames: Record<string, string> = {
  'golang': 'Go 开发',
  'ai-agent': 'AI Agent',
  'cloud-native': '云原生',
  'app': '移动端',
  'web': 'Web 开发',
  'other': '其他服务'
}

// Computed
const categories = computed(() => {
  const cats = new Set(services.value.map(s => s.category))
  return ['all', ...Array.from(cats)]
})

const filteredServices = computed(() => {
  if (selectedCategory.value === 'all') {
    return services.value
  }
  return services.value.filter(s => s.category === selectedCategory.value)
})

// Methods
const getCategoryIcon = (category: string) => {
  return categoryIcons[category] || Document
}

const getCategoryName = (category: string) => {
  return categoryNames[category] || category
}

const selectCategory = (category: string) => {
  selectedCategory.value = category
}

// Lifecycle
onMounted(async () => {
  try {
    const response = await api.getServices()
    if (response.success && response.data) {
      services.value = response.data
    }
  } catch (error) {
    console.error('Failed to load services:', error)
  } finally {
    loading.value = false
  }
})
</script>

<template>
  <div class="services-page">
    <!-- Hero Section -->
    <section class="hero">
      <div class="hero-content">
        <h1 class="hero-title">
          <span class="gradient-text">专业服务</span>
          <span class="subtitle">为您的技术需求提供最佳解决方案</span>
        </h1>
      </div>
    </section>

    <!-- Category Filter -->
    <section class="categories">
      <div class="category-tabs">
        <button
          v-for="category in categories"
          :key="category"
          class="category-tab"
          :class="{ active: selectedCategory === category }"
          @click="selectCategory(category)"
        >
          {{ category === 'all' ? '全部服务' : getCategoryName(category) }}
        </button>
      </div>
    </section>

    <!-- Services Grid -->
    <section class="services-grid-section">
      <div class="container">
        <div v-if="loading" class="loading-container">
          <el-skeleton :rows="4" animated />
        </div>

        <div v-else class="services-grid">
          <div
            v-for="service in filteredServices"
            :key="service.id"
            class="service-card"
            :class="{ featured: service.featured, popular: service.popular }"
          >
            <!-- Popular Badge -->
            <div v-if="service.popular" class="popular-badge">热门</div>
            
            <!-- Featured Badge -->
            <div v-if="service.featured" class="featured-badge">推荐</div>

            <!-- Icon -->
            <div class="service-icon">
              <el-icon :size="32">
                <component :is="getCategoryIcon(service.category)" />
              </el-icon>
            </div>

            <!-- Content -->
            <h3 class="service-name">{{ service.name }}</h3>
            <p class="service-short-desc">{{ service.shortDesc }}</p>
            
            <!-- Features -->
            <ul class="service-features">
              <li v-for="feature in service.features.slice(0, 4)" :key="feature">
                <el-icon><Check /></el-icon>
                {{ feature }}
              </li>
            </ul>

            <!-- Price & Delivery -->
            <div class="service-meta">
              <div class="price">{{ service.priceRange }}</div>
              <div class="delivery">{{ service.deliveryTime }}</div>
            </div>

            <!-- Tech Stack -->
            <div class="service-tech">
              <el-tag
                v-for="tech in service.techStack.slice(0, 3)"
                :key="tech"
                size="small"
                type="info"
              >
                {{ tech }}
              </el-tag>
            </div>

            <!-- CTA -->
            <router-link to="/contact" class="service-cta">
              立即咨询
              <el-icon><ArrowRight /></el-icon>
            </router-link>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA Section -->
    <section class="cta-section">
      <div class="cta-content">
        <h2>需要定制化服务？</h2>
        <p>告诉我您的需求，为您量身定制解决方案</p>
        <router-link to="/contact" class="cta-button">
          联系我
          <el-icon><ArrowRight /></el-icon>
        </router-link>
      </div>
    </section>
  </div>
</template>

<style scoped lang="scss">
.services-page {
  min-height: 100vh;
  background: linear-gradient(180deg, #0a0a0f 0%, #1a1a2e 100%);
}

// Hero
.hero {
  padding: 80px 20px;
  text-align: center;
  background: linear-gradient(135deg, rgba(99, 102, 241, 0.1) 0%, rgba(139, 92, 246, 0.1) 100%);
}

.hero-title {
  .gradient-text {
    display: block;
    font-size: 48px;
    font-weight: 700;
    background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 50%, #a855f7 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  .subtitle {
    display: block;
    margin-top: 16px;
    font-size: 18px;
    color: #94a3b8;
  }
}

// Categories
.categories {
  padding: 40px 20px;
  overflow-x: auto;
}

.category-tabs {
  display: flex;
  gap: 12px;
  justify-content: center;
  min-width: max-content;
  padding: 0 20px;
}

.category-tab {
  padding: 12px 24px;
  border: 2px solid rgba(99, 102, 241, 0.3);
  border-radius: 30px;
  background: transparent;
  color: #94a3b8;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    border-color: rgba(99, 102, 241, 0.6);
    color: #fff;
  }

  &.active {
    background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%);
    border-color: transparent;
    color: #fff;
  }
}

// Services Grid
.services-grid-section {
  padding: 40px 20px 80px;
}

.container {
  max-width: 1400px;
  margin: 0 auto;
}

.services-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(380px, 1fr));
  gap: 30px;
}

.service-card {
  position: relative;
  padding: 32px;
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 20px;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);

  &:hover {
    transform: translateY(-8px);
    background: rgba(255, 255, 255, 0.05);
    border-color: rgba(99, 102, 241, 0.4);
    box-shadow: 0 20px 40px rgba(99, 102, 241, 0.15);
  }

  &.featured {
    border-color: rgba(99, 102, 241, 0.5);
    background: linear-gradient(135deg, rgba(99, 102, 241, 0.08) 0%, rgba(139, 92, 246, 0.05) 100%);
  }

  &.popular {
    .popular-badge {
      position: absolute;
      top: 16px;
      right: 16px;
      padding: 4px 12px;
      background: linear-gradient(135deg, #f59e0b 0%, #ef4444 100%);
      border-radius: 20px;
      font-size: 12px;
      font-weight: 600;
      color: #fff;
    }
  }

  .featured-badge {
    position: absolute;
    top: 16px;
    right: 16px;
    padding: 4px 12px;
    background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%);
    border-radius: 20px;
    font-size: 12px;
    font-weight: 600;
    color: #fff;
  }
}

.service-icon {
  width: 64px;
  height: 64px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, rgba(99, 102, 241, 0.2) 0%, rgba(139, 92, 246, 0.2) 100%);
  border-radius: 16px;
  margin-bottom: 20px;
  color: #8b5cf6;
}

.service-name {
  font-size: 22px;
  font-weight: 600;
  color: #fff;
  margin-bottom: 12px;
}

.service-short-desc {
  font-size: 14px;
  color: #94a3b8;
  line-height: 1.6;
  margin-bottom: 20px;
}

.service-features {
  list-style: none;
  padding: 0;
  margin: 0 0 20px;

  li {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 8px 0;
    font-size: 14px;
    color: #cbd5e1;

    .el-icon {
      color: #10b981;
    }
  }
}

.service-meta {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 0;
  border-top: 1px solid rgba(255, 255, 255, 0.08);
  margin-bottom: 16px;

  .price {
    font-size: 18px;
    font-weight: 600;
    color: #8b5cf6;
  }

  .delivery {
    font-size: 13px;
    color: #94a3b8;
  }
}

.service-tech {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 20px;
}

.service-cta {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  width: 100%;
  padding: 14px;
  background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%);
  border-radius: 12px;
  color: #fff;
  font-size: 15px;
  font-weight: 500;
  text-decoration: none;
  transition: all 0.3s ease;

  &:hover {
    transform: scale(1.02);
    box-shadow: 0 10px 30px rgba(99, 102, 241, 0.4);
  }
}

// CTA Section
.cta-section {
  padding: 80px 20px;
  background: linear-gradient(135deg, rgba(99, 102, 241, 0.15) 0%, rgba(139, 92, 246, 0.15) 100%);
  text-align: center;
}

.cta-content {
  max-width: 600px;
  margin: 0 auto;

  h2 {
    font-size: 36px;
    font-weight: 700;
    color: #fff;
    margin-bottom: 16px;
  }

  p {
    font-size: 18px;
    color: #94a3b8;
    margin-bottom: 32px;
  }
}

.cta-button {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 16px 40px;
  background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%);
  border-radius: 30px;
  color: #fff;
  font-size: 16px;
  font-weight: 600;
  text-decoration: none;
  transition: all 0.3s ease;

  &:hover {
    transform: scale(1.05);
    box-shadow: 0 15px 40px rgba(99, 102, 241, 0.4);
  }
}

// Loading
.loading-container {
  max-width: 800px;
  margin: 0 auto;
}

// Responsive
@media (max-width: 768px) {
  .hero-title .gradient-text {
    font-size: 32px;
  }

  .services-grid {
    grid-template-columns: 1fr;
  }

  .category-tabs {
    justify-content: flex-start;
  }
}
</style>
