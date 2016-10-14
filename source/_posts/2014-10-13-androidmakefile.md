---

title: Android Makefile 编译过程讲解
category: Android
---

###android make 系统

+ arch
+ board
+ device
+ product

###Android.mk中的定义变量

+ include $(CLEAR_VARS)

它对应的是在./build/core/config.mk中的CLEAR_VARS:=$(BUILD_SYSTEM)/clear_vars.mk

+ include $(BUILD_PACKAGE)

它对应的是在./build/core/config.mk中的BUILD_PACKAGE:=$(BUILD_SYSTEM)/package.mk

+ 其它以此类推

###main.mk中的模块

<table style="margin: 0px; padding: 0px; border: 0px; font-family: inherit; font-style: inherit; font-variant: inherit; font-weight: inherit; line-height: inherit; font-size: 18px; vertical-align: baseline; border-collapse: collapse; border-spacing: 0px;">
    <tbody style="margin: 0px; padding: 0px; border: 0px; font-family: inherit; font-style: inherit; font-variant: inherit; font-weight: inherit; line-height: inherit; vertical-align: baseline;">
        <tr style="margin: 0px; padding: 0px; border: 0px; font-family: inherit; font-style: inherit; font-variant: inherit; font-weight: inherit; line-height: inherit; vertical-align: baseline;">
            <td class="gutter" style="margin: 0px; padding: 0px; border: 0px; font-family: inherit; font-style: inherit; font-variant: inherit; line-height: inherit; font-size: 18px; vertical-align: middle;">
            <pre class="line-numbers" style="margin-bottom: 0px; border-top-style: none; border-bottom-style: none; border-left-style: none; font-family: Menlo, Monaco, 'Andale Mono', 'lucida console', 'Courier New', monospace; font-style: inherit; font-variant: inherit; font-weight: inherit; line-height: 1.45em; font-size: 13px; vertical-align: baseline; -webkit-box-shadow: none; box-shadow: none; border-top-left-radius: 0px; border-top-right-radius: 0px; border-bottom-right-radius: 0px; border-bottom-left-radius: 0px; color: rgb(255, 255, 255); text-align: right; text-shadow: rgb(2, 16, 20) 0px -1px; padding: 0.8em !important; border-right-width: 1px !important; border-right-style: solid !important; border-right-color: rgb(0, 35, 44) !important; background-image: url(http://zh.lucida.me/images/noise.png?1388941295) !important; background-color: rgb(51, 51, 51) !important; background-position: 0% 0%;">1
2
3
4
5
6
7
8
9
10
11
12
13
14
15
</pre>
            </td>
            <td class="code" style="margin: 0px; padding: 0px; border: 0px; font-family: inherit; font-style: inherit; font-variant: inherit; line-height: inherit; font-size: 18px; vertical-align: middle; width: 4581px;">
            <pre style="margin-bottom: 0px; padding: 0px; border: none; font-family: Menlo, Monaco, 'Andale Mono', 'lucida console', 'Courier New', monospace; font-style: inherit; font-variant: inherit; font-weight: inherit; line-height: 1.45em; font-size: 13px; vertical-align: baseline; -webkit-box-shadow: none; box-shadow: none; background-image: none; border-top-left-radius: 0px; border-top-right-radius: 0px; border-bottom-right-radius: 0px; border-bottom-left-radius: 0px; color: rgb(220, 220, 222);"><code style="margin: 0px; padding: 0.8em; border: 0px; font-style: inherit; font-variant: inherit; font-weight: inherit; line-height: 1.45em; vertical-align: baseline; overflow-y: hidden; display: block; overflow-x: auto; background-color: rgb(41, 61, 73); font-family: Menlo, Monaco, 'Andale Mono', 'lucida console', 'Courier New', monospace !important;">.PHONY:checkbuilt
.PHONY:prebuilt
.PHONY: files
.PHONY: ramdisk
.PHONY: systemimage
.PHONY: userdataimage
.PHONY: bootimage
.PHONY: recoveryimage
.PHONY: droidcore
.PHONY: apps_only
.PHONY: sdk
.PHONY: clean
.PHONY: clobber
.PHONY: modules
.PHONY: showcommands</code></pre>
            </td>
        </tr>
    </tbody>
</table>

###makefile的文件结构

		LOCAL_PATH:=$(call my-dir) //获取当前目录
		#include $(CLEAR_VARS) //make系统为子模块定义了很多的私有变量，这个调用是为了初始化所有的私有变量
		...
		//里面的内容根据不同的需要会出现不同的LOCAL变量
		...
		#include $(BUILD_XXX) //执行编译任务

###编译apk

