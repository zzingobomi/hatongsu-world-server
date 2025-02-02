FROM node:20-alpine AS builder

WORKDIR /app
RUN npm install -g pnpm
COPY package.json pnpm-lock.yaml* ./
RUN pnpm install
COPY . .
RUN pnpm build

FROM node:20-alpine AS production

EXPOSE 4100/tcp
EXPOSE 50000-50010/udp

WORKDIR /app
RUN npm install -g pnpm
COPY package.json pnpm-lock.yaml* ./
RUN pnpm install --prod

COPY --from=builder /app/dist/ ./dist/
ENV NODE_ENV=production

CMD ["node", "./dist/index.js"] 