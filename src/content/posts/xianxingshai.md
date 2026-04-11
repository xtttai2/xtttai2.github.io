---
title: 线性筛
date: 2026-04-11
tags:
  - 筛法
---

线性筛可以在线性的时空复杂度内晒出 $1$ 到 $n$ 以内的所有素数．此外，线性筛也可以用来求欧拉函数和莫比乌斯函数，详见相应章节．

线性筛的思路是，对于一个合数，它只会被它的最小素约数标记一次．这样即可在线性复杂度内标记出所有合数，并提取所有素数．

# 代码

```cpp
int pri[N], cnt;
bool isp[N];

void prep(int n) {
  memset(isp, true, sizeof isp);
  for (int i = 2; i <= n; i++) {
    if (isp[i]) pri[++cnt] = i;
    for (int j = 1; j <= cnt && i * pri[j] <= n; j++) {
      isp[i * pri[j]] = false;
      if (i % pri[j] == 0) break;
    }
  }
}
```
