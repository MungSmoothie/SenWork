package models

// AboutInfo represents personal information
type AboutInfo struct {
	Name        string `json:"name"`
	Title       string `json:"title"`
	Bio         string `json:"bio"`
	Location    string `json:"location"`
	Email       string `json:"email"`
	Avatar      string `json:"avatar"`
	SocialLinks struct {
		GitHub   string `json:"github"`
		LinkedIn string `json:"linkedin"`
		Twitter  string `json:"twitter"`
	} `json:"socialLinks"`
}

// Skill represents a skill with proficiency level
type Skill struct {
	Name        string `json:"name"`
	Category    string `json:"category"`
	Proficiency int    `json:"proficiency"` // 1-100
	Icon        string `json:"icon"`
}

// Service represents a service that can be hired
type Service struct {
	ID           string   `json:"id"`
	Name         string   `json:"name"`
	ShortDesc    string   `json:"shortDesc"`
	FullDesc     string   `json:"fullDesc"`
	Category     string   `json:"category"` // golang, ai-agent, cloud-native, app, web, other
	Features     []string `json:"features"`
	Deliverables []string `json:"deliverables"`
	PriceRange   string   `json:"priceRange"`
	DeliveryTime string   `json:"deliveryTime"`
	TechStack    []string `json:"techStack"`
	Featured     bool     `json:"featured"`
	Popular      bool     `json:"popular"`
}

// Experience represents work experience
type Experience struct {
	ID          string   `json:"id"`
	Company     string   `json:"company"`
	Position    string   `json:"position"`
	StartDate   string   `json:"startDate"`
	EndDate     string   `json:"endDate"`
	Current     bool     `json:"current"`
	Description string   `json:"description"`
	TechStack   []string `json:"techStack"`
}

// ContactForm represents a contact form submission
type ContactForm struct {
	Name    string `json:"name" binding:"required"`
	Email   string `json:"email" binding:"required,email"`
	Subject string `json:"subject" binding:"required"`
	Message string `json:"message" binding:"required,min=10"`
}

// GetAbout returns personal information
func GetAbout() AboutInfo {
	return AboutInfo{
		Name:     "来杯绿豆冰沙",
		Title:    "Golang 后端工程师",
		Bio:      "热爱技术，专注于高性能后端开发。有多年 Go 语言开发经验，熟悉微服务架构、分布式系统设计。善于将复杂问题拆解为可执行的解决方案。",
		Location: "中国",
		Email:    " 2323831454@qq.com",
		Avatar:   "https://api.dicebear.com/7.x/avataaars/svg?seed=sen",
		SocialLinks: struct {
			GitHub   string `json:"github"`
			LinkedIn string `json:"linkedin"`
			Twitter  string `json:"twitter"`
		}{
			GitHub:   "https://github.com/MungSmoothie",
			LinkedIn: "https://linkedin.com/in/sen",
			Twitter:  "https://twitter.com/sen",
		},
	}
}

// GetSkills returns all skills
func GetSkills() []Skill {
	return []Skill{
		// Backend
		{Name: "Go", Category: "Backend", Proficiency: 95, Icon: "go"},
		{Name: "Gin", Category: "Backend", Proficiency: 90, Icon: "gin"},
		{Name: "gRPC", Category: "Backend", Proficiency: 85, Icon: "grpc"},
		{Name: "Docker", Category: "Backend", Proficiency: 88, Icon: "docker"},
		{Name: "Kubernetes", Category: "Backend", Proficiency: 75, Icon: "k8s"},
		{Name: "MySQL", Category: "Database", Proficiency: 88, Icon: "mysql"},
		{Name: "PostgreSQL", Category: "Database", Proficiency: 82, Icon: "postgresql"},
		{Name: "Redis", Category: "Database", Proficiency: 85, Icon: "redis"},
		{Name: "MongoDB", Category: "Database", Proficiency: 75, Icon: "mongodb"},
		// Message Queue
		{Name: "RabbitMQ", Category: "Message Queue", Proficiency: 80, Icon: "rabbitmq"},
		{Name: "Kafka", Category: "Message Queue", Proficiency: 78, Icon: "kafka"},
		// Tools
		{Name: "Git", Category: "Tools", Proficiency: 90, Icon: "git"},
		{Name: "Linux", Category: "Tools", Proficiency: 85, Icon: "linux"},
		{Name: "Nginx", Category: "Tools", Proficiency: 80, Icon: "nginx"},
	}
}

