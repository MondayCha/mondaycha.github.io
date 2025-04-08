## 1. 快捷键

### 1. 文件目录

| 快捷键        | 功能                  |
| ------------- | --------------------- |
| `<space>` + e | 开关目录树            |
| o             | 打开文件/打开文件目录 |
| h             | 折叠一个层级目录      |
| d             | 删除文件              |
| a             | 新建文件              |
| A             | 新建文件夹            |
| r             | 重命名文件            |
| j             | 下移动条目            |
| k             | 上移动条目            |

### 2. 常规动作

| 快捷键             | 功能                                                                         |
| ------------------ | ---------------------------------------------------------------------------- |
| `<space>` + o      | 开关大纲                                                                     |
| `<space>` + f      | 搜索文件                                                                     |
| `<space>` + F      | 搜索字符（输入要搜索的字符后，按 tab 可切换到搜索结果，shift+tab 回到搜索框) |
| E                  | 打开左边标签页                                                               |
| R                  | 打开右边标签页                                                               |
| `<leader>` + q     | 关闭当前编辑文件                                                             |
| `<leader>` + gq    | 关闭当前编辑组                                                               |
| `<ctrl>` + h/j/k/l | 进入左边/下边/上边/右边窗口                                                  |
| `<ctrl> + \`       | 开关终端                                                                     |
| `<ctrl> + p`       | 开关 panel                                                                   |

### 3. 代码导航

| 快捷键          | 功能                                                                       |
| --------------- | -------------------------------------------------------------------------- |
| `<leader>` + t  | 在声明/定义间来回跳转 (c 和 cpp 项目，需要导出 compile_commands.json 文件) |
| `<leader>` + u  | 查看代码引用(浮动窗)                                                       |
| `<leader>` + U  | 查看代码引用（单独引用 panel)                                              |
| `<leader>`+ in  | 函数调用链                                                                 |
| `alt` + o       | c/c++ 切换源文件和头文件                                                   |
| `]]`            | 跳转到下一个函数头                                                         |
| `][`            | 跳转到下一个函数尾                                                         |
| `[[`            | 跳转到上一个函数头                                                         |
| `[]`            | 跳转到上一个函数尾                                                         |
| gh              | 查看函数签名+注释文档                                                      |
| `<leader>` + rn | 重命名符号                                                                 |
| `<space>` + s   | 搜索当前窗口下的符号 (vscode 的 `@`)                                       |
| `<space>` + S   | 搜索项目下的符号 (vscode `#`)                                              |

### 4. 代码诊断

| 快捷键          | 功能       |
| --------------- | ---------- |
| `<leader>` + dj | 下一个错误 |
| `<leader>`+ dk  | 上一个错误 |

### 5. Git 操作

| 快捷键          | 功能         |
| --------------- | ------------ |
| `<leader>` + j  | 下一个 hunk  |
| `<leader>` + k  | 上一个 hunk  |
| `<leader>` + hs | stage hunk   |
| `<leader>` + hu | unstage hunk |
| `<leader>` + hr | reset hunk   |
| `<space>` + g   | 打开 git tab |

### 6. Debug

| 快捷键          | 功能         |
| --------------- | ------------ |
| `<leader>` + db | 开关断点     |
| `<F5>`          | 开始调试     |
| `<F4>`          | 结束调试会话 |
| `<F6>`          | stepover     |
| `<F7>`          | stepinto     |
| `<F8>`          | stepout      |

## 2. 配置

```json
/* vim settings begin */
    "vim.camelCaseMotion.enable": true,
    "vim.easymotion": true,
    "vim.foldfix": true, // to avoid fold open up autocamatically
    "vim.sneak": false,
    "vim.surround": true,
    "vim.useCtrlKeys": true,
    "vim.useSystemClipboard": true,
    "vim.vimrc.enable": true,
    "vim.vimrc.path": "$HOME/.vsvimrc",
    "vim.handleKeys": {
        "<C-a>": false,
        "<C-f>": false,
        "<C-i>": true,
        "<C-o>": true,
        "<C-r>": true,
        "<C-s>": false,
        "<C-v>": false,
        "<C-c>": false,
        "<C-x>": false,
        "<C-w>": true,
        "<C-u>": false,
        "<C-d>": false
    },
    "vim.hlsearch": true,
    "vim.incsearch": true,
    "vim.leader": ";",
    "vim.normalModeKeyBindings": [
        {
            // which key
            "before": ["<space>"],
            "commands": ["whichkey.show"]
        }
    ],
    "vim.normalModeKeyBindingsNonRecursive": [
        {
            "before": ["E"],
            "after": ["g", "T"]
        },
        {
            "before": ["R"],
            "after": ["g", "t"]
        },
        {
            "before": ["<leader>", "f"],
            "commands": ["editor.action.formatDocument"]
        },
        {
            "before": ["<leader>", "g", "q"],
            "commands": ["workbench.action.closeEditorsInGroup"]
        },
        {
            "before": ["<leader>", "u"],
            "commands": ["editor.action.referenceSearch.trigger"]
        },
        {
            "before": ["<leader>", "U"],
            "commands": ["references-view.findReferences"]
        },
        {
            "before": ["<leader>", "i", "n"],
            "commands": ["references-view.showCallHierarchy"]
        },
        // -- run
        {
            "before": ["<leader>", "r"],
            "commands": ["workbench.action.files.save", "workbench.action.debug.run"]
        },
        {
            "before": ["<leader>", "d", "r"],
            "commands": ["workbench.action.files.save", "workbench.action.debug.start"]
        },
        // -- debug
        {
            "before": ["<leader>", "d", "b"],
            "commands": ["editor.debug.action.toggleBreakpoint"]
        },
        {
            "before": ["<leader>", "d", "c"],
            "commands": ["editor.debug.action.conditionalBreakpoint"]
        },
        // -- problem nav
        // fix <C-d> and <C-u>
        {
            "before": ["<leader>", "d", "k"],
            "commands": ["editor.action.marker.prev"]
        },
        {
            "before": ["<leader>", "d", "j"],
            "commands": ["editor.action.marker.next"]
        },
        // -- git hunk nav
        {
            "before": ["<leader>", "k"],
            "commands": ["workbench.action.editor.previousChange", "editor.action.dirtydiff.previous"]
        },
        {
            "before": ["<leader>", "j"],
            "commands": ["workbench.action.editor.nextChange", "editor.action.dirtydiff.next"]
        },
        // git (un)stage
        {
            "before": ["<leader>", "h", "s"],
            "commands": ["git.stage"]
        },
        {
            "before": ["<leader>", "h", "u"],
            "commands": ["git.unstage"]
        },
        {
            "before": ["<leader>", "h", "r"],
            "commands": ["git.revertSelectedRanges"]
        },
        // -- rename symbol
        {
            "before": ["<leader>", "r", "n"],
            "commands": ["editor.action.rename"]
        },
        // search
        {
            "before": ["<leader>", "f", "w"],
            "commands": ["extension.searchUnderCursor"]
        },
        // gg and G jump mark
        {
            "before": ["g", "g"],
            "after": ["m", "a", "g", "g"]
        }
    ],
    "vim.visualModeKeyBindings": [
        {
            // which key
            "before": ["<space>"],
            "commands": ["whichkey.show"]
        },
        // repeatly indent in visual mode
        {
            "before": [">"],
            "commands": ["editor.action.indentLines"]
        },
        {
            "before": ["<"],
            "commands": ["editor.action.outdentLines"]
        }
    ],
    "vim.visualModeKeyBindingsNonRecursive": [
        {
            "before": ["<leader>", "f"],
            "commands": ["editor.action.formatSelection"]
        },
        {
            // p action will not override clipboard content
            "before": ["p"],
            "after": ["p", "g", "v", "y"]
        }
    ],
    /* which key bindings */
    "whichkey.bindings": [
        {
            "key": "p",
            "name": "Show VSCode Command Panel",
            "type": "command",
            "command": "workbench.action.quickOpen"
        },
        {
            "key": "e",
            "name": "Show tree/explorer view",
            "type": "conditional",
            "bindings": [
                {
                    "key": "",
                    "name": "default",
                    "type": "command",
                    "command": "workbench.view.explorer"
                },
                {
                    "key": "when:sideBarVisible && explorerViewletVisible",
                    "name": "Hide explorer",
                    "type": "command",
                    "command": "workbench.action.toggleSidebarVisibility"
                }
            ]
        }, 
        {
            "key": "o",
            "name": "Outline",
            "type": "command",
            "command": "workbench.action.toggleAuxiliaryBar"
        },
        {
            "key": "h",
            "name": "bookmark",
            "type": "command",
            "command": "lineHighlightBookmark.toogleBookmarks"
        },
        {
            "key": "g",
            "name": "Source contrl",
            "type": "command",
            "command": "workbench.view.scm"
        },
        {
            "command": "workbench.action.quickOpen",
            "key": "f",
            "name": "Find file",
            "type": "command"
        },
        {
            "command": "workbench.view.search",
            "key": "F",
            "name": "Search Word",
            "type": "command"
        },
        {
            "command": "search.action.openEditor",
            "key": "w",
            "name": "New Search Editor",
            "type": "command"
        },
        {
            "command": "workbench.action.gotoSymbol",
            "key": "s",
            "name": "Search document symbol",
            "type": "command"
        },
        {
            "command": "workbench.action.showAllSymbols",
            "key": "S",
            "name": "Search project symbol",
            "type": "command"
        }
    ],
    "editor.lineNumbers": "relative"
```
