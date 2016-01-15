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

###撤销git add

```sh
$ git add .
$ git status
On branch master
Changes to be committed:
  (use "git reset HEAD <file>..." to unstage)

        modified:   README.md
        modified    test.cpp
```

就在 “Changes to be committed” 下面，括号中有提示，可以使用 git reset HEAD <file>... 的方式取消暂存

```sh
$ git reset HEAD test.cpp
Unstaged changes after reset:
M       test.cpp
$ git status
On branch master
Changes to be committed:
  (use "git reset HEAD <file>..." to unstage)

        modified:   README.md

Changes not staged for commit:
  (use "git add <file>..." to update what will be committed)
  (use "git checkout -- <file>..." to discard changes in working directory)

        modified:   test.cpp
```