# 使用官方 Node.js 镜像作为基础镜像
FROM node:20-alpine AS builder

# 设置工作目录
WORKDIR /app

# 安装 pnpm
RUN npm install -g pnpm

# 复制 package.json 和 pnpm-lock.yaml
COPY package.json pnpm-lock.yaml ./

# 安装依赖
RUN pnpm install --frozen-lockfile

# 复制剩余源代码
COPY . .

# 构建应用
RUN pnpm build

# 生产阶段
FROM node:18-alpine

# 设置工作目录
WORKDIR /app

# 安装 pnpm
RUN npm install -g pnpm

# 复制 package.json 和 pnpm-lock.yaml
COPY package.json pnpm-lock.yaml ./

# 安装仅生产依赖
RUN pnpm install --prod --frozen-lockfile

# 复制构建产物
COPY --from=builder /app/.output ./.output

# 暴露端口 (根据您的 Nuxt 配置，通常是 3000)
EXPOSE 3000

# 启动应用
CMD ["node", ".output/server/index.mjs"]