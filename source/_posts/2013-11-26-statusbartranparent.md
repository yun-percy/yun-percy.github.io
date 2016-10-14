---
title: Android 4.0-4.3 状态栏全透明教程（源码）
category: Android
---


关于Android 4.4和Android L
--------

#### 因为4.4和android L 已经是透明的了，需要全透明可以直接去systemui中将图片蒙版用PS做成全透明就ok。

android4.0到4.3
-----------

#### 4.0-4.3的方法是有BUG的，再三方应用写了windowsbackground的情况下会导致看不清。比如豌豆荚和QQ会将windowsbackground设置为纯白，如果状态栏是的图标和时间是白色，那就会导致看不清。解决办法是在systemui里写一个广播，在桌面的是设置全透明，在其它界面时设置黑色（MIUI V5和乐蛙的做法，MIUI V6之后使用了沉浸式状态栏，弄清原理后再写教程）
### 本文至介绍如何实现简单的透明

>
首先找到android/frameworks/base/policy/src/com/android/internal/policy/impl中的PhoneWindowManager.java类
然后找到 public int getSystemDecorRectLw(Rect systemRect) 的方法
> 原来的方法内容是：

		public int getSystemDecorRectLw(Rect systemRect) {
		        systemRect.left = mSystemLeft;
		        systemRect.top = mSystemTop;
		        systemRect.right = mSystemRight;
		        systemRect.bottom = mSystemBottom;
		        if (mStatusBar != null) return mStatusBar.getSurfaceLayer();
		        if (mNavigationBar != null) return mNavigationBar.getSurfaceLayer();
		        return 0;
		    }

>
在这里修改该方法为

		public int getSystemDecorRectLw(Rect systemRect) {
		        systemRect.left = mSystemLeft;
		        systemRect.top = mSystemTop;
		        systemRect.right = mSystemRight;
		        systemRect.bottom = mSystemBottom;
		        if (mStatusBar != null) return 0;
		        if (mNavigationBar != null) return 0;
		        return 0;
		    }

>
这里修改完毕以后，进入: android/frameworks/base/packages/SystemUI/res/layout目录下
找到navigation_bar.xml和status_bar.xml文件
然后把这个两个布局文件的background属性都修改为#00000000，
