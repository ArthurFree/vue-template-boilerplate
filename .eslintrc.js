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
        "indent": ["error", 4]
    }
};