module.exports = {
  root: true,
  env: {
    browser: true,
    es2021: true,
    node: true,
    // 开启setup语法糖环境
    "vue/setup-compiler-macros": true,
  },
  extends: [
    // 'plugin:vue/essential',
    // 'plugin:vue/vue3-essential',
    'plugin:vue/vue3-recommended',
    'plugin:import/recommended',
    'airbnb-base',
    // 'plugin:prettier/recommended',
  ],
  parserOptions: {
    ecmaVersion: 6,
    parser: '@typescript-eslint/parser',
    sourceType: 'module',
  },
  plugins: [
    'vue',
    '@typescript-eslint',
  ],
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    // 'prettier/prettier': 'error',
    "import/no-extraneous-dependencies": ["error", {"devDependencies": true}],
    'import/extensions': 'off',
    'no-mixed-spaces-and-tabs': 'error',
    'quotes': [2, 'single'],
    "vue/html-self-closing": ["error", {
      "html": {
        "void": "always",
      },
    }],
    'vue/html-closing-bracket-newline': 'off', // 不强制换行
    'vue/singleline-html-element-content-newline': 'off', // 不强制换行
    'vue/max-attributes-per-line': ['error', {
      singleline: { max: 2 },
      multiline: { max: 1 }
    }], // vue template模板元素第一行最多5个属性
  },
  settings: {
    'import/resolver': {
      alias: {
        map: [
          ['@', './src'],
        ],
        extensions: ['.ts', '.js', '.jsx', '.json'],
      },
    },
  },
};
