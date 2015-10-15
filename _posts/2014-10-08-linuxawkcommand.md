---
layout: post
title: awk命令详解
category: shell
tags : [ awk,linux，文本处理 ]
---

AWK命令介绍
------
 
>awk语言的最基本功能是在文件或字符串中基于指定规则浏览和抽取信息，awk抽取信息后，才能进行其他文本操作，完整的awk脚本通常用来格式化文本文件中的信息
 
###awk的简单使用
 
+ 第一种命令行方式，如:
 
        awk [-Field-separator] 'commands' input-file(s)
        
例如: 

        awk -F ：'{print $1,$4}' test.xml   

解释：使用‘：’来分割这一行，把这一行的第一列和第四个域打印出来 。-F是-Field-separator-F的缩写，缺省为空格。
 
+ 第二种，将所有awk命令插入一个文件，并使awk程序可执行，然后用awk命令解释器作为脚本的首行，以便通过键入脚本名称来调用它
 
+ 第三种，将所有awk命令插入一个单独文件，然后调用，如: 
 
        awk -f awk-script-file input-file
 
解释： -f选项指明在文件awk-script-file的awk脚本，input-file是使用awk进行浏览的文件名
 
###awk变量使用
 
awk执行时，其浏览标记为$1，$2...$n，这种方法称为域标记。使用$1，$3表示参照第1和第3域，注意这里使用逗号分隔域，使用$0表示使用所有域。例如:
 
        awk '{print $0}' temp.txt > sav.txt  
 
表示打印所有域并把结果重定向到sav.txt中
        ---------------------------- 

        awk '{print $0}' temp.txt|tee sav.txt 
 
和上例相似，不同的是将在屏幕上显示出来
        -----------------------------------
        
        awk '{print $1,$4}' temp.txt
 
只打印出第1和第4域
 
        awk 'BEGIN {print "NAME  GRADE\n----"} {print $1"\t"$4}' temp.txt 
 
表示打信息头，即输入的内容的第一行前加上"NAME  GRADE\n-------------"，同时内容以tab分开
 
        awk 'BEGIN {print "being"} {print $1} END {print "end"}' temp 
 
同时打印信息头和信息尾
 
###awk的正则
 
<、<=、==、!=、>=、~匹配正则表达式、!~不匹配正则表达式
 
匹配:
    
        awk '{if ($4~/ASIMA/) print $0}' temp   表示如果第四个域包含ASIMA，就打印整条
 
精确匹配:

        awk '$3=="48" {print $0}' temp    只打印第3域等于"48"的记录
 
不匹配:  

        awk '$0 !~ /ASIMA/' temp      打印整条不包含ASIMA的记录
 
不等于:  

        awk '$1 != "asima"' temp
 
小于:    
    
        awk '{if ($1<$2) print $1 "is smaller"}' temp

设置大小写:

        awk '/[Gg]reen/' temp      打印整条包含Green，或者green的记录
 
任意字符: 

        awk '$1 ~/^...a/' temp    打印第1域中第四个字符是a的记录，符号’^’代表行首，符合’.’代表任意字符
 
或关系匹配: 

        awk '$0~/(abc)|(efg)/' temp   使用|时，语句需要括起来
 
AND与关系:  

        awk '{if ( $1=="a" && $2=="b" ) print $0}' temp
 
OR或关系:   

        awk '{if ($1=="a" || $1=="b") print $0}' temp
 
###awk内置变量:

参数|解释
---|---
ARGC | 命令行参数个数
NF |  浏览记录的域个数
AGRV |命令行参数排列
NR  |已读的记录数   
ENVIRON |支持队列中系统环境变量的使用
OFS  |输出域分隔符
FILENAME  |awk浏览的文件名  
ORS |输出记录分隔符
FNR  |浏览文件的记录数  
RS  |控制记录分隔符
FS  |设置输入域分隔符，同- F选项
NF  |   浏览记录的域个数
 
例: 

    awk 'END {print NR}' temp    在最后打印已读记录条数
 
    awk '{print NF，NR，$0} END {print FILENAME}' temp

至少存在一条记录且包含Brown

    awk '{if (NR>0 && $4~/Brown/) print $0}' temp  
 
NF的另一用法:  
    
            echo $PWD | awk -F/ '{print $NF}'   显示当前目录名
 
###awk操作符:
 
在awk中使用操作符，基本表达式可以划分成数字型、字符串型、变量型、域及数组元素
 
设置输入域到变量名:
 
    awk '{name=$1;six=$3; if (six=="man") print name " is " six}' temp
 
域值比较操作:
 
        awk 'BEGIN {BASE="27"} {if ($4<BASE) print $0}' temp
 
修改数值域取值:(原输入文件不会被改变)
 
        awk '{if ($1=="asima") $6=$6-1;print $1，$6，$7}' temp
 
