---

title: shell读取文件每一行的方式
category: Shell
---

+ 使用read命令读取一行数据

		while read myline
		do
		echo "LINE:"$myline
		done < datafile.txt

#### 解决read在这个语法中失效的问题：

		read </dev/tty   #再给它重定向一次就可以了

+ 使用read命令读取一行数据

		cat datafile.txt | while read myline
		do
		echo "LINE:"$myline
		done

+ 读取一行数据

		cat datafile.txt | while myline=$(line)
		do
		echo "LINE:"$myline
		done

+ 读取一行数据

		while myline=$(line)
		do
		echo "LINE:"$myline
		done < datafile.txt

+ 使用read命令读取变量数据

		cat datafile.txt | while read paraa parab parac
		do
		echo "PARAA:"$paraa
		echo "PARAB:"$parab
		echo "PARAC:"$parac
done

+ 使用read命令读取变量数据

		while read paraa parab parac
		do
		echo "PARAA:"$paraa
		echo "PARAB:"$parab
		echo "PARAC:"$parac
		done < datafile.txt


原文地址：[http://blog.163.com/clevertanglei900@126/blog/static/1113522592011625112619590/](http://blog.163.com/clevertanglei900@126/blog/static/1113522592011625112619590/)
