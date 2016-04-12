---
layout: post
title: adb查看android系统相关命令
category: Android
---

####其实很多命令我在其它文章中都介绍过了，今天整合一下

### 备份boot.img

 今天刚从独行无疆那里学的

		dd if=dev/bootimg of=sdcard/boot.img count=1 bs=$((0x1000000))

注：bs可以从分区信息中读取

### 查看分区表（三种方法）

		cat /proc/emmc
		adb pull /cache/recovery/last_log . && cat last_log
		cat /proc/dumchar_info

其中的 android分区就是 system分区

其中的 userdata分区就是data分区

对于古老的机器可以尝试:

		cat /proc/mtd

### 测试键值

		adb shell getevent

### 查看cpu和内存事实占用情况

		adb shell top -m 15

### 查看内存使用详情

		adb shell dumpsys meminfo