<table style="margin: 0px; padding: 0px; border: 0px; font-family: inherit; font-style: inherit; font-variant: inherit; font-weight: inherit; line-height: inherit; font-size: 18px; vertical-align: baseline; border-collapse: collapse; border-spacing: 0px;">
    <tbody style="margin: 0px; padding: 0px; border: 0px; font-family: inherit; font-style: inherit; font-variant: inherit; font-weight: inherit; line-height: inherit; vertical-align: baseline;">
        <tr style="margin: 0px; padding: 0px; border: 0px; font-family: inherit; font-style: inherit; font-variant: inherit; font-weight: inherit; line-height: inherit; vertical-align: baseline;">
            <td class="gutter" style="margin: 0px; padding: 0px; border: 0px; font-family: inherit; font-style: inherit; font-variant: inherit; line-height: inherit; font-size: 18px; vertical-align: middle;">
            <pre class="line-numbers" style="margin-bottom: 0px; border-top-style: none; border-bottom-style: none; border-left-style: none; font-family: Menlo, Monaco, 'Andale Mono', 'lucida console', 'Courier New', monospace; font-style: inherit; font-variant: inherit; font-weight: inherit; line-height: 1.45em; font-size: 13px; vertical-align: baseline; -webkit-box-shadow: none; box-shadow: none; border-top-left-radius: 0px; border-top-right-radius: 0px; border-bottom-right-radius: 0px; border-bottom-left-radius: 0px; color: rgb(255, 255, 255); text-align: right; text-shadow: rgb(2, 16, 20) 0px -1px; padding: 0.8em !important; border-right-width: 1px !important; border-right-style: solid !important; border-right-color: rgb(0, 35, 44) !important; background-image: url(http://zh.lucida.me/images/noise.png?1388941295) !important; background-color: rgb(51, 51, 51) !important; background-position: 0% 0%;">1
2
3
</pre>
            </td>
            <td class="code" style="margin: 0px; padding: 0px; border: 0px; font-family: inherit; font-style: inherit; font-variant: inherit; line-height: inherit; font-size: 18px; vertical-align: middle; width: 4581px;">
            <pre style="margin-bottom: 0px; padding: 0px; border: none; font-family: Menlo, Monaco, 'Andale Mono', 'lucida console', 'Courier New', monospace; font-style: inherit; font-variant: inherit; font-weight: inherit; line-height: 1.45em; font-size: 13px; vertical-align: baseline; -webkit-box-shadow: none; box-shadow: none; background-image: none; border-top-left-radius: 0px; border-top-right-radius: 0px; border-bottom-right-radius: 0px; border-bottom-left-radius: 0px; color: rgb(220, 220, 222);"><code style="margin: 0px; padding: 0.8em; border: 0px; font-style: inherit; font-variant: inherit; font-weight: inherit; line-height: 1.45em; vertical-align: baseline; overflow-y: hidden; display: block; overflow-x: auto; background-color: rgb(41, 61, 73); font-family: Menlo, Monaco, 'Andale Mono', 'lucida console', 'Courier New', monospace !important;">LOCAL_SRC_FILES:=$(call all-subdir-java-files)
LOCAL_PACKAGE_NAME:=packageName
include $(BUILD_PACKAGE)
</code></pre>
            </td>
        </tr>
    </tbody>
</table>

###编译依赖静态java库的应用程序

<table style="margin: 0px; padding: 0px; border: 0px; font-family: inherit; font-style: inherit; font-variant: inherit; font-weight: inherit; line-height: inherit; font-size: 18px; vertical-align: baseline; border-collapse: collapse; border-spacing: 0px;">
    <tbody style="margin: 0px; padding: 0px; border: 0px; font-family: inherit; font-style: inherit; font-variant: inherit; font-weight: inherit; line-height: inherit; vertical-align: baseline;">
        <tr style="margin: 0px; padding: 0px; border: 0px; font-family: inherit; font-style: inherit; font-variant: inherit; font-weight: inherit; line-height: inherit; vertical-align: baseline;">
            <td class="gutter" style="margin: 0px; padding: 0px; border: 0px; font-family: inherit; font-style: inherit; font-variant: inherit; line-height: inherit; font-size: 18px; vertical-align: middle;">
            <pre class="line-numbers" style="margin-bottom: 0px; border-top-style: none; border-bottom-style: none; border-left-style: none; font-family: Menlo, Monaco, 'Andale Mono', 'lucida console', 'Courier New', monospace; font-style: inherit; font-variant: inherit; font-weight: inherit; line-height: 1.45em; font-size: 13px; vertical-align: baseline; -webkit-box-shadow: none; box-shadow: none; border-top-left-radius: 0px; border-top-right-radius: 0px; border-bottom-right-radius: 0px; border-bottom-left-radius: 0px; color: rgb(255, 255, 255); text-align: right; text-shadow: rgb(2, 16, 20) 0px -1px; padding: 0.8em !important; border-right-width: 1px !important; border-right-style: solid !important; border-right-color: rgb(0, 35, 44) !important; background-image: url(http://zh.lucida.me/images/noise.png?1388941295) !important; background-color: rgb(51, 51, 51) !important; background-position: 0% 0%;">1
2
3
4
</pre>
            </td>
            <td class="code" style="margin: 0px; padding: 0px; border: 0px; font-family: inherit; font-style: inherit; font-variant: inherit; line-height: inherit; font-size: 18px; vertical-align: middle; width: 4581px;">
            <pre style="margin-bottom: 0px; padding: 0px; border: none; font-family: Menlo, Monaco, 'Andale Mono', 'lucida console', 'Courier New', monospace; font-style: inherit; font-variant: inherit; font-weight: inherit; line-height: 1.45em; font-size: 13px; vertical-align: baseline; -webkit-box-shadow: none; box-shadow: none; background-image: none; border-top-left-radius: 0px; border-top-right-radius: 0px; border-bottom-right-radius: 0px; border-bottom-left-radius: 0px; color: rgb(220, 220, 222);"><code style="margin: 0px; padding: 0.8em; border: 0px; font-style: inherit; font-variant: inherit; font-weight: inherit; line-height: 1.45em; vertical-align: baseline; overflow-y: hidden; display: block; overflow-x: auto; background-color: rgb(41, 61, 73); font-family: Menlo, Monaco, 'Andale Mono', 'lucida console', 'Courier New', monospace !important;">LOCAL_STATIC_JAVA_LIBRARIES:=static-library
