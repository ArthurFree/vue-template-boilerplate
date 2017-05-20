# flexbox

## flex知识点

Flex容器 - 元素设置了`display: flex/inline-flex`

Flex项目 - Flex容器的子元素

Flex容器属性：
    -   flex-direction - 控制Flex项目沿着主轴（Main Axis）的排列方向

        -   row(水平)-(沿Main-axis) || column(垂直)-(沿Cross-axis) || row-reverse(水平反向) || column-reverse(竖直反向)

    -   flex-wrap - 换行显示

        -   wrap(换行显示) || nowrap(默认)-(Flex容器内的Flex项目不换行排列) || wrap-reverse(换行反向显示)

    -   flex-flow - flex-direction和flex-wrap的速记属性 - ( flex-flow: [flex-direction] [flex-wrap] )

    -   justify-content - 主要定义了Flex项目的在Main-axis上的对其方式

        -   flex-start(左对齐) || flex-end(右对齐) || center(居中对齐) || space-between(两端对齐) || space-around(每个Flex项目具有相同空间)

    -   align-items - 主要用来控制Flex项目在 Cross-axis 上的对齐方式

        -   flex-start(顶部对齐) || flex-end(底部对齐) || center(居中对齐) || stretch(默认) - (让所有Flex项目高度和Flex容器高度一样) || baseline(让所有Flex项目在Cross-axis上沿着他们自己的基线对齐)

    -   align-content - 用于多行的Flex容器，属性值与 `align-items` 相同，除了 `baseline` 排列效果和 `align-items` 一样。默认值为 `strctch`

Flex项目属性：
    -   order - Flex项目会根据order重新排序 - 默认是 `0 `

    -   flex-grow - 放大 - 控制Flex项目在容器有多余的空间如何放大（扩展）,在没有额外的空间又如何缩小

        -   0(默认) || positive number

    -   flex-shrink - 缩小

        -   1(默认) || positive number

    -   flex-basis - 指定Flex项目的初始大小 - 可以设置Flex项目的固定宽度

        -   auto(默认) || % || em || rem || px 等所有width可取的值

    -   align-self - 改变一个项目沿着侧轴的位置，而不影响相邻的弹性项目

        -   auto || flex-start || flex-end || center || baseline || stretch

flex速记：
    -   flex: [flex-grow] [flex-shrink] [flex-basis]

相对和绝对的Flex项目

    -   主要区别在于 间距 及 如何计算间距

    -   相对Flex项目内的间距是根据它的内容的大小来计算的

    -   绝对Flex项目只根据 `flex` 属性来计算，而不是内容

    -   当Flex项目因为设置 `flex-basis: auto`，而导致宽度被自动计算时，是基于Flex项目内的内容大小而计算的

    -   绝对Flex项目的宽度只基于 flex 属性，而相对Flex项目的宽度基于内容大小。

## 使用flex实现终端适配

### 基本概念

***视窗(viewport)*** - 严格等于浏览器的窗口，移动端的viewport太窄，提供了两个viewport虚拟的`viewportvisualviewport` 和 布局的 `viewportlayoutviewport`

***物理像素(physical pixel)*** - 又被称为设备像素，显示设备上的一个最微小的物理部件，每个像素可以根据操作系统设置自己的颜色和亮度。

***设备独立像素(density-independent pixel)*** - 也称密度无关像素，可以认为计算机坐标中的一个点，代表一个可以由程序使用的虚拟像素(比如CSS像素)，然后由相关系统转换为物理像素

***CSS像素*** - 是一个抽象的单位，称为与设备无关的像素(device-independent pixel)，简称DIPs

***屏幕密度*** - 指一个设备表面上存在的像素数量，通常以每英寸有多少像素来计算(PPi)

***设备像素比(device pixel ratio)*** - 简称dpr，定义了物理像素和设备独立像素的对应关系
```
设备像素比 ＝ 物理像素 / 设备独立像素
```

### <meta>

以显示网页的屏幕宽度定义了视窗宽度
```
<meta name='viewport' content='width=device-width, initial-scale=1, maximum-scale=1' />
```

### rem

rem相对于根元素<html>的font-size来做计算


在js中，通过`window.devicePixelRatio`获取到当前设备的dpr。在CSS中，可以通过-webkit-device-pixel-ratio，-webkit-min-device-pixel-ratio和 -webkit-max-device-pixel-ratio进行媒体查询，对不同dpr的设备，做一些样式适配(这里只针对webkit内核的浏览器和webview)

## 参考

> [理解Flexbox：你需要知道的一切](https://www.w3cplus.com/css3/understanding-flexbox-everything-you-need-to-know.html)
