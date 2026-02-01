<script setup lang="ts">
import { ref, onMounted, onUnmounted, defineComponent, h } from 'vue'
import { RouterLink } from 'vue-router'
import { ArrowRight, Lightning } from '@element-plus/icons-vue'

// Custom icons
const Shield = defineComponent({
  render: () => h('svg', { viewBox: '0 0 24 24', fill: 'currentColor' }, [
    h('path', { d: 'M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm0 10.99h7c-.53 4.12-3.28 7.79-7 8.94V12H5V6.3l7-3.11v8.8z' })
  ])
})

const CircleCheck = defineComponent({
  render: () => h('svg', { viewBox: '0 0 24 24', fill: 'currentColor' }, [
    h('path', { d: 'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z' })
  ])
})

const TrendCharts = defineComponent({
  render: () => h('svg', { viewBox: '0 0 24 24', fill: 'currentColor' }, [
    h('path', { d: 'M3.5 18.49l6-6.01 4 4L22 6.92l-1.41-1.41-7.09 7.97-4-4L2 16.99z' })
  ])
})

const Code = defineComponent({
  render: () => h('svg', { viewBox: '0 0 24 24', fill: 'currentColor' }, [
    h('path', { d: 'M9.4 16.6L4.8 12l4.6-4.6L8 6l-6 6 6 6 1.4-1.4zm5.2 0l4.6-4.6-4.6-4.6L16 6l6 6-6 6-1.4-1.4z' })
  ])
})

const isScrolled = ref(false)

const handleScroll = () => {
  isScrolled.value = window.scrollY > 50
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})

const features = [
  {
    icon: Lightning,
    title: '高性能',
    description: 'Go 语言天生的高并发特性，打造极致性能体验',
  },
  {
    icon: CircleCheck,
    title: '可靠性',
    description: '严格类型检查，完善的错误处理机制',
  },
  {
    icon: TrendCharts,
    title: '可扩展',
    description: '微服务架构支持，轻松应对业务增长',
  },
]

// 注册所有自定义图标用于动态组件

const techStack = [
  'Go', 'Gin', 'gRPC', 'Docker', 'Kubernetes',
  'MySQL', 'Redis', 'MongoDB', 'RabbitMQ', 'Kafka',
]
</script>

<template>
  <section class="hero" :class="{ scrolled: isScrolled }">
    <!-- Background Decoration -->
    <div class="hero-bg">
      <div class="gradient-orb orb-1"></div>
      <div class="gradient-orb orb-2"></div>
      <div class="grid-pattern"></div>
    </div>

    <div class="container">
      <div class="hero-content">
        <div class="hero-badge animate-fade-in">
          <el-icon><Code /></el-icon>
          <span>你好，我是 Sen</span>
        </div>
        
        <h1 class="hero-title animate-fade-in stagger-1">
          Golang
          <span class="highlight">后端工程师</span>
        </h1>
        
        <p class="hero-description animate-fade-in stagger-2">
          专注于高性能后端开发，擅长微服务架构设计与分布式系统开发。
          用代码创造价值，用技术解决问题。
        </p>
        
        <div class="hero-actions animate-fade-in stagger-3">
          <RouterLink to="/services" class="btn btn-primary">
            <span>查看服务</span>
            <el-icon><ArrowRight /></el-icon>
          </RouterLink>
          <RouterLink to="/contact" class="btn btn-secondary">
            联系我
          </RouterLink>
        </div>
        
        <div class="tech-stack animate-fade-in stagger-4">
          <span class="tech-label">技术栈：</span>
          <span v-for="(tech, index) in techStack" :key="tech" class="tech-tag" :style="{ animationDelay: `${index * 0.05}s` }">
            {{ tech }}
          </span>
        </div>
      </div>
      
      <div class="hero-visual animate-scale-in">
        <div class="code-window">
          <div class="code-header">
            <div class="window-controls">
              <span class="dot red"></span>
              <span class="dot yellow"></span>
              <span class="dot green"></span>
            </div>
            <span class="window-title">main.go</span>
          </div>
          <div class="code-content-wrapper">
            <pre class="code-content"><code><span class="keyword">package</span> main

