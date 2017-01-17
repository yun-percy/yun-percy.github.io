---
title: 双击退出程序-java代码
category: 语法
---



使用方法：
--------

### 直接在函数最后一个括号“}”之前黏贴一下代码即可


		@Override
		public boolean onKeyDown(int keyCode, KeyEvent event) {
		    // TODO Auto-generated method stub
		    if(keyCode == KeyEvent.KEYCODE_BACK)
		       {  
		           exitBy2Click();      //调用双击退出函数
		       }
		    return false;
		}
		private static Boolean isExit = false;

		private void exitBy2Click() {
		    Timer tExit = null;
		    if (isExit == false) {
		        isExit = true; // 准备退出
		        Toast.makeText(this, "再按一次退出程序", Toast.LENGTH_SHORT).show();
		        tExit = new Timer();
		        tExit.schedule(new TimerTask() {
		            @Override
		            public void run() {
		                isExit = false; // 取消退出
		            }
		        }, 2000); // 如果2秒钟内没有按下返回键，则启动定时器取消掉刚才执行的任务

		    } else {
		        finish();
		        System.exit(0);
		    }
		}
