<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { RouterLink } from 'vue-router'

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
    icon: '⚡',
    title: '高性能',
    description: 'Go 语言天生的高并发特性，打造极致性能体验',
  },
  {
    icon: '🛡️',
    title: '可靠性',
    description: '严格类型检查，完善的错误处理机制',
  },
  {
    icon: '🚀',
    title: '可扩展',
    description: '微服务架构支持，轻松应对业务增长',
  },
]

const techStack = [
  'Go', 'Gin', 'gRPC', 'Docker', 'Kubernetes',
  'MySQL', 'Redis', 'MongoDB', 'RabbitMQ', 'Kafka',
]
</script>

<template>
  <section class="hero" :class="{ scrolled: isScrolled }">
    <div class="container">
      <div class="hero-content">
        <div class="hero-badge">👋 你好，我是 Sen</div>
        <h1 class="hero-title">
          Golang
          <span class="highlight">后端工程师</span>
        </h1>
        <p class="hero-description">
          专注于高性能后端开发，擅长微服务架构设计与分布式系统开发。
          用代码创造价值，用技术解决问题。
        </p>
        <div class="hero-actions">
          <RouterLink to="/services" class="btn btn-primary">
            查看服务
          </RouterLink>
          <RouterLink to="/contact" class="btn btn-secondary">
            联系我
          </RouterLink>
        </div>
        <div class="tech-stack">
          <span class="tech-label">技术栈：</span>
          <span v-for="tech in techStack" :key="tech" class="tech-tag">
            {{ tech }}
          </span>
        </div>
      </div>
      <div class="hero-visual">
        <div class="code-window">
          <div class="code-header">
            <span class="dot red"></span>
            <span class="dot yellow"></span>
            <span class="dot green"></span>
          </div>
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
    </div>
    <div class="hero-features">
      <div v-for="feature in features" :key="feature.title" class="feature-card">
        <span class="feature-icon">{{ feature.icon }}</span>
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

.hero::before {
  content: '';
  position: absolute;
  top: -50%;
  right: -20%;
  width: 80%;
  height: 150%;
  background: radial-gradient(circle, rgba(74, 222, 128, 0.08) 0%, transparent 70%);
  pointer-events: none;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  align-items: center;
}

.hero-badge {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  background: rgba(74, 222, 128, 0.1);
  color: #16a34a;
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
  background: linear-gradient(135deg, #4ade80 0%, #22c55e 100%);
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
  justify-content: center;
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
  background: linear-gradient(135deg, #4ade80 0%, #22c55e 100%);
  color: white;
  box-shadow: 0 4px 15px rgba(74, 222, 128, 0.3);
}

.btn-primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(74, 222, 128, 0.4);
}

.btn-secondary {
  background: white;
  color: #1a1a2e;
  border: 2px solid #e5e7eb;
}

.btn-secondary:hover {
  border-color: #4ade80;
  color: #16a34a;
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
}

.tech-tag:hover {
  border-color: #4ade80;
  color: #16a34a;
}

.hero-visual {
  display: flex;
  justify-content: center;
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
  gap: 8px;
  padding: 1rem;
  background: #16162a;
}

.dot {
  width: 12px;
  height: 12px;
  border-radius: 50%;
}

.red { background: #ef4444; }
.yellow { background: #f59e0b; }
.green { background: #22c55e; }

.code-content {
  padding: 1.5rem;
  margin: 0;
  font-family: 'Fira Code', 'Monaco', monospace;
  font-size: 0.9rem;
  line-height: 1.6;
  color: #e2e8f0;
  overflow-x: auto;
}

.keyword { color: #c084fc; }
.string { color: #4ade80; }
.function { color: #60a5fa; }
.comment { color: #64748b; }

.hero-features {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
  margin-top: 4rem;
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
  transform: translateY(-5px);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
}

.feature-icon {
  font-size: 2.5rem;
  display: block;
  margin-bottom: 1rem;
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
