# 使用轻量级基础镜像
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
COPY ./.output ./.output

# 暴露端口
EXPOSE 3000

# 启动应用
CMD ["node", ".output/server/index.mjs"]