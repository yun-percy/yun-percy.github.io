---
layout: post
title: （未完成）Android系统拼包移植各个系统驱动对应的so文件
category: android
---



为什么要写这篇文章
---------

前段时间跟几个做移植的romer聊天，
发现他们所有的经验都是靠一个个对比得到的，
对于很多so文件的功能由于看不到C文件，所以不知道它的功能，
所以今天花点时间写一下各个java和C最后编译生成的so，可能对romer没什么用，
但多少能帮到点。

硬件模块
----------

+ /system/lib/hw 下
	
		gralloc.default.so 表示默认的Gralloc 模块
		sensors.goldffish.so 表示默认的传感模块

+ 音频驱动
	
		framework/base/libs/audioflinger ----> libaudioflinger.so  Audio系统本地服务
		framework/base/media/libmedia 	 ----> libmedia.so 提供Audio部分接口，media库中audio的一部分
		framework/base/core/jni			 ----> libandroid_runtime.so 音频的jni接口封在这里面
		AudioHardwareInterface AudioStreamOut AudioStreamIn 这三个类编译生成 libaudio.so 是音频的硬件抽象层

+ 相机驱动

		framworks/base/libs/ui			----->libui.so 	相机本地框架代码(如果有)
		frameworks/base/libs/camera		----->libcamera_client.so  相机本地框架
		

报错
--------

+ hw_get_module 函数报错

		这个函数执行的是一个动态查找的过程，当没有动态库的时候就会打开默认的库文件 （*.default.so).