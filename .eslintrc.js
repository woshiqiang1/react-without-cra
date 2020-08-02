module.exports = {
  extends: [
    'alloy',
    'alloy/react',
  ],
  // 你的环境变量（包含多个预定义的全局变量）
  env: {
    // browser: true,
    // node: true,
    // mocha: true,
    // jest: true,
    // jquery: true
  },
  // 你的全局变量（设置为 false 表示它不允许被重新赋值）
  globals: {
    // myGlobal: false
  },
  // 自定义你的规则
  rules: {
    'react/jsx-boolean-value': 0,
    'react/display-name': 0,
    'default-case': 0,
    // 允许block内部声明变量
    'no-case-declarations': "off",
    'no-invalid-this': 0,
  }
};