---

title: linux,shell,find拾遗
category: Shell
---

> 指定递归层数为1

```sh
find . -maxdepth 1 -type f
```

> 只列出常规文件

```sh
find ./ -type f
```
> 只列出文件夹

```sh
find ./ -type d
```


> 找出空文件，然后删掉

```sh
find /urpath -type f -size 0 -exec rm -f {} \;
```

> 多命令匹配

表达式之间默认是与的关系，如`-name *.c -name path*`,符合条件的应该是`path*.c`的文件。
有时候可能会遇到一条命令想查找两个格式的文件，这个时候就需要用到或关系了。

```sh
find -name *.c -or -name *.h
```
