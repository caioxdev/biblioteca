<template>
  <div class="layout-grid">
    <Header class="header" />

    <AsideLeitor class="sidebar" />

    <main class="main-content">
      <router-view />
    </main>
  </div>
</template>

<script setup>
import Header from '@/components/Header.vue';
import AsideLeitor from '@/components/AsideLeitor.vue';
</script>

<style scoped>
.layout-grid {
  display: grid;
  grid-template-columns: 256px 1fr;
  grid-template-rows: 100px 1fr;
  height: 100dvh;
  width: 100vw;
  overflow: hidden;
}

.header {
  grid-column: 1 / 3;
  grid-row: 1;
  background-color: var(--cor-header-fundo);
  border-bottom: 1px solid var(--cor-header-borda);
  color: #fff;
}

.sidebar {
  grid-column: 1;
  grid-row: 2;
  background-color: #F7FAFC;
  border-right: 1px solid #C4C6CF;
  color: #fff;
}

.main-content {
  grid-column: 2;
  grid-row: 2;
  padding: 30px;
  background-color: #f8f9fa;
  overflow-y: auto;
}
</style>