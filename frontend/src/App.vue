<template>
  <div class="views">
    <component :is="layout" />
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRouter } from 'vue-router'

const { currentRoute } = useRouter()

const layout = computed(() => {
  return currentRoute?.value?.meta?.layout || 'default-layout'
})
</script>