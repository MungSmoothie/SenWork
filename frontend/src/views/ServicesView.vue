<script setup lang="ts">
import { onMounted, ref, computed } from 'vue'
import { api } from '@/api'
import type { Service, ServiceCategory } from '@/types'
import Card from '@/components/ui/Card.vue'
import Button from '@/components/ui/Button.vue'
import Modal from '@/components/ui/Modal.vue'
import Loading from '@/components/ui/Loading.vue'

const services = ref<Service[]>([])
const loading = ref(true)
const selectedCategory = ref<ServiceCategory | 'all'>('all')
const selectedService = ref<Service | null>(null)

const categories = computed((): Array<ServiceCategory | 'all'> => {
  const cats = new Set<ServiceCategory | 'all'>()
  cats.add('all')
  services.value.forEach(s => cats.add(s.category))
  return Array.from(cats)
})

const filteredServices = computed(() => {
  if (selectedCategory.value === 'all') {
    return services.value
  }
  return services.value.filter(s => s.category === selectedCategory.value)
})

const featuredServices = computed(() => {
  return services.value.filter(s => s.featured)
})

const categoryColor = (category: ServiceCategory): string => {
  const colors: Record<ServiceCategory, string> = {
    golang: '#00ADD8',
    'ai-agent': '#FF6B6B',
    'cloud-native': '#4ECDC4',
    app: '#9B59B6',
    web: '#4ADE80',
    other: '#64748B',
  }
  return colors[category] || '#64748B'
}

const categoryLabel = (category: ServiceCategory): string => {
  const labels: Record<ServiceCategory, string> = {
    golang: 'Go 开发',
    'ai-agent': 'AI Agent 开发',
    'cloud-native': '云原生开发',
    app: 'App 开发',
    web: 'Web 开发',
    other: '其他服务',
  }
  return labels[category] || category
}

const formatPrice = (price: string): string => {
  return price
}

onMounted(async () => {
  try {
    console.log('正在加载服务列表...')
    const res = await api.getServices()
    console.log('API 响应:', res)
    if (res.success && res.data) {
      services.value = res.data
      console.log('已加载服务数量:', services.value.length)
    } else {
      console.warn('API 返回失败:', res)
    }
  } catch (e) {
    console.error('加载服务失败:', e)
  } finally {
    loading.value = false
  }
})
</script>

