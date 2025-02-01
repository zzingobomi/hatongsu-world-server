FROM node:18-alpine as builder

WORKDIR /app
RUN apk add --no-cache pnpm
COPY package.json pnpm-lock.yaml* ./
RUN pnpm install
COPY . .
RUN pnpm build

FROM node:18-alpine

WORKDIR /app
RUN apk add --no-cache pnpm
COPY package.json pnpm-lock.yaml* ./
RUN pnpm install --prod

COPY --from=builder /app/dist ./dist
ENV NODE_ENV=production

CMD ["pnpm", "start"]