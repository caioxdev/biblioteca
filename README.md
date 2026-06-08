# Biblioteca

Sistema de gerenciamento de empréstimos de livros desenvolvido como trabalho final da disciplina de Programação para Web.

## Integrantes

| Nome | GitHub |
|------|--------|
| Caio Seabra de Queiroz | [caioxdev](https://github.com/caioxdev) |
| Arthur Freitas Araújo | [Freitas-188](https://github.com/Freitas-188) |
| Ádam Amarildo Guedes | [adamagc00-stack](https://github.com/adamagc00-stack) |
| Artur Martins Dias Fonseca | [ArthurMartins95](https://github.com/ArthurMartins95) |

## Stack

**Backend**
- Node.js + Express
- MySQL (Driver `mysql2`)
- JWT + bcryptjs
- Swagger UI (Documentação da API)

**Frontend**
- Vue 3 + Vite
- Pinia
- Vue Router
- Vue Toastification
- Axios + NProgress
- CSS puro

**Ambiente**
- Docker Compose (MySQL containerizado)
- Frontend e backend rodam localmente

## Estrutura do Projeto
```txt
biblioteca/
├── backend/
│   ├── src/
│   │   ├── config/
│   │   │   └── db.js
│   │   ├── controllers/
│   │   │   ├── auth-controller.js
│   │   │   ├── livros-controller.js
│   │   │   └── emprestimos-controller.js
│   │   ├── middlewares/
│   │   │   ├── auth-middleware.js
│   │   │   └── check-perfil.js
│   │   └── routes/
│   │       ├── auth.js
│   │       ├── livros.js
│   │       └── emprestimos.js
│   ├── swagger.json
│   └── server.js
├── frontend/
│   └── src/
│       ├── assets/
│       ├── components/
│       ├── pages/
│       ├── router/
│       ├── services/
│       ├── stores/
│       ├── App.vue
│       └── main.js
└── README.md
```

## Como rodar

### Pré-requisitos

- Node.js 18+
- MySQL Server instalado na máquina (porta padrão 3306)

### 1. Clone o repositório

```bash
git clone https://github.com/caioxdev/biblioteca.git
cd biblioteca
```
### 2. Prepare o Banco de Dados
- Abra o seu gerenciador do MySQL (MySQL Workbench, DBeaver, phpMyAdmin, ou o terminal).
- Crie um banco de dados chamado biblioteca executando o seguinte comando SQL:
```sql
CREATE DATABASE IF NOT EXISTS biblioteca;
```

### 3. Configure o backend
```bash
cd backend
npm install
```
Crie o arquivo .env na raiz da pasta backend com base no .env.example. Altere as credenciais DB_USER e DB_PASSWORD para bater com as que você configurou no seu MySQL local:
Snippet de código:
```txt
DB_HOST=localhost
DB_PORT=3306
DB_USER=seu_usuario_do_mysql
DB_PASSWORD=sua_senha_do_mysql
DB_NAME=biblioteca
JWT_SECRET=biblioteca_secreta_jwt
PORT=3000
```
Suba o servidor em modo de desenvolvimento (Nodemon):
```bash
npm run dev
```

### 4. Configure o frontend
```bash
cd ../frontend
npm install
```
Crie o arquivo .env na raiz da pasta frontend com base no .env.example:
Snippet de código:
```bash
VITE_API_URL=http://localhost:3000
```
Suba o frontend:
```bash
npm run dev
```

### 5. Links de Acesso
- Frontend (Interface): http://localhost:5173
- Documentação da API (Swagger): http://localhost:3000/docs

## Rotas da API
### Auth
| Método | Rota             | Descrição         | Perfil  |
|---------|------------------|-------------------|---------|
| POST    | `/auth/registro` | Cadastrar usuário | Público |
| POST    | `/auth/login`    | Login             | Público |

---

### Livros
| Método | Rota          | Descrição        | Perfil         |
|---------|---------------|------------------|----------------|
| GET     | `/livros`     | Listar livros    | Autenticado    |
| POST    | `/livros`     | Cadastrar livro  | Bibliotecário  |
| PUT     | `/livros/:id` | Atualizar livro  | Bibliotecário  |
| DELETE  | `/livros/:id` | Remover livro    | Bibliotecário  |

---

### Empréstimos
| Método | Rota                          | Descrição            | Perfil         |
|---------|-------------------------------|----------------------|----------------|
| GET     | `/emprestimos`                | Listar empréstimos   | Autenticado    |
| POST    | `/emprestimos`                | Solicitar empréstimo | Leitor         |
| PUT     | `/emprestimos/:id/devolver`   | Confirmar devolução  | Bibliotecário  |

## Perfis de usuário
### Bibliotecário
- Gerencia o catálogo de livros (CRUD)
- Visualiza todos os empréstimos do sistema
- Confirma e dá baixa em devoluções

### Leitor
- Visualiza o catálogo de livros
- Solicita empréstimos de livros disponíveis
- Visualiza apenas o seu próprio histórico de empréstimos

## Commits
O projeto usa Commitizen para padronizar mensagens de commit.
Na raiz do projeto:
```bash
npm run commit
```
`Ou`
```bash
npx cz
```