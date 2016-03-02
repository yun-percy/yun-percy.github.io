---
layout: post
title: python zipfile笔记
category: 语法
tags : [linux,python ,zipfile ]
---

> Android ota_from_target_file.py处理target_files.zip的时候，用的是标准的python zipfile类。进行生产FULL OTA包和增量OTA包。
所以找时间翻了一下zipfile的语法，接口，以此来扩展ota_from_target_file.py的功能，比如给rom包添加一个data分区的文件。

[点击阅读原文](http://python.jobbole.com/81519/)

###笔记


####ZipFile方法和属性：

`ZipFile.getinfo(name)`

> 获取zip文档内指定文件的信息。返回一个zipfile.ZipInfo对象，它包括文件的详细信息。将在下面 具体介绍该对象。

`ZipFile.infolist()`

> 获取zip文档内所有文件的信息，返回一个zipfile.ZipInfo的列表。

`ZipFile.namelist()`

> 获取zip文档内所有文件的名称列表。

`ZipFile.extract(member[, path[, pwd]])`

> 将zip文档内的指定文件解压到当前目录。参数member指定要解压的文件名称或对应的ZipInfo对象；参数path指定了解析文件保存的文件夹；参数pwd为解压密码。

下面一个例子将保存在程序根目录下的txt.zip内的所有文件解压到D:/Work目录：

```py
import zipfile, os
zipFile = zipfile.ZipFile(os.path.join(os.getcwd(), 'txt.zip'))
for file in zipFile.namelist():
    zipFile.extract(file, r'd:/Work')
zipFile.close()
```


`ZipFile.extractall([path[, members[, pwd]]])`

> 解压zip文档中的所有文件到当前目录。参数members的默认值为zip文档内的所有文件名称列表，也可以自己设置，选择要解压的文件名称。

`ZipFile.printdir()`

> 将zip文档内的信息打印到控制台上。

`ZipFile.setpassword(pwd)`

> 设置zip文档的密码。

`ZipFile.read(name[, pwd])`

> 获取zip文档内指定文件的二进制数据。


下面的例子演示了read()的使用，zip文档内包括一个txt.txt的文本文件，使用read()方法读取其二进制数据，然后保存到D:/txt.txt。

```py
#coding=gbk
import zipfile, os
zipFile = zipfile.ZipFile(os.path.join(os.getcwd(), 'txt.zip'))
data = zipFile.read('txt.txt')
(lambda f, d: (f.write(d), f.close()))(open(r'd:/txt.txt', 'wb'), data)  #一行语句就完成了写文件操作。仔细琢磨哦~_~
zipFile.close()
```

`ZipFile.write(filename[, arcname[, compress_type]])`

> 将指定文件添加到zip文档中。filename为文件路径，arcname为添加到zip文档之后保存的名称, 参数compress_type表示压缩方法，它的值可以是zipfile. ZIP_STORED 或zipfile. ZIP_DEFLATED。下面的例子演示了如何创建一个zip文档，并将文件D:/test.doc添加到压缩文档中。

```py
import zipfile, os
zipFile = zipfile.ZipFile(r'D:/test.zip'), 'w')
zipFile.write(r'D:/test.doc', 'ok.doc', zipfile.ZIP_DEFLATED)
zipFile.close()
```

`ZipFile.writestr(zinfo_or_arcname, bytes)`

> writestr()支持将二进制数据直接写入到压缩文档。

###ZipInfo类


ZipFile.getinfo(name) 方法返回的是一个ZipInfo对象，表示zip文档中相应文件的信息。它支持如下属性：

属性|功能
---|---
ZipInfo.filename| 获取文件名称。
ZipInfo.date_time| 获取文件最后修改时间。返回一个包含6个元素的元组：(年, 月, 日, 时, 分, 秒)
ZipInfo.compress_type| 压缩类型。
ZipInfo.comment| 文档说明。
ZipInfo.extr| 扩展项数据。
ZipInfo.create_system| 获取创建该zip文档的系统。
ZipInfo.create_version| 获取 创建zip文档的PKZIP版本。
ZipInfo.extract_version| 获取 解压zip文档所需的PKZIP版本。
ZipInfo.reserved| 预留字段，当前实现总是返回0。
ZipInfo.flag_bits| zip标志位。
ZipInfo.volume| 文件头的卷标。
ZipInfo.internal_attr| 内部属性。
ZipInfo.external_attr| 外部属性。
ZipInfo.header_offset| 文件头偏移位。
ZipInfo.CRC| 未压缩文件的CRC-32。
ZipInfo.compress_size| 获取压缩后的大小。
ZipInfo.file_size| 获取未压缩的文件大小。

下面一个简单的例子说明这些属性的意思：

```py
import zipfile, os
zipFile = zipfile.ZipFile(os.path.join(os.getcwd(), 'txt.zip'))
zipInfo = zipFile.getinfo('doc.doc')
print 'filename:', zipInfo.filename
print 'date_time:', zipInfo.date_time
print 'compress_type:', zipInfo.compress_type
print 'comment:', zipInfo.comment
print 'extra:', zipInfo.extra
print 'create_system:', zipInfo.create_system
print 'create_version:', zipInfo.create_version
print 'extract_version:', zipInfo.extract_version
print 'extract_version:', zipInfo.reserved
print 'flag_bits:', zipInfo.flag_bits
print 'volume:', zipInfo.volume
print 'internal_attr:', zipInfo.internal_attr
print 'external_attr:', zipInfo.external_attr
print 'header_offset:', zipInfo.header_offset
print 'CRC:', zipInfo.CRC
print 'compress_size:', zipInfo.compress_size
print 'file_size:', zipInfo.file_size
zipFile.close()
```

感觉使用zipfile模块来处理zip文件真的很简单。想当初在.NET平台下，使用sharpziplib压缩、解压一个文件，我花了N多时间，找了N多英文资源，才写出一个能压缩文件的demo。而现在使用Python，通过阅读python手册，一两个小时就掌握了zipfile模块的基本使用。哈哈，使用Python，真爽！