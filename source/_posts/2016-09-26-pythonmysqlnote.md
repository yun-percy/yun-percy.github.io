---
title: python mysql查询笔迹
category: 语法
tags:
  - python
  - mysql
  - note
---

连接数据库
----

```py
db = MySQLdb.connect(host="www.gyyx.com",user="user",passwd="xxx",db="mysql" )
```

新建数据库
---

```py
sql="create database if not exists mysql"
cursor.execute(sql)
```

创建表
----

```py
sql="CREATE TABLE `main_page_data` ( `id` int(11) NOT NULL DEFAULT '1' COMMENT 'id', `rdm_info` varchar(32) NOT NULL DEFAULT '' COMMENT 'rdm数据', PRIMARY KEY (`id`) ) ENGINE=InnoDB DEFAULT CHARSET=gbk COMMENT='VCI首页数据'"
cursor.execute(sql)
```

插入数据
----

```py
sql="""insert into main_page_data (id,rdm_info) values (1,"7")"""
cursor.execute(sql)
```
更新数据

```py
sql="""update main_page_data set id=1,rdm_info="7" where id="1""""
cursor.execute(sql)
```

排序
---

```py
sql="""select * from table where id="1534" order by number desc"""
cursor.execute(sql)
```