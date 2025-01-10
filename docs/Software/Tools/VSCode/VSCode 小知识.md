## Profile 配置文件

> [Profiles in Visual Studio Code](https://code.visualstudio.com/docs/editor/profiles)

而之前对每个工作区启用或禁止插件时，并没有在 `settings.json` 中找到，参考这个 [知乎问题](https://www.zhihu.com/question/531021146) ，得知是存储在本机数据库中的，相对没有那么直观。

## Terminal 字体问题

> [How to change font for terminal in Visual Studio Code? - 김영석 - Medium](https://youngstone89.medium.com/how-to-change-font-for-terminal-in-visual-studio-code-c3305fe6d4c2)

通过 `Ctrl + P` 打开命令窗口，找到 User Settings.

```json
{
    "terminal.integrated.defaultProfile.osx": "zsh",
    "terminal.integrated.fontFamily": "MesloLGS NF",
    "editor.inlineSuggest.enabled": true,
}
```

## Ctrl + 鼠标滚轮缩放代码区域

在「Settings」搜索「Zoom」，勾选「Mouse Wheel Zoom」。
