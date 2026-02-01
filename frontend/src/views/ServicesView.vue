<script setup lang="ts">
import { ref, defineComponent, h } from 'vue'
import { ElCard, ElButton, ElTag, ElDivider } from 'element-plus'
import {
  Edit, Document, Connection, ChatDotRound
} from '@element-plus/icons-vue'

// Custom icons
const Tool = defineComponent({
  render: () => h('svg', { viewBox: '0 0 24 24', fill: 'currentColor' }, [
    h('path', { d: 'M22.7 19l-9.1-9.1c.9-2.3.4-5-1.5-6.9-2-2-5-2.4-7.4-1.3L9 6 6 9 1.6 4.7C.4 7.1.9 10.1 2.9 12.1c1.9 1.9 4.6 2.4 6.9 1.5l9.1 9.1c.4.4 1 .4 1.4 0l2.3-2.3c.5-.4.5-1.1.1-1.4z' })
  ])
})

const BugIcon = defineComponent({
  render: () => h('svg', { viewBox: '0 0 24 24', fill: 'currentColor' }, [
    h('path', { d: 'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 17h-2v-2h2v2zm2.07-7.75l-.9.92C13.45 12.9 13 13.5 13 15h-2v-.5c0-1.1.45-2.1 1.17-2.83l1.24-1.26c.37-.36.59-.86.59-1.41 0-1.1-.9-2-2-2s-2 .9-2 2H8c0-2.21 1.79-4 4-4s4 1.79 4 4c0 .88-.36 1.68-.93 2.25z' })
  ])
})

const DesignDoc = defineComponent({
  render: () => h('svg', { viewBox: '0 0 24 24', fill: 'currentColor' }, [
    h('path', { d: 'M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z' })
  ])
})

const ApiDoc = defineComponent({
  render: () => h('svg', { viewBox: '0 0 24 24', fill: 'currentColor' }, [
    h('path', { d: 'M14.6 16.6l4.6-4.6-4.6-4.6L16 6l6 6-6 6-1.4-1.4zm-5.2 0L4.8 12l4.6-4.6L8 6l-6 6 6 6 1.4-1.4z' })
  ])
})

const UserManual = defineComponent({
  render: () => h('svg', { viewBox: '0 0 24 24', fill: 'currentColor' }, [
    h('path', { d: 'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 17h-2v-2h2v2zm2.07-7.75l-.9.92C13.45 12.9 13 13.5 13 15h-2v-.5c0-1.1.45-2.1 1.17-2.83l1.24-1.26c.37-.36.59-.86.59-1.41 0-1.1-.9-2-2-2s-2 .9-2 2H8c0-2.21 1.79-4 4-4s4 1.79 4 4c0 .88-.36 1.68-.93 2.25z' })
  ])
})

const CodeIcon = defineComponent({
  render: () => h('svg', { viewBox: '0 0 24 24', fill: 'currentColor' }, [
    h('path', { d: 'M9.4 16.6L4.8 12l4.6-4.6L8 6l-6 6 6 6 1.4-1.4zm5.2 0l4.6-4.6-4.6-4.6L16 6l6 6-6 6-1.4-1.4z' })
  ])
})

const services = [
  {
    icon: BugIcon,
    title: 'Bug 修复',
    description: '专业修复各类程序 Bug，包括但不限于：',
    features: ['后端服务异常排查', '性能问题优化', '内存泄漏修复', '逻辑错误修正'],
    price: '面议',
    color: '#F56C6C',
  },
  {
    icon: DesignDoc,
    title: '毕业设计文档',
    description: '完整的计算机毕业设计文档服务：',
    features: ['需求分析文档', '系统设计文档', '数据库设计文档', '接口设计文档'],
    price: '¥500 起',
    color: '#409EFF',
  },
  {
    icon: ApiDoc,
    title: 'API 文档',
    description: '专业的 API 接口文档编写：',
    features: ['OpenAPI 规范文档', '接口说明文档', '请求示例代码', '错误码说明'],
    price: '¥300 起',
    color: '#67C23A',
  },
  {
    icon: UserManual,
    title: '使用文档',
    description: '详细的使用说明书编写：',
    features: ['安装部署指南', '用户操作手册', '运维管理文档', '常见问题解答'],
    price: '¥300 起',
    color: '#E6A23C',
  },
  {
    icon: CodeIcon,
    title: '完整项目代码',
    description: '从零开始的完整项目开发：',
    features: ['前端界面开发', '后端服务开发', '数据库设计', '部署配置'],
    price: '面议',
    color: '#909399',
  },
  {
    icon: Connection,
    title: '项目开发',
    description: '定制化项目开发服务：',
    features: ['需求分析与评估', '技术方案设计', '代码开发与测试', '后期维护支持'],
    price: '面议',
    color: '#909399',
  },
]

