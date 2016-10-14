---
title: mysql重置密码
category: 综合
tags:
  - password
  - mysql
  - reset
---

[原文地址](http://blog.csdn.net/abbuggy/article/details/8245464)

> 忘了MySQL密码，从网上找到的解决方案记录在这里。

+ 编辑mysql的配置文件`/etc/mysql/my.cnf`，在[mysqld]段下加入一行`skip-grant-tables`。

+ 重启mysql服务

```sh
sudo service mysql restart
```

+ 用空密码进入mysql管理命令行，切换到mysql库。

```sh
~$ mysql
mysql> use mysql
# 把密码重置为new_pass。退出数据库管理。
mysql> update user set password=PASSWORD("new_pass") where user='root';
mysql>quit
```

+ 回到vim `/etc/mysql/my.cnf`，把刚才加入的那一行`skip-grant-tables`注释或删除掉。

再次重启mysql服务

```sh
sudo service mysql restart
```

使用新的密码登陆，修改成功。

```sh
~$ mysql -uroot -pnew_pass
```
