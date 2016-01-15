---
layout: post
title: php环境搭建错误解决
category: 其它
tags : [php ,环境 ]
---

问题:
-----

apr下载地址: [点我下载](http://archive.apache.org/dist/apr/)

解决apr not found问题
------

		tar -zxf apr-1.4.5.tar.gz  
		cd  apr-1.4.5  
		./configure --prefix=/usr/local/apr  
		make && make install  


解决APR-util not found问题
-----

		tar -zxf apr-util-1.3.12.tar.gz  
		cd apr-util-1.3.12  
		./configure --prefix=/usr/local/apr-util -with-apr=/usr/local/apr/bin/apr-1-config  
		make && make install 


最后编译apache2的时候加上：

		./configure --enable-so --with-apr=/usr/local/apr --with-apr-util=/usr/local/apr-util/

问题： 
----

		sudo /usr/local/apache2/bin/apachectl start
		httpd: Could not determine the server's fully qualified domain name, using 127.0.0.1 for ServerName
		httpd (pid 20183) already running

解决：

		vim /usr/local/apache2/conf/httpd.conf

将 ServerName www.example.com:80 注释符号#去掉就行了


