module.exports = {
  extends: ['react-app', 'eslint:recommended', 'plugin:prettier/recommended'],
  plugins: ['babel'],
  rules: {
    quotes: ['error', 'single', { avoidEscape: true }],
    'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0,
    'no-console': process.env.NODE_ENV === 'production' ? 2 : 0,
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'error',
    '@typescript-eslint/no-unused-vars': [
      'error',
      { args: 'all', argsIgnorePattern: '^_', ignoreRestSiblings: true },
    ],
    // Per the docs, the root no-unused-vars should be disabled:
    // https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/no-unused-vars.md
    'no-unused-vars': 'off',
    'no-redeclare': 'off',
    '@typescript-eslint/no-redeclare': ['error'],
    // TypeScriptの型宣言と競合するのでoffにする
    'no-undef': 'off',

    'prettier/prettier': [
      'error',
      {
        singleQuote: true,
        semi: false,
        trailingComma: 'all',
      },
    ],
  },
  globals: {
    context: false,
  },
}
