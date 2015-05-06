---
layout: post
title: Android Recovery 编译中常见问题
category: android
tags : [ Android,recovery,编译,bug ]
---

> 来鹅厂之前，我以为我是来写App层和Framework 的feature的，或者做前端，万万没想到，进来之后就一头栽进 Recovery的坑里了，我的主语言是java，Makefile和shell，所以本来只打算在jacky的手下打打杂工的，万万没想到就成了owner，好在以前写过一点点C，接下担子后就开始各种苦逼的解bug了

调试的基本功
-----

+ 会查看log

	adb shell "cat /cache/recovery/last_log.1"  #recovery模式下
	adb shell su -c "cat /cache/recovery/last_log" #正常模式下

+ 会一些常规的 adb 调试指令

	adb shell "cat /dev/input/event0"  #获取设备的输入信息，在调试按键和屏幕的时候比较有用
	adb shell "dmesg"     #selinux的相关信息
	adb shell "cat /proc/bus/input/devices"     #输入设备的芯片和型号

+ 比较扎实的C语言功底和Makefile的基本知识。


OTA失败
-----

这种问题在新机型的适配中比较常见，出错根源主要分为三种：

+ __空间不足__

这算是非常喜闻乐见的bug了，直接对包做一些精简就能解决这个问题，不需要去动recovery

+ __挂载失败__

之前MI3TD就遇到了这种问题，链接表是从官方表中导出的，OTA了十几个版本都没问题，突然一天就失败了，像这种无厘头的bug只能挠挠头老老实实去分析了。
看了下updater_script的挂载地址，然后

		ls -al /dev/block/platform/????/by-name

对比发现 system本来对应的分区 mmcblk0p24在手机上给对应成了 

	/dev/block/platform/????/by-name/APP

于是修改分区表，将分区表中的：

		/dev/block/platform/????/by-name/system

改成：

		/dev/block/platform/????/by-name/APP

启动编译，验证OK了。当然这不是最好的解决方式，为了分区表的可读性我们往往会使用by-name的链接写法，但是个人是比较建议使用实际地址的方式来写分区表的，这样不管你的链接表怎么变化，我们都能准确的找到对应的分区挂载。

+ __全量包无法写入__

> 问题描述，卡刷没问题，增量刷机没问题，其实就是各种刷机各种折腾都没问题，除了刷全量包的时候，这是遇到最头疼的事情了.

> 分析，因为只有一台手机出现了这种情况，所以问题应该是在device上，看log是system不可写入部分文件，导致刷机失败。所以定位问题是出现在分区表的写法上。

> 分区表是从官方里拖出来的，分区地址应该是没问题

> 折腾了一个小时后发现，在recovery下写command进行全量包的刷机竟然可以成功，但是正常模式下写command刷机会失败，故推导出可能是 vold 服务区别的原因

> 这样就好解决了，因为在分区表里与vold相关的只有 mnt_flags这些标识了，mnt_flags是从linux引入的装载标识，但是linux的装载标识的值与Android有些不同，所以只好去Android官网查，结果只查到一句：vold忽略这个值，应该被设置为defaults。这就无解了，因为如果设置为defaults的话，就挂不上 system。

解决：  没什么好的解决办法，只能厚着头皮慢慢调，当我把 barrier=1这个属性加上的时候，全量升级就调通了。后面因为还有很多bug要调，没时间细究，准备将这个作为一个点，有时间了好好研究下 Android的mount 标识


各种奇葩的设定
------

__颜色值不对__

我们默认的是：

		TAGET_RECOVERY_PIXEL_FORMAT : "RGBX_8888"

实际上还有一种：

		TAGET_RECOVERY_PIXEL_FORMAT : "BGRA_8888"

两种换着来就可以解决。

__屏幕不亮，但是adb已启动__

		TAGET_RECOVERY_LCD_BACKLIGHT_PATH :=\"/sys/class/leds/lcd-backlight/brightness\"

__屏幕花屏__

		RECOVERY_GRAPHICS_USE_LINELENGTH :=true

__键值不对__

可以在正常系统下测试各个键值：

		adb shell getevent

然后复执一份 default_recovery_keys.c 到device/××××/×××/recovery目录下，重命名为recovery_keys.c，修改宏定义，宏定义可以根据你上一步获取的键值去查看 kernel/include/linux/input.h中对应的键值.然后编译即可。
