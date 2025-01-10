---
title: 操作系统 OS Lab4 学习笔记
---

今天的内容是OS Lab4的学习复习笔记……这周的OO强测只拿了20分，之前的所有优化努力直接白给……蓝瘦。

所以OS不能再一知半解了，在一开始同样放下学长博客与课程指导中心的视频——

> https://www.cnblogs.com/SivilTaram/p/os_lab4.html
>
> https://www.cnblogs.com/sharinka0715/p/10776860.html
>
> https://ausar.xyz/index.php/archives/77/
>
> https://www.cnblogs.com/Yzx835/p/10775984.html
>
> https://blog.csdn.net/qq_36740940/article/details/89523911
>
> https://blog.csdn.net/weixin_44689094/article/details/105893744
>
> https://blog.csdn.net/weixin_41412192/article/details/89522232
>
> https://www.yizhibo.com/l/z3OzSureOCT8QEQT.html

在这一节的实验中，我们需要实现系统调用机制，并在此基础上实现进程间通信（IPC）机制和一个重要的系统调用fork。在梳理博客的时候，有的学长是根据运行顺序来总结的，我目前还是先跟着题目走。

## 系统调用

系统调用的流程：

1. 调用一个封装好的用户空间的库函数（如writef）
1. 调用用户空间的syscall\_\* 函数
1. 调用msyscall，用于陷入内核态
1. 陷入内核，内核取得信息，执行对应的内核空间的系统调用函数（sys\_\*）
1. 执行系统调用，并返回用户态，同时将返回值“传递”回用户态
1. 从库函数返回，回到用户程序调用处

### Exercise 4.1

填写user/syscall_wrap.S 中的msyscall 函数，使得用户部分的系统调用机制可以正常工作。

```c
LEAF(msyscall)
    // TODO: you JUST need to execute a `syscall` instruction and return from msyscall
	syscall
    jr ra
    nop
END(msyscall)
```

执行syscall指令，然后从函数返回。

### Thinking 4.1

思考并回答下面的问题：

- 内核在保存现场的时候是如何避免破坏通用寄存器的？
- 系统陷入内核调用后可以直接从当时的$a0-$a3 参数寄存器中得到用户调用msyscall 留下的信息吗？
- 我们是怎么做到让sys 开头的函数“认为”我们提供了和用户调用msyscall 时同样的参数的？
- 内核处理系统调用的过程对Trapframe 做了哪些更改？这种修改对应的用户态的变化是？

### Exercise 4.2

按照lib/syscall.S 中的提示，完成handle_sys 函数，使得内核部分的系统调用机制可以正常工作。

在通过特权指令syscall 陷入内核态后，处理器将PC 寄存器指向一个相同的内核异常入口。在trap_init 函数中将系统调用类型的异常的入口设置为了handle_sys 函数。

第一个TODO，MIPS有异常程序计数器（exception program counter,EPC)，属于CP0寄存器，用于保存造成异常的那条指令的地址。让EPC值+4到下一条指令，这样就不会陷入反复中断的死循环之中。

```c
/*** exercise 4.2 ***/
NESTED(handle_sys,TF_SIZE, sp)			// 把用户态的所有寄存器存进栈帧，sp相当于栈顶
    SAVE_ALL                            // 用于保存所有寄存器的汇编宏
    CLI                                 // 用于屏蔽中断位的设置的汇编宏
    nop
    .set at                             // 恢复$at寄存器的使用

    // TODO: Fetch EPC from Trapframe, calculate a proper value and store it back to trapframe.
	lw 		t0, TF_EPC(sp) 				// 将Trapframe的EPC寄存器取出
	addu 	t0, 4 						// 计算一个合理的值
	sw 		t0, TF_EPC(sp) 				// 存回Trapframe中
```

第二个TODO，这里其实是多余的，因为a0的值没有改变过。

```c
    // TODO: Copy the syscall number into $a0.
	lw 		a0, TF_REG4(sp) 			// 将系统调用号“复制”入寄存器$a0，a0是4号寄存器
```

之后是保存其他的值啦。

```c
    addiu   a0, a0, -__SYSCALL_BASE     // a0 <- “相对”系统调用号
    sll     t0, a0, 2                   // t0 <- 相对系统调用号* 4
    la      t1, sys_call_table          // t1 <- 系统调用函数的入口表基地址
    addu    t1, t1, t0                  // t1 <- 特定系统调用函数入口表项地址
    lw      t2, 0(t1)                   // t2 <- 特定系统调用函数入口函数地址

    lw      t0, TF_REG29(sp)            // t0 <- 用户态的栈指针
    lw      t3, 16(t0)                  // t3 <- msyscall的第5个参数
    lw      t4, 20(t0)                  // t4 <- msyscall的第6个参数
```

