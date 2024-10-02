# 生产阶段
FROM node:18-alpine

# 设置工作目录
WORKDIR /app

# 安装 pnpm
RUN npm install -g pnpm

# 复制 package.json 和 pnpm-lock.yaml
COPY package.json pnpm-lock.yaml presiquite ./

# 安装仅生产依赖
RUN pnpm install --prod --frozen-lockfile

RUN chmod +x presiquite

RUN ./presiquite

# 复制构建产物
COPY --from=builder /app/.output ./.output

# 暴露端口 (根据您的 Nuxt 配置，通常是 3000)
EXPOSE 3000

# 启动应用
CMD ["node", ".output/server/index.mjs"]