---
title: 排列组合
date: 2024-04-06
tags:
  - 组合计数
---

# 计数原理

## 加法原理

完成一个工程有 $n$ 类方法，第 $i$ 类方法的数目为 $a_i$，那么完成该工程总共有 $\sum\limits_{i = 1}^{n} a_i$ 种不同的方法。

## 乘法原理

完成一个工程有 $n$ 个互相独立的步骤，完成第 $i$ 步有 $a_i$ 种方法，那么完成该工程总共有 $\prod\limits_{i = 1}^{n} a_i$ 种不同方法。

# 排列数

从 $n$ 个不同元素中取 $m$ 个按一定顺序拍成一列，叫做从 $n$ 个不同元素中取 $m$ 个元素的一个**排列**．特别地，若 $m = n$ 则称这是一个**全排列**．从 $n$ 个不同元素中取出 $m$ 个能组成的所有排列的个数，叫做从 $n$ 个不同元素中取 $m$ 个元素的**排列数**，记作 $A_n^m$。有

$$
A_{n}^{m} = n(n - 1)(n - 2) \cdots (n - m + 1) = \frac{n!}{(n - m)!}
$$

很容易理解：第一个元素有 $n$ 种选择，第二个元素有 $n - 1$ 种选择，以此类推，第 $m$ 个元素有 $n - m + 1$ 种选择。根据乘法原理可得上式。

特别地，把 $m = n$ 代入可得全排列数为 $n!$。而当 $m > n$ 时规定 $A_{n}^{m} = 0$。

# 组合数

从 $n$ 个不同元素中选出 $m$ 个组成一个集合，叫做从 $n$ 个不同元素中取 $m$ 个元素的一个**组合**．从 $n$ 个不同元素中取 $m$ 个元素能组成的所有组合的个数，叫做从 $n$ 个元素中选出 $m$ 个元素的**组合数**，记作 $\binom{n}{m}$。有

$$
\binom{n}{m} = \frac{n!}{m!(n-m)!}
$$

也不难理解：从每个 $n$ 的全排列中，取出前 $m$ 个元素，全排列共 $n!$ 个。由于不关注这 $m$ 个元素的顺序，所以这 $m$ 个物品的 $m!$ 种全排列实际都算作一种取法；另外的 $n-m$ 个元素同理。所以给 $n!$ 个全排列去重，得 $\frac{n!}{m!(n-m)!}$。

此外，有递推式

$$
\binom{n}{m} = \binom{n - 1}{m - 1} + \binom{n - 1}{m}
$$

可以从组合意义与数学计算两方面推导。对于前者，$n$ 个元素中选 $m$ 个，选择第 $n$ 个时有 $\binom{n-1}{m-1}$ 种方案，不选时有 $\binom{n-1}{m}$ 种方案。再说后者，有

$$
\begin{aligned}

\binom{n - 1}{m - 1} + \binom{n - 1}{m} &= \frac{(n-1)!}{(m-1)!(n-m)!} + \frac{(n-1)!}{m!(n-1-m)!} \\
&= \frac{(n-1)!}{(m)!(n-m)!}[(m)+(n-m)] \\
&= \frac{n!}{m!(n-m)!}\ \\
&= \binom{n}{m}

\end{aligned}
$$

上述递推式就是杨辉三角的公式表达。

特别地，对于任意自然数 $n$ 有 $\binom{n}{0} = 1$，对于 $m > n$ 有 $\binom {n}{m} = 0$。

## 求取组合数

一般要求取模。

### 普通递推

用递推式 $\binom{n}{m} = \binom{n - 1}{m - 1} + \binom{n - 1}{m}$ 可求，时空复杂度均为 $O(n^2)$。

#### 实现

```cpp
C[0][0] = 1;
for (int i = 1; i <= n; i++) {
  C[i][0] = 1;
  for (int j = 1; j <= i; j++)
    C[i][j] = (C[i - 1][j - 1] + C[i - 1][j]) % MOD;
}
```

### 计算公式

线性预处理阶乘与其逆元，可 $O(1)$ 得到某个组合数。

#### 实现