LOCAL_SRC_FILES:=$(call all-subdir-java-files)
LOCAL_PACKAGE_NAME:=packageName
include $(BUILD_PACKAGE)</code></pre>
            </td>
        </tr>
    </tbody>
</table>

###编译一个需要用平台key签名的应用程序

<table style="margin: 0px; padding: 0px; border: 0px; font-family: inherit; font-style: inherit; font-variant: inherit; font-weight: inherit; line-height: inherit; font-size: 18px; vertical-align: baseline; border-collapse: collapse; border-spacing: 0px;">
    <tbody style="margin: 0px; padding: 0px; border: 0px; font-family: inherit; font-style: inherit; font-variant: inherit; font-weight: inherit; line-height: inherit; vertical-align: baseline;">
        <tr style="margin: 0px; padding: 0px; border: 0px; font-family: inherit; font-style: inherit; font-variant: inherit; font-weight: inherit; line-height: inherit; vertical-align: baseline;">
            <td class="gutter" style="margin: 0px; padding: 0px; border: 0px; font-family: inherit; font-style: inherit; font-variant: inherit; line-height: inherit; font-size: 18px; vertical-align: middle;">
            <pre class="line-numbers" style="margin-bottom: 0px; border-top-style: none; border-bottom-style: none; border-left-style: none; font-family: Menlo, Monaco, 'Andale Mono', 'lucida console', 'Courier New', monospace; font-style: inherit; font-variant: inherit; font-weight: inherit; line-height: 1.45em; font-size: 13px; vertical-align: baseline; -webkit-box-shadow: none; box-shadow: none; border-top-left-radius: 0px; border-top-right-radius: 0px; border-bottom-right-radius: 0px; border-bottom-left-radius: 0px; color: rgb(255, 255, 255); text-align: right; text-shadow: rgb(2, 16, 20) 0px -1px; padding: 0.8em !important; border-right-width: 1px !important; border-right-style: solid !important; border-right-color: rgb(0, 35, 44) !important; background-image: url(http://zh.lucida.me/images/noise.png?1388941295) !important; background-color: rgb(51, 51, 51) !important; background-position: 0% 0%;">1
2
3
4
</pre>
            </td>
            <td class="code" style="margin: 0px; padding: 0px; border: 0px; font-family: inherit; font-style: inherit; font-variant: inherit; line-height: inherit; font-size: 18px; vertical-align: middle; width: 4581px;">
            <pre style="margin-bottom: 0px; padding: 0px; border: none; font-family: Menlo, Monaco, 'Andale Mono', 'lucida console', 'Courier New', monospace; font-style: inherit; font-variant: inherit; font-weight: inherit; line-height: 1.45em; font-size: 13px; vertical-align: baseline; -webkit-box-shadow: none; box-shadow: none; background-image: none; border-top-left-radius: 0px; border-top-right-radius: 0px; border-bottom-right-radius: 0px; border-bottom-left-radius: 0px; color: rgb(220, 220, 222);"><code style="margin: 0px; padding: 0.8em; border: 0px; font-style: inherit; font-variant: inherit; font-weight: inherit; line-height: 1.45em; vertical-align: baseline; overflow-y: hidden; display: block; overflow-x: auto; background-color: rgb(41, 61, 73); font-family: Menlo, Monaco, 'Andale Mono', 'lucida console', 'Courier New', monospace !important;">LOCAL_SRC_FILES:=$(call all-subdir-java-files)
LOCAL_PACKAGE_NAME:=packageName
LOCAL_CERTIFICATE:=platform
include $(BUILD_PACKAGE)</code></pre>
            </td>
        </tr>
    </tbody>
</table>

###编译一个需要特定key的应用程序

<table style="margin: 0px; padding: 0px; border: 0px; font-family: inherit; font-style: inherit; font-variant: inherit; font-weight: inherit; line-height: inherit; font-size: 18px; vertical-align: baseline; border-collapse: collapse; border-spacing: 0px;">
    <tbody style="margin: 0px; padding: 0px; border: 0px; font-family: inherit; font-style: inherit; font-variant: inherit; font-weight: inherit; line-height: inherit; vertical-align: baseline;">
        <tr style="margin: 0px; padding: 0px; border: 0px; font-family: inherit; font-style: inherit; font-variant: inherit; font-weight: inherit; line-height: inherit; vertical-align: baseline;">
            <td class="gutter" style="margin: 0px; padding: 0px; border: 0px; font-family: inherit; font-style: inherit; font-variant: inherit; line-height: inherit; font-size: 18px; vertical-align: middle;">
            <pre class="line-numbers" style="margin-bottom: 0px; border-top-style: none; border-bottom-style: none; border-left-style: none; font-family: Menlo, Monaco, 'Andale Mono', 'lucida console', 'Courier New', monospace; font-style: inherit; font-variant: inherit; font-weight: inherit; line-height: 1.45em; font-size: 13px; vertical-align: baseline; -webkit-box-shadow: none; box-shadow: none; border-top-left-radius: 0px; border-top-right-radius: 0px; border-bottom-right-radius: 0px; border-bottom-left-radius: 0px; color: rgb(255, 255, 255); text-align: right; text-shadow: rgb(2, 16, 20) 0px -1px; padding: 0.8em !important; border-right-width: 1px !important; border-right-style: solid !important; border-right-color: rgb(0, 35, 44) !important; background-image: url(http://zh.lucida.me/images/noise.png?1388941295) !important; background-color: rgb(51, 51, 51) !important; background-position: 0% 0%;">1
