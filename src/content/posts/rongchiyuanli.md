---
title: 容斥原理
date: 2026-04-14
tags:
  - 组合计数
---

经典图片：![](https://oi-wiki.org/math/combinatorics/images/incexcp.png)

# 公式

$$
\left| \bigcup_{i=1}^{n} S_i \right| = \sum_{m=1}^{n} (-1)^{m-1} \sum_{1 \le a_1 < a_2 < \dots < a_m \le n} \left| \bigcap_{i=1}^{m} S_{a_i} \right|
$$

# 证明

给出一个粗糙的归纳法证明。

当 $n = 2$ 时，显然有

$$
\left|S_1 \cup S_2\right| = \left|S_1\right| + \left|S_2\right| - \left|S_1 \cap S_2\right|
$$

如果不理解可以看那张图片。

当 $n > 2$ 时，有

$$
\begin{aligned}
\left|\bigcup_{i=1}^{n} S_i\right|
&= \left|\left(\bigcup_{i=1}^{n-1} S_i\right) \cup S_n\right| \\[2mm]
&= \left|\bigcup_{i=1}^{n-1} S_i\right| + |S_n| - \left|\left(\bigcup_{i=1}^{n-1} S_i\right) \cap S_n\right| \\[2mm]
&= \left|\bigcup_{i=1}^{n-1} S_i\right| + |S_n| - \left|\bigcup_{i=1}^{n-1} \left(S_i \cap S_n\right)\right|.
\end{aligned}
$$

继续归纳可得原公式。

# 应用

容斥原理允许我们将统计并集大小的问题，转换为统计带「容斥系数」的交集大小的和．

所谓「容斥系数」就是公式中的 $(-1)^{m-1}$．

但是这使得式子变得很复杂，无法直接在多项式复杂度内求出，故题目中出现的容斥往往有特殊的条件．下面考虑两种特殊条件．

## 交集大小只与集合个数有关

若任意 $k$ 个不同集合的交集都相同且只与 $k$ 有关，那么设 $f(k) = \left|\bigcap_{i=1}^{k} S_i\right|$，则有

$$
\left|\bigcup_{i=1}^{n} S_i\right| = \sum_{i=1}^{n}(-1)^{i-1}\binom{n}{i}f(i)
$$

这样就能线性求出答案了．

### 例题一

求 $1,2,\cdots,n$ 的排列 $a$ 的数量，满足对于任意 $1 \le i \le n$ 有 $a_i \neq i$。即求 $1, 2, \cdots, n$ 的错排数量．

#### 解析

考虑求非法排列数．

设 $\left|S_i\right|$ 表示满足 $a_i = i$ 的排列所构成的集合。

问题变为求

$$
s = \left| \bigcup_{i = 1} ^ {n} S_i \right|
$$

由于指定 $k$ 个位置的排列数量为 $(n - k)!$，即任意 $k$ 个集合的交集大小为 $(n - k)!$，所以有

$$
s = \left| \bigcup_{i = 1} ^ {n} S_i \right| = \sum_{i=1}^{n}(-1)^{i - 1}\binom{n}{i}(n-i)!
$$

故答案为

$$
n! - s = n! - \sum_{i=1}^{n}(-1)^{i - 1}\binom{n}{i}(n-i)! = \sum_{i=0}^{n}(-1)^{i}\binom{n}{i}(n-i)!
$$

## 交集有阶段性

也就是式子可以 DP。我们需要在 DP 的状态中加入「容斥系数」。

于是乎，转移时，遇到两个集合发生并的运算时，就需要额外乘以系数 $(-1)$。

### 例题一

给定 $k$ 个障碍物的坐标 $(x_1, y_1), (x_2, y_2), \cdots, (x_k, y_k)$，求从 $(1, 1)$ 走到 $(n, m)$ 且不经过障碍物的方案数。每次只能沿 $x$ 轴或 $y$ 轴正方向走一个单位长度。

#### 解析

考虑求非法路径数。

由于只能向右或向上走，可以先以 $x_i$ 为关键字从小到大排序，然后 DP。

设 $S_i$ 表示从 $(1, 1)$ 走到 $(n, m)$ 且经过 $(x_i, y_i)$ 的路线所构成的集合。问题是求 $s = \left|\bigcup_{i=1}^{k} S_i\right|$。

设 $f(i)$ 表示从 $(1, 1)$ 到 $(x_i, y_i)$ 的带容斥系数的方案数。实际上，$f(i)$ 的作用，就是帮助统计所有形如 $(-1)^{t-1}\left|S_x \cap S_y \cap S_z \cap \cdots \cap S_j \cap S_i\right|$ 的式子对 $s$ 的贡献（其中 $x < y < z < \cdots < j < i$，$t$ 为相交的集合的数量），并且可以帮助递推其它状态。具体地，有

$$
s = \sum_{i=1}^{k} \binom{n - x_i + m - y_i}{n - x_i}f(i)
$$

其中 $\binom{n - x_i + m - y_i}{n - x_i}f(i)$ 即为所有形如 $(-1)^{t - 1}\left|S_x \cap S_y \cap S_z \cap \cdots \cap S_j \cap S_i\right|$ 的式子的和，乘以 $\binom{n - x_i + m - y_i}{n - x_i}$ 是因为 $f(i)$ 只考虑走到 $(x_i, y_i)$，但式子中的交集大小表示的是完整地走到 $(n, m)$ 的路径数量，而从 $(x_i, y_i)$ 走到 $(n, m)$ 的方案数为 $\binom{n - x_i + m - y_i}{n - x_i}$。

接着考虑 $f(i)$ 的转移．可以枚举式子 $(-1)^{t-1}\left|S_x \cap S_y \cap S_z \cap \cdots \cap S_j \cap S_i\right|$ 中的 $j$，当然也不要忘记算上单独的 $\left|S_i\right|$．

因为 $\left|S_j \cap S_i\right|$ 表示即经过 $(x_j, y_j)$ 又经过 $(x_i, y_i)$ 的路线数，从 $(x_j, y_j)$ 走到 $(x_i, y_i)$ 有 $\binom{x_i - x_j + y_i - y_j}{x_i - x_j}$ 种方案；$|S_i|$ 表示经过 $(x_i, y_i)$ 的路线数，从 $(1, 1)$ 走到 $(x_i, y_i)$ 共 $\binom{x_i - 1 + y_i - 1}{x_i - 1}$ 种方案，所以

$$
f(i) = \sum_{j=1}^{i-1} \binom{x_i - x_j + y_i - y_j}{x_i - x_j} (-f(j)) + \binom{x_i+y_i-2}{x_i-1}
$$

答案为：

$$
\binom{n + m - 2}{n - 1} - \sum_{i=1}^{k} \binom{n - x_i + m - y_i}{n - x_i}f(i)
$$

### 例题二

[ARC101E] Ribbons on Tree：

给定一棵 $n$($n$ 是偶数) 个点的树，要将所有点两两配对成 $\frac{n}{2}$ 对，每一对 $(u, v)$ 会覆盖一次 $u$ 到 $v$ 的最短路径。求使得每一条边至少被覆盖一次的配对方案数模 $10^9 + 7$ 的结果。

#### 解析

假设点 $1$ 为根。

发现如果指定边不被覆盖更好求，考虑求非法方案数。

设 $S_i$ 表示 $i$ 到 $fa_i$ 的边断开的方案数，$i \ne 1$。问题变为求

$$
\sum_{i=1}^{n - 1} (-1)^{i-1} \sum_{1 < a_1 < a_2 < \dots < a_i \le n} \left| \bigcap_{j=1}^{i} S_{a_j} \right|
$$

考虑 $\left| \bigcap_{j=1}^{i} S_{a_j} \right|$，即指定 $a_1,a_2,\cdots,a_i$ 到父亲的边断开，有多少种方案数。此时树分裂成 $i + 1$ 个连通块，每个连通块只能与同一连通块的点配对。记大小为 $k$ 的连通块中配对方案数为 $g(k)$，若 $k$ 为奇数显然无解，即 $g(k) = 0$；否则第一个点有 $k - 1$ 个点可以配对，第二个没配对的点有 $k - 3$ 个点可以配对，以此类推可知 $g(k) = (k - 1)!!$，即 $g(k) = 1 \times 3 \times \cdots (k - 1)$。因此，设指定 $a_1,a_2,\cdots,a_i$ 到父亲的边断开，$i + 1$ 个连通块的大小为 $k_1, \cdots, k_{i + 1}$，则 $\left| \bigcap_{j=1}^{i} S_{a_j} \right| = \prod_{j=1}^{i+1}g(k_j)$。

考虑统计答案。鉴于树的强烈的结构特征，考虑 DP 求解。设 $f(u, i)$ 表示以 $u$ 为顶点的连通块大小为 $i$，以 $u$ 为根的子树内带容斥系数的方案数，但是**不算 $u$ 自身所在连通块产生的贡献 $g(i)$**（因为 $u$ 与父亲的边可以不断开，所以 $g(i)$ 放在父亲那里统计）。

用 $f(u, i)^{\prime}$ 表示转移后新的 $f(u, i)$。考虑 $u$ 到儿子 $v$ 的边的断开情况：

- 断开：  
  此时 $v$ 所在连通块的大小随意，设为 $j$。由于断边，有新的集合参与并的运算，需要带上系数 $(-1)$。有
  $$f(u, i)^{\prime} = f(u, i) + f(u, i)f(v, j)(-g(j))$$
- 不断开：  
   仍设 $v$ 所在连通块的大小为 $j$，类似树上背包，有
  $$f(u, i + j)^{\prime} = f(u, i + j) + f(u, i)f(v, j)$$

最后答案即为

$$
g(n) - \sum_{i = 1}^{n - 1}f(1, i)g(i)
$$
