---
layout: post
title: Python 函数中可变长度的参数args
category: 语法
tags : [python,args ,函数,def]
---

[原文地址](http://www.pythoner.com/4.html)

> 在编程的过程中，我们可能会遇到函数参数个数不固定的情况。这时就需要使用可变长度的函数参数来实现我们的功能。
在Python中，有两种变长参数，分别是元组（非关键字参数）和字典（关键字参数）。其调用方式是：

```py
func( *tuple_args, **dict_args )
```

非关键字可变长参数（元组）
---------

> 当函数调用中包括一个元组变长参数`*tuple_args`时，除去前面固定位置参数和关键字参数的其余参数将按顺序插入一个元组进行访问，这和C语言中的varargs的功能相同。

假设有这样一个函数（其中，`positional_arg`是位置固定的标准调用参数，`keyword_arg`是关键字参数）：

元组变长参数示例:

```py
def foo( positional_arg, keyword_arg='default', *tuple_arg ):
    print "positional arg: ", positional_arg
    print "keyword_arg: ", keyword_arg
    for each_additional_arg in tuple_arg:
        print "additional_arg: ", each_additional_arg
```

我们使用一些示例来了解它是怎么工作的：

```py
>>> foo(1)
positional arg:  1
keyword_arg:  default

>>> foo(1, 2)
positional arg:  1
keyword_arg:  2

>>> foo(1, 2, 3)
positional arg:  1
keyword_arg:  2
additional_arg:  3
```

2.字典变长参数
-----

既然Python中允许关键字参数，那么也应该有一种方式实现关键字的变长参数，这就是字典变长参数。

> 字典变长参数中，额外的关键字参数被放入了一个字典进行使用。字典中，键为参数名，值为相应的参数值。其表示方式是放在函数参数最后的**开头的参数，如`**dict_grp_kw_args`。（需要注意的是，**被重载以不与幂运算混淆。）

以下是一个字典变长参数的示例函数：

字典变长参数的示例函数:

```py
def foo( positional_arg, keyword_arg='default', **dict_arg ):
    print "positional arg: ", positional_arg
    print "keyword_arg: ", keyword_arg
    for each_dict_arg in dict_arg.keys():
        print "dict_arg: %s=>%s" % ( each_dict_arg, str( dict_arg[each_dict_arg] ) )
```

下面是一段演示结果：

```
>>> foo(1, 2, a="b")
positional arg:  1
keyword_arg:  2
dict_arg: a=>b
```