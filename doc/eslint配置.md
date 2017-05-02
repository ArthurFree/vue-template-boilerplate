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

### linebreak-style

-   为什么要统一换行符？

由于历史的原因，不同的操作系统使用了不同的换行符，在不同系统下运行程序可能会带来意想不到的问题.

-   配置git config将`CRLF`转换为`LF`

```shell
$ git config core.autocrlf input
```

这里`core.autocrlf`有三个值可以选 `true`、`input`和`false`

-   true:  x -> LF -> CRLF
-   input: x -> LF -> LF
-   false: x -> x -> x

> 参考链接：
> http://stackoverflow.com/questions/1967370/git-replacing-lf-with-crlf

### .editorConfig

EditorConfig是一套用于统一代码格式的解决方案。可以帮助开发者在不同的编辑器和IDE之间定义和维护一致的代码风格。

vscode安装`[EditorConfig for VS Code](https://marketplace.visualstudio.com/items?itemName=EditorConfig.EditorConfig)`插件

-   indent_style: tab为hard-tabs，space为soft-tabs
-   indent_size: 设置整数表示规定每级缩进的列数和soft-tabs的宽度（译注：空格数）。如果设定为tab，则会使用tab\_width的值（如果已指定）。
-   tab_width：设置整数用于指定替代tab的列数。默认值就是indent\_size的值，一般无需指定。
-   end_of\_line：定义换行符，支持lf、cr和crlf。
-   charset：编码格式，支持latin1、utf-8、utf-8-bom、utf-16be和utf-16le，不建议使用uft-8-bom。
-   trim_trailing\_whitespace：设为true表示会除去换行行首的任意空白字符，false反之。
-   insert_final_newline：设为true表明使文件以一个空白行结尾，false反之。
-   root：表明是最顶层的配置文件，发现设为true时，才会停止查找.editorconfig文件。

(摘自： http://www.alloyteam.com/2014/12/editor-config/)

> 参考链接：
> [官网](http://editorconfig.org/)
