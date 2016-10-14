---
title: android 外部启动activity，自定义action，action常量大全
category: Android
---



___转自：http://www.qylk.blog.163.com/blog/static/13468735620130913043889/___

###从任意app，启动另外一个app的activity：

+ 第一种方式

		Intent i = new Intent();
         ComponentName cn = new ComponentName("com.book.android2",  "com.book.android2.AndroidSearch");
         i.setComponent(cn);
         i.setAction("android.intent.action.MAIN");
         startActivity(i); //or startActivityForResult(i, RESULT_OK);

>
我用这种方法时，绝大部分应用可以启动，但是像RootExplorer却无法启动，出现FC对话框,因此建议使用下面这种方式：

+ 第二种方式

		Intent it = new Intent("android.intent.action.MAIN");
	     	it.setClassName("com.speedsoftware.rootexplorer","com.speedsoftware.rootexplorer.RootExplorer");
	    startActivity(it);

>
如果你需要启动一个你自己写的另一个app的activity，你可以在那个的menifest.xml里自定义activity的action:
其他地方启动它：

		Intent it = new Intent("com.qylk.call.main");
		startActivity(it);

###使用adb启动activity：

+ 启动RootExolorer：

		am start -a android.intent.action.MAIN -n com.speedsoftware.rootexplorer/.RootExplorer

+ 启动系统设置：

		am start -a android.settings.SETTINGS


附（转载）：android系统Action常量(其实不算全)
-------

####android intent和intent action大全


1. 从google搜索内容

		Intent intent = new Intent();
		intent.setAction(Intent.ACTION_WEB_SEARCH);
		intent.putExtra(SearchManager.QUERY,"searchString")
		startActivity(intent);

2. 浏览网页

		Uri uri = Uri.parse("http://www.google.com");
		Intent it  = new Intent(Intent.ACTION_VIEW,uri);
		startActivity(it);

3. 显示地图

		Uri uri = Uri.parse("geo:38.899533,-77.036476");
		Intent it = new Intent(Intent.Action_VIEW,uri);
		startActivity(it);

4. 路径规划

		Uri uri = Uri.parse("http://maps.google.com/maps?f=dsaddr=startLat startLng&daddr=endLat endLng&hl=en");
		Intent it = new Intent(Intent.ACTION_VIEW,URI);
		startActivity(it);

5. 拨打电话

		Uri uri = Uri.parse("tel:xxxxxx");
		Intent it = new Intent(Intent.ACTION_DIAL, uri);
		startActivity(it);


6. 调用发短信的程序

		Intent it = new Intent(Intent.ACTION_VIEW);
		it.putExtra("sms_body", "The SMS text");
		it.setType("vnd.android-dir/mms-sms");
		startActivity(it);

7. 发送短信

		Uri uri = Uri.parse("smsto:0800000123");
		Intent it = new Intent(Intent.ACTION_SENDTO, uri);
		it.putExtra("sms_body", "The SMS text");
		startActivity(it);

		String body="this is sms demo";
		Intent mmsintent = new Intent(Intent.ACTION_SENDTO, Uri.fromParts("smsto", number, null));
		mmsintent.putExtra(Messaging.KEY_ACTION_SENDTO_MESSAGE_BODY, body);
		mmsintent.putExtra(Messaging.KEY_ACTION_SENDTO_COMPOSE_MODE, true);
		mmsintent.putExtra(Messaging.KEY_ACTION_SENDTO_EXIT_ON_SENT, true);
		startActivity(mmsintent);

8.	发送彩信

		Uri uri = Uri.parse("content://media/external/images/media/23");
		Intent it = new Intent(Intent.ACTION_SEND);
		it.putExtra("sms_body", "some text");
		it.putExtra(Intent.EXTRA_STREAM, uri);
		it.setType("image/png");
		startActivity(it);

		StringBuilder sb = new StringBuilder();
		sb.append("file://");
		sb.append(fd.getAbsoluteFile());
		Intent intent = new Intent(Intent.ACTION_SENDTO, Uri.fromParts("mmsto", number, null));
		// Below extra datas are all optional.
		intent.putExtra(Messaging.KEY_ACTION_SENDTO_MESSAGE_SUBJECT, subject);
		intent.putExtra(Messaging.KEY_ACTION_SENDTO_MESSAGE_BODY, body);
		intent.putExtra(Messaging.KEY_ACTION_SENDTO_CONTENT_URI, sb.toString());
		intent.putExtra(Messaging.KEY_ACTION_SENDTO_COMPOSE_MODE, composeMode);
		intent.putExtra(Messaging.KEY_ACTION_SENDTO_EXIT_ON_SENT, exitOnSent);
		startActivity(intent);

