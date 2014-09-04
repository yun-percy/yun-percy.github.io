---
layout: post
title: Linux下JDK的下载和使用
category: linux
---

Linux下JDK的下载和使用
=========

Linux下有mint/ubuntu/deepin/debian/opensuse/redhat等众多平台。
而Orcle只为Linux发布一个JDK（当然包含64bit和32bit），这个JDK是tar.gz格式的
初用ubuntu或者基于ubuntu衍生版的人就懵了，怎么安装呢？
其实很简单，下面我就来讲解下如何安装
> 

安装方法：
------------

其实不用安装，只需要用命令解压开：

		tar zvxf ×××××××.tar.gz, 

+ 参数的配置。

> 在你的/etc/profile文件中增加一条这样子的配置

		export JAVA_HOME=/home/yun/software/jdk1.5.0_12(你的JDK所在文件夹)

		PATH=$JAVA_HOME/bin:$PATH



> 然后用

		source /etc/profile 

> 命令使其生效。
> 然后在终端输入 

		java
		javac
		java -version

> 这几条命令检验是否已经安装好 