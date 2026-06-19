<template>
  <div class="views">
    <component :is="layoutComponent" />
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import DefaultLayout from './layouts/DefaultLayout.vue'
import NavbarLayout from './layouts/NavbarLayout.vue'

const route = useRoute()

const layoutsMap = {
  'default-layout': DefaultLayout,
  'navbar-layout': NavbarLayout
}

const layoutComponent = computed(() => {
  const layoutName = route.meta?.layout || 'default-layout'
  return layoutsMap[layoutName] || DefaultLayout
})
</script>

<style scoped>
</style>