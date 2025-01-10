- 官方文档： [6.5840 Lab 2: Raft](https://pdos.csail.mit.edu/6.824/labs/lab-raft.html)
- 中文翻译： [MIT 6.824 Lab2 翻译 （已完成）（Raft Base on Golang） - 知乎](https://zhuanlan.zhihu.com/p/248686289)

## Raft

- 官网： [Raft Consensus Algorithm](https://raft.github.io/)
- 动画演示： [Raft](https://thesecretlivesofdata.com/raft/)
- 实验指导： [Students' Guide to Raft :: Jon Gjengset](https://thesquareplanet.com/blog/students-guide-to-raft/)
  - 中文翻译： [【译】Raft 学生指南（一） - 知乎](https://zhuanlan.zhihu.com/p/200903182)
- 论文： [https://pdos.csail.mit.edu/6.824/papers/raft-extended.pdf](https://pdos.csail.mit.edu/6.824/papers/raft-extended.pdf)
  - Raft 作者博士论文的中文翻译： [GitHub - OneSizeFitsQuorum/raft-thesis-zh_cn: Raft 博士论文的中文翻译](https://github.com/OneSizeFitsQuorum/raft-thesis-zh_cn)
- [Raft 算法与对应代码框架介绍 - 知乎](https://zhuanlan.zhihu.com/p/492542462)
- [Debugging by Pretty Printing](https://blog.josejg.com/debugging-pretty/)
- [https://pdos.csail.mit.edu/6.824/labs/raft-locking.txt](https://pdos.csail.mit.edu/6.824/labs/raft-locking.txt)
- [https://pdos.csail.mit.edu/6.824/labs/raft-structure.txt](https://pdos.csail.mit.edu/6.824/labs/raft-structure.txt)

## Lab Blogs

- [6.824 Lab2: Raft - 知乎](https://zhuanlan.zhihu.com/p/121476449)
- [MIT6.824 lab2 笔记 - 知乎](https://zhuanlan.zhihu.com/p/548144411)
- [MIT 6.824 分布式系统 | Lab 2A：Raft 选举 - 知乎](https://zhuanlan.zhihu.com/p/264448558)
- [MIT 6.824 Lab2A 笔记](https://www.khanengr.com/posts/raft-note-1/)
- [C++ LAB2A.md](https://github.com/tjumcw/6.824/blob/main/LAB2A.md)
- [CSDIY lab2.md](https://github.com/OneSizeFitsQuorum/MIT6.824-2021/blob/master/docs/lab2.md)
- [GitHub - niebayes/MIT-6.5840: My solution for MIT 6.5840 (aka. MIT 6.824). No fail in 30,000 tests.](https://github.com/niebayes/MIT-6.5840)
- [Journey to MIT 6.824 — Lab 2A Raft Leader Election | by Qingping Meng | CodeX | Medium](https://medium.com/codex/journey-to-mit-6-824-lab-2a-raft-leader-election-974087a55740)
- [MIT 6.824 Lab 2: Raft 实验 | Ray's Blog](https://blog.rayzhang.top/2022/11/09/mit-6.824-lab2-raft/index.html)
- [Site Unreachable](https://www.khanengr.com/posts/raft-note-3/)

## Notes

### 1. 关于 Go 中的单元测试

Go 语言中形如 `*_test.go` 的文件会被认为是测试文件，使用 VSCode 调试测试文件（当然，并发情况下单步调试不再有效）：

```json
{
    "debugAdapter": "dlv-dap",
    "name": "raft2A",
    "type": "go",
    "request": "launch",
    "mode": "test",
    "cwd": "${workspaceFolder}/src/raft",
    "program": "${workspaceFolder}/src/raft/test_test.go",
    "buildFlags": "-race"
}
```

而在 Lab 2A，要求我们使用 `go test -run 2A` 以运行测试，仅有包含 `2A` 字符的测试会被运行。参考 [go - How to run test cases in a specified file? - Stack Overflow](https://stackoverflow.com/questions/16935965/how-to-run-test-cases-in-a-specified-file) ，其详细说明可以通过 `go help testflag` 查看。

### 2. `sync.Once` 的使用

> [Go sync.Once | Go 语言高性能编程 | 极客兔兔](https://geektutu.com/post/hpg-sync-once.html)

在 `make_config()` 函数中出现，用于仅初始化随机种子一次。

### 3. Go 语法高亮问题

在 VSCode 中，默认的 Go 语法高亮不能很好地显示自定义类型，参考 [[vscode-go] docs: mention advanced semantic token options](https://groups.google.com/g/golang-checkins/c/TwJ1wuX_8-o?pli=1) 的提示修改配置文件。

因为我的实现是在阅读了开源库 [hashicorp/raft](https://github.com/hashicorp/raft) 的部分源码后进行的
