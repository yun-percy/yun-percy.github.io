---
layout: post
title: win7下使用easybcd硬盘安装linux+分区建议
category: Linux
---


#####Mint是Ubuntu的衍生版，所以硬盘安装Mint和Ubuntu的步骤基本上是一致的，本文的方法，我已经在ubuntu10.04和和Mint 14以上全部试用通过。引导的方法很多，有用wubi，也有用变色龙的，这里用easybcd安装。

#####安装前请先用磁盘分区软件对硬盘分区，如果你是要做android开发，请先分三个区：

+ 一个分区10G的样子（土豪请随意），格式化为ext4或者ext3，用来挂载 / 目录。
+ 一个分区至少100G（我自己分区分的800G，代码太多），格式化ext4 或者ext3，用来挂载/home目录。
+ 另外一个分区6G以上内存可以不需要，建议大小4G，格式化swap。

步骤
-------------

1. 在Windows7中[点击下载](http://ftp-idc.pconline.com.cn/5b7cb8d32b9e31df505f20bc2f8f087c/pub/download/201010/EasyBCD_2.2.exe)并安装EasyBCD.

2.  将Ubuntu或者Mint的镜像文件复制到<strong><span style="COLOR: #ff0000">C盘根目录</span></strong>，用压缩软件或者虚拟光驱打开，再打开casper目录，把<strong><span style="COLOR: #ff0000">initrd.lz、 vmlinuz</span></strong>二个文件解压到C盘根目录下；把.disk文件夹也解压到C盘</p>

3. 运行EasyBCD进入操作窗口后，点Add New Entry，再点右上角的NeoGrub，再点Install：  (如下图)
![github](http://up.2cto.com/2012/0107/20120107044957237.jpg "Easy配制图")

4. 然后点击Configure，在弹出的窗口中输入如下内容：

		root
		kernel /vmlinuz iso-scan/filename=/(ubuntu/mint映像文件名).iso boot=casper splash
		initrd /initrd.lz
		boot</p>


5. 电脑重启后，就会发现启动菜单会多了一项NeoGrub，选择后会进入Ubuntu/Mint的光盘系统，就是传说的是livecd模式，点击桌面上的图标进行相应的安装即可。

6.创建分区的时候建议选择 专家模式，也就是高级模式。

+ 将10G的分区格式化为ext4 并且挂载点为/
+ 将100G（就是最大的那个分区），挂载点为/home 如果之前是ext3文件系统，建议格式化ext4。如果已经是ext4,那就随意咯。一般来说，这里面用来存代码的话，不要格式化，避免代码丢失。
+ 将4G的swap分区挂载点设为 swap ，格不格式化无所谓。

7.安装完毕后重启生效。