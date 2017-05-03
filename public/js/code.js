    var setMyBlog = {
        setCopyright: function() {
            //设置版权信息，转载出处自动根据页面url生成
            var info_str = '<p>作者：<a target="_blank">@percychen</a><br>'+
                '转载请注明出处：<a class="uri"></a></p><hr></hr>', 
                info = $(info_str),
                info_a = info.find("a"),
                url = window.location.href;
            $(info_a[0]).attr("href","https://percychen.com/about");
            $(info_a[1]).attr("href",url).text(url);
            $(".article_content").prepend(info);
        },
        setCodeRow: function(){
            // 代码行号显示
            var pre = $("pre"); //选中需要更改的部分
            if(pre && pre.length){
                
                pre.each(function() {
                    var item = $(this);
                    var lang = item.attr("class").split(" ")[1]; //判断高亮的语言
                    if (!lang) {
                        lang='sh';
                    };
                    item.html(item.html().replace(/<[^>]+>/g,"")); //将<pre>标签中的html标签去掉
                    item.removeClass().addClass("brush: " + lang +";"); //根据语言添加笔刷
                    SyntaxHighlighter.all();
                })
            }
        },
        setAtarget: function() {
            // 博客内的链接在新窗口打开
            $("#article_content a").each(function(){
                this.target = "_blank";
            }) 
        },
        runAll: function() {
            /* 运行所有方法
             * setAtarget() 博客园内标签新窗口打开
             * setContent() 设置目录
             * setCopyright() 设置版权信息
             * setCodeRow() 代码行号显示
             */ 
            this.setAtarget(); 
            this.setCopyright();
            // this.setCodeRow();
        }
    }
    setMyBlog.runAll();