修改文本域:

        awk '{if ($1=="asima) ($1=="desc");print $1}' temp
 
只显示修改记录:(只显示所需要的，区别上一条命令，注意{})
 
        awk '{if ($1=="asima) {$1=="desc";print$1}}' temp
 
创建新的输出域:
 
        awk '{$4=$3-$2; print $4}' temp
 
统计列值:
 
        awk '(tot+=$3);END {print tot}' temp           会显示每列的内容
 
        awk '{(tot+=$3)};END {print tot}' temp         只显示最后的结果
 
文件长度相加:
 
        ls -l|awk '/^[^d]/ {print $9"\t"$5} {tot+=$5} END{print "totKB:" tot}'
 
只列出文件名:
 
        ls -l|awk '{print $9}'     常规情况文件名是第9域
 
awk内置字符串函数:

+ gsub(r，s)     在整个$0中用s替代r

        awk 'gsub(/name/，"xingming") {print $0}' temp
        gsub(r，s，t)         在整个t中用s替代r
 
+ index(s，t)          返回s中字符串t的第一位置
 
        awk 'BEGIN {print index("Sunny"，"ny")}' temp     返回4
 
+ length(s)           返回s的长度
 
+ match(s，r)          测试s是否包含匹配r的字符串
 
        awk '$1=="J.Lulu" {print match($1，"u")}' temp    返回4
 
+ split(s，a，fs)       在fs上将s分成序列a
 
        awk 'BEGIN {print split("12#345#6789"，myarray，"#")"'
        返回3，同时myarray[1]="12"， myarray[2]="345"， myarray[3]="6789"
 
+ sprint(fmt，exp)     返回经fmt格式化后的exp
 
+ sub(r，s)   从$0中最左边最长的子串中用s代替r(只更换第一遇到的匹配字符串)
 
+ substr(s，p)         返回字符串s中从p开始的后缀部分
 
+ substr(s，p，n)       返回字符串s中从p开始长度为n的后缀部分
 
###printf函数的使用:
 
字符转换: 

        echo "65" |awk '{printf "%c\n"，$0}'    输出A
        awk 'BEGIN {printf "%f\n"，999}'        输出999.000000
 
格式化输出:

        awk '{printf "%-15s %s\n"，$1，$3}' temp 将第一个域全部左对齐显示
 
###其他awk用法:
 
向一行awk命令传值:
 
        awk '{if ($5<AGE) print $0}' AGE=10 temp

使用环境变量

        who | awk '{if ($1==user) print $1 " are in " $2 ' user=$LOGNAME 
 
###awk脚本命令:
 
> 开头使用 !/bin/awk -f  ，如果没有这句话自含脚本将不能执行，例子:
 
        !/bin/awk -f
        # all comment lines must start with a hash '#'
        # name: student_tot.awk
        # to call: student_tot.awk grade.txt
        # prints total and average of club student points
        # print a header first
        BEGIN
        {
            print "Student    Date   Member No.  Grade  Age  Points  Max"
            print "Name  Joined Gained  Point Available"
            print"========================================================="
        }
        # let's add the scores of points gained
        (tot+=$6);
        # finished processing now let's print the total and average point
        END
        {
            print "Club student total points :" tot
            print "Average Club Student points :" tot/N
        }
 
###awk数组:
 
awk的循环基本结构
 
        For (element in array) print array[element]
 
        awk 'BEGIN {record="123#456#789";split(record，myarray，"#")} 
 
        END { for (i in myarray) {print myarray[i]} }
 
 
###awk中自定义语句
 
+ 条件判断语句(if)

        if(表达式) #if ( Variable in Array )
        语句1
        else
        语句2

格式中"语句1"可以是多个语句，如果你为了方便Unix awk判断也方便你自已阅读，你最好将多个语句用{}括起来。Unix awk分枝结构允许嵌套，其格式为：

        if(表达式)
        {语句1}
        else if(表达式)
        {语句2}
        else
        {语句3}

例：

        yun@tencent linux ~ awk 'BEGIN{ 
        test=100;
        if(test>90)
        {
            print "very good";
        }
        else if(test>60)
        {
            print "good";
        }
        else
        {
            print "no pass";
        }
        }'
        结果： very good
        
每条命令语句后面可以用“；”号结尾。
 
+ 循环语句(while,for,do)

        while语句
        格式：
        while(表达式)
        {语句}
        
例子：

        yun@tencent linux ~ awk 'BEGIN{ 
        test=100;
        total=0;
        while(i<=test)
        {
            total+=i;
            i++;
        }
        print total;
        }'
        结果： 5050
        
+ for 循环

for循环有两种格式：

__格式1：__

        for(变量 in 数组)
        {语句}
        
例子：

        yun@tencent linux ~ awk 'BEGIN{ 
        for(k in ENVIRON)
        {
            print k"="ENVIRON[k];
        }
        }'

