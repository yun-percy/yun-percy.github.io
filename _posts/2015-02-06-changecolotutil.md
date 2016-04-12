---
layout: post
title: Android 变色封装类
category: Android
---

工具类的作用，将传人的bitmap转为黑色后输出bitmap，将传入TextView变色后输出

完整代码如下：

<pre>
package com.android.systemui.statusbar.phone;
import android.graphics.Bitmap;
import android.graphics.Canvas;
import android.graphics.ColorMatrix;
import android.graphics.ColorMatrixColorFilter;
import android.graphics.Matrix;
import android.graphics.Paint;
import android.widget.TextView;

public class ChangeColorUtil {
	private static Bitmap afterBitmap;
	private static Paint paint;
	private static Canvas canvas;

	public static Bitmap changebackcolor(Bitmap baseBitmap) {
		afterBitmap = Bitmap.createBitmap(baseBitmap.getWidth(),
				baseBitmap.getHeight(), baseBitmap.getConfig());
		canvas = new Canvas(afterBitmap);
		paint = new Paint();
		float[] src = new float[] { 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
				0, 0, 0, 0, 1, 0 };
		// 定义ColorMatrix，并指定RGBA矩阵
		ColorMatrix colorMatrix = new ColorMatrix();
		colorMatrix.set(src);
		// 设置Paint的颜色
		paint.setColorFilter(new ColorMatrixColorFilter(src));
		// 通过指定了RGBA矩阵的Paint把原图画到空白图片上
		canvas.drawBitmap(baseBitmap, new Matrix(), paint);

		return afterBitmap;

	}

	public static TextView changetextclor(TextView tv) {
		tv.setTextColor(0xff252525);
		return tv;

	}

	public static Bitmap changewhitecolor(Bitmap baseBitmap) {
		afterBitmap = Bitmap.createBitmap(baseBitmap.getWidth(),
				baseBitmap.getHeight(), baseBitmap.getConfig());
		canvas = new Canvas(afterBitmap);
		paint = new Paint();
		float[] src = new float[] {
				1, 0, 0, 0, 0,
				0, 1, 0, 0, 0,
				1, 0, 1, 0, 0,
				0, 0, 0, 1, 0 };
		// 定义ColorMatrix，并指定RGBA矩阵
		ColorMatrix colorMatrix = new ColorMatrix();
		colorMatrix.set(src);
		// 设置Paint的颜色
		paint.setColorFilter(new ColorMatrixColorFilter(src));
		// 通过指定了RGBA矩阵的Paint把原图画到空白图片上
		canvas.drawBitmap(baseBitmap, new Matrix(), paint);

		return afterBitmap;

	}

	public static TextView changewhitetextclor(TextView tv) {
		tv.setTextColor(0xffffffff);
		return tv;

	}

}
</pre>
