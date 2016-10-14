---

title: 如何在Linux里使用xargs命令
category: Linux
---

<td id="article_content"><p>你是否遇到过这样的情况，需要一遍又一遍地对多个文件执行同样的操作？如果有过，那你肯定会深有感触这是多么的无聊和效率低下。还好有种简单的方式，可以在基于Unix的操作系统中使用xargs命令解决这个烦恼。通过这个命令你可以有效地处理多个文件，节省你的时间和精力。在这篇教程中，你可以学到如何一次性对多个文件执行命令或脚本操作，再也不用担心像单独处理无数个日志或数据文件那样吓人的任务了。</p>
<p><img src="http://img.linux.net.cn/data/attachment/album/201411/13/104159mkcthh5ttcdmk4m1.jpg" alt=""></p>
<p>xargs命令有两个要点。第一，你必须列出目标文件。第二，你必须指定对每个文件需要执行的命令或脚本。</p>
<p>这篇教程会涉及三个应用场景，xargs命令被用来处理分布在不同目录下的文件：</p>
<ol class="task-list">
<li>计算所有文件的行数</li>
<li>打印指定文件的第一行</li>
<li>对每个文件执行一个自定义脚本</li>
</ol>
<p>请看下面这个叫xargstest的目录（用tree命令以及-i和-f选项显示了目录树结构，这样可以避免缩进显示而且每个文件都会带有完整路径）：</p>
<pre class="prettyprint linenums prettyprinted" style=""><ol class="linenums"><li class="L0"><span class="pln">$ tree </span><span class="pun">-</span><span class="kwd">if</span><span class="pln"> xargstest</span><span class="pun">/</span><span class="pln"> </span></li></ol></pre>
<p><a href="https://camo.githubusercontent.com/c4ef63ddcd2a7eefa33a66d4d73a2903398ecfb9/68747470733a2f2f6661726d332e737461746963666c69636b722e636f6d2f323934322f31353333343938353938315f636531613139326465662e6a7067" target="_blank"><img src="https://camo.githubusercontent.com/c4ef63ddcd2a7eefa33a66d4d73a2903398ecfb9/68747470733a2f2f6661726d332e737461746963666c69636b722e636f6d2f323934322f31353333343938353938315f636531613139326465662e6a7067" alt="" data-canonical-src="http://img.linux.net.cn/data/attachment/album/201411/13/104348ikionvqiydiilra8.jpg"></a></p>
<p>这六个文件的内容分别如下：</p>
<p><a href="https://camo.githubusercontent.com/e6eb1c67bfc8fd769859d17e8cea8808932bfbb1/68747470733a2f2f6661726d342e737461746963666c69636b722e636f6d2f333838322f31353334363238373636325f613330383461386534665f6f2e706e67" target="_blank"><img src="https://camo.githubusercontent.com/e6eb1c67bfc8fd769859d17e8cea8808932bfbb1/68747470733a2f2f6661726d342e737461746963666c69636b722e636f6d2f333838322f31353334363238373636325f613330383461386534665f6f2e706e67" alt="" data-canonical-src="http://img.linux.net.cn/data/attachment/album/201411/13/104350irbfubd1neft2fft.png"></a></p>
<p>这个<strong>xargstest</strong>目录，以及它包含的子目录和文件将用在下面的例子中。</p>
<h3><a id="user-content-场景1计算所有文件的行数" class="anchor" href="https://github.com/LCTT/TranslateProject/blob/master/translated/tech/20140928%20How%20to%20use%20xargs%20command%20in%20Linux.md#%E5%9C%BA%E6%99%AF1%E8%AE%A1%E7%AE%97%E6%89%80%E6%9C%89%E6%96%87%E4%BB%B6%E7%9A%84%E8%A1%8C%E6%95%B0"></a>场景1：计算所有文件的行数</h3>
<p>就像之前提到的，使用xargs命令的第一个要点是一个用来运行命令或脚本的文件列表。我们可以用find命令来确定和列出目标文件。选项<strong>-name 'file??'</strong>指定了xargstest目录下那些名字以"file"开头并跟随两个任意字符的文件才是匹配的。这个搜索默认是递归的，意思是find命令会在xargstest和它的子目录下搜索匹配的文件。</p>
<pre class="prettyprint linenums prettyprinted" style=""><ol class="linenums"><li class="L0"><span class="pln">$ find xargstest</span><span class="pun">/</span><span class="pln"> </span><span class="pun">-</span><span class="pln">name </span><span class="str">'file??'</span><span class="pln"> </span></li></ol></pre>
<hr>
<pre class="prettyprint linenums prettyprinted" style=""><ol class="linenums"><li class="L0"><span class="pln">xargstest</span><span class="pun">/</span><span class="pln">dir3</span><span class="pun">/</span><span class="pln">file3B</span></li><li class="L1"><span class="pln">xargstest</span><span class="pun">/</span><span class="pln">dir3</span><span class="pun">/</span><span class="pln">file3A</span></li><li class="L2"><span class="pln">xargstest</span><span class="pun">/</span><span class="pln">dir1</span><span class="pun">/</span><span class="pln">file1A</span></li><li class="L3"><span class="pln">xargstest</span><span class="pun">/</span><span class="pln">dir1</span><span class="pun">/</span><span class="pln">file1B</span></li><li class="L4"><span class="pln">xargstest</span><span class="pun">/</span><span class="pln">dir2</span><span class="pun">/</span><span class="pln">file2B</span></li><li class="L5"><span class="pln">xargstest</span><span class="pun">/</span><span class="pln">dir2</span><span class="pun">/</span><span class="pln">file2A</span></li></ol></pre>
<p>我们可以通过管道把结果发给sort命令让文件名按顺序排列：</p>
<pre class="prettyprint linenums prettyprinted" style=""><ol class="linenums"><li class="L0"><span class="pln">$ find xargstest</span><span class="pun">/</span><span class="pln"> </span><span class="pun">-</span><span class="pln">name </span><span class="str">'file??'</span><span class="pln"> </span><span class="pun">|</span><span class="pln"> sort </span></li></ol></pre>
<hr>
<pre class="prettyprint linenums prettyprinted" style=""><ol class="linenums"><li class="L0"><span class="pln">xargstest</span><span class="pun">/</span><span class="pln">dir1</span><span class="pun">/</span><span class="pln">file1A</span></li><li class="L1"><span class="pln">xargstest</span><span class="pun">/</span><span class="pln">dir1</span><span class="pun">/</span><span class="pln">file1B</span></li><li class="L2"><span class="pln">xargstest</span><span class="pun">/</span><span class="pln">dir2</span><span class="pun">/</span><span class="pln">file2A</span></li><li class="L3"><span class="pln">xargstest</span><span class="pun">/</span><span class="pln">dir2</span><span class="pun">/</span><span class="pln">file2B</span></li><li class="L4"><span class="pln">xargstest</span><span class="pun">/</span><span class="pln">dir3</span><span class="pun">/</span><span class="pln">file3A</span></li><li class="L5"><span class="pln">xargstest</span><span class="pun">/</span><span class="pln">dir3</span><span class="pun">/</span><span class="pln">file3B</span></li></ol></pre>
<p>然后我们需要第二个要素，就是需要执行的命令。我们使用带有-l选项的wc命令来计算每个文件包含的换行符数目（会在输出的每一行的前面打印出来）：</p>
<pre class="prettyprint linenums prettyprinted" style=""><ol class="linenums"><li class="L0"><span class="pln">$ find xargstest</span><span class="pun">/</span><span class="pln"> </span><span class="pun">-</span><span class="pln">name </span><span class="str">'file??'</span><span class="pln"> </span><span class="pun">|</span><span class="pln"> sort </span><span class="pun">|</span><span class="pln"> xargs wc </span><span class="pun">-</span><span class="pln">l </span></li></ol></pre>
<hr>
<pre class="prettyprint linenums prettyprinted" style=""><ol class="linenums"><li class="L0"><span class="pln"> </span><span class="lit">1</span><span class="pln"> xargstest</span><span class="pun">/</span><span class="pln">dir1</span><span class="pun">/</span><span class="pln">file1A</span></li><li class="L1"><span class="pln"> </span><span class="lit">2</span><span class="pln"> xargstest</span><span class="pun">/</span><span class="pln">dir1</span><span class="pun">/</span><span class="pln">file1B</span></li><li class="L2"><span class="pln"> </span><span class="lit">3</span><span class="pln"> xargstest</span><span class="pun">/</span><span class="pln">dir2</span><span class="pun">/</span><span class="pln">file2A</span></li><li class="L3"><span class="pln"> </span><span class="lit">4</span><span class="pln"> xargstest</span><span class="pun">/</span><span class="pln">dir2</span><span class="pun">/</span><span class="pln">file2B</span></li><li class="L4"><span class="pln"> </span><span class="lit">5</span><span class="pln"> xargstest</span><span class="pun">/</span><span class="pln">dir3</span><span class="pun">/</span><span class="pln">file3A</span></li><li class="L5"><span class="pln"> </span><span class="lit">6</span><span class="pln"> xargstest</span><span class="pun">/</span><span class="pln">dir3</span><span class="pun">/</span><span class="pln">file3B</span></li><li class="L6"><span class="lit">21</span><span class="pln"> total</span></li></ol></pre>
<p>可以看到，不用对每个文件手动执行一次wc -l命令，而xargs命令可以让你在一步里完成所有操作。那些之前看起来无法完成的任务，例如单独处理数百个文件，现在可以相当轻松地完成了。</p>
<h3><a id="user-content-场景2打印指定文件的第一行" class="anchor" href="https://github.com/LCTT/TranslateProject/blob/master/translated/tech/20140928%20How%20to%20use%20xargs%20command%20in%20Linux.md#%E5%9C%BA%E6%99%AF2%E6%89%93%E5%8D%B0%E6%8C%87%E5%AE%9A%E6%96%87%E4%BB%B6%E7%9A%84%E7%AC%AC%E4%B8%80%E8%A1%8C"></a>场景2：打印指定文件的第一行</h3>
<p>既然你已经有一些使用xargs命令的基础，你可以自由选择执行什么命令。有时，你也许希望只对一部分文件执行操作而忽略其他的。在这种情况下，你可以使用find命令的-name选项以及?通配符（匹配任意单个字符）来选中特定文件并通过管道输出给xargs命令。举个例子，如果你想打印以“B”字符结尾的文件而忽略以“A”结尾的文件的第一行，可以使用下面的find、xargs和head命令组合来完成（head -n1会打印一个文件的第一行）：</p>
<pre class="prettyprint linenums prettyprinted" style=""><ol class="linenums"><li class="L0"><span class="pln">$ find xargstest</span><span class="pun">/</span><span class="pln"> </span><span class="pun">-</span><span class="pln">name </span><span class="str">'file?B'</span><span class="pln"> </span><span class="pun">|</span><span class="pln"> sort </span><span class="pun">|</span><span class="pln"> xargs head </span><span class="pun">-</span><span class="pln">n1 </span></li></ol></pre>
<hr>
<pre class="prettyprint linenums prettyprinted" style=""><ol class="linenums"><li class="L0"><span class="pun">==&gt;</span><span class="pln"> xargstest</span><span class="pun">/</span><span class="pln">dir1</span><span class="pun">/</span><span class="pln">file1B </span><span class="pun">&lt;==</span></li><li class="L1"><span class="pln">one</span></li><li class="L2"><span class="pln">&nbsp;</span></li><li class="L3"><span class="pun">==&gt;</span><span class="pln"> xargstest</span><span class="pun">/</span><span class="pln">dir2</span><span class="pun">/</span><span class="pln">file2B </span><span class="pun">&lt;==</span></li><li class="L4"><span class="pln">one</span></li><li class="L5"><span class="pln">&nbsp;</span></li><li class="L6"><span class="pun">==&gt;</span><span class="pln"> xargstest</span><span class="pun">/</span><span class="pln">dir3</span><span class="pun">/</span><span class="pln">file3B </span><span class="pun">&lt;==</span></li><li class="L7"><span class="pln">one</span></li></ol></pre>
<p>你将看到只有以“B”结尾的文件会被处理，而所有以“A”结尾的文件都被忽略了。</p>
<h3><a id="user-content-场景3对每个文件执行一个自定义脚本" class="anchor" href="https://github.com/LCTT/TranslateProject/blob/master/translated/tech/20140928%20How%20to%20use%20xargs%20command%20in%20Linux.md#%E5%9C%BA%E6%99%AF3%E5%AF%B9%E6%AF%8F%E4%B8%AA%E6%96%87%E4%BB%B6%E6%89%A7%E8%A1%8C%E4%B8%80%E4%B8%AA%E8%87%AA%E5%AE%9A%E4%B9%89%E8%84%9A%E6%9C%AC"></a>场景3：对每个文件执行一个自定义脚本</h3>
<p>最后，你也许希望对一些文件执行一个自定义脚本（例如Bash、Python或是Perl）。要做到这一点，只要简单地用你的自定义脚本名字替换掉之前例子中的wc和head命令就好了：</p>
<pre class="prettyprint linenums prettyprinted" style=""><ol class="linenums"><li class="L0"><span class="pln">$ find xargstest</span><span class="pun">/</span><span class="pln"> </span><span class="pun">-</span><span class="pln">name </span><span class="str">'file??'</span><span class="pln"> </span><span class="pun">|</span><span class="pln"> xargs myscript</span><span class="pun">.</span><span class="pln">sh </span></li></ol></pre>
<p>自定义脚本<strong>myscript.sh</strong>需要写成接受一个文件名作为参数并处理这个文件。上面的命令将为find命令找到的每个文件分别调用脚本。</p>
<p>注意一下上面的例子中的文件名并没有包含空格。通常来说，在Linux环境下操作没有空格的文件名会舒服很多。如果你实在是需要处理名字中带有空格的文件，上边的命令就不能用了，需要稍微处理一下来让它可以被接受。这可以通过find命令的-print0选项（它会打印完整的文件名到标准输出，并以空字符结尾），以及xargs命令的-0选项（它会以空字符作为字符串结束标记）来实现，就像下面的例子：</p>
<pre class="prettyprint linenums prettyprinted" style=""><ol class="linenums"><li class="L0"><span class="pln">$ find xargstest</span><span class="pun">/</span><span class="pln"> </span><span class="pun">-</span><span class="pln">name </span><span class="str">'file*'</span><span class="pln"> </span><span class="pun">-</span><span class="pln">print0 </span><span class="pun">|</span><span class="pln"> xargs </span><span class="pun">-</span><span class="lit">0</span><span class="pln"> myscript</span><span class="pun">.</span><span class="pln">sh </span></li></ol></pre>
<p>注意一下，-name选项所跟的参数已经改为'file*'，意思是所有以"file"开头而结尾可以是任意字符的文件都会被选中。</p>
<h3><a id="user-content-总结" class="anchor" href="https://github.com/LCTT/TranslateProject/blob/master/translated/tech/20140928%20How%20to%20use%20xargs%20command%20in%20Linux.md#%E6%80%BB%E7%BB%93"></a>总结</h3>
<p>在看完这篇教程后你应该会理解xargs命令的作用，以及如何应用到自己的工作中。很快你就可以有时间享受这个命令所带来的高效率，而不用把你的时间耗费在一些重复的任务上了。想了解更详细的信息以及更多的选项，你可以在终端中输入'man xargs'命令来查看xargs的文档。</p>
<hr>
<p>via:&nbsp;<a href="http://xmodulo.com/xargs-command-linux.html">http://xmodulo.com/xargs-command-linux.html</a></p>
<p>作者：<a href="http://xmodulo.com/author/joshua">Joshua Reed</a>&nbsp;译者：<a href="https://github.com/zpl1025">zpl1025</a>&nbsp;校对：<a href="https://github.com/carolinewuyan">Caroline</a></p>
<p>本文由&nbsp;<a href="https://github.com/LCTT/TranslateProject">LCTT</a>&nbsp;原创翻译，<a href="http://linux.cn/">Linux中国</a>&nbsp;荣誉推出</p>