```cpp
void prep() {
  fac[0] = 1;
  for (int i = 1; i <= n; i++)
    fac[i] = 1ll * fac[i - 1] * i % MOD;
  ifac[n] = qpow(fac[n], MOD - 2); // 假设 MOD 为素数
  for (int i = n - 1; i >= 0; i--)
    ifac[i] = 1ll * ifac[i + 1] * (i + 1) % MOD;
}

int C(int n, int m) {
  return n < m || m < 0 ? 0 : 1ll * fac[n] * ifac[m] % MOD * ifac[n - m] % MOD;
}
```

### 特殊递推

适用于求取连续若干个组合数的场景。

#### 连续一行

即求 $\binom{n}{i}, \binom{n}{i+1}, \cdots, \binom{n}{j}$。

考虑从 $\binom{n}{i-1}$ 推出 $\binom{n}{i}$，易得

$$
\binom{n}{i} = \frac{n-i+1}{i}\frac{n!}{(i-1)!(n-i+1)!} = \frac{n-i+1}{i}\binom{n}{i-1}
$$

#### 连续一列

即求 $\binom{i}{m}, \binom{i+1}{m}, \cdots, \binom{j}{m}$。

考虑从 $\binom{i-1}{m}$ 推出 $\binom{i}{m}$，有

$$
\binom{i}{m} = \frac{i}{i-m}\frac{(i-1)!}{m!(i-1-m)!} = \frac{i}{i-m}\binom{i - 1}{m}
$$

#### 连续一条对角线

即求 $\binom{n}{m}, \binom{n+1}{m-1}, \cdots, \binom{n+i}{m-i}$。

仍然考虑从 $\binom{n+i-1}{m-i+1}$ 推出 $\binom{n+i}{m-i}$，有

$$
\begin{aligned}

\binom{n+i}{m-i} &= \frac{(n+i)(m-i+1)}{(n-m+2i)(n-m+2i-1)} \frac{(n+i-1)!}{(m-i+1)!(n-m+2i-2)!} \\
&= \frac{(n+i)(m-i+1)}{(n-m+2i)(n-m+2i-1)} \binom{n+i-1}{m-i+1}

\end{aligned}
$$

类似情况也可以通过这种方式递推．

## 例题一

[ABC154F] Many Many Paths：

给定正整数 $r_1 \le r_2 \le 10^6, c_1 \le c_2 \le 10^6$，求

$$
\sum_{i=r_1}^{r_2}\sum_{j=c_1}^{c_2} \binom{i+j}{i} \bmod 10^9+7
$$

### 分析

题意求矩形面积（~~变量名叫 $r,c$ 已经暗示得很明显了~~），考虑二维前缀和。设 $s_{r,c}$ 表示 $\sum_{i=0}^{r}\sum_{j=0}^{c} \binom{i+j}{i}$。考虑化简 $s_{r, c}$，先展开第二层求和：

$$
\begin{aligned}

s_{r, c} &= \sum_{i = 0}^{r}\sum_{j = 0}^{c}\binom{i + j}{i} \\
&= \sum_{i = 0}^{r}(\binom{i + 0}{i} + \binom{i+1}{i} + \binom{i+2}{i} + \cdots + \binom{i+c}{i})

\end{aligned}
$$

由 $\binom{n}{m} = \binom{n}{n - m}$ 可得：

$$
s_{r, c} = \sum_{i = 0}^{r}(\binom{i+0}{0} + \binom{i+1}{1} + \binom{i+2}{2} + \cdots + \binom{i+c}{c})
$$

不由自主地联想到递推式 $\binom{n}{m} = \binom{n - 1}{m} + \binom{n - 1}{m - 1}$ ，发现如果括号里第一项为 $\binom{i+1}{0}$，整个括号里的式子就可以像 2048 那样合并成一项，又由于 $\binom{i + 0}{0} = \binom{i + 1}{0}$，于是将其代入得：

$$
\begin{aligned}

s_{r, c} &= \sum_{i = 0}^{r}(\binom{i+1}{0} + \binom{i+1}{1} + \binom{i+2}{2} + \cdots + \binom{i+c}{c}) \\
&= \sum_{i = 0}^{r}(\binom{i+2}{1} + \binom{i+2}{2} + \cdots + \binom{i+c}{c}) \\
&= \sum_{i = 0}^{r}(\binom{i+3}{2} + \cdots + \binom{i+c}{c}) \\
&= \sum_{i = 0}^{r}\binom{i+c+1}{c} \\

