---
layout: post
title: linux下 ssh登录免密码
category: linux
---

##前言

公司要求我们自己搭建一个本地git服务器，自己花了半天搭建起来后每次进入都需要输入密码，我很烦，于是就找了一下相关的文章，依葫芦画瓢就成功了。相当自在。

原文地址[http://josephj.com/article/understand-ssh-key/](http://josephj.com/article/understand-ssh-key/)

原文是繁文，讲得比较细致，对于我这种人来说，看一次效率略低，所以简化了一下。miyao

1. 基本流程

本地生产 公钥，复制到服务器的 .ssh下，然后倒入到密钥文件里。给予权限就OK，下次访问的时候，服务器会先去核对密钥，密钥通过就不需要输入密码，不通过则需要通过密码。<br>
因为这种方式需要管理员接入，所以会才、使得整个过程安全而迅速。

2. 密钥种类

操作起来远没有想象的那么简单，也就导致了，我在操作过程中失败了很多次。原因是服务器的密钥种类不同，认证方式也不同。<br>SSH 有 Protocol 1 及 Protocol 2两种机制，常见的密钥类型也有 RSA1、RSA2、以及 DSA 三种。<br>所以这里我建议你三种全部都安装。

3. 实现代码

下面的代码在mac和linux中是通用的，但是windows下我没尝试过，所以需要自己去弄。

+ 产生三种密钥

a. 产生 RSA 1 密钥

这种密钥是以前比较旧的系统，例如 FreeBSD 4 及以前的版本、是走 SSH Protocol 1 的，最好就使用 RSA 1 。

		ssh-keygen -t rsa1

然后一路回车就可以了

b. 产生 RSA 2 密钥

适合比较新的系统

		 ssh-keygen -t rsa

c. 产生 DSA密钥

		ssh-keygen -t dsa

全部完成后我们就有了三对密钥：RSA1 ( identity.pub / identity )、RSA2 ( id_rsa.pub / id_rsa )、及 ( id_dsa.pub / id_rsa )，将pub格式的密钥重命名，防止与其它成员的密钥冲突

		mv identity.pub xxx_identity.pub
		mv id_rsa.pub xxx_id_rsa.pub
		mv  id_dsa.pub xxx_id_dsa.pub



+ 将公钥复制到服务器上

		scp ~/.ssh/*.pub 服务器ip:~/.ssh/

例如:

		scp ~/.ssh/*.pub git@192.168.1.30:~/.ssh/.

然后乖乖打密码输入进去，然后登陆到服务器，或者交由服务器管理员来操作就可以。

登陆到服务器：

		ssh 你的主机

linux和mac中处理防止的密钥文件叫做authorized_keys，所以我们要把刚刚传入的公钥放入到这个文件中：

		cat ~/.ssh/identity.pub >> ~/.ssh/authorized_keys
		cat ~/.ssh/id_rsa.pub >> ~/.ssh/authorized_keys
		cat ~/.ssh/id_dsa.pub >> ~/.ssh/authorized_keys
		chmod 711 ~/.ssh
		chmod 644 ~/.ssh/authorized_keys

如果不出意外，你就可以免密码登入了

