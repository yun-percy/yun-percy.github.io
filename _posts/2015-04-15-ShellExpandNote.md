---
layout: post
title: shell 补漏笔记
category: shell
---


###read

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

###IFS的用法

        IFS=$'\n'  　　表示分隔符仅为换行符
        IFS=$'\n;:"'     表示分隔符为换行符，分号，冒号，双引号

参数传递
----

        $#   计算参数的个数

#####$*和$@的区别

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

find
-----

找出空文件，然后删掉

		find /urpath -type f -size 0 -exec rm -f {} \;