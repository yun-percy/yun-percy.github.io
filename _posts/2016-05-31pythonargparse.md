---
layout: post
title: python argparse笔记
category: 语法
tags : [argparse,python ,选项 ]
---

初始化
----

```py
#demo.py
import argparse
op=argparse.ArgumentParser(descripttion="script description");
op.add_argument("-a",help="a option")
option=op.parse_args()
```

上面我们初始化了一个 选项化脚本，随后使用`demo.py -a test`即可测试


add_argument内建参数
-----

+ action

action动作|含义
---|---
action='store_const'| 默认返回值为None
action='store_true'|空值返回为False
action='store_false'|空值返回True

+ 指定输入选项类型

```py
type=int
type=str
```