9. 发送Email

		Uri uri = Uri.parse("mailto:xxx@abc.com");
		Intent it = new Intent(Intent.ACTION_SENDTO, uri);
		startActivity(it);

		Intent it = new Intent(Intent.ACTION_SEND);
		it.putExtra(Intent.EXTRA_EMAIL, "me@abc.com");
		it.putExtra(Intent.EXTRA_TEXT, "The email body text");
		it.setType("text/plain");

		startActivity(Intent.createChooser(it, "Choose Email Client"));
		Intent it=new Intent(Intent.ACTION_SEND);
		String[] tos={"me@abc.com"};
		String[] ccs={"you@abc.com"};
		it.putExtra(Intent.EXTRA_EMAIL, tos);
		it.putExtra(Intent.EXTRA_CC, ccs);
		it.putExtra(Intent.EXTRA_TEXT, "The email body text");
		it.putExtra(Intent.EXTRA_SUBJECT, "The email subject text");
		it.setType("message/rfc822");
		startActivity(Intent.createChooser(it, "Choose Email Client"));

		Intent it = new Intent(Intent.ACTION_SEND);
		it.putExtra(Intent.EXTRA_SUBJECT, "The email subject text");
		it.putExtra(Intent.EXTRA_STREAM, "file:///sdcard/mysong.mp3");
		sendIntent.setType("audio/mp3");
		startActivity(Intent.createChooser(it, "Choose Email Client"));

10. 播放多媒体

		Intent it = new Intent(Intent.ACTION_VIEW);
		Uri uri = Uri.parse("file:///sdcard/song.mp3");
		it.setDataAndType(uri, "audio/mp3");
		startActivity(it);

		Uri uri = Uri.withAppendedPath(MediaStore.Audio.Media.INTERNAL_CONTENT_URI, "1");
		Intent it = new Intent(Intent.ACTION_VIEW, uri);
		startActivity(it);

11. 卸载

		Uri uri = Uri.fromParts("package", strPackageName, null);
		Intent it = new Intent(Intent.ACTION_DELETE, uri);
		startActivity(it);

12. 安装

		Uri installUri = Uri.fromParts("package", "xxx", null);
		returnIt = new Intent(Intent.ACTION_PACKAGE_ADDED, installUri);

13. 打开照相机

	    Intent i = new Intent(Intent.ACTION_CAMERA_BUTTON, null);
	    this.sendBroadcast(i);

	    long dateTaken = System.currentTimeMillis();
	    String name = createName(dateTaken) + ".jpg";
	    fileName = folder + name;
	    ContentValues values = new ContentValues();
	    values.put(Images.Media.TITLE, fileName);
	    values.put("_data", fileName);
	    values.put(Images.Media.PICASA_ID, fileName);
	    values.put(Images.Media.DISPLAY_NAME, fileName);
	    values.put(Images.Media.DESCRIPTION, fileName);
	    values.put(Images.ImageColumns.BUCKET_DISPLAY_NAME, fileName);
	    Uri photoUri = getContentResolver().insert(
	                    MediaStore.Images.Media.EXTERNAL_CONTENT_URI, values);
	    Intent inttPhoto = new Intent(MediaStore.ACTION_IMAGE_CAPTURE);
	    inttPhoto.putExtra(MediaStore.EXTRA_OUTPUT, photoUri);
	    startActivityForResult(inttPhoto, 10);

14. 从gallery选取图片

		  Intent i = new Intent();
		  i.setType("image/*");
		  i.setAction(Intent.ACTION_GET_CONTENT);
		  startActivityForResult(i, 11);

15. 打开录音机

		   Intent mi = new Intent(Media.RECORD_SOUND_ACTION);
		   startActivity(mi);

16. 显示应用详细列表

		Uri uri = Uri.parse("market://details?id=app_id");
		Intent it = new Intent(Intent.ACTION_VIEW, uri);
		startActivity(it);

17. 寻找应用

	> 刚才找app id未果，结果发现用package name也可以

		Uri uri = Uri.parse("market://details?id=");

	> 这个简单多了

		Uri uri = Uri.parse("market://search?q=pname:pkg_name");
		Intent it = new Intent(Intent.ACTION_VIEW, uri);
		startActivity(it);

