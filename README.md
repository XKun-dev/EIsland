# EIsland

一个仿 macOS 灵动岛风格的 Windows 桌面小工具，提供时间天气、倒计时等实用功能。

## 功能特性

- **灵动岛交互**：鼠标悬停展开，点击显示更多操作
- **时间天气**：实时显示当前时间和天气信息
- **倒计时**：支持自定义倒计时功能
- **快捷操作**：一键锁屏、关机、切换主题
- **多形状切换**：支持胶囊、矩形、顶部融合边界、底部圆角等多种形状
- **系统托盘**：最小化到系统托盘，不占用任务栏
- **深色/浅色主题**：支持明暗主题切换

## 技术栈

- **前端框架**：Vue 3 + TypeScript
- **桌面框架**：Electron
- **UI 组件库**：Naive UI
- **状态管理**：Pinia
- **样式**：SCSS
- **构建工具**：Vite

## 项目结构

```
EIsland/
├── electron/              # Electron 主进程代码
│   ├── main.ts           # 主进程入口
│   ├── preload.ts        # 预加载脚本
│   └── ipcHandler.ts     # IPC 通信处理
├── src/
│   ├── assets/           # 静态资源
│   ├── components/       # Vue 组件
│   ├── router/           # 路由配置
│   ├── stores/           # Pinia 状态管理
│   ├── views/            # 页面视图
│   │   ├── island/       # 灵动岛主界面
│   │   └── setting/      # 设置页面
│   ├── App.vue           # 根组件
│   └── main.ts           # 渲染进程入口
├── dist/                 # 前端构建输出
├── dist-electron/        # Electron 构建输出
├── release/              # 安装包输出
├── package.json
├── vite.config.ts
├── electron-builder.json5
└── tsconfig.json
```

## 开发环境

- Node.js 18+
- npm 或 yarn

## 安装与运行

### 安装依赖

```bash
npm install
```

### 开发模式

```bash
npm run dev
```

### 构建应用

```bash
npm run build
```

构建完成后，安装包将输出到 `release/${version}` 目录。

## 使用说明

1. **启动应用**：运行程序后，灵动岛会显示在屏幕顶部中央
2. **悬停展开**：鼠标悬停在灵动岛上会展开显示更多信息
3. **点击操作**：点击灵动岛显示快捷操作按钮（主题切换、锁屏、设置、关机、退出）
4. **系统托盘**：右键点击托盘图标可显示/隐藏灵动岛或退出程序
5. **设置页面**：点击设置图标进入设置页面，可自定义形状、主题等

## 快捷键

- 暂无全局快捷键，所有操作通过鼠标交互完成

## 配置说明

应用配置存储在本地，包括：

- 主题设置（深色/浅色）
- 灵动岛形状
- 倒计时设置

## 打包配置

支持多平台打包：

- **Windows**：NSIS 安装程序 (`.exe`)
- **macOS**：DMG 安装包 (`.dmg`)
- **Linux**：AppImage 格式

打包配置详见 `electron-builder.json5`。

## 作者

- **XKun** - [GitHub](https://github.com/XKun-dev)

## 许可证

[MIT](LICENSE)

---

如果觉得这个项目对你有帮助，欢迎给个 Star ⭐
