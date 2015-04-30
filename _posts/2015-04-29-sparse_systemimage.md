---
layout: post
title: system.img的分解与合并
category: android
tags : [ , ]
---

首先使用:

		file system.img_sparse1

来查看sparse文件是否为标准的data文件，如果是的，就可以用下面命令来将其合并

		simg2img system.img_sparse1 system.img_sparse2 system.img_sparse3 system.img_sparse4 system.img

分解命令

		img2simg system.img system.img_sparse1 system.img_sparse2 system.img_sparse3 system.img_sparse4 [<block_size＞]

转换为ext4，先挂载，然后再转换

		mount -t ext4 -o loop system.img sys
		./make_ext4fs -s -l 512M -a sytem new_system.img sys   #这个工具在源码目录下的 out/host/linux-x86/bin/下，如果没有就执行　make otatools -j16

