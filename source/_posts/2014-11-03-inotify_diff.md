---

title: 文件夹检测，同步实例
category: Linux
---

> 为了防止被黑化，我这里只讲 如何利用inotify+shell+diff进行文件夹的监控，实现简单的同步功能。
> 至于还能做什么，自己摸索与揣测，可以用来自动化工作和做某种黑客的工具。

### inotify

百度百科的解释是：

> Inotify 是一个 Linux特性，它监控文件系统操作，比如读取、写入和创建。
> Inotify 反应灵敏，用法非常简单，并且比 cron 任务的繁忙轮询高效得多。
> 学习如何将 inotify 集成到您的应用程序中，并发现一组可用来进一步自动化系统治理的命令行工具。

__需求__ :

两个文件夹，要求在a中生成某个文件后，b中也会同时生成这个文件，a中删除后，b中也会删除，有点像link，但是这里不是通过link实现。要求两个文件实时同步

#### 安装inotify

		sudo apt-get install inotify-tools

#### 实现简单的实时检测对比同步：

		notifywait -rme modify,attrib,move,close_write,create,delete,delete_self ~/a | while read event
		do
			rm ~/b/*
			cp -r ~/a/* ~/b
			rm ~/b/syncxk*


这已经完全可以实现文件夹实时同步了，但是，出于性能的考虑，每次如此反复的删除和写入不仅损伤硬盘，还占用资源，浪费时间，所以我们可以使用 diff这个命令来实现同步。

### diff

百度百科的解释是：

> diff 命令比较文本文件。它能比较单个文件或者目录内容。
> diff 命令只有当输入为文本文件时才有效。
> 如果指定了 Directory1 和 Directory2 参数，diff 命令比较两个目录下名字相同的文本文件。列出不同的二进制文件、公共子目录和只在一个目录出现的文件。
> diff命令用于比较两个文件的差异，它可以被制作成补丁文件，使用patch命令对相应的文件打补丁。



### 后台启动：

nohup ./XKF/syncxk &
