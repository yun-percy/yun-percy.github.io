---

title: python的文件操作
category: 语法
---


Python提供了必要的函数和方法进行默认情况下的文件基本操作。你可以用file对象做大部分的文件操作。

####open()

> 你必须先用Python内置的open()函数打开一个文件，创建一个file对象，相关的辅助方法才可以调用它进行读写。

语法：

```py
file object = open(file_name [, access_mode][, buffering])
```

各个参数的细节如下：

`file_name`：file_name变量是一个包含了你要访问的文件名称的字符串值。

`access_mode`：access_mode决定了打开文件的模式：只读，写入，追加等。所有可取值见如下的完全列表。这个参数是非强制的，默认文件访问模式为只读(r)。

`buffering`:如果buffering的值被设为0，就不会有寄存。如果buffering的值取1，访问文件时会寄存行。如果将buffering的值设为大于1的整数，表明了这就是的寄存区的缓冲大小。如果取负值，寄存区的缓冲大小则为系统默认。

不同模式打开文件的完全列表：

模式 | 描述
---|---
r  | 以只读方式打开文件。文件的指针将会放在文件的开头。这是默认模式。
rb | 以二进制格式打开一个文件用于只读。文件指针将会放在文件的开头。这是默认模式。
r+ | 打开一个文件用于读写。文件指针将会放在文件的开头。
rb+| 以二进制格式打开一个文件用于读写。文件指针将会放在文件的开头。
w  | 打开一个文件只用于写入。如果该文件已存在则将其覆盖。如果该文件不存在，创建新文件。
wb | 以二进制格式打开一个文件只用于写入。如果该文件已存在则将其覆盖。如果该文件不存在，创建新文件。
w+ | 打开一个文件用于读写。如果该文件已存在则将其覆盖。如果该文件不存在，创建新文件。
wb+| 以二进制格式打开一个文件用于读写。如果该文件已存在则将其覆盖。如果该文件不存在，创建新文件。
a  | 打开一个文件用于追加。如果该文件已存在，文件指针将会放在文件的结尾。也就是说，新的内容将会被写入到已有内容之后。如果该文件不存在，创建新文件进行写入。
ab | 以二进制格式打开一个文件用于追加。如果该文件已存在，文件指针将会放在文件的结尾。也就是说，新的内容将会被写入到已有内容之后。如果该文件不存在，创建新文件进行写入。
a+ | 打开一个文件用于读写。如果该文件已存在，文件指针将会放在文件的结尾。文件打开时会是追加模式。如果该文件不存在，创建新文件用于读写。
ab+| 以二进制格式打开一个文件用于追加。如果该文件已存在，文件指针将会放在文件的结尾。如果该文件不存在，创建新文件用于读写。

####File对象的属性

以下是和file对象相关的所有属性的列表：

属性 | 描述
---|---
file.closed |true如果文件已被关闭，否则返回false。
file.mode  | 被打开文件的访问模式。
file.name  | 文件的名称。
file.softspace | 如果用print输出后，必须跟一个空格符，则返回false。否则返回true。

实例：

```py
#!/usr/bin/python
# -*- coding: UTF-8 -*-
fo = open("foo.txt", "wb")
print "Name of the file: ", fo.name
print "Closed or not : ", fo.closed
print "Opening mode : ", fo.mode
print "Softspace flag : ", fo.softspace
```

以上实例输出结果：

```sh
Name of the file:  foo.txt
Closed or not :  False
Opening mode :  wb
Softspace flag :  0
```

####Close()方法

> File对象的close（）方法刷新缓冲区里任何还没写入的信息，并关闭该文件，这之后便不能再进行写入。
当一个文件对象的引用被重新指定给另一个文件时，Python会关闭之前的文件。用close（）方法关闭文件是一个很好的习惯。

语法：

```py
fileObject.close();
```

###读写文件：

> file对象提供了一系列方法，能让我们的文件访问更轻松。来看看如何使用read()和write()方法来读取和写入文件。

####Write()方法

> Write()方法可将任何字符串写入一个打开的文件。需要重点注意的是，Python字符串可以是二进制数据，而不是仅仅是文字。

__Write()方法不在字符串的结尾不添加换行符('\n')：__

语法：

```py
fileObject.write(string);
```

####read()方法

> read（）方法从一个打开的文件中读取一个字符串。需要重点注意的是，Python字符串可以是二进制数据，而不是仅仅是文字。

语法：

```py
fileObject.read([count]);
```

###文件位置：

####tell()

> 告诉你文件内的当前位置；换句话说，下一次的读写会发生在文件开头这么多字节之后：

####seek（offset [,from]）

> 方法改变当前文件的位置。Offset变量表示要移动的字节数。From变量指定开始移动字节的参考位置。

如果from被设为0，这意味着将文件的开头作为移动字节的参考位置。如果设为1，则使用当前的位置作为参考位置。如果它被设为2，那么该文件的末尾将作为参考位置。

例子：

```py
#!/usr/bin/python
# -*- coding: UTF-8 -*-
fo = open("/tmp/foo.txt", "r+")
str = fo.read(10);
print "Read String is : ", str
position = fo.tell();
print "Current file position : ", position
position = fo.seek(0, 0);
str = fo.read(10);
print "Again read String is : ", str
fo.close()
```

以上实例输出结果：

```sh
Read String is :  Python is
Current file position :  10
Again read String is :  Python is
```

###重命名和删除文件

> Python的os模块提供了帮你执行文件处理操作的方法，比如重命名和删除文件。
要使用这个模块，你必须先导入它，然后可以调用相关的各种功能。

####rename()方法：

rename()方法需要两个参数，当前的文件名和新文件名。
语法：

```py
os.rename(current_file_name, new_file_name)
```

####remove()方法

你可以用remove()方法删除文件，需要提供要删除的文件名作为参数。
语法：

```py
os.remove(file_name)
```

###Python里的目录：

> 所有文件都包含在各个不同的目录下，不过Python也能轻松处理。os模块有许多方法能帮你创建，删除和更改目录。

####mkdir()方法

> 可以使用os模块的mkdir()方法在当前目录下创建新的目录们。你需要提供一个包含了要创建的目录名称的参数。

语法：

```py
os.mkdir("newdir")
```

#### chdir()方法
可以用chdir()方法来改变当前的目录。chdir()方法需要的一个参数是你想设成当前目录的目录名称。
语法：
os.chdir("newdir")

####getcwd()方法：

getcwd()方法显示当前的工作目录。
语法：

```py
os.getcwd()
```

#### rmdir()方法

> rmdir()方法删除目录，目录名称以参数传递。
在删除这个目录之前，它的所有内容应该先被清除。

语法：

```py
os.rmdir('dirname')
```

###读取文件内容

```py
f = open("foo.txt")
line = f.readline()
while line:
    print line
    line = f.readline()
f.close()
```

或者

```py
for line in open("foo.txt"):
    print line
```