结果：

        AWKPATH=.:/usr/share/awk
        OLDPWD=/home/web97
        SSH_ASKPASS=/usr/libexec/openssh/gnome-ssh-askpass
        SELINUX_LEVEL_REQUESTED=
        SELINUX_ROLE_REQUESTED=
        LANG=zh_CN.GB2312


说明：ENVIRON 是awk常量，是子典型数组。

__格式2：__

        for(变量;条件;表达式)
        {语句}
    
例子：

        yun@tencent linux ~  awk 'BEGIN{ 
        total=0;
        for(i=0;i<=100;i++)
        {
            total+=i;
        }
        print total;
        }'
        结果： 5050

+ do循环

格式：

        do
        {语句}while(条件)
        
例子：

        yun@tencent linux ~  awk 'BEGIN{ 
        total=0;
        i=0;
        do
        {
            total+=i;
            i++;
        }while(i<=100)
        print total;
        }'
        结果： 5050
 
以上为awk流程控制语句，从语法上面大家可以看到，与c语言是一样的。有了这些语句，其实很多shell程序都可以交给awk，而且性能是非常快的。

关键字|作用
---|---
break|	当 break 语句用于 while 或 for 语句时，导致退出程序循环。
continue|	当 continue 语句用于 while 或 for 语句时，使程序循环移动到下一个迭代。
next|	能能够导致读入下一个输入行，并返回到脚本的顶部。这可以避免对当前输入行执行其他的操作过程。
exit|	语句使主输入循环退出并将控制转移到END,如果END存在的话。如果没有定义END规则，或在END中应用exit语句，则终止脚本的执行。


其他实例：
--------

+ 指定多个分隔符：

		awk -F "[,= ]" '{print $1}'