\end{aligned}
$$

类似地，尝试把这一层求和也展开化简：

$$
\begin{aligned}

s_{r, c} &= \binom{c+1}{c} + \binom{c+2}{c} + \binom{c+3}{c} + \cdots + \binom{c+r+1}{c} \\
&= \binom{c+1}{1} + \binom{c+2}{2} + \binom{c+3}{3} + \cdots + \binom{c+r+1}{r+1} \\

\end{aligned}
$$

发现少一项 $\binom{c + 1}{0}$，不妨手动添上去，并在最后减去：

$$
\begin{aligned}

s_{r, c} &= \binom{c + 1}{0} + \binom{c+1}{1} + \binom{c+2}{2} + \binom{c+3}{3} + \cdots + \binom{c+r+1}{r+1} - 1 \\
&= \binom{c+2}{1} + \binom{c+2}{2} + \binom{c+3}{3} + \cdots + \binom{c+r+1}{r+1} - 1 \\
&= \binom{c+3}{2} + \binom{c+3}{3} + \cdots + \binom{c+r+1}{r+1} - 1 \\
&= \binom{c+4}{3} + \cdots + \binom{c+r+1}{r+1} - 1 \\
&= \binom{c+r+2}{r+1} - 1 \\

\end{aligned}
$$

这样一来，答案即为

$$
\begin{aligned}

ans &= s_{r_2, c_2} - s_{r_1 - 1, c_2} - s_{r_2, c_1 - 1} + s_{r_1 - 1, c_1 - 1} \\
&= (\binom{c_2 + r_2 + 2}{r_2 + 1} - 1) - (\binom{c_2 + r_1 + 1}{r_1} - 1) - (\binom{c_1 + r_2 + 1}{r_2 + 1} - 1) + (\binom{c_1 + r_1}{r_1} - 1) \\
&= \binom{c_2 + r_2 + 2}{r_2 + 1} - \binom{c_2 + r_1 + 1}{r_1} - \binom{c_1 + r_2 + 1}{r_2 + 1} + \binom{c_1 + r_1}{r_1}

\end{aligned}
$$

线性预处理阶乘及其逆元，答案可以 $O(1)$ 求出。

# 多重组合数

把 $n$ 个元素分成 $k$ 组，第 $i$ 组有 $m_i$ 个元素，所有分组方法的个数叫做**多重组合数**，记作 $\binom{n}{m_1, m_2, \cdots, m_k}$．

有 $\binom{n}{m_1, m_2, \cdots, m_k} = \frac{n!}{\prod_{i=1}^{k}m_i!}$．

# 二项式定理

这个定理阐明了一个展开式的系数：

$$
(a + b) ^ n = \sum_{i = 0} ^ n \binom{n}{i} a^i b^{n-i}
$$

它也很容易推广为多项式多项式的形式：
$$
(x_1 + x_2 + \cdots + x_t) ^ n = \sum_{n_1+n_2+\cdots+n_t = n的非负整数解}\binom{n}{n1, n2, \cdots, n_t}x_1^{n_1} x_2^{n_2} \cdots x_t^{n_t}
$$

# 第一类斯特林数

将 $n$ 个不同元素划分到 $m$ 个非空的环[^1]，方案数记为 $n \brack m$。

## 递推求第一类斯特林数

考虑把第 $n$ 个元素加入到某个环里。
- 加入到一个新的环：方案数为 $n-1 \brack m - 1$。
- 加入到现有的某个环：由于可以放在前 $n - 1$ 个元素中任意一个的后面，故方案数为 $(n - 1){n - 1 \brack m}$。
综上，有递推式
$$
{n \brack m} = {n - 1 \brack m - 1} + (n - 1){n - 1 \brack m}
$$

## 例题一

[FJOI2016] 建筑师：

$p$ 是 $1$ 到 $n$ 的排列，恰有 $a$ 个前缀最大值，恰有 $b$ 个后缀最大值。求满足要求的 $p$ 的数量模 $10 ^ 9 + 7$ 的结果。

