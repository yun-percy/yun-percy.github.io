---

title: 关于作死的java环境变量设置（linux）
category: Linux
---

###之前

> 以前一直用的是openjdk6，后来做解包的时候用的openjdk7，最近来了一套源码，竟然强制使用sun、oricle的java SE 1.6否则编译失败 ，去掉这个判断后发现容易出现各种莫名其妙的问题，于是决定乖乖的用 SE 1.6

+ 下载

去Oracle官网下载bin文件，最新的是6u45的，下载下来后执行

		chmod u+x jdk-6u45-linux-x64.bin
		./jdk-6u45-linux-x64.bin

+ 复制
将文件复制到系统中，需要权限：

		sudo mkdir -p /usr/lib/jvm
		sudo mv jdk1.6.0_45 /usr/lib/jvm/

+ 创建连接

		sudo update-alternatives --install "/usr/bin/java" "java" "/usr/lib/jvm/jdk1.6.0_45/bin/java" 1
		sudo update-alternatives --install "/usr/bin/javac" "javac" "/usr/lib/jvm/jdk1.6.0_45/bin/javac" 1
		sudo update-alternatives --install "/usr/bin/javah" "javah" "/usr/lib/jvm/jdk1.6.0_45/bin/javah" 1
		sudo update-alternatives --install "/usr/bin/javap" "javap" "/usr/lib/jvm/jdk1.6.0_45/bin/javap" 1
		sudo update-alternatives --install "/usr/bin/javadoc" "javadoc" "/usr/lib/jvm/jdk1.6.0_45/bin/javadoc" 1
		sudo update-alternatives --install "/usr/bin/jar" "jar" "/usr/lib/jvm/jdk1.6.0_45/bin/jar" 1

+ 多环境变量的处理：（可选）

		sudo update-alternatives --config java
		sudo update-alternatives --config javac
		sudo update-alternatives --config javah
		sudo update-alternatives --config javap
		sudo update-alternatives --config javadoc
		sudo update-alternatives --config jar

+ 完成！
