<script setup lang="ts">
import { computed } from 'vue'
import { RouterView, useRoute } from 'vue-router'
import NavBar from '@/components/NavBar.vue'
import FooterSection from '@/components/FooterSection.vue'

const route = useRoute()

const showNavbar = computed(() => {
  return !route.meta.hideNavbar
})
</script>

<template>
  <div class="app">
    <NavBar v-if="showNavbar" class="navbar-fixed" />
    <main class="main-content" :class="{ 'with-navbar': showNavbar }">
      <RouterView :key="route.path" />
    </main>
    <FooterSection v-if="showNavbar" />
  </div>
</template>

<style scoped>
.app {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.navbar-fixed {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
}

.main-content.with-navbar {
  padding-top: 80px;
}
</style>
