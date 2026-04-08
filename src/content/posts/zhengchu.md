---
title: 整除
date: 2026-04-06
tags:
  - 数论
---

# 定义

设 $a, b \in \mathbb{Z}$，$a \neq 0$，如果存在 $q \in \mathbb{Z}$ 使得 $b = qa$，则称 $b$ 被 $a$ **整除**，记作 $a \mid b$；反之若不存在这样的 $q$ 就称 $b$ 不被 $a$ 整除，记作 $a \nmid b$。

# 性质

- $a \mid b \Longleftrightarrow -a \mid b \Longleftrightarrow a \mid -b \Longleftrightarrow |a| \mid |b|$

- $a \mid b \land b \mid c \Longrightarrow a \mid c$

- $a \mid b \land b \mid c \Longrightarrow \forall x,y \in \mathbb{Z}, a \mid (xb + yc)$

- $a \mid b \land b \mid a \Longrightarrow b = \pm a$

- 若 $m \neq 0$，那么 $a \mid b \Longleftrightarrow ma \mid mb$

- 若 $b \neq 0$，那么 $a \mid b \Longrightarrow |a| \leq |b|$

- 若 $a \neq 0, b = qa + c$，那么 $a \mid b \Longleftrightarrow a \mid c$

个人而言，整除的性质都很显而易见且符合直觉，几乎没有背下来的必要，使用起来也十分自然。
