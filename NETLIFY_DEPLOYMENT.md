# 🚀 Netlify 部署指南

本指南将帮助您将"湖北工业大学蓝鲸摄影艺术协会培训记录站"部署到 Netlify。

## 📋 准备工作

- ✅ 项目已推送到 GitHub
- ✅ Supabase 数据库已配置
- ✅ Netlify 配置文件已创建

## 🌐 部署步骤

### 1. 访问 Netlify

打开浏览器，访问: [https://netlify.com](https://netlify.com)

### 2. 注册/登录账号

- 点击右上角的 **Sign up**（如果没有账号）
- 或点击 **Log in**（如果已有账号）
- **推荐**：使用 GitHub 账号登录，可以直接关联仓库

### 3. 导入项目

#### 方法一：从 GitHub 导入（推荐）

1. 登录后，点击 **Add new site** → **Import an existing project**
2. 选择 **Deploy with GitHub**
3. 如果是第一次使用，需要授权 Netlify 访问 GitHub
4. 在仓库列表中找到 `zhengsuanfa/hbut-lanjing-training`
5. 点击该仓库

#### 方法二：手动部署

如果找不到仓库，可以：
1. 点击 **Add new site** → **Deploy manually**
2. 在本地运行 `npm run build`
3. 将 `build` 文件夹拖到 Netlify

### 4. 配置构建设置

Netlify 会自动检测 `netlify.toml` 配置，通常不需要手动设置。

**如果需要手动配置**：

- **Branch to deploy**: `main`
- **Build command**: `npm run build`
- **Publish directory**: `build`

### 5. 部署网站

1. 检查配置无误后，点击 **Deploy site**
2. 等待构建完成（通常 1-3 分钟）
3. 构建完成后，会显示一个随机生成的网址，如：`https://random-name-12345.netlify.app`

### 6. 自定义域名（可选）

#### 修改 Netlify 子域名

1. 在项目面板中，点击 **Site settings**
2. 点击 **Change site name**
3. 输入您想要的名称，如：`hbut-lanjing-training`
4. 保存后，网址变为：`https://hbut-lanjing-training.netlify.app`

#### 使用自定义域名

如果您有自己的域名：

1. 在项目设置中，点击 **Domain management**
2. 点击 **Add custom domain**
3. 输入您的域名（如：`training.yourdomain.com`）
4. 按照提示配置 DNS 记录

## ✅ 验证部署

部署成功后：

1. **访问网站**：点击 Netlify 提供的网址
2. **测试功能**：
   - 查看首页是否正常显示
   - 点击培训记录查看详情
   - 进入管理后台（密码：`lanjing2025`）
   - 尝试添加/编辑/删除记录
3. **检查数据**：确认数据与 Supabase 同步

## 🔄 自动部署

配置好后，每次您推送代码到 GitHub：

1. Netlify 会自动检测更新
2. 自动运行构建
3. 自动部署新版本
4. 整个过程 1-3 分钟

## 📊 监控和管理

### 查看部署状态

在 Netlify 项目面板中：
- **Deploys** 标签：查看所有部署历史
- **Production deploys**：当前生产环境
- **Deploy previews**：预览版本

### 查看访问统计

- **Analytics** 标签：查看访问量、访客等数据（需要付费计划）
- **Functions** 标签：无服务器函数（本项目未使用）

### 回滚版本

如果新版本有问题：
1. 进入 **Deploys** 标签
2. 找到之前的成功部署
3. 点击 **...** → **Publish deploy**
4. 立即回滚到该版本

## 🔧 常见问题

### 问题 1: 构建失败

**可能原因**：
- Node.js 版本不匹配
- 依赖安装失败

**解决方法**：
- 在 Netlify 设置中指定 Node 版本：Settings → Environment → Environment variables
- 添加：`NODE_VERSION = 18`

### 问题 2: 页面刷新后 404

**原因**：SPA 路由配置问题

**解决方法**：
- 确认 `netlify.toml` 和 `public/_redirects` 文件存在
- 重新部署

### 问题 3: 无法连接 Supabase

**原因**：网络问题或 CORS 配置

**解决方法**：
- 检查 Supabase 项目是否正常运行
- 在 Supabase 设置中检查 CORS 配置
- 查看浏览器控制台错误信息

### 问题 4: 管理后台无法访问

**原因**：路由配置问题

**解决方法**：
- 使用完整路径：`https://your-site.netlify.app/#/admin`
- 确认重定向规则已生效

## 🌟 优化建议

### 1. 启用 HTTPS

Netlify 默认启用 HTTPS，无需额外配置。

### 2. 配置表单

如果未来需要添加表单功能，Netlify 提供免费的表单处理。

### 3. 环境变量

如果需要隐藏敏感信息：
1. 在 Netlify: Site settings → Environment variables
2. 添加变量（如：`VITE_SUPABASE_ANON_KEY`）
3. 在代码中使用 `import.meta.env.VITE_SUPABASE_ANON_KEY`

### 4. 性能优化

- Netlify 自动提供 CDN 加速
- 自动压缩资源
- 自动优化图片

## 📱 移动端访问

部署后的网站完全支持移动端访问：
- 响应式设计自动适配
- 在手机上可以正常管理培训记录

## 🎯 下一步

部署成功后，您可以：

1. ✅ 分享网站链接给协会成员
2. ✅ 在任何设备上访问和管理
3. ✅ 享受自动部署的便利
4. ✅ 查看 Netlify 提供的访问统计

## 🆘 获取帮助

如果遇到问题：
- [Netlify 文档](https://docs.netlify.com/)
- [Netlify 社区](https://answers.netlify.com/)
- 查看项目的 GitHub Issues

---

祝您部署顺利！ 🚀

Made with ❤️ by 湖北工业大学蓝鲸摄影艺术协会