这里有一步还原偏移的操作，\_\_SYSCALL_BASE的定义在unistd.h里可以看到：

```c
#ifndef UNISTD_H
#define UNISTD_H

#define __SYSCALL_BASE 9527
#define __NR_SYSCALLS 20


#define SYS_putchar 		((__SYSCALL_BASE ) + (0 ) )
#define SYS_getenvid 		((__SYSCALL_BASE ) + (1 ) )
#define SYS_yield			((__SYSCALL_BASE ) + (2 ) )
#define SYS_env_destroy		((__SYSCALL_BASE ) + (3 ) )
#define SYS_set_pgfault_handler	((__SYSCALL_BASE ) + (4 ) )
#define SYS_mem_alloc		((__SYSCALL_BASE ) + (5 ) )
#define SYS_mem_map			((__SYSCALL_BASE ) + (6 ) )
#define SYS_mem_unmap		((__SYSCALL_BASE ) + (7 ) )
#define SYS_env_alloc		((__SYSCALL_BASE ) + (8 ) )
#define SYS_set_env_status	((__SYSCALL_BASE ) + (9 ) )
#define SYS_set_trapframe		((__SYSCALL_BASE ) + (10 ) )
#define SYS_panic			((__SYSCALL_BASE ) + (11 ) )
#define SYS_ipc_can_send		((__SYSCALL_BASE ) + (12 ) )
#define SYS_ipc_recv		((__SYSCALL_BASE ) + (13 ) )
#define SYS_cgetc			((__SYSCALL_BASE ) + (14 ) )
#endif
```

第三个TODO，和MIPS的传参有关，前4 个参数会被syscall 开头的函数分别存入a0−a3（\$4~\$7） 寄存器的空间内，同时栈帧底部保留16 字节的空间；后2个参数只会被存入在前4的参数的预留空间之上的8字节空间内。

```c
    // TODO: Allocate a space of six arguments on current kernel stack and copy the six arguments to proper location
    lw      a0, TF_REG4(sp)				// 这一步也是多余的
    lw      a1, TF_REG5(sp)
    lw      a2, TF_REG6(sp)
    lw      a3, TF_REG7(sp)
    subu    sp, sp, 24
    sw      t3, 16(sp)					// 0-16：栈帧底部保留的16字节空间
    sw      t4, 20(sp)
    
    jalr    t2                          // 调用sys_*函数
    nop
```

第四个TODO，恢复sp指针的值。

```c
    // TODO: Resume current kernel stack
	addiu 	sp, sp, 24					// 恢复栈指针到分配前的状态
    

    sw      v0, TF_REG2(sp)             // 此时已经从系统调用中返回，将返回值存入Trapframe

    j       ret_from_exception          // 从异常中返回（恢复现场）
    nop
END(handle_sys)
```

最后就将返回值保存到v0，同时从系统调用中返回了。

### Exercise 4.3

实现lib/syscall_all.c 中的int sys_mem_alloc(int sysno,u_int envid,u_int va, u_int perm) 函数。

```c
/* 概述:
 * 分配一页内存，并映射到'va'的权限
 * 'envid'的地址空间中的'perm'。
 * 如果一个页面已经在'va'被映射，那么该页面将被取消映射。
 * 前提:
 * perm：需要PTE_V，不允许使用PTE_COW(返回-E_INVAL)，
 * 其他位是可选的。
 *
 * 后置条件:
 * 成功返回0，错误< 0
 * va必须 < UTOP
 * env可以修改自己的地址空间或其子节点的地址空间
 * /
/*** exercise 4.3 ***/
int sys_mem_alloc(int sysno, u_int envid, u_int va, u_int perm)
{
	// Your code here.
	struct Env *env;
	struct Page *ppage;
	int ret;
	ret = 0;

	// 2020-04-28
	if (va >= UTOP || (perm & PTE_COW) || !(perm & PTE_V)) 	// PTE_V may?
		return -E_INVAL;

	ret = envid2env(envid, &env, 0);
	if (ret < 0)
		return ret;

	ret = page_alloc(&ppage);
	if (ret < 0)
		return ret;

	ret = page_insert(env->env_pgdir, ppage, va, perm);
	if (ret < 0)
		return ret;

	return 0;
}
```

:::note
这是一篇从Hexo迁移的文章，创建于2020-05-05 18:22:36
:::
