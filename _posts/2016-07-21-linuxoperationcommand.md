---
layout: post
title: linux 运维相关知识
category: Linux
tags : [Linux,bash ,运维]
---

创建、删除、管理用户
-----

+ 创建用户

创建test用户，并且指定Home目录
```sh
sudo useradd -d [userHomeDirc] -m -G root [name]
#ex：
sudo useradd -d /data/test -m -G root test
```

+ 删除用户

```sh
sudo userdel -r test #删除用户：test
```

+ 创建、修改用户密码

```sh
sudo passwd test
```

+ 修改用户shell

```sh
sudo vim /etc/passwd
#修改 /bin/sh 为/bin/bash
```

+ 将账户添加root权限

```sh
chmod u+w /etc/sudoers
vim /etc/sudoers
#在下面仿照其他用户加上
test ALL=(ALL:ALL) ALL
```

用户监视
---

+ 查看当前登录用户

`who`

缺省输出包括用户名、终端类型、登陆日期以及远程主机。

`who /var/log/wtmp `

可以查看自从wtmp文件创建以来的每一次登陆情况

（1）-b：查看系统最近一次启动时间

（2）-H：打印每列的标题

`last`

默认打印所有用户的登陆信息。

如果想打印某个用户的登陆信息，可以使用

`last username`

参数|选项
---|---
-x|显示系统开关机以及执行等级信息
-a|将登陆ip显示在最后一行
-f|读取特定文件，可以选择 -f /var/log/btmp文件
-d|将IP地址转换为主机名
-n|列出名单的显示列数
-t|指定时间的用户登录历史

`lastlog`

查看所有用户最近一次登录历史

参数|选项|示例
---|---|---
-u|最后一次登陆历史|lastlog -u test
-t|最近几天之内的用户登录历史|lastlog -t 1
-b|查看指定天数之前的用户登录历史|lastlog -b 60

`ac`

根据/var/log/wtmp文件中的登陆和退出时间报告用户连接的时间（小时），默认输出报告总时间

参数|选项
---|---
-p|显示每个用户的连接时间
-d|显示每天的连接时间
-y|显示年份，和-d配合使用


