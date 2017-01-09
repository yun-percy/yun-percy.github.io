---
title: gradle 编译环境搭建（mac篇）
category: tools
tags:
  - gradle
  - mac
---

> 项目组提了一个需求，一个unity项目需要同时使用unity和gradle编译，而unity编译在mac下，权衡再三，决定在mac下搭建一个gradle的编译环境


下载
----

1. [官网下载地址](https://gradle.org/gradle-download/)
2. 选择版本号，这里选择 2.14.1的`Complete distribution`版本
3. 解压到存放工具的文件夹下面，这里`/data/tools/`

导入到环境中
----

+ 在 `~/.bash_profile`中将路径export到环境变量中去

```sh
export GRADE_HOME=/Users/Admin/gradle;
export PATH=$PATH:$GRADE_HOME/bin
```

+ 保存后重开终端，或者执行

```sh
. ~/.bash_profile
```

验证是否成功
----

`gradle -version`，若成功输出如下提示：

```
------------------------------------------------------------
Gradle 2.14.1
------------------------------------------------------------

Build time:   2016-07-18 06:38:37 UTC
Revision:     d9e2113d9fb05a5caabba61798bdb8dfdca83719

Groovy:       2.4.4
Ant:          Apache Ant(TM) version 1.9.6 compiled on June 29 2015
JVM:          1.8.0_73 (Oracle Corporation 25.73-b02)
OS:           Mac OS X 10.10.5 x86_64
```

SDK安装
-----

gradle安装好后，还是不够的，因为gradle需要依赖SDK和JDK

公司内部下载sdk:

[http://android.oa.com/SDKTools/](http://android.oa.com/SDKTools/)

解压后按照

[http://android.oa.com/include/usage.html](http://android.oa.com/include/usage.html)中说明设置代理
下载相对应的sdk