const contactInfo = [
  { label: '服务范围', value: 'Bug 修复、文档编写、项目开发' },
  { label: '响应时间', value: '24 小时内回复' },
  { label: '合作方式', value: '远程协作，支持全国' },
]
</script>

<template>
  <div class="services-page">
    <!-- Hero Section -->
    <section class="services-hero">
      <div class="hero-bg"></div>
      <div class="container">
        <div class="hero-content animate-fade-in">
          <div class="hero-badge">
            <el-icon><Tool /></el-icon>
            <span>服务项目</span>
          </div>
          <h1 class="hero-title">专业承接各类开发服务</h1>
          <p class="hero-subtitle">从 Bug 修复到完整项目开发，用专业技术为您解决实际问题</p>
        </div>
      </div>
    </section>

    <!-- Services Grid -->
    <section class="services-content">
      <div class="container">
        <div class="services-grid">
          <div 
            v-for="(service, index) in services" 
            :key="service.title"
            class="service-card animate-slide-up"
            :style="{ animationDelay: `${index * 0.1}s` }"
          >
            <div class="service-icon-wrapper" :style="{ background: `${service.color}15`, color: service.color }">
              <el-icon :size="32"><component :is="service.icon" /></el-icon>
            </div>
            <h3 class="service-title">{{ service.title }}</h3>
            <p class="service-description">{{ service.description }}</p>
            <ul class="service-features">
              <li v-for="feature in service.features" :key="feature">
                <el-icon><Document /></el-icon>
                {{ feature }}
              </li>
            </ul>
            <div class="service-footer">
              <span class="service-price">{{ service.price }}</span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Process Section -->
    <section class="process-section">
      <div class="container">
        <div class="section-header animate-fade-in">
          <h2 class="section-title">合作流程</h2>
          <p class="section-subtitle">简单四步，轻松合作</p>
        </div>
        <div class="process-steps">
          <div class="process-step animate-slide-up" style="animation-delay: 0.1s">
            <div class="step-number">01</div>
            <h4>需求沟通</h4>
            <p>明确项目需求，评估可行性与报价</p>
          </div>
          <div class="process-arrow animate-fade-in">→</div>
          <div class="process-step animate-slide-up" style="animation-delay: 0.2s">
            <div class="step-number">02</div>
            <h4>签订协议</h4>
            <p>确认合作细节，签订服务协议</p>
          </div>
          <div class="process-arrow animate-fade-in">→</div>
          <div class="process-step animate-slide-up" style="animation-delay: 0.3s">
            <div class="step-number">03</div>
            <h4>开发交付</h4>
            <p>按期交付成果，阶段性汇报</p>
          </div>
          <div class="process-arrow animate-fade-in">→</div>
          <div class="process-step animate-slide-up" style="animation-delay: 0.4s">
            <div class="step-number">04</div>
            <h4>验收结款</h4>
            <p>验收通过，交付全部资料</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Contact Section -->
    <section class="contact-section">
      <div class="container">
        <div class="contact-card animate-fade-in">
          <div class="contact-info">
            <h2>联系我</h2>
            <p>有任何需求，欢迎随时联系</p>
            <div class="contact-items">
              <div class="contact-item">
                <el-icon :size="20"><ChatDotRound /></el-icon>
                <span>sen@example.com</span>
              </div>
              <div class="contact-item">
                <el-icon :size="20"><Document /></el-icon>
                <span>24 小时内响应</span>
              </div>
            </div>
            <RouterLink to="/contact" class="contact-btn">
              <el-icon><ChatDotRound /></el-icon>
              <span>立即咨询</span>
            </RouterLink>
          </div>
          <div class="contact-note">
            <el-tag type="success" effect="plain">诚信经营</el-tag>
            <el-tag type="info" effect="plain">保密协议</el-tag>
            <el-tag type="warning" effect="plain">售后支持</el-tag>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
.services-page {
  padding-top: 80px;
}

