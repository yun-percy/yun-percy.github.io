---
layout: post
title: linux,wc命令详解
category: Shell
tags : [linux,shell ,wc ]
---


> Linux系统中的wc(Word Count)命令的功能为统计指定文件中的字节数、字数、行数，并将统计结果显示输出。


+ 命令功能：

统计指定文件中的字节数、字数、行数，并将统计结果显示输出。该命令统计指定文件中的字节数、字数、行数。如果没有给出文件名，则从标准输入读取。wc同时也给出所指定文件的总统计数。

+ 命令参数：

参数|含义
---|---
-c| 统计字节数。
-l| 统计行数。
-m| 统计字符数。这个标志不能与 -c 标志一起使用。
-w| 统计字数。一个字被定义为由空白、跳格或换行字符分隔的字符串。
-L| 打印最长行的长度。
-help| 显示帮助信息
--version| 显示版本信息

+ 使用实例：

实例1：查看文件的字节数、字数、行数

```sh
[root@localhost test]# wc test.txt
 7  8 70 test.txt
[root@localhost test]# wc -l test.txt
7 test.txt
[root@localhost test]# wc -c test.txt
70 test.txt
[root@localhost test]# wc -w test.txt
8 test.txt
[root@localhost test]# wc -m test.txt
70 test.txt
[root@localhost test]# wc -L test.txt
17 test.txt
```sh

说明：

7     8     70     test.txt

行数 单词数 字节数 文件名


实例2：用wc命令怎么做到只打印统计数字不打印文件名

```sh
[root@localhost test]# cat test.txt |wc -l
7
```


实例3：用来统计当前目录下的文件数

```sh
[root@localhost test6]# ls -l | wc -l
8
```

说明：
数量中包含当前目录

计算字符串长度
-----

1. 字节长度

```sh
expr length "统计"
```

2. 字符数

```sh
echo "统计" | wc -m
```