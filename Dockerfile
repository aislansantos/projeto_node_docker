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
