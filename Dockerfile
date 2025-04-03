FROM node:23-alpine AS builder

WORKDIR /app

COPY package*.json ./

RUN npm install --legacy-peer-deps
# RUN npm ci --legacy-peer-deps

COPY . .

RUN npm run build

FROM node:23-alpine AS runner

WORKDIR /app

ENV NODE_ENV=development

COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/next.config.* ./

COPY --from=builder /app/.env.${NODE_ENV} ./.env

EXPOSE 3000

CMD ["npm", "start"]
