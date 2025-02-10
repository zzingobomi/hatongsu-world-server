FROM node:20-alpine AS builder

WORKDIR /app
COPY package.json package-lock.json* ./
RUN npm ci
COPY . .
RUN npm run build

FROM node:20-alpine AS production

EXPOSE 4100/tcp
EXPOSE 50000-51000/udp

WORKDIR /app
COPY package.json package-lock.json* ./
RUN npm ci --omit=dev

COPY --from=builder /app/dist/ ./dist/
ENV NODE_ENV=production

CMD ["node", "./dist/index.js"]