<div class="copyright">
    <div>来源： xmodulo</div>    <div>
    	原文： <a href="http://xmodulo.com/xargs-command-linux.html" target="_blank">http://xmodulo.com/xargs-command-linux.html</a>&nbsp;&nbsp;&nbsp;&nbsp;    	作者： Joshua Reed    </div>

    <div>
    	    	译者： zpl1025    </div>

                	<div>本文是原创投递或翻译投递，<href="http: linux.cn="" "="">Linux中国首发地址：<a href="http://linux.cn/article-4212-1.html">http://linux.cn/article-4212-1.html</a></href="http:></div><div><span style="color:red;">欢迎转载，敬请在正文中标注并保留原文/译文链接和作者/译者等信息</span></div>

</div>
<div class="hm">
<a title="分享到腾讯微博" href="javascript:void( share_tqq(SITEURL + 'article-4212-1.html','article_title','article_content','http://img.linux.net.cn/data/attachment/album/201411/13/104159mkcthh5ttcdmk4m1.jpg.large.jpg') );" class="tqq_large"></a>
<a title="分享到新浪微博" href="javascript:void( share_tsina(SITEURL + 'article-4212-1.html','article_title','article_content','http://img.linux.net.cn/data/attachment/album/201411/13/104159mkcthh5ttcdmk4m1.jpg.large.jpg') );" class="tsina_large"></a>
</div>
</td>
