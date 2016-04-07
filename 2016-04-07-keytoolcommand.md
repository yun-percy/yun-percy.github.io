---
layout: post
title: keytool生成密钥/keytool查看密钥
category: linux
tags : [ linux,keytool,密钥]
---

生成密钥
-----

`keytool -genkey -alias 密匙别名 -keyalg 密匙类型 -validity 有效时间 -keystore  储存密匙路径/密匙名

然后按照提示输入密码/国家，组织etc.

```sh
keytool -genkey -alias percychen -keyalg RSA -validity 20000 -keystore  ./percychenReleaseKey.keystore
```

查看密匙
------

`keytool -list -v -keystore 储存密匙路径/密匙名 -storepass 储存密匙密码`

```sh
keytool -list -v -keystore percychenReleaseKey.keystore -storepass xxxxxxxx
```

对于RSA和pem格式的密钥信息使用下面方式查看

```sh
keytool -printcert -file pem/rsa文件信息
```

签名
======

```sh
KEYSTORE_PATH=签名文件路径
STOREPASS=密钥密码
keypass=签名密码(在生成密钥文件时最后输入的那个密码，默认与STOREPASS一样)
../out_${TARGET_APP_DEBUG}=需要签名的文件
Alias=别名
jarsigner -keystore $KEYSTORE_PATH -storepass $STOREPASS -keypass $KEYPASS ../out_${TARGET_APP_DEBUG} $ALIAS
```

就可以生辰签名的apk文件

附上keytool参数以及jarsigner参数:
==========

keytool用法：

```sh
-certreq     [-v] [-protected]
             [-alias <别名>] [-sigalg <sigalg>]
             [-file <csr_file>] [-keypass <密钥库口令>]
             [-keystore <密钥库>] [-storepass <存储库口令>]
             [-storetype <存储类型>] [-providername <名称>]
             [-providerclass <提供方类名称> [-providerarg <参数>]] ...
             [-providerpath <路径列表>]
-changealias [-v] [-protected] -alias <别名> -destalias <目标别名>
             [-keypass <密钥库口令>]
             [-keystore <密钥库>] [-storepass <存储库口令>]
             [-storetype <存储类型>] [-providername <名称>]
             [-providerclass <提供方类名称> [-providerarg <参数>]] ...
             [-providerpath <路径列表>]
-delete      [-v] [-protected] -alias <别名>
             [-keystore <密钥库>] [-storepass <存储库口令>]
             [-storetype <存储类型>] [-providername <名称>]
             [-providerclass <提供方类名称> [-providerarg <参数>]] ...
             [-providerpath <路径列表>]
-exportcert  [-v] [-rfc] [-protected]
             [-alias <别名>] [-file <认证文件>]
             [-keystore <密钥库>] [-storepass <存储库口令>]
             [-storetype <存储类型>] [-providername <名称>]
             [-providerclass <提供方类名称> [-providerarg <参数>]] ...
             [-providerpath <路径列表>]
-genkeypair  [-v] [-protected]
             [-alias <别名>]
             [-keyalg <keyalg>] [-keysize <密钥大小>]
             [-sigalg <sigalg>] [-dname <dname>]
             [-validity <valDays>] [-keypass <密钥库口令>]
             [-keystore <密钥库>] [-storepass <存储库口令>]
             [-storetype <存储类型>] [-providername <名称>]
             [-providerclass <提供方类名称> [-providerarg <参数>]] ...
             [-providerpath <路径列表>]
-genseckey   [-v] [-protected]
             [-alias <别名>] [-keypass <密钥库口令>]
             [-keyalg <keyalg>] [-keysize <密钥大小>]
             [-keystore <密钥库>] [-storepass <存储库口令>]
             [-storetype <存储类型>] [-providername <名称>]
             [-providerclass <提供方类名称> [-providerarg <参数>]] ...
             [-providerpath <路径列表>]
-help
-importcert  [-v] [-noprompt] [-trustcacerts] [-protected]
             [-alias <别名>]
             [-file <认证文件>] [-keypass <密钥库口令>]
             [-keystore <密钥库>] [-storepass <存储库口令>]
             [-storetype <存储类型>] [-providername <名称>]
             [-providerclass <提供方类名称> [-providerarg <参数>]] ...
             [-providerpath <路径列表>]
-importkeystore [-v]
             [-srckeystore <源密钥库>] [-destkeystore <目标密钥库>]
             [-srcstoretype <源存储类型>] [-deststoretype <目标存储类型>]
             [-srcstorepass <源存储库口令>] [-deststorepass <目标存储库口令>]
             [-srcprotected] [-destprotected]
             [-srcprovidername <源提供方名称>]
             [-destprovidername <目标提供方名称>]
             [-srcalias <源别名> [-destalias <目标别名>]
               [-srckeypass <源密钥库口令>] [-destkeypass <目标密钥库口令>]]
             [-noprompt]
             [-providerclass <提供方类名称> [-providerarg <参数>]] ...
             [-providerpath <路径列表>]
-keypasswd   [-v] [-alias <别名>]
             [-keypass <旧密钥库口令>] [-new <新密钥库口令>]
             [-keystore <密钥库>] [-storepass <存储库口令>]
             [-storetype <存储类型>] [-providername <名称>]
             [-providerclass <提供方类名称> [-providerarg <参数>]] ...
             [-providerpath <路径列表>]
-list        [-v | -rfc] [-protected]
             [-alias <别名>]
             [-keystore <密钥库>] [-storepass <存储库口令>]
             [-storetype <存储类型>] [-providername <名称>]
             [-providerclass <提供方类名称> [-providerarg <参数>]] ...
             [-providerpath <路径列表>]
-printcert   [-v] [-file <认证文件>]
-storepasswd [-v] [-new <新存储库口令>]
             [-keystore <密钥库>] [-storepass <存储库口令>]
             [-storetype <存储类型>] [-providername <名称>]
             [-providerclass <提供方类名称> [-providerarg <参数>]] ...
             [-providerpath <路径列表>]
jarsigner用法： [选项] jar 文件别名
----
       jarsigner -verify [选项] jar 文件
            [-keystore <url>]           密钥库位置
            [-storepass <口令>]         用于密钥库完整性的口令
            [-storetype <类型>]         密钥库类型
            [-keypass <口令>]           专用密钥的口令（如果不同）
            [-sigfile <文件>]           .SF/.DSA 文件的名称
            [-signedjar <文件>]         已签名的 JAR 文件的名称
            [-digestalg <算法>]    摘要算法的名称
            [-sigalg <算法>]       签名算法的名称
            [-verify]                   验证已签名的 JAR 文件
            [-verbose]                  签名/验证时输出详细信息
            [-certs]                    输出详细信息和验证时显示证书
            [-tsa <url>]                时间戳机构的位置
            [-tsacert <别名>]           时间戳机构的公共密钥证书
            [-altsigner <类>]           替代的签名机制的类名
            [-altsignerpath <路径列表>] 替代的签名机制的位置
            [-internalsf]               在签名块内包含 .SF 文件
            [-sectionsonly]             不计算整个清单的散列
            [-protected]                密钥库已保护验证路径
            [-providerName <名称>]      提供者名称
            [-providerClass <类>        加密服务提供者的名称
            [-providerArg <参数>]] ... 主类文件和构造函数参数
```
