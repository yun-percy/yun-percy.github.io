---
layout: post
title: 关于批量重命名的一件趣事
category: 综合
---

###缘由

拜托一个大神给我写一个calender的数据库，大神捣鼓几个月后发给我，结果因为他们公司防火墙的缘故，发来的 java后缀，xml后缀的文件全部被加密，所以他就想到了txt文档没加密，于是将所以的文件名全部加了一个txt的后缀，然后打包发我。

收到后我没什么时间看，就先搁置一边，过了一天，他又发了一个java文件过来。我问他干什么的，他说在eclipse里面新建一个java工程，将这个java文件代码放进去，然后改一下执行路径和包名。然后运行就能将 txt的后缀去掉 代码详见：

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
28
29
30
31
32
33
34
35
36
37
38
39
40
41
42
43
</pre>
            </td>
            <td class="code" style="margin: 0px; padding: 0px; border: 0px; font-family: inherit; font-style: inherit; font-variant: inherit; line-height: inherit; font-size: 18px; vertical-align: middle; width: 4581px;">
            <pre style="margin-bottom: 0px; padding: 0px; border: none; font-family: Menlo, Monaco, 'Andale Mono', 'lucida console', 'Courier New', monospace; font-style: inherit; font-variant: inherit; font-weight: inherit; line-height: 1.45em; font-size: 13px; vertical-align: baseline; -webkit-box-shadow: none; box-shadow: none; background-image: none; border-top-left-radius: 0px; border-top-right-radius: 0px; border-bottom-right-radius: 0px; border-bottom-left-radius: 0px; color: rgb(220, 220, 222);"><code style="margin: 0px; padding: 0.8em; border: 0px; font-style: inherit; font-variant: inherit; font-weight: inherit; line-height: 1.45em; vertical-align: baseline; overflow-y: hidden; display: block; overflow-x: auto; background-color: rgb(41, 61, 73); font-family: Menlo, Monaco, 'Andale Mono', 'lucida console', 'Courier New', monospace !important;">package com.aaa.projectcopy;

import java.io.File;
import java.security.acl.LastOwnerException;

public class UnZip {
	public static void main(String[] args)
	{
		String path="E:\\workspace\\calendar2";
		upZip(path);
	}

	public static  void upZip(String path)
	{
		File f=new File(path);

		if(f.isDirectory())
		{
			File[] sub=f.listFiles();
			for(int i=0;i<sub.length;i++)
			{
				upZip(sub[i].getAbsolutePath());
			}

		}else{
			reNameFile(path);
		}

	}
	public static void reNameFile(String path){

		File f=new File(path);

		String name=f.getAbsolutePath();
		if(name.contains(".txt"))
		{
			name=name.substring(0,name.lastIndexOf(".txt"));
		}
		File newFile=new File(name);

		f.renameTo(newFile);
	}
}</code></pre>
            </td>
        </tr>
    </tbody>
</table>

代码相当简单，相当高大上了。我彻底就膜拜了。我问他是不是只有重命名的功能，他说是的。

很哭笑不得的是，语法虽然高大上，但是在linux shell里直接执行：

		for i in *.txt;do m=`echo $i | awk -F . '{print $1}'`;n=`echo $i | awk -F . '{print $2}'`;mv $i $m.$n ;done

好像就能达到重命名的功能了。

所以说，平时多学一门语言还是好的
