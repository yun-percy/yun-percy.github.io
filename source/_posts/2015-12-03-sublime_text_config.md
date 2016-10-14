---

title: sublime text config 配置
category: tools
---

```
{
    "auto_find_in_selection": true,
    "bold_folder_labels": true,
    "caret_extra_bottom": 0,
    "caret_extra_top": 0,
    "caret_extra_width": 0,
    "caret_style": "phase",
    "color_scheme": "Packages/Theme - Spacegray/base16-ocean.dark.tmTheme",
    "drag_text": false,
    "draw_white_space": "all",
    "font_face": "Inconsolata",//字体类型,windows需要自己安装
    "font_size": 12,//字体大小
    "highlight_line": true,//高亮正在编辑的行
    "highlight_modified_tabs": true,//高亮正在编辑的tab
    "ignored_packages":
    [
        "AndroidSnippets",
        "Markdown Preview",
        "sublime-github"
    ],
    "line_padding_bottom": 1,//行距-距底部
    "line_padding_top": 1,//行距-距顶部
    "soda_classic_tabs": true,
    "soda_folder_icons": true,
    "theme": "Spacegray.sublime-theme",
    "trim_trailing_white_space_on_save": true,//保存的时候去除行尾的空
    "wide_caret": true,//加宽光标
    "tab_size":4,//tab键设置为4个字符
    "translate_tabs_to_spaces":true,//用空格代替tab键
    "default_encoding": "UTF-8",//设置默认编码
    "default_line_ending": "Unix",//默认换行符为unix换行符
    "word_wrap": true
}
```

常用插件以及介绍
-----

__SideBarEnhancements__

SideBarEnhancements 扩展了侧边栏中菜单选项的数量，从而提升你的工作效率。诸如”New file” 和 “Duplicate” 这样的选项对于 ST3 来说实在是太重要了, 我甚至觉得 ST3 本来就应该提供这些功能。而且仅凭 “Delete” 这一个功能就让这个插件值得下载。这个功能将你会在你删除文件的时候把它放入回收站。虽然这个功能乍一看没什么用，但是当你没有使用这样的功能而彻底删除了一个文件的时候，除非你用了版本管理软件，否则你将很难恢复这个文件。

__Anaconda__

Anaconda 是一个终极 Python 插件。它为 ST3 增添了多项 IDE 类似的功能，例如：<br>

`Autocompletion` 自动完成，该选项默认开启，同时提供多种配置选项。<br>
`Code linting` 使用支持 pep8 标准的 PyLint 或者 PyFlakes。因为我个人使用的是另外的 linting 工具，所以我会在 Anaconda 的配置文件 `Anaconda.sublime-settings` 中将 linting 完全禁用。操作如下: `Sublime > Preferences > Package Settings > Anaconda > Settings – User： {"anaconda_linting": false}`<br>
`McCabe code complexity checker` 让你可以在特定的文件中使用 McCabe complexity checker. 如果你对软件复杂度检查工具不太熟悉的话，请务必先浏览上边的链接。<br>
`Goto Definitions` 能够在你的整个工程中查找并且显示任意一个变量，函数，或者类的定义。<br>
`Find Usage` 能够快速的查找某个变量，函数或者类在某个特定文件中的什么地方被使用了。<br>
`Show Documentation`： 能够显示一个函数或者类的说明性字符串(当然，是在定义了字符串的情况下)<br>


你可以在这里，或者通过 ST3 的 Package Settings: Sublime Text > Preferences > Package Settings > Anaconda > README 来查看所有这些特性。<br>

SublimeCodeIntel 是另外一个非常流行的插件，它的许多特性与 Anaconda 类似。我建议同时也试试它。<br>

__SublimeREPL__

通过选项`Tools->SublimeREPL->Python`就可以看到效果了


__Jedi__

如果真需要智能补全插件的话，用这个吧。

__AutoPep8__

自动将 Python 代码按 PEP8 规范格式化，安装完添加如下配置可自动在保存文件的时候格式化：

```py
{
    "format_on_save": true,
}
```

__ConvertToUTF8__

解决中文乱码的好东西