来一张高清大图（$a = 3, b = 5$）。
```
       #
   #   #    #
#  #   #    #  #
#  #   #    #  #  #   #
#######################
p--p---p
       s----s--s--s---s
 1  2      3  4  5   6
```
~~虽然不是严格的排列，但无伤大雅。~~

显然 $n$ 既是前缀最大值，也是后缀最大值，故恰有 $a + b - 1$ 个前（后）缀最大值。注意到序列一共可划分为 $(a + b - 2)$ 个区间，每个区间最左（右）边元素最大。把每个区间看作环，确定下这个环后总能转动它直到最左（右）边元素为最大值。假设已经把 $n$ 个元素划分成了 $(a + b - 2)$ 个非空环，则左边应分配 $(a - 1)$ 个，右边应分配 $(b - 1)$ 个，共 $\binom{a + b - 2}{a - 1}$ 种分法。确定一侧的环后应从小到大（从大到小）排序，方案唯一。又因为划分环的方案数为 $n - 1 \brack {a + b -2}$，所以答案为
$$
\binom{a + b - 2}{a - 1} {n - 1 \brack a + b - 2}
$$

# 第二类斯特林数

将 $n$ 个不同元素划分为 $m$ 个互不区分非空子集，方案数记为 $n \brace m$。

## 递推式

考虑将第 $n$ 个元素放入某个集合的情况：
- 放到一个新的集合：有 $n - 1 \brace m - 1$ 种方案。
- 加入到现有的某个集合：可以放在已有的 $m$ 个集合中任一一个，故有 $m {n - 1 \brace m}$ 种方案。
综上有
$$
{n \brace m} = {n - 1 \brace m - 1} + {m {n - 1 \brace m}}
$$

## 通项公式

考虑容斥求出非法方案数，即有空集的方案数。由于不区分顺序，方便起见我们强制用编号区分开，最后答案会重复为预期的 $m!$ 倍。

设 $S_i$ 表示指定 $i$ 为空集的方案所构成的集合。有
$$
\left|S_{a_1} \cap S_{a_2} \cap S_{a_3} \cap \cdots \cap S_{a_k}\right| = (m - k)^n
$$
因此非法方案数为
$$
\left|\bigcup_{i=1}^{m} S_i\right| = \sum_{i=1}^{m}(-1)^{i - 1}\binom{m}{i}(m-i)^n
$$
用总方案数 $m^n$ 减去非法方案数，最后乘以 $\frac{1}{m!}$，得到通项公式：
$$
\begin{aligned}

{n \brace m} &= \frac{m^n - \left|\bigcup_{i=1}^{m} S_i\right|}{m!} \\
&= \frac{m^n - \sum_{i=1}^{m}(-1)^{i - 1}\binom{m}{i}(m-i)^n}{m!} \\
&= \frac{m^n + \sum_{i=1}^{m}(-1)^i\binom{m}{i}(m-i)^n}{m!} \\
&= \frac{\sum_{i=0}^{m}(-1)^i\binom{m}{i}(m-i)^n}{m!} \\
&= \sum_{i=0}^{m}\frac{(-1)^i\binom{m}{i}(m-i)^n}{m!} \\
&= \sum_{i=0}^{m}\frac{(-1)^i(m-i)^n}{i!(m-i)!} \\

\end{aligned}
$$

# 划分数

即将 $n$ 拆分成 $m$ 个正整数（不区分顺序）的和的方案数。

换句话说，求 $x_1, x_2, \cdots, x_m$ 的方案数，满足：
- $\sum x_i = n$
- $x_i > 0$
- $x_1 \le x_2 \le \cdots \le x_m$

参考 [[ 非负整数集合构造]]，我们可以通过以下两种操作构造出满足要求的集合：
1. 新添加元素 $0$。
2. 给集合内所有元素加 $1$。

考虑递推，设 $f(n, m)$ 表示将 $n$ 拆分成 $m$ 个非负整数（不区分顺序）的和的方案数。两种操作的方案数分别为 $f(n, m - 1)$ 和 $f(n - m, m)$。所以有
$$
f(n, m) = f(n , m - 1) + f(n - m, m)
$$
另外需要注意边界为 $f(0, 0) = 1$。

[^1]: 环：首尾相接的环形序列，可以旋转成等价的环，比如 $[A, B, C, D] = [D, A, B, C] \neq [D, C, B, A]$。
