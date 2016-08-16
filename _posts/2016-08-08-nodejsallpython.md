---
layout: post
title: Nodejs调用python,python返回json
category: Linux
tags : [Linux,bash ,运维]
---

> Nodejs调用python

```js
var exec = require('child_process').exec;
var arg1 = 'arg1'
var arg2 = 'arg2'
exec('python py_test.py '+ arg1+' '+arg2+' ',function(error,stdout,stderr){
    if(stdout.length >1){
        console.log('you offer args:',stdout);
    } else {
        console.log('you don\'t offer args');
    }
    if(error) {
        console.info('stderr : '+stderr);
    }
});
```


> python输出json格式


```py
import json

json_dict={}#字典
d1 = json.dumps(json_dict,sort_keys=True,indent=4)
print d1
```
