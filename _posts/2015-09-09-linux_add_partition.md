---
layout: post
title: linunx 扩充HOME目录的方法
category: linux
tags : [ linux,home,目录]
---

> 原本磁盘大小是500G后来实在装不下，就又将原来装windows一块分区格了，挂上去。但是又不想将原来的Home目录情况，重新分区，几百G的代码删掉又舍不得，备份没有几天都搞不定。

> 网上看了很多教程，都太过啰嗦。自己根据Android经验，自己摸索了一番。搞定，只花了半小时。

1. 将分区格式化为 ext4
----------

这里我就不详细讲，用fdisk分区命令或者一些磁盘管理工具就能搞定


2. 挂载到/Home目录
------------

考虑到新加进来的分区主要是用作存放源代码，所以就直接在主目录下新建了一个目录

		mkdir -p ~/source

然后尝试挂载

		mount /dev/sdb7 /home/percy/source

发现是OK的

3. 开机自动挂载
------------

熟悉Android的都知道，原本Android挂载一下分区是通过 /etc/vold.fstab 来挂载sdcard的，所以 查了一下 etc下面的文件，虽然
没有vold.fstab但是却找到  /etc/fstab文件

		sudo vim /etc/fstab

看了一下语法，发现跟 Android 的recovery下的分区表语法基本一致，所以修改一下。最后改完如图：

![分区表修改](/img/linux1.png)

4. 重启，验证
------

搞定！

![挂载到目录](/img/linux2.png)
![挂载到目录](/img/linux3.png)