<span class="keyword">import</span> (
    <span class="string">"fmt"</span>
    <span class="string">"senwork"</span>
)

<span class="keyword">func</span> <span class="function">main</span>() {
    <span class="comment">// 创造价值，从代码开始</span>
    senwork.<span class="function">Build</span>()
    fmt.<span class="function">Println</span>(<span class="string">"Hello, World!"</span>)
}</code></pre>
          </div>
        </div>
        
        <!-- Floating Elements -->
        <div class="floating-badge badge-1">
          <el-icon><Lightning /></el-icon>
          <span>高性能</span>
        </div>
        <div class="floating-badge badge-2">
          <el-icon><Shield /></el-icon>
          <span>安全</span>
        </div>
      </div>
    </div>
    
    <div class="hero-features">
      <div v-for="(feature, index) in features" :key="feature.title" class="feature-card animate-slide-up" :style="{ animationDelay: `${index * 0.1 + 0.3}s` }">
        <div class="feature-icon-wrapper">
          <el-icon :size="28"><component :is="feature.icon" /></el-icon>
        </div>
        <h3 class="feature-title">{{ feature.title }}</h3>
        <p class="feature-description">{{ feature.description }}</p>
      </div>
    </div>
  </section>
</template>

<style scoped>
.hero {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 8rem 0 4rem;
  background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%);
  position: relative;
  overflow: hidden;
}

/* Background Decoration */
.hero-bg {
  position: absolute;
  inset: 0;
  overflow: hidden;
  pointer-events: none;
}

.gradient-orb {
  position: absolute;
  border-radius: 50%;
  filter: blur(80px);
  opacity: 0.5;
  animation: float 20s ease-in-out infinite;
}

.orb-1 {
  width: 600px;
  height: 600px;
  background: linear-gradient(135deg, rgba(64, 158, 255, 0.15) 0%, rgba(64, 158, 255, 0.05) 100%);
  top: -200px;
  right: -100px;
}

.orb-2 {
  width: 400px;
  height: 400px;
  background: linear-gradient(135deg, rgba(103, 194, 58, 0.1) 0%, rgba(103, 194, 58, 0.05) 100%);
  bottom: -100px;
  left: -100px;
  animation-delay: -10s;
}

.grid-pattern {
  position: absolute;
  inset: 0;
  background-image: 
    linear-gradient(rgba(0, 0, 0, 0.02) 1px, transparent 1px),
    linear-gradient(90deg, rgba(0, 0, 0, 0.02) 1px, transparent 1px);
  background-size: 50px 50px;
}

@keyframes float {
  0%, 100% {
    transform: translate(0, 0);
  }
  25% {
    transform: translate(20px, -20px);
  }
  50% {
    transform: translate(-10px, 10px);
  }
  75% {
    transform: translate(15px, 15px);
  }
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  align-items: center;
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
  margin-bottom: 1.5rem;
}

.hero-title {
  font-size: 3.5rem;
  font-weight: 800;
  line-height: 1.1;
  color: #1a1a2e;
  margin-bottom: 1.5rem;
}

