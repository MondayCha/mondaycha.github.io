## 快速安装

> [Rime 输入法安装脚本](https://github.com/Mark24Code/rime-auto-deploy)

进入 Repo 目录：

```shell
cd ~/Workspace/rime-auto-deploy/
./installer.rb
```

需要更新时，保存 custom 文件夹内的改动，重新执行脚本，进入手动模式，单独执行 step04，重新部署 Rime。

## 切换到小鹤双拼

在 macOS 中，Rime 输入法（鼠须管）设置小鹤双拼的步骤如下：

1. 安装鼠须管输入法。
1. 点击“用户设定”，进入 rime 文件夹。
1. 打开 default.yaml 文件，在 schema_list:内添加 schema: double_pinyin_flypy#新增小鹤双拼。
1. 点击重新部署则完成设置。
1. **点击 `control + ~`，然后选择“小鹤双拼”则切换为小鹤双拼输入法，再选择“汉字-汉字”则切换为简体。**

设置完成后，就可以使用小鹤双拼输入法了。如果想要更改输入框的显示词数量、方向以及颜色、字体，可以在 squirrel.yaml 里进行设置。

## 修改皮肤

在安装之后，不知为何文字是竖排的，看起来很不习惯。参考 Issue [[Bug] UI 设置皮肤内配置不生效](https://github.com/rime/squirrel/issues/912)，添加自定义配置后解决问题。

```yaml
  style:
    # 选择皮肤，亮色与暗色主题
    # color_scheme: purity_of_form_custom
    # color_scheme_dark: purity_of_form_custom
    # color_scheme: macos_light
    # color_scheme_dark: macos_dark
    color_scheme: mac_light
    color_scheme_dark: mac_dark

    # 预设选项：（可被皮肤覆盖；如果皮肤没写，则默认使用这些属性。）
    text_orientation: horizontal  # horizontal | vertical
    candidate_list_layout: linear
```

终于不用被定期遗忘的 MacOS 自带输入法折磨了！
