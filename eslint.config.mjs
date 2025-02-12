import antfu from '@antfu/eslint-config'
import nextPlugin from '@next/eslint-plugin-next'
import pluginQuery from '@tanstack/eslint-plugin-query'

export default antfu(
  {
    react: true,
    rules: {
      'unused-imports/no-unused-imports': 'warn',
      'n/prefer-global/process': 'off',
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
