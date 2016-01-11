---
layout: post
title: Python学习笔记
category: 语法
tags : [ Python, 语法 ,脚本 ]
---

print
----
```python
print word.center(50)     #在长度为50的字符中居中
print word.center(20,"*") #居中输出，总共20个字符，word左右两侧各输出5个"*"号
print word.ljust(0)       #左对齐输出
print word.rjust(20)      #右对齐输出，总共20个字符，剩下的以空格填充
print "%3d :  %0.2f" % (i,m)  #将i 打印三个字符，m小数点尾数保存2位
```
pwd

    os.getcwd()   #获取目录，需要导入 os


---

###python判断文件和文件夹是否存在

```
import os
os.path.isfile('test.txt') #如果不存在就返回False
os.path.exists(directory) #如果目录不存在就返回False
os.environ['HOME'] #获取home目录
os.rename（oldname,newname)
os.remove()#删除文件
os.rmdir()#删除空目录
os.removedirs()#递归删除空目录
#删除非空目录
import shutil
shutil.rmtree()
```
###sys.exit(0)

退出值设定

###获取当前路径

```
import sys
LOCAL_PATH=sys.path[0]
LOCAL_PATH=os.getcwd()
```

python类型转换
-------


函数|描述
---|---
int(x [,base ])  |       将x转换为一个整数
long(x [,base ])  |      将x转换为一个长整数
float(x )   |            将x转换到一个浮点数
complex(real [,imag ]) | 创建一个复数
str(x )      |           将对象 x 转换为字符串
repr(x )      |          将对象 x 转换为表达式字符串
eval(str )      |        用来计算在字符串中的有效Python表达式,并返回一个对象
tuple(s )    |           将序列 s 转换为一个元组
list(s )      |          将序列 s 转换为一个列表
chr(x )      |           将一个整数转换为一个字符
unichr(x )    |          将一个整数转换为Unicode字符
ord(x )      |           将一个字符转换为它的整数值
hex(x )      |           将一个整数转换为一个十六进制字符串
oct(x )      |           将一个整数转换为一个八进制字符串

操作        |              描述
---|---
s + r               |    序列连接
s * n , n * s    |       s的 n 次拷贝,n为整数
s % d             |      字符串格式化(仅字符串)
s[i]             |       索引
s[i :j ]          |      切片
x in s , x not in s  |   从属关系
for x in s :   |         迭代
len(s)   |               长度
min(s)   |               最小元素
max(s)   |               最大元素
s[i ] = x   |            为s[i]重新赋值
s[i :j ] = r |           将列表片段重新赋值
del s[i ]   |            删除列表中一个元素
del s[i :j ] |           删除列表中一个片段

数值操作：
----
操作        |              描述
---|---
x << y     |             左移
x >> y     |             右移
x & y     |              按位与
x | y     |              按位或
x ^ y     |              按位异或 (exclusive or)
~x        |              按位翻转
x + y     |              加
x - y      |             减
x * y     |              乘
x / y     |              常规除
x // y    |              地板除
x ** y     |             乘方 (xy )
x % y      |             取模 (x mod y )
-x        |              改变操作数的符号位
+x       |               什么也不做
~x       |               ~x=-(x+1)
abs(x )    |             绝对值
divmod(x ,y )  |         返回 (int(x / y ), x % y )
pow(x ,y [,modulo ]) |   返回 (x ** y ) x % modulo
round(x ,[n])     |      四舍五入，n为小数点位数
x < y       |            小于
x > y       |            大于
x == y     |             等于
x != y     |             不等于(与<>相同)
x >= y     |             大于等于
x <= y     |             小于等于

配置文件
------

        import ConfigParser
        import string, os, sys

初始化：

        cf = ConfigParser.ConfigParser()
        cf.read("test.conf")

封装:

        print 'section:', cf.sections() # 返回所有的section
        print 'options:',cf.options("db") #返回db的所有选项
        print 'db:', cf.items("db")#返回db的所有选项和名称

可以按照类型读取出来

        db_host = cf.get("db", "db_host")
        db_port = cf.getint("db", "db_port")

修改一个值，再写回去

        cf.set("db", "db_pass", "zhaowei")
        cf.write(open("test.conf", "w"))