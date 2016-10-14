---

title: 代码布局的一些零碎语法
category: Android
---

###前言

越来越喜欢代码布局，因为它的高效和迅速，如果熟练掌握，将比xml的效率更加高。

虽然可读性差了点，但是，你写的代码如果足够好，谁还会拆开去看呢？

以下是日常研发中的一些笔记

### FrameLayout下动态设置按钮居中

		FrameLayout.LayoutParams lytp = new FrameLayout.LayoutParams(80,LayoutParams.WRAP_CONTENT);
		lytp .gravity = Gravity.CENTER;
		btn.setLayoutParams(lytp);

###RelativeLayout下动态设置子控件居中：

		RelativeLayout.LayoutParams lp=new RelativeLayout.LayoutParams(LayoutParams.WRAP_CONTENT,LayoutParams.WRAP_CONTENT);
		lp.addRule(RelativeLayout.ALIGN_PARENT_RIGHT, RelativeLayout.TRUE);
		lp.addRule(RelativeLayout.ALIGN_PARENT_TOP, RelativeLayout.TRUE);
		btn1.setLayoutParams(lp);

###添加一个控件（以TextView为例）：

		TextView mlocation=new TextView(context);
		String mlocation1=GetLocationByNumber.getCallerInfo(phonenumber,context);
		mlocation.setText(mlocation1);
       		 this.addView(mlocation);

###给文字设置阴影值：

		mlocation.setShadowLayer(10, 1, 1, 0xff000000);//（模糊度（半径），阴影x方向位移，阴影y方向位移，阴影颜色）