2
3
4
</pre>
            </td>
            <td class="code" style="margin: 0px; padding: 0px; border: 0px; font-family: inherit; font-style: inherit; font-variant: inherit; line-height: inherit; font-size: 18px; vertical-align: middle; width: 4581px;">
            <pre style="margin-bottom: 0px; padding: 0px; border: none; font-family: Menlo, Monaco, 'Andale Mono', 'lucida console', 'Courier New', monospace; font-style: inherit; font-variant: inherit; font-weight: inherit; line-height: 1.45em; font-size: 13px; vertical-align: baseline; -webkit-box-shadow: none; box-shadow: none; background-image: none; border-top-left-radius: 0px; border-top-right-radius: 0px; border-bottom-right-radius: 0px; border-bottom-left-radius: 0px; color: rgb(220, 220, 222);"><code style="margin: 0px; padding: 0.8em; border: 0px; font-style: inherit; font-variant: inherit; font-weight: inherit; line-height: 1.45em; vertical-align: baseline; overflow-y: hidden; display: block; overflow-x: auto; background-color: rgb(41, 61, 73); font-family: Menlo, Monaco, 'Andale Mono', 'lucida console', 'Courier New', monospace !important;">LOCAL_SRC_FILES := $(call all-subdir-java-files)
LOCAL_PACKAGE_NAME := LocalPackage
LOCAL_CERTIFICATE := vendor/example/certs/app
include $(BUILD_PACKAGE)</code></pre>
            </td>
        </tr>
    </tbody>
</table>

###添加一个预编译应用程序

<table style="margin: 0px; padding: 0px; border: 0px; font-family: inherit; font-style: inherit; font-variant: inherit; font-weight: inherit; line-height: inherit; font-size: 18px; vertical-align: baseline; border-collapse: collapse; border-spacing: 0px;">
    <tbody style="margin: 0px; padding: 0px; border: 0px; font-family: inherit; font-style: inherit; font-variant: inherit; font-weight: inherit; line-height: inherit; vertical-align: baseline;">
        <tr style="margin: 0px; padding: 0px; border: 0px; font-family: inherit; font-style: inherit; font-variant: inherit; font-weight: inherit; line-height: inherit; vertical-align: baseline;">
            <td class="gutter" style="margin: 0px; padding: 0px; border: 0px; font-family: inherit; font-style: inherit; font-variant: inherit; line-height: inherit; font-size: 18px; vertical-align: middle;">
            <pre class="line-numbers" style="margin-bottom: 0px; border-top-style: none; border-bottom-style: none; border-left-style: none; font-family: Menlo, Monaco, 'Andale Mono', 'lucida console', 'Courier New', monospace; font-style: inherit; font-variant: inherit; font-weight: inherit; line-height: 1.45em; font-size: 13px; vertical-align: baseline; -webkit-box-shadow: none; box-shadow: none; border-top-left-radius: 0px; border-top-right-radius: 0px; border-bottom-right-radius: 0px; border-bottom-left-radius: 0px; color: rgb(255, 255, 255); text-align: right; text-shadow: rgb(2, 16, 20) 0px -1px; padding: 0.8em !important; border-right-width: 1px !important; border-right-style: solid !important; border-right-color: rgb(0, 35, 44) !important; background-image: url(http://zh.lucida.me/images/noise.png?1388941295) !important; background-color: rgb(51, 51, 51) !important; background-position: 0% 0%;">1
2
3
4
5
6
7
8
9
</pre>
            </td>
            <td class="code" style="margin: 0px; padding: 0px; border: 0px; font-family: inherit; font-style: inherit; font-variant: inherit; line-height: inherit; font-size: 18px; vertical-align: middle; width: 4581px;">
            <pre style="margin-bottom: 0px; padding: 0px; border: none; font-family: Menlo, Monaco, 'Andale Mono', 'lucida console', 'Courier New', monospace; font-style: inherit; font-variant: inherit; font-weight: inherit; line-height: 1.45em; font-size: 13px; vertical-align: baseline; -webkit-box-shadow: none; box-shadow: none; background-image: none; border-top-left-radius: 0px; border-top-right-radius: 0px; border-bottom-right-radius: 0px; border-bottom-left-radius: 0px; color: rgb(220, 220, 222);"><code style="margin: 0px; padding: 0.8em; border: 0px; font-style: inherit; font-variant: inherit; font-weight: inherit; line-height: 1.45em; vertical-align: baseline; overflow-y: hidden; display: block; overflow-x: auto; background-color: rgb(41, 61, 73); font-family: Menlo, Monaco, 'Andale Mono', 'lucida console', 'Courier New', monospace !important;">LOCAL_SRC_FILES := $(LOCAL_MODULE).apk
