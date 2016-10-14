---
layout: post
title: Cmake的安装
category: 语法
tags : [python,mysql ,note ]
---

cmake版本 2.8.10.2

### [下载地址](https://cmake.org/download/)

### 解压

### 安装

```sh
./configure
make
sudo make install
```

### 检查是否安装成功：

输入shell命令: `cmake --version`

给出一下信息表示安装成功

cmake 会默认安装在 `/usr/local/bin` 下面

要改变安装路径，在bootstrap命令中加入`--prefix=PATH`选项。
