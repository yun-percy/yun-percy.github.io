---
layout: post
title: linux下 解压zip,tar等压缩文件详解
category: Linux
tags : [linux,zip ,压缩 ]
---



###zip命令

```sh
zip -r myfile.zip ./*
```

将当前目录下的所有文件和文件夹全部压缩成myfile.zip文件,－r表示递归压缩子目录下所有文件.

要使用 zip 来压缩文件夹，在 shell 提示下键入下面的命令：

```sh
zip -r filename.zip filesdir
```

你可以使用 zip 命令同时处理多个文件和目录，方法是将它们逐一列出，并用空格间隔：

```sh
zip -r filename.zip file1 file2 file3 /usr/work/school
```

以及 /usr/work/school 目录的内容（假设这个目录存在）压缩起来，然后放入 filename.zip 文件中。

###unzip


要抽取 zip 文件的内容，键入以下命令：

```sh
unzip filename.zip
unzip filename.zip "insidefile.xml"  #解压某个文件或者文件夹
unzip -o -d /home/yun myfile.zip
```

把myfile.zip文件解压到 /home/yun/ <br>
-o:不提示的情况下覆盖文件；<br>
-d:-d /home/sunny 指明将文件解压缩到/home/sunny目录下；

###其他

```sh
zip -d myfile.zip smart.txt
```

删除压缩文件中smart.txt文件

```sh
zip -m myfile.zip ./rpm_info.txt
```

向压缩文件中myfile.zip中添加rpm_info.txt文件

### tar 命令详解

参数|解释
---|---
-c: |建立压缩档案
-x：|解压
-t：|查看内容
-r：|向压缩归档文件末尾追加文件
-u：|更新原压缩包中的文件

这五个是独立的命令，压缩解压都要用到其中一个，可以和别的命令连用但只能用其中一个。下面的参数是根据需要在压缩或解压档案时可选的。

下面的参数-f是必须的

-f: 使用档案名字，切记，这个参数是最后一个参数，后面只能接档案名。

```sh
tar -cf all.tar *.jpg
```

> 这条命令是将所有.jpg的文件打成一个名为all.tar的包。-c是表示产生新的包，-f指定包的文件名。

```sh
# tar -rf all.tar *.gif
```

> 这条命令是将所有.gif的文件增加到all.tar的包里面去。-r是表示增加文件的意思。

```sh
# tar -uf all.tar logo.gif
```

> 这条命令是更新原来tar包all.tar中logo.gif文件，-u是表示更新文件的意思。

```sh
# tar -tf all.tar
```

> 这条命令是列出all.tar包中所有文件，-t是列出文件的意思

```sh
# tar -xf all.tar
```

> 这条命令是解出all.tar包中所有文件，-t是解开的意思

###各种文件压缩

```sh
tar –cvf jpg.tar *.jpg #将目录里所有jpg文件打包成tar.jpg
tar –czf jpg.tar.gz *.jpg #将目录里所有jpg文件打包成jpg.tar后，并且将其用gzip压缩，生成一个gzip压缩过的包，命名为jpg.tar.gz
tar –cjf jpg.tar.bz2 *.jpg #将目录里所有jpg文件打包成jpg.tar后，并且将其用bzip2压缩，生成一个bzip2压缩过的包，命名为jpg.tar.bz2
tar –cZf jpg.tar.Z *.jpg #将目录里所有jpg文件打包成jpg.tar后，并且将其用compress压缩，生成一个umcompress压缩过的包，命名为jpg.tar.Z
rar a jpg.rar *.jpg #rar格式的压缩，需要先下载rar for linux
zip jpg.zip *.jpg #zip格式的压缩，需要先下载zip for linux
```

###各种文件解压

```sh
tar –xvf file.tar #解压 tar包
tar -xzvf file.tar.gz #解压tar.gz
tar -xjvf file.tar.bz2 #解压 tar.bz2
tar –xZvf file.tar.Z #解压tar.Z
unrar e file.rar #解压rar
unzip file.zip #解压zip
```

##总结

格式|命令
---|---
*.tar | tar –xvf
*.gz | gzip -d或者gunzip
*.tar.gz和*.tgz | tar –xzf
*.bz2 | bzip2 -d或者bunzip2
*.tar.bz2|tar –xjf
*.Z | uncompress
*.tar.Z |tar –xZf
*.rar | unrar e
*.zip | unzip
```
