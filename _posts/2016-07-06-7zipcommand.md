---
layout: post
title: linux装逼命令行，瞬间黑客范
category: Linux
tags : [linux,bash ,装逼指南 ]
---


常规简单用法
------

```sh
7z a -tzip -p111 archive.7z txt.txt#压缩 密码为111
7z x -tzip -p111 archive.7z#解压 密码为111
```



> 7z 是 7-Zip 的命令行版本。包含命令如下：

__命令行选项__

```sh
7z [命令行] [[选项]...] [基本档案名称] [[参数变量]...]
7z [command] [[switch]...] [base_archive_name] [[arguments]...]
```

+ 文件列表

>您可以使用文件列表来对要操作的文件进行批量操作。在文件中的文件名必须用空格或另起一行隔开。(如使用空格，需要加引号)。

example:

listfile.txt包含下列内容：

```
"My programs\*.cpp"
Src\*.cpp
```

命令：

```sh
7z a -tzip archive.zip @listfile.txt
```



命令|作用说明
---|---
a|添加
d|删除
e|释放
l |列表
t|测试
u|更新
x| 完整路径释放

可以和此命令结合使用的选项:

选项|含义
---|---
-i |包括文件名
-m |设置压缩算法
-p|设置密码
-r |递归子目录
-t |设置压缩档案格式
-u |更新选项
-w |设置工作目录
-x |排除文件

+ a (添加) 命令

```sh
7z a -tzip archive.zip subdir\*
#从 subdir 文件夹添加所有文件到 archive.zip 压缩档案。
7z a -tzip Files.zip "Program files\*" -r
#从 Program 文件夹添加所有文件到 Files.zip 压缩档案。
```

+ d (删除) 命令

```sh
7z d archive.zip *.bak
#从 archive.zip 压缩档案中删除 *.bak 文件。
```

+ e (释放) 命令


7z 冲突回应：
回应 |简写|描述
---|---|---
Yes(是) |y
No(否)| n
Always(总是)|a| 将所有的询问以 YES 来对待
Skip(跳过)| s |将所有的询问以 NO 来对待
Quit(退出)|q |退出程序

```sh
7z e archive.zip
#从压缩档案 archive.zip 中释放所有文件到当前文件夹。
7z e archive.zip -oc:\soft *.cpp
#从压缩档案 archive.zip 中释放 *.cpp 文件到 c:\soft 文件夹。
```

可以和此命令结合使用的选项:

选项|含义
---|---
-ao |覆盖模式
-i|包括文件名
-o|设置输出目录
-p|设置密码
-r|递归子目录
-x|排除文件
-y|全是
-n|全否
x |完整路径释放

+ l (列表) 命令

```sh
7z l archive.zip
#列出压缩档案 archive.zip 的内容。
```

可以和此命令结合使用的选项:

选项|含义
---|---
-i|包括文件名
-r|递归子目录
-x|排除文件

+ t (测试) 命令

```sh
7z t archive.zip *.doc
#在压缩档案 archive.zip 中测试 *.doc 文件的完整性。
```

可以和此命令结合使用的选项:

选项|含义
---|---
-i|包括文件名
-r|递归子目录
-p|设置密码
-x|排除文件

+ u(更新)命令

```sh
7z u archive.zip *.doc
#在压缩档案 archive.zip 中更新 *.doc 文件。
```

可以和此命令结合使用的选项:

选项|含义
---|---
-i|包括文件名
-m|设置压缩算法
-p|设置密码
-r|递归子目录
-t|设置压缩档案格式
-u|更新选项
-w|设置工作目录
-x|排除文件


+ x (完整路径释放) 命令

```sh
7z x archive.zip
#从压缩档案 archive.zip 中释放所有文件到当前文件夹。
7z x archive.zip -oc:\soft *.cpp
#从压缩档案 archive.zip 中释放 *.cpp 文件到 c:\soft 文件夹。
```

可以和此命令结合使用的选项

