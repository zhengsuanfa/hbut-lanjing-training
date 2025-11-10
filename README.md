# 🐋 湖北工业大学蓝鲸摄影艺术协会培训记录站

一个优雅的培训记录管理系统，专为湖北工业大学蓝鲸摄影艺术协会设计，支持 Markdown 格式内容展示。

## 📸 项目简介

湖北工业大学蓝鲸摄影艺术协会培训记录站是一个现代化的单页应用（SPA），用于管理和展示协会的培训课程记录。项目采用蓝色海洋主题设计，界面简洁优雅，支持完整的增删改查功能。

### ✨ 主要特性

- 🎨 **优雅的 UI 设计**：蓝色渐变主题，卡片式布局，精致的动画效果
- 📝 **Markdown 支持**：培训内容支持完整的 Markdown 语法渲染
- 🔐 **管理后台**：密码保护的后台管理系统
- 📱 **响应式设计**：完美适配各种屏幕尺寸
- ⚡ **快速构建**：基于 Vite 的开发环境，秒级热更新
- 🎯 **单列布局**：专注内容展示，清晰的视觉体验

## 🛠️ 技术栈

- **前端框架**: React 18.3.1
- **开发语言**: TypeScript
- **构建工具**: Vite 6.3.5
- **路由管理**: React Router (HashRouter)
- **UI 组件**: Radix UI
- **样式方案**: Tailwind CSS v4.1.3
- **Markdown 渲染**: react-markdown + remark-gfm
- **图标库**: Lucide React

## 🚀 快速开始

### 环境要求

- Node.js >= 16.0.0
- npm 或 yarn

### 安装依赖

```bash
npm install
```

### 启动开发服务器

```bash
npm run dev
```

项目将在 `http://localhost:3000` 启动，浏览器会自动打开。

### 构建生产版本

```bash
npm run build
```

构建产物将输出到 `build` 目录。

## 📁 项目结构

```
lanjing-training/
├── public/                  # 静态资源
│   └── favicon.png         # 网站图标
├── src/
│   ├── assets/             # 资源文件
│   ├── components/         # 组件目录
│   │   ├── AdminPage.tsx   # 管理后台页面
│   │   ├── TrainingList.tsx    # 培训列表页面
│   │   ├── TrainingDetail.tsx  # 培训详情页面
│   │   └── ui/             # UI 组件库
│   ├── App.tsx             # 主应用组件
│   ├── main.tsx            # 应用入口
│   └── index.css           # 全局样式
├── index.html              # HTML 模板
├── vite.config.ts          # Vite 配置
└── package.json            # 项目配置
```

## 🎯 功能说明

### 首页 - 培训列表

- 展示所有培训记录
- 单列卡片式布局
- 点击卡片查看详情
- 精美的头部设计

### 培训详情页

- 完整展示培训信息
- Markdown 格式内容渲染
- 支持录音/资料链接

### 管理后台

访问路径：`/#/admin`

**默认密码**: `lanjing2025`

管理功能：
- ✅ 添加新培训记录
- ✅ 编辑现有记录
- ✅ 删除记录
- ✅ 实时预览

## 📝 Markdown 语法支持

培训内容支持以下 Markdown 语法：

### 基础格式
- **粗体**: `**文本**`
- *斜体*: `*文本*`
- `代码`: `` `代码` ``

### 标题
```markdown
## 二级标题
### 三级标题
```

### 列表
```markdown
- 无序列表项
1. 有序列表项
```

### 引用
```markdown
> 引用文字
```

### 代码块
````markdown
```javascript
const code = "示例代码";
```
````

### 表格
```markdown
| 列1 | 列2 |
|-----|-----|
| 内容1 | 内容2 |
```

## 🔒 安全说明

- 管理后台采用密码保护
- 密码配置在 `src/components/AdminPage.tsx` 中
- 生产环境建议配置更强的身份验证机制

## 🎨 自定义配置

### 修改密码

编辑 `src/components/AdminPage.tsx`:

```typescript
if (password === 'lanjing2025') {  // 在此修改密码
  setIsAuthenticated(true);
}
```

### 修改主题颜色

主题颜色配置在 `src/index.css` 中的 CSS 变量：

```css
:root {
  --primary: #0d47a1;
  --secondary: #e3f2fd;
  /* 更多颜色配置... */
}
```

### 修改网站标题

编辑 `index.html` 和 `src/components/TrainingList.tsx` 中的相关文本。

## 📦 部署

### Vercel 部署

```bash
npm install -g vercel
vercel
```

### Netlify 部署

1. 将项目推送到 GitHub
2. 在 Netlify 导入仓库
3. 构建命令：`npm run build`
4. 发布目录：`build`

### GitHub Pages 部署

需要修改 `vite.config.ts`，添加 base 路径配置。

## 🤝 贡献

欢迎提交 Issue 和 Pull Request！

## 📄 开源协议

MIT License

## 👨‍💻 作者

湖北工业大学蓝鲸摄影艺术协会

## 📮 联系方式

如有问题或建议，请通过以下方式联系：

- GitHub Issues: [提交问题](https://github.com/zhengsuanfa/hbut-lanjing-training/issues)

## 🏫 关于我们

**湖北工业大学蓝鲸摄影艺术协会**（HBUT Blue Whale Photography Art Association）致力于为广大摄影爱好者提供交流学习的平台，促进摄影技术与艺术的发展。

---

**注意**：本项目数据存储在浏览器内存中，刷新页面会丢失修改。如需持久化存储，可以：
1. 使用 localStorage 存储数据
2. 连接后端 API
3. 使用数据库服务

---

Made with ❤️ by 湖北工业大学蓝鲸摄影艺术协会
