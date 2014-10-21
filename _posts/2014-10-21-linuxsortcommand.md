---
layout: post
title: linux shell之sort用法
category: 语法
---


######sort命令是帮我们依据不同的数据类型进行排序，其语法及常用参数格式：

　　	sort [-bcfMnrtk][源文件][-o 输出文件]

######补充说明：sort可针对文本文件的内容，以行为单位来排序。

参　　数：

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
            <pre style="margin-bottom: 0px; padding: 0px; border: none; font-family: Menlo, Monaco, 'Andale Mono', 'lucida console', 'Courier New', monospace; font-style: inherit; font-variant: inherit; font-weight: inherit; line-height: 1.45em; font-size: 13px; vertical-align: baseline; -webkit-box-shadow: none; box-shadow: none; background-image: none; border-top-left-radius: 0px; border-top-right-radius: 0px; border-bottom-right-radius: 0px; border-bottom-left-radius: 0px; color: rgb(220, 220, 222);"><code style="margin: 0px; padding: 0.8em; border: 0px; font-style: inherit; font-variant: inherit; font-weight: inherit; line-height: 1.45em; vertical-align: baseline; overflow-y: hidden; display: block; overflow-x: auto; background-color: rgb(41, 61, 73); font-family: Menlo, Monaco, 'Andale Mono', 'lucida console', 'Courier New', monospace !important;">-b   忽略每行前面开始出的空格字符。
  -c   检查文件是否已经按照顺序排序。
  -f   排序时，忽略大小写字母。
  -M   将前面3个字母依照月份的缩写进行排序。
  -n   依照数值的大小排序。
  -o<输出文件>   将排序后的结果存入指定的文件。
  -r   以相反的顺序来排序。
  -t<分隔字符>   指定排序时所用的栏位分隔字符。
  -k  选择以哪个区间进行排序。</code></pre>
            </td>
        </tr>
    </tbody>
</table>


#####Sort的使用。

+  sort将文件的每一行作为一个单位，相互比较，比较原则是从首字符向后，依次按ASCII码值进行比较，最后将他们按升序输出。exmaple:

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
</pre>
            </td>
            <td class="code" style="margin: 0px; padding: 0px; border: 0px; font-family: inherit; font-style: inherit; font-variant: inherit; line-height: inherit; font-size: 18px; vertical-align: middle; width: 4581px;">
            <pre style="margin-bottom: 0px; padding: 0px; border: none; font-family: Menlo, Monaco, 'Andale Mono', 'lucida console', 'Courier New', monospace; font-style: inherit; font-variant: inherit; font-weight: inherit; line-height: 1.45em; font-size: 13px; vertical-align: baseline; -webkit-box-shadow: none; box-shadow: none; background-image: none; border-top-left-radius: 0px; border-top-right-radius: 0px; border-bottom-right-radius: 0px; border-bottom-left-radius: 0px; color: rgb(220, 220, 222);"><code style="margin: 0px; padding: 0.8em; border: 0px; font-style: inherit; font-variant: inherit; font-weight: inherit; line-height: 1.45em; vertical-align: baseline; overflow-y: hidden; display: block; overflow-x: auto; background-color: rgb(41, 61, 73); font-family: Menlo, Monaco, 'Andale Mono', 'lucida console', 'Courier New', monospace !important;"> cat seq.txt--->
		banana
		apple
		pear
		orange
	sort seq.txt--->
		apple
		banana
		orange
		pear</code></pre>
            </td>
        </tr>
    </tbody>
</table>

+  sort的-u选项,它的作用很简单，就是在输出行中去除重复行。

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
</pre>
            </td>
            <td class="code" style="margin: 0px; padding: 0px; border: 0px; font-family: inherit; font-style: inherit; font-variant: inherit; line-height: inherit; font-size: 18px; vertical-align: middle; width: 4581px;">
            <pre style="margin-bottom: 0px; padding: 0px; border: none; font-family: Menlo, Monaco, 'Andale Mono', 'lucida console', 'Courier New', monospace; font-style: inherit; font-variant: inherit; font-weight: inherit; line-height: 1.45em; font-size: 13px; vertical-align: baseline; -webkit-box-shadow: none; box-shadow: none; background-image: none; border-top-left-radius: 0px; border-top-right-radius: 0px; border-bottom-right-radius: 0px; border-bottom-left-radius: 0px; color: rgb(220, 220, 222);"><code style="margin: 0px; padding: 0.8em; border: 0px; font-style: inherit; font-variant: inherit; font-weight: inherit; line-height: 1.45em; vertical-align: baseline; overflow-y: hidden; display: block; overflow-x: auto; background-color: rgb(41, 61, 73); font-family: Menlo, Monaco, 'Andale Mono', 'lucida console', 'Courier New', monospace !important;">cat seq.txt--->
		banana
		apple
		pear
		orange
		pear
	sort seq.txt--->
		apple
		banana
		orange
		pear
		pear
	sort -u seq.txt--->
		apple
		banana
		orange
		pear