// GetServices returns all available services
func GetServices() []Service {
	return []Service{
		{
			ID:           "1",
			Name:         "全栈毕业项目开发",
			ShortDesc:    "从 0 到 1 完整开发你的毕业设计",
			FullDesc:     "为计算机专业毕业生提供完整的毕业项目开发服务，从需求分析到论文答辩支持，覆盖整个开发周期。",
			Category:     "web",
			Features:     []string{"需求分析与文档", "系统设计与架构", "前后端开发实现", "数据库设计与优化", "部署与上线", "论文写作指导"},
			Deliverables: []string{"完整项目源码", "数据库脚本", "部署文档", "使用说明书", "演示视频"},
			PriceRange:   "3000-15000 元",
			DeliveryTime: "2-8 周",
			TechStack:    []string{"Go/Gin", "Vue3/React", "MySQL/PostgreSQL", "Docker"},
			Featured:     true,
			Popular:      false,
		},
		{
			ID:           "2",
			Name:         "Bug 修复与问题排查",
			ShortDesc:    "快速定位并修复系统 Bug",
			FullDesc:     "专业的问题排查和 Bug 修复服务，帮你解决系统中的疑难杂症，支持代码 review 和性能调优。",
			Category:     "golang",
			Features:     []string{"Bug 快速定位", "内存泄漏排查", "性能瓶颈分析", "并发问题修复", "代码 Review"},
			Deliverables: []string{"问题分析报告", "修复代码", "优化建议文档"},
			PriceRange:   "500-3000 元/次",
			DeliveryTime: "1-3 天",
			TechStack:    []string{"Go", "pprof", "Delve", "Linux"},
			Featured:     true,
			Popular:      false,
		},
		{
			ID:           "3",
			Name:         "前后端功能开发",
			ShortDesc:    "高效完成功能模块开发",
			FullDesc:     "承接各类前后端功能开发任务，快速响应，高质量交付。支持敏捷开发模式。",
			Category:     "web",
			Features:     []string{"后端 API 开发", "前端页面开发", "数据库设计", "接口联调", "单元测试"},
			Deliverables: []string{"功能代码", "接口文档", "测试报告"},
			PriceRange:   "1000-10000 元/模块",
			DeliveryTime: "1-4 周/模块",
			TechStack:    []string{"Go", "Gin/Echo", "Vue3/React", "MySQL", "Redis"},
			Featured:     true,
			Popular:      false,
		},
		{
			ID:           "4",
			Name:         "技术文档撰写",
			ShortDesc:    "专业规范的技术文档",
			FullDesc:     "提供专业的技术文档撰写服务，包括 API 文档、系统设计文档、用户手册等。",
			Category:     "other",
			Features:     []string{"API 接口文档", "系统设计文档", "用户使用手册", "运维文档", "技术博客"},
			Deliverables: []string{"Markdown/PDF 文档", "Swagger 文档", "在线文档站点"},
			PriceRange:   "500-2000 元/份",
			DeliveryTime: "3-7 天/份",
			TechStack:    []string{"Markdown", "Swagger", "OpenAPI", "Docsify"},
			Featured:     false,
			Popular:      false,
		},
		{
			ID:           "5",
			Name:         "代码讲解与教学",
			ShortDesc:    "一对一代码教学服务",
			FullDesc:     "提供一对一代码讲解和教学服务，帮助你理解项目架构、学习新技术、提升编程能力。",
			Category:     "other",
			Features:     []string{"项目架构讲解", "核心代码解读", "编程思维训练", "面试辅导", "技术答疑"},
			Deliverables: []string{"一对一辅导", "代码注释详解", "学习笔记"},
			PriceRange:   "200-500 元/小时",
			DeliveryTime: "预约制",
			TechStack:    []string{"Go", "系统设计", "算法", "架构模式"},
			Featured:     false,
			Popular:      false,
		},
		{
			ID:           "6",
			Name:         "Go 语言开发",
			ShortDesc:    "专业 Go 后端开发服务",
			FullDesc:     "专注于 Go 语言后端开发，提供高性能、高并发的后端系统开发服务。",
			Category:     "golang",
			Features:     []string{"RESTful API 开发", "微服务架构", "高并发系统", "分布式系统", "性能优化"},
			Deliverables: []string{"完整项目代码", "技术方案文档", "部署指南"},
			PriceRange:   "5000-50000 元",
			DeliveryTime: "2-12 周",
			TechStack:    []string{"Go", "Gin/Echo/gRPC", "MySQL/Redis/Kafka", "Docker/Kubernetes"},
			Featured:     true,
			Popular:      false,
		},
		{
			ID:           "7",
			Name:         "AI Agent 开发",
			ShortDesc:    "大模型应用与智能体开发",
			FullDesc:     "基于大语言模型的 AI Agent 开发服务，包括智能对话系统、自动化工作流、RAG 知识库等。",
			Category:     "ai-agent",
			Features:     []string{"LLM 集成", "RAG 知识库", "Agent 框架开发", "提示词工程", "API 对接"},
			Deliverables: []string{"Agent 源码", "部署文档", "使用指南"},
			PriceRange:   "8000-30000 元",
			DeliveryTime: "3-8 周",
			TechStack:    []string{"Go", "OpenAI API", "LangChain", "向量数据库", "Docker"},
			Featured:     true,
			Popular:      false,
		},
		{
			ID:           "8",
			Name:         "云原生开发",
			ShortDesc:    "容器化与云原生架构",
			FullDesc:     "提供云原生应用开发和 DevOps 服务，帮助项目实现容器化部署和自动化运维。",
			Category:     "cloud-native",
			Features:     []string{"Docker 镜像构建", "Kubernetes 部署", "CI/CD 流水线", "服务网格", "监控告警"},
			Deliverables: []string{"Dockerfile/K8s 配置", "部署脚本", "监控配置"},
			PriceRange:   "3000-20000 元",
			DeliveryTime: "1-4 周",
			TechStack:    []string{"Docker", "Kubernetes", "Jenkins/GitHub Actions", "Prometheus", "Istio"},
			Featured:     false,
			Popular:      false,
		},
		{
			ID:           "9",
			Name:         "App 开发",
			ShortDesc:    "移动端应用开发",
			FullDesc:     "提供移动端应用开发服务，支持原生和跨平台开发，覆盖 iOS 和 Android 平台。",
			Category:     "app",
			Features:     []string{"原生 App 开发", "跨平台开发", "后端 API 开发", "第三方 SDK 集成", "应用上架"},
			Deliverables: []string{"安装包", "源码", "上架材料"},
			PriceRange:   "10000-80000 元",
			DeliveryTime: "4-16 周",
			TechStack:    []string{"Flutter/React Native", "Go 后端", "Firebase", "iOS/Android"},
			Featured:     false,
			Popular:      false,
		},
		{
			ID:           "10",
			Name:         "小程序开发",
			ShortDesc:    "微信/支付宝小程序开发",
			FullDesc:     "提供各平台小程序开发服务，包括商城、预约、内容展示等各类小程序。",
			Category:     "app",
			Features:     []string{"小程序前端开发", "后端 API 开发", "支付对接", "数据统计", "审核上架"},
			Deliverables: []string{"小程序源码", "后端代码", "部署文档"},
			PriceRange:   "3000-20000 元",
			DeliveryTime: "2-6 周",
			TechStack:    []string{"微信小程序", "Uni-app", "Go 后端", "MySQL"},
			Featured:     false,
			Popular:      false,
		},
		{
			ID:           "11",
			Name:         "数据库设计与优化",
			ShortDesc:    "专业数据库架构设计服务",
			FullDesc:     "提供专业的数据库设计和优化服务，包括ER图设计、表结构优化、索引策略规划等。",
			Category:     "golang",
			Features:     []string{"ER 图设计", "表结构优化", "索引策略规划", "数据迁移方案", "查询优化"},
			Deliverables: []string{"数据库设计文档", "DDL 脚本", "优化建议报告"},
			PriceRange:   "800-3000 元",
			DeliveryTime: "1-2 周",
			TechStack:    []string{"MySQL", "PostgreSQL", "Redis", "MongoDB"},
			Featured:     false,
			Popular:      false,
		},
		{
			ID:           "12",
			Name:         "服务器部署与运维",
			ShortDesc:    "一站式服务器部署服务",
			FullDesc:     "提供专业的服务器部署和运维服务，支持各类云环境和容器化部署。",
			Category:     "cloud-native",
			Features:     []string{"Linux 环境配置", "Docker 容器化部署", "Nginx 反向代理", "SSL 证书配置", "监控告警设置"},
			Deliverables: []string{"部署文档", "运维手册", "监控配置"},
			PriceRange:   "500-2000 元/次",
			DeliveryTime: "1-3 天",
			TechStack:    []string{"Linux", "Docker", "Nginx", "Certbot", "Prometheus"},
			Featured:     false,
			Popular:      true,
		},
		{
			ID:           "13",
			Name:         "性能优化",
			ShortDesc:    "全方位的系统性能优化",
			FullDesc:     "提供全方位的系统性能优化服务，从数据库到应用层，全面提升系统响应速度。",
			Category:     "golang",
			Features:     []string{"数据库查询优化", "后端接口优化", "前端加载速度提升", "并发处理优化", "缓存策略设计"},
			Deliverables: []string{"性能测试报告", "优化方案文档", "优化后代码"},
			PriceRange:   "1000-5000 元/次",
			DeliveryTime: "1-2 周",
			TechStack:    []string{"Go", "MySQL", "Redis", "Vite", "pprof"},
			Featured:     false,
			Popular:      true,
		},
		{
			ID:           "14",
			Name:         "安全审计与加固",
			ShortDesc:    "系统安全性评估与加固",
			FullDesc:     "提供系统安全性评估和加固服务，帮助发现和修复潜在的安全漏洞。",
			Category:     "golang",
			Features:     []string{"漏洞扫描分析", "代码安全审计", "权限控制优化", "SQL 注入防护", "XSS 攻击防护"},
			Deliverables: []string{"安全评估报告", "加固建议文档", "修复代码"},
			PriceRange:   "面议",
			DeliveryTime: "1-2 周",
			TechStack:    []string{"Go Security", "SQLMap", "OWASP ZAP"},
			Featured:     false,
			Popular:      false,
		},
		{
			ID:           "15",
			Name:         "技术咨询",
			ShortDesc:    "专业技术咨询服务",
			FullDesc:     "提供专业技术咨询服务，帮助解决技术选型、架构设计等疑难问题。",
			Category:     "other",
			Features:     []string{"技术选型建议", "架构设计评审", "项目可行性分析", "技术难点攻关", "代码规范指导"},
			Deliverables: []string{"咨询报告", "技术方案文档", "实施建议"},
			PriceRange:   "200-500 元/小时",
			DeliveryTime: "预约制",
			TechStack:    []string{"架构设计", "系统优化", "技术选型"},
			Featured:     false,
			Popular:      true,
		},
		{
			ID:           "16",
			Name:         "代码审查",
			ShortDesc:    "专业的代码审查服务",
			FullDesc:     "提供专业的代码审查服务，帮助发现潜在问题，提升代码质量和可维护性。",
			Category:     "other",
			Features:     []string{"代码规范检查", "潜在问题识别", "最佳实践建议", "重构方案提供", "性能隐患排查"},
			Deliverables: []string{"审查报告", "重构建议文档", "优化代码示例"},
			PriceRange:   "500-2000 元/次",
			DeliveryTime: "1-3 天",
			TechStack:    []string{"Go", "JavaScript", "SQL", "系统设计"},
			Featured:     false,
			Popular:      false,
		},
	}
}

