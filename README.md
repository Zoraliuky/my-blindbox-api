盲盒抽盒机 后端
大作业的后端部分，基于 MidwayJS (Koa) 和 TypeScript 构建，为前端提供所有需要的数据接口和业务逻辑支持

Windows

核心功能
用户认证: 提供用户注册和登录接口，密码使用 bcryptjs 加密存储

数据管理: 实现对用户、盲盒、订单、评论等核心数据的增删改查 (CRUD) 业务

业务逻辑: 包含用户抽盒、查询历史订单、发表评论等核心业务流程

后端技术栈
核心框架: MidwayJS v3 (基于 Koa)

编程语言: TypeScript

数据库 ORM: TypeORM

数据库: SQLite

跨域处理: @midwayjs/cross-domain

如何运行
电脑已安装 Node.js

### 克隆本仓库

git clone https://github.com/Zoraliuky/my-blindbox-api.git

### 进入项目目录

cd my-blind-box-api

### 安装依赖

npm install

### 启动开发服务

npm run dev

服务启动后，将在 http://127.0.0.1:7001 上监听请求
数据库文件 webapp.sqlite 将在首次启动时自动创建

API 接口概览
POST /api/user/register: 用户注册

POST /api/user/login: 用户登录

GET, POST, PUT, DELETE /api/blind-box: 盲盒的增删改查

POST /api/order/draw: 抽盒 (创建订单)

GET /api/order: 查询用户订单

GET, POST /api/comment: 获取和发表评论

仓库地址
后端代码库: https://github.com/Zoraliuky/my-blindbox-api

前端代码库: https://github.com/Zoraliuky/my-blindbox-app

学号: 241880087

姓名: 刘可宜
