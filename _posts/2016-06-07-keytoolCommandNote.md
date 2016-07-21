---
layout: post
title: keytool命令笔记
category: 语法
tags : [keytool,linux ,签名,密钥]
---

查看密钥
----

+ 针对RSA/x509.pem型密钥:

```sh
keytool -printcert -file test.RSA
```

+ 针对keystore型密钥

```sh
keytool -list -v -keystore test.keystore
```

生成密钥
----

```sh
keytool -genkey -alias test -keyalg RSA -validity 20000 -keystore test.keystore
```

参数|含义
---|---
-genkey|生成密钥
-alias|指定别名
-keyalg|签名证书的算法
-validity|签名证书的有效期
-keystore|输出名
