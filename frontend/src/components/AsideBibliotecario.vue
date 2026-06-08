<template>
  <aside class="aside-container">
    <div class="content-topo">
      <h2>Gestão Biblioteca</h2>
      <p>Painel Administrativo</p>
    </div>
    <div class="container">
      <RouterLink class="botao" :to="{ name: 'bibliotecario-catalogo' }">
        <img :src="iconeCatalogo" alt="Ícone catálogo">
        Catálogo
      </RouterLink>
      <RouterLink class="botao" :to="{ name: 'bibliotecario-cadastrar'}">
        <img :src="iconeCadastrarLivro" alt="ícone cadastrar livro">
        Cadastrar livro
      </RouterLink>
      <RouterLink class="botao" :to="{ name: 'bibliotecario-emprestimos' }">
        <img :src="iconeEmprestimos" alt="ícone empréstimos">
        Empréstimos
      </RouterLink>
    </div>
  </aside>
</template>

<script setup>
import iconeCatalogo from "@/assets/icone-catalogo.svg";
import iconeCadastrarLivro from "@/assets/icone-cadastrar-livro.svg";
import iconeEmprestimos from "@/assets/icone-emprestimos.svg"
</script>

<style scoped>
.aside-container {
  height: 100%;
  display: flex;
  flex-direction: column;
}

.content-topo {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 1.25rem;

  h2 {
    font-family: var(--fonte);
    color: var(--cor-texto-principal);
    font-size: var(--f3);
    font-style: normal;
    font-weight: 600;
    line-height: 140%;
  }

  p {
    font-family: var(--fonte);
    color: #43474E;
    font-size: var(--f1);
    font-style: normal;
    font-weight: 500;
    line-height: 133%;
    letter-spacing: 0.12px;
  }
}

.router-link-active {
  background-color: #D5E0F7;
}

.container {
  display: flex;
  flex-direction: column;
  margin-top: 43px;
  gap: 25px;

  .botao {
    display: flex;
    flex-direction: row;
    padding: 1rem;
    gap: 12px;

    font-family: var(--fonte);
    color: var(--cor-aside-texto);
    font-size: var(--f2);
    font-style: normal;
    font-weight: 500;
    line-height: normal;
    transition: background-color .2s ease, color .2s ease;
  }
}
</style>