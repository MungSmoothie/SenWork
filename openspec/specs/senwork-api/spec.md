# SenWork API 规范

## 概述

SenWork 是一个全栈个人作品集网站，采用 Go + Gin 作为后端 API，Vue 3 + TypeScript 作为前端。后端提供 RESTful API 接口，涵盖个人简介、技能展示、项目作品、工作经历和联系表单五个核心模块。

## API 基础信息

- **Base URL**: `http://localhost:8080/api`
- **协议**: HTTP
- **数据格式**: JSON
- **CORS**: 已配置，支持跨域请求

## 响应格式

所有 API 响应采用统一格式：

```json
{
  "success": true,
  "data": { ... },
  "message": "操作成功",
  "error": ""
}
```

**字段说明**：
- `success`: 布尔值，表示请求是否成功
- `data`: 响应数据，请求失败时为空
- `message`: 成功时的提示信息（可选）
- `error`: 失败时的错误信息（可选）

## API 端点

### 1. 获取个人简介

**端点**: `GET /about`

**响应数据** (AboutInfo):

| 字段 | 类型 | 说明 |
|------|------|------|
| name | string | 姓名 |
| title | string | 职称/职位 |
| bio | string | 个人简介 |
| location | string | 所在地区 |
| email | string | 联系邮箱 |
| avatar | string | 头像 URL |
| socialLinks | object | 社交链接 |
| socialLinks.github | string | GitHub 主页 |
| socialLinks.linkedin | string | LinkedIn 主页 |
| socialLinks.twitter | string | Twitter 主页 |

**示例响应**:
```json
{
  "success": true,
  "data": {
    "name": "Sen",
    "title": "Golang 后端工程师",
    "bio": "热爱技术，专注于高性能后端开发...",
    "location": "中国",
    "email": "sen@example.com",
    "avatar": "https://api.dicebear.com/7.x/avataaars/svg?seed=sen",
    "socialLinks": {
      "github": "https://github.com/sen",
      "linkedin": "https://linkedin.com/in/sen",
      "twitter": "https://twitter.com/sen"
    }
  }
}
```

### 2. 获取技能列表

**端点**: `GET /skills`

**响应数据** (Skill[]):

| 字段 | 类型 | 说明 |
|------|------|------|
| name | string | 技能名称 |
| category | string | 技能分类（Backend、Database、Message Queue、Tools） |
| proficiency | number | 熟练度（1-100） |
| icon | string | 图标标识 |

**示例响应**:
```json
{
  "success": true,
  "data": [
    {"name": "Go", "category": "Backend", "proficiency": 95, "icon": "go"},
    {"name": "Gin", "category": "Backend", "proficiency": 90, "icon": "gin"},
    {"name": "MySQL", "category": "Database", "proficiency": 88, "icon": "mysql"}
  ]
}
```

### 3. 获取项目列表

**端点**: `GET /projects`

**响应数据** (Project[]):

| 字段 | 类型 | 说明 |
|------|------|------|
| id | string | 项目 ID |
| name | string | 项目名称 |
| description | string | 项目描述 |
| techStack | string[] | 技术栈列表 |
| image | string | 项目封面图 URL |
| demoUrl | string | 演示地址 |
| repoUrl | string | 仓库地址 |
| featured | boolean | 是否推荐 |

**示例响应**:
```json
{
  "success": true,
  "data": [
    {
      "id": "1",
      "name": "电商秒杀系统",
      "description": "高并发秒杀系统，支持 10W+ QPS...",
      "techStack": ["Go", "Gin", "Redis", "Kafka", "MySQL"],
      "image": "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800",
      "demoUrl": "#",
      "repoURL": "https://github.com/sen/seckill-system",
      "featured": true
    }
  ]
}
```

### 4. 获取工作经历

**端点**: `GET /experience`

**响应数据** (Experience[]):

| 字段 | 类型 | 说明 |
|------|------|------|
| id | string | 记录 ID |
| company | string | 公司名称 |
| position | string | 职位名称 |
| startDate | string | 开始日期（YYYY-MM） |
| endDate | string | 结束日期（YYYY-MM） |
| current | boolean | 是否在职 |
| description | string | 工作描述 |
| techStack | string[] | 使用技术栈 |

**示例响应**:
```json
{
  "success": true,
  "data": [
    {
      "id": "1",
      "company": "某某科技公司",
      "position": "高级 Go 开发工程师",
      "startDate": "2022-03",
      "endDate": "至今",
      "current": true,
      "description": "负责核心交易系统的设计与开发...",
      "techStack": ["Go", "gRPC", "Redis", "Kafka", "Kubernetes"]
    }
  ]
}
```

### 5. 提交联系表单

**端点**: `POST /contact`

**请求头**: `Content-Type: application/json`

**请求数据** (ContactForm):

| 字段 | 类型 | 验证规则 | 说明 |
|------|------|----------|------|
| name | string | 必填 | 姓名 |
| email | string | 必填，邮箱格式 | 邮箱地址 |
| subject | string | 必填 | 主题 |
| message | string | 必填，最少 10 字符 | 消息内容 |

**请求示例**:
```json
{
  "name": "张三",
  "email": "zhang@example.com",
  "subject": "项目咨询",
  "message": "我想了解贵公司的 Go 开发外包服务..."
}
```

**成功响应**:
```json
{
  "success": true,
  "message": "消息已发送，我会尽快回复您"
}
```

**错误响应**:
```json
{
  "success": false,
  "error": "validation failed: message 长度至少为 10 个字符"
}
```

## 技术实现

### 路由配置 (main.go)

```go
router := gin.Default()
api := router.Group("/api")
{
    api.GET("/about", handlers.GetAbout)
    api.GET("/skills", handlers.GetSkills)
    api.GET("/projects", handlers.GetProjects)
    api.GET("/experience", handlers.GetExperience)
    api.POST("/contact", handlers.SubmitContact)
}
```

### 数据模型 (models/data.go)

- 所有数据模型与前端 TypeScript 类型定义保持一致
- 静态数据存储在 Go 代码中，便于维护
- 未来可扩展为数据库存储

### 错误处理

- 400 Bad Request: 请求参数验证失败
- 404 Not Found: 资源不存在
- 500 Internal Server Error: 服务器内部错误

## 扩展建议

1. **数据库集成**: 将静态数据迁移至 MySQL 或 PostgreSQL
2. **缓存层**: 添加 Redis 缓存提升 API 性能
3. **认证**: 为联系表单添加邮件确认
4. **分页**: 为项目列表添加分页支持
5. **搜索**: 添加技能或项目搜索功能
