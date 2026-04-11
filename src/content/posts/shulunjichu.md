---
title: 数论基础
date: 2026-04-11
tags:
  - 数论
---

# 整除

## 定义

设 $a, b \in \mathbb{Z}$，$a \neq 0$，如果存在 $q \in \mathbb{Z}$ 使得 $b = qa$，则称 $b$ 被 $a$ **整除**，记作 $a \mid b$；反之若不存在这样的 $q$ 就称 $b$ 不被 $a$ 整除，记作 $a \nmid b$．

## 整出的性质

- $a \mid b \Longleftrightarrow -a \mid b \Longleftrightarrow a \mid -b \Longleftrightarrow |a| \mid |b|$

- $a \mid b \land b \mid c \Longrightarrow a \mid c$

- $a \mid b \land b \mid c \Longrightarrow \forall x,y \in \mathbb{Z}, a \mid (xb + yc)$

- $a \mid b \land b \mid a \Longrightarrow b = \pm a$

- 若 $m \neq 0$，那么 $a \mid b \Longleftrightarrow ma \mid mb$

- 若 $b \neq 0$，那么 $a \mid b \Longrightarrow |a| \leq |b|$

- 若 $a \neq 0, b = qa + c$，那么 $a \mid b \Longleftrightarrow a \mid c$

个人而言，整除的性质都很显而易见且符合直觉，几乎没有背下来的必要，使用起来也十分自然．

# 带余除法

对于 $a,b \in \mathbb{Z}, a \neq 0$，一定存在唯一的一对整数 $q$ 和 $r$ 使得 $b = qa + r, 0 \leq r < |a|$，这个等式就叫**带余除法**，其中 $r$ 称作**余数**．

## 余数的性质

- 任何整数被正整数 $a$ 除后，余数一定是且仅是 $0$ 到 $a - 1$ 这 $a$ 个数中的一个．

- 相邻的 $a$ 个整数被正整数 $a$ 除后，恰好取到上述 $a$ 个余数．特别地，一定有且仅有一个数被 $a$ 整除．

# 素数与合数

## 定义

设整数 $p \neq 0, \pm 1$，若 $p$ 除了平凡约数没有其它约数，则称 $p$ 为**素数**．

设整数 $a \neq 0, \pm 1$，若 $a$ 不是素数，就称 $a$ 为**合数**．

特别地，$0, \pm 1$ 既不是素数，也不是合数．

## 素数的性质

- 素数有无穷多个
- 所有大于 $3$ 的素数都可以表示为 $6n \pm 1$ 的形式．

# 最大公约数

## 定义

一组整数的**公约数**，是指同时是这组数中每一个数的约数的数，而**最大公约数**就是这些公约数中最大的一个．

对于不全为 $0$ 的整数 $a_1, \cdots, a_n$，将其最大公约数记作 $\gcd(a_1, \cdots, a_n)$，不引起歧义时简写作 $(a_1, \cdots, a_n)$．

## 最大公约数的性质

- $(a, b) = (|a|, |b|)$
- $(a, b) = (b, a)$
- $(a, 0) = (a, a) = a$
- $(bq + r, b) = (r, b)$
- $(a, b, c) = ((a, b), c)$
- $(ma, mb) = |m|(a, b)$
- 若 $(a, b) = d$，则 $(\frac{a}{d}, \frac{b}{d}) = 1$
- $(a^n, b^n) = (a, b) ^ n$

## 辗转相除法（欧几里得算法）求最大公约数

我们可以用辗转相除法（欧几里得算法）来求 $(a, b)$．

令 $a \ge b \ge 0$．如果 $b \mid a$，则显然 $(a, b) = b$．如果 $b \nmid a$，可以证明：

$$
(a, b) = (b, a \bmod b)
$$

### 证明

我们将证明 $a, b$ 的所有公约数，恰好等于 $b, a \bmod b$ 的所有公约数．这样一来，显然有 $(a, b) = (b, a \bmod b)$．

设 $a = bq + r, 0 < r < b$．则 $r = a \bmod b = a - bq$．

先证明 $a, b$ 的公约数一定为 $b, r$ 的公约数．
设 $d \mid a, d \mid b$，则 $\frac{r}{d} = \frac{a}{d} - \frac{bq}{d}$．显然，等式右边为整数，即 $d \mid r$，遂得证．