<p>默认情况下，awk通过空格分隔输入。如果您想选择输入的第一个字段，你只需要告诉awk输出$1：</p>
<pre class="prettyprint linenums prettyprinted" style=""><ol class="linenums"><li class="L0"><span class="pln">$ echo </span><span class="str">'one two three four'</span><span class="pln"> </span><span class="pun">|</span><span class="pln"> awk </span><span class="str">'{print $1}'</span></li></ol></pre>
<blockquote>
<p>one</p>
</blockquote>
<p>（是的，大括号语法是有点古怪，但我保证这是我们这节课一直会遇到。）</p>
<p>你能猜出如何选择第二，第三或第四个字段么？是的，分别用$2，$ 3，$ 4。</p>
<pre class="prettyprint linenums prettyprinted" style=""><ol class="linenums"><li class="L0"><span class="pln">$ echo </span><span class="str">'one two three four'</span><span class="pln"> </span><span class="pun">|</span><span class="pln"> awk </span><span class="str">'{print $3}'</span></li></ol></pre>
<blockquote>
<p>three</p>
</blockquote>
<p>通常在文本改写时，你需要创建一个特定的数据格式，并且它覆盖不止一个单词。好消息是，awk中可以很容易地打印多个字段，甚至包含静态字符串：</p>
<pre class="prettyprint linenums prettyprinted" style=""><ol class="linenums"><li class="L0"><span class="pln"> $ echo </span><span class="str">'one two three four'</span><span class="pln"> </span><span class="pun">|</span><span class="pln"> awk </span><span class="str">'{print $3,$1}'</span><span class="pln"> </span></li></ol></pre>
<blockquote>
<p>three one</p>
</blockquote>
<hr>
<pre class="prettyprint linenums prettyprinted" style=""><ol class="linenums"><li class="L0"><span class="pln">$ echo </span><span class="str">'one two three four'</span><span class="pln"> </span><span class="pun">|</span><span class="pln"> awk </span><span class="str">'{print "foo:",$3,"| bar:",$1}'</span><span class="pln"> </span></li></ol></pre>
<blockquote>
<p>foo: three | bar: one</p>
</blockquote>
<p>好吧，如果你的输入不是由空格分隔怎么办？只需用awk中的'-F'标志指定你的分隔符：</p>
<pre class="prettyprint linenums prettyprinted" style=""><ol class="linenums"><li class="L0"><span class="pln">$ echo </span><span class="str">'one mississippi,two mississippi,three mississippi,four mississippi'</span><span class="pln"> </span><span class="pun">|</span><span class="pln"> awk </span><span class="pun">-</span><span class="pln">F </span><span class="pun">,</span><span class="pln"> </span><span class="str">'{print $4}'</span><span class="pln"> </span></li></ol></pre>
<blockquote>
<p>four mississippi</p>
</blockquote>
<p>偶尔间，你会发现自己正在处理字段数量不同的数据，但你只知道你想要的<em>最后</em>字段。 awk中内置的$NF变量代表<em>字段的数量</em>，这样你就可以用它来抓取最后一个元素：</p>
<pre class="prettyprint linenums prettyprinted" style=""><ol class="linenums"><li class="L0"><span class="pln">$ echo </span><span class="str">'one two three four'</span><span class="pln"> </span><span class="pun">|</span><span class="pln"> awk </span><span class="str">'{print $NF}'</span><span class="pln"> </span></li></ol></pre>
<blockquote>
<p>four</p>
</blockquote>
<p>你也可以用$NF做简单的数学，假如你需要倒数第二个字段：</p>
<pre class="prettyprint linenums prettyprinted" style=""><ol class="linenums"><li class="L0"><span class="pln">$ echo </span><span class="str">'one two three four'</span><span class="pln"> </span><span class="pun">|</span><span class="pln"> awk </span><span class="str">'{print $(NF-1)}'</span><span class="pln"> </span></li></ol></pre>
<blockquote>
<p>three</p>
</blockquote>
<p>甚至是中间的字段：</p>
<pre class="prettyprint linenums prettyprinted" style=""><ol class="linenums"><li class="L0"><span class="pln">$ echo </span><span class="str">'one two three four'</span><span class="pln"> </span><span class="pun">|</span><span class="pln"> awk </span><span class="str">'{print $((NF/2)+1)}'</span><span class="pln"> </span></li></ol></pre>
<blockquote>
<p>three</p>
</blockquote>
<p>而且这一切都非常有用，同样你可以摆脱强制使用sed，cut，和grep来得到这些结果（尽管要做更多的操作）。</p>
<p>因此，我将最后为你介绍awk的一个特性，维持跨行状态。</p>
<pre class="prettyprint linenums prettyprinted" style=""><ol class="linenums"><li class="L0"><span class="pln"> $ echo </span><span class="pun">-</span><span class="pln">e </span><span class="str">'one 1\ntwo 2'</span><span class="pln"> </span><span class="pun">|</span><span class="pln"> awk </span><span class="str">'{print $2}'</span><span class="pln"> </span></li></ol></pre>
<blockquote>
<p>1</p>
<p>2</p>
</blockquote>
<pre class="prettyprint linenums prettyprinted" style=""><ol class="linenums"><li class="L0"><span class="pln">$ echo </span><span class="pun">-</span><span class="pln">e </span><span class="str">'one 1\ntwo 2'</span><span class="pln"> </span><span class="pun">|</span><span class="pln"> awk </span><span class="str">'{sum+=$2} END {print sum}'</span><span class="pln"> </span></li></ol></pre>
<blockquote>
<p>3</p>
</blockquote>
<p>（END代表的是我们在执行完每行的处理<strong>之后</strong>只处理下面的代码块）</p>
<p>这里我使用的例子是统计web服务器请求日志的字节大小。想象一下我们有如下这样的日志：</p>
<pre class="prettyprint linenums prettyprinted" style=""><ol class="linenums"><li class="L0"><span class="pln">$ cat requests</span><span class="pun">.</span><span class="pln">log </span></li></ol></pre>
<blockquote>
<p>Jul 23 18:57:12 httpd[31950]: "GET /foo/bar HTTP/1.1" 200 344</p>
<p>Jul 23 18:57:13 httpd[31950]: "GET / HTTP/1.1" 200 9300</p>
<p>Jul 23 19:01:27 httpd[31950]: "GET / HTTP/1.1" 200 9300</p>
<p>Jul 23 19:01:55 httpd[31950]: "GET /foo/baz HTTP/1.1" 200 6401</p>
<p>Jul 23 19:02:31 httpd[31950]: "GET /foo/baz?page=2 HTTP/1.1" 200 6312</p>
</blockquote>
<p>我们知道最后一个字段是响应的字节大小。我们已经学习了如何使用$NF来抽取他们：</p>
<pre class="prettyprint linenums prettyprinted" style=""><ol class="linenums"><li class="L0"><span class="pln">$ </span><span class="pun">&lt;</span><span class="pln"> requests</span><span class="pun">.</span><span class="pln">log awk </span><span class="str">'{print $NF}'</span><span class="pln"> </span></li></ol></pre>
<blockquote>
<p>344</p>
<p>9300</p>
<p>9300</p>
<p>6401</p>
<p>6312</p>
</blockquote>
<p>接着我们可以将它们累加到一个变量中来收集我们的web服务其在日志中这段时间内的响应客户端的字节数量</p>
<pre class="prettyprint linenums prettyprinted" style=""><ol class="linenums"><li class="L0"><span class="pln">$ </span><span class="pun">&lt;</span><span class="pln"> requests</span><span class="pun">.</span><span class="pln">log awk </span><span class="str">'{totalBytes+=$NF} END {print totalBytes}'</span><span class="pln"> </span></li></ol></pre>
<blockquote>
<p>31657</p>
</blockquote>