选项|含义
---|---
-ao|覆盖模式
-i|包括文件名
-o|设置输出目录
-p|设置密码
-r|递归子目录
-x|排除文件
-y|全是


命令行选项
---

选项要点参考

选项 |说明
---|---
–-|阻止选项解析
-ai |附件档案文件名
-an|不解析档案名称
-ao| 覆盖模式
-ax| 排除档案文件名
-i|包括文件名
-m|设置压缩算法
-o|设置输出目录
-p | 设置密码
-r|递归子目录
-sfx|创建自释放档案
-si | 从StdIn 读取数据
-so | 从StdOut 写入数据
-t|设置档案类型
-u|更新选项
-v|创建分卷
-w|设置工作目录
-x | 文件名排除
-y | 全是

+ -- (阻止选项解析) 选项

```sh
7z t -- -ArchiveName.7z
测试 -ArchiveName.7z 压缩档案.
```

+ -ai (附件档案文件名) 开关

> 指定附加文件，包括压缩档案文件名及通配符。此选项可同时附加多个类型。

语法

```
-ai[[recurse_type]][file_ref]
[recurse_type] ::= r[- | 0]
[file_ref] ::= @{listfile} | !{wildcard}
```

+ -an (不解析档案名称) 选项

> 不解析命令行中的 archive_name 区域。此选项必须和 -i (附加文件) 开关一起使用。比如您为压缩档案使用列表文件，您就需要指定 -ai 选项，所以您需要禁止解析命令行中的 archive_name 区域。

语法

```sh
7z t -an -ai!*.7z -ax!a*.7z
测试除 a*.7z 之外的 *.7z 压缩档案。
```

+ -ao (覆盖模式) 选项

> 指定在释放期间如何覆盖硬盘上现有的同名文件。

参数|说明
---|---
-aoa|直接覆盖现有文件，而没有任何提示。
-aos|跳过现有文件，其不会被覆盖。
-aou|如果相同文件名的文件已存在，将自动重命名被释放的文件。例如，文件 file.txt 将被自动重命名为 file_1.txt。
-aot|如果相同文件名的文件已存在，将自动重命名现有的文件。例如，文件 file.txt 将被自动重命名为 file_1.txt。

```sh
7z x test.zip -aoa
#从压缩档案 test.zip 中释放所有文件并却不做提示直接覆盖现有文件。
```

+ -ax (排除档案文件名) 选项

> 指定必须从操作中排除的压缩档案，此选项可同时排除多个类型。
语法

```sh
7z t -an -ai!*.7z -ax!a*.7z
#测试除 a*.7z 之外的 *.7z 压缩档案
```
+ -an (不解析档案名称)

> 指定通配符及文件名，此选项在这里必须使用。如果此选项未被指定，那么将自动使用递归。


选项 | 说明
---|---
{listfile}|指定文件列表的文件名。参见 列表文件 的说明。
{wildcard}| 指定通配符或文件名。

```sh
7z t -an -air!*.7z
#在当前目录及子目录下测试 *.7z 压缩档案
```

+ -i (附加文件) 选项

> 指定附加文件或一类文件，此选项可附件添加多个类型。


参数|说明
---|---
{listfile}| 指定文件列表。请参考 文件列表 相关信息。
{wildcard}| 指定文件名或通配符。

```sh
7z a -tzip src.zip *.txt -ir!DIR1\*.cpp
#从当前目录中添加 *.txt 文件，和 DIR1 目录及其子目录中的 *.cpp 文件到 src.zip 压缩档案。
```

+ -m (设置压缩算法) 选项

> 指定压缩算法。此选项的格式依压缩档案的类型而定。

Zip参数 |默认值 | 说明
---|---|---
x=[0 \| 5\| 9 ]|5| 设置压缩等级。
m={MethodID} |Deflate | 设置压缩算法：Copy、Deflate、Deflate64、BZip2。
fb={NumFastBytes}|32|设置 Deflate 编码器的单词大小。
pass={NumPasses}| 1 |设置 Deflate 编码器的传送大小。

