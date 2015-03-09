---
layout: post
title: Android 阻尼回弹 ListView控件
category: android
---

[原帖地址](http://my.oschina.net/helu/blog/145502)

今天又在IOS上看到列表的"阻尼"效果，就是列表拉到表头或者表尾时，还可以继续往上或往下拉，松开手后，整个列表会弹回去

<pre>
public class BaseListView extends ListView
{
    private static final int MAX_Y_OVERSCROLL_DISTANCE = 200;

    private Context mContext;
    private int mMaxYOverscrollDistance;

    public BaseListView(Context context)
    {
        super(context);
        mContext = context;
        initBounceListView();
    }

    public BaseListView(Context context, AttributeSet attrs)
    {
        super(context, attrs);
        mContext = context;
        initBounceListView();
    }

    public BaseListView(Context context, AttributeSet attrs, int defStyle)
    {
        super(context, attrs, defStyle);
        mContext = context;
        initBounceListView();
    }

    private void initBounceListView()
    {

        final DisplayMetrics metrics = mContext.getResources().getDisplayMetrics();
        final float density = metrics.density;

        mMaxYOverscrollDistance = (int) (density * MAX_Y_OVERSCROLL_DISTANCE);
    }

    @Override
    protected boolean overScrollBy(int deltaX, int deltaY, int scrollX, int scrollY, int scrollRangeX, int scrollRangeY, int maxOverScrollX, int maxOverScrollY, boolean isTouchEvent)
    {
        return super.overScrollBy(deltaX, deltaY, scrollX, scrollY, scrollRangeX, scrollRangeY, maxOverScrollX, mMaxYOverscrollDistance, isTouchEvent);
    }

}
</pre>
