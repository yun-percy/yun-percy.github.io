---

title: python 常用的demo片段
category: 语法
---

[原文地址](http://wangwei007.blog.51cto.com/68019/1131610)

> python编程中常用的12种基础知识总结：

+ 正则表达式替换
+ 遍历目录方法
+ 列表按列排序、去重
+ 字典排序
+ 字典、列表、字符串互转
+ 时间对象操作
+ 命令行参数解析(getopt)
+ print 格式化输出，
+ 进制转换
+ Python调用系统命令或者脚本
+ Python 读写文件。

### 正则表达式替换

> 目标: 将字符串line中的 overview.gif 替换成其他字符串

```py
line = '<IMG ALIGN="middle" SRC="overview.gif" BORDER="0" ALT="">'
mo=re.compile(r'(?<=SRC=)"([\w+\.]+)"',re.I)
mo.sub(r'"\1****"',line)
#输出： <IMG ALIGN="middle" SRC="cdn_overview.gif****" BORDER="0" ALT="">'
mo.sub(r'replace_str_\1',line)
#输出：<IMG ALIGN="middle" replace_str_overview.gif BORDER="0" ALT="">'< /span>
mo.sub(r'"testetstset"',line)
#输出：<IMG ALIGN="middle" SRC="testetstset" BORDER="0" ALT="">'
```

> 注意: 其中 \1 是匹配到的数据，可以通过这样的方式直接引用

### 遍历目录方法

> 在某些时候，我们需要遍历某个目录找出特定的文件列表，可以通过os.walk方法来遍历,非常方便

```py
import os
fileList = []
rootdir = "/data"
for root, subFolders, files in os.walk(rootdir):
if '.svn' in subFolders: subFolders.remove('.svn')  # 排除特定目录
for file in files:
  if file.find(".t2t") != -1:# 查找特定扩展名的文件
      file_dir_path = os.path.join(root,file)
      fileList.append(file_dir_path)

print fileList
```

### 列表按列排序(list sort)
> 如果列表的每个元素都是一个元组(tuple),我们要根据元组的某列来排序的化，可参考如下方法
下面例子我们是根据元组的第2列和第3列数据来排序的,而且是倒序(reverse=True)

```py
a = [('2011-03-17', '2.26', 6429600, '0.0'), ('2011-03-16', '2.26', 12036900, '-3.0'), ('2011-03-15', '2.33', 15615500,'-19.1')]
print a[0][0]
#输出：2011-03-17
b = sorted(a, key=lambda result: result[1],reverse=True)
print b
#输出：[('2011-03-15', '2.33', 15615500, '-19.1'), ('2011-03-17', '2.26', 6429600, '0.0'), ('2011-03-16', '2.26', 12036900, '-3.0')]
c = sorted(a, key=lambda result: result[2],reverse=True)
print c
#输出：[('2011-03-15', '2.33', 15615500, '-19.1'), ('2011-03-16', '2.26', 12036900, '-3.0'), ('2011-03-17', '2.26', 6429600, '0.0')]
```

### 列表去重(list uniq)

> 有时候需要将list中重复的元素删除，就要使用如下方法

```py
lst= [(1,'sss'),(2,'fsdf'),(1,'sss'),(3,'fd')]
set(lst)
#输出：set([(2, 'fsdf'), (3, 'fd'), (1, 'sss')])
lst = [1, 1, 3, 4, 4, 5, 6, 7, 6]
set(lst)
#输出：set([1, 3, 4, 5, 6, 7])
```

### 字典排序(dict sort)

> 一般来说，我们都是根据字典的key来进行排序，但是我们如果想根据字典的value值来排序，就使用如下方法

```py
from operator import itemgetter
aa = {"a":"1","sss":"2","ffdf":'5',"ffff2":'3'}
sort_aa = sorted(aa.items(),key=itemgetter(1))
sort_aa
#输出：[('a', '1'), ('sss', '2'), ('ffff2', '3'), ('ffdf', '5')]
```

> 从上面的运行结果看到，按照字典的value值进行排序的

### 字典,列表,字符串互转

> 以下是生成数据库连接字符串,从字典转换到字符串

```py
params = {"server":"mpilgrim", "database":"master", "uid":"sa", "pwd":"secret"}
["%s=%s" % (k, v) for k, v in params.items()]
#输出：['server=mpilgrim', 'uid=sa', 'database=master', 'pwd=secret']
";".join(["%s=%s" % (k, v) for k, v in params.items()])
#输出：'server=mpilgrim;uid=sa;database=master;pwd=secret'
```

> 下面的例子 是将字符串转化为字典

```py
a = 'server=mpilgrim;uid=sa;database=master;pwd=secret'
aa = {}
for i in a.split(';'):aa[i.split('=',1)[0]] = i.split('=',1)[1]
aa
#输出：{'pwd': 'secret', 'database': 'master', 'uid': 'sa', 'server': 'mpilgrim'}
```

### 时间对象操作

> 将时间对象转换成字符串

```py
import datetime
datetime.datetime.now().strftime("%Y-%m-%d %H:%M")
#输出：'2011-01-20 14:05'
```

> 时间大小比较

```py
import time
t1 = time.strptime('2011-01-20 14:05',"%Y-%m-%d %H:%M")
t2 = time.strptime('2011-01-20 16:05',"%Y-%m-%d %H:%M")
t1 > t2
#输出：False
t1 < t2
#输出：True
```

> 时间差值计算,计算8小时前的时间

```py
datetime.datetime.now().strftime("%Y-%m-%d %H:%M")
#输出：  '2011-01-20 15:02'
(datetime.datetime.now() - datetime.timedelta(hours=8)).strftime("%Y-%m-%d %H:%M")
#输出：'2011-01-20 07:03'
```

> 将字符串转换成时间对象

```py
endtime=datetime.datetime.strptime('20100701',"%Y%m%d")
type(endtime)
#输出：<type 'datetime.datetime'>
print endtime
#输出：2010-07-01 00:00:00
```

> 将从 1970-01-01 00:00:00 UTC 到现在的秒数，格式化输出

```py
import time
a = 1302153828
time.strftime("%Y-%m-%d %H:%M:%S",time.localtime(a))
#输出：'2011-04-07 13:23:48'
```

### 命令行参数解析(getopt)

> 通常在编写一些日运维脚本时，需要根据不同的条件，输入不同的命令行选项来实现不同的功能
在Python中提供了getopt模块很好的实现了命令行参数的解析,下面距离说明。请看如下程序:

```py
#!/usr/bin/env python
# -*- coding: utf-8 -*-
import sys,os,getopt
def usage():
print '''''
Usage: analyse_stock.py [options...]
Options:
-e : Exchange Name
-c : User-Defined Category Name
-f : Read stock info from file and save to db
-d : delete from db by stock code
-n : stock name
-s : stock code
-h : this help info
test.py -s haha -n "HA Ha"
'''

try:
opts, args = getopt.getopt(sys.argv[1:],'he:c:f:d:n:s:')
except getopt.GetoptError:
usage()
sys.exit()
if len(opts) == 0:
usage()
sys.exit()

for opt, arg in opts:
if opt in ('-h', '--help'):
  usage()
  sys.exit()
elif opt == '-d':
  print "del stock %s" % arg
elif opt == '-f':
  print "read file %s" % arg
elif opt == '-c':
  print "user-defined %s " % arg
elif opt == '-e':
  print "Exchange Name %s" % arg
elif opt == '-s':
  print "Stock code %s" % arg
elif opt == '-n':
  print "Stock name %s" % arg

sys.exit()
```

### print 格式化输出

__格式化输出字符串__

> 截取字符串输出,下面例子将只输出字符串的前3个字母

```py
str="abcdefg"
print "%.3s" % str
#输出：  abc
```

> 按固定宽度输出，不足使用空格补全,下面例子输出宽度为10

```py
str="abcdefg"
print "%10s" % str
#输出：     abcdefg
```

> 截取字符串，按照固定宽度输出

```py
str="abcdefg"
print "%10.3s" % str
#输出：         abc
```

> 浮点类型数据位数保留

```py
import fpformat
a= 0.0030000000005
b=fpformat.fix(a,6)
print b
#输出：  0.003000
```

> 对浮点数四舍五入,主要使用到round函数

```py
from decimal import *
a ="2.26"
b ="2.29"
c = Decimal(a) - Decimal(b)
print c
#输出：  -0.03
c / Decimal(a) * 100
#输出：  Decimal('-1.327433628318584070796460177')
Decimal(str(round(c / Decimal(a) * 100, 2)))
#输出：  Decimal('-1.33')
```

### 进制转换

> 有些时候需要作不同进制转换，可以参考下面的例子(%x 十六进制,%d 十进制,%o 八进制)

```py
num = 10
print "Hex = %x,Dec = %d,Oct = %o" %(num,num,num)
#输出：  Hex = a,Dec = 10,Oct = 12
```

### Python调用系统命令或者脚本

> 使用 os.system() 调用系统命令 , 程序中无法获得到输出和返回值

```py
import os
os.system('ls -l /proc/cpuinfo')
#输出：  -r--r--r-- 1 root root 0  3月 29 16:53 /proc/cpuinfo  0
```


> 使用 os.popen() 调用系统命令, 程序中可以获得命令输出，但是不能得到执行的返回值

```py
out = os.popen("ls -l /proc/cpuinfo")
print out.read()
#输出：  -r--r--r-- 1 root root 0  3月 29 16:59 /proc/cpuinfo
```


> 使用 commands.getstatusoutput() 调用系统命令, 程序中可以获得命令输出和执行的返回值

```py
import commands
commands.getstatusoutput('ls /bin/ls')
#输出：  (0, '/bin/ls')
```

### Python 捕获用户 Ctrl+C ,Ctrl+D 事件

> 有些时候，需要在程序中捕获用户键盘事件，比如ctrl+c退出，这样可以更好的安全退出程序

```py
try:
    do_some_func()
except KeyboardInterrupt:
    print "User Press Ctrl+C,Exit"
except EOFError:
    print "User Press Ctrl+D,Exit"
```

### Python 读写文件

> 一次性读入文件到列表，速度较快，适用文件比较小的情况下

```py
track_file = "track_stock.conf"
fd = open(track_file)
content_list = fd.readlines()
fd.close()
for line in content_list:
    print line
```


> 逐行读入，速度较慢,适用没有足够内存读取整个文件(文件太大)

```py
fd = open(file_path)
fd.seek(0)
title = fd.readline()
keyword = fd.readline()
uuid = fd.readline()
fd.close()
```


> 写文件 write 与 writelines 的区别

`Fd.write(str)` : 把str写到文件中，write()并不会在str后加上一个换行符
`Fd.writelines(content)` : 把content的内容全部写到文件中,原样写入，不会在每行后面加上任何东西
