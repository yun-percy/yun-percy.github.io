---
layout: post
title:  Linux 下firefox浏览安装flash插件
category: linux
tags : [ linux,浏览器,firefox]
---

+ 从http://get.adobe.com/cn/flashplayer/ 下载.tar.gz的源码包

+ 解压

+安装方法

		sudo  cp usr -r /usr
		sudo cp libflashplayer.so /usr/lib/mozilla/plugins/
		sudo chmod 644 /usr/lib/mozilla/plugins/libflashplayer.so

+ 重启firefox
