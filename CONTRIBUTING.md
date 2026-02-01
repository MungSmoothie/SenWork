# 贡献指南

感谢您有兴趣为 SenWork 项目贡献力量！

## 如何贡献

### 报告 Bug
1. 在 GitHub Issues 中创建新的 Bug 报告
2. 描述问题现象和复现步骤
3. 提供环境信息（浏览器、操作系统等）

### 提出新功能
1. 在 GitHub Issues 中创建功能请求
2. 描述功能用途和预期效果
3. 说明实现方案（可选）

### 提交代码
1. Fork 本仓库
2. 创建功能分支 (`git checkout -b feature/amazing-feature`)
3. 提交更改 (`git commit -m 'Add amazing feature'`)
4. 推送到分支 (`git push origin feature/amazing-feature`)
5. 创建 Pull Request

## 开发规范

### 代码风格

**TypeScript**
- 使用 TypeScript 严格模式
- 所有函数必须有类型定义
- 优先使用接口而非类型别名
- 使用 `const` 声明常量

**Vue 组件**
- 使用 `<script setup lang="ts">` 语法
- 组件文件使用 PascalCase 命名
- Props 使用 TypeScript 类型定义
- Emits 使用函数式语法

**CSS**
- 使用 CSS 变量（见 `src/assets/theme.css`）
- 组件样式使用 `scoped`
- 遵循 BEM 命名约定的简化版本

### Git 提交规范

```
feat: 新功能
fix: 修复 bug
docs: 文档更新
style: 代码格式调整
refactor: 重构
perf: 性能优化
test: 添加测试
chore: 构建工具或辅助工具的更改
```

### 示例提交信息

```
feat: 添加项目卡片悬停效果
fix: 修复联系表单验证问题
docs: 更新 README 文档
```

## 项目结构

```
frontend/
├── src/
│   ├── api/           # API 调用层
│   ├── assets/        # 静态资源
│   ├── components/    # 组件
│   │   └── ui/        # 基础 UI 组件
│   ├── router/        # 路由配置
│   ├── types/         # TypeScript 类型
│   ├── utils/         # 工具函数
│   └── views/         # 页面视图
└── tests/             # 测试文件
```

## 测试指南

### 运行测试

```bash
# 运行所有测试
npm test

# 运行单元测试
npm run test:unit

# 运行 E2E 测试
npm run test:e2e

# 生成测试覆盖率报告
npm run test:coverage
```

### 编写测试

- 使用 Vitest 测试框架
- 测试文件放在 `__tests__` 目录
- 遵循 AAA 模式（Arrange, Act, Assert）
- 为关键业务逻辑编写测试

## 代码审查

### 审查标准
- 代码是否遵循项目规范？
- 是否有完整的类型定义？
- 是否添加了必要的测试？
- 是否有清晰的注释？

### 审查流程
1. 至少需要 1 位维护者批准
2. 所有 CI 检查必须通过
3. 解决所有评论后才能合并

## 社区

- GitHub Issues: 问题反馈和功能请求
- Discussions: 讨论和问答
- 邮件: sen@example.com（仅限重要事务）

感谢您的贡献！
