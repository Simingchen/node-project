module.exports = {
    root: true,
    parserOptions: {
        sourceType: 'module'
    },
    // https://github.com/feross/standard/blob/master/RULES.md#javascript-standard-style
    extends: 'standard',
    // required to lint *.vue files
    plugins: [
        'html'
    ],
    // add your custom rules here
    'rules': {
        // allow paren-less arrow functions
        'arrow-parens': 0,
        // allow debugger during development
        'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0,
        // 缩进为4个
        "indent":[1,4],
        "semi": [0, "always"], // 强制语句分号结尾
        "space-before-blocks": [2, "always"], // 块前的空格
        "space-before-function-paren": 0,  // 函数后接空格
        "no-inner-declarations": 0, // 禁止function嵌套块中的变量或声明
        "no-extend-native": 0, // 禁止扩展原生对象
        "eqeqeq": 0,    // 全等于
        "one-var": 0,    // 允许只有一个var定义变量
        "quotes": [0, "single", "avoid-escape"], // 引号风格
        "comma-dangle": [0, "always"], // 是否允许对象中出现结尾逗号
        "no-trailing-spaces": 0, // 一行最后不允许有空格
    }
}