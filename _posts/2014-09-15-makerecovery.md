---
layout: post
title: 编译一个自己机型的recovery
category: Android
---

原文连接[http://forum.xda-developers.com/showthread.php?t=1866545](http://forum.xda-developers.com/showthread.php?t=1866545)


<center><strong>准备工作</strong></center>

+ 64位linux操作系统
+ JDK环境变量
+ cm源代码（或者其它）
+ [mkbootimg_tools](https://github.com/xiaolu/mkbootimg_tools) (高通) 或者[mtktools](https://github.com/bgcngm/mtk-tools) （MTK）（用来解压bootimg）
+ 测试机型

<center><strong>知识储备</strong></center>

+ 小学以上文化水平
+ 会自己[安装linux系统](http://yun-percy.github.io/linux/2014/09/05/win7installlinux.html)
+ 能够熟练使用mktools和mtktools对boot.img进行解包和打包
+ 会[同步源代码以及安装好依赖包](http://yun-percy.github.io/android/2014/09/12/makeandroid.html)

<center><strong>案例和相关文件路径</strong></center>

+ 源码路径：

		～/code/cm-11/

+ jdk version : openjdk 1.6
+ 机型： 红辣椒联通版（品牌商：yusun  型号：LA2-W   ）
+ linux操作系统：deepin2014.1 X64
+ 文档编辑器：sublime text 2
+ recovery 类型： CM11.0自带


<center><strong>教程开始，不要眨眼</strong></center>

1. 进入源码目录

		cd ~/code/cm-11

2. 初始化编译会用到的工具

		make otatools -j8

2. ___将boot.img放在源码目录下___ 然后输入：

		build/tools/device/mkvendor.sh yusun la2w ./boot.img

3. 如果所有都工作正常，你将看到"Done!"这样的确认信息。<br>mkvendor.sh脚本也将在源码树的device中创建以下目录和文件：

		yusun/la2w(路径)
		AndroidBoard.mk
		AndroidProducts.mk
		BoardConfig.mk（配置文件，出问题就要修改这里）
		device_la2w.mk
		kernel（内核文件）
		system.prop
		recovery.fstab（分区配置表）
		vendorsetup.sh

4. 现在你已经拥有相关的配置文件.在源码目录下，在终端下键入以下命令建立起编译环境

		. build/envsetup.sh

5. 加载机型配置文件,现在使用这条命令

		lunch full_la2w-eng

5. 开始编译Recovery.

		make recoveryimage -j4
		到这里我相信你已经不止一次用到了 -j4或者-j8 或者-j32的命令
		这个命令是代表编译的线程的意思
		-j4代表4线程，以此类推，如果你只有4线程，也可用-j32，这个时候等价于-j4

3. 这个命令用于编译recovery镜像，你也可以使用下面这个命令建立一个自己的卡刷包
		make -j4 recoveryzip

4. 你编译好的recovery可以在"your_source_directory/OUT/target/product/device/recovery.img"目录下找到。而.zip刷机包可以在相同目录下的utilities文件夹下找到。<br><br>

如果各项测试正常，就可以有一个成功的recovery


这么简单？你玩我？错误不断啊！
---------------

<br>
<center><strong>各种错误的解决方法</strong></center>

+  如果提示:

		unpackbootimgnotfound.
		Isyourandroidbuildenvironmentsetupandhavethehosttoolsbeenbuilt?
		"make -j4 otatools" don't compile all dependencies needed.

解决办法：<br>
只需将unpackbootimg所在目录out/host/linux-x86/bin加入环境变量即可。

+ 关于

		build/core/product_config.mk:234: *** Cannot locate config makefile
		for product "full_u8833"。 停止。
		** Don't have a product spec for: 'full_u8833'
		** Do you have the right repo manifest?

解决办法：<br>
只是修改源码目录下的vendor/cm/vendorsetup.sh,在

		add_lunch_combo $combo

下面增加一行：最后结果为：

		for combo in $(curl -s https://raw.github.com/CyanogenMod/hudson/master/cm-build-targets | sed -e 's/#.*$//' | grep cm-10.1 | awk {'print $1'})
		do
    		add_lunch_combo $combo
    		add_lunch_combo full_la2w
		done

改好之后执行. build/envsetup.sh
再执行   lunch

+ 在编译 TWRPrecovery的时候，如果出现fuse冲突,可以先移除extenal中间的fuse文件夹

+ 如果出现cp recovery/gui/devices//res  错误，请在devices相关机型下面的boardconfig.mk下面中间添加一句：

		DEVICE_RESOLUTION := 720x1280（注意修改成你的分辨率）

<center><strong>值得注意的地方</strong></center>

+ 如果你改变了BoardConfig.mk文件，在编译期间运行"make clobber"，否则你做的更改就不会生效。

<center><strong>相关技巧</strong></center>

+ 查看分区所在位置和大小的三种方法：

		cat /proc/emmc
		adb pull /cache/recovery/last_log . && cat last_log
		cat /proc/dumchar_info
		其中的 android分区就是 system分区
		其中的 userdata分区就是data分区

+ 键值不准确，查找键值：源码目录/kernel/include/linux/input.h
对应修改

+ 测试手机键值：

		adb shell getevent

<center><strong>定制recovery中出现的问题和技巧</strong></center>

+ 自定义字体和显示C文件：<br>
在cm10/device/htc/pyramid/recovery/boardconfig.mk里最后一样添加

		BOARD_CUSTTOM_GRAPHICS:=home/yun/code/cm10/device/htc/pyramid/recovery/graphics.c

+ 挂载分区失败：<br>
在boardconfig.mk最后添加：

		# USB Mounting
		BOARD_UMS_LUNFILE := "/sys/class/android_usb/android0/f_mass_storage/lun%d/file"
		TARGET_USE_CUSTOM_LUN_FILE_PATH := /sys/class/android_usb/android0/f_mass_storage/lun%d/file
		TW_INTERNAL_STORAGE_PATH := "/sdcard"
		TW_INTERNAL_STORAGE_MOUNT_POINT := "sdcard"
		TW_EXTERNAL_STORAGE_PATH := "/external_sd"
		TW_EXTERNAL_STORAGE_MOUNT_POINT := "external_sd"
		RECOVERY_GRAPHICS_USE_LINELENGTH := true
		TW_NO_REBOOT_BOOTLOADER := true

注意：TARGET_USE_CUSTOM_LUN_FILE_PATH := /sys/class/android_usb/android0/f_mass_storage/lun%d/file每个机型不同，如果不能挂载请尝试其它的路径：

		"/sys/devices/platform/usb_mass_storage/lun%d/file",
		"/sys/class/android_usb/android0/f_mass_storage/lun%d/file"
		"/sys/class/android_usb/android0/f_mass_storage/lun/file"
		"/sys/class/android_usb/android0/f_mass_storage/lun_ex/file"

+ 修改字体颜色：<br>
在cm-11/bootable/recovery/ui.c中有一句：

		#define MENU_TEXT_COLOR 255, 160, 49, 255

前三个是rgb颜色 第四个是透明度