<template>
  <div class="services-page">
    <!-- Hero Section -->
    <section class="services-hero">
      <div class="container">
        <h1 class="page-title">专业服务</h1>
        <p class="page-subtitle">
          为您提供 Golang 后端开发、AI Agent 开发、云原生架构等专业技术服务
        </p>
        
        <!-- 核心优势 -->
        <div class="advantages">
          <div class="advantage-item">
            <span class="advantage-icon">⚡</span>
            <span class="advantage-text">快速响应</span>
          </div>
          <div class="advantage-item">
            <span class="advantage-icon">🎯</span>
            <span class="advantage-text">专业可靠</span>
          </div>
          <div class="advantage-item">
            <span class="advantage-icon">💰</span>
            <span class="advantage-text">透明定价</span>
          </div>
          <div class="advantage-item">
            <span class="advantage-icon">🔧</span>
            <span class="advantage-text">售后支持</span>
          </div>
        </div>
      </div>
    </section>

    <!-- Featured Services -->
    <section v-if="featuredServices.length > 0" class="featured-section">
      <div class="container">
        <h2 class="section-title">精选服务</h2>
        <div class="featured-grid">
          <Card
            v-for="service in featuredServices"
            :key="service.id"
            hoverable
            class="featured-card"
            @click="selectedService = service"
          >
            <div class="featured-badge">精选</div>
            <div class="service-icon" :style="{ background: `${categoryColor(service.category)}20`, color: categoryColor(service.category) }">
              {{ service.name.charAt(0) }}
            </div>
            <h3 class="service-name">{{ service.name }}</h3>
            <p class="service-short-desc">{{ service.shortDesc }}</p>
            <div class="service-meta">
              <span class="price">{{ service.priceRange }}</span>
              <span class="delivery">{{ service.deliveryTime }}</span>
            </div>
            <Button variant="primary" size="sm" class="mt-4">
              了解详情
            </Button>
          </Card>
        </div>
      </div>
    </section>

    <!-- All Services -->
    <section class="all-services-section">
      <div class="container">
        <div class="section-header">
          <h2 class="section-title">全部服务</h2>
          
          <!-- Category Filter -->
          <div class="category-filter">
            <button
              v-for="cat in categories"
              :key="cat"
              :class="['filter-btn', { active: selectedCategory === cat }]"
              @click="selectedCategory = cat"
            >
              {{ cat === 'all' ? '全部' : categoryLabel(cat) }}
            </button>
          </div>
        </div>

        <div v-if="loading" class="loading-container">
          <Loading size="lg" text="加载服务列表..." />
        </div>

        <div v-else class="services-grid">
          <Card
            v-for="service in filteredServices"
            :key="service.id"
            hoverable
            class="service-card"
            @click="selectedService = service"
          >
            <div class="service-header">
              <div class="service-icon" :style="{ background: `${categoryColor(service.category)}20`, color: categoryColor(service.category) }">
                {{ service.name.charAt(0) }}
              </div>
              <div class="service-info">
                <span class="category-tag" :style="{ background: `${categoryColor(service.category)}20`, color: categoryColor(service.category) }">
                  {{ categoryLabel(service.category) }}
                </span>
                <span v-if="service.popular" class="popular-badge">热门</span>
              </div>
            </div>
            
            <h3 class="service-name">{{ service.name }}</h3>
            <p class="service-short-desc">{{ service.shortDesc }}</p>
            
            <div class="service-features">
              <span
                v-for="feature in service.features.slice(0, 3)"
                :key="feature"
                class="feature-tag"
              >
                {{ feature }}
              </span>
              <span v-if="service.features.length > 3" class="more-tag">
                +{{ service.features.length - 3 }}
              </span>
            </div>
            
            <div class="service-footer">
              <div class="service-price">
                <span class="price-label">起步价</span>
                <span class="price-value">{{ service.priceRange }}</span>
              </div>
              <div class="service-time">
                {{ service.deliveryTime }}
              </div>
            </div>
            
            <Button variant="primary" block class="mt-4">
              立即咨询
            </Button>
          </Card>
        </div>
      </div>
    </section>

    <!-- FAQ Section -->
    <section class="faq-section">
      <div class="container">
        <h2 class="section-title">常见问题</h2>
        <div class="faq-grid">
          <Card class="faq-card">
            <h4 class="faq-question">如何开始合作？</h4>
            <p class="faq-answer">您可以通过联系页面提交需求，或直接添加微信沟通。我会在 24 小时内回复您。</p>
          </Card>
          <Card class="faq-card">
            <h4 class="faq-question">如何收费？</h4>
            <p class="faq-answer">根据项目复杂度和工作量定价，支持按项目打包和按小时计费两种模式。</p>
          </Card>
          <Card class="faq-card">
            <h4 class="faq-question">能开发票吗？</h4>
            <p class="faq-answer">支持开发票，可开具普通发票和增值税专用发票。</p>
          </Card>
          <Card class="faq-card">
            <h4 class="faq-question">有售后支持吗？</h4>
            <p class="faq-answer">项目交付后提供免费技术支持期，修复交付时的问题。后续支持可单独协商。</p>
          </Card>
        </div>
      </div>
    </section>

    <!-- CTA Section -->
    <section class="cta-section">
      <div class="container">
        <Card class="cta-card">
          <h2 class="cta-title">有问题需要帮助？</h2>
          <p class="cta-desc">无论您有任何技术问题或项目需求，都欢迎联系我。</p>
          <div class="cta-actions">
            <Button variant="primary" size="lg" @click="$router.push('/contact')">
              立即联系
            </Button>
            <Button variant="outline" size="lg" @click="$router.push('/about')">
              了解更多
            </Button>
          </div>
        </Card>
      </div>
    </section>

    <!-- Service Detail Modal -->
    <Modal
      :open="!!selectedService"
      :title="selectedService?.name || ''"
      size="lg"
      @close="selectedService = null"
    >
      <template v-if="selectedService">
        <div class="service-detail">
          <div class="detail-header">
            <span class="category-tag" :style="{ background: `${categoryColor(selectedService.category)}20`, color: categoryColor(selectedService.category) }">
              {{ categoryLabel(selectedService.category) }}
            </span>
            <span v-if="selectedService.popular" class="popular-badge">热门</span>
          </div>
          
          <p class="full-desc">{{ selectedService.fullDesc }}</p>
          
          <div class="detail-section">
            <h4>服务内容</h4>
            <ul class="feature-list">
              <li v-for="feature in selectedService.features" :key="feature">
                <svg class="check-icon" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
                </svg>
                {{ feature }}
              </li>
            </ul>
          </div>
          
          <div class="detail-section">
            <h4>交付物</h4>
            <ul class="feature-list">
              <li v-for="item in selectedService.deliverables" :key="item">
                <svg class="check-icon" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
                </svg>
                {{ item }}
              </li>
            </ul>
          </div>
          
          <div v-if="selectedService.techStack.length > 0" class="detail-section">
            <h4>技术栈</h4>
            <div class="tech-stack">
              <span v-for="tech in selectedService.techStack" :key="tech" class="tech-tag">
                {{ tech }}
              </span>
            </div>
          </div>
          
          <div class="detail-footer">
            <div class="price-info">
              <span class="price-label">起步价</span>
              <span class="price-value">{{ selectedService.priceRange }}</span>
            </div>
            <div class="time-info">
              <span class="time-label">预计周期</span>
              <span class="time-value">{{ selectedService.deliveryTime }}</span>
            </div>
          </div>
        </div>
      </template>
      <template #footer>
        <Button variant="outline" @click="selectedService = null">关闭</Button>
        <Button variant="primary" @click="$router.push('/contact')">立即咨询</Button>
      </template>
    </Modal>
  </div>
