---
layout: post
title: system.img的分解与合并
category: android
tags : [Android,system.img,分解与合并 ]
---

> 在做编译适配的过程中，我们经常会接触到system.img的解包和打包工作，比如我们的Qrom就需要用到一个system.img来初始化，并得到一个zip包和一些配置文件．一般来说，我们常用的得到system.img的方法是dd的方法导出来，但是dd需要root权限，如果是一个新项目，通常获取root权限是比较难的，又或者我们需要非常纯净的底包，这个时候如果有官方镜像文件是最好的了.但并不是所有官方是system.img都可以直接用来挂载的,因为即便都叫 system.img也有不同的格式之分.

system.img的两种格式
------

我们所见到的system.img一般分为 raw和sparse两种格式,所以格式不对,是无法正常的mount的

__raw__

通常我们导出来的system.img和官方完整的镜像文件是raw模式的．这种格式的文件用 file命令就可以看得很清楚，比如：

        10:31 ~ $ file system.img
        system.img: Linux rev 1.0 ext4 filesystem data, UUID=57f8f4bc-abf4-655f-bf67-946fc0f9f25b (extents) (large files)

这种格式通常是完整的ext4分区镜像，当然也包含了很多全是00的无效填充区，可以用以下命令直接挂载：

        10:31 ~ $ mkdir sys   #创建挂载点
        10:31 ~ $ mount -t ext4 -o loop system.img sys　　#挂载

__sparse__

这一种在国内方案和大厂的官方镜像中比较常见,这种方式是在源码中没有关闭sparse分解而将system.img解开成若干个小文件,这些小文件都是 sparse格式,当然如果解开成一个文件,也就是 system.img也会是sparse格式.如果分不清不如file一下:

        10:31 ~ $ file system.img_sparsechunk1
        system.img_sparsechunk1: data

这种格式说到底就是非常普通的dat文件,它是将raw格式进行了稀疏描述,里面没有00的无效填充区,所以尺寸都比较小.

合成与分解
----

Android源码中自带了这两种文件格式的互相转换,源码位于:

        system/extras/ext4_utils

当然你可以用gcc去编译他们,但是你可以直接在源码目录下编译:

        make otatools -j16

就会直接生成 simg2img img2simg make_ext4fs等一堆相关的工具文件,在out/host/linux-x86/bin里面可以找到它们


__合并官方提供的 system.img_sparse文件__

        simg2img <sparse_img_files> <raw_images_file>

例如,官方将system.img拆分成了四个文件,假设这四个文件分别为:ystem.img_sparse1,2,3,4

        10:31 ~ $ file system.img
        simg2img system.img_sparse1 system.img_sparse2 system.img_sparse3 system.img_sparse4 system.img

这样就会在当前目录生成一个system.img文件,来,file一下:

        10:31 ~ $ file system.img
        system.img: Linux rev 1.0 ext2 filesystem data, UUID=57f8f4bc-abf4-655f-bf67-946fc0f9f25b (extents) (large files)

 结果生成的是ext2文件,那么如何将它转为ext4文件供我们使用呢?思路是先挂载,然后再make成ext4:

        10:31 ~ $  ll system.img
        -rw-rw-r-- 1 yun yun 268435456  4月 30 10:31 system.img
        10:31 ~ $  mkdir sys
        10:31 ~ $  mount -t ext4 -o loop system.img sys
        10:31 ~ $  ./make_ext4fs -s -l 268435456 -a sytem new_system.img sys

那么大功告成.我们就可以拿着这个 new_system.img去QROM下搭构架了.

__分解命令__

        img2simg <raw_images_file> <sparse_img_files> [<block_size＞]

因为分解命令用得极少,所以这里就部展开讨论,一般情况下如果需要将 system.img做 sparse,只需要在源码的device下面打开开关就可以了.不需要手动去分解.

__在源码中开启或关闭Sparse__

在源码的device目录中的 BoardConfig.mk:

        TARGET_USERIMAGES_SPARSE_EXT_DISABLED := true   #false为打开



