---
layout: post
title: service中用Handler更新UI
category: android
---

> service里面更新UI还是用Handler好一点，之前一直用broadcast，发现太浪费资源了.
> 随着合进Systemui的东西越来越多，Systemui明显有延迟了，今天用handler写了状态栏网速，效果很不错。

###service

<table style="margin: 0px; padding: 0px; border: 0px; font-family: inherit; font-style: inherit; font-variant: inherit; font-weight: inherit; line-height: inherit; font-size: 18px; vertical-align: baseline; border-collapse: collapse; border-spacing: 0px;">
    <tbody style="margin: 0px; padding: 0px; border: 0px; font-family: inherit; font-style: inherit; font-variant: inherit; font-weight: inherit; line-height: inherit; vertical-align: baseline;">
        <tr style="margin: 0px; padding: 0px; border: 0px; font-family: inherit; font-style: inherit; font-variant: inherit; font-weight: inherit; line-height: inherit; vertical-align: baseline;">
            <td class="gutter" style="margin: 0px; padding: 0px; border: 0px; font-family: inherit; font-style: inherit; font-variant: inherit; line-height: inherit; font-size: 18px; vertical-align: middle;">
            <pre class="line-numbers" style="margin-bottom: 0px; border-top-style: none; border-bottom-style: none; border-left-style: none; font-family: Menlo, Monaco, 'Andale Mono', 'lucida console', 'Courier New', monospace; font-style: inherit; font-variant: inherit; font-weight: inherit; line-height: 1.45em; font-size: 13px; vertical-align: baseline; -webkit-box-shadow: none; box-shadow: none; border-top-left-radius: 0px; border-top-right-radius: 0px; border-bottom-right-radius: 0px; border-bottom-left-radius: 0px; color: rgb(255, 255, 255); text-align: right; text-shadow: rgb(2, 16, 20) 0px -1px; padding: 0.8em !important; border-right-width: 1px !important; border-right-style: solid !important; border-right-color: rgb(0, 35, 44) !important; background-image: url(http://zh.lucida.me/images/noise.png?1388941295) !important; background-color: rgb(51, 51, 51) !important; background-position: 0% 0%;">1
2
3
4
</pre>
            </td>
            <td class="code" style="margin: 0px; padding: 0px; border: 0px; font-family: inherit; font-style: inherit; font-variant: inherit; line-height: inherit; font-size: 18px; vertical-align: middle; width: 4581px;">
            <pre style="margin-bottom: 0px; padding: 0px; border: none; font-family: Menlo, Monaco, 'Andale Mono', 'lucida console', 'Courier New', monospace; font-style: inherit; font-variant: inherit; font-weight: inherit; line-height: 1.45em; font-size: 13px; vertical-align: baseline; -webkit-box-shadow: none; box-shadow: none; background-image: none; border-top-left-radius: 0px; border-top-right-radius: 0px; border-bottom-right-radius: 0px; border-bottom-left-radius: 0px; color: rgb(220, 220, 222);"><code style="margin: 0px; padding: 0.8em; border: 0px; font-style: inherit; font-variant: inherit; font-weight: inherit; line-height: 1.45em; vertical-align: baseline; overflow-y: hidden; display: block; overflow-x: auto; background-color: rgb(41, 61, 73); font-family: Menlo, Monaco, 'Andale Mono', 'lucida console', 'Courier New', monospace !important;">Message msg = new Message();
                msg.what = MainActivity.FLAG;
                msg.obj="haha";
                MainActivity.handler.sendMessage(msg); </code></pre>
            </td>
        </tr>
    </tbody>
</table>

###Acitivity

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
            <pre style="margin-bottom: 0px; padding: 0px; border: none; font-family: Menlo, Monaco, 'Andale Mono', 'lucida console', 'Courier New', monospace; font-style: inherit; font-variant: inherit; font-weight: inherit; line-height: 1.45em; font-size: 13px; vertical-align: baseline; -webkit-box-shadow: none; box-shadow: none; background-image: none; border-top-left-radius: 0px; border-top-right-radius: 0px; border-bottom-right-radius: 0px; border-bottom-left-radius: 0px; color: rgb(220, 220, 222);"><code style="margin: 0px; padding: 0.8em; border: 0px; font-style: inherit; font-variant: inherit; font-weight: inherit; line-height: 1.45em; vertical-align: baseline; overflow-y: hidden; display: block; overflow-x: auto; background-color: rgb(41, 61, 73); font-family: Menlo, Monaco, 'Andale Mono', 'lucida console', 'Courier New', monospace !important;"> handler = new Handler(){

            @Override
            public void handleMessage(Message msg) {
                super.handleMessage(msg);
                if(msg.what==FLAG){
                    text.setText((String)msg.obj);
                }
            }
        }; </code></pre>
            </td>
        </tr>
    </tbody>
</table>
