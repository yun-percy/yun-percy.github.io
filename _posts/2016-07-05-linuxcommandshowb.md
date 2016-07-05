---
layout: post
title: linux装逼命令行，瞬间黑客范
category: Linux
tags : [linux,bash ,装逼指南 ]
---

最简单的往往是最好的，先看看我的装逼截图

![终端图](/img/article1.png)

1. busy命令：
-----

`cat /dev/urandom | hexdump -C | grep 'ca fe'`

可以在 .bashrc里面配置：

```sh
alias busy=cat /dev/urandom | hexdump -C | grep 'ca fe'
```

2.dstat命令
----

安装：

```sh
sudo apt-get install dstat
```

可以在 .bashrc里面配置：

```sh
alias dstat='dstat -cdlmnpsy'
```

3.slurm命令
----

安装：

```sh
sudo apt-get install slurm
```

可以在 .bashrc里面配置：

```sh
alias slurm='slurm -i eth0'
```

4.htop & iotop命令
-----

htop 和 iotop  用来查看进程，内存和IO负载

安装：

```sh
sudo apt-get install htop iotop
```

使用： 直接打`htop`和`iotop`就可以了

5.黑客帝国字幕
-----


安装：

```sh
sudo apt-get install cmatrix
```

使用： 直接打`cmatrix`就可以了