---
title: pycurl的使用
category: 语法
tags:
  - 网络
  - python
  - curl
  - pycurl
---
	
> pycurl是curl的一个python版本。
  
 	
pycurl的使用说明：
----
 	
+ pycurl的使用主要是一些参数的设定。
 	
设定链接地址

```py
c.setopt(pycurl.URL,myurl)
```
 	
设置http的包头信息。注意，长度的字符传是用于put或者post等方法传参数的。

```py
c.setopt(pycurl.HTTPHEADER,['Content-Type: application/json','Content-Length: '+str(len(remove_str))])
```

设置封装方法，有put，post，get，delete等多种方法	
```py
c.setopt(pycurl.CUSTOMREQUEST,"DELETE")
```

设置psot过去的数据，注意是一个字典样式的字符串	

```py
c.setopt(pycurl.POSTFIELDS,remove_str)
```

设置写的回调，所有输出都定向到b.write中。

```py
c.setopt(pycurl.WRITEFUNCTION,b.write)
```

设置重定向次数

```py
c.setopt(pycurl.MAXDEDIRS,5)
```

设置链接超时，设置下载超时

```py
c.setopt(pycurl.CONNECTTIMEOUT,60)
c.setopt(pycurl.TIMEOUT,600)
```	

设置代理浏览器

```py
c.setopt(pycurl.USERAGENT,"xxxx")
```

开启包头输出	

```py
c.setopt(pycurl.HEADER,1)
```	

将包头输出到header_str.write流中

```py
c.setopt(pycurl.HEADERFUNCTION,header_str.write)
```

执行curl命令	

```py
c.perform()
```

打印消息

```py
print b.getvalue()//打印消息
print c.getinfo(c.HTTP_CODE) //答应返回值
Print c.getinfo(c.CONTENT_TYPE) //打印文本类型
Print c.getinfo(c.EFFECTIVE_URL) //打印重定向URL
```

上传文件
 
```py
c.setopt(c.HTTPPOST, [("textname", (c.FORM_FILE, "/home/ubuntu/avatar.jpg"))])
```
 
### DEMO

```py
import pycurl
import StringIO
post_data_dic = {"md5":md5, "desc":"the file md5"}
c = pycurl.Curl() #创建一个同libcurl中的CURL处理器相对应的Curl对象
fp = StringIO.StringIO()
c.setopt(pycurl.WRITEFUNCTION, fp.write)
c.setopt(pycurl.FOLLOWLOCATION, 1)	
c.setopt(pycurl.MAXREDIRS, 5)
c.setopt(pycurl.CONNECTTIMEOUT, 60)
c.setopt(pycurl.TIMEOUT, 300)	
c.setopt(c.POST, 1)	
c.setopt(c.URL, "http://localhost:8080/post.action") #设置要访问的网址
c.setopt(c.POSTFIELDS, urllib.urlencode(post_data_dic))
c.perform() #执行上述访问网址的操作
c.close() #Curl对象无操作时，也会自动执行close操作
print "the python shell over!"
``` 	
 
 	
 