.highlight {
  display: block;
  background: linear-gradient(135deg, var(--color-primary, #409EFF) 0%, #337ecc 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.hero-description {
  font-size: 1.25rem;
  color: #64748b;
  line-height: 1.7;
  margin-bottom: 2rem;
  max-width: 500px;
}

.hero-actions {
  display: flex;
  gap: 1rem;
  margin-bottom: 2rem;
}

.btn {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.875rem 2rem;
  border-radius: 12px;
  font-size: 1rem;
  font-weight: 600;
  text-decoration: none;
  transition: all 0.3s ease;
  cursor: pointer;
  border: none;
}

.btn-primary {
  background: linear-gradient(135deg, var(--color-primary, #409EFF) 0%, #337ecc 100%);
  color: white;
  box-shadow: 0 4px 15px rgba(64, 158, 255, 0.3);
}

.btn-primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(64, 158, 255, 0.4);
}

.btn-secondary {
  background: white;
  color: #1a1a2e;
  border: 2px solid #e5e7eb;
}

.btn-secondary:hover {
  border-color: var(--color-primary, #409EFF);
  color: var(--color-primary, #409EFF);
}

.tech-stack {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.75rem;
}

.tech-label {
  font-size: 0.875rem;
  color: #94a3b8;
}

.tech-tag {
  padding: 0.375rem 0.875rem;
  background: white;
  border: 1px solid #e5e7eb;
  border-radius: 50px;
  font-size: 0.8rem;
  color: #64748b;
  transition: all 0.3s ease;
  animation: fadeIn 0.5s ease forwards;
  opacity: 0;
}

.tech-tag:hover {
  border-color: var(--color-primary, #409EFF);
  color: var(--color-primary, #409EFF);
  transform: translateY(-2px);
}

.hero-visual {
  display: flex;
  justify-content: center;
  position: relative;
}

.code-window {
  width: 100%;
  max-width: 480px;
  background: #1a1a2e;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 25px 50px rgba(0, 0, 0, 0.15);
  transform: perspective(1000px) rotateY(-5deg) rotateX(5deg);
  transition: transform 0.3s ease;
}

.code-window:hover {
  transform: perspective(1000px) rotateY(0deg) rotateX(0deg);
}

.code-header {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 1rem 1.25rem;
  background: #16162a;
}

.window-controls {
  display: flex;
  gap: 8px;
}

.dot {
  width: 12px;
  height: 12px;
  border-radius: 50%;
}

.red { background: #ef4444; }
.yellow { background: #f59e0b; }
.green { background: #22c55e; }

.window-title {
  font-size: 0.8rem;
  color: #64748b;
  font-family: 'Fira Code', monospace;
}

.code-content-wrapper {
  padding: 1.5rem;
}

.code-content {
  padding: 0;
  margin: 0;
  font-family: 'Fira Code', 'Monaco', monospace;
  font-size: 0.9rem;
  line-height: 1.6;
  color: #e2e8f0;
  overflow-x: auto;
}

.keyword { color: #c084fc; }
.string { color: #409EFF; }
.function { color: #60a5fa; }
.comment { color: #64748b; }

.floating-badge {
  position: absolute;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1rem;
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  font-size: 0.875rem;
  font-weight: 500;
  color: #1a1a2e;
  animation: float 6s ease-in-out infinite;
}

.badge-1 {
  top: 20px;
  right: -20px;
  color: var(--color-warning, #E6A23C);
}

.badge-2 {
  bottom: 40px;
  left: -30px;
  color: var(--color-success, #67C23A);
  animation-delay: -3s;
}

.hero-features {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
  margin-top: 4rem;
  position: relative;
  z-index: 1;
}

.feature-card {
  text-align: center;
  padding: 2rem;
  background: white;
  border-radius: 16px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
  transition: all 0.3s ease;
}

.feature-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 15px 40px rgba(0, 0, 0, 0.1);
}

.feature-icon-wrapper {
  width: 64px;
  height: 64px;
  margin: 0 auto 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, rgba(64, 158, 255, 0.1) 0%, rgba(64, 158, 255, 0.05) 100%);
  border-radius: 16px;
  color: var(--color-primary, #409EFF);
}

.feature-title {
  font-size: 1.25rem;
  font-weight: 600;
  color: #1a1a2e;
  margin-bottom: 0.5rem;
}

.feature-description {
  font-size: 0.9rem;
  color: #64748b;
  line-height: 1.6;
}

@media (max-width: 1024px) {
  .container {
    grid-template-columns: 1fr;
    text-align: center;
  }

  .hero-description {
    margin-left: auto;
    margin-right: auto;
  }

  .hero-actions {
    justify-content: center;
  }

  .tech-stack {
    justify-content: center;
  }

  .hero-visual {
    order: -1;
  }

  .code-window {
    transform: none;
    max-width: 100%;
  }

  .code-window:hover {
    transform: none;
  }

  .floating-badge {
    display: none;
  }

  .hero-features {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 640px) {
  .hero-title {
    font-size: 2.5rem;
  }

  .hero-description {
    font-size: 1rem;
  }

  .hero-actions {
    flex-direction: column;
  }

  .tech-stack {
    display: none;
  }
}
</style>
