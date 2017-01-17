---

title: shell 补漏笔记
category: Shell
---


### read

-n 控制输入字符数量然后自动继续执行。

        read -n 1 option

-t 超以秒为单位

        read -t 5 -p "请输入选项，５秒后默认放弃"　options


History
======

  Ctrl ＋ R搜索历史命令<br>
  !ad    将会自动执行 以ad开头的文件<br>
  HISTCONTROL=erasedups  删除重复命令<br>
  HISTCONTROL=ignoredups 不记录重复命令<br>

字段分隔符
-----
 默认分隔符为：　空格，制表符，换行符

### IFS的用法

        IFS=$'\n'  　　表示分隔符仅为换行符
        IFS=$'\n;:"'     表示分隔符为换行符，分号，冒号，双引号

参数传递
----

        $#   计算参数的个数

#### $*和$@的区别

> $* 会把　we have a question　当做　“we have a question”处理
>
> $@ 会把　we have a question　当做　“we" "have" "a" "question”处理

wget
=======

		wget -S --spider  + URL 检测文件是否存在

wc
------

获取文件大小

		cat filename | wc -c


删除重复行
-------

    sort < urfile | uniq > result.txt


if条件语句判断
----

code|释义
----|---
-n str1　|　　　　　　 当串的长度大于0时为真(串非空)
-z str1　　　|　　　　 当串的长度为0时为真(空串)
str1　　|　　　　　　   当串str1为非空时为真
int1 -eq int2　|　　　两数相等为真
int1 -ne int2　|　　　两数不等为真
int1 -gt int2　|　　　int1大于int2为真
int1 -ge int2　|　　　int1大于等于int2为真
int1 -lt int2　|　　　int1小于int2为真
int1 -le int2　　|　　int1小于等于int2为真
-r file　　|　　　用户可读为真
-w file　　|　　　用户可写为真
-x file　　|　　　用户可执行为真
-c file　　|　　　文件为字符特殊文件为真
-b file　　|　　　文件为块特殊文件为真
-s file　　|　　　文件大小非0时为真
-t file　　|　　　当文件描述符(默认为1)指定的设备为终端时为真
-a 　 　　|　　　 与
-o　　　　|　　　 或
!　　　　　|　　　非

date计算
----

```sh
~ ♪ date -d "20151012 1days" "+%Y%m%d"
20151013
~ ♪ date -d "20151012 1days ago" "+%Y%m%d"
20151011
```

大小写转换
-----

```sh
git_path_target="AAaa_aaAA"
declare -l git_path_target
echo $git_path_target
---> aaaa_aaaa
git_path_target="AAaa_aaAA"
declare -u git_path_target
echo $git_path_target
---> AAAA_AAAA
```

or user tr command