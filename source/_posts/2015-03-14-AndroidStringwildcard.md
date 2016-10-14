---

title: Android 中 字符替代的用法
category: Android
---

一. 使用xliff的用法：
--------

####<xliff:g>标签介绍：

> 属性id可以随便命名
> 属性值举例说明

	%n$ms：代表输出的是字符串，n代表是第几个参数，设置m的值可以在输出之前放置空格
	%n$md：代表输出的是整数，n代表是第几个参数，设置m的值可以在输出之前放置空格，也可以设为0m,在输出之前放置m个0
	%n$mf：代表输出的是浮点数，n代表是第几个参数，设置m的值可以控制小数位数，如m=2.2时，输出格式为00.00

也可简单写成：

	%d   （表示整数）
	%f    （表示浮点数）
	%s   （表示字符串）

####使用步骤举例：

+ 记得要在字符文件中加上这些：

	<?xml version="1.0" encoding="utf-8"?>
	<resources xmlns:xliff="urn:oasis:names:tc:xliff:document:1.2">

+

	<string name="test_xliff">小姐今年<xliff:g id="xxx">%1d</xliff:g>岁了，上<xliff:g id="yyy">%2s</xliff:g>年级！</string>

+ 或者

	<string name="test_xliff">小姐今年<xliff:g id="xxx">%d</xliff:g>岁了，上<xliff:g id="yyy">%s</xliff:g>年级！</string>

+ 加上参数和空格的写法是：

	 <string name="test_xliff">小姐今年<xliff:g id="xxx">%1$3d</xliff:g>岁了，上<xliff:g id="yyy">%2$5s</xliff:g>年级！</string>

+

	String test = String.format(getResources().getString(R.string.test_xliff), 7, "二");

输出：

	小姐今年7岁了，上二年级！
	加上参数和空格的输出：
	小姐今年   7岁了，上     二年级！


 二.不使用xliff的用法：
------

+ 整型，比如“小姐今年23岁了”，这个23是整型的。在string.xml中可以这样写，

	<string name="old">小姐今年%1$d岁了</string>

+ 在程序中，使用

	String sAgeFormat = getResources().getString(R.string.old);
	String sFinalAge = String.format(sAgeFormat, 23);

将%1$d替换为23；

%1$d表达的意思是整个name=”old”中，第一个整型的替代。如果一个name中有两个需要替换的整型内容，则第二个写为：%2$d，以此类推；具体程序中替换见下面的string型；

+ string型，比如“我的名字叫李四，我来自首都北京”；这里的“李四”和“首都北京”都需要替换。

在string.xml中可以这样写:

	<string name="alert">我的名字叫%1$s，我来自%2$s</string>

在程序中：

	String sAgeFormatString sAgeFormat1= getResources().getString(R.string.alert);
	String sFinal1 = String.format(sAgeFormat1, "李四","首都北京");

这里两个string需要替换的，按照上面程序的顺序依次对应。
