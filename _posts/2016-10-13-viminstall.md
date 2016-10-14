---
layout: post
title: 转:Linux中源码安装编译Vim
category: 综合
tags : [source,linux ,vim ]
---

[原文地址](http://www.cnblogs.com/zhongcq/p/3615980.html)


> Linux下学习工作少不了编辑器，Vim能使你的工作效率成倍的提高。在Ubuntu上安装vim使用命令直接安装很简单。但有时还是需要自己手动编译安装。例如： vim中的杀手级插件——YouCompleteMe 要求Vim版本为7.3.548或者更高,自己升级成全功能的最新版,需要通过源码编译安装。

自己在编译安装的过程中也查阅了很多资料，这里将整个编译安装的过程记录下来。


1. 下载所需工具
2. 卸载老版本vim
3. 下载新版
4. 编译安装
5. 下载所需工具

### 准备工作

编译Vim之前，需要下载编译的相关工具和一些库

```sh
sudo apt-get install libncurses5-dev libgnome2-dev libgnomeui-dev libgtk2.0-dev libatk1.0-dev libbonoboui2-dev libcairo2-dev libx11-dev libxpm-dev libxt-dev python-dev ruby-dev mercurial
```

### 卸载老版本vim

在安装新版本的Vim之前，你需要卸载原来安装的老版本Vim，依次在终端下执行下列命令：

```py
sudo apt-get remove vim  
sudo apt-get remove vim-runtime  
sudo apt-get remove gvim  
sudo apt-get remove vim-tiny  
sudo apt-get remove vim-common  
sudo apt-get remove vim-gui-common  
```

### 下载新版

[下载地址](ftp://ftp.vim.org/pub/vim/unix)

这里以`vim-7.4.tar.bz2`为例

```py
tar -xjvf vim-7.4.tar.bz2
```

解压至 ~/downloads/vim74/

### 编译安装

```
cd ~/downloads/vim74/

#设置Vim源码的编译属性

./configure --with-features=huge --enable-rubyinterp --enable-pythoninterp --with-python-config-dir=/usr/lib/python2.7/config-i386-linux-gnu/ --enable-perlinterp --enable-gui=gtk2 --enable-cscope --enable-luainterp --enable-perlinterp --enable-multibyte --prefix=/usr
```

> 需要重新配置可 输入 make distclean #清理一下上一次编译生成的所有文件

其中参数说明如下：

```json
--with-features=huge：支持最大特性
--enable-rubyinterp：启用Vim对ruby编写的插件的支持
--enable-pythoninterp：启用Vim对python编写的插件的支持
--enable-luainterp：启用Vim对lua编写的插件的支持
--enable-perlinterp：启用Vim对perl编写的插件的支持
--enable-multibyte：多字节支持 可以在Vim中输入中文
--enable-cscope：Vim对cscope支持
--enable-gui=gtk2：gtk2支持,也可以使用gnome，表示生成gvim
--with-python-config-dir=/usr/lib/python2.7/config-i386-linux-gnu/ 指定 python 路径
--prefix=/usr：编译安装路径
```

```sh
sudo make VIMRUNTIMEDIR=/usr/share/vim/vim74

sudo make install
```

### Done!
