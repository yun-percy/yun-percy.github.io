---
layout: post
title: shell 数组操作
category: shell
tags : [linux,shell ,笔记 ]
---

将一个字符串赋值给数组

```shell-session
str1='test1 test2 test3 test4'
array=($str1)    #数组赋值
length=${#array[@]}  #数组长度
echo ${array[@]} #输出数组全部元素
array[1]=5      #向数组的某个元素赋值和标c的语法一样
echo ${array[@]:1:2}        #输出的是array[0]和array[1]的值
echo ${array[@]:2}      #输出数组第三个元素以后的值
echo ${array[@]::2}     #输出数组下标小于2的值
$ echo ${#array[3]}     #取得元素3的长度
unset array     #清除array
array=      #清空array，赋给array空值
```

###遍历数组

```
for ((i=0;i<${#array[@]};i++))
do
   echo ${array[$i]}
done
```

###利用数组切割字符串

数组默认的分隔符是空格，如果想改变默认的分隔符，用下面的方法

```
str="abd#ddd#ff"
str2=($(echo $str|tr '#' ' '))
```