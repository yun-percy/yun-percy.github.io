---
layout: post
title: Android Makefile 编译过程讲解
category: android
---

####android make 系统

+ arch
+ board
+ device
+ product

####Android.mk中的定义变量

+ include $(CLEAR_VARS)

它对应的是在./build/core/config.mk中的CLEAR_VARS:=$(BUILD_SYSTEM)/clear_vars.mk

+ include $(BUILD_PACKAGE)

它对应的是在./build/core/config.mk中的BUILD_PACKAGE:=$(BUILD_SYSTEM)/package.mk

+ 其它以此类推

####main.mk中的模块

<p></p><figure class="code" style="margin: 0px 0px 1.5em; padding: 0px; border: 0px; font-family: 'PT Serif', Georgia, Times, 'Times New Roman', serif; line-height: 27.59375px; font-size: 18px; vertical-align: baseline; -webkit-box-shadow: rgba(0, 0, 0, 0.0588235) 0px 0px 10px; box-shadow: rgba(0, 0, 0, 0.0588235) 0px 0px 10px; background-image: none; background-color: rgb(248, 248, 248); color: rgb(34, 34, 34);">
<p>
</p><table style="margin: 0px; padding: 0px; border: 0px; font-family: inherit; font-style: inherit; font-variant: inherit; font-weight: inherit; line-height: inherit; font-size: 18px; vertical-align: baseline; border-collapse: collapse; border-spacing: 0px;">
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
<p></p>
</figure><p></p>
<p>&nbsp;</p>
<p>&nbsp;</p>



