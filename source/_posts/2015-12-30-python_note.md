---

title: python备忘笔记
category: 语法
---


python的文件操作
----

函数|描述
---|---
os.environ['HOME']|获取home目录
os.rename(oldname,newname)|重命名文件
os.remove()|删除文件
os.unlink()|删除link文件
os.symlink()|创建符号链接
os.utime()|更新时间戳
os.tmpfile()|创建并打('w'+'b')一个新的临时文件
os.walk()|生成一个目录树下所有文件名
os.chdir()|修改当前工作目录
os.chroot()|修改当前进程的根目录
os.listdir()|列出指定目录的文件
os.getcwd()|返回一个unicode对象的当前工作目录
os.mkdir()|创建目录
os.makedirs(path)|递归创建目录
os.rmdir()|删除空目录
os.removedirs()|递归删除空目录
os.access()|校验权限模式
os.chmod()|改变权限模式
os.chown()|改变拥有者
os.umask()|设置默认权限模式

shutil类
----

函数|描述
---|---
shutil.rmtree()|删除目录树
shutil.copyfile(src, dst) |文件到文件的拷贝，其中dst必须是一个文件
shutil.copy(src, dst) |文件拷贝，src必须是一个文件，dst可以是一个文件或者目录
shutil.copy2(src, dst) |同上，但是拷贝的文件带着原有属性，类似于Linux系统里的cp -p命令
shutil.move(src, dst) |移动一个文件或者目录到指定的位置，src和dst都可以是文件或者目录
shutil.copytree(src, dst, symlinks=False, ignore=None) |目录的复制


os.path类
-----

函数|描述
---|---
os.path.isfile('test.txt') |如果不存在就返回False
os.path.exists(directory)|如果目录不存在就返回False
os.path.basename()|去掉路径，返回文件名
os.path.dirname()|去掉文件名，返回目录路径
os.path.join()|将参数组成路径
os.path.split()|将路径转换成元组
os.path.getsize()|返回文件大小
os.path.isabs()|路径是否为绝对路径
os.path.islink()|是否为链接文件
os.path.abspath()|获取对象的绝对路径


sys类函数
----

函数|描述
---|---
sys.exit(0)|退出
sys.path[0]|当前路劲
sys.path|系统环境变量


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

filter函数的使用
-----

```py
testtext = ‘abcd123.;!4567ef[.,]gh’

#只保留数字
filter(str.isdigit, testtext)
‘1234567’

#只保留字母
filter(str.isalpha, testtext)
‘abcdefgh’

#只保留字母和数字
filter(str.isalnum, testtext)
‘abcd1234567efgh’
```


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