再证明 $b, r$ 的公约数一定为 $a, b$ 的公约数．
设 $d \mid b, d \mid r$，则 $\frac{a}{d} = \frac{bq}{d} + \frac{r}{d}$．显然，等式右边仍是整数，即 $d \mid a$，证毕．

## 实现

```cpp
int gcd(int a, int b) { return b ? a : gcd(b, a % b); }
```

另外，自 C++17 起，可用 `<numeric>` 头文件中的 `std::gcd` 来求取最大公约数．

不建议使用 `std::__gcd` 来求取最大公约数，以免引起预期之外的问题．

# 最小公倍数

## 定义

一组整数的**公倍数**，是指同时是这组数中每一个数的倍数的数．而**最小公倍数**就是正公倍数中最小的一个．

对于整数 $a_1, \cdots, a_n$，将其最小公倍数记作 $\operatorname{lcm}(a_1, \cdots, a_n)$，不引起歧义时简写作 $[a, b]$．

## 最小公倍数的性质

- $[a, b] = [|a|, |b|]$
- $[a, b] = [b, a]$
- $[a, 1] = [a, a] = a$
- $[a, b, c] = [[a, b], c]$
- 若$a \mid m, b \mid m$，则 $[a, b] \mid m$
- $[ma, mb] = |m|[a, b]$
- $[a, b, c][ab, bc, ac] = [a, b][b, c][a, c]$
- $[a^n, b^n] = [a, b]^n$

## 求最小公倍数

有等式 $[a, b](a, b) = |ab|$，所以
$$
[a, b] = \frac{|ab|}{(a, b)}
$$
因此，只需求出两数最大公约数即可得到其最小公倍数．

另外，自 C++17 起，可用 `<numeric>` 头文件中的 `std::lcm` 来直接获得两数的最小个公倍数．

# 唯一分解定理

任一正整数 $a$ 可唯一地表示成
$$
a = p_1^{\alpha_1} p_2^{\alpha_2} \cdots p_s^{\alpha_s}
$$
其中 $p_j(1 \le j \le s)$ 为素数，且 $p_1 < p_2 < \cdots < p_s$，$\alpha_j(1 \le j \le s)$ 为非负整数．

# 同余

## 定义

设 $m \ne 0$．若 $m \mid (a - b)$，则称 $m$ 为**模数（模）**，$a$ 同余与 $b$ 模 $m$，$b$ 是 $a$ 对模 $m$ 的**剩余**．记作 $a \equiv b \pmod{m}$．

若 $m \nmid (a - b)$，则 $a$ 不同余与 $b$ 模 $m$，$b$ 不是 $a$ 对模 $m$ 的**剩余**．记作 $a \not\equiv b \pmod{m}$．

这样的等式，称为模 $m$ 的同余式，简称**同余式**．

不加说明时，我们认为模数总是正整数．

## 同余的性质

- 同余是 **等价关系**，既具有
  * 自反性：$a \equiv a \pmod{m}$
  * 对称性：若 $a \equiv b \pmod{m}$，则 $b \equiv a \pmod{m}$
  * 传递性：若 $a \equiv b \pmod{m}, b \equiv c \pmod{m}$，则 $a \equiv c \pmod{m}$
- 线性运算：若 $a \equiv b \pmod{m}, c \equiv{d} \pmod{m}$，则
  * $a \pm b \equiv c \pm d \pmod{m}$
  * $a \times b \equiv c \times d \pmod{m}$
- 若 $a \equiv b \pmod{m}$，则 $ak \equiv bk \pmod{mk}$
- 若 $a \equiv b \pmod{m}, d \mid a, d \mid b, d \mid m$，则 $\frac{a}{d} \equiv \frac{b}{d} \pmod{\frac{m}{d}}$
- 若 $a \equiv b \pmod{m}, d \mid m$，则 $a \equiv b \pmod{d}$
- 若 $a_i \equiv b_i \pmod{m}, 0 \le i \le n, s \equiv t \pmod{m}$，则 $\sum_{i=0}^{n}a_is^i \equiv \sum_{i=0}^{n}b_it^i$


