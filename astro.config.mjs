// @ts-check
import { defineConfig } from 'astro/config';
import rehypeKatex from 'rehype-katex';
import remarkMath from 'remark-math';

/** @type {import('shiki').ThemeRegistrationRaw} */
const paperCodeTheme = {
  name: 'paper-code',
  type: 'light',
  colors: {
    'editor.background': '#ffffff',
    'editor.foreground': '#000000'
  },
  settings: [
    {
      settings: {
        foreground: '#000000',
        background: '#ffffff'
      }
    },
    {
      scope: [
        'keyword.control',
        'keyword.control.import',
        'keyword.control.from',
        'keyword.control.directive',
        'keyword.control.flow',
        'keyword.control.loop',
        'keyword.control.return',
        'keyword.other',
        'storage',
        'storage.type',
        'storage.modifier',
        'entity.name.function.preprocessor',
        'entity.other.attribute-name.directive',
        'punctuation.definition.directive'
      ],
      settings: {
        foreground: '#2F2FBF'
      }
    }
  ]
};

// https://astro.build/config
export default defineConfig({
  site: 'https://xtttai2.github.io',
  output: 'static',
  devToolbar: {
    enabled: false
  },
  markdown: {
    remarkPlugins: [remarkMath],
    rehypePlugins: [rehypeKatex],
    shikiConfig: {
      theme: paperCodeTheme,
      wrap: true
    }
  }
});
