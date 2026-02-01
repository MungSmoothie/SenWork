<script setup lang="ts">
import { ref, onMounted, defineComponent, h } from 'vue'
import { api } from '@/api'
import type { AboutInfo } from '@/types'
import { ChatDotRound, Place, Link, Connection } from '@element-plus/icons-vue'

// Custom Github icon
const Github = defineComponent({
  render: () => h('svg', { viewBox: '0 0 24 24', fill: 'currentColor' }, [
    h('path', { d: 'M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z' })
  ])
})

const about = ref<AboutInfo | null>(null)
const loading = ref(true)

onMounted(async () => {
  try {
    const res = await api.getAbout()
    if (res.success && res.data) {
      about.value = res.data
    }
  } catch (e) {
    console.error('Failed to load about info:', e)
  } finally {
    loading.value = false
  }
})
</script>

<template>
  <footer class="footer">
    <!-- Background Decoration -->
    <div class="footer-bg"></div>
    
    <div class="container">
      <div class="footer-content">
        <div class="footer-brand">
          <RouterLink to="/" class="footer-logo">
            <span class="logo-text">Sen</span>
            <span class="logo-accent">Work</span>
          </RouterLink>
          <p class="footer-tagline">
            专注于 Golang 后端开发，用技术创造价值
          </p>
          <div class="footer-social">
            <a :href="about?.socialLinks.github || '#'" target="_blank" rel="noopener noreferrer" title="GitHub" class="social-link">
              <el-icon :size="18"><Github /></el-icon>
            </a>
            <a :href="about?.socialLinks.linkedin || '#'" target="_blank" rel="noopener noreferrer" title="LinkedIn" class="social-link">
              <el-icon :size="18"><Link /></el-icon>
            </a>
            <a :href="about?.socialLinks.twitter || '#'" target="_blank" rel="noopener noreferrer" title="Twitter" class="social-link">
              <el-icon :size="18"><Connection /></el-icon>
            </a>
          </div>
        </div>
        
        <div class="footer-links-section">
          <h4>快速链接</h4>
          <ul class="footer-links">
            <li><RouterLink to="/">首页</RouterLink></li>
            <li><RouterLink to="/about">关于</RouterLink></li>
            <li><RouterLink to="/services">服务</RouterLink></li>
            <li><RouterLink to="/contact">联系</RouterLink></li>
          </ul>
        </div>
        
        <div class="footer-links-section">
          <h4>技术栈</h4>
          <ul class="footer-links">
            <li><a href="#">Go / Gin</a></li>
            <li><a href="#">Docker / K8s</a></li>
            <li><a href="#">MySQL / Redis</a></li>
            <li><a href="#">微服务</a></li>
          </ul>
        </div>
        
        <div class="footer-contact">
          <h4>联系方式</h4>
          <p class="contact-email">
            <el-icon><ChatDotRound /></el-icon>
            <span>{{ about?.email || 'sen@example.com' }}</span>
          </p>
          <p class="contact-location">
            <el-icon><Place /></el-icon>
            <span>{{ about?.location || '中国' }}</span>
          </p>
        </div>
      </div>
      
      <div class="footer-bottom">
        <p>&copy; {{ new Date().getFullYear() }} SenWork. All rights reserved.</p>
        <p class="made-with">Made with ❤️ by Sen</p>
      </div>
    </div>
  </footer>
</template>

<style scoped>
.footer {
  background: linear-gradient(180deg, #1a1a2e 0%, #16162a 100%);
  color: #e2e8f0;
  padding: 4rem 0 2rem;
  position: relative;
  overflow: hidden;
}

.footer-bg {
  position: absolute;
  inset: 0;
  background-image: 
    radial-gradient(circle at 20% 20%, rgba(64, 158, 255, 0.05) 0%, transparent 50%),
    radial-gradient(circle at 80% 80%, rgba(103, 194, 58, 0.05) 0%, transparent 50%);
  pointer-events: none;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
  position: relative;
  z-index: 1;
}

.footer-content {
  display: grid;
  grid-template-columns: 1.5fr 1fr 1fr 1.2fr;
  gap: 3rem;
  margin-bottom: 3rem;
}

.footer-logo {
  font-size: 1.5rem;
  font-weight: 700;
  text-decoration: none;
  display: inline-flex;
  align-items: center;
  gap: 0.25rem;
  margin-bottom: 1rem;
  transition: transform 0.3s ease;
}

.footer-logo:hover {
  transform: scale(1.02);
}

.logo-text {
  color: white;
}

.logo-accent {
  color: var(--color-primary, #409EFF);
}

.footer-tagline {
  color: #94a3b8;
  line-height: 1.7;
  margin-bottom: 1.5rem;
}

.footer-social {
  display: flex;
  gap: 0.75rem;
}

.social-link {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  background: rgba(255, 255, 255, 0.08);
  border-radius: 10px;
  color: #e2e8f0;
  transition: all 0.3s ease;
}

.social-link:hover {
  background: var(--color-primary, #409EFF);
  color: white;
  transform: translateY(-3px);
}

.footer-links-section h4,
.footer-contact h4 {
  font-size: 1rem;
  font-weight: 600;
  margin-bottom: 1.25rem;
  color: white;
}

.footer-links {
  list-style: none;
  padding: 0;
  margin: 0;
}

.footer-links li {
  margin-bottom: 0.75rem;
}

.footer-links a {
  color: #94a3b8;
  text-decoration: none;
  font-size: 0.9rem;
  transition: all 0.3s ease;
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
}

.footer-links a::before {
  content: '';
  width: 0;
  height: 2px;
  background: var(--color-primary, #409EFF);
  transition: width 0.3s ease;
}

.footer-links a:hover {
  color: white;
}

.footer-links a:hover::before {
  width: 8px;
}

.footer-contact p {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  color: #94a3b8;
  font-size: 0.9rem;
  margin-bottom: 0.75rem;
}

.footer-contact .el-icon {
  color: var(--color-primary, #409EFF);
}

.footer-bottom {
  padding-top: 2rem;
  border-top: 1px solid rgba(255, 255, 255, 0.08);
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.footer-bottom p {
  color: #64748b;
  font-size: 0.875rem;
}

.made-with {
  color: var(--color-primary, #409EFF) !important;
}

@media (max-width: 1024px) {
  .footer-content {
    grid-template-columns: 1fr 1fr;
    gap: 2rem;
  }
}

@media (max-width: 640px) {
  .footer-content {
    grid-template-columns: 1fr;
    gap: 2rem;
    text-align: center;
  }

  .footer-social {
    justify-content: center;
  }

  .footer-bottom {
    flex-direction: column;
    gap: 0.5rem;
    text-align: center;
  }
}
</style>
