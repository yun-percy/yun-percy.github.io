---

title: service中用Handler更新UI
category: Android
---

> service里面更新UI还是用Handler好一点，之前一直用broadcast，发现太浪费资源了.
> 随着合进Systemui的东西越来越多，Systemui明显有延迟了，今天用handler写了状态栏网速，效果很不错。

### service

```java
Message msg = new Message();
msg.what = MainActivity.FLAG;
msg.obj="haha";
MainActivity.handler.sendMessage(msg);
```

### Acitivity

```java
handler = new Handler(){
@Override
public void handleMessage(Message msg) {
    super.handleMessage(msg);
    if(msg.what==FLAG){
        text.setText((String)msg.obj);
    }
}
};
```
