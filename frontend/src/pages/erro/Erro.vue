<template>
  <main class="container-erro">
    <div class="conteudo-card">

      <div class="secao-logo">
        <div class="logo-svg">
          <svg width="60" height="60" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="50" height="50" rx="15" fill="#002045"/>
            <rect x="12" y="13.2095" width="21.9556" height="6.65116" fill="#C8A74C"/>
            <rect x="12" y="22.2788" width="21.9556" height="6.65116" fill="#F8F4E9"/>
            <rect x="12" y="30.7446" width="13.8667" height="6.65116" fill="#F8F4E9"/>
            <rect x="38" y="12" width="26" height="2.31111" rx="1.15556" transform="rotate(90 38 12)" fill="#B39B49"/>
          </svg>
        </div>
        <div class="texto-logo">
          <span class="subtitulo-institicao">LibreBR</span>
        </div>
      </div>

      <div class="grid-erro">
        <div class="coluna-ilustracao">

          <svg class="svg-portal" viewBox="0 0 200 300" fill="none" xmlns="http://www.w3.org/2000/svg">

            <path d="M40 40 H160 V280 H40 Z" fill="#0b192c"/>
            <g opacity="0.45">

              <circle cx="115" cy="140" r="70" stroke="#f8f4e9" stroke-width="6" stroke-dasharray="15 8 4 8" />
              <circle cx="115" cy="140" r="50" stroke="#b39b49" stroke-width="8" stroke-dasharray="10 6" />
              <circle cx="115" cy="140" r="30" stroke="#f8f4e9" stroke-width="5" stroke-dasharray="5 4" />
              <circle cx="115" cy="140" r="15" stroke="#ffffff" stroke-width="3" />
            </g>

            <circle cx="115" cy="140" r="8" fill="#ffffff" filter="blur(1px)"/>
            <radialGradient id="brilho" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stop-color="#ffffff" stop-opacity="1"/>
              <stop offset="100%" stop-color="#0b192c" stop-opacity="0"/>
            </radialGradient>
            <circle cx="115" cy="140" r="40" fill="url(#brilho)" style="mix-blend-mode: screen;"/>

            <polygon points="40,240 115,140 140,240 180,290 10,290" fill="url(#brilho)" opacity="0.3"/>

            <rect x="32" y="32" width="136" height="248" stroke="#334155" stroke-width="8" fill="none"/>
            <rect x="24" y="24" width="152" height="256" stroke="#1e293b" stroke-width="4" fill="none"/>

            <path d="M16 24 H184 L176 14 H24 Z" fill="#334155" stroke="#1e293b" stroke-width="3"/>
            <rect x="12" y="10" width="176" height="6" fill="#1e293b"/>
            <rect x="20" y="270" width="18" height="12" fill="#1e293b"/>
            <rect x="162" y="270" width="18" height="12" fill="#1e293b"/>

            <g transform="matrix(0.65 0 -0.2 1 52 0)">
              <rect x="0" y="36" width="110" height="240" fill="#475569" stroke="#1e293b" stroke-width="3"/>

              <rect x="15" y="55" width="80" height="50" fill="#334155" stroke="#1e293b" stroke-width="2"/>
              <rect x="15" y="120" width="80" height="50" fill="#334155" stroke="#1e293b" stroke-width="2"/>
              <rect x="15" y="185" width="80" height="70" fill="#334155" stroke="#1e293b" stroke-width="2"/>

              <circle cx="95" cy="155" r="4" fill="#c8a74c"/>
              <path d="M95 155 H88" stroke="#c8a74c" stroke-width="2"/>
            </g>

            <path d="M20 70 L5 60 L-10 65 M12 110 L-5 125 L-2 140" stroke="#1e293b" stroke-width="1.5" stroke-linecap="round"/>
            <path d="M100 280 L110 288 L105 300" stroke="#1e293b" stroke-width="2" stroke-linecap="round"/>
          </svg>
        </div>

        <div class="coluna-texto">
          <h1>OPS! PÁGINA NÃO ENCONTRADA</h1>
          <p class="mensagem-principal">
            Parece que você se perdeu em um corredor esquecido da nossa biblioteca.
          </p>
          <p class="mensagem-secundaria">
            O livro ou a página que você procura não foi encontrado ou foi movido para uma nova prateleira.
          </p>

          <button class="btn-retornar" @click="voltarAoInicio">
            RETORNAR À PÁGINA INICIAL
          </button>
        </div>

      </div>

    </div>
  </main>
</template>

<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()

const voltarAoInicio = () => {
  const usuarioRaw = localStorage.getItem('usuario')

  if (usuarioRaw) {
    const usuario = JSON.parse(usuarioRaw)
    if (usuario.perfil === 'leitor') {
      router.push('/leitor')
      return
    } else if (usuario.perfil === 'bibliotecario') {
      router.push('/bibliotecario')
      return
    }
  }
  router.push('/')
}
</script>

<style scoped>
.container-erro {
  width: 100%;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #ffffff;
  padding: 60px 24px;
  box-sizing: border-box;
  font-family: var(--fonte, 'Segoe UI', Roboto, sans-serif);
}

.conteudo-card {
  max-width: 1000px;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 50px;
}

.secao-logo {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: 12px;
}

.texto-logo {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.subtitulo-institicao {
  color: #c8a74c;
  font-size: 0.8rem;
  font-weight: 700;
  letter-spacing: 0.25em;
}

.nome-instituicao {
  color: #002045;
  font-size: 2.5rem;
  font-weight: 800;
  letter-spacing: 0.05em;
  margin: 0;
  line-height: 1.2;
}

.grid-erro {
  display: grid;
  grid-template-columns: 1fr 1.2fr;
  gap: 50px;
  align-items: center;
  width: 100%;
}

.coluna-ilustracao {
  display: flex;
  justify-content: center;
  align-items: center;
}

.svg-portal {
  width: 100%;
  max-width: 280px;
  height: auto;
  filter: drop-shadow(0 10px 20px rgba(0, 32, 69, 0.15));
}

.imagem-porta {
  width: 100%;
  max-width: 280px;
  height: auto;
}

.coluna-texto {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

h1 {
  color: #002045;
  font-size: 2.2rem;
  font-weight: 800;
  letter-spacing: -0.01em;
  margin: 0 0 16px 0;
}

.mensagem-principal {
  color: #1e293b;
  font-size: 1.15rem;
  font-weight: 600;
  line-height: 1.5;
  margin: 0 0 12px 0;
}

.mensagem-secundaria {
  color: #64748b;
  font-size: 1rem;
  font-weight: 400;
  line-height: 1.6;
  margin: 0 0 32px 0;
}

.btn-retornar {
  background-color: #002045;
  color: #ffffff;
  border: 1px solid #002045;
  padding: 14px 32px;
  border-radius: 4px;
  font-size: 0.85rem;
  font-weight: 700;
  letter-spacing: 0.05em;
  cursor: pointer;
  transition: all 0.2s ease;
}

.btn-retornar:hover {
  background-color: #00142c;
  border-color: #00142c;
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(0, 32, 69, 0.2);
}

@media (max-width: 768px) {
  .grid-erro {
    grid-template-columns: 1fr;
    gap: 36px;
  }

  .coluna-texto {
    align-items: center;
    text-align: center;
  }
}
</style>