// GetExperience returns work experience
func GetExperience() []Experience {
	return []Experience{
		{
			ID:          "1",
			Company:     "某某科技公司",
			Position:    "高级 Go 开发工程师",
			StartDate:   "2022-03",
			EndDate:     "至今",
			Current:     true,
			Description: "负责核心交易系统的设计与开发，优化系统性能，QPS 提升 50%。带领团队完成微服务架构改造。",
			TechStack:   []string{"Go", "gRPC", "Redis", "Kafka", "Kubernetes"},
		},
		{
			ID:          "2",
			Company:     "某某互联网公司",
			Position:    "后端开发工程师",
			StartDate:   "2020-06",
			EndDate:     "2022-02",
			Current:     false,
			Description: "负责电商平台后端开发，参与订单系统、支付系统的设计与实现。",
			TechStack:   []string{"Go", "Gin", "MySQL", "RabbitMQ", "Docker"},
		},
		{
			ID:          "3",
			Company:     "某某软件公司",
			Position:    "Java 开发工程师",
			StartDate:   "2018-07",
			EndDate:     "2020-05",
			Current:     false,
			Description: "负责企业内部管理系统开发，积累扎实的编程基础。",
			TechStack:   []string{"Java", "Spring Boot", "MySQL", "Vue"},
		},
	}
}
