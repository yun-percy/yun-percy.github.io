---

title: for循环的应用（shell）
category: Shell
---

for循环遍历语句
--------------

#### 语法

	for i in * ; do
	#处理你找出来的文件
	done

例子： 签名所有apk文件

	for i in *.apk ; do
	echo 正在签名 $i
	java -jar signapk.jar testkey.x509.pem testkey.pk8 $i yusun_$i
	echo 完成 $i签名
	done

for循环从变量读取列表

	list="yun sun mo yin"
	for state in $list
	do
		echo "I love $state"
	done
