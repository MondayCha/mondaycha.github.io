复制到 `~/.vimrc`：

```vim
" 设置不兼容 Vi，启用更多高级功能
set nocompatible

" 设置历史记录文件路径
set viminfo='20,<50,s10,h

" 设置编码为 UTF-8
set encoding=utf-8
set fileencodings=utf-8,ucs-bom,gbk,cp936

" 显示相对行号
set relativenumber

" 开启语法高亮
syntax on

" 开启自动缩进
set autoindent

" 智能缩进
set smartindent

" 显示状态栏
set laststatus=2

" 搜索时高亮显示匹配的文本
set hlsearch

" 输入搜索内容时实时高亮显示匹配项
set incsearch

" 开启鼠标支持（可根据个人喜好调整）
set mouse=a

" 设置文件备份
set backup

" 设置交换文件
set swapfile

" 设置缩进宽度为 4 个空格
set tabstop=4
set shiftwidth=4
set expandtab
```