+ X=[0 | 5 | 9 ]

> 设置压缩等级

压缩等级| 说明
---|---
0|不压缩。
5|默认的压缩等级。
9| 最大压缩等级。压缩后的文件会更小。但是在压缩的时候会比较慢而且需要较多的物理内存。


+ fb={NumFastBytes}

> 设置 Deflate 编码器的单词大小。您可以在3到 255 范围之内更改。在 `Deflate` 算法下，它的默认值是 `32`；在 `Deflate 64` 算法下，它的默认值是`64`。

+ pass={NumPasses}

> 设置 Deflate 编码器的传送大小。

您可以在 1 到 4 范围之内更改。在 `Deflate` 算法下，它的默认值是 `1`；在 Deflate 64 算法下，它的默认值是 3。此项可略微提升压缩比，但并不明显。



7z默认参数
---

参数|默认| 说明
---|---|---
x=[0 \| 1 \| 5 \| 7 \| 9 ]|5 |设置压缩等级。
s=[off \| on \| [e] [{N}f] [{N}b \| {N}k \| {N}m \| {N}g]|on|设置固实模式。
f=[off \| on]|on|开启或关闭可执行文件压缩过滤器。
hc=[off \| on]|on|开启或关闭档案文件头压缩。
hcf=[off \| on]|on|开启或关闭档案文件头完全压缩。
he=[off \| on]|off|开启或关闭档案文件头加密。
b{C1}[s{S1}]:{C2}[s{S2}]||设置编码器之间绑定。
{N}={MethodID}[:param1][:param2][..]||LZMA设置压缩算法：LZMA、PPMd、BZip2、Deflate、BCJ、BCJ2、Copy。
mt=[off \| on]|off|设置多线程模式。

支持的压缩算法：

MethodID|说明
---|---
LZMA|基于 LZ 之上的压缩算法。
PPMd|基于 Dmitry Shkarin 之上的算法 PPMdH 并加以优化。通常能对纯文本提供高压缩比及较快的解压缩速度。
Bzip2|基于 BWT 的标准压缩算法。通常能对纯文本提供较高压缩比及相当不错的解压缩速度。
Deflate|ZIP 及 GZip 格式的标准压缩算法。没有很高的压缩比。但是它拥有十分快的压缩及解压缩速度。Deflate 压缩算法只支持 32 KB 字典大小。
BCJ|(CALL、JUMP)32 位 x86 可执行文件转换器。
BCJ2| (CALL、JUMP、JCC)32 位 x86 可执行文件转换器(第二版)。
Copy| 不压缩。

```sh
7z a -tzip archive.zip *.jpg -m0
#不压缩而直接将 *.jpg 文件添加到 archive.zip 档案。
7z a -t7z archive.7z *.exe *.dll -m0=BCJ -m1=LZMA:d=21 -ms -mmt
#添加 *.exe 及 *.dll 文件到固实压缩档案 archive.7z。使用 LZMA 压缩算法、2 MB 字典大小及 BCJ 转换器。压缩将开启多线程优化(如果可用)。
7z a -t7z archive.7z *.exe *.dll -m0=BCJ2 -m1=LZMA:d23 -m2=LZMA:d19 -m3=LZMA:d19 -mb0:1 -mb0s1:2 -mb0s2:3
#添加 *.exe 及 *.dll 文件到压缩档案 archive.7z。使用 LZMA 压缩算法、BCJ2 转换器、为主输出流(s0)使用 8 MB 字典大小、LZMA 算法为 BCJ2 转换器的 s1 及 s2 输出流使用 512 KB 字典大小。
7z a -t7z archive.7z *.txt -m0=PPMd
#添加 *.txt 文件到压缩档案 archive.7z。 使用 PPMd 压缩算法。
```
```sh
7z x archive.zip -psecret
#将设有密码“secret”的压缩档案 archive.zip 中所有文件释放。
```


```sh
7z a -tzip archive.zip -r src\*.cpp src\*.h
将 src 目录及其子目录中的 *.cpp 及 *.h 文件添加到 archive.zip 压缩档案。
```

-sfx (创建自释放档案) 选项
---

> 创建自释放档案。

SFX_Module|说明
---|---
7zC.sfx|Windows 版本。
7zCon.sfx |命令行(DOS)版本。
7zS.sfx|Windows 安装版本。
7zSD.sfx| Windows 安装版本(需调用 MSVCRT.dll)。

+ 自释放安装模块

自释放安装模块(7zS.sfx 和 7zSD.sfx)可让您创建软件的安装程序。这类模块将释放文件到一临时文件夹，然后运行指定的程序来进行安装。安装之后再自动删除临时文件。 要创建自释放档案必须有三个文件：自释放模块、安装程序配置、7z 压缩档案。其中安装程序配置文件是可选的。您可以使用下列命令来创建安装程序：

```sh
copy /b 7zS.sfx + config.txt + archive.7z archive.exe
```

请注意上述文件的输入顺序：*.sfx、*.txt、*.7z。最后的 archive.exe 即为生成的安装程序。
选项 -y 使用在自释放安装模块中可设置释放时是否为安静模式。

安装程序配置文件格式

配置文件包括安装程序的命令行。文件要以字串 ;!@Install@!UTF-8! 开头，以 ;!@InstallEnd@! 结尾。且文件必须使用 UTF-8 编码。文件中还需包含下列变量：

变量|说明
---|---
ID_String|说明
Title|对话框信息标题。
BeginPrompt |安装前提示信息。
RunProgram| 欲执行命令。若添加子命令 %%T 则会把文件释放到系统的临时目录。

您可以省略上述任何一部分。

配置文件示例

```
;!@Install@!UTF-8!
Title="7-Zip 1.00"
BeginPrompt="应用程序将安装 7-Zip 1.00，是否继续？"
RunProgram="Setup.exe /T:%%T"
;!@InstallEnd@!
```

程序将以 BeginPrompt 中的信息提示用户，再执行 RunProgram 中的命令。然后程序将使用 .inf 文件的内容并调用压缩包中的 advpack.dll 文件进行安装。

示例:

```sh
7z a -sfx a.exe *.txt
添加 *.txt 文件到自释放档案 a.exe 并使用默认的命令行自释放模块。
7z a -sfx7zC.sfx a.exe * -r
添加所有文件到自释放档案 a.exe 并使用 7zC.sfx Windows 版本的自释放模块。
```


```sh
7z a archive.gz -tgzip -siDoc2.txt [ Doc.txt
#使用 Doc2.txt 文件名压缩输入流从文件 Doc.txt 到压缩档案 archive.gz。
```

```sh
7z x archive.gz -so ] Doc.txt
#解压缩 archive.gz 输出流并将该输出流写入到 Doc.txt 文件。
7z a dummy -tgzip -so Doc.txt ] archive.gz
#压缩 Doc.txt 输出流并将该输出流写入到 archive.gz 压缩档案。
```

```sh
7z a -tzip archive.zip *.txt
#使用 zip 格式从当前目录中添加所有 *.txt 文件到压缩档案 archive.zip。
```

```sh
7z u c:\1\exist.7z -u- -up0q3x2z0!c:\1\update.7z * -r
#创建新压缩档案 update.7z 并将当前目录中的 exist.7z 压缩档案里所有不同文件写入此压缩档案。并不更改 exist.7z 压缩档案的内容。
```

```sh
7z a a.7z *.txt -v10k -v15k -v2m
#创建 a.7z 分卷压缩档案。第一个分卷为 10 KB，第二个为 15 KB，剩下全部为 2 MB。
```

```sh
7z a -tzip archive.zip *.cpp -wc:\temp
#添加 *.cpp 文件到 archive.zip 压缩档案，并将临时压缩档案创建到 c:\temp 文件夹。
```

```sh
7z a -tzip archive.zip *.txt -x!temp.*
#添加除 temp.* 文件之外的所有 *.txt 文件到压缩档案 archive.zip。
```