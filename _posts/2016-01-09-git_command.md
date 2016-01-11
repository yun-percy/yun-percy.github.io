---
layout: post
title: git 常见操作笔记
category: tools
tags : [linux,git ,笔记 ]
---

问题：

```
git remote add origin xxxxxxx
fatal: remote origin already exists.
```

解决:

```
git remote remove origin
```

问题：

```
git push -u origin master
fatal: 'origin' does not appear to be a git repository
fatal: Could not read from remote repository.
```

####同步master修改：

1. master修改后， 使用 `git log` 记下`commit id`
2. 切换到dev分支:`git checkout dev`
3. `git merge [id]` 即可
git merge