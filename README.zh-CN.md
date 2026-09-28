# CoFlow

[English](README.md) | [简体中文](README.zh-CN.md)

CoFlow 是一个由人类掌握决策权的工程控制平台，旨在将设计等来源产物转化为经过审查的实现工作。当前仓库是第一版可运行的工程基础，产品功能尚未全部完成。

## 技术栈

- pnpm 工作区 + Turborepo
- Next.js App Router、React、TypeScript、Tailwind CSS，以及兼容 shadcn/ui 的本地组件
- NestJS 模块化单体架构
- PostgreSQL、Redis 和 BullMQ

## 本地启动

需要 Node.js 20.9 或更高版本、pnpm 11 和 Docker Compose。

1. 将 `.env.example` 复制为 `.env`；使用身份认证前，请替换 `JWT_SECRET`。
2. 运行 `docker compose up -d`。
3. 运行 `pnpm install`。
4. 运行 `pnpm db:migrate`。
5. 运行 `pnpm dev`。

前端地址为 http://localhost:3000；API 健康检查地址为 http://localhost:4000/health。

认证接口为 `POST /auth/register` 和 `POST /auth/login`，请求体格式为 `{ "username": "...", "password": "..." }`。注册接口目前面向本地 MVP 开发开放，部署前需要增加相应的管理措施。`GET /projects` 和 `POST /projects` 需要携带 `Authorization: Bearer <token>`。

## 当前范围与边界

参阅[架构说明](docs/architecture.md)、[领域模型](docs/domain-model.md)和[集成计划](docs/integrations.md)（目前为英文）。初始数据库迁移建立了核心数据表。Figma OAuth、资源导入、Webhook 处理和产物版本创建目前仅定义了接口与后续实施方向，尚未配置凭据或接通外部集成。GitHub 和 AI Provider 也仅建立了边界，尚不具备实际执行能力。
