---
layout: post
title: shell 常用语法段
category: 语法
---


for循环语句
-------

例子：

		for m in *.m4a;do
			echo "" >>README.md
			echo "$m" >> README.md
		done

说明：　在当前文件夹中找出以m4a结尾的文件，将文件名输出到README.md中去

if语句
------

例子

		if [ ! -d "$project/build" ]; then
			echo "skip rm build...."

		fi

说明：　在如果不存在build这个文件夹，那么就输出skip rm build....语句

例子

		if test `expr $num % 2` == 0;then
			echo even;
		else echo odd;
		fi
说明：奇数偶数判断语句

while 语句
-------

例子

 		while [ $? = 1 ]; do
			sleep 3
	 	done

说明：　如果上一步执行出粗，那么休眠３秒