</template>

<style scoped>
.services-page {
  padding-top: 80px;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
}

/* Hero Section */
.services-hero {
  padding: 6rem 0 4rem;
  background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%);
  text-align: center;
}

.page-title {
  font-size: 3rem;
  font-weight: 800;
  color: #1a1a2e;
  margin-bottom: 1rem;
}

.page-subtitle {
  font-size: 1.25rem;
  color: #64748b;
  max-width: 600px;
  margin: 0 auto 3rem;
}

.advantages {
  display: flex;
  justify-content: center;
  gap: 3rem;
  flex-wrap: wrap;
}

.advantage-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #64748b;
}

.advantage-icon {
  font-size: 1.5rem;
}

/* Section Titles */
.section-title {
  font-size: 2rem;
  font-weight: 700;
  color: #1a1a2e;
  text-align: center;
  margin-bottom: 3rem;
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 1rem;
  margin-bottom: 2rem;
}

.section-header .section-title {
  margin-bottom: 0;
  text-align: left;
}

/* Category Filter */
.category-filter {
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
}

.filter-btn {
  padding: 0.5rem 1.25rem;
  border-radius: 50px;
  background: white;
  border: 1px solid #e2e8f0;
  color: #64748b;
  font-size: 0.875rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
}

.filter-btn:hover {
  border-color: #4ade80;
  color: #4ade80;
}

.filter-btn.active {
  background: #4ade80;
  border-color: #4ade80;
  color: white;
}

/* Featured Section */
.featured-section {
  padding: 5rem 0;
  background: white;
}

.featured-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
}

.featured-card {
  position: relative;
  text-align: center;
  padding: 2rem;
}

.featured-badge {
  position: absolute;
  top: 1rem;
  right: 1rem;
  padding: 0.25rem 0.75rem;
  background: linear-gradient(135deg, #4ade80 0%, #22c55e 100%);
  color: white;
  font-size: 0.75rem;
  font-weight: 600;
  border-radius: 50px;
}

.service-icon {
  width: 64px;
  height: 64px;
  border-radius: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  font-weight: 700;
  margin: 0 auto 1rem;
}

.service-name {
  font-size: 1.25rem;
  font-weight: 600;
  color: #1a1a2e;
  margin-bottom: 0.5rem;
}

.service-short-desc {
  font-size: 0.875rem;
  color: #64748b;
  margin-bottom: 1rem;
}

.service-meta {
  display: flex;
  justify-content: center;
  gap: 1rem;
  font-size: 0.875rem;
}

.service-meta .price {
  font-weight: 600;
  color: #4ade80;
}

.service-meta .delivery {
  color: #64748b;
}

/* All Services Section */
.all-services-section {
  padding: 5rem 0;
  background: #f8fafc;
}

.loading-container {
  display: flex;
  justify-content: center;
  padding: 4rem 0;
}

.services-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 1.5rem;
}

