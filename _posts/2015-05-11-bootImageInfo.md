---
layout: post
title: boot.img的结构，生成，分解与打包
category: android
tags : [ boot.img,Android,解包， 打包]
---

为什么要解boot
-----

> Android中一直存在着boot.img这个文件（2.3.3-2.3.7中有些第三方ROM会把boot.img解开，直接放进system/lib/module中去）。

> 随着技术的不断深入，改boot.img已经成为了一种必须的操作，改boot到底能有什么用?比较常见的有：

+ root 手机

> 在sbin中放入相关的su，superuser.apk等相关可执行文件，然后在init.rc中oneshot一下，就可以了。具体方法可以去解一下别人root过了的boot.img

+ 打开adb调试权限

> 修改default.prop中间的幻镜变量就可以了，如果想要 adb shell过后就有root权限，就需要替换 sbin下的adbd了

+ 引导jar包

> 各种OS和UI以前都有在 init.rc 中加入自己私有jar包的习惯，（MIUI后来又去掉了这个习惯）。

+ 修复各种问题

> 对于一些常规性又奇葩的bug，在boot.img中修复可谓是省心省力。比如sdcard无法使用，打log发现是sdcard这个文件夹竟然不存在，常规方法肯定是要各种修改HAL层了，在vold反复升级情况下，不是对vold系统特别了解的人还修复不了。但是如果在init.rc中加一句 mkdir /sdcard 往往就能轻松解决问题。

bootimage的结构
------

boot.img一般由 boot header，zImage(kernel)和ramdisk构成，但是在4.3到4.4引入了一个dt.img(device tree source),DT可以分解为多个dtb，然后打包成dt.img，或者直接就是一个 dtb 然后追加到kernel后面。因为在5.0以后，大部分源码编译厂商又开始将dtb又开始追加到kernel后面，所以本文中，我们就直接忽略dt.img。

将ramdisk解开后，我们可以看到一堆文件夹，因为都不太重要，而且出于篇幅考虑，我这里只稍微列举一下最重要的部分

		-ramdisk
		|-firmware    #一些扩展的固件
		|-sbin        #可执行文件
		|-res 		  #res 开机时使用的资源
		|-init        #load rc文件的进程
		|-*.rc   	  #各种配置文件
		|-*           #其它文件，比如与selinux相关文件
		-zImage

bootimage参数
-----

手动打包过boot.img的人都知道boot.img的参数是非常多而且眼花缭乱的。这里简要介绍下各个参数含义。

认真看了的朋友应该发现，上面一节中我没有讲 header，因为在分解后是不体现在文件中的，所以很多人就没有注意到它（其实我也是最近才注意到），header只是一些命令和参数，它其实是起到了一个引导的作用。里面包含的主要是一个‘ANDROID’字符串和 cmdLine。

+ __cmdline（command line）__

顾名思义就是命令行的意思，它是内核的附加命令行。我们有n中取出它的方式，比如解包的时候，或者用adb取。

		adb shell su -c "cat /proc/cmdline"

在Boardconfig.mk中对应宏为：  BOARD_KERNEL_CMDLINE

+ __base address__

内核加载基地址，对应宏变量为：  BOARD_KERNEL_BASE

+ __page_size__

镜像的每个页面大小，一般为 2048与4096,也有8192的

对应宏变量为： BOARD_KERNEL_PAGESIZE

+ __kernel_offset__

kernel的偏移地址 ，对应宏变量为: BOARD_KERNEL_ADDRESS

+ __ramdisk_offset__

ramdisk的偏移地址，它一般在 TARGET_MKBOOTIMG_ARGS里面赋值

+ __tags_offset__

内核标签的偏移地址，同上

+ __second_offset__

它是 second stage的偏移地址，这个部分在整个boot.img的最后部分，是可选可不选部分，如果解包的时候有，那就加上，不加也没关系

分解boot.img  的工具
----

首先，我这里介绍的是linux下的工具，因为我这四五年一直都在linux下，所以不太知道windows下有没有相关的工具，有的话可以补充，谢谢。

__Mtk-tools__

一般使用这款开源工具作为mtk的解包和打包工具，我上一次使用了它对MTK6735 进行了解包命令。需要的朋友可以去[github下载](https://github.com/bgcngm/mtk-tools)。

使用命令：

		./unpack-MTK.pl xxx.img   #解包
		./repack-MTK.pl --boot <kernel> <ramdisk> new-boot.img   #打包

更多命令可以直接参考github上面的README 

__mkbootimg_tools__

支持4.1-5.0的非mtk cpu的boot解包和打包，暂时还没出现过错误，（4.1以下本人没有尝试过，需要的朋友可以自己测试），[github地址](https://github.com/xiaolu/mkbootimg_tools).

使用命令：

		./mkboot boot.img boot #解包
		./mkboot boot new-boot.img #打包

这个命令很人性化，如果$1为img文件，就解包，如果为目录就打包 

__bootimg_tools__

这款工具是在xda上看到的，基于AOSP写的，扩展了很多参数，最新的编译版本为7.8.13 [github源码地址](https://github.com/pbatard/bootimg-tools)

我们QROM的构架的boot.img大多数就是用这个解包与打包的.为了方便各位，我已经上传一份到 git.code.oa.com<br>
地址：[git.code.oa.com/v_yunchen/bootimg_7.8.13](git.code.oa.com/v_yunchen/bootimg_7.8.13)

使用命令：

		./umkbootimg xxx.img #解包成zImage 和 initramfs.cpio.gz
		./unpack_ramdisk initramfs.cpio.gz #将 initramfs.cpio.gz分解为ramdisk文件夹
		./repack_ramdisk ramdisk new-initramfs.cpio.gz  #与上面相反
		./boot_info xxxx.img #获xxx.img的信息
		将 umkbootimg以及 boot_info打出的信息记录下来，下面打包需要用
		./mkbootimg ---kernel zImage --ramdisk new-initramfs.cpio.gz --pagesize $pagesize --base $base --kernel_offset $kernel_offset --ramdisk_offset $ramdisk_offset --second_offset $second_offset --tags_offset $tags_offset --cmdline "${cmdline}" -o new_boot.img 


当然，为了方便程(lan)序（si)员(shi),花了点时间写了两个解包和打包脚本。使用方法

		autounpack.sh boot.img 
		#将会生成 ramdisk，和zImage
		autounpack.sh boot.img 
		#会根据boot.img的信息，将ramdisk(或者 new-initramfs.cpio.gz)以及zImage打包成new-boot.img















































打打
