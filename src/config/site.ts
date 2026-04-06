export const siteConfig = {
  title: 'xtttai2',
  description: '一个轻量的个人博客，用来记录算法、工程和慢速写作。',
  author: 'xtttai2',
  welcomeMessage: "Welcome to xtttai2's blog!",
  socialLinks: [
    { label: 'GitHub', href: 'https://github.com/xtttai2' },
    { label: 'Luogu', href: 'https://www.luogu.com.cn/user/1391214' }
  ],
  giscus: {
    enabled: true,
    repo: 'xtttai2/xtttai2.github.io',
    repoId: 'R_kgDOR60Ing',
    category: 'Comments',
    categoryId: 'DIC_kwDOR60Ins4C6JlI',
    mapping: 'pathname',
    strict: '0',
    reactionsEnabled: '1',
    emitMetadata: '0',
    inputPosition: 'top',
    theme: 'light',
    lang: 'zh-CN'
  }
} as const;