/* Hero Section */
.services-hero {
  padding: 5rem 0 6rem;
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
  font-size: 3rem;
  font-weight: 700;
  color: #1a1a2e;
  margin-bottom: 1rem;
}

.hero-subtitle {
  color: #64748b;
  font-size: 1.25rem;
  max-width: 600px;
  margin: 0 auto;
}

/* Services Grid */
.services-content {
  padding: 5rem 0;
}

.services-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(340px, 1fr));
  gap: 2rem;
}

.service-card {
  background: white;
  border-radius: 20px;
  padding: 2rem;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
  transition: all 0.3s ease;
}

.service-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 15px 40px rgba(0, 0, 0, 0.1);
}

.service-icon-wrapper {
  width: 64px;
  height: 64px;
  border-radius: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1.5rem;
}

.service-title {
  font-size: 1.375rem;
  font-weight: 600;
  color: #1a1a2e;
  margin-bottom: 0.75rem;
}

.service-description {
  color: #64748b;
  font-size: 0.95rem;
  margin-bottom: 1.5rem;
  line-height: 1.6;
}

.service-features {
  list-style: none;
  padding: 0;
  margin: 0 0 1.5rem 0;
}

.service-features li {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 0;
  color: #4b5563;
  font-size: 0.9rem;
}

.service-features li .el-icon {
  color: var(--color-primary, #409EFF);
  font-size: 1rem;
}

.service-footer {
  padding-top: 1rem;
  border-top: 1px solid #f1f5f9;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.service-price {
  font-size: 1.25rem;
  font-weight: 600;
  color: var(--color-primary, #409EFF);
}

/* Process Section */
.process-section {
  padding: 5rem 0;
  background: #f8fafc;
}

.section-header {
  text-align: center;
  margin-bottom: 4rem;
}

.section-title {
  font-size: 2rem;
  font-weight: 700;
  color: #1a1a2e;
  margin-bottom: 0.5rem;
}

.section-subtitle {
  color: #64748b;
}

.process-steps {
  display: flex;
  justify-content: center;
  align-items: flex-start;
  gap: 1rem;
  flex-wrap: wrap;
}

.process-step {
  text-align: center;
  max-width: 200px;
}

.step-number {
  font-size: 2.5rem;
  font-weight: 700;
  color: var(--color-primary, #409EFF);
  opacity: 0.3;
  margin-bottom: 0.5rem;
}

.process-step h4 {
  font-size: 1.125rem;
  font-weight: 600;
  color: #1a1a2e;
  margin-bottom: 0.5rem;
}

.process-step p {
  font-size: 0.9rem;
  color: #64748b;
  line-height: 1.5;
}

.process-arrow {
  font-size: 1.5rem;
  color: #cbd5e1;
  margin-top: 1.5rem;
}

/* Contact Section */
.contact-section {
  padding: 5rem 0;
}

.contact-card {
  background: linear-gradient(135deg, #1a1a2e 0%, #16162a 100%);
  border-radius: 24px;
  padding: 3rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 2rem;
}

.contact-info h2 {
  font-size: 1.75rem;
  font-weight: 700;
  color: white;
  margin-bottom: 0.5rem;
}

.contact-info > p {
  color: #94a3b8;
  margin-bottom: 1.5rem;
}

.contact-items {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  margin-bottom: 2rem;
}

.contact-item {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  color: #e2e8f0;
  font-size: 0.95rem;
}

.contact-item .el-icon {
  color: var(--color-primary, #409EFF);
}

.contact-btn {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.875rem 2rem;
  background: linear-gradient(135deg, var(--color-primary, #409EFF) 0%, #337ecc 100%);
  color: white;
  border-radius: 12px;
  font-weight: 600;
  text-decoration: none;
  transition: all 0.3s ease;
}

.contact-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(64, 158, 255, 0.4);
}

.contact-note {
  display: flex;
  gap: 0.75rem;
  flex-wrap: wrap;
}

@media (max-width: 768px) {
  .hero-title {
    font-size: 2rem;
  }

  .services-grid {
    grid-template-columns: 1fr;
  }

  .process-steps {
    flex-direction: column;
    align-items: center;
  }

  .process-arrow {
    transform: rotate(90deg);
    margin: 0;
  }

  .contact-card {
    flex-direction: column;
    text-align: center;
  }

  .contact-items {
    align-items: center;
  }
}
</style>
