---
title: 解决相机移植后像素无法识别完全的bug
category: Android
---


问题来源很简单，自己编译了一个CM自带的相机，丢进去没发现BUG，全景相机，后期优化什么的都没有问题。<br>于是放进ROM包里，发出去。<br>细心机友发现最高只识别500W，于是拆开源码分析。<br>源码位于:

		code/cm10.1/packages/apps/camera

发现字符串没有丢失，链接到java代码里面一看，明白了：<br>CM的相机（AOSP和AOKP也是如此）识别相机的方式并不是读取某个文件，而是获取相机成像尺寸，源码里写死在array里面，也就是说，相机获取成像尺寸后与values下面的数组文件array.xml对比，有的话就显示。<br>而官方的相机组件接口里面的成像尺寸并不和array.xml对应，这就造成了，像素识别不准确。<br>解决办法：

>修改array.xml中的pref_camera_picturesize_entryvalues数组值

使它的尺寸与官方相机拍出来的尺寸一致就可以了。<br>改完之后如图：<br><br>
![github](/img/camera.jpg)
