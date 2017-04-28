### parser

### parserOptions 设置解析器选项

可用选项：
-   sourceType: 设置为 "script" (默认) 或 "module"（如果你的代码是 ECMAScript 模块)。

-   ecmaFeatures(Object): 表示你想使用的额外的语言特性
    -   globalReturn: 允许在全局作用域下使用 return 语句
    -   impliedStrict: 启用全局 strict mode (如果 ECMA Version 是 5 或更高)
    -   jsx: 启用JSX
    -   experimentalObjectRestSpread: 启用实验性的支持

### eslint-import-resolver-webpack

告诉eslint，使用webpack的resolver来检查package是否引用正确