18. 打开联系人列表

           Intent i = new Intent();
           i.setAction(Intent.ACTION_GET_CONTENT);
           i.setType("vnd.android.cursor.item/phone");
           startActivityForResult(i, REQUEST_TEXT);

            Uri uri = Uri.parse("content://contacts/people");
            Intent it = new Intent(Intent.ACTION_PICK, uri);
            startActivityForResult(it, REQUEST_TEXT);

20. 调用系统编辑添加联系人（高版本SDK有效）：

  		Intent it = new Intent(Intent.ACTION_INSERT_OR_EDIT);
                it.setType("vnd.android.cursor.item/contact");
                // it.setType(Contacts.CONTENT_ITEM_TYPE);
                it.putExtra("name", "myName");
                it.putExtra(android.provider.Contacts.Intents.Insert.COMPANY,  "organization");
                it.putExtra(android.provider.Contacts.Intents.Insert.EMAIL, "email");
                it.putExtra(android.provider.Contacts.Intents.Insert.PHONE,"homePhone");
                it.putExtra( android.provider.Contacts.Intents.Insert.SECONDARY_PHONE,
                                "mobilePhone");
                it.putExtra(  android.provider.Contacts.Intents.Insert.TERTIARY_PHONE,
                                "workPhone");
                it.putExtra(android.provider.Contacts.Intents.Insert.JOB_TITLE,"title");
                startActivity(it);

21.	调用系统编辑添加联系人（全有效）：

		Intent intent = new Intent(Intent.ACTION_INSERT_OR_EDIT);
            intent.setType(People.CONTENT_ITEM_TYPE);
            intent.putExtra(Contacts.Intents.Insert.NAME, "My Name");
            intent.putExtra(Contacts.Intents.Insert.PHONE, "+1234567890");
            intent.putExtra(Contacts.Intents.Insert.PHONE_TYPE, Contacts.PhonesColumns.TYPE_MOBILE);
            intent.putExtra(Contacts.Intents.Insert.EMAIL, "com@com.com");
            intent.putExtra(Contacts.Intents.Insert.EMAIL_TYPE, Contacts.ContactMethodsColumns.TYPE_WORK);
            startActivity(intent);



23. 最基本的share 信息的intent，可以传一段text信息到各个手机上已安装程序：如SMS，Email，sina微波，米聊，facebook，twitter等等

            Intent it = new Intent(Intent.ACTION_SEND);
    		it.putExtra(Intent.EXTRA_TEXT, "The email subject text");
            it.setType("text/plain");
            startActivity(Intent.createChooser(it, "Choose Email Client"));


####★intent action大全：


> ACTION_MAIN                         作为一个主要的进入口，而并不期望去接受数据
>
> ACTION_VIEW                         向用户去显示数据
>
> ACTION_ATTACH_DATA                  用于指定一些数据应该附属于一些其他的地方，例如，图片数据应该附属于联系人
>
> ACTION_EDIT                         访问已给的数据，提供明确的可编辑
>
> ACTION_PICK                         从数据中选择一个子项目，并返回你所选中的项目
>
> ACTION_CHOOSER                      显示一个activity选择器，允许用户在进程之前选择他们想要的
>
> ACTION_GET_CONTENT                  允许用户选择特殊种类的数据，并返回（特殊种类的数据：照一张相片或录一段音）
>
> ACTION_DIAL                         拨打一个指定的号码，显示一个带有号码的用户界面，允许用户去启动呼叫
>
> ACTION_CALL                         根据指定的数据执行一次呼叫（ACTION_CALL在应用中启动一次呼叫有缺陷，多数应用ACTION_DIAL，ACTION_CALL不能用在紧急呼叫上，紧急呼叫可以用ACTION_DIAL来实现）
>
> ACTION_SEND                         传递数据，被传送的数据没有指定，接收的action请求用户发数据
>
> ACTION_SENDTO                       发送一跳信息到指定的某人
>
> ACTION_ANSWER                       处理一个打进电话呼叫
>
> ACTION_INSERT                       插入一条空项目到已给的容器
>
> ACTION_DELETE                       从容器中删除已给的数据
>
> ACTION_RUN                          运行数据，无论怎么
>
> ACTION_SYNC                         同步执行一个数据
>
> ACTION_PICK_ACTIVITY                为已知的Intent选择一个Activity，返回选中的类
>
> ACTION_SEARCH                       执行一次搜索
>
> ACTION_WEB_SEARCH                   执行一次web搜索
>
> ACTION_FACTORY_TEST                 工场测试的主要进入点，


标准的广播Actions
-----------

