---
title: Python MySQLdb的安装笔记
category: tools
tags:
  - python
  - mysql
---

[原帖地址](http://blog.csdn.net/wklken/article/details/7271019)

[python MySQLdb在windows环境下的快速安装、问题解决方式]
(http://blog.csdn.NET/wklken/article/details/7253245)


命令安装
---

> 机器环境需要mysql环境

```sh
sudo yum install MySQL-python
```

可能遇到问题：

```py
>>> import MySQLdb
Traceback (most recent call last):
  File "<stdin>", line 1, in ?
  File "MySQLdb/__init__.py", line 22, in ?
    raise ImportError("this is MySQLdb version %s, but _mysql is version %r" %
ImportError: this is MySQLdb version (1, 2, 3, 'final', 0), but _mysql is version (1, 2, 1, 'final', 1)
```

原因：之前使用编译的方法进行安装，下的是1.2.3，但是用yum目前最高1.2.1，冲突

解决方法：删除已经编译的文件

```
rm -rf MySQL-python-1.2.3/
```

再进行

```py
>>> import MySQLdb
```

无错误，则表示成功了


源码编译
----


需要：

+ gcc
+ setuptools   

```sh
wget -O setuptools-0.6c8.tar.gz  http://pypi.python.org/packages/source/s/setuptools/setuptools-0.6c8.tar.gz
```
解压执行 

```sh 
sudo easy_install.py 
#或者 
python setup.py build && sudo python setup.py install]
```

+ python-dev    

在 

```sh
sudo apt-get install python-dev
```   

否则会报异常：

```
fatal error: Python.h: 没有那个文件或目录
```

### 步骤：

```sh
wget http://sourceforge.net/projects/mysql-python/files/latest/download
$ tar xfz MySQL-python-1.2.3.tar.gz
$ cd MySQL-python-1.2.3
$whereis  mysql_config 
mysql_config: /usr/bin/mysql_config
$ vim site.cfg
```

修改`mysql_config`为mysql配置文件的路径 `/usr/bin/mysql_config `

还要修改

```sh
 threadsafe = False
$ python setup.py build
$ sudo python setup.py install
```