.service-card {
  padding: 1.5rem;
  cursor: pointer;
}

.service-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 1rem;
}

.service-info {
  display: flex;
  gap: 0.5rem;
}

.category-tag {
  padding: 0.25rem 0.75rem;
  border-radius: 50px;
  font-size: 0.75rem;
  font-weight: 500;
}

.popular-badge {
  padding: 0.25rem 0.75rem;
  background: #fef3c7;
  color: #d97706;
  border-radius: 50px;
  font-size: 0.75rem;
  font-weight: 500;
}

.service-features {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin: 1rem 0;
}

.feature-tag {
  padding: 0.25rem 0.5rem;
  background: #f1f5f9;
  border-radius: 4px;
  font-size: 0.75rem;
  color: #64748b;
}

.more-tag {
  font-size: 0.75rem;
  color: #94a3b8;
}

.service-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 1rem;
  border-top: 1px solid #e2e8f0;
}

.service-price {
  display: flex;
  flex-direction: column;
}

.price-label {
  font-size: 0.75rem;
  color: #94a3b8;
}

.price-value {
  font-size: 1.125rem;
  font-weight: 700;
  color: #4ade80;
}

.service-time {
  font-size: 0.875rem;
  color: #64748b;
}

/* FAQ Section */
.faq-section {
  padding: 5rem 0;
  background: white;
}

.faq-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
}

.faq-card {
  padding: 1.5rem;
}

.faq-question {
  font-size: 1rem;
  font-weight: 600;
  color: #1a1a2e;
  margin-bottom: 0.75rem;
}

.faq-answer {
  font-size: 0.875rem;
  color: #64748b;
  line-height: 1.6;
}

/* CTA Section */
.cta-section {
  padding: 5rem 0;
  background: linear-gradient(135deg, #1a1a2e 0%, #2d2d44 100%);
}

.cta-card {
  text-align: center;
  padding: 3rem;
  background: transparent;
  border: none;
  box-shadow: none;
}

.cta-title {
  font-size: 2rem;
  font-weight: 700;
  color: white;
  margin-bottom: 1rem;
}

.cta-desc {
  font-size: 1.125rem;
  color: #94a3b8;
  margin-bottom: 2rem;
}

.cta-actions {
  display: flex;
  justify-content: center;
  gap: 1rem;
  flex-wrap: wrap;
}

/* Service Detail Modal */
.service-detail {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.detail-header {
  display: flex;
  gap: 0.75rem;
}

.full-desc {
  font-size: 1rem;
  color: #4b5563;
  line-height: 1.7;
}

.detail-section h4 {
  font-size: 1rem;
  font-weight: 600;
  color: #1a1a2e;
  margin-bottom: 1rem;
}

.feature-list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.feature-list li {
  display: flex;
  align-items: flex-start;
  gap: 0.75rem;
  font-size: 0.875rem;
  color: #4b5563;
}

.check-icon {
  width: 20px;
  height: 20px;
  color: #4ade80;
  flex-shrink: 0;
}

.tech-stack {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.tech-tag {
  padding: 0.375rem 0.875rem;
  background: #f1f5f9;
  border-radius: 50px;
  font-size: 0.8rem;
  color: #64748b;
}

.detail-footer {
  display: flex;
  justify-content: space-between;
  padding-top: 1.5rem;
  border-top: 1px solid #e2e8f0;
}

.price-info,
.time-info {
  display: flex;
  flex-direction: column;
}

.price-label,
.time-label {
  font-size: 0.75rem;
  color: #94a3b8;
}

.price-value {
  font-size: 1.25rem;
  font-weight: 700;
  color: #4ade80;
}

.time-value {
  font-size: 1rem;
  font-weight: 500;
  color: #1a1a2e;
}

/* Responsive */
@media (max-width: 768px) {
  .page-title {
    font-size: 2rem;
  }
  
  .page-subtitle {
    font-size: 1rem;
  }
  
  .advantages {
    gap: 1.5rem;
  }
  
  .section-header {
    flex-direction: column;
    align-items: flex-start;
  }
  
  .services-grid {
    grid-template-columns: 1fr;
  }
  
  .cta-actions {
    flex-direction: column;
  }
}

.mt-4 {
  margin-top: 1rem;
}

.block {
  width: 100%;
}
</style>
