---
layout: post
title: 一些常用的shell 语句片段
category: 语法
---

for循环遍历语句
--------------

####语法

	for i in * ; do
	#处理你找出来的文件
	done

例子： 签名所有apk文件

	for i in *.apk ; do
	echo 正在签名 $i
	java -jar signapk.jar testkey.x509.pem testkey.pk8 $i yusun_$i
	echo 完成 $i签名
	done

sed的替换
--------------------

####语法

	sed -i 's/\'"$a"'/\'"$b"'/' c

例子： 一键移植init.rc中的jar包。读取lewajar.jar文件中的内容 替换init.rc中匹配offcail.jar的段落

	offcialjar=`cat offcaijar`
	echo $offcialjar
	lewajar=`cat lewajar `
	sed -i 's/\'"$offcialjar"'/\'"$lewajar"'/' init.rc

失败重复执行
-------------

####语法

	while [ $? = 1 ]; do
	#失败的命令
	done

例子： 自动同步脚本

	repo sync
	while [ $? = 1 ]; do
		repo sync
	done
	
