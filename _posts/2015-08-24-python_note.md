---
layout: post
title: Python学习笔记
category: 语法
tags : [ Python, 语法 ,脚本 ]
---

print
----

      print word.center(50)     #在长度为50的字符中居中
      print word.center(20,"*") #居中输出，总共20个字符，word左右两侧各输出5个"*"号
      print word.ljust(0)       #左对齐输出
      print word.rjust(20)      #右对齐输出，总共20个字符，剩下的以空格填充

pwd

    os.getcwd()   #获取目录，需要导入 os
