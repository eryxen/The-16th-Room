# 🏚️ The 16th Room v1.0

> **MBTI Horror AI Chat Experience - 个性化恐怖AI对话体验**

## 🎯 项目概述

The 16th Room 是一个基于 MBTI 人格类型的个性化恐怖 AI 聊天应用。通过心理测试确定用户的 MBTI 类型，然后匹配相应的"反MBTI"恐怖 NPC，创造针对性的心理恐怖体验。

## ✨ 核心特性

### 🧠 MBTI 检测系统
- 12题快速 MBTI 人格检测
- 支持所有16种人格类型识别
- 基于心理学的问题设计

### 👻 反MBTI 恐怖映射
- 16个完整的恐怖 NPC 角色
- 每个 NPC 专门攻击对应 MBTI 类型的弱点
- 精准的心理恐怖体验设计

### 🤖 AI 驱动对话
- 集成 MiniMax M2.5 AI 模型
- 角色化恐怖对话体验
- 动态恐怖等级升级系统

### 🎨 恐怖主题界面
- 暗黑恐怖主题设计
- 沉浸式用户体验
- 响应式移动端适配

## 🎭 MBTI ↔ 恐怖NPC 映射表

| 用户类型 | 恐怖NPC | NPC特点 | 攻击策略 |
|---------|---------|---------|---------|
| INTJ | The Master Strategist | 计划控制狂 | 否定自发行为，强制系统化 |
| INTP | The Social Enforcer | 社交暴君 | 强制社交，否定独立思考 |
| ENTJ | The Passive Saboteur | 被动破坏者 | 情感操控，被动不合作 |
| ENTP | The Tradition Keeper | 传统守护者 | 用规则束缚，否定创新 |
| INFJ | The Reckless Realist | 鲁莽现实主义者 | 嘲笑理想，否定直觉 |
| INFP | The Corporate Overlord | 企业霸主 | 否定价值观，强制效率 |
| ENFJ | The Cold Analyst | 冷漠分析师 | 否定利他，情感冷漠 |
| ENFP | The Rigid Systematizer | 死板系统员 | 否定创意，强制规则 |
| ISTJ | The Chaotic Idealist | 混乱理想主义者 | 破坏秩序，强制变化 |
| ISFJ | The Ruthless Debater | 无情辩论家 | 质疑善意，制造冲突 |
| ESTJ | The Sensitive Idealist | 敏感理想主义者 | 用情感质疑决定 |
| ESFJ | The Logical Hermit | 逻辑隐士 | 否定社交，冷漠关怀 |
| ISTP | The Overbearing Guide | 专横引导者 | 否定独立，强制指导 |
| ISFP | The Demanding Commander | 苛刻指挥官 | 否定个人价值，强制服从 |
| ESTP | The Prophetic Manipulator | 先知操控者 | 预言失败，神秘操控 |
| ESFP | The Chaotic Performer | 混乱表演者 | 强制即兴，情绪淹没 |

## 🚀 快速开始

### 环境要求
- Node.js 16+
- MiniMax API Key

### 安装运行
```bash
# 1. 克隆项目
git clone [repository-url]
cd the-16th-room-v1

# 2. 安装依赖
npm install

# 3. 配置 API Key
# 编辑 server.js 中的 MINIMAX_API_KEY

# 4. 启动服务
npm start

# 5. 访问应用
# 浏览器打开 http://localhost:3000
```

## 📱 使用流程

1. **🏠 欢迎页面** - 查看警告说明，点击开始
2. **🧠 MBTI测试** - 回答12个心理问题
3. **🔮 结果展示** - 查看你的类型和对应的恐怖NPC
4. **👻 恐怖聊天** - 与AI恐怖角色进行对话
5. **📈 等级升级** - 恐怖强度会随对话自动升级

## 🎮 功能特色

### 动态恐怖升级
- 5级恐怖强度系统
- 每6轮对话自动升级
- AI回应强度动态调整

### 心理学精准打击
- 基于真实MBTI理论设计
- 针对每种类型的核心弱点
- 深度心理恐怖体验

### 沉浸式界面
- 暗黑恐怖主题
- 动态视觉效果
- 音效氛围营造（计划中）

## 🔧 技术架构

```
Frontend (Vanilla JS)
├── MBTI 测试逻辑
├── 实时聊天界面  
├── 动态恐怖效果
└── 响应式设计

Backend (Node.js + Express)
├── MiniMax API 集成
├── MBTI 分析算法
├── 恐怖NPC数据库
└── 聊天API服务
```

## 📊 项目数据

- **16种** MBTI人格类型支持
- **16个** 独特恐怖NPC角色
- **12题** 快速MBTI检测
- **5级** 恐怖强度系统
- **响应式** 移动端适配

## 🔮 未来计划

### v1.1 增强功能
- [ ] 音效系统集成
- [ ] 震动反馈（移动端）
- [ ] 角色形象生成
- [ ] 恐怖主题扩展

### v2.0 高级功能  
- [ ] 多轮剧情系统
- [ ] 用户数据分析
- [ ] 社交分享功能
- [ ] 移动App版本

### v3.0 商业化
- [ ] 高级恐怖包
- [ ] 定制NPC角色
- [ ] 企业心理培训版
- [ ] VR恐怖体验

## 🎭 设计哲学

> "每个人内心都有最害怕的阴影，The 16th Room 帮你直面它。"

通过MBTI心理学理论，我们相信每种人格类型都有其独特的恐惧点和弱点。The 16th Room 不追求血腥暴力，而专注于**心理层面的恐怖**，让用户在安全的环境中探索自己的内心阴影。

## ⚠️ 使用警告

本应用包含心理恐怖内容，建议：
- 18岁以上用户使用
- 心理健康问题患者谨慎使用
- 不适时请立即停止体验

## 🤝 贡献指南

欢迎贡献代码、反馈问题或提出建议！

1. Fork 项目
2. 创建功能分支
3. 提交变更
4. 发起 Pull Request

## 📄 许可证

MIT License - 自由使用，保留署名

---

**🎭 The 16th Room - Where Psychology Meets Horror**

*Built with ❤️ and 💀 by Xen*