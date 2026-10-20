# 契语 QI-YU · 官网（前端骨架）

「手语识别 × 甲骨文生成系统」——用 AI 打通「手语 → 现代汉语 → 甲骨文」的双向文化桥梁。

> 本仓库为项目**官网前端骨架**：结构已搭好、首页按《手语转甲骨文_设计方案.md》设计，内容与数据均为**占位**，待接入真实模型与字形库后填充。

## 技术说明

- **纯静态站**：HTML + CSS + 原生 JS，零依赖、零构建，双击 `index.html` 即可打开。
- 后续可平滑迁移到 uni-app（一套代码编译小程序 + H5），当前阶段先落地 H5 官网。
- 首页覆盖：品牌 Hero / 定位条 / 六段式流水线 / 甲骨字形库（占位）/ 卜辞卷轴演示 / 技术栈 / 部署架构 / 关于。

## 目录结构

```
qi-yu-web/
├── index.html        # 首页（单页）
├── css/
│   └── style.css     # 样式（骨色 / 墨黑 / 朱砂 / 金）
├── js/
│   └── main.js       # 交互 + 词表占位数据 + 字形占位 SVG
└── README.md
```

## 本地预览

方式一：直接双击 `index.html`。
方式二（推荐，便于后续调试）：
```bash
cd qi-yu-web
python -m http.server 8000
# 浏览器打开 http://localhost:8000
```

## 部署到 GitHub Pages

1. 在 GitHub 新建仓库（如 `qi-yu`），把本目录推送上去：
   ```bash
   git init
   git add .
   git commit -m "init: 契语官网前端骨架"
   git branch -M main
   git remote add origin https://github.com/<你的用户名>/qi-yu.git
   git push -u origin main
   ```
2. 仓库 → Settings → Pages → Branch 选 `main` / `/(root)` → Save。
3. 稍等片刻，访问 `https://<你的用户名>.github.io/qi-yu/` 即可。

## 后续填充清单（对应设计方案）

- [ ] 真实甲骨字形库：HWOBC / HUST-OBC 二值图 → potrace 矢量化 → SVG（替换 `js/main.js` 中的占位 SVG）
- [ ] 词表完整化：300 词 × 已释读甲骨字映射表（含拼音、释义、构形解说、来源）
- [ ] 识别接口：`POST /api/v1/sign/recognize`（前端只发 HTTP、收 JSON/SVG URL）
- [ ] 卜辞卷轴真实渲染：竖排右起 + 龟甲底纹 + 印章
- [ ] 响应式打磨与无障碍（小程序迁移预留）

## 版权提醒

甲骨字形库建议自建（基于公开学术数据集矢量化），并留存来源与授权文件；方正甲骨文字库需在其官方渠道获取授权文件。
