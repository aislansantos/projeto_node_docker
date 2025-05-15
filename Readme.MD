# Documentação do Projeto

## 1. Dados Gerais do Projeto

Este projeto utiliza as seguintes tecnologias e ferramentas principais:

- **Node.js:** Ambiente de execução JavaScript para o backend.
- **Docker:** Plataforma de containerização para facilitar o desenvolvimento e a implantação.
- **TypeScript:** Superset do JavaScript que adiciona tipagem estática.
- **PostgreSQL:** Sistema de gerenciamento de banco de dados relacional.
- **Express.js:** Framework web rápido e minimalista para Node.js.

## 2. Configuração do Banco de Dados

A configuração para conectar ao banco de dados PostgreSQL é definida através das variáveis de ambiente. O código abaixo demonstra a configuração utilizada:

```typescript
import { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

export const pool = new Pool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});
```
As seguintes variáveis de ambiente são utilizadas para a conexão:

```typescript
DB_HOST: Endereço do servidor PostgreSQL.
DB_USER: Nome de usuário para acessar o banco de dados.
DB_PASSWORD: Senha do usuário do banco de dados.
DB_NAME: Nome do banco de dados a ser utilizado.
```
O arquivo .env (ou similar, dependendo do ambiente) deve conter essas informações:
```typescript
PORT=3000
NODE_ENV=development
DB_HOST=db
DB_USER=postgres
DB_PASSWORD=mypassword
DB_NAME=mydatabase
```
**Importante**: Certifique-se de que o arquivo .env não seja versionado em sistemas de controle de versão como o Git, pois ele contém informações sensíveis.

Com certeza! Aqui está o conteúdo completo para você copiar e colar diretamente em um arquivo chamado, por exemplo, documentacao.md. Este arquivo estará pronto em Markdown.

Markdown

# Documentação do Projeto

## 1. Dados Gerais do Projeto

Este projeto utiliza as seguintes tecnologias e ferramentas principais:

- **Node.js:** Ambiente de execução JavaScript para o backend.
- **Docker:** Plataforma de containerização para facilitar o desenvolvimento e a implantação.
- **TypeScript:** Superset do JavaScript que adiciona tipagem estática.
- **PostgreSQL:** Sistema de gerenciamento de banco de dados relacional.
- **Express.js:** Framework web rápido e minimalista para Node.js.

## 2. Configuração do Banco de Dados

A configuração para conectar ao banco de dados PostgreSQL é definida através das variáveis de ambiente. O código abaixo demonstra a configuração utilizada:

```typescript
import { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

export const pool = new Pool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});
As seguintes variáveis de ambiente são utilizadas para a conexão:

DB_HOST: Endereço do servidor PostgreSQL.
DB_USER: Nome de usuário para acessar o banco de dados.
DB_PASSWORD: Senha do usuário do banco de dados.
DB_NAME: Nome do banco de dados a ser utilizado.
O arquivo .env (ou similar, dependendo do ambiente) deve conter essas informações:

PORT=3000
NODE_ENV=development
DB_HOST=db
DB_USER=postgres
DB_PASSWORD=mypassword
DB_NAME=mydatabase
Importante: Certifique-se de que o arquivo .env não seja versionado em sistemas de controle de versão como o Git, pois ele contém informações sensíveis.
```

## 3. Docker
Este projeto utiliza Docker para facilitar o desenvolvimento e a implantação. Abaixo estão os arquivos Dockerfile e docker-compose.yml utilizados, juntamente com comandos úteis.

### 3.1. Dockerfile
O Dockerfile define o ambiente para a aplicação Node.js:

```dockerfile
FROM node:20-alpine

WORKDIR /app

# Instala o ts-node-dev globalmente
RUN npm install -g ts-node-dev

# Copia os arquivos de configuração e dependências
COPY package.json package-lock.json ./
COPY tsconfig.json ./

# Instala dependências
RUN npm install

# Copia o restante da aplicação
COPY app ./app

EXPOSE 3000

CMD ["ts-node-dev", "--respawn", "--transpile-only", "--poll", "app/server.ts"]
```
### 3.2. docker-compose.yml
O arquivo docker-compose.yml define os serviços para a aplicação e o banco de dados PostgreSQL:

```YAML
version: '3.8'

services:
  db:
    image: postgres:16
    container_name: postgres_db
    restart: always
    environment:
      POSTGRES_USER: postgres
      POSTGRES_PASSWORD: mypassword
      POSTGRES_DB: mydatabase
    ports:
      - "5432:5432"
    volumes:
      - db_data:/var/lib/postgresql/data
    networks:
      - app-network

  nodejs:
    build:
      context: .
    container_name: node_app
    restart: always
    ports:
      - "3000:3000"
    depends_on:
      - db
    networks:
      - app-network
    volumes:
      - .:/app
      - node_modules_volume:/app/node_modules
    command: ts-node-dev --respawn --transpile-only --poll app/server.ts

volumes:
  db_data:
  node_modules_volume:

networks:
  app-network:
    driver: bridge

```
### 3.3. Comandos Docker Úteis
A seguir estão alguns comandos Docker comuns para gerenciar o projeto:

**Para construir as imagens Docker:**

```Bash
docker-compose build
```
Este comando irá construir as imagens definidas no arquivo docker-compose.yml (neste caso, a imagem para o serviço nodejs).

**Para iniciar os containers:**
```Bash
docker-compose up -d
```
Este comando irá iniciar os containers definidos no docker-compose.yml em modo detached (em segundo plano). Você poderá acessar a aplicação Node.js em http://localhost:3000 e o PostgreSQL na porta 5432 do seu localhost.

**Para visualizar os logs da aplicação Node.js:**
```Bash
docker-compose logs -f nodejs
```
O flag -f (follow) permite acompanhar os logs em tempo real.

**Para visualizar os logs do banco de dados PostgreSQL:**

```Bash
docker-compose logs -f db
```
**Para listar os containers em execução:**
```Bash
docker ps
```
**Para parar todos os containers definidos no docker-compose.yml:**
```Bash
docker-compose down
```
Este comando irá parar e remover os containers, redes e volumes definidos no arquivo.

**Para executar comandos dentro do container da aplicação Node.js:**
```Bash
docker exec -it node_app bash
```
Este comando abre um shell interativo dentro do container node_app. Isso pode ser útil para depurar ou executar comandos específicos.

**Para remover imagens Docker não utilizadas:**
```Bash
docker image prune
```

**Para remover volumes Docker não utilizados:**
```Bash
docker volume prune
```
