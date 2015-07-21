---
layout: post
title: Android获取分区信息
category: android
tags : [ 分区, adb,Android ]
---

> 在做编译适配的时候，我们通常要去获取一些系统分区的相关信息，这里粗略的介绍了几种方法获取不同的分区信息

分区列表
----

		ls -al /dev/block

分区对应的实际地址
-----

		ls -al /dev/block/platform/sdhci****/by-name/

获取分区块大小
------

		adb pull /proc/partitions ./partitions.txt 		#显示单位是blocks，1blocks=1K

		cat /sys/class/block/mmcblk0p1/size			#显示单位是records，1records=512byte


其他的一些命令
-----

		cat /proc/emmc
		cat /proc/dumcharr_info
		cat /cache/recovery/last_log


查看格式和挂载
-----

		cat /etc/fstab
		df -h
		cat /proc/mounts
