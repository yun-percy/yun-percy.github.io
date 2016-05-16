---
layout: post
title: 设置默认的shell
category: Linux
tags : [shell,bash,zsh,linux ]
---

> 通常情况下，默认的shell为 bash，比如 ubuntu或者 mint，但是有些system会采用一些更加高级的shell，比如deepin采用的是自己修改过的zsh，但是对于我这种常年在bash下工作，而且配置了一大堆bash变量的人来说就有些不习惯，下面教你如何将shell改为你顺手的shell

直接引导shell
-----

这种方法比较投机，只需要在 .bashrc 的开头加上一句 zsh <br>即可将zsh设为默认的shell，但是这种方式有个bug，每次关闭都会提醒你有进程正在运行，或者你需要exit两次才能退出。<br>
这种方式是不推荐的

修改usermod
------

首先你要知道你的shell在哪里，比如我想设置bash为默认shell

	～$ which bash   #获取shell路径
	/usr/bin/bash
	~$ chsh
	passwd:
然后将你的shell路劲输入即可

修改默认的服务器 shell：
---------

> 现在很多服务器都是默认使用的dash,dash相比bash，语法要轻很多，很多在bash中没问题的语句，到dash就会出现问题。

执行下面的语句，选否就可以了

```sh
sudo dpkg-reconfigure dash
```