</code></pre>
            </td>
        </tr>
    </tbody>
</table>

pear由于重复被-u选项无情的删除了。

+  sort的-r选项,sort默认的排序方式是升序，如果想改成降序，就加个-r就搞定了。

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
</pre>
            </td>
            <td class="code" style="margin: 0px; padding: 0px; border: 0px; font-family: inherit; font-style: inherit; font-variant: inherit; line-height: inherit; font-size: 18px; vertical-align: middle; width: 4581px;">
            <pre style="margin-bottom: 0px; padding: 0px; border: none; font-family: Menlo, Monaco, 'Andale Mono', 'lucida console', 'Courier New', monospace; font-style: inherit; font-variant: inherit; font-weight: inherit; line-height: 1.45em; font-size: 13px; vertical-align: baseline; -webkit-box-shadow: none; box-shadow: none; background-image: none; border-top-left-radius: 0px; border-top-right-radius: 0px; border-bottom-right-radius: 0px; border-bottom-left-radius: 0px; color: rgb(220, 220, 222);"><code style="margin: 0px; padding: 0.8em; border: 0px; font-style: inherit; font-variant: inherit; font-weight: inherit; line-height: 1.45em; vertical-align: baseline; overflow-y: hidden; display: block; overflow-x: auto; background-color: rgb(41, 61, 73); font-family: Menlo, Monaco, 'Andale Mono', 'lucida console', 'Courier New', monospace !important;">cat number.txt --->
		1
		3
		5
		2
		4
	sort number.txt--->
		1
		2
		3
		4
		5
	sort -r number.txt--->
		5
		4
		3
		2
		1</code></pre>
            </td>
        </tr>
    </tbody>
</table>

+ sort的-o选项,由于sort默认是把结果输出到标准输出，所以需要用重定向才能将结果写入文件，形如sort filename > newfile。<br>
但是，如果你想把排序结果输出到原文件中，用重定向可就不行了。

		sort -r number.txt > number.txt
		cat number.txt
		什么都没有输出

看，竟然将number清空了。

就在这个时候，-o选项出现了，它成功的解决了这个问题，让你放心的将结果写入原文件。这或许也是-o比重定向的唯一优势所在。

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
</pre>
            </td>
            <td class="code" style="margin: 0px; padding: 0px; border: 0px; font-family: inherit; font-style: inherit; font-variant: inherit; line-height: inherit; font-size: 18px; vertical-align: middle; width: 4581px;">
            <pre style="margin-bottom: 0px; padding: 0px; border: none; font-family: Menlo, Monaco, 'Andale Mono', 'lucida console', 'Courier New', monospace; font-style: inherit; font-variant: inherit; font-weight: inherit; line-height: 1.45em; font-size: 13px; vertical-align: baseline; -webkit-box-shadow: none; box-shadow: none; background-image: none; border-top-left-radius: 0px; border-top-right-radius: 0px; border-bottom-right-radius: 0px; border-bottom-left-radius: 0px; color: rgb(220, 220, 222);"><code style="margin: 0px; padding: 0.8em; border: 0px; font-style: inherit; font-variant: inherit; font-weight: inherit; line-height: 1.45em; vertical-align: baseline; overflow-y: hidden; display: block; overflow-x: auto; background-color: rgb(41, 61, 73); font-family: Menlo, Monaco, 'Andale Mono', 'lucida console', 'Courier New', monospace !important;">[rocrocket@rocrocket programming]$ cat number.txt
1
3
5
2
4
[rocrocket@rocrocket programming]$ sort -r number.txt -o number.txt
[rocrocket@rocrocket programming]$ cat number.txt
5
4
3
2
1
</code></pre>
            </td>
        </tr>
    </tbody>
</table>


+ sort的-n选项

你有没有遇到过10比2小的情况。我反正遇到过。出现这种情况是由于排序程序将这些数字按字符来排序了，排序程序会先比较1和2，显然1小，所以就将10放在2前面喽。这也是sort的一贯作风。

