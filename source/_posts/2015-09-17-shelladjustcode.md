---

title: Shell 通配符、元字符、转义符使用实例介绍
category: Shell
---


> 说到shell通配符（wildcard），大家在使用时候会经常用到。下面是一个实例：

		~/shell $ ls
		a.txt  b.txt  c.old

		~/shell $ ls *.txt
		a.txt  b.txt

		~/shell $ ls d*.txt
		ls: 无法访问 d*.txt: 没有那个文件或目录

从上面这个实例，不知道大家有没有发现问题呢。我们先了解一下，通配符相关知识，再分析下这个实例吧。

一、linux shell通配符(wildcard)

通配符是由shell处理的（不是由所涉及到命令语句处理的，其实我们在shell各个命令中也没有发现有这些通配符介绍）, 它只会出现在 命令的“参数”里（它不用在 命令名称里， 也不用在 操作符上）。<br>
当shell在“参数”中遇到了通配符时，shell会将其当作路径或文件名去在磁盘上搜寻可能的匹配：若符合要求的匹配存在，则进行代换(路径扩展)；否则就将该通配符作为一个普通字符传递给“命令”，然后再由命令进行处理。总之，通配符 实际上就是一种shell实现的路径扩展功能。在 通配符被处理后, shell会先完成该命令的重组，然后再继续处理重组后的命令，直至执行该命令。



我们回过头分析上面命令吧：在第2个命令中，*.txt 实际shell搜索文件,找到了符合条件的文件，命令会变成：

	    ls a.txt b.txt

所以说实际在执行ls 时候传给它的是 `a.txt` `b.txt` .



而命令3，d*.txt 由于当前目录下面没有这样的文件或目录，直接将`d*.txt` 作为ls 参数，传给了 ls .这个时候”*” 只是一个普通的 ls 参数而已，已经失去了它通配意义。 由于找不到文件，所以会出现：无法访问提示！

了解了shell通配符，我们现在看下，shell常见通配符有那一些了。

shell常见通配符：

字符	含义	实例
`*`	匹配 0 或多个字符	`a*b`  a与b之间可以有任意长度的任意字符, 也可以一个也没有, 如`aabcb`, `axyzb`, `a012b`, `ab`。<br>
`?`	匹配任意一个字符	a?b  a与b之间必须也只能有一个字符, 可以是任意字符, 如`aab`, `abb`, `acb`, `a0b`。
`[list]` 	匹配 list 中的任意单一字符	`a[xyz]b`   a与b之间必须也只能有一个字符, 但只能是 x 或 y 或 z, 如: `axb`, `ayb`, `azb`。<br>
`[!list]` 	匹配 除list 中的任意单一字符	`a[!0-9]b`  a与b之间必须也只能有一个字符, 但不能是阿拉伯数字, 如`axb`, `aab`, `a-b`。<br>
`[c1-c2]`	匹配 c1-c2 中的任意单一字符 如：`[0-9]` `[a-z]`	`a[0-9]b`  0与9之间必须也只能有一个字符 如`a0b`, `a1b`... `a9b`。<br>
`{string1,string2,...}`	匹配 sring1 或 string2 (或更多)其一字符串	`a{abc,xyz,123}b`    a与b之间只能是abc或xyz或123这三个字符串之一。<br>


需要说明的是：通配符看起来有点象正则表达式语句，但是它与正则表达式不同的，不能相互混淆。把通配符理解为shell 特殊代号字符就可。而且涉及的只有，`*`,`?` `[]` ,`{}` 这几种。





二、shell元字符（特殊字符 Meta）

shell 除了有通配符之外，由shell 负责预先先解析后，将处理结果传给命令行之外，shell还有一系列自己的其他特殊字符。

		字符	说明
		IFS	由 <space> 或 <tab> 或 <enter> 三者之一组成(我们常用 space )。
		CR	由 <enter> 产生。
		=	设定变量。
		$	作变量或运算替换(请不要与 shell prompt 搞混了)。
		>	重导向 stdout。 *
		<	重导向 stdin。 *
		|	命令管线。 *
		&	重导向 file descriptor ，或将命令置于背境执行。 *
		( )	将其内的命令置于 nested subshell 执行，或用于运算或命令替换。 *
		{ }	将其内的命令置于 non-named function 中执行，或用在变量替换的界定范围。
		;	在前一个命令结束时，而忽略其返回值，继续执行下一个命令。 *
		&&	在前一个命令结束时，若返回值为 true，继续执行下一个命令。 *
		||	在前一个命令结束时，若返回值为 false，继续执行下一个命令。 *
		!	执行 history 列表中的命令。*
		加入”*” 都是作用在命令名直接。可以看到shell 元字符，基本是作用在命令上面，用作多命令分割（或者参数分割）。因此看到与通配符有相同的字符，但是实际上作用范围不同。所以不会出现混淆。



以下是man bash 得到的英文解析：

metacharacter
              A character that, when unquoted, separates words.  One of the following:
              |  & ; ( ) < > space tab
control operator
              A token that performs a control function.  It is one of the following symbols:
              || & && ; ;; ( ) | <newline>



三、shell转义符

有时候，我们想让 通配符，或者元字符 变成普通字符，不需要使用它。那么这里我们就需要用到转义符了。 shell提供转义符有三种。

		字符	说明
		‘’(单引号)	又叫硬转义，其内部所有的shell 元字符、通配符都会被关掉。注意，硬转义中不允许出现’(单引号)。
		“”(双引号)	又叫软转义，其内部只允许出现特定的shell 元字符：$用于参数代换 `用于命令代替
		\(反斜杠)	  又叫转义，去除其后紧跟的元字符或通配符的特殊意义。

man bash 英文解释如下：

		There are three quoting mechanisms: the escape character, single quotes, and double quotes.

实例:

		~/shell $ ls \*.txt
		ls: 无法访问 *.txt: 没有那个文件或目录

		~/shell $ ls '*.txt'
		ls: 无法访问 *.txt: 没有那个文件或目录

		~/shell $ ls 'a.txt'
		a.txt

		~/shell $ ls *.txt
		a.txt  b.txt

可以看到，加入了转义符 “*”已经失去了通配符意义了。
