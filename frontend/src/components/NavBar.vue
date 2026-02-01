<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { RouterLink, useRoute } from 'vue-router'
import { Menu, Close } from '@element-plus/icons-vue'
import { ElMenu, ElMenuItem, ElIcon } from 'element-plus'

const isScrolled = ref(false)
const isMobileMenuOpen = ref(false)
const route = useRoute()

const navLinks = [
  { name: '首页', path: '/', icon: 'Home' },
  { name: '关于', path: '/about', icon: 'User' },
  { name: '服务', path: '/services', icon: 'Folder' },
  { name: '联系', path: '/contact', icon: 'Message' },
]

function handleScroll() {
  isScrolled.value = window.scrollY > 50
}

function toggleMobileMenu() {
  isMobileMenuOpen.value = !isMobileMenuOpen.value
}

function closeMobileMenu() {
  isMobileMenuOpen.value = false
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<template>
  <nav :class="['navbar', { scrolled: isScrolled }]">
    <div class="navbar-container">
      <RouterLink to="/" class="logo" @click="closeMobileMenu">
        <span class="logo-text">Sen</span>
        <span class="logo-accent">Work</span>
      </RouterLink>

      <!-- Desktop Menu -->
      <el-menu
        :default-active="route.path"
        mode="horizontal"
        :ellipsis="false"
        class="nav-menu"
        router
      >
        <el-menu-item 
          v-for="link in navLinks" 
          :key="link.path" 
          :index="link.path"
        >
          <el-icon><component :is="link.icon" /></el-icon>
          <span>{{ link.name }}</span>
        </el-menu-item>
      </el-menu>

      <!-- Mobile Toggle -->
      <button class="mobile-toggle" @click="toggleMobileMenu" :class="{ active: isMobileMenuOpen }">
        <el-icon :size="24">
          <Close v-if="isMobileMenuOpen" />
          <Menu v-else />
        </el-icon>
      </button>

      <!-- Mobile Menu -->
      <Transition name="slide-down">
        <div v-if="isMobileMenuOpen" class="mobile-menu">
          <RouterLink
            v-for="link in navLinks"
            :key="link.path"
            :to="link.path"
            :class="['mobile-link', { active: route.path === link.path }]"
            @click="closeMobileMenu"
          >
            <el-icon><component :is="link.icon" /></el-icon>
            <span>{{ link.name }}</span>
          </RouterLink>
        </div>
      </Transition>
    </div>
  </nav>
</template>

<style scoped>
.navbar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  padding: 1.25rem 0;
  transition: all 0.3s ease;
  background: transparent;
}

.navbar.scrolled {
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  box-shadow: 0 2px 20px rgba(0, 0, 0, 0.08);
  padding: 0.75rem 0;
}

.navbar-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.logo {
  font-size: 1.5rem;
  font-weight: 700;
  text-decoration: none;
  display: flex;
  align-items: center;
  gap: 0.25rem;
  transition: transform 0.3s ease;
}

.logo:hover {
  transform: scale(1.05);
}

.logo-text {
  color: #1a1a2e;
}

.logo-accent {
  color: var(--color-primary, #409EFF);
}

.nav-menu {
  border-bottom: none !important;
  background: transparent;
  display: flex;
  gap: 0.5rem;
}

.nav-menu :deep(.el-menu-item) {
  height: 48px;
  line-height: 48px;
  border-radius: 8px;
  margin: 0 4px;
  color: #4b5563;
  font-weight: 500;
  transition: all 0.3s ease;
}

.nav-menu :deep(.el-menu-item:hover),
.nav-menu :deep(.el-menu-item.is-active) {
  background: rgba(64, 158, 255, 0.1);
  color: var(--color-primary, #409EFF);
}

.nav-menu :deep(.el-menu-item .el-icon) {
  margin-right: 6px;
}

.mobile-toggle {
  display: none;
  background: none;
  border: none;
  cursor: pointer;
  padding: 0.5rem;
  color: #1a1a2e;
  border-radius: 8px;
  transition: all 0.3s ease;
}

.mobile-toggle:hover {
  background: rgba(0, 0, 0, 0.05);
}

.mobile-menu {
  position: fixed;
  top: 70px;
  left: 0;
  right: 0;
  background: white;
  padding: 1rem 2rem 2rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
}

.mobile-link {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 1rem 1.25rem;
  border-radius: 12px;
  color: #4b5563;
  text-decoration: none;
  font-weight: 500;
  transition: all 0.3s ease;
}

.mobile-link:hover,
.mobile-link.active {
  background: rgba(64, 158, 255, 0.1);
  color: var(--color-primary, #409EFF);
}

/* Slide Down Animation */
.slide-down-enter-active {
  transition: all 0.3s ease-out;
}

.slide-down-leave-active {
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
}

.slide-down-enter-from,
.slide-down-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}

@media (max-width: 768px) {
  .nav-menu {
    display: none;
  }

  .mobile-toggle {
    display: flex;
    align-items: center;
    justify-content: center;
  }
}
</style>