我们如果想改变这种现状，就要使用-n选项，来告诉sort，“要以数值来排序”！

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
</pre>
            </td>
            <td class="code" style="margin: 0px; padding: 0px; border: 0px; font-family: inherit; font-style: inherit; font-variant: inherit; line-height: inherit; font-size: 18px; vertical-align: middle; width: 4581px;">
            <pre style="margin-bottom: 0px; padding: 0px; border: none; font-family: Menlo, Monaco, 'Andale Mono', 'lucida console', 'Courier New', monospace; font-style: inherit; font-variant: inherit; font-weight: inherit; line-height: 1.45em; font-size: 13px; vertical-align: baseline; -webkit-box-shadow: none; box-shadow: none; background-image: none; border-top-left-radius: 0px; border-top-right-radius: 0px; border-bottom-right-radius: 0px; border-bottom-left-radius: 0px; color: rgb(220, 220, 222);"><code style="margin: 0px; padding: 0.8em; border: 0px; font-style: inherit; font-variant: inherit; font-weight: inherit; line-height: 1.45em; vertical-align: baseline; overflow-y: hidden; display: block; overflow-x: auto; background-color: rgb(41, 61, 73); font-family: Menlo, Monaco, 'Andale Mono', 'lucida console', 'Courier New', monospace !important;">[rocrocket@rocrocket programming]$ cat number.txt
1
10
19
11
2
5
[rocrocket@rocrocket programming]$ sort number.txt
1
10
11
19
2
5
[rocrocket@rocrocket programming]$ sort -n number.txt
1
2
5
10
11
19</code></pre>
            </td>
        </tr>
    </tbody>
</table>

+ sort的-t选项和-k选项,       如果有一个文件的内容是这样：

<table style="margin: 0px; padding: 0px; border: 0px; font-family: inherit; font-style: inherit; font-variant: inherit; font-weight: inherit; line-height: inherit; font-size: 18px; vertical-align: baseline; border-collapse: collapse; border-spacing: 0px;">
    <tbody style="margin: 0px; padding: 0px; border: 0px; font-family: inherit; font-style: inherit; font-variant: inherit; font-weight: inherit; line-height: inherit; vertical-align: baseline;">
        <tr style="margin: 0px; padding: 0px; border: 0px; font-family: inherit; font-style: inherit; font-variant: inherit; font-weight: inherit; line-height: inherit; vertical-align: baseline;">
            <td class="gutter" style="margin: 0px; padding: 0px; border: 0px; font-family: inherit; font-style: inherit; font-variant: inherit; line-height: inherit; font-size: 18px; vertical-align: middle;">
            <pre class="line-numbers" style="margin-bottom: 0px; border-top-style: none; border-bottom-style: none; border-left-style: none; font-family: Menlo, Monaco, 'Andale Mono', 'lucida console', 'Courier New', monospace; font-style: inherit; font-variant: inherit; font-weight: inherit; line-height: 1.45em; font-size: 13px; vertical-align: baseline; -webkit-box-shadow: none; box-shadow: none; border-top-left-radius: 0px; border-top-right-radius: 0px; border-bottom-right-radius: 0px; border-bottom-left-radius: 0px; color: rgb(255, 255, 255); text-align: right; text-shadow: rgb(2, 16, 20) 0px -1px; padding: 0.8em !important; border-right-width: 1px !important; border-right-style: solid !important; border-right-color: rgb(0, 35, 44) !important; background-image: url(http://zh.lucida.me/images/noise.png?1388941295) !important; background-color: rgb(51, 51, 51) !important; background-position: 0% 0%;">1
2
3
4
5
</pre>
            </td>
            <td class="code" style="margin: 0px; padding: 0px; border: 0px; font-family: inherit; font-style: inherit; font-variant: inherit; line-height: inherit; font-size: 18px; vertical-align: middle; width: 4581px;">
            <pre style="margin-bottom: 0px; padding: 0px; border: none; font-family: Menlo, Monaco, 'Andale Mono', 'lucida console', 'Courier New', monospace; font-style: inherit; font-variant: inherit; font-weight: inherit; line-height: 1.45em; font-size: 13px; vertical-align: baseline; -webkit-box-shadow: none; box-shadow: none; background-image: none; border-top-left-radius: 0px; border-top-right-radius: 0px; border-bottom-right-radius: 0px; border-bottom-left-radius: 0px; color: rgb(220, 220, 222);"><code style="margin: 0px; padding: 0.8em; border: 0px; font-style: inherit; font-variant: inherit; font-weight: inherit; line-height: 1.45em; vertical-align: baseline; overflow-y: hidden; display: block; overflow-x: auto; background-color: rgb(41, 61, 73); font-family: Menlo, Monaco, 'Andale Mono', 'lucida console', 'Courier New', monospace !important;">[rocrocket@rocrocket programming]$ cat facebook.txt
