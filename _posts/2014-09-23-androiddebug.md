---
layout: post
title: adb 自动化测试
category: android
---

###查看常驻内存

		adb shell dumpsys meminfo

###模拟按键：

		adb shell input keyevent 27

###模拟打电话：

		adb shell am start -a android.intent.action.CALL -d tel:185xxxxxx

###模拟浏览网页：

		adb shell am start -a android.intent.action.VIEW -d  http://www.baidu.com

###模拟模拟启动应用：

		adb shell am start -n com.android.contacts/.activities.DialtactsActivity

###模拟输入：

		在编辑短信时，往文本框输入文本：adb shell input text "hello"

###模拟安装卸载

		adb install d:\hello.apk
		adb unstall com.huawei.hello

####查看系统状态和信息 系列

		adb shell procrank 查询各进程内存使用情况
		adb shell service list 查看services信息
		adb shell cat /proc/meminfo 查看当前的内存情况
		adb shell cat /proc/cpuinfo 查看CPU信息（硬件）
		adb shell cat /proc/iomem  查看IO内存分区
		adb shell getprop 列出系统所有属性
		adb shell getprop | findstr "gsm" 列出包含gsm的属性
		adb shell setprop <key> <value>  修改系统属性
		adb shell sqlite3 可以执行sql语句查看数据库信息， 具体使用情况待调查
		adb logcat -b radio — 查看缓冲区的相关的信息.
		adb logcat -b events — 查看和事件相关的的缓冲区.
		adb logcat -b main — 查看主要的日志缓冲区

###adb monkey 测试

		 adb shell monkey -s 111111 --pkg-blacklist-file /data/blacklist.txt --throttle 300 --ignore-crashes --ignore-timeouts --monitor-native-crashes --ignore-native-crashes -v -v 500000 > ~/monkey.log
附录
------------

android按键键值：

		1 -->  "KEYCODE_MENU"
		2 -->  "KEYCODE_SOFT_RIGHT"
		3 -->  "KEYCODE_HOME"
		4 -->  "KEYCODE_BACK"
		5 -->  "KEYCODE_CALL"
		6 -->  "KEYCODE_ENDCALL"
		7 -->  "KEYCODE_0"
		8 -->  "KEYCODE_1"
		9 -->  "KEYCODE_2"
		10 -->  "KEYCODE_3"
		11 -->  "KEYCODE_4"
		12 -->  "KEYCODE_5"
		13 -->  "KEYCODE_6"
		14 -->  "KEYCODE_7"
		15 -->  "KEYCODE_8"
		16 -->  "KEYCODE_9"
		17 -->  "KEYCODE_STAR"
		18 -->  "KEYCODE_POUND"
		19 -->  "KEYCODE_DPAD_UP"
		20 -->  "KEYCODE_DPAD_DOWN"
		21 -->  "KEYCODE_DPAD_LEFT"
		22 -->  "KEYCODE_DPAD_RIGHT"
		23 -->  "KEYCODE_DPAD_CENTER"
		24 -->  "KEYCODE_VOLUME_UP"
		25 -->  "KEYCODE_VOLUME_DOWN"
		26 -->  "KEYCODE_POWER"
		27 -->  "KEYCODE_CAMERA"
		28 -->  "KEYCODE_CLEAR"
		29 -->  "KEYCODE_A"
		30 -->  "KEYCODE_B"
		31 -->  "KEYCODE_C"
		32 -->  "KEYCODE_D"
		33 -->  "KEYCODE_E"
		34 -->  "KEYCODE_F"
		35 -->  "KEYCODE_G"
		36 -->  "KEYCODE_H"
		37 -->  "KEYCODE_I"
		38 -->  "KEYCODE_J"
		39 -->  "KEYCODE_K"
		40 -->  "KEYCODE_L"
		41 -->  "KEYCODE_M"
		42 -->  "KEYCODE_N"
		43 -->  "KEYCODE_O"
		44 -->  "KEYCODE_P"
		45 -->  "KEYCODE_Q"
		46 -->  "KEYCODE_R"
		47 -->  "KEYCODE_S"
		48 -->  "KEYCODE_T"
		49 -->  "KEYCODE_U"
		50 -->  "KEYCODE_V"
		51 -->  "KEYCODE_W"
		52 -->  "KEYCODE_X"
		53 -->  "KEYCODE_Y"
		54 -->  "KEYCODE_Z"
		55 -->  "KEYCODE_COMMA"
		56 -->  "KEYCODE_PERIOD"
		57 -->  "KEYCODE_ALT_LEFT"
		58 -->  "KEYCODE_ALT_RIGHT"
		59 -->  "KEYCODE_SHIFT_LEFT"
		60 -->  "KEYCODE_SHIFT_RIGHT"
		61 -->  "KEYCODE_TAB"
		62 -->  "KEYCODE_SPACE"
		63 -->  "KEYCODE_SYM"
		64 -->  "KEYCODE_EXPLORER"
		65 -->  "KEYCODE_ENVELOPE"
		66 -->  "KEYCODE_ENTER"
		67 -->  "KEYCODE_DEL"
		68 -->  "KEYCODE_GRAVE"
		69 -->  "KEYCODE_MINUS"
		70 -->  "KEYCODE_EQUALS"
		71 -->  "KEYCODE_LEFT_BRACKET"
		72 -->  "KEYCODE_RIGHT_BRACKET"
		73 -->  "KEYCODE_BACKSLASH"
		74 -->  "KEYCODE_SEMICOLON"
		75 -->  "KEYCODE_APOSTROPHE"
		76 -->  "KEYCODE_SLASH"
		77 -->  "KEYCODE_AT"
		78 -->  "KEYCODE_NUM"
		79 -->  "KEYCODE_HEADSETHOOK"
		80 -->  "KEYCODE_FOCUS"
		81 -->  "KEYCODE_PLUS"
		82 -->  "KEYCODE_MENU"
		83 -->  "KEYCODE_NOTIFICATION"
		84 -->  "KEYCODE_SEARCH"
		85 -->  "TAG_LAST_KEYCODE"
		KEYCODE_FOCUS 拍照对焦键 80
		KEYCODE_NOTIFICATION 通知键 83
		KEYCODE_MUTE 话筒静音键 91
		KEYCODE_VOLUME_MUTE 扬声器静音键 164
		KEYCODE_ESCAPE ESC键 111
		KEYCODE_MOVE_HOME 光标移动到开始键 122
		KEYCODE_MOVE_END 光标移动到末尾键 123
		KEYCODE_PAGE_UP 向上翻页键 92
		KEYCODE_PAGE_DOWN 向下翻页键 93
		KEYCODE_FORWARD_DEL 删除键 112
		KEYCODE_INSERT 插入键 124
		KEYCODE_NUM_LOCK 小键盘锁 143
		KEYCODE_CAPS_LOCK 大写锁定键 115
		KEYCODE_BREAK Break/Pause键 121
		KEYCODE_SCROLL_LOCK 滚动锁定键 116
		KEYCODE_ZOOM_IN 放大键 168
		KEYCODE_ZOOM_OUT 缩小键 169