LOCAL_MODULE := LocalModuleName
LOCAL_MODULE_CLASS := APPS
LOCAL_MODULE_SUFFIX := $(COMMON_ANDROID_PACKAGE_SUFFIX)
include $(BUILD_PREBUILT)
LOCAL_SRC_FILES := $(call all-subdir-java-files)
LOCAL_JAVA_LIBRARIES := android.test.runner
LOCAL_MODULE := sample
include $(BUILD_STATIC_JAVA_LIBRARY) </code></pre>
            </td>
        </tr>
    </tbody>
</table>

###常用的mk分类

+ Android.mk 用来编译模块或者apk的，module对应native code，package对应于java
+ AndroidProducts.mk 设置product，设置系统包含了那些应用target_<os>-<arch>.mk，host_<os>-<arch>.mk，<os>-<arch>.mk 针对不同的系统和CPU架框进行设置
+BoardConfig.mk 设置主板用的，比如driver的选择

+ ./build/core/Makefile 定义了image是如何生成的

+ frameworks/base/core/java 扩展SDK时，可以向里面添加自己的类

###make参数

+ . build/envsetup.sh 可以设置环境，运行之后会支持mm命令，使make支持只编译一个模块
<br>
用户也可以通过mm来编译指定模块，或者通过make clean-module_name来删除指定模块。

+ make ONE_SHOT_MAKEFILE=<path to Androiod.mk>

通过CREATE_MODULE_INFO_FILE，build system会将所有的模块信息列在$(PRODUCT_OUT)/module-info.txt中

+ make CREATE_MODULE_INFO_FILE=true 产生单个的image文件，用以早期的硬件测试

HOST_BUILD_TYPE 和 TARGET_BUILD_TYPE 用来设置是debug还是release，debug的带有调试信息，这两个参数也可以在 buildspec.mk中进行设置以防止在别处被重复指定


+ 其它的一些变量

<table style="margin: 0px; padding: 0px; border: 0px; font-family: inherit; font-style: inherit; font-variant: inherit; font-weight: inherit; line-height: inherit; font-size: 18px; vertical-align: baseline; border-collapse: collapse; border-spacing: 0px;">
    <tbody style="margin: 0px; padding: 0px; border: 0px; font-family: inherit; font-style: inherit; font-variant: inherit; font-weight: inherit; line-height: inherit; vertical-align: baseline;">
        <tr style="margin: 0px; padding: 0px; border: 0px; font-family: inherit; font-style: inherit; font-variant: inherit; font-weight: inherit; line-height: inherit; vertical-align: baseline;">
            <td class="gutter" style="margin: 0px; padding: 0px; border: 0px; font-family: inherit; font-style: inherit; font-variant: inherit; line-height: inherit; font-size: 18px; vertical-align: middle;">
            <pre class="line-numbers" style="margin-bottom: 0px; border-top-style: none; border-bottom-style: none; border-left-style: none; font-family: Menlo, Monaco, 'Andale Mono', 'lucida console', 'Courier New', monospace; font-style: inherit; font-variant: inherit; font-weight: inherit; line-height: 1.45em; font-size: 13px; vertical-align: baseline; -webkit-box-shadow: none; box-shadow: none; border-top-left-radius: 0px; border-top-right-radius: 0px; border-bottom-right-radius: 0px; border-bottom-left-radius: 0px; color: rgb(255, 255, 255); text-align: right; text-shadow: rgb(2, 16, 20) 0px -1px; padding: 0.8em !important; border-right-width: 1px !important; border-right-style: solid !important; border-right-color: rgb(0, 35, 44) !important; background-image: url(http://zh.lucida.me/images/noise.png?1388941295) !important; background-color: rgb(51, 51, 51) !important; background-position: 0% 0%;">1
2
3
4
5
6
7
8
9
10
11
12
13
14
15
16
17
18
19
20
21
22
23
24
25
</pre>
            </td>
            <td class="code" style="margin: 0px; padding: 0px; border: 0px; font-family: inherit; font-style: inherit; font-variant: inherit; line-height: inherit; font-size: 18px; vertical-align: middle; width: 4581px;">
            <pre style="margin-bottom: 0px; padding: 0px; border: none; font-family: Menlo, Monaco, 'Andale Mono', 'lucida console', 'Courier New', monospace; font-style: inherit; font-variant: inherit; font-weight: inherit; line-height: 1.45em; font-size: 13px; vertical-align: baseline; -webkit-box-shadow: none; box-shadow: none; background-image: none; border-top-left-radius: 0px; border-top-right-radius: 0px; border-bottom-right-radius: 0px; border-bottom-left-radius: 0px; color: rgb(220, 220, 222);"><code style="margin: 0px; padding: 0.8em; border: 0px; font-style: inherit; font-variant: inherit; font-weight: inherit; line-height: 1.45em; vertical-align: baseline; overflow-y: hidden; display: block; overflow-x: auto; background-color: rgb(41, 61, 73); font-family: Menlo, Monaco, 'Andale Mono', 'lucida console', 'Courier New', monospace !important;">LOCAL_AAPT_FLAGS
