---
layout: post
title: Android 系统初始值修改(源码)
category: Android
---



1.在4.1上修改默认字体大小：
-------------
> 比如改成大：

		def_font_scale">115%

2.修改浏览器的默认标签
--------

###分别在以下资源文件中添加自定义的标签

> 编辑packages\apps\Browser\res\values\strings.xml

        Google
        http://www.google.com/

        Picasa
        http://picasaweb.google.com/

        Yahoo!
        http://www.yahoo.com/

        MSN
        http://www.msn.com/

        Twitter
        http://twitter.com/

        Facebook
        http://www.facebook.com/

        Wikipedia
        http://www.wikipedia.org/

        eBay
        http://www.ebay.com/

        CNN
        http://www.cnn.com/

        NY Times
        http://www.nytimes.com/

        ESPN
        http://espn.com/

        Amazon
        http://www.amazon.com/

        Weather Channel
        http://www.weather.com/

        BBC
        http://www.bbc.co.uk/

###编辑 packages\apps\Browser\res\values\bookmarks_icons.xml ，

> 注意：这里每个网站对应一个缩略图和一个favicon

        @raw/favicon_google
        @raw/thumb_google
        @raw/favicon_picasa
        @raw/thumb_picasa
        @raw/favicon_yahoo
        @raw/thumb_yahoo
        @raw/favicon_msn
        @raw/thumb_msn
        @raw/favicon_twitter
        @raw/thumb_twitter
        @raw/favicon_facebook
        @raw/thumb_facebook
        @raw/favicon_wikipedia
        @raw/thumb_wikipedia
        @raw/favicon_ebay
        @raw/thumb_ebay
        @raw/favicon_cnn
        @raw/thumb_cnn
        @raw/favicon_nytimes
        @raw/thumb_nytimes
        @raw/favicon_espn
        @raw/thumb_espn
        @raw/favicon_amazon
        @raw/thumb_amazon
        @raw/favicon_weatherchannel
        @raw/thumb_weatherchannel
        @raw/favicon_bbc
        @raw/thumb_bbc

   
> 对应的图片在 packages\apps\Browser\res\raw

3.LockScreen 解锁界面四个方向添加一个setting入口
-----------

###frameworks\base\core\res\res\values/arrays.xml

        @drawable/ic_lockscreen_unlock
        @drawable/ic_action_assist_generic
        @drawable/ic_lockscreen_camera
        @drawable/ic_lockscreen_settings

###在 frameworks\base\core\res\res\drawable 增加 ic_lockscreen_settings.xml 文件 并添加 ic_lockscreen_settings_normal.phg ic_lockscreen_settings_activated.png 资源文件

		http://schemas.android.com/apk/res/android">
	        android:state_active="false"
	        android:state_focused="false"
	        android:drawable="@drawable/ic_lockscreen_settings_normal" />
	        android:state_enabled="true"
	        android:state_active="true"
	        android:state_focused="false"
	        android:drawable="@drawable/ic_lockscreen_settings_activated" />
	        android:state_enabled="true"
	        android:state_active="false"
	        android:state_focused="true"
	        android:drawable="@drawable/ic_lockscreen_settings_activated" />

###打开 frameworks\base\policy\src\com\android\internal\policy\impl\LockScreen.java

	     public void onTrigger(View v, int target) {
	            final int resId = mGlowPadView.getResourceIdForTarget(target);
	            switch (resId) {
	                 case com.android.internal.R.drawable.ic_lockscreen_settings: //启动setting 应用
	                    launchActivity(new Intent().setComponent(new ComponentName("com.android.settings","com.android.settings.Settings")));   
	                    mCallback.pokeWakelock();
	                    break;

###进入frameworks/base/media/java/android/media/AudioService.java

		private final int[] MAX_STREAM_VOLUME = new int[] {
		        5,  // STREAM_VOICE_CALL
		        7,  // STREAM_SYSTEM
		        7,  // STREAM_RING
		        15, // STREAM_MUSIC
		        7,  // STREAM_ALARM
		        7,  // STREAM_NOTIFICATION
		        15, // STREAM_BLUETOOTH_SCO
		        7,  // STREAM_SYSTEM_ENFORCED
		        15, // STREAM_DTMF
		        15  // STREAM_TTS
		    };

 

###进入frameworks/base/media/java/android/media/AudioManager.java

		public static final int[] DEFAULT_STREAM_VOLUME = new int[] {
		        4,  // STREAM_VOICE_CALL
		        7,  // STREAM_SYSTEM
		        5,  // STREAM_RING
		        11, // STREAM_MUSIC
		        6,  // STREAM_ALARM
		        5,  // STREAM_NOTIFICATION
		        7,  // STREAM_BLUETOOTH_SCO
		        7,  // STREAM_SYSTEM_ENFORCED
		        11, // STREAM_DTMF
		        11  // STREAM_TTS
		    };