> ACTION_TIME_TICK                   当前时间改变，每分钟都发送，不能通过组件声明来接收，只有通过Context.registerReceiver()方法来注册
>
> ACTION_TIME_CHANGED                时间被设置
>
> ACTION_TIMEZONE_CHANGED            时间区改变
>
> ACTION_BOOT_COMPLETED              系统完成启动后，一次广播
>
> ACTION_PACKAGE_ADDED               一个新应用包已经安装在设备上，数据包括包名（最新安装的包程序不能接收到这个广播）
>
> ACTION_PACKAGE_CHANGED             一个已存在的应用程序包已经改变，包括包名
>
> ACTION_PACKAGE_REMOVED             一个已存在的应用程序包已经从设备上移除，包括包名（正在被安装的包程序不能接收到这个广播）
>
> ACTION_PACKAGE_RESTARTED           用户重新开始一个包，包的所有进程将被杀死，所有与其联系的运行时间状态应该被移除，包括包名（重新开始包程序不能接收到这个广播）
>
> ACTION_PACKAGE_DATA_CLEARED        用户已经清除一个包的数据，包括包名（清除包程序不能接收到这个广播）
>
> ACTION_BATTERY_CHANGED             电池的充电状态、电荷级别改变，不能通过组建声明接收这个广播，只有通过Context.registerReceiver()注册
>
> ACTION_UID_REMOVED      一个用户ID已经从系统中移除



+ SETTING:

		android.settings.AIRPLANE_MODE_SETTINGS
		android.settings.APN_SETTINGS
		android.settings.APPLICATION_DEVELOPMENT_SETTINGS
		android.settings.APPLICATION_SETTINGS
		android.settings.BLUETOOTH_SETTINGS
		android.settings.DATA_ROAMING_SETTINGS
		android.settings.DATE_SETTINGS
		android.settings.DISPLAY_SETTINGS
		android.settings.INPUT_METHOD_SETTINGS
		android.settings.INTERNAL_STORAGE_SETTINGS
		android.settings.LOCALE_SETTINGS
		android.settings.LOCATION_SOURCE_SETTINGS
		android.settings.MANAGE_APPLICATIONS_SETTINGS
		android.settings.MEMORY_CARD_SETTINGS
		android.settings.NETWORK_OPERATOR_SETTINGS
		android.settings.QUICK_LAUNCH_SETTINGS
		android.settings.SECURITY_SETTINGS
		android.settings.SETTINGS
		android.settings.SOUND_SETTINGS
		android.settings.SYNC_SETTINGS
		android.settings.USER_DICTIONARY_SETTINGS
		android.settings.WIFI_IP_SETTINGS
		android.settings.WIFI_SETTINGS
		android.settings.WIRELESS_SETTINGS

>
> 在android SDK文档中有这样一个类，android.provider.Settings类提供android系统各个页面的跳转常量：
>
> 使用实例例：startActivity(new Intent(Settings.ACTION_WIRELESS_SETTINGS))，即可跳到android手机网络设置页面。
>
> 如果要launch Mobile Networks Setting页面按如下方法：

		Intent intent=new Intent(Settings.ACTION_DATA_ROAMING_SETTINGS);
		ComponentName cName = new ComponentName(“com.android.phone”,”com.android.phone.Settings”);
		intent.setComponent(cName);
		startActivity(intent);

> 如果要进入Networks Operators页面按如下方法：

		Intent intent = new Intent(Intent.ACTION_MAIN);
		intent.setClassName(“com.android.phone”, “com.android.phone.NetworkSetting”);
		startActivity(intent);