LOCAL_ACP_UNAVAILABL
LOCAL_ADDITIONAL_JAVA_DIR
LOCAL_AIDL_INCLUDES
LOCAL_ALLOW_UNDEFINED_SYMBOLS
LOCAL_ARM_MODE
LOCAL_ASFLAGS
LOCAL_ASSET_DIR
LOCAL_ASSET_FILES 在与BUILD_PACKAGE一起时有效，表示资源文件
LOCAL_BUILT_MODULE_STEM
LOCAL_C_INCLUDES 用来指定外面的头文件路径
LOCAL_CC 可以指定C编译器
LOCAL_JAR_MANIFEST
LOCAL_JARJAR_RULES
LOCAL_JAR_PATH
LOCAL_SHARED_LIBRARIES 可链接动态库
LOCAL_SRC_FILES 编译源文件
LOCAL_STATIC_JAVA_LIBRARIES
LOCAL_STATIC_LIBRARIES 可链接静态库
LOCAL_UNINSTALLABLE_MODULE
LOCAL_WHOLE_STATIC_LIBRARIES 禁止在连接时删除库中的无用代码
LOCAL_FORCE_STATIC_EXECUTABLE 如果编译的可执行程序要进行静态链接(执行时不依赖于任何动态库)
LOCAL_JAVA_LIBRARIES 编译java应用程序和库的时候指定包含的java类库，目前有core和framework两种
                     多数情况下定义成：LOCAL_JAVA_LIBRARIES := core framework
                     注意LOCAL_JAVA_LIBRARIES不是必须的，而且编译APK时不允许定义(系统会自动添加)
</code></pre>
            </td>
        </tr>
    </tbody>
</table>


+ envsetup.mk会读取由envsetup.sh写入环境变量中的一些变量来配置 编译过程中的输出目录
+ config.mk里面定义了各种module所需要的工具，以及如何来编译各个模块

<table style="margin: 0px; padding: 0px; border: 0px; font-family: inherit; font-style: inherit; font-variant: inherit; font-weight: inherit; line-height: inherit; font-size: 18px; vertical-align: baseline; border-collapse: collapse; border-spacing: 0px;">
    <tbody style="margin: 0px; padding: 0px; border: 0px; font-family: inherit; font-style: inherit; font-variant: inherit; font-weight: inherit; line-height: inherit; vertical-align: baseline;">
        <tr style="margin: 0px; padding: 0px; border: 0px; font-family: inherit; font-style: inherit; font-variant: inherit; font-weight: inherit; line-height: inherit; vertical-align: baseline;">
            <td class="gutter" style="margin: 0px; padding: 0px; border: 0px; font-family: inherit; font-style: inherit; font-variant: inherit; line-height: inherit; font-size: 18px; vertical-align: middle;">
            <pre class="line-numbers" style="margin-bottom: 0px; border-top-style: none; border-bottom-style: none; border-left-style: none; font-family: Menlo, Monaco, 'Andale Mono', 'lucida console', 'Courier New', monospace; font-style: inherit; font-variant: inherit; font-weight: inherit; line-height: 1.45em; font-size: 13px; vertical-align: baseline; -webkit-box-shadow: none; box-shadow: none; border-top-left-radius: 0px; border-top-right-radius: 0px; border-bottom-right-radius: 0px; border-bottom-left-radius: 0px; color: rgb(255, 255, 255); text-align: right; text-shadow: rgb(2, 16, 20) 0px -1px; padding: 0.8em !important; border-right-width: 1px !important; border-right-style: solid !important; border-right-color: rgb(0, 35, 44) !important; background-image: url(http://zh.lucida.me/images/noise.png?1388941295) !important; background-color: rgb(51, 51, 51) !important; background-position: 0% 0%;">1
2
3
4
5
6
7
8
9
10
11
12
13
14
15
16
17
18
19
20
</pre>
            </td>
            <td class="code" style="margin: 0px; padding: 0px; border: 0px; font-family: inherit; font-style: inherit; font-variant: inherit; line-height: inherit; font-size: 18px; vertical-align: middle; width: 4581px;">
            <pre style="margin-bottom: 0px; padding: 0px; border: none; font-family: Menlo, Monaco, 'Andale Mono', 'lucida console', 'Courier New', monospace; font-style: inherit; font-variant: inherit; font-weight: inherit; line-height: 1.45em; font-size: 13px; vertical-align: baseline; -webkit-box-shadow: none; box-shadow: none; background-image: none; border-top-left-radius: 0px; border-top-right-radius: 0px; border-bottom-right-radius: 0px; border-bottom-left-radius: 0px; color: rgb(220, 220, 222);"><code style="margin: 0px; padding: 0.8em; border: 0px; font-style: inherit; font-variant: inherit; font-weight: inherit; line-height: 1.45em; vertical-align: baseline; overflow-y: hidden; display: block; overflow-x: auto; background-color: rgb(41, 61, 73); font-family: Menlo, Monaco, 'Andale Mono', 'lucida console', 'Courier New', monospace !important;">CLEAR_VARS:= $(BUILD_SYSTEM)/clear_vars.mk
