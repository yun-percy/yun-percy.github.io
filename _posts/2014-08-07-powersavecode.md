---
layout: post
title: 省电模式部分代码 
category: Android
---

####这是我写的一个电量管理的一些代码

以下皆在android 4.3 平台上测试通过<br/>

1. 将 休眠时间调制 15秒：

		Settings.System.putInt(getContentResolver(),android.provider.Settings.System.SCREEN_OFF_TIMEOUT,-1);

2.  蓝牙：

        关闭：
		BluetoothAdapter bluetoothadapter = BluetoothAdapter.getDefaultAdapter();
        bluetoothadapter.disable();
        打开：
        BluetoothAdapter bluetoothadapter = BluetoothAdapter.getDefaultAdapter();
        bluetoothadapter.disable();
        是否已经打开:
        if(!bluetoothadapter.isEnabled()){}
        权限:
        <uses-permission android:name="android.permission.BLUETOOTH_ADMIN"/>
        <uses-permission android:name="android.permission.BLUETOOTH"/>





3. wifi

        关闭：
		WifiManager manager =null;
    	manager = (WifiManager)this.getSystemService(Context.WIFI_SERVICE);
		manager.setWifiEnabled(false);

        打开：
        WifiManager manager =null;
        manager = (WifiManager)this.getSystemService(Context.WIFI_SERVICE);
        manager.setWifiEnabled(true);

        判断是否打开：
        public String checkWifi(Activity activitiy,String string) {  
        WifiManager mWifiManager = (WifiManager) activitiy  
                .getSystemService(Context.WIFI_SERVICE);  
        WifiInfo wifiInfo = mWifiManager.getConnectionInfo();  
        int ipAddress = wifiInfo == null ? 0 : wifiInfo.getIpAddress();  
        if (mWifiManager.isWifiEnabled() && ipAddress != 0) {return string;}
        else {return string;}
        } 
        
        权限：
        <uses-permission android:name="android.permission.ACCESS_WIFI_STATE"/>
        <uses-permission android:name="android.permission.CHANGE_WIFI_STATE"/>

3. 数据流量：

        打开：
        ConnectivityManager connectivityManager = (ConnectivityManager)getSystemService(  
                Context.CONNECTIVITY_SERVICE); 
        try {  
                Class ownerClass = connectivityManager.getClass();  
                Class[] argsClass = new Class[1];  
                argsClass[0] = boolean.class;  
                Method method = ownerClass.getMethod("setMobileDataEnabled", argsClass);  
                method.invoke(connectivityManager, false);  
            } catch (Exception e) {  
                e.printStackTrace();  
                System.out.println("移动数据设置错误: " + e.toString());  
            } 

        关闭：
        ConnectivityManager connectivityManager = (ConnectivityManager)getSystemService(  
                Context.CONNECTIVITY_SERVICE); 
        try {  
            Class ownerClass = connectivityManager.getClass();  
            Class[] argsClass = new Class[1];  
            argsClass[0] = boolean.class;  
            Method method = ownerClass.getMethod("setMobileDataEnabled", argsClass);  
            method.invoke(connectivityManager, true);  
      
        } catch (Exception e) {  
            // TODO Auto-generated catch block  
            e.printStackTrace();  
            System.out.println("移动数据设置错误: " + e.toString());  
        }

        判断是否开启：
        public String checkdata(String string) { 
        ConnectivityManager connectivityManager = (ConnectivityManager)getSystemService(  
                Context.CONNECTIVITY_SERVICE);  
        NetworkInfo networkInfo = connectivityManager.getNetworkInfo(ConnectivityManager.TYPE_MOBILE);  
        if (false == networkInfo.isConnectedOrConnecting()) {  
            string="close";
            return string;
        } else {              
            string="open";
            return string; 
        }
        }

        权限：
        <uses-permission android:name="android.permission.ACCESS_NETWORK_STATE"/>
        <uses-permission android:name="android.permission.CHANGE_NETWORK_STATE"/>

4. 屏幕旋转

        如果开启就关闭，关闭就开启：
        int flag = Settings.System.getInt(getContentResolver(),
                Settings.System.ACCELEROMETER_ROTATION, 0);
        Settings.System.putInt(this.getContentResolver(),Settings.System.ACCELEROMETER_ROTATION,flag==1?0:1);
    
        检查是否开启：
        public String checkrotate(String string){
        int flag = Settings.System.getInt(getContentResolver(),
                Settings.System.ACCELEROMETER_ROTATION, 0);
         if (0 == flag) {
             string="close";
                return string;
        }
         else {
             string="open";
                return string;
         }
        }

4. 降低屏幕亮度<br>这个比较复杂,在主函数里添加：

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

####最后更新时间：2014-09-24
