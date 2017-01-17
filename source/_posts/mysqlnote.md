---
title: mysql 命令行语句笔记
category: 语法
tags:
  - mysql
  - 命令行
  - linux
  - mac
---

[原帖地址](http://www.cnblogs.com/good_hans/archive/2010/03/29/1700046.html)

### mysql服务的启动和停止

```sh
net stop mysql
net start mysql
```

### 登陆mysql

语法如下： mysql -u用户名 -p用户密码
键入命令mysql -uroot -p， 回车后提示你输入密码，输入12345，然后回车即可进入到mysql中了，mysql的提示符是：

```sh
mysql>
```

注意，如果是连接到另外的机器上，则需要加入一个参数-h机器IP

### 增加新用户

> 格式：grant 权限 on 数据库.* to 用户名@登录主机 identified by "密码"

   如，增加一个用户user1密码为password1，让其可以在本机上登录， 并对所有数  据库有查询、插入、修改、删除的权限。首先用以root用户连入mysql，然后键入以下命令：

```sh
   grant select,insert,update,delete on *.* to user1@localhost Identified by "password1";
```

如果希望该用户能够在任何机器上登陆mysql，则将localhost改为"%"。

如果你不想user1有密码，可以再打一个命令将密码去掉。

```
grant select,insert,update,delete on mydb.* to user1@localhost identified by "";
```
 
### 操作数据库

> 登录到mysql中，然后在mysql的提示符下运行下列命令，每个命令以分号结束。

#### 显示数据库列表。

```sh
show databases;
```

缺省有两个数据库：mysql和test。 mysql库存放着mysql的系统和用户权限信息，我们改密码和新增用户，实际上就是对这个库进行操作。

#### 显示库中的数据表：

```sh
use mysql;
show tables;
```

#### 显示数据表的结构：

```sh
describe 表名;
```

### 建库与删库：

```sh
create database 库名;
drop database 库名;
```

#### 建表：

```sh
use 库名;
create table 表名(字段列表);
drop table 表名;
```

#### 清空表中记录：

```sh
  delete from 表名;
```

#### 显示表中的记录：

```sh
select * from 表名;
```
 

### 导出和导入数据

#### 导出数据：

```sh
mysqldump --opt test > mysql.test
```

即将数据库test数据库导出到mysql.test文件，后者是一个文本文件

```
mysqldump -u root -p123456 --databases dbname > mysql.dbname
```

就是把数据库dbname导出到文件mysql.dbname中。

#### 导入数据:

```sh
mysqlimport -u root -p123456 < mysql.dbname。
```

不用解释了吧。

#### 将文本数据导入数据库:

文本数据的字段数据之间用tab键隔开。

```sh
use test;
load data local infile "文件名" into table 表名;
```

#### 往表中加入记录

```sh
mysql> insert into MYTABLE values ("hyq","M");
```

#### 删除一条记录

```sh
mysql>delete from 表名 where id=1;
```


#### 用文本方式将数据装入数据库表中(例如D:/mysql.txt)

```sh
mysql> LOAD DATA LOCAL INFILE "D:/mysql.txt" INTO TABLE MYTABLE;
```

#### 导入.sql文件命令(例如D:/mysql.sql)

```sh
mysql>use database;
mysql>source d:/mysql.sql;
```

#### 删除表

```sh
mysql>drop TABLE MYTABLE;
```

#### 清空表

```sh
mysql>delete from MYTABLE;
```

#### 更新表中数据

```sh
mysql>update MYTABLE set sex="f" where name='hyq';
```

#### 备份数据库

```sh
mysqldump -u root 库名>xxx.data
```

#### 连接到远程主机上的MYSQL


假设远程主机的IP为：110.110.110.110，用户名为root,密码为abcd123。则键入以下命令：

```sh
mysql -h110.110.110.110 -uroot -pabcd123 # 远程登录
```

(注:u与root可以不用加空格，其它也一样)

####查询条目数量

```sh
select count(*) from tablename;
```



#### 退出MYSQL命令： exit (回车)



