---
layout: post
title: "编译一个android ROM中文指南"
category: android
---

###关于 [Android](http://baike.baidu.com/subview/1241829/9322617.htm?fr=aladdin)
android是一个开源系统，意味着任何人都可以参与到android的开发中来，除了可以开发应用层外，你甚至可以重写framework层和C层，牛逼一点还可以重写虚拟机。本文是给那些入门的人写一个基本的编译教程。

###准备条件

+ 一台cm支持的设备。
+ 一台搭载linux 64位系统的电脑。
+ 会一点python，shell或者C（非必须）

###为什么是cm？

圈内的人都知道cm，CM是[CyanogenMod](http://baike.baidu.com/view/5079569.htm)的简称。Cyanogen团队是目前全球最大的Android第三方编译团队。cm算是三方ROM包的鼻祖了，cm支持的机型特别多，一般国际上热门的机型都会支持。了解详情请去[CM的wiki百科](http://wiki.cyanogenmod.org/w/Main_Page?setlang=zh-cn)

###linux 64位操作系统

严格的来说，linux 32位系统和windows下用cywin也能编译，同样用虚拟机跑linux也是可以编译一个ROM包的，但是32位的linux编译起来问题比较多，而cywin和虚拟机编译效率低下，本来编译时间就比较漫长，为了节省时间，建议自己装一个linux，楼主现在就是纯linux工作的。<br/>
在linux的阵营中建议新手选择ubuntu，ubuntu使用久了人可以转而使用mint，debian或者其它，楼主使用过redhat，opensuse，debian，mint，ubuntu，deepin，elementary os等linux，推荐使用mint，稳定高效，界面也可以忍受，目前楼主在用deepin，主要是因为它的sublime text能够输入中文，而且原生支持搜狗输入法。

###需要什么语法基础

实际上，你什么语法都不会也是可以编译出来的，不过编译过程中没有错误几乎是不可能的，编译脚本使用python写的，中间调用了些shell脚本，这个脚本用来编写java和C文件。如果这些你都不懂，也没关系，但是Makefile中文指南你必须得去看一下，楼主当年战斗力负100的时候，去实习，就看了一周的makefile。Android的编译配置文件大多是以.mk结尾的文件，这些文件都遵循makefile语法布局。所以，即便是你看不懂，最好也要愁一点时间看看。

教程开始
-----------------

###1. 准备设备私有文件
	
如果你的设备是CM官方支持的机型，那么私有文件肯定是可以在github上找到的，你可以直接在github上搜索：
		
		android_devices_xxxx_xxxx
		android_kernel_xxxx_xxxx

比如oppo的find7 你就可以分别搜索：
		
		android_devices_oppo_find7
		android_kernel_oppo_find7

搜索到后clone就ok。

		git clone 网址

###2. 安装SDK	

SDK是包含在ADT中的，所以你可以百度“ADT”然后进入下载ADT得到，如果下载不下来，或者某个网页打不来，呵呵，你懂的，请自行准备梯子FQ。<br/>下载得到的adt压缩包和，解压得到一个sdk文件夹和eclipse文件夹，解压开放在你的用户目录。<br/>
另外，建议将sdk/platform-tools加入系统环境变量，这样你就可以adb和fastboot了。

###3. 安装编译依赖包

没什么要说的，打开终端输入：

		sudo apt-get install bison build-essential curl flex git gnupg gperf libesd0-dev libncurses5-dev libsdl1.2-dev libwxgtk2.8-dev libxml2 libxml2-utils lzop openjdk-6-jdk openjdk-6-jre pngcrush schedtool squashfs-tools xsltproc zip zlib1g-dev g++-multilib gcc-multilib lib32ncurses5-dev lib32readline-gplv2-dev lib32z1-dev

安装完后,你的环境和jdk都会搭好了。如果出现部分包无法安装，请自行百度，每个linux收录的包的多少都有些不同。请自行解决。

###4.建立文件夹，准备获取代码

直接在终端里输入：
		
		mkdir -p ~/bin
		mkdir -p ~/code

第一个文件夹用来装repo下载工具，第二个文件用来装代码。所以第一个文件夹需要放进环境变量，最近的ubuntu和mint版本不需要，但是其它版本就不知道了。怎么加入环境变量请百度。<br/><br/>

+ __下载repo__

		curl http://commondatastorage.googleapis.com/git-repo-downloads/repo > ~/bin/repo
 		chmod a+x ~/bin/repo

###5.下载android源码

		cd ~/code
		mkdir cm-11
		repo init -u git://github.com/CyanogenMod/android.git -b cm-11.0
		repo sync

同步时间比较久，毕竟是几十G的代码，CM11好像有尽30G，如果同步出错，请自己写一个断线自动同步代码，在我的其它文章里有。我最近在同步4.4.4的代码，同步三天了，还没同步完，哎。

###6. 装载私有文件

将第一步下载好的device文件夹里面的文件放到源码目录下的 device/品牌名/设备名里面去。<br/>
将下载好的kernel文件夹里面的文件放到源码目录下的 kernel/品牌名/设备名里面去.<br>
比如oppo find7 文件夹里面文件和文件夹放置到

		device/oppo/find7
		kernel/oppo/find7

放好后就可以摩拳擦掌，准备编译了。

###7. __编译__

编译步骤太多，就不解释啦，直接上代码：

		cd ~/android/system/vendor/cm
		./get-prebuilts

上面两步是为了获取预制资源，一般是终端什么的，也可以跳过

		. build/envsetup.sh

初始化所有编译环境，将编译脚本加载到终端

		breakfast find7

初始化find7的编译文件

		cd ~/android/system/device/oppo/find7
		./extract-files.sh (需要连接设备)

上面两步是获取vendor资源。

		export USE_CCACHE=1
		prebuilts/misc/linux-x86/ccache/ccache -M 50G

上面两步是加速你的编译sudo

		croot
		brunch find7 -j32

最后编译就OK了。

###测试

包位于 out/target/product的机型文件夹里，刷人测试就ok！


一个个字码起来的，转载请保留原地址：[http://yun-percy.github.io/android/2014/09/12/makeandroid.html](http://yun-percy.github.io/android/2014/09/12/makeandroid.html)
		




	



