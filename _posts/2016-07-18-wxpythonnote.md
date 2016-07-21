---
layout: post
title: WxPython初学笔记
category: 语法
tags : [python,wxpython ,note]
---

获取屏幕分辨率
----

```py
screen_size=wx.DisplaySize()
print screen_size[0],screen_size[1]
```

设置图标
-----

```py
icon=wx.EmptyIcon()
icon.LoadFile("loadIcon.ico",wx.BITMAP_TYPE_ICO)
frame.SetIcon(icon)
```