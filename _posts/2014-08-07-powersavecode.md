---
layout: post
title:省电模式部分代码 
category:  android
---

####这是我写的一个电量管理的一些代码

以下皆在android 4.3 平台上测试通过<br/>

1. 将 休眠时间调制 15秒：

		Settings.System.putInt(getContentResolver(),android.provider.Settings.System.SCREEN_OFF_TIMEOUT,-1);

2.  关闭蓝牙：

		BluetoothAdapter bluetoothadapter = BluetoothAdapter.getDefaultAdapter();
        bluetoothadapter.disable();

3. 关闭wifi

		WifiManager manager =null;
    	manager = (WifiManager)context.getSystemService(Context.WIFI_SERVICE);
		manager.setWifiEnabled(false);

4. 降低屏幕亮度

这个比较复杂,在主函数里添加：

		try {  
        screenMode = Settings.System.getInt(getContentResolver(), Settings.System.SCREEN_BRIGHTNESS_MODE);  
        Log.i(TAG, "screenMode = " + screenMode);  

        // 获得当前屏幕亮度值 0--255  
        screenBrightness = Settings.System.getInt(getContentResolver(), Settings.System.SCREEN_BRIGHTNESS);  
        Log.i(TAG, "screenBrightness = " + screenBrightness);  

        // 如果当前的屏幕亮度调节调节模式为自动调节，则改为手动调节屏幕亮度  
        if (screenMode == Settings.System.SCREEN_BRIGHTNESS_MODE_AUTOMATIC) {  
            setScreenMode(Settings.System.SCREEN_BRIGHTNESS_MODE_MANUAL);  
        }  

        // 设置屏幕亮度值为最大值0  
        setScreenBrightness(0.0F);  
        } catch (SettingNotFoundException e) {  
            // TODO Auto-generated catch block  
            e.printStackTrace();  
        }  

然后添加两个执行函数

 		private void setScreenMode(int value) {  
        Settings.System.putInt(getContentResolver(), Settings.System.SCREEN_BRIGHTNESS_MODE, value);  
    }  
    private void setScreenBrightness(float value) {  
        Window mWindow = getWindow();  
        WindowManager.LayoutParams mParams = mWindow.getAttributes();  
        float f = value / 255.0F;  
        mParams.screenBrightness = f;  
        mWindow.setAttributes(mParams);  
  
        // 保存设置的屏幕亮度值  
        Settings.System.putInt(getContentResolver(), Settings.System.SCREEN_BRIGHTNESS, (int) value);  
    }  

还有private 几个变量 

		private int screenMode;  
    	private static final String TAG = "ScreenLuminance";
    	private int screenBrightness;  

亮度部分需要权限：

		<uses-permission android:name="android.permission.WRITE_SETTINGS"/>  

