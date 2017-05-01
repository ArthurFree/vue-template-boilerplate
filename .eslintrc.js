module.exports = {
    "root": true,
    "parser": "babel-eslint",
    "parserOptions": {
        sourceType: 'module'
    },
    env: {
        browser: true
    },
    "extends": ["airbnb-base", "plugin:flowtype/recommended"],
    "plugins": [
        "import",
        "flowtype"
    ],
    rules: {
        // 缩进
        "indent": ["error", 4],
        // no-tabs
        "no-tabs": "off",
        // no-plusplus 一元操作符会自动添加分号，不同的空白会改变源代码的含义
        "no-plusplus": ["error", { "allowForLoopAfterthoughts": true }],
        // no-console
        "no-console": process.env.NODE_ENV === 'production' ? 2 : 0,
        // no-debugger, allow debugger during development
        "no-debugger": process.env.NODE_ENV === 'prroduction' ? 2 : 0,
        // import/prefer-default-export
        "import/prefer-default-export": "off",
        // import/no-extraneous-dependencies
        "import/no-extraneous-dependencies": ["error", { "devDependencies": true }],
        // import/no-unresolved
        "import/no-unresolved": [2, { commonjs: true, amd: true }],
    }
};