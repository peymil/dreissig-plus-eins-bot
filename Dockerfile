# Install dependencies only when needed
FROM node:lts-alpine AS builder
# Check https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine to understand why libc6-compat might be needed.
WORKDIR /app
COPY package.json yarn.lock ./
RUN yarn install --ignore-scripts
COPY . .
RUN yarn build

# Rebuild the source code only when needed
FROM node:lts-alpine AS deps-prod
WORKDIR /app
COPY package.json yarn.lock ./
RUN yarn install --ignore-scripts --production

# Production image, copy all the files and run next
FROM node:lts-alpine AS runner
WORKDIR /app

COPY --from=builder /app/dist ./
COPY --from=deps-prod /app/node_modules ./node_modules

EXPOSE 8080

CMD ["node", "main"]