---
layout: post
title: python中的time
category: 语法
tags : [python,time ,时间戳]
---

> Python 程序能用很多方式处理日期和时间，转换日期格式是一个常见的功能。Python 提供了一个 time 和 calendar 模块可以用于格式化日期和时间。时间间隔是以秒为单位的浮点小数。每个时间戳都以自从1970年1月1日午夜（历元）经过了多长时间来表示。

时间
----

头:`import time`

常用表达式|输出
---|---
time.time()|1459994552.51
time.localtime(time.time())|time.struct_time(tm_year=2016, tm_mon=4, tm_mday=7, tm_hour=10, tm_min=3, tm_sec=27, tm_wday=3, tm_yday=98, tm_isdst=0)
time.asctime( time.localtime(time.time()) )|Thu Apr  7 10:05:21 2016
time.strftime("%Y-%m-%d %H:%M:%S", time.localtime())|2016-04-07 10:25:09
print time.strftime("%a %b %d %H:%M:%S %Y", time.localtime()) |Thu Apr 07 10:25:09 2016
print time.mktime(time.strptime(a,"%a %b %d %H:%M:%S %Y"))|1459175064.0


日历
-----

头：`import calendar`

常用表达式：

`calendar.month(2016, 1)`

输出

```sh
    January 2016
Mo Tu We Th Fr Sa Su
             1  2  3
 4  5  6  7  8  9 10
11 12 13 14 15 16 17
18 19 20 21 22 23 24
25 26 27 28 29 30 31
```

time常用函数
----------


> Time 模块包含了以下内置函数，既有时间处理相的，也有转换时间格式的：

函数|描述
---|---
time.altzone|返回格林威治西部的夏令时地区的偏移秒数。如果该地区在格林威治东部会返回负值（如西欧，包括英国）。对夏令时启用地区才能使用。
time.asctime([tupletime])|接受时间元组并返回一个可读的形式为"Tue Dec 11 18:07:14 2008"（2008年12月11日 周二18时07分14秒）的24个字符的字符串。
time.clock( )|用以浮点数计算的秒数返回当前的CPU时间。用来衡量不同程序的耗时，比time.time()更有用。
time.ctime([secs])|作用相当于asctime(localtime(secs))，未给参数相当于asctime()
time.gmtime([secs])|接收时间辍（1970纪元后经过的浮点秒数）并返回格林威治天文时间下的时间元组t。注：t.tm_isdst始终为0
time.localtime([secs])|接收时间辍（1970纪元后经过的浮点秒数）并返回当地时间下的时间元组t（t.tm_isdst可取0或1，取决于当地当时是不是夏令时）。
time.mktime(tupletime)|接受时间元组并返回时间辍（1970纪元后经过的浮点秒数）。
time.sleep(secs)|推迟调用线程的运行，secs指秒数。
time.strftime(fmt[,tupletime])|接收以时间元组，并返回以可读字符串表示的当地时间，格式由fmt决定。
time.strptime(str,fmt='%a %b %d %H:%M:%S %Y')|根据fmt的格式把一个时间字符串解析为时间元组。
time.time( )|返回当前时间的时间戳（1970纪元后经过的浮点秒数）。
time.tzset()|根据环境变量TZ重新初始化时间相关设置。
time.timezone|属性time.timezone是当地时区（未启动夏令时）距离格林威治的偏移秒数（>0，美洲;<=0大部分欧洲，亚洲，非洲）。
time.tzname|属性time.tzname包含一对根据情况的不同而不同的字符串，分别是带夏令时的本地时区名称，和不带的。

日历（Calendar）模块
----

> 此模块的函数都是日历相关的，例如打印某月的字符月历。
星期一是默认的每周第一天，星期天是默认的最后一天。更改设置需调用calendar.setfirstweekday()函数。模块包含了以下内置函数：

函数|描述
---|---
calendar.calendar(year,w=2,l=1,c=6)|返回一个多行字符串格式的year年年历，3个月一行，间隔距离为c。 每日宽度间隔为w字符。每行长度为21* W+18+2* C。l是每星期行数。
calendar.firstweekday( )|返回当前每周起始日期的设置。默认情况下，首次载入caendar模块时返回0，即星期一。
calendar.isleap(year)|是闰年返回True，否则为false。
calendar.leapdays(y1,y2)|返回在Y1，Y2两年之间的闰年总数。
calendar.month(year,month,w=2,l=1)|返回一个多行字符串格式的year年month月日历，两行标题，一周一行。每日宽度间隔为w字符。每行的长度为7* w+6。l是每星期的行数。
calendar.monthcalendar(year,month)|返回一个整数的单层嵌套列表。每个子列表装载代表一个星期的整数。Year年month月外的日期都设为0;范围内的日子都由该月第几日表示，从1开始。
calendar.monthrange(year,month)|返回两个整数。第一个是该月的星期几的日期码，第二个是该月的日期码。日从0（星期一）到6（星期日）;月从1到12。
calendar.prcal(year,w=2,l=1,c=6)|相当于 print calendar.calendar(year,w,l,c).
calendar.prmonth(year,month,w=2,l=1)|相当于 print calendar.calendar（year，w，l，c）。
calendar.setfirstweekday(weekday)|设置每周的起始日期码。0（星期一）到6（星期日）。
calendar.timegm(tupletime)|和time.gmtime相反：接受一个时间元组形式，返回该时刻的时间辍（1970纪元后经过的浮点秒数）。
calendar.weekday(year,month,day)|返回给定日期的日期码。0（星期一）到6（星期日）。月份为 1（一月） 到 12（12月）。