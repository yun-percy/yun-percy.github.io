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
		whereis  :查看命令所在文件夹
		ls -lht  查看当前文件夹下面每个文件的权限，信息和大小


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

apt-get
----

###ia32-libs

这是一个32位依赖包，很多常用软件依旧在是用这个依赖包，但是在ubuntu和mint的软件源里已经把这个依赖包给去掉了，那我们怎么来安装？<br/>添加软件源，下文中要添加的软件源是现在还能用的，也许以后就没了，因为安装过程中要经常使用sudo的授权，所以第一步我们就直接临时进root了。使用完了记得退出。<br/>直接上链接：

	sudo -i
	cd /etc/apt/sources.list.d
	echo "deb http://archive.ubuntu.com/ubuntu/ raring main restricted universe multiverse" >ia32-libs-raring.list
	apt-get update
	apt-get -f install
	apt-get install ia32-libs

搞定

###find 命令

		find . -name "*.mk"  -exec grep -l "love" {} \;

在所有后缀名为.mk中查找带love的文件，并且列出文件名

###高通开机splash.img文件制作

		convert -depth 8 logo.png  bgr:splash.img

###linux下bootanimation制作

		zip -0 bootanimation.zip part0/*PNG part1/*PNG desc.txt

###ls命令参数

		-h 将文件大小转换为方便阅读的单位
		-R 遍历所有目录
		-F 添加文件类型标记
		-S 按文件大小排序输出
		-t 按文件修改时间排序输出
		-X 按文件类型输出


### 修改系统日期和时间

		sudo dpkg-reconfigure tzdata   #修改系统时区
		sudo hwclock --hctosys     #同步系统时间和硬件时间
