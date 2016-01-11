---
layout: post
title: git 常见操作笔记
category: tools
tags : [linux,git ,笔记 ]
---

问题：

```sh
git remote add origin xxxxxxx
fatal: remote origin already exists.
```

解决:

```sh
git remote remove origin
```

问题：

```sh
git push -u origin master
fatal: 'origin' does not appear to be a git repository
fatal: Could not read from remote repository.
```

####同步master修改：

1. master修改后， 使用 `git log` 记下`commit id`
2. 切换到dev分支:`git checkout dev`
3. `git merge [id]` 即可

###去掉 git push时输入账号密码
> __linux__

> + 在~/下， touch创建文件 .git-credentials

```sh
touch .git-credentials
```

> 用vim编辑此文件

```sh
vim .git-credentials
```

> 输入内容格式：

```sh
https://{username}:{password}@github.com
example: 比如 https://aoeddklj:1233ds@github.com
```

> + 在终端下执行  git config --global credential.helper store

> + 可以看到~/.gitconfig文件，会多了一项：

```sh
[credential]
helper = store
```

> 这个时候你就不需要输入密码了