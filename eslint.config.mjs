import antfu from '@antfu/eslint-config'
import nextPlugin from '@next/eslint-plugin-next'
import pluginQuery from '@tanstack/eslint-plugin-query'

export default antfu(
  {
    react: true,
    ignores: ['src/components/ui/**/*'], // shadcn ui 组件不进行检查
    rules: {
      'unused-imports/no-unused-imports': 'warn',
      'n/prefer-global/process': 'off',
      // 导航优先使用 next-intl 包裹的方法
      'no-restricted-imports': [
        'warn',
        {
          name: 'next/link',
          message: 'Please import from `@/lib/i18n` instead.',
        },
        {
          name: 'next/navigation',
          importNames: [
            'redirect',
            'permanentRedirect',
            'useRouter',
            'usePathname',
          ],
          message: 'Please import from `@/lib/i18n` instead.',
        },
      ],
    },
    ...pluginQuery.configs['flat/recommended'],
  },
  {
    plugins: {
      '@next/next': nextPlugin,
    },
    rules: {
      ...nextPlugin.configs.recommended.rules,
      ...nextPlugin.configs['core-web-vitals'].rules,
    },
  },
)
