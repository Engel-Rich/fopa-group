# Étape 1 : Build
FROM node:20 AS builder

WORKDIR /app

COPY package*.json ./

# Installer toutes les dépendances (dev + prod) pour compiler TS
RUN npm install --legacy-peer-deps

RUN npm install -g @nestjs/cli && npm install --only=production

COPY . .

RUN nest build

# Étape 2 : Runtime
FROM node:20-alpine

WORKDIR /app

COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./

EXPOSE 3000

CMD ["node", "dist/main"]
