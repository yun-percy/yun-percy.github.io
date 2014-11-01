---
layout: post
title: 终端中的乐趣：6个有趣的Linux命令行工具
category: linux
---

<td id="article_content"><p>之前, 我们展示了一些有关有趣的 Linux 命令行命令的文章, 这些文章告诉我们, Linux 并不像看起来那样复杂, 如果我们知道如何使用的话, 反而会非常有趣. Linux 命令行可以简洁而完美地执行一些复杂的任务, 并且十分有趣.</p>
<ul>
<li><a href="http://linux.cn/article-2831-1.html">Linux命令及Linux终端的20个趣事</a></li>
<li><a href="http://linux.cn/article-4088-1.html">Linux终端的乐趣之把玩字词计数</a></li>
</ul>
<p>前者包含了20个有趣的 Linux 命令/脚本(和子命令), 得到了读者的高度赞扬. 而另一篇文章虽然没有之前那篇文章那么受欢迎，包含了一些命令/脚本和改进，让你能够玩儿转文本文件、单词和字符串.</p>
<p>这篇文章介绍了一些新的有趣命令和单行脚本，一定会让你感到欣喜.</p>
<h3 id="toc_1">1. pv 命令</h3>
<p>你也许曾经看到过电影里的模拟字幕, 它们好像是被实时敲打出来的. 如果我么能在终端里实现这样的效果, 那不是很好?</p>
<p>这是可以做到的. 我们可以安装通过 '<strong>apt</strong>' 或者 '<strong>yum</strong>' 工具在 Linux 系统上安装 '<strong>pv</strong>' 命令. 安装命令如下.</p>
<pre class="prettyprint linenums prettyprinted" style=""><ol class="linenums"><li class="L0"><span class="com"># yum install pv            [在基于 RedHat 的系统上]</span></li><li class="L1"><span class="pln">&nbsp;</span></li><li class="L2"><span class="com"># sudo apt-get install pv           [在基于 Debian 的系统上]</span></li></ol></pre>
<p>'<strong>pv</strong>' 命令安装成功之后, 我们尝试运行下面的单行命令在终端查看实时文字输出的效果.</p>
<pre class="prettyprint linenums prettyprinted" style=""><ol class="linenums"><li class="L0"><span class="pln">$ echo </span><span class="str">"Tecmint[dot]com is a community of Linux Nerds and Geeks"</span><span class="pln"> </span><span class="pun">|</span><span class="pln"> pv </span><span class="pun">-</span><span class="pln">qL </span><span class="lit">10</span><span class="pln"> </span></li></ol></pre>
<p><img src="http://img.linux.net.cn/data/attachment/album/201410/30/233254ak99abw9u1ni0uwk.gif" alt=""></p>
<p><em>正在运行的 pv 命令</em></p>
<p><strong>注意</strong>: '<strong>q</strong>' 选项表示'安静'，没有其他输出信息, '<strong>L</strong>' 选项表示每秒转化的字节数上限. 调整数字的值(必须是整数)可以以另外的方向显示文字效果。</p>
<h3 id="toc_2">2. toilet 命令</h3>
<p>用单行脚本命令 '<strong>toilet</strong>' 在终端里显示一个添加边框的文本怎么样呢？同样, 你必须保证 '<strong>toilet</strong>' 已经安装在你的电脑上. 如果没有的话, 请使用 apt 或 yum 安装. (译者注: 'toilet' 并不在 Fedora 的官方仓库里, 你可以从 github 上下载源代码来安装)</p>
<pre class="prettyprint linenums prettyprinted" style=""><ol class="linenums"><li class="L0"><span class="pln">$ </span><span class="kwd">while</span><span class="pln"> </span><span class="kwd">true</span><span class="pun">;</span><span class="pln"> </span><span class="kwd">do</span><span class="pln"> echo </span><span class="pun">“</span><span class="pln">$</span><span class="pun">(</span><span class="pln">date </span><span class="pun">|</span><span class="pln"> toilet </span><span class="pun">-</span><span class="pln">f term </span><span class="pun">-</span><span class="pln">F border </span><span class="pun">–</span><span class="typ">Tecmint</span><span class="pun">)”;</span><span class="pln"> sleep </span><span class="lit">1</span><span class="pun">;</span><span class="pln"> </span><span class="kwd">done</span></li></ol></pre>
<p><img src="http://img.linux.net.cn/data/attachment/album/201410/30/233344j2gfgogt2dpggj4d.gif" alt=""></p>
<p><em>正在运行的 toilet 命令</em></p>
<p><strong>注意</strong>: 上面的脚本需要使用 <strong>ctrl+z</strong> 键来暂停.</p>
<h3 id="toc_3">3. rig 命令</h3>
<p>这个命令每次生成一个随机的身份信息和地址. 要运行这个命令, 你需要用 apt 或 yum 安装 '<strong>rig</strong>'. (译者注: 'rig' 不在 Fedora 的官方仓库中, 我只在 rpmseek 上找到了 Ubuntu 的 deb 包, 可以使用它来安装.)</p>
<pre class="prettyprint linenums prettyprinted" style=""><ol class="linenums"><li class="L0"><span class="com"># rig</span></li></ol></pre>
<p><img src="http://img.linux.net.cn/data/attachment/album/201410/30/233417jsi3r1rbo4b4r1yo.gif" alt=""></p>
<p><em>正在运行的 rig 命令</em></p>
<h3 id="toc_4">4. aview 命令</h3>
<p>你觉得在终端用 ASCII 格式显示图片怎么样? 我们必须用 apt 或 yum 安装软件包 '<strong>aview</strong>'. (译者注: 'avieww' 不在 Fedora 的官方仓库中, 可以从 aview 的<a href="http://aa-project.sourceforge.net/aview/">项目主页</a>上下载源代码来安装. ) 在当前工作目录下有一个名为 '<strong>elephant.jpg</strong>' 的图片, 我想用 ASCII 模式在终端查看.</p>
<pre class="prettyprint linenums prettyprinted" style=""><ol class="linenums"><li class="L0"><span class="pln">$ asciiview elephant</span><span class="pun">.</span><span class="pln">jpg </span><span class="pun">-</span><span class="pln">driver curses </span></li></ol></pre>
<p><img src="http://img.linux.net.cn/data/attachment/album/201410/30/233454tf93rmx69y5moyo5.gif" alt=""></p>
<p><em>正在运行的 aview 命令</em></p>
<h3 id="toc_5">5. xeyes 命令</h3>
<p>在上一篇文章中, 我们介绍了 '<strong>oneko</strong>' 命令, 它可以显示一个追随鼠标指针运动的小老鼠. '<strong>xeyes</strong>' 是一个类似的图形程序, 当你运行它, 你可以看见小怪物的两个眼球追随你的鼠标运动.</p>
<pre class="prettyprint linenums prettyprinted" style=""><ol class="linenums"><li class="L0"><span class="pln">$ xeyes</span></li></ol></pre>
<p><img src="http://img.linux.net.cn/data/attachment/album/201410/30/233549lqnv0lv6b5l6ose0.gif" alt=""></p>
<p><em>正在运行的 xeyes 命令</em></p>
<h3 id="toc_6">6. cowsay 命令</h3>
<p>你是否还记得上一次我们介绍的这个命令? 它可以显示一段预先确定的文本和一个字符构成的奶牛. 如果你想使用其它动物来代替奶牛怎么办? 查看可用的动物列表:</p>
<pre class="prettyprint linenums prettyprinted" style=""><ol class="linenums"><li class="L0"><span class="pln">$ cowsay </span><span class="pun">-</span><span class="pln">l </span></li></ol></pre>
<p>如何用ASCII描绘蛇吞象？</p>
<pre class="prettyprint linenums prettyprinted" style=""><ol class="linenums"><li class="L0"><span class="pln">$ cowsay </span><span class="pun">-</span><span class="pln">f elephant</span><span class="pun">-</span><span class="kwd">in</span><span class="pun">-</span><span class="pln">snake </span><span class="typ">Tecmint</span><span class="pln"> </span><span class="kwd">is</span><span class="pln"> </span><span class="typ">Best</span><span class="pln"> </span></li></ol></pre>
<p><img src="http://img.linux.net.cn/data/attachment/album/201410/30/233636sz2mvmn24tkbzntx.gif" alt=""></p>
<p><em>正在运行的 cowsay 命令</em></p>
<p>换作山羊又会怎样？</p>
<pre class="prettyprint linenums prettyprinted" style=""><ol class="linenums"><li class="L0"><span class="pln">$ cowsay </span><span class="pun">-</span><span class="pln">f gnu </span><span class="typ">Tecmint</span><span class="pln"> </span><span class="kwd">is</span><span class="pln"> </span><span class="typ">Best</span><span class="pln"> </span></li></ol></pre>
<p><img src="http://img.linux.net.cn/data/attachment/album/201410/30/233656gc9r66577vjgs1pv.gif" alt=""></p>
<p><em>正在运行的 山羊cowsay 命令</em></p>
<p>今天就到这里吧. 我将带着另一篇有趣的文章回来. 不要忘记在下面留下您的评论.</p>
<hr>
<p>via: <a href="http://www.tecmint.com/linux-funny-commands/">http://www.tecmint.com/linux-funny-commands/</a></p>
<p>作者：<a href="http://www.tecmint.com/author/avishek/">Avishek Kumar</a> 译者：<a href="https://github.com/wangjiezhe">wangjiezhe</a> 校对：<a href="https://github.com/carolinewuyan">Caroline</a></p>
<p>本文由 <a href="https://github.com/LCTT/TranslateProject">LCTT</a> 原创翻译，<a href="http://linux.cn/">Linux中国</a> 荣誉推出</p>

