---

title: ubuntu开机启动小键盘
category: Linux
---

开机启动小键盘的方法
---------


1.  安装numlockx：

        sudo apt-get install numlockx

2.  编辑配置文件：

        sudo gedit /etc/lightdm/lightdm.conf

最后一行加入：

        greeter-setup-script=/usr/bin/numlockx on

重启生效
