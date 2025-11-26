# 🎬 Catálogo DevFlix

## Gerenciador de Catálogo de Mídias (CRUD Simulado)

Este é um projeto de aplicação web desenvolvido em React com TypeScript, utilizando CSS Puro para estilização. Ele simula um sistema CRUD (Create, Read, Update, Delete) para gerenciar um catálogo de filmes e séries.

A aplicação utiliza um servidor local (JSON Server) para simular o backend e a persistência dos dados.

### ✨ Funcionalidades

* **Listagem (Read):** Exibe todos os itens do catálogo em um layout de cards responsivo.
* **Cadastro (Create):** Permite adicionar novos filmes/séries através de um formulário.
* **Edição (Update):** Permite modificar as informações de um item existente (Título, Gênero, Status, URL da Capa).
* **Exclusão (Delete):** Permite remover itens da lista.
* **Status Visual:** Indica se a mídia está "Assistida" (Verde) ou "Pendente" (Amarelo).
* **Imagens de Capa:** Cada card exibe a imagem da capa, cuja URL é gerenciada no formulário.

---

### 💡 Modos de Execução e Persistência de Dados

Este projeto pode ser executado em dois modos:

| Modo | Descrição | Persistência |
| :--- | :--- | :--- |
| **1. Simulação em Memória** | Se você rodar apenas o `npm run dev` (Frontend), os dados são carregados da constante `INITIAL_MOCK_DATA` no `App.tsx`. | **Não Persistente.** Dados criados ou excluídos são perdidos ao recarregar a página. |
| **2. Persistência Local (Recomendado)** | Se você rodar **`npm run server`** e depois **`npm run dev`**, a aplicação tentará se conectar ao JSON Server. | **Persistente.** Dados são salvos no arquivo `db.json`. |

### ⚙️ Tecnologias Utilizadas

* **Frontend:** React (Hooks: `useState`, `useEffect`)
* **Linguagem:** TypeScript
* **Estilização:** CSS Puro (foco em classes descritivas para layout e cores)
* **Tooling/Build:** Vite
* **Simulação de Backend:** JSON Server

### 🚀 Como Rodar o Projeto Localmente

Siga estes passos no seu terminal, dentro da pasta raiz do projeto.

#### 1. Instalação de Dependências

Certifique-se de que o Node.js e o npm/Yarn estejam instalados.

```bash
# Instala todas as dependências listadas no package.json
npm install
# ou yarn install

2. Iniciar o Servidor Simulado (JSON Server)
Este comando cria a API a partir do arquivo db.json e deve ser executado em um terminal separado.

Bash

npm run server
O servidor será iniciado em http://localhost:3000.

3. Iniciar a Aplicação Frontend
Abra um segundo terminal e inicie o aplicativo React:

Bash

npm run dev
O frontend será iniciado (geralmente em http://localhost:5173). Abra esta URL no seu navegador.

📝 Estrutura de Pastas
.
├── public/
├── src/
│   ├── assets/
│   ├── main.tsx        # Ponto de entrada do React
│   ├── App.tsx         # Componente Principal (Lógica CRUD e UI)
│   ├── index.css       # Estilos CSS Puro
│   └── ...
├── db.json             # Dados para o JSON Server
├── index.html
├── package.json
└── README.md