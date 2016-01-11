---
layout: post
title: 将系统应用导入eclipse进行开发
category: android
---

文章为转载，[原文地址](http://www.hovercool.com/en/%E5%B0%86packages/apps/%E4%B8%8B%E7%9A%84app%E5%AF%BC%E5%85%A5eclipse#a_1.E3.80.81.E5.B0.86Settings.E6.95.B4.E4.B8.AA.E6.96.87.E4.BB.B6.E5.A4.B9.E6.8B.B7.E8.B4.9D.E4.B8.80.E4.BB.BD.E5.A4.87.E7.94.A8)

当刚接触android自带的一个模块时，如何去熟悉它？相信不少人第一步都会尝试着去了解其内容的调用流程，而此时若能够单步调试则显得非常重要了，于是有了文章标题所说的尝试。<br>
作者这里要导入的是Settings文件夹，基于android 4.0：

+ 将Settings整个文件夹拷贝一份备用

+ 基于Settings建立一个eclipse工程

> 打开eclipse，File > New > Project > Android Project > Create project from existing source，选择第1步所拷贝的Settings文件夹。

+ 导入部分framework library

> 执行完第2步会出现很多诸如:

	com.android.internal.R cannot be resolved

的错误，这主要是由于framework部分资源找不到，这时我们可以手动添加，当然前提是你要用整个工程的代码且已经编译。

> 在eclipse中右键工程名Settings，选择:

	Build Path > Configure Build Path > Libraries > Add External JARS

然后选择以下路径的jars：

	out/target/common/obj/JAVA_LIBRARIES/framework_intermediates/classes.jar<br>

--这个主要是android的框架类

	out/target/common/obj/JAVA_LIBRARIES/android-common_intermediates/classes.jar<br>

--这个包含com.android.common.Search这个类

	out/target/common/obj/JAVA_LIBRARIES/core_intermediates/classes.jar<br>

--这个包包含dalvik.system.VMRuntime这个类

	 out/target/common/obj/JAVA_LIBRARIES/mediatek-framework_intermediates/classes.jar

--这个主要是mediatek的框架类

这样基本上就能解决大部分framework资源找不到的问题<br>
ps 这里也可将上述classes.jar重命名后复制到某一文件夹后统一导入

+. 导入app自身

如这里导入：

	out/target/common/obj/APPS/Settings_intermediates/classes.jar

+. 去除uid

打开 AndroidManifest.xml，找到 android:sharedUserId并去除之：

	android:sharedUserId="android.uid.system"

否则在运行时会提示如下错误：

	INSTALL_FAILED_SHARED_USER_INCOMPATIBLE
