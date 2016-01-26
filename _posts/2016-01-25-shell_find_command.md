---
layout: post
title: linux,shell,find拾遗
category: shell
tags : [linux,shell ,find ]
---

> 指定递归层数为1

```sh
find . -maxdepth 1 -type f
```

> 只列出常规文件

```sh
find ./ -type f
```
> 只列出文件夹

```sh
find ./ -type d
```


> 找出空文件，然后删掉

```sh
find /urpath -type f -size 0 -exec rm -f {} \;
```
