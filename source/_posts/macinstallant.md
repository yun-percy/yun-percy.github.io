---
title: Mac下安装Ant
category: 综合
tags:
	- ant
	- 编译
	- mac
---

> 如果你不知道什么是ant，请不要浪费你的时间继续读下去了。或者你对ant是什么感兴趣，可以看这里：[wikipedia-ant](http://zh.wikipedia.org/wiki/Apache_Ant) 或者这里 [baidu-ant](http://baike.baidu.com/link?url=vhok9QFeg3nXU7Zk514dusV5C5IuuGWVornzYbOQS1Cc-r4BBctGm1osrXFlzZVQ#3)

[原文地址](http://blog.csdn.net/crazybigfish/article/details/18215439) 在此基础上有删减和更新及改进

最近整理了一下ant的下载和安装方法，步骤如下：


### 1. 下载ant：官网下载

当前最新版是Apache Ant 1.9.7，可以下载那个zip包，如下图：

![ant 下载](http://img.blog.csdn.net/20140113110440437?watermark/2/text/aHR0cDovL2Jsb2cuY3Nkbi5uZXQvY3JhenliaWdmaXNo/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70/gravity/SouthEast)

### 2. 将下载的zip包解压到一个目录下，如/usr/local

这时候需要你提供修改权限，输入密码。


### 3. 配置环境变量：

```
vim ~/.bash_profile  
```
将下面两行加入到最后，保存就可以了

```sh
export ANT_HOME=/usr/local/apache-ant-1.9.7 
export PATH=${PATH}:${ANT_HOME}/bin  
```

### 4. 测试

重新打开终端并输入

```bash
$ant -version  
#配置成功则显示如下：
Apache Ant(TM) version 1.9.3 compiled on December 23 2013  
```
