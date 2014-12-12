---
layout: post
title: ListView特效实现
category: 语法
---

###添加一个入场动画：

+  在listView中添加一个属性点:

		android:layoutAnimation="@anim/navagation_gridview_anim"

+ 添加xml动画  :navagation_gridview_anim.xml

		<layoutAnimation xmlns:android="http://schemas.android.com/apk/res/android"
		android:animation="@anim/list_anim"
		android:animationOrder="normal"
		android:delay="0.5" />

+ 添加实现动画： list_anim.xml

		<?xml version="1.0" encoding= "utf-8"?>
		<set xmlns:android="http://schemas.android.com/apk/res/android" >
		       <translate android:fromXDelta="-100%"
		                android:fromYDelta="0"
		                android:toXDelta="0"
		                android:toYDelta="0"
		                android:duration="250"
		                android:interpolator="@android:anim/anticipate_overshoot_interpolator" />
		</set>


### 添加滑动动画：

更多牛逼哄哄的讨论可以看这个网页：[http://www.4byte.cn/question/98090/listview-item-scroll-animation.html#](http://www.4byte.cn/question/98090/listview-item-scroll-animation.html#)

其实第二第三个回答是很牛逼的一个类，但是为毛有第5个神级回答：

		Animation animationY = new TranslateAnimation(0, 0, holder.llParent.getHeight()/4, 0);
		animationY.setDuration(1000);
		Yourconvertview.startAnimation(animationY);
		animationY = null;
