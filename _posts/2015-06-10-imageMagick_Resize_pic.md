---
layout: post
title: ImageMagick之图片缩放
category: tools
tags : [ linux,缩放,imagemagick，图片]
---

本文为转载：

[原帖地址：http://www.netingcn.com/imagemagick-resize.html](http://www.netingcn.com/imagemagick-resize.html)



<div class="content">
			<p>利用ImageMagicK的convert命令，能很方便的实现图片的放大缩小，可以进行等比例缩放，也能缩放到指定的固定大小。缩放的参数resize，由它来指定缩放后图片的宽高，比如“200×100”。</p>
<ul>
<li><strong>等比缩放 </strong>例如把图片a.jpg缩放到200×100的尺寸,可以用命令:</li>
</ul>
<div class="code">convert -resize 200×100 src.jpg dest.jpg</div>
<p><strong>注意：</strong>虽然明确指定了图片大小为200×100，但dest.jpg的不一定就是200×100，因为是等比缩放的，dest.jpg大小取决原始图片比例。假设src.jpg的大小是500×200,那么缩放后dest.jpg的真实大小为200×80,再比如src.jpg的大小是300×200,缩放后的尺寸为150×100。<strong>原则是缩放后的尺寸最少有一个是符合宽或高，且另外一个不能大于指定的参数中对应的宽或高。</strong>另外可以通过只指定宽或高的方式来进行缩放。例如：</p>
<pre>convert -resize 200 src.jpg dest.jpg
得到图片宽为200，高根据原始图片比例计算而来

convert -resize x100 src.jpg dest.jpg
得到的图片高位100，宽根据原始图片比例计算而来
</pre>
<ul>
<li><strong>固定宽高缩放。</strong>即不考虑原是图宽高的比例，把图片缩放到指定大小。例如命令：</li>
</ul>
<pre>convert -resize 200x100! src.jpg dest.jpg
</pre>
<p><strong>说明：</strong>区别是宽高后面多了一个叹号，此时不管原图片比例如何，缩放后的图片大小都是200×100，这样就可能导致图片变形。注意：在linux环境对参数需要用单引号引起来，而windows下又不能使用单引号。</p>
<ul>
<li><strong>有条件缩放。</strong>可以通过&gt;或&lt;符号来控制原始图片是否进行缩放，例如在处理一批尺寸大小各异的图片，只想把尺寸大于给定的值图片才进行缩小，如果没有指定条件，可能会把那些小的图片进行了放大处理。</li>
</ul>
<pre>convert -resize "200x100&gt;" src.jpg dest.jpg
注解：只有当src.jpg的宽大于200或高大于100时候，才进行缩小处理，
否则生成的dest.jpg和src.jpg具有一样的尺寸。
注意在linux下要用单引号替换成双引号，即'200x100&gt;'。

convert -resize "200x100&lt;"&nbsp;src.jpg dest.jpg
注解：只有当src.jpg的宽小于200或高小于100时候，才进行放大处理，
否则生成的dest.jpg和src.jpg具有一样的尺寸。
注意在linux下要用单引号替换成双引号，即'200x100&lt;'
</pre>
<p>上述两种有条件缩放是按原始图等比例缩放的，也就是对符合条件的图片进行等比缩放。同时有条件缩放也可以与固定大小缩放联合起来用。例如如下命令。</p>
<pre>convert -resize "800x100&gt;!" src.jpg dest.jpg
注解：假设src.jpg尺寸是300x200。很显然src.jpg的高(200)是大于指定值高(100)，
符合缩小的条件，由于执行的不是等比缩放，
所以dest.jpg的尺寸理论上是800x100，由于执行是缩小操作
显然800是超过原始图片宽的，故dest.jpg的宽只能是300

convert -resize "10x1000&lt;!" src.jpg dest.jpg
注解：假设src.jpg尺寸是300x200，src.jpg的高(200)小于指定值高(1000)，
因此该命令将执行放大图片操作，dest.jpg的高将放到到1000,
由于目标图片宽比原始图片还小，但是执行的是放大操作，因此只能用原始图片的宽，
所以得到的dest.jpg的尺寸是300x1000。
</pre>
