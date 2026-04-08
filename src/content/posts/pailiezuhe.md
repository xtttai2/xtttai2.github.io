---
title: 排列组合
date: 2024-04-06
tags:
  - 组合计数
---

# 排列数

记从 $n$ 个不同元素中取出 $m$ 个按照一定顺序排列，共能组成 $A_{n}^{m}$ 种不同排列。有

$$
A_{n}^{m} = 𝑛(𝑛 − 1)(𝑛 − 2) \cdots (𝑛 − 𝑚 + 1) = \frac{n!}{(n - m)!}
$$

很容易理解：第一个元素有 $n$ 种选择，第二个元素有 $n - 1$ 种选择，以此类推，第 $m$ 个元素有 $n - m + 1$ 种选择。根据乘法原理可得上式。

特别地，把 $m = n$ 代入可得全排列数为 $n!$。而当 $m > n$ 时规定 $A_{n}^{m} = 0$。

# 组合数

记从 $n$ 个不同元素中选出 $m$ 个，能组成 $C_{n}^{m}$ 个不同集合，也用 $\binom{n}{m}$ 表示。有

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
  fac[0] = 0;
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

#### 其它

上面举了三个典型例子，类似情况也可以类似地根据组合数计算公式进行推导。

# 例题 [ABC154F] Many Many Paths

给定正整数 $r_1 \le r_2 \le 10^6, c_1 \le c_2 \le 10^6$，求

$$
\sum_{i=r_1}^{r_2}\sum_{j=c_1}^{c_2} \binom{i+j}{i} \bmod 10^9+7
$$

## 分析

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
