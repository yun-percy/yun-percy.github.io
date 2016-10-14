---

title: Makefile复习笔记
category: 语法
---

1. 变量

符号|作用
---|---
:=|立即展开
=|延迟展开
?=|判断赋值
+=|增加变量
@echo|不输出echo字样
$(obj:.o=.c)|将变量$(obj)中所有变量的最后字母“.o”替换为“.c”
$(subst 1,2,version1)|将version1中的1替换为2
