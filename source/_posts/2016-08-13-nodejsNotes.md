---
title: js调用python
category: 语法
tags:
  - python
  - js
---

js调用python
------

```js
var exec = require('child_process').exec;
var arg1 = 'hello'
exec('python test.py '+arg1,function(error,stdout,stderr){
    if(stdout.length >1){
        console.log('you offer args:\n',stdout);
    } else {
        console.log('you don\'t offer args');
    }
    if(error) {
        console.info('stderr : '+stderr);
    }
});
```

打印对象类型:
----

```js
console.log(`${typeof(stdout)}`);
```

获取当前文件路径
----

```js
console.log(`Current directory: ${process.cwd()}`);
```
