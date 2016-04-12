---
layout: post
title: 关于源码到smail id值的自动获取
category: Android
---

###麻烦

在没有源代码的情况下，我们为了实现某些功能，就需要自己写demo然后反编译smail插进去。这个过程本身不复杂，麻烦的是id值的获取。id是编译时随机分配的，而smail又是通过id值来查找资源。如果你有很多控件的话基本就是一场灾难。

###解决办法

为什么我们不让系统自己去查找id呢？我们只要给定变量名就可以了。

我们发现findviewbyid（int id）id值实际上是int值。

so 代码来了：

<pre>
final Resources resources = context.getResources();
int layoutid = resources.getIdentifier
	(context.getPackageName()+":id/"+"msim_status_bar", null, null);
final View view=findViewById(layoutid);
</pre>

于是，反编译插装的时候再也不用担心id啦！
