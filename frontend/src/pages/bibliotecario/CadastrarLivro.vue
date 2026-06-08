<template>
  <main>
    <div class="container-topo">
      <h2>Cadastrar Novo Livro</h2>
      <p>Insira as informações técnicas para disponibilizar a obra no acervo da uninersidade</p>
    </div>
  </main>
</template>

<script setup>
</script>

<style scoped>

.container-topo {
  display: flex;
  flex-direction: column;
  gap: 8px;

  h2 {
    font-family: var(--fonte);
    color: var(--cor-preto);
    font-size: var(--f5);
    font-style: normal;
    font-weight: 600;
    line-height: normal;
  }

  p {
    font-family: var(--fonte);
    color: #43474E;
    font-size: var(--f2);
    font-style: normal;
    font-weight: 400;
    font-weight: 400;
    line-height: 143%;
  }
}

</style>