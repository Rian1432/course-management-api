# Estágio de construção
FROM node:20-alpine AS builder

# Define o diretório de trabalho dentro do contêiner
WORKDIR /usr/src/app

# Copia os arquivos de configuração do projeto
COPY package*.json ./

# Instala as dependências (com o cache do yarn ou npm)
RUN npm ci

# Copia o restante dos arquivos da aplicação
COPY . .

# Constrói a aplicação NestJS
RUN npm run build

# ---

# Estágio de produção
FROM node:20-alpine AS production

# Define o diretório de trabalho
WORKDIR /usr/src/app

# Copia apenas os arquivos necessários para a produção
COPY package*.json ./
COPY --from=builder /usr/src/app/node_modules ./node_modules
COPY --from=builder /usr/src/app/dist ./dist

# Expõe a porta que a aplicação NestJS usará
EXPOSE 3000

# Comando para iniciar a aplicação
CMD ["node", "dist/main"]