---
layout: post
title: 关于 recovrey 图片的说明
category: android
tags : [ linux,Android,recovery， 图片]
---

recovery图片格式需求
-----

> 第一次做TOS Recovery改造的时候，是基于刷机精灵的Recovery改的，代码是从cm10.1迁移上来的，基本就是只需要替换几张图片的事情，然后增加几个功能而已，整个过程进行的很顺利，但是合入images资源的时候，recovery直接黑屏了。把log拆出来一看，报错了：

			E: minui does't support PNG depth 8 channels 4 color_type PNG_COLOR_TYPE_RGB \n"

类似的这几种问题，在后面的适配中又出现了几次。说到底就是图片的色彩深度不支持，对于一个开发的人来说，这是什么鬼报错？因为以前混过半年的UI设计师，所以勉强能理解 深度8的意思，但是channels是什么鬼？ 通道吗？ 通道我知道，但是后面的数值是什么鬼？

想来想去，还是直接看代码：

			 if (bit_depth == 8 && *channels == 3 && color_type == PNG_COLOR_TYPE_RGB) {
        		// 8-bit RGB images: great, nothing to do.
    		} else if (bit_depth <= 8 && *channels == 1 && color_type == PNG_COLOR_TYPE_GRAY) {
        		// 1-, 2-, 4-, or 8-bit gray images: expand to 8-bit gray.
        		png_set_expand_gray_1_2_4_to_8(*png_ptr);
    		} else if (bit_depth <= 8 && *channels == 1 && color_type == PNG_COLOR_TYPE_PALETTE) {
        		// paletted images: expand to 8-bit RGB.  Note that we DON'T
       		 // currently expand the tRNS chunk (if any) to an alpha
       		 // channel, because minui doesn't support alpha channels in
        		// general.
        		png_set_palette_to_rgb(*png_ptr);
   			 } else {
        		fprintf(stderr, "minui doesn't support PNG depth %d channels %d color_type %d\n",
                bit_depth, *channels, color_type);
        		result = -7;
        		goto exit;
    		}

结合代码和log来看，果真是channels出问题了。问了设计的朋友，他们居然也不知道，于是自己开photoshop格式化图片，试了一次就成功了：

第一种方式：（5.0以上慎用）

![第一种方式](/assets/img/recovery_image1.png)

对应： bit_depth <= 8 && *channels == 1 && color_type == PNG_COLOR_TYPE_PALETTE

后面尝试了另外一种方式，发现也是可以的：

![第二种方式](/assets/img/recovery_image2.png)

对应：bit_depth == 8 && *channels == 3 && color_type == PNG_COLOR_TYPE_RGB


libpng的兼容问题
----------

适配5.1的时候，自己画的图，放进去，总是报 warning的一些错误：

		libpng warning iccp not recognizing known srgb profile that has been edited

虽然不会影响功能，但是作为一个严(qiang)谨(po)的(zheng)程序猿，怎么允许这种情况发生呢。

因为是libpng的报错，不是Android那边的报错，估计是兼容性出了问题，google了一下，得到的结果竟然是，google承诺下个版本会修复。这么看起来是官方的问题了，到这里，基本就是被判了死刑。鬼知道google什么时候才会修复，这不是要逼死强迫症患者吗？

怎么可能就这样放弃，既然是libpng报出的warning，那就去看看 为什么 libpng会报出 这个问题：

libpng网站[http://www.libpng.org/pub/png/libpng.html](http://www.libpng.org/pub/png/libpng.html)

查了下源码，发现原因是png里面有太多空片段造成的，也就是说，你如果把png转换成16进制去看，会看到一堆00000000的片段，把这些去掉就好了。看到这里就明白市面上那些图片压缩软件的原理了。于是去找找压缩软件：

mac的可以用 [imageoptim](https://imageoptim.com/)

linux的可以用 [trimage](http://trimage.org/),debian&ubuntu&mint用户可以直接用下面命令安装

		sudo apt-get install trimage

安装完后，可以在应用列表或者命令行里打开，打开后选择图片压缩，压缩率在 70~90的样子，在不损失图片细节的情况下可以压缩掉80%的空间。将压缩的图片丢进去，然后编译。

至此，问题成功解决！而且图片的索引速度比以前快了很多，没有卡顿现象了。

__注意：__

__在Android 5.0以后，应用开发也会出现这种情况，所以务想解决这个问题的话，务必要先将图片压缩。__




__全文完__
