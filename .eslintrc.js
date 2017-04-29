module.exports = {
    "root": true,
    "parser": "babel-eslint",
    "parserOptions": {
        sourceType: 'module'
    },
    env: {
        browser: true
    },
    "extends": "airbnb-base",
    "plugins": [
        "import"
    ],
    rules: {
        // 缩进
        "indent": ["error", 4],
        // no-tabs
        "no-tabs": "off",
        // import/prefer-default-export
        "import/prefer-default-export": "off",
        // no-plusplus 一元操作符会自动添加分号，不同的空白会改变源代码的含义
        "no-plusplus": ["error", { "allowForLoopAfterthoughts": true }]
    }
};