BUILD_HOST_STATIC_LIBRARY:= $(BUILD_SYSTEM)/host_static_library.mk
BUILD_HOST_SHARED_LIBRARY:= $(BUILD_SYSTEM)/host_shared_library.mk
BUILD_STATIC_LIBRARY:= $(BUILD_SYSTEM)/static_library.mk
BUILD_RAW_STATIC_LIBRARY := $(BUILD_SYSTEM)/raw_static_library.mk
BUILD_SHARED_LIBRARY:= $(BUILD_SYSTEM)/shared_library.mk
BUILD_EXECUTABLE:= $(BUILD_SYSTEM)/executable.mk
BUILD_RAW_EXECUTABLE:= $(BUILD_SYSTEM)/raw_executable.mk
BUILD_HOST_EXECUTABLE:= $(BUILD_SYSTEM)/host_executable.mk
BUILD_PACKAGE:= $(BUILD_SYSTEM)/package.mk
BUILD_HOST_PREBUILT:= $(BUILD_SYSTEM)/host_prebuilt.mk
BUILD_PREBUILT:= $(BUILD_SYSTEM)/prebuilt.mk
BUILD_MULTI_PREBUILT:= $(BUILD_SYSTEM)/multi_prebuilt.mk
BUILD_JAVA_LIBRARY:= $(BUILD_SYSTEM)/java_library.mk
BUILD_STATIC_JAVA_LIBRARY:= $(BUILD_SYSTEM)/static_java_library.mk
BUILD_HOST_JAVA_LIBRARY:= $(BUILD_SYSTEM)/host_java_library.mk
BUILD_DROIDDOC:= $(BUILD_SYSTEM)/droiddoc.mk
BUILD_COPY_HEADERS := $(BUILD_SYSTEM)/copy_headers.mk
BUILD_KEY_CHAR_MAP := $(BUILD_SYSTEM)/key_char_map.mk
以上的*.mk中都包含了base_rules.mk</code></pre>
            </td>
        </tr>
    </tbody>
</table>

+ products设置

./build/target/product/AndroidProducts.mk

+ module设置

native code和java的一些通用方法都在./build/core/definitions.mk中

BUILD_SHARE_xxx等变量在./build/core/config.mk中

+ Board设置

