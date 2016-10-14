---
title: crontab:让你的shell脚本定时运行
category: Linux
---


bash是linux下经常用到的脚本，由于工作需要，我经常需要同步CM10.1，乐蛙和MIUI的patchrom。每次都要手动cd进去，然后repo sync。我比较会偷懒，所以写了一个脚本，自动同步这三个脚本，不过这样的话，每个星期也要运行一次，还是太麻烦了。
于是我找到了这篇文章，介绍如何使用cron来定期执行脚本，这样以来，我就能保证我的源码实时更新了。
这篇文章写得很简单，程序员可以看一下。


1. 使用cron来定期执行任务

	使用crond (cron监控程序)来定期运行一些任务，比如备份日志、数据库、把日志发送到自己邮箱等等操作都可以又定期运行程序来完成。<br>
crond是个脚本，每次Linux启动的时候都自动起到该脚本，该脚本是 /etc/rc.d/init.d 下面的，每次系统启动的时候就自动会启动该目录下
的脚本。<br>
cron有两个配置文件，一个/etc/crontab，是一个全局配置文件，一组是crontab命令生成生成的配置文件，是属于用户级的。<br>
一般对管理员来说，只要使用全局配置的/etc/crontab就配置文件就可以了，我们去打开配置文件看看：

		SHELL=/bin/bash
		PATH=/sbin:/bin:/usr/sbin:/usr/bin
		MAILTO=root
		HOME=/

		# run-parts
		01 * * * * root run-parts /etc/cron.hourly
		02 4 * * * root run-parts /etc/cron.daily
		22 4 * * 0 root run-parts /etc/cron.weekly
		42 4 1 * * root run-parts /etc/cron.monthly

	我们稍微来分析一下这个文件：<br>
大家看到里面的“*”一定觉得很奇怪，下面我们句稍微来了解一下cron的语法：<br>
上面脚本中的时间是从左到右的，分别列出了五个字段，我们看下面的表：

		------------------------------------------------
		字段            取值范围
		------------------------------------------------
		Minute          0 ~ 59
		Hour            0 ~ 23，其中0是午夜，20是晚上8点
		Day             1 ~ 31
		Month           1 ~ 12
		Day of week     0 ~ 7，其中0和7是表示星期天
		------------------------------------------------

	任何字段中的星号是通配符，例如，如果第一个字段包括星号，则特定若无其事在可能的每一分钟运行。如果要指定时间范围，比如上午8点到
下午4点，则可以见第二个字段设置为8~16。如果要隔一天运行任务，则可以将第三个字段设置为*/2。可以看出，如果五个字段(minute、hour
、day、month、day of week) 之后，cron中的每个字段就没什么神秘之处了。<br>

2. 用户自己的cron

	用户也可以计划用户自己的cron任务，比如他想要在半夜整理他的文件，然后发送邮件给自己，只要这个用户他没有在/etc/cron.deny表中，
就可以使用crontab -e命令来启动自己的cron文件。

3. 对cron的访问控制

	默认情况下，所有用户都能访问cron工具，要对cron进行访问控制，则可以生成/etc/cron.allow与/etc/cron.deny文件。<br>
(1)这两个文件都不存在时，每个用户都可以访问cron工具<br>
(2)存在/etc/cron.allow文件时，则只有cron.allow文件中允许的用户才能访问cron工具，如果也有/etc/cron.deny文件，则忽略cron.deny文件



列出crontab文件:
使用-l参数列出crontab文件:

        $ crontab -l
        0,15,30,45,18-06 * * * /bin/echo `date` > dev/tty1

可以使用这种方法在$HOME目录中对crontab文件做一备份:

        $ crontab -l > $HOME/mycron

这样，一旦不小心误删了crontab文件，可以用上一节所讲述的方法迅速恢复。

编辑crontab文件
如果希望添加、删除或编辑crontab文件中的条目，而EDITOR环境变量又设置为vi，那么就可以用vi来编辑crontab文件:

        $ crontab -e
可以像使用vi编辑其他任何文件那样修改crontab文件并退出。如果修改了某些条目或添加了新的条目，那么在保存该文件时， cron会对其进行必要的完整性检查。如果其中的某个域出现了超出允许范围的值，它会提示你。 我们在编辑crontab文件时，没准会加入新的条目。例如，加入下面的一条：

        # DT:delete core files,at 3.30am on 1,7,14,21,26,26 days of each month
        30 3 1,7,14,21,26 * * /bin/find -name 'core' -exec rm {} \;

保存并退出。

注解

最好在crontab文件的每一个条目之上加入一条注释，这样就可以知道它的功能、运行时间，更为重要的是，知道这是哪位用户的定时作业。
删除crontab文件

        $crontab -r

###使用实例

实例1：每1分钟执行一次myCommand

        * * * * * myCommand

实例2：每小时的第3和第15分钟执行

        3,15 * * * * myCommand

实例3：在上午8点到11点的第3和第15分钟执行

        3,15 8-11 * * * myCommand

实例4：每隔两天的上午8点到11点的第3和第15分钟执行

        3,15 8-11 */2  *  * myCommand

实例5：每周一上午8点到11点的第3和第15分钟执行

    3,15 8-11 * * 1 myCommand

实例6：每晚的21:30重启smb

        30 21 * * * /etc/init.d/smb restart

实例7：每月1、10、22日的4 : 45重启smb

        45 4 1,10,22 * * /etc/init.d/smb restart

实例8：每周六、周日的1 : 10重启smb

        10 1 * * 6,0 /etc/init.d/smb restart

实例9：每天18 : 00至23 : 00之间每隔30分钟重启smb

        0,30 18-23 * * * /etc/init.d/smb restart

实例10：每星期六的晚上11 : 00 pm重启smb

        0 23 * * 6 /etc/init.d/smb restart

实例11：每一小时重启smb

        * */1 * * * /etc/init.d/smb restart

实例12：晚上11点到早上7点之间，每隔一小时重启smb

        * 23-7/1 * * * /etc/init.d/smb restart


其他注意事项:
--------

+ 新创建的cron job，不会马上执行，至少要过2分钟才执行。如果重启cron则马上执行。

+ 当crontab失效时，可以尝试/etc/init.d/crond restart解决问题。或者查看日志看某个job有没有执行/报错tail -f /var/log/cron。

+ 千万别乱运行crontab -r。它从Crontab目录（/var/spool/cron）中删除用户的Crontab文件。删除了该用户的所有crontab都没了。

+ 在crontab中%是有特殊含义的，表示换行的意思。如果要用的话必须进行转义%，如经常用的date ‘+%Y%m%d’在crontab里是不会执行的，应该换成date ‘+%Y%m%d’。

+ 更新系统时间时区后需要重启cron,在ubuntu中服务名为cron:

        $service cron restart

ubuntu下启动、停止与重启cron:

        $sudo /etc/init.d/cron start
        $sudo /etc/init.d/cron stop
        $sudo /etc/init.d/cron restart
