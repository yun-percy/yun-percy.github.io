---
layout: post
title: 关于patch ROM最后签名的问题
category: Android
---


#####不知道最近怎么的，总有人问我一些patch ROM的问题，近期问得特别多的就是 下面这个错误信息：

    ERROR: no key specified for:
    BaiduVoiceAssistant.apk
    OupengBrowser.apk
    BaiduMap.apk
    Calendar365.apk
    iReader.apk
    BaiduSearch.apk
    Stats.apk
    LewaGameCenter.apk
    LewaLockScreen.apk
    LewaAppStore.apk
    LewaLabiSync.apk
    LewaVirusDefense.apk
    LewaSearch.apk
    LewaPower+.apk
    LewaFlashlight.apk
    LewaSecurity2.apk
    NetworkLocation.apk
    LewaQrcodeScanner.apk
    
    Use '-e =' to specify a key (which may be an
    empty string to not sign this apk).
    Build full ota package: /home/lixin/code/lewa/finder/out/fullota.zip
    unzipping target target-files...
    warning [/home/lixin/code/lewa/finder/out/target_files.zip]:  zipfile is empty
    
    ERROR: failed to unzip input target-files "/home/lixin/code/lewa/finder/out/target_files.zip"
    
    cp: 无法获取"/home/lixin/code/lewa/finder/out/fullota.zip" 的文件状态(stat): 没有那个文件或目录
    make: *** [fullota] 错误 1
    




解决办法很简单，就是往tools/target_files_template/META/apkcerts.txt 里面加上面无法签名的APK，语句仿造上面的写就可以了。

