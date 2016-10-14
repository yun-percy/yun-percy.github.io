---

title: 关于Dialog的学习
category: Android
---

这里的Dialog是用的AlertDialog.build实现的，而且，支持多种方式自定义
不多说，直接上代码：

		private void chosePercentAutoOpen() {
		AlertDialog.Builder builder=new Builder(PowerSaveModeActivity.this,R.style.YunDialogTheme);
		builder.setTitle(getResources().getString(R.string.auto_open_super_mode));
		builder.setSingleChoiceItems(new String[]{
				getResources().getString(R.string.power_90),
				getResources().getString(R.string.power_80),
				getResources().getString(R.string.power_70),
				getResources().getString(R.string.power_60),
				getResources().getString(R.string.power_50),
				getResources().getString(R.string.power_40)}
		, 5, new DialogInterface.OnClickListener(){
			@Override
			public void onClick(DialogInterface arg0, int position) {
				System.out.println("你选择了第"+position+"项");

			}
		}).setNegativeButton(getResources().getString(R.string.cancle),null).show();
		}

> 如果弹出的弹出框是双层的，可以在那个主题下定义一个：

		<item name="android:windowBackground">@drawable/transparent</item>

> 这样就将后面的弹出框给隐藏了

本次文章实现的是单选框。[更多详情可以点击这里进行学习](http://www.oschina.net/question/54100_32486)