<div class="copyright">
        <div>
    	原文： <a href="http://www.tecmint.com/linux-funny-commands/" target="_blank">http://www.tecmint.com/linux-funny-commands/</a>&nbsp;&nbsp;&nbsp;&nbsp;    	    </div>

    <div>
    	    	    </div>

                	<div>本文是原创投递或翻译投递，<href="http: linux.cn="" "="">Linux中国首发地址：<a href="http://linux.cn/article-4128-1.html">http://linux.cn/article-4128-1.html</a></href="http:></div><div><span style="color:red;">欢迎转载，敬请在正文中标注并保留原文/译文链接和作者/译者等信息</span></div>

</div>
<div class="hm">
<a title="分享到腾讯微博" href="javascript:void( share_tqq(SITEURL + 'article-4128-1.html','article_title','article_content','http://img.linux.net.cn/data/attachment/album/201410/30/234015hk8rytpyhr8hmihb.jpg.large.jpg') );" class="tqq_large"></a>
<a title="分享到新浪微博" href="javascript:void( share_tsina(SITEURL + 'article-4128-1.html','article_title','article_content','http://img.linux.net.cn/data/attachment/album/201410/30/234015hk8rytpyhr8hmihb.jpg.large.jpg') );" class="tsina_large"></a>
</div>
</td>
