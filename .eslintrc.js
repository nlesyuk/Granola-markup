module.exports = {
  root: true,
  env: {
    node: true
  },
  'extends': [
    'plugin:vue/essential',
    'eslint:recommended'
  ],
  parserOptions: {
    parser: 'babel-eslint'
  },
  rules: {
    'vue/no-unused-components': 'warn',
    'no-unused-vars': 'warn',
    'no-console': 'warn',
    'no-alert': 'warn',
    'no-console': 'warn'
  }
}