./build/target/board/$(TARGET_DEVICE)/BoardConfig.mk
./vendor/*/$(TARGET_DEVICE)/BoardConfig.mk

+ rules相关

与 LOCAL_MODULE_TAGS相关的定义

<table style="margin: 0px; padding: 0px; border: 0px; font-family: inherit; font-style: inherit; font-variant: inherit; font-weight: inherit; line-height: inherit; font-size: 18px; vertical-align: baseline; border-collapse: collapse; border-spacing: 0px;">
    <tbody style="margin: 0px; padding: 0px; border: 0px; font-family: inherit; font-style: inherit; font-variant: inherit; font-weight: inherit; line-height: inherit; vertical-align: baseline;">
        <tr style="margin: 0px; padding: 0px; border: 0px; font-family: inherit; font-style: inherit; font-variant: inherit; font-weight: inherit; line-height: inherit; vertical-align: baseline;">
            <td class="gutter" style="margin: 0px; padding: 0px; border: 0px; font-family: inherit; font-style: inherit; font-variant: inherit; line-height: inherit; font-size: 18px; vertical-align: middle;">
            <pre class="line-numbers" style="margin-bottom: 0px; border-top-style: none; border-bottom-style: none; border-left-style: none; font-family: Menlo, Monaco, 'Andale Mono', 'lucida console', 'Courier New', monospace; font-style: inherit; font-variant: inherit; font-weight: inherit; line-height: 1.45em; font-size: 13px; vertical-align: baseline; -webkit-box-shadow: none; box-shadow: none; border-top-left-radius: 0px; border-top-right-radius: 0px; border-bottom-right-radius: 0px; border-bottom-left-radius: 0px; color: rgb(255, 255, 255); text-align: right; text-shadow: rgb(2, 16, 20) 0px -1px; padding: 0.8em !important; border-right-width: 1px !important; border-right-style: solid !important; border-right-color: rgb(0, 35, 44) !important; background-image: url(http://zh.lucida.me/images/noise.png?1388941295) !important; background-color: rgb(51, 51, 51) !important; background-position: 0% 0%;">1
2
3
</pre>
            </td>
            <td class="code" style="margin: 0px; padding: 0px; border: 0px; font-family: inherit; font-style: inherit; font-variant: inherit; line-height: inherit; font-size: 18px; vertical-align: middle; width: 4581px;">
            <pre style="margin-bottom: 0px; padding: 0px; border: none; font-family: Menlo, Monaco, 'Andale Mono', 'lucida console', 'Courier New', monospace; font-style: inherit; font-variant: inherit; font-weight: inherit; line-height: 1.45em; font-size: 13px; vertical-align: baseline; -webkit-box-shadow: none; box-shadow: none; background-image: none; border-top-left-radius: 0px; border-top-right-radius: 0px; border-bottom-right-radius: 0px; border-bottom-left-radius: 0px; color: rgb(220, 220, 222);"><code style="margin: 0px; padding: 0.8em; border: 0px; font-style: inherit; font-variant: inherit; font-weight: inherit; line-height: 1.45em; vertical-align: baseline; overflow-y: hidden; display: block; overflow-x: auto; background-color: rgb(41, 61, 73); font-family: Menlo, Monaco, 'Andale Mono', 'lucida console', 'Courier New', monospace !important;">include $(BUILD_STATIC_LIBRARY) 编译成静态库
include $(BUILD_SHARED_LIBRARY) 编译成动态库。
include $(BUILD_EXECUTABLE) 编译成可执行程序</code></pre>
            </td>
        </tr>
    </tbody>
</table>


###常用函数

<table style="margin: 0px; padding: 0px; border: 0px; font-family: inherit; font-style: inherit; font-variant: inherit; font-weight: inherit; line-height: inherit; font-size: 18px; vertical-align: baseline; border-collapse: collapse; border-spacing: 0px;">
    <tbody style="margin: 0px; padding: 0px; border: 0px; font-family: inherit; font-style: inherit; font-variant: inherit; font-weight: inherit; line-height: inherit; vertical-align: baseline;">
        <tr style="margin: 0px; padding: 0px; border: 0px; font-family: inherit; font-style: inherit; font-variant: inherit; font-weight: inherit; line-height: inherit; vertical-align: baseline;">
            <td class="gutter" style="margin: 0px; padding: 0px; border: 0px; font-family: inherit; font-style: inherit; font-variant: inherit; line-height: inherit; font-size: 18px; vertical-align: middle;">
            <pre class="line-numbers" style="margin-bottom: 0px; border-top-style: none; border-bottom-style: none; border-left-style: none; font-family: Menlo, Monaco, 'Andale Mono', 'lucida console', 'Courier New', monospace; font-style: inherit; font-variant: inherit; font-weight: inherit; line-height: 1.45em; font-size: 13px; vertical-align: baseline; -webkit-box-shadow: none; box-shadow: none; border-top-left-radius: 0px; border-top-right-radius: 0px; border-bottom-right-radius: 0px; border-bottom-left-radius: 0px; color: rgb(255, 255, 255); text-align: right; text-shadow: rgb(2, 16, 20) 0px -1px; padding: 0.8em !important; border-right-width: 1px !important; border-right-style: solid !important; border-right-color: rgb(0, 35, 44) !important; background-image: url(http://zh.lucida.me/images/noise.png?1388941295) !important; background-color: rgb(51, 51, 51) !important; background-position: 0% 0%;">1
2
3
4
5
6
7
8
9
10
11
12
13
14
15
16
17
18
19
20
21
22
23
24
25
26
27
</pre>
            </td>
            <td class="code" style="margin: 0px; padding: 0px; border: 0px; font-family: inherit; font-style: inherit; font-variant: inherit; line-height: inherit; font-size: 18px; vertical-align: middle; width: 4581px;">
            <pre style="margin-bottom: 0px; padding: 0px; border: none; font-family: Menlo, Monaco, 'Andale Mono', 'lucida console', 'Courier New', monospace; font-style: inherit; font-variant: inherit; font-weight: inherit; line-height: 1.45em; font-size: 13px; vertical-align: baseline; -webkit-box-shadow: none; box-shadow: none; background-image: none; border-top-left-radius: 0px; border-top-right-radius: 0px; border-bottom-right-radius: 0px; border-bottom-left-radius: 0px; color: rgb(220, 220, 222);"><code style="margin: 0px; padding: 0.8em; border: 0px; font-style: inherit; font-variant: inherit; font-weight: inherit; line-height: 1.45em; vertical-align: baseline; overflow-y: hidden; display: block; overflow-x: auto; background-color: rgb(41, 61, 73); font-family: Menlo, Monaco, 'Andale Mono', 'lucida console', 'Courier New', monospace !important;">call my-dir
call all-subdir-java-files
call all-java-files-under
call all-makefiles-under,$(LOCAL_PATH)
call all-clean-step
call import-module,android/native_app_glue
call inherit-product,xxx.mk
call inherit-product-if-exists
call device-test
call include-path-for,libpagemap
call dist-for-goals,dist_files,$(LOCAL_BUILT_MODULE)
call _add-charger-image,$(_img)
call libfilterfw-all-java-files-under,$(1)
call libfilterfw_to_document,$(LOCAL_PATH)
call intermediates-dir-for,EXECUTABLES,$(LOCAL_MODULE,true)
call all-named-subdir-makefiles,$(legacy_modules)
call RM;call MKDIR
call emugl-begin-host-shared-library,libEGL_translator
call emugl-import,libOpenglOsUtils
call emugl-end-module
call emugl-export,LDLIBS,-lGL
cal emugl-export,LDFLAGS,$(GL_COMMON_LINKER_FLAGS)
call emugl-set-shared-library-subpath,hw
call emugl-export,C_INCLUDES,$(intermediates)
call all-makefiles-under,$(LOCAL_PATH) 这个和下面的区别还不清楚
call all-subdis-makefiles
这个是通常出现在整个makefile的尾部，以实现递归调用子目录中的makefile，使整个make系统成为一个树状结构</code></pre>
            </td>
        </tr>
    </tbody>
</table>

[原文链接：http://shine80769769.blog.163.com/blog/static/1791482452012619105744163/](http://shine80769769.blog.163.com/blog/static/1791482452012619105744163/)
