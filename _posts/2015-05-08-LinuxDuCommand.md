---
layout: post
title: Linux 的du 命令详解
category: Linux
tags : [ du, linux， shell]
---

> Linux下的磁盘管理有3d： df  dd  du ，df和dd是在查看磁盘空间，导入镜像事使用，在平时 底层适配的时候用得比较多。

> du命令也是查看使用空间的，但是与df命令不同的是:df 查看的是 Linux系统的分区的使用空间，而du查看的是文件和目录磁盘使用空间

英语较好的盆友可以直接使用

		man du

查看 du的使用方法，国语党请看下面常用命令参数的解释：

__du的命令参数__

		-k或--kilobytes  以KB(1024bytes)为单位输出。
		-m或--megabytes  以MB为单位输出。
		-c或--total  除了显示个别目录或文件的大小外，同时也显示所有目录或文件的总和。
		-s或--summarize  仅显示总计，只列出最后加总的值。
		-S或--separate-dirs   显示个别目录的大小时，并不含其子目录的大小。
		-h或--human-readable  智能以K，M，G为单位，提高信息的可读性。
		-H或--si  与-h参数相同，但是K，M，G是以1000为换算单位。
		-x或--one-file-xystem  以一开始处理时的文件系统为准，若遇上其它不同的文件系统目录则略过。
		-X<文件>或--exclude-from=<文件>  在<文件>指定目录或文件。
		-l或--count-links   重复计算硬件链接的文件。
		-L<符号链接>或--dereference<符号链接> 显示选项中所指定符号链接的源文件大小。
		--exclude=<目录或文件>         略过指定的目录或文件。
		-D或--dereference-args   显示指定符号链接的源文件大小。


__使用技巧__

+ 只看文件夹大小，例如我只想看system文件夹的大小：

		du -ch system | tail -n 1   #或者使用
		du -sh system   #或者
		du -max-depth=0 -h abc

