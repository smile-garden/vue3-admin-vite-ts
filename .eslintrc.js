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
    'plugin:vue/vue3-recommended',
    'plugin:import/recommended',
    'airbnb-base',
    'plugin:prettier/recommended',
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    parser: '@typescript-eslint/parser',
    sourceType: 'module',
  },
  plugins: [
    'vue',
    '@typescript-eslint',
  ],
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'prettier/prettier': 'off',
    "import/no-extraneous-dependencies": ["error", {"devDependencies": true}],
    'import/extensions': 'off',
    /* "vue/block-tag-newline": ["error", {
      // "always" | "never" | "consistent" | "ignore"
      "singleline": "always",
      "multiline": "always",
    }] */
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
