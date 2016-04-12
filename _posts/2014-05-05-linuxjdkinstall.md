---
layout: post
title: Linux下JDK的下载和使用
category: Linux
---



Linux下有mint/ubuntu/deepin/debian/opensuse/redhat等众多平台.<br />
而Orcle只为Linux发布一个JDK（当然包含64bit和32bit），这个JDK是tar.gz格式的
初用ubuntu或者基于ubuntu衍生版的人就懵了，怎么安装呢？<br />其实很简单，下面我就来讲解下如何安装
>

安装方法：
------------

其实不用安装，只需要用命令解压开：

		tar zvxf jdk1.7.0_67.tar.gz,

+ 参数的配置。

> 将解压出来的jdk复制一份到 主系统里去（安全着想）

		sudo cp -r jdk1.7.0_67/usr/local
> 在你的/etc/profile文件中增加一条这样子的配置

		export JAVA_HOME=/usr/local/jdk1.7.0_67

		PATH=$JAVA_HOME/bin:$PATH



然后用

		source /etc/profile

命令使其生效。<br/>然后在终端输入

		java
		javac
		java -version

 这几条命令检验是否已经安装好

高级
--------

_2014年9月12更新_

####切换编译时默认使用的jdk

如果你之前已经安装了openjdk,或者jdk8，那么请先将jdk7添加进去：

		sudo update-alternatives --install /usr/bin/java java /usr/local/jdk1.7.0_67/bin/java 300
		sudo update-alternatives --install /usr/bin/javac javac /usr/local/jdk1.7.0_67/bin/javac 300

然后进入选择就ok：

		sudo update-alternatives --config java
		sudo update-alternatives --config javac
