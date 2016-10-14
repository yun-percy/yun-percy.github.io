---
title: Android 4.1以上实现归属地JAVA代码
category: Android
---



java代码:
--------
        private void setGeoDescription(CallerInfo info, String label) {

        if(TextUtils.isEmpty(info.geoDescription))
            info.updateGeoDescription(mContext, info.phoneNumber);
            if(label != null && !TextUtils.isEmpty(info.geoDescription))
            {
                mLabel.setText(label + "\n" +info.geoDescription);
                mLabel.setVisibility(View.VISIBLE);
            }
            else if(!TextUtils.isEmpty(info.geoDescription))
            {
            mPhoneNumber.setText(info.geoDescription);
            mPhoneNumber.setVisibility(View.VISIBLE);
            }
    }

##调用方式:
>
在com/android/phone/callcard.java内:
在updateDisplayForPerson函数里的最后一句下面调用

		setGeoDescription(info, label);

>
即可

##如果上面那个函数不行，这边还有一个归属地的函数，原理是一样的

###java代码

		private void setGeoDescription(CallerInfo info, String label) {


        if(TextUtils.isEmpty(info.geoDescription))
            info.updateGeoDescription(mContext, info.phoneNumber);
            if(label != null &amp;&amp; !TextUtils.isEmpty(info.geoDescription))
            {
                mCallTypeLabel.setText(info.geoDescription);
                mCallTypeLabel.setGravity(Gravity.CENTER);
                mCallTypeLabel.setVisibility(View.VISIBLE);
            }
            else if(!TextUtils.isEmpty(info.geoDescription))
            {
            mPhoneNumber.setText(info.geoDescription);
            mPhoneNumber.setVisibility(View.VISIBLE);
            }
    }
