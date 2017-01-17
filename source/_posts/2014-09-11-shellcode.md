---
title: 一些常用的shell 语句片段
category: 语法
---


失败重复执行
-------------

#### 语法

	while [ $? = 1 ]; do
	#失败的命令
	done

例子： 自动同步脚本

	repo sync
	while [ $? = 1 ]; do
		repo sync
	done

shell传值问题
---------

> $1 ~ $9表示依次传进去的9个值，如果传了10个以上的值，在引用的时候请务必加上{}号。例如${10}
> $0 表示程序名 ，为了不读出路径可以加上 basename的命令例如：

		filename=`basename $0`

> 传入参数计数，使用$#来统计传入多少参数，例如，传入2个参数使用加法，三个参数使用乘法，其他报错

		if [  $# -eq 2 ]
		then
			answer=$[ $1+$2 ]
			echo $answer
		elif [[ $# -eq 3 ]]; then
			answer=$[ $1*$2*$3 ]
			echo $answer
		else echo please input 2 or 3 para
		fi
