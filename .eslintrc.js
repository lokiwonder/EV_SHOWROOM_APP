module.exports = {
    extends: ['prettier', 'prettier/react', 'plugin:prettier/recommended', 'eslint-config-prettier'],
    plugins: ['prettier'],
    parser: 'babel-eslint',
    rules: {
      'prettier/prettier': 'error',
      'no-console': 'warn',
      // 'no-unused-vars': 'warn',
      // 'import/no-unresolved': 'off',
      // 'prettier/prettier': [
      //   'error',
      //   {
      //     trailingComma: 'es5',
      //     singleQuote: true,
      //     printWidth: 100,
      //   },
      // ],
    },
    settings: {
      'import/extensions': ['.js', '.jsx', '.ts', '.tsx'],
      'import/parsers': {
        '@typescript-eslint/parser': ['.ts', '.tsx'],
      },
      'import/resolver': {
        'babel-module': {},
        node: {
          extensions: ['.js', '.jsx', '.ts', '.tsx'],
        },
      },
    },
  };