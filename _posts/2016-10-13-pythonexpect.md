---
layout: post
title: [转]使用Python的Pexpect模块执行SSH登陆
category: 语法
tags : [python,mysql ,note ]
---

[原文地址](http://guweigang.com/blog/2012/10/25/using-python-ssh-landing-module-performs-pexpect/
)> Pexpect 的使用范围很广，可以用来实现与 ssh, ftp , telnet 等程序的自动交互；可以用来自动复制软件安装包并在不同机器自动安装；还可以用来实现软件测试中与命令行交互的自动化。### 下载安装：

```shdownload pexpect-2.3.tar.gztar zxvf pexpect-2.3.tar.gzcd pexpect-2.3python setup.py install (do this as root)```
> 其实这个过程一点都不难，唯一的问题就是登陆之后终端尺寸的大小（我理解是buffer），因为Pexpect在代码里面有hardcode，把终端尺寸默认设成(24, 80)了。所以你连上后打开emacs会发现，emacs只占据了整个终端的一小部分。```# pexpect hard-codes the terminal size as (24,80) (rows,columns).# This causes problems because any line longer than 80 characters gets# completely overwrapped on the printed outptut (even though# internally the code runs fine).  We reset this to 99 rows X 200# columns (arbitrarily chosen), which should avoid problems in all# reasonable cases.c.setwinsize(24,80)```
OK, 知道问题了我们可以开始解决，既然支持`child.setwinsize()`，那我们就想办法获取当前终端大小，并且在ssh目标主机之后设置终端大小。### 获取窗口大小```pydef getwinsize():    """This returns the window size of the child tty.    The return value is a tuple of (rows, cols).    """    if 'TIOCGWINSZ' in dir(termios):        TIOCGWINSZ = termios.TIOCGWINSZ    else:        TIOCGWINSZ = 1074295912L # Assume    s = struct.pack('HHHH', 0, 0, 0, 0)    x = fcntl.ioctl(sys.stdout.fileno(), TIOCGWINSZ, s)    return struct.unpack('HHHH', x)[0:2]＃ 设置大小    child.expect('-bash-baidu-ssl.*')    child.sendline('ssh ' + host)    winsize = getwinsize();    child.setwinsize(winsize[0], winsize[1])```
OK, 一切正常。打开emacs，感觉很幸福，但连接后我发现连接之前终端窗口本来就很小，现在想把窗终窗口最大化，一试就杯具了，窗口的确最大化了，但是emacs所占区域仍旧没有变化，也就是说连接后的子窗口尺寸和当前窗口尺雨不匹配，Signal终于要派上用场了：```pydef sigwinch_passthrough (sig, data):    winsize = getwinsize()    global child    child.setwinsize(winsize[0],winsize[1])#最后监听事件：signal.signal(signal.SIGWINCH, sigwinch_passthrough)```
一切正常！## 下面贴上所有代码：```py#!/usr/bin/pythonimport sysimport timeimport pexpectimport osimport structimport fcntlimport termiosimport signaldef sigwinch_passthrough (sig, data):    winsize = getwinsize()    global child    child.setwinsize(winsize[0],winsize[1])def getwinsize():    """This returns the window size of the child tty.    The return value is a tuple of (rows, cols).    """    if 'TIOCGWINSZ' in dir(termios):        TIOCGWINSZ = termios.TIOCGWINSZ    else:        TIOCGWINSZ = 1074295912L # Assume    s = struct.pack('HHHH', 0, 0, 0, 0)    x = fcntl.ioctl(sys.stdout.fileno(), TIOCGWINSZ, s)    return struct.unpack('HHHH', x)[0:2]if __name__ == '__main__':    user   = 'username'    passwd = 'password'    host   = 'example.com'    print 'ssh ' + user + '@' + host + ' ...'        time.sleep(1)            child = pexpect.spawn('ssh relay', env = {"TERM" : "xterm-256color"})        signal.signal(signal.SIGWINCH, sigwinch_passthrough)        if len(sys.argv) > 1:        child.expect("Enter PASSCODE:")        child.sendline("PIN-CODE" + sys.argv[1])    child.expect('-bash-baidu-ssl.*')    child.sendline('ssh ' + host)        winsize = getwinsize();    child.setwinsize(winsize[0], winsize[1])        child.expect('.*password:.*')    child.sendline(passwd)        child.interact()    pass
```
[参考链接](http://pexpect.sourceforge.net/pexpect.html)
