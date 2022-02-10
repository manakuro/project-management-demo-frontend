module.exports = {
  extends: [
    'react-app',
    'eslint:recommended',
    'plugin:prettier/recommended',
    'plugin:@next/next/recommended',
    'plugin:@next/next/core-web-vitals',
  ],
  plugins: [
    'babel', // https://www.npmjs.com/package/eslint-plugin-babel
  ],
  settings: {
    'import/resolver': {
      node: {
        extensions: ['.ts'],
      },
    },
  },
  rules: {
    quotes: ['error', 'single', { avoidEscape: true }],
    // 'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0,
    // 'no-console': process.env.NODE_ENV === 'production' ? 2 : 0,
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': [
      'error',
      {
        additionalHooks: 'useRecoilCallback',
      },
    ],
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

    'sort-imports': 0,
    'import/order': [2, { alphabetize: { order: 'asc' } }],

    'prettier/prettier': [
      'error',
      {
        singleQuote: true,
        semi: false,
        trailingComma: 'all',
      },
    ],

    'react/display-name': 'error',
  },
  globals: {
    context: false,
  },
}
