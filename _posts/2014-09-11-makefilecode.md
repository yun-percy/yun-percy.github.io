---
layout: post
title: Android.mk 变量讲解
category: android
---

####今天逛 @杨万荣 网站看到的。访问太慢，就直接clone文章，重新用markdown排了版。
[原文地址:http://sndnvaps.github.io/](http://sndnvaps.github.io/)




这些变量，你会经常在Android.mk文件中见到，下面以字表表的顺序列出来，并进行一一讲解其作用。<br>

+ LOCAL_  

这个变量会在每个模块(module,也可以解释为程序). 当出现 include $(CLEAR_VARS)变量的时候，它们当初设置的变量，会清空。在你使用的大部分变量中，它存在于模块中的定义都会像 LOCAL_variables(variables 为变量的名字)<br>

+ PRIVATE_  

这个是定义私有的变量。 只有有特别的模块中，这个变量才有起效。<br>
HOST_ 和 TARGET_    定义编译生成的文件是运行在什么平台的。<br> 
不要随便使用 HOST_ 或者是 TARGET_ 变量在你的makefile(对应的文件是Android.mk文件）文件中。<br>

+ BUILD_ 和 CLEAR_VARS    

变量 ， 它们是已经预先定义的模块makefile文件。
下面提供一个简单的例子: CLEAR_VARS 和 BUILD_HOST_PACKAGE 


----------------------------------------正式讲解-----------------------
------

+ LOCAL_ARM_MODE   

ARM使用的模式


+ LOCAL_ASSERT_FILES                         

Android.mk中定义的模块需要包含 'include $(BUILD_PACKAGE)' ，一般形式:

	LOCAL_ASSET_FILES += $(call find-subdir-assets)

+ LOCAL_C_INCLUDES                            

当编译C/C++文件的时候，这个变量指定的路径是用于编译器查找头文件的。例子:

	LOCAL_C_INCLUDES += extlibs/zlib-1.2.3

+ LOCAL_CC                      

如果你想使用第三方的C编译器，编译当前的程	序。就用LOCAL_CC设置第三方编译的位置

+ LOCAL_CERTIFICATE               

签名用的证书的名字 ，也可以用于指明特别的签名证书(例如自己创建的证书)
	
+ LOCAL_CFLAGS                     

如果需要给C/C++编译传递自己的参数，那么你就需要这个变量了。例子:

	LOCAL_CFLAGS += -DLIBBUILTS_NATIVE=1

+ LOCAL_COPY_HEADERS                        

用于复制头文件，需要和LOCAL_COPY_HEADRES_TO 变量一起使用

+ LOCAL_COPY_HEADERS_TO                     

需要和LOCAL_COPY_HEADERS 变量一起使用，用于复制头文件

+ LOCAL_CPP_EXTENSION                        

如果你的C++文件的后序不是cpp,而是其它的，你就需要用这个变量定义一下了。例子:

	LOCAL_CPP_EXTENSION := .cc 

+ LOCAL_CPPFLAGS                             

这个用于传递编译指令到唯一的C++编译器中。例子:

	LOCAL_CPPFLAGS += -ffriend-injection 
	
+ LOCAL_CPPFLAGS 

在编译器接收的指令中，迟于LOCAL_CFLAGS ,所以你可以用它来覆盖LOCAL_CFLAGS定义的指令

+ LOCAL_CXX                             

如果你想用第三方的C++编译器，编译当前的程序或者是模块，你可以使用这个变量，和变量LOCAL_CC的使用方法一样。	

+ LOCAL_FORCE_STATIC_EXECUTABLE        

如果你编译的程序，需要被链接成静态文件，不包含动态链接，作如下的设置: 

	LOCAL_FORCE_STATIC_EXECUTABLE := true 。 

这样编译出来的程序可以在没有动态库支持的根目录下面运行。

+ LOCAL_GENERATED_SOURCES              

后面的定义的变量，会被自动转换成你所需要的文件的格式

+ LOCAL_JAR_MANIFEST                     

定义jar文件需要用到的manifest文件

+ LOCAL_JAVA_LIBRARIES                   

当编译生成java程序或者是库文件的时候，LOCAL_JAVA_LIBRARIES, 定义的是要被编译成程序或者是库的文件。下面来一个简单的例子，需要链接的库文件为core 和 framework.

		LOCAL_JAVA_LIBRARIES := core framework

注意: 在Android.mk的模块中设置 LOCAL_JAVA_LIBRARIE ，一般不需要(或者不允许)当编译一个APK 程序，模块中包含了 "include $(BUILD_PACKAGE)"。 那么这些必要的核心文件会自动包含进去。

+ LOCAL_LDFLAGS                   

你可以往链接器(linker)传递一些自己的指令，通过设置 "LOCAL_LDFLAGS"。不过要时刻记住，传递到链接器的参数是非常重要的，必须要事件进行一些测试。
	
+ LOCAL_LDLIBS              

用于指定一些第三方的动态库或者是静态库文件，需要用-lxxx格式，这些文件不在你的编译计划中。例子:

	LOCAL_LDLIBS += -lcurses -lpthread
	LOCAL_LDLIBS += -Wl, -z,origin	

+ LOCAL_MODULE                  

"LOCAL_MODULE" 是一个你定义在Android.mk文件中的一个程序的名字。例如，库文件"libkjs", 相应的对应为: LOCAL_MODULE 是 "libkjs"(编译的平台会自动给它加上后序，例如 .so, .dylib, .dll)。对于 APK程序，将会使用LOCAL_PACKAGE_NAME 而不是 LOCAL_MODULE

+ LOCAL_MODULE_PATH              

告诉编译平台，如何把编译出来的程序或者是模块放到特定的位置。如果你需要定义这个变量，确保你同时定义了"LOCAL_UNSTRIPPED_PATH" 如果你编译生成的文件是可执行文件或者是动态库，这样就可以确保没有去符号(unstripped)链接的二进制文件有位置可去了。如果你没有进行定义，就有可能发生错误--------------

+ LOCAL_MODULE_TAGS              

用于指定生成的程序是什么类型的。有以下的几个变量：

		user: 将会使用 user/userdebug模式去编译程序
		eng:  将会使用 eng模式去编译程序
		tests: 将会使用testing模式编译程序
		optional: 不建议使用这个模式	

+ LOCAL_PACKAGE_NAME             

用于设置APK程序的名字，例如: Dialer, Contacts

+ LOCAL_POST_PROCESS_COMMAND     

用于生成本机的可执行文件，当程序被编译好后，你可以给它传递一条命令。下面是例子:

		module := $(HOST_OUT_EXECUTABLES)/$(LOCAL_MODULE)
		LOCAL_POST_PROCESS_COMMAND := /Developer/Tools/Rez -d __DARWIN__ -t APPL\
		-d __WXMAC__ -o $(module) Carbon.r 

+ LOCAL_PREBUILT_EXECUTABLES      

当Android.mk文件中包含 $(BUILD_PREBUILT) 或者是 $(BUILD_HOST_PREBUILT), 你可以使用这个变量去定义，你要复制到哪个目录。这样它就可以自动被复制到特定的目录了。

+ LOCAL_PREBUILT_LIBS            

解释和LOCAL_PREBUILT_EXECUTABLES 一样。
	
+ LOCAL_REQUIRED_MODULES        

不知道怎样解释，直接上英文:

		Set LOCAL_REQUIRED_MODULES to any number of whitespace-separated module names, like "libblah" or "Email". If this module is installed, all of the modules that it requires will be installed as well. This can be used to, e.g., ensure that necessary shared libraries or providers are installed when a given app is installed.

+ LOCAL_SDK_VERSION    

设置本地的sdk版本号

+ LOCAL_SHARED_LIBRARIES    

定义的内容为要链接的动态库的名字，不需要后序。例子:

	LOCAL_SHARED_LIBRARIES := \
		libutils \
		libui \
		libaudio \
		libexpat \
		libsgl 

+ LOCAL_SRC_FILES                

编译系统会查找 定义在LOCAL_SRC_FILES后面的值，去查找需要编译的源代码，例如 *.c, *.cpp, *.y, *.l, *.java。对于lex 和 yacc文件，需要定义一下传递的指令。如果是C/cpp，它会自动处理。如果包含的文件在二级目录下面，也可以直接进行定义。例子:

		LOCAL_SRC_FILES := \
		file1.cpp \
		dir/file2.cpp 

+ LOCAL_STATIC_LIBRARIES           

解释和LOCAL_SHARED_LIBRARIES大致一样。不过这次要链接的是静态库文件。

+ LOCAL_UNSTRIPPED_PATH             

定义放置没有去符号链接的文件的位置，如果你同时定义了LOCAL_MODULE_PATH ,而编译的程序是可执行程序或者是动态库文件。那么出现错误是在所难免的。

+ LOCAL_WHOLE_STATIC_LIBRARIES  

用于把静态库链接到程序中，而不允许链接器去掉其中没有用的符号链接。如果你想把静态库编译进动态库中，而在静态库中已经包含了动态库中的符号链接，这个时候就特别有用了。
例子:

		LOCAL_WHOLE_STATIC_LIBRARIES := \libsqlite3_android

+ LOCAL_YACCFLAGS                    

用于把编译指令传递给yacc模块。例子:

	LOCAL_YACCFLAGS := -p kjsyy