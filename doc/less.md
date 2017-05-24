# LESS

## 环境配置

### 简单安装使用

需要下载less.js

```html
<link rel="stylesheet/less" type="text/css" herf="styles.less" />
<!-- 之后在下面引入less.js -->
<script src="less.js" type="text/javascript"></script>
```

### node下安装使用

```
$ npm install -g less
$ less styles.less styles.css
```


## 定义变量

```
@nice-blue: #fffddd
@font-size: 18px;

#header {
    color: @nice-blue;
    font-size: @font-size;
}
```
less会转为css, 输出：
```
#header {
    color: fffddd;
    font-size: 18px;
}
```

## 运算

在less.js里面任何数字、颜色代码或者变量相互之间都能运算

```less
@base: 5%;
@filler: @base * 2;
@other: @base + @filler;
#herder {
    color: #888 / 4; // #222
    background-color: @nice-blue + #111;
    height: 100% / 2 + @filler; // 50% + 10%
    width: @other
}
```

## 函数

less自定义了部分常用的函数，例如百分比转换，颜色变化等等

```less
@height: 0.5;
@size: 10px + 10;
@color: #666 + 111;
#header2 {
    color: @color;
    height: percentage(@height); // 0.5 => 50%
    font-size: saturate(@size, 10%); // 增加10%饱和度
    background-color: spin(lighten(@color, 25%), 10); // 颜色亮度降低25%，并且色相值增加10
}
```

default函数
```less
// bigCat
.cat(@size) when (@size <= 19) and (@size >= 13) {
    height: @size * 10px;
}
// smallCat
.cat(@size) when (@size < 13) {
    height: @size * 5px;
}
// wssCat
.cat(@size) when (default()) {
    height: 666px;
}
.smallCat {
    .cat(10);
}
.bigCat {
    .cat(18);
}
.wssCat {
    .cat(26);
}
```

default相当于switch语句中default的词法
在这里它的作用就是当都不满足其他when里面的条件时，它就执行
注意default一定要配合when来使用

## 混合

混合就是可以预先定义好一个样式，然后用它放到我们想去使用该样式的大括号内触发
这样就可以轻松实现继承
注意my-other-mixin()不带参数的Mixin

```less
.my-mixin {
    color: black;
}
//定义一个混合方法，想使用的时候再去触发
.my-other-mixin() {
    background: white;
}
.my-font-mixin {
    font-size: 20px;
}
.cat, #wscat{
    background-color: aquamarine;
}
#header3 {
    .my-mixin;
    .my-other-mixin;//可以省略括号
    //.my-other-mixin()//当然也可以这样
    .my-font-mixin();
    #wscat;
    //.cat()//上下两种方法都可以
}
```

## 嵌套规则

css一些基于父元素寻找子节点添加样式的写法，我们可以用less来简化

```html
<header id="header4">
    <p id="header4-wsscat">text</p>
    <p class="navigation"> Nav</p>
    <p class="logo"> Logo</p>
</header>
```
```less
#header4 {
    color: black;
    .navigation {
        font-size: 12px;
    }
    .logo {
        width: 300px;
    }
    &:before{
        content: "你好";
    }
    &-wsscat{
        background-color: bisque;
    }
}
```

## 作用域

`@var`会在作用域范围内一个一个往外找，直到找到最接近的那个变量定义作为值

```html
<header id="header5">
    <p id="logo">logo</p>
</header>
```
```less
@var: white;
#header5 {
    @var: red;
    #logo {
        color: @var; // red
    }
}
```

## 选择器

把变量作为CSS类名或者ID名

```less
@bg: background;
.@{bg} {
    background-color: black;
}
```
上面这一句将转化为下面这一句，注意一定要这样写.@{bg}不能漏掉{}
```css
.background {
    background-color: black;
}
```

## 带参数的Mixin(混入)

```html
<header class="background">
    <p id="logo">logo</p>
</header>
```
注意定义好的.bg(...){...}一定要放在正常的css选择器里面去触发

```
.bg(@color:#555555, @size:16px) {
    background-color: @color;
    font-size: @size;
}

.background{
    .bg
}
```

也可以把他当函数传参数来使用

```less
.bg(@color, @size) {
    background-color: @color;
    font-size: @size;
}

.background{
    .bg(#555555,16px)
}
```

## 命名空间

#wsscat和#wsa两个不同的命名空间，如果两者之间要通信可以这样

```less
#wsscat > .home;
#wsscat > .logo
```

```less
#wsscat{
    @bg:#000000;
    @width:100px;
    .home{
        background-color: @bg;
    }

    .logo{
        width:@width;
        &:hover{
            color: #7FFFD4+@bg;
        }
    }
}

#wsa{
    .home{
        #wsscat > .home;
    }
    .logo {
        #wsscat > .logo
    }
}
```

## 注释

```less
// 单行注释

/*
    多行注释
*/
```

## 导入

less样式文件可以用`@import` '文件路径'来引入我们外面写好的另一份less文件
```less
@import 'styles.less';
```

如果我们不带扩展名或者带非.less的扩展名编译的时候都会被认为是less文件
```
@import 'styles';
```

@import能放在less文件的任何位置，区别于css的@import，它只能放在文件首行
还有@import还提供了六个可选配置项(分别为reference,inline,less,css,once,multiple)，用来改变引入文件的特性

语法为：
```
@import (配置项) '文件路径';
```

具体如下：
1. @import (reference) "文件路径";
　　将引入的文件作为样式库使用，因此文件中样式不会被直接编译为css样式规则。当前样式文件通过extend和mixins的方式引用样式库的内容。
2. @import (inline) "文件路径";
　　用于引入与less不兼容的css文件，通过inline配置告知编译器不对引入的文件进行编译处理，直接输出到最终输出。注意：引入的文件和当前文件会被编译为一个样式样式
3. @import (less) "文件路径";
　　默认使用该配置项，表示引入的文件为less文件。
4. @import (css) "文件路径";
　　表示当前操作为CSS中的@import操作。当前文件会输出一个样式文件，而被引入的文件自身为一个独立的样式文件
5. @import (once) "文件路径";
　　默认使用该配置项，表示对同一个资源仅引入一次。
6. @import (multiple) "文件路径";
　　表示对同一资源可引入多次。
