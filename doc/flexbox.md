# flexbox

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


## 参考

> [理解Flexbox：你需要知道的一切](https://www.w3cplus.com/css3/understanding-flexbox-everything-you-need-to-know.html)