+ String 环境变量

		String ACTION_ACCESSIBILITY_SETTINGS
		辅助功能模块的显示设置。 Activity Action: Show settings for accessibility modules.
		String ACTION_ADD_ACCOUNT
		显示屏幕上创建一个新帐户添加帐户。 Activity Action: Show add account screen for creating a new account.
		String ACTION_AIRPLANE_MODE_SETTINGS
		显示设置，以允许进入/退出飞行模式。 Activity Action: Show settings to allow entering/exiting airplane mode.
		String ACTION_APN_SETTINGS
		显示设置，以允许配置的APN。 Activity Action: Show settings to allow configuration of APNs.
		String ACTION_APPLICATION_DETAILS_SETTINGS
		有关特定应用程序的详细信息的显示屏幕。 Activity Action: Show screen of details about a particular application.
		String ACTION_APPLICATION_DEVELOPMENT_SETTINGS
		显示设置，以允许应用程序开发相关的设置配置 Activity Action: Show settings to allow configuration of application development-related settings.
		String ACTION_APPLICATION_SETTINGS
		显示设置，以允许应用程序相关的设置配置 Activity Action: Show settings to allow configuration of application-related settings.
		String ACTION_BLUETOOTH_SETTINGS
		显示设置，以允许蓝牙配置 Activity Action: Show settings to allow configuration of Bluetooth.
		String ACTION_DATA_ROAMING_SETTINGS
		选择of2G/3G显示设置 Activity Action: Show settings for selection of2G/3G.
		String ACTION_DATE_SETTINGS
		显示日期和时间设置，以允许配置 Activity Action: Show settings to allow configuration of date and time.
		String ACTION_DEVICE_INFO_SETTINGS
		显示一般的设备信息设置（序列号，软件版本，电话号码，等） Activity Action: Show general device information settings (serial number, software version, phone number, etc.).
		String ACTION_DISPLAY_SETTINGS
		显示设置，以允许配置显示 Activity Action: Show settings to allow configuration of display.
		String ACTION_INPUT_METHOD_SETTINGS
		特别配置的输入方法，允许用户启用输入法的显示设置 Activity Action: Show settings to configure input methods, in particular allowing the user to enable input methods.
		String ACTION_INPUT_METHOD_SUBTYPE_SETTINGS
		显示设置来启用/禁用输入法亚型 Activity Action: Show settings to enable/disable input method subtypes.
		String ACTION_INTERNAL_STORAGE_SETTINGS
		内部存储的显示设置 Activity Action: Show settings for internal storage.
		String ACTION_LOCALE_SETTINGS
		显示设置，以允许配置的语言环境 Activity Action: Show settings to allow configuration of locale.
		String ACTION_LOCATION_SOURCE_SETTINGS
		显示设置，以允许当前位置源的配置 Activity Action: Show settings to allow configuration of current location sources.
		String ACTION_MANAGE_ALL_APPLICATIONS_SETTINGS
		显示设置来管理所有的应用程序 Activity Action: Show settings to manage all applications.
		String ACTION_MANAGE_APPLICATIONS_SETTINGS
		显示设置来管理安装的应用程序 Activity Action: Show settings to manage installed applications.
		String ACTION_MEMORY_CARD_SETTINGS
		显示设置为存储卡存储 Activity Action: Show settings for memory card storage.
		String ACTION_NETWORK_OPERATOR_SETTINGS
		选择网络运营商的显示设置 Activity Action: Show settings for selecting the network operator.
		String ACTION_PRIVACY_SETTINGS
		显示设置，以允许配置隐私选项 Activity Action: Show settings to allow configuration of privacy options.
		String ACTION_QUICK_LAUNCH_SETTINGS
		显示设置，以允许快速启动快捷键的配置 Activity Action: Show settings to allow configuration of quick launch shortcuts.
		String ACTION_SEARCH_SETTINGS
		全局搜索显示设置 Activity Action: Show settings for global search.
		String ACTION_SECURITY_SETTINGS
		显示设置，以允许配置的安全性和位置隐私 Activity Action: Show settings to allow configuration of security and location privacy.
		String ACTION_SETTINGS
		显示系统设置 Activity Action: Show system settings.
		String ACTION_SOUND_SETTINGS
		显示设置，以允许配置声音和音量 Activity Action: Show settings to allow configuration of sound and volume.
		String ACTION_SYNC_SETTINGS
		显示设置，以允许配置同步设置 Activity Action: Show settings to allow configuration of sync settings.
		String ACTION_USER_DICTIONARY_SETTINGS
		显示设置来管理用户输入字典 Activity Action: Show settings to manage the user input dictionary.
		String ACTION_WIFI_IP_SETTINGS
		显示设置，以允许配置一个静态IP地址的Wi – Fi Activity Action: Show settings to allow configuration of a static IP address for Wi-Fi.
		String ACTION_WIFI_SETTINGS
		显示设置，以允许Wi – Fi配置 Activity Action: Show settings to allow configuration of Wi-Fi.
		String ACTION_WIRELESS_SETTINGS
		显示设置，以允许配置，如Wi – Fi，蓝牙和移动网络的无线控制 Activity Action: Show settings to allow configuration of wireless controls such as Wi-Fi, Bluetooth and Mobile networks.
		String AUTHORITY
		String EXTRA_AUTHORITIES
		在推出活动的基础上给予的权力限制可选项。 Activity Extra: Limit available options in launched activity based on the given authority.
		String EXTRA_INPUT_METHOD_ID
