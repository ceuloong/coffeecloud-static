# Coffee Cloud Company Limited

基于 SvelteKit 开发的 Filecoin 云算力服务平台前端项目。

## 功能特性

- 🔐 用户认证与授权
  - 登录/注册
  - 邮箱验证
  - 实名认证
  - 密码重置

- 📊 数据分析
  - 算力统计
  - 收益趋势
  - 节点监控
  - 实时数据

- 💰 收益管理
  - 收益记录
  - 提现管理
  - 账单明细
  - 收益预测

- 👤 账户管理
  - 个人信息
  - 安全设置
  - 通知设置
  - 实名认证

## 技术栈

- 🎯 [SvelteKit](https://kit.svelte.dev/) - 全栈 Web 应用框架
- 💅 [TailwindCSS](https://tailwindcss.com/) - CSS 框架
- 📊 [Chart.js](https://www.chartjs.org/) - 图表库
- 🌐 [i18n](https://github.com/kaisermann/svelte-i18n) - 国际化
- 🔒 [JWT](https://jwt.io/) - 身份认证
- 📦 [Vite](https://vitejs.dev/) - 构建工具

## 开发环境

### 系统要求

- Node.js >= 16.0.0
- npm >= 7.0.0
- MySQL >= 8.0
- Git

### 发布

1. **构建命令**
```bash
npm run build
```

2. **构建输出**

- 默认输出到 `build` 目录

- 如果使用 `@sveltejs/adapter-node`（你的项目正在使用这个），构建后的文件结构大致如下：
```
build/
├── index.js          # 服务器入口文件
├── client/          # 客户端资源
│   ├── _app/       # 编译后的应用代码
│   └── ...         # 其他静态资源
├── server/         # 服务端代码
└── prerendered/   # 预渲染的页面（如果有）
```

3. **发布文件**
将 build 目录下的文件复制到服务器指定目录，并启动 Node.js 服务。

需要发布的内容：
- `.env.production`（如果有环境变量）
- `package.json`
- `node_modules`（生产依赖）
- `build` 目录


4. **启动命令**
```bash
node build/index.js
```

5. **生产环境部署示例**
```bash
# 1. 创建部署目录
mkdir deploy

# 2. 复制必要文件
cp -r build deploy/
cp package.json deploy/
cp .env.production deploy/

# 3. 安装生产依赖
cd deploy
npm install --production

# 4. 启动应用
node build/index.js
```


6. **Docker 部署示例**

```bash
FROM node:18-alpine

WORKDIR /app

# 复制构建文件和依赖
COPY build build/
COPY package.json .
COPY .env.production .

# 只安装生产依赖
RUN npm install --production

# 设置环境变量
ENV NODE_ENV=production

# 启动应用
CMD ["node", "build/index.js"]
```
