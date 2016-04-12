---
layout: post
title: 一些Android的零碎语法
category: Android
---



XML篇
-----------

####AndroidManifest篇

+ 在 Androidmannifest.xml相应 的activity中添加条属性:

		android:windowSoftInputMode="adjustPan"

+ 禁止横屏代码:

		android:screenOrientation="portrait"

+ 允许外部启动service：

		android:exported="true"

####控件篇

+ Edittext只允许输入数字

		android:numeric="integer"

####主题篇

+ 去掉actionbar上面的阴影

		<style name="MyAppTheme" parent="android:Theme.Holo.Light">
			<item name="android:windowContentOverlay">@null</item>
		</style>

JAVA篇
---------------

####根据屏幕分辨率来设置字体等其它资源

		getWindowManager().getDefaultDisplay().getMetrics(dm);
		if(dm.widthPixels == 480){
			lyricView.setLrcTextSize(22);
		}
		if(dm.widthPixels == 720){
			lyricView.setLrcTextSize(30);
		}
		if(dm.widthPixels == 1080){
			lyricView.setLrcTextSize(40);
		}
