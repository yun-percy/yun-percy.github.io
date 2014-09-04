---
layout: post
title: 一些linux下的零碎语法和命令
category: Linux
---



- 查看计算机状态
------

		who: 查看有谁在线
		netstat -a :网络的联机状态
		ps -aux: 察看后台执行的程序
		ps aux --sort=pid （后面字母需小写，比如vsz）查看linux下的进程 排序问题


- 关机命令
--------

		shutdown
		reboot
		halt
		poweroff
		用法： sudo shutdown -h 3   (-h:关机 -r：重启 3代表时间，可以设置为now立即执行)

- adb命令
-------

###直接启动应用 ：

		adb shell am start -n "包名/类名"

###查看包名类名：
		aapt dump badging XX.apk

- sed命令
-------

###删除yun.xml中包含uses的行：
		sed -i '/uses/d' yun.xml

###去掉" ' "
		sed -i "s/'//g" yun.xml

###删掉一行文字中versionCode后面的所有文字
		sed -i 's/versionCode.*//g'  yun.xml

###替换
		sed -i 's/package: name/pkgname/g'  yun.xml

- git
------

###去掉 git push时输入账号密码
> __linux__

> + 在~/下， touch创建文件 .git-credentials

		touch .git-credentials

> 用vim编辑此文件
 
		vim .git-credentials

> 输入内容格式：

		https://{username}:{password}@github.com
		example: 比如 https://aoeddklj:1233ds@github.com

> + 在终端下执行  git config --global credential.helper store
 
> + 可以看到~/.gitconfig文件，会多了一项：

		[credential]
    	helper = store

> 这个时候你就不需要输入密码了