banana:30:5.5
apple:10:2.5
pear:90:2.3
orange:20:3.4</code></pre>
            </td>
        </tr>
    </tbody>
</table>

这个文件有三列，列与列之间用冒号隔开了，第一列表示水果类型，第二列表示水果数量，第三列表示水果价格。那么我想以水果数量来排序，也就是以第二列来排序，如何利用sort实现？幸好，sort提供了-t选项，后面可以设定间隔符。指定了间隔符之后，就可以用-k来指定列数了。

<table style="margin: 0px; padding: 0px; border: 0px; font-family: inherit; font-style: inherit; font-variant: inherit; font-weight: inherit; line-height: inherit; font-size: 18px; vertical-align: baseline; border-collapse: collapse; border-spacing: 0px;">
    <tbody style="margin: 0px; padding: 0px; border: 0px; font-family: inherit; font-style: inherit; font-variant: inherit; font-weight: inherit; line-height: inherit; vertical-align: baseline;">
        <tr style="margin: 0px; padding: 0px; border: 0px; font-family: inherit; font-style: inherit; font-variant: inherit; font-weight: inherit; line-height: inherit; vertical-align: baseline;">
            <td class="gutter" style="margin: 0px; padding: 0px; border: 0px; font-family: inherit; font-style: inherit; font-variant: inherit; line-height: inherit; font-size: 18px; vertical-align: middle;">
            <pre class="line-numbers" style="margin-bottom: 0px; border-top-style: none; border-bottom-style: none; border-left-style: none; font-family: Menlo, Monaco, 'Andale Mono', 'lucida console', 'Courier New', monospace; font-style: inherit; font-variant: inherit; font-weight: inherit; line-height: 1.45em; font-size: 13px; vertical-align: baseline; -webkit-box-shadow: none; box-shadow: none; border-top-left-radius: 0px; border-top-right-radius: 0px; border-bottom-right-radius: 0px; border-bottom-left-radius: 0px; color: rgb(255, 255, 255); text-align: right; text-shadow: rgb(2, 16, 20) 0px -1px; padding: 0.8em !important; border-right-width: 1px !important; border-right-style: solid !important; border-right-color: rgb(0, 35, 44) !important; background-image: url(http://zh.lucida.me/images/noise.png?1388941295) !important; background-color: rgb(51, 51, 51) !important; background-position: 0% 0%;">1
2
3
4
5
</pre>
            </td>
            <td class="code" style="margin: 0px; padding: 0px; border: 0px; font-family: inherit; font-style: inherit; font-variant: inherit; line-height: inherit; font-size: 18px; vertical-align: middle; width: 4581px;">
            <pre style="margin-bottom: 0px; padding: 0px; border: none; font-family: Menlo, Monaco, 'Andale Mono', 'lucida console', 'Courier New', monospace; font-style: inherit; font-variant: inherit; font-weight: inherit; line-height: 1.45em; font-size: 13px; vertical-align: baseline; -webkit-box-shadow: none; box-shadow: none; background-image: none; border-top-left-radius: 0px; border-top-right-radius: 0px; border-bottom-right-radius: 0px; border-bottom-left-radius: 0px; color: rgb(220, 220, 222);"><code style="margin: 0px; padding: 0.8em; border: 0px; font-style: inherit; font-variant: inherit; font-weight: inherit; line-height: 1.45em; vertical-align: baseline; overflow-y: hidden; display: block; overflow-x: auto; background-color: rgb(41, 61, 73); font-family: Menlo, Monaco, 'Andale Mono', 'lucida console', 'Courier New', monospace !important;">[rocrocket@rocrocket programming]$ sort -n -k 2 -t ‘:’ facebook.txt
apple:10:2.5
orange:20:3.4
banana:30:5.5
pear:90:2.3</code></pre>
            </td>
        </tr>
    </tbody>
</table>


+ 其他的sort常用选项

> -f会将小写字母都转换为大写字母来进行比较，亦即忽略大小写

> -c会检查文件是否已排好序，如果乱序，则输出第一个乱序的行的相关信息，最后返回1

> -C会检查文件是否已排好序，如果乱序，不输出内容，仅返回1

> -M会以月份来排序，比如JAN小于FEB等等

> -b会忽略每一行前面的所有空白部分，从第一个可见字符开始比较。

文章转自：[http://www.cnblogs.com/dong008259/archive/2011/12/08/2281214.html](http://www.cnblogs.com/dong008259/archive/2011/12/08/2281214.html)
