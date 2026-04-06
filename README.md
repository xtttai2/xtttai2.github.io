# xtttai2.github.io

一个基于 **Astro** 的极简个人博客，目标是：

- 以 Markdown 为核心发布文章
- 支持 KaTeX 公式、图片、代码块
- 支持标题与正文全文搜索
- 支持单一类别归档
- 显示发布日期 / 更新日期
- 文章页右侧目录
- 接入 Giscus 评论
- 部署到 GitHub Pages

## 本地开发

```bash
npm install
npm run dev
```

默认地址是 `http://localhost:4321`。

## 关键目录

```text
src/
├── components/      # 搜索框、目录、评论等组件
├── config/          # 站点与 Giscus 配置
├── content/posts/   # Markdown 文章
├── layouts/         # 全局布局
├── lib/             # 文章与日期工具函数
├── pages/           # 首页、搜索、类别页、文章页、搜索索引
└── styles/          # 全局样式
```

## 写文章

文章放在 `src/content/posts/`，frontmatter 结构如下：

```yaml
---
title: 文章标题
description: 文章简介 # 可选
date: 2026-04-05
updated: 2026-04-06 # 可选
category: 建站
draft: false        # 可选
---
```

首页会按 `date` 倒序展示最近文章；如果填了 `updated`，文章页和列表页都会显示更新日期。`description` 不填时，文章页不会显示摘要，列表页和搜索结果会自动截取正文开头作为摘要。

## 搜索实现

搜索使用静态生成的 `/search-index.json`，前端加载后匹配：

- 标题
- description
- 正文内容

适合文章量不大的个人博客，不依赖外部搜索服务。

## Giscus 配置

编辑 `src/config/site.ts`：

```ts
giscus: {
  enabled: true,
  repo: 'xtttai2/xtttai2.github.io',
  repoId: '',
  category: 'Comments',
  categoryId: '',
  // ...
}
```

其中 `repoId` 和 `categoryId` 需要到 Giscus 配置页面生成后填入；未填时页面会保留一个清晰的占位提示。

## 构建与检查

```bash
npm run check
npm run build
```

## 部署

仓库已包含 `.github/workflows/deploy.yml`，推送到 `main` 后即可通过 GitHub Pages 工作流发布。
