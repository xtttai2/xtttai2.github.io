# xtttai2.github.io

一个基于 **Astro** 的极简个人 blog。

## 写作

文章存放在 `src/content/posts/` 下。文件名尽量用英文以确保文章链接稳定。

### frontmatter 格式

```yaml
---
title: title
description: description # optional
date: 2026-04-06
updated: 2026-04-06 # optional
category: category
---
```

## 预览

```
npm run dev
```

## 发布

```
git add .
git commit -m "Add new post/Update post"
git push
```

## 图片

存放于 `public/images` 下，文章中可以用形如 `![](/images/xxx.png)` 的方式引用。

## 友链

填写于 `src/config/friends.ts`。
