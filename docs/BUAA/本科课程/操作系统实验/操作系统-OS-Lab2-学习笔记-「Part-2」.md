---
title: 操作系统 OS Lab2 学习笔记 「Part 2」
---

OS Lab2的难度还是比较大的，为了更好的掌握，我希望能通过撰写博客加深对相关知识点的理解。

## 学习时的参考资料

在学习Lab2的过程中，最正经的方式应该是认真阅读所有相关的代码与宏……不过发现了两名学长的博客，对于Lab2的介绍很充分——

> LAB2初始化流程的梳理：https://ausar.xyz/index.php/archives/66/#comments
>
> 操作系统lab2实验总结——Part1：https://www.cnblogs.com/puublog/p/10657916.html

希望能边写边理清思路……要不然课上测试biss……

## MMU/TLB和内存访问

Lab2的内容主要与内存管理有关。内存翻译中的两大部件：MMU和TLB，其中MMU是硬件设备，将逻辑地址映射为物理地址，并可以实现内存访问的权限检查。TLB则是为了解决多级页表带来的访存低效的问题，是页表的一部分高速缓存，让计算机能够不经过页表就把虚拟地址映射成物理地址。

而关于Cache，这部分我其实还不是特别理解，在做思考题的时候再想清楚。

## MIPS虚拟映射布局

32位的MIPS CPU最大寻址空间为4GB(2^32字节)，被划分为4部分——

1. kuseg，2G，用户内存空间，需要通过MMU进行虚拟地址到物理地址的转换。
1. kseg0，512M，内核地址，将最高位清零就可以被转换为物理地址，使用缓存。
1. kseg1，512M，内核地址，高三位清零可转换，不使用缓存，通常用来实现对外设的访问。
1. kseg2，1G，只能在内核态使用，需要MMU的转换。

其他小Point:

1. 内核态上述虚存空间都可以访问
1. kuseg、kseg2访问需要通过MMU

## 物理内存管理

### 初始化流程说明

在Lab2，内核加载完毕后跳转到`init/main.c`下执行程序， `main.c`内部调用了`mips_init();`，这是一个死循环函数，如果停止则会通过`panic`报错。那么`panic`是啥呢？在`include/printf.h`下可以找到定义：

```c
#define panic(...) _panic(__FILE__, __LINE__, __VA_ARGS__)
```

具体查看`include/printf.c`，发现在打印错误信息之后就陷入死循环等待中断处理。

`mips_init();`通过`mips_detect_memory();`，`mips_vm_init();`，`page_init();`三个函数来实现物理内存管理的相关数据结构的初始化。

### 内存控制块

4KB为一页，内存分配也是以页为基本单位进行。为了记录分配情况，课程中使用Page结构体保存一页内存相关信息，定义在`include/pamp.h`中：

```c
typedef LIST_ENTRY(Page) Page_LIST_entry_t;

struct Page {
	Page_LIST_entry_t pp_link;	/* free list link */

	// Ref is the count of pointers (usually in page table entries)
	// to this page.  This only holds for pages allocated using
	// page_alloc.  Pages allocated at boot time using pmap.c's "alloc"
	// do not have valid reference count fields.

	u_short pp_ref;
};
```

`pp_link`的类型为`LIST_ENTRY(Page)`，其定义可以在`include/queue.h`中找到：

```c
/*
 * Use this inside a structure "LIST_ENTRY(type) field" to use
 * x as the list piece.
 *
 * The le_prev points at the pointer to the structure containing
 * this very LIST_ENTRY, so that if we want to remove this list entry,
 * we can do *le_prev = le_next to update the structure pointing at us.
 */
#define LIST_ENTRY(type)                                                \
        struct {                                                                \
                struct type *le_next;   /* next element */                      \
                struct type **le_prev;  /* address of previous next element */  \
        }
```

这就是在上次的总结中提过的特殊的双重链表结构，好处是删除方便。所以在`Page`结构体中，`pp_link`有两个域，其中`le_next`指向下一个页结构体，`le_prev`指向上一个页结构体的`pp_link`的`le_next`。`(listelm)->field.le_prev`是`listelm`上一个`elm`的`le_next`，让它指向新增的`elm`。关于这一点可以在`include/queue.h`中的`LIST_INSERT_AFTER`定义中找到：

```c
(elm)->field.le_prev = &((listelm)->field.le_next);
```

`pp_ref`则是这一页面的引用次数。所以Page结构体大概就是一张存储页使用信息、地址的链表，本身并不是物理内存页。之后的exercise2.1就是关于链表操作函数`LIST_INSERT_HEAD`和`LIST_INSERT_TAIL`的补全。单从插入效率的角度`LIST_INSERT_HEAD`函数显然更好一些，后者还要遍历链表。

这边的链表操作函数实在是绕……比如`LIST_INSERT_BEFORE`函数：

```c
/*
 * Insert the element "elm" *before* the element "listelm" which is
 * already in the list.  The "field" name is the link element
 * as above.
 */
#define LIST_INSERT_BEFORE(listelm, elm, field) do {                    \
                (elm)->field.le_prev = (listelm)->field.le_prev;        \
                LIST_NEXT((elm), field) = (listelm);                    \
                *(listelm)->field.le_prev = (elm);                      \	
                (listelm)->field.le_prev = &LIST_NEXT((elm), field);    \	
        } while (0)
```

这里的9是`*((listelm)->field.le_prev)`，也就是`listelm`的上一个`preelm`的`next`指向插入的`elm`；10则是让`listelm`的`prev`指针指向`elm`的`next`指针，从而实现链表的前插操作。

再次祭出这张群友发的图（现在想想数据结构是大一下，彼时是大二下的助教们大概率就是从OS课上获得的灵感）：

![](https://pic.downk.cc/item/5e78981c5c56091129c65218.png)

所以`LIST_REMOVE`函数就是这么写的：

```c
/*
 * Remove the element "elm" from the list.
 * The "field" name is the link element as above.
 */
#define LIST_REMOVE(elm, field) do {                                    \
                if (LIST_NEXT((elm), field) != NULL)                    \
                        LIST_NEXT((elm), field)->field.le_prev =        \
                                        (elm)->field.le_prev;           \
                *(elm)->field.le_prev = LIST_NEXT((elm), fieldc);       \
        } while (0)
```

要从链表中删除`elm`，那么就先把`elm`的下一个元素的`prev`指针设置为`elm`的前一个元素的`next`，再将`elm`的上一个`preelm`的`next`指向后一个`elm`。删除这个元素只需知道其自身。

### 内存分配和释放

在exercise2.2需要补全`mips_detect_memory()`函数，这是我们init的第一步。这里需要让操作系统知道可用的物理内存的大小和范围，也就是对提示的四个全局变量进行设置。根据输出判断extra为0，gxemul模拟内核运行环境的时候并没有模拟插外置存储的情况。

之后在`mips_vm_init()`中完成了对操作系统内核所必须的数据结构 – 页目录（pgdir）、内存控制块数组（pages）和进程控制块数组（envs）所需的物理内存的分配，这一部分会在最后的启动流程中再梳理一遍。在完成对这几个关键部分的内存分配之后，剩余的内存就可以加入到空闲链表中，这一步需要用到`page_init()`函数，也就是exercise2.3的实验内容。

在`page_init()`函数的注释突然出现了一个全局变量——`freemem`，那么它是啥呢？它的类型是物理地址、虚拟地址还是内核虚拟地址？C语言中long的全局变量初值为0，在`mips_vm_init()`中调用了`alloc`函数，就涉及对`freemem`的赋值，这里用到了`extern`指向的`end[]`数组来赋初值，但我没有在文件中找到最开始的定义……奇了怪了；而从这里用到的`PADDR(kva)`宏也可以得出`freemem`是内核虚拟地址的结论，这一点在我们后续的操作中十分重要。

总之由于内存的分配是连续的，所以`freemem`之前指向的就是已经分配完毕的页，应该要将其`pp_ref`置1，之后则是未分配的，将其`pp_ref`置0并加入到空闲页的链表中，由此就可以进行以页为单位的物理内存分配与释放。

在exercise2.4里，`page_alloc`函数用来从空闲链表中分配一页物理内存，而`page_free`函数则用于将一页之前分配的内存重新加入到空闲链表中。

## 虚拟内存管理

### 地址转换

- 内核虚拟地址：0x80010000，kseg0
- PADDR(kva)：虚拟地址到物理地址的转换
- KADDR(pa)：物理地址到虚拟地址的转换
- PDX(va)：获得一个虚拟地址对应的页目录索引
- PTX(va)：获得这个虚存地址对应的页表索引

### 页目录自映射

- 进程的页表位置：UVPT(0x7fc00000) 到 ULIM(0x80000000) 之间的空间，4MB

### 创建页表

在exercise2.5，需要对`mm/pmap.c`中的`boot_pgdir_walk`和`pgdir_walk`函数进行填充，其中`boot_pgdir_walk`是在内核刚启动的时候运行，通过`alloc`直接以字节为单位分配物理内存；后者在空闲页面链表初始化之后运行，使用`page_alloc`以页为单位分配物理内存。

首先来看看`boot_pgdir_walk`：

```c
/* Overview:
 	Get the page table entry for virtual address `va` in the given
 	page directory `pgdir`.
	If the page table is not exist and the parameter `create` is set to 1,
	then create it.*/
static Pte *boot_pgdir_walk(Pde *pgdir, u_long va, int create)
{

    Pde *pgdir_entryp;
    Pte *pgtable, *pgtable_entry;

    /* Step 1: Get the corresponding page directory entry and page table. */
    /* Hint: Use KADDR and PTE_ADDR to get the page table from page directory
     * entry value. */
    pgdir_entryp = pgdir + PDX(va);
    // 通过 PDX(va) 来获得一个虚拟地址对应的页目录索引
    // 凭借索引在页目录中得到对应的二级页表的基址(物理地址)

    if ((*pgdir_entryp) && PTE_V)		// 检测地址是否有效
    {
        pgtable = (Pte *)KADDR(PTE_ADDR(*pgdir_entryp));
        // 把这个物理地址转化为内核虚拟地址(KADDR)
    }

    /* Step 2: If the corresponding page table is not exist and parameter `create`
     * is set, create one. And set the correct permission bits for this new page
     * table. */
    // 如果虚拟地址所对应的二级页表不存在
    else if (create == 1)
    // 为这个虚拟地址创建一个新的页表
    {
        pgtable = (Pte *)alloc(BY2PG, BY2PG, 1);
        // 申请一页物理内存来存放这个页表
        // 将它的物理地址赋值给对应的页目录项
        
        *pgdir_entryp = PADDR(pgtable) | PTE_V;
        // 设置好页目录项的权限位
    }

    /* Step 3: Get the page table entry for `va`, and return it. */
    pgtable_entry = &pgtable[PTX(va)];
    // 通过 PTX(va) 获得这个虚存地址对应的页表索引
    
    return pgtable_entry;
    // 从页表中得到对应的页面的物理地址
}
```

返回值是`Pte`，输入值则包括`Pde`的指针，这两者的定义在`include/mmu.h`中可以找到：

```c
typedef u_long Pde;
typedef u_long Pte;
```

两者都是`unsigned long`类型，长度为32位，而虚拟地址的长度也是32位，方便转换。

这里理解还不够深入，援引学长的解释：

> 下面说明一下`Pde*`的理解（`Pde*`和`Pte*`是一样的）
>
> ```c
> Pde *pgdir_entryp;
> ```
>
> 在`include/mmu.h`中定义了
>
> ```c
> typedef` `u_long Pde;
> ```
>
> `Pde`的类型就是`unsigned long`，占4B。它的指针是要寻找虚拟空间，大小也是一个页表项，4B。`Pde`和`Pde*`都是4B，使它们的转换非常方便。指针实际上一块以它为地址的内存单元。所以`Pde`的指针(`Pde*`)所指的地址就是虚拟地址，而这块地址的内容(`Pde`)是物理地址，所以实现了虚拟地址和物理地址的映射关系。

而`pgdir_walk`函数也与之类似，区别在于创建时的处理：

```c
else if (create == 1)
    {
        if (page_alloc(&ppage) == -E_NO_MEM) // out of memory.
        {
            return -E_NO_MEM;
        }
    	// 已经申请好了页，传入的指针已经改变
        pgtable = page2kva(ppage);
        *pgdir_entryp = PADDR(pgtable) | PTE_R | PTE_V;
    	// PTE_R：脏位
	    ppage->pp_ref++;
    	// 这个设置ref的操作不要忘了……
    }
```

### 地址映射

将相应的物理页面地址填入对应虚拟地址的页表项，填充`mm/pmap.c`中的`boot_map_segment`函数。

在exercise2.6，将\[va, va+size)的虚拟地址映射到物理地址\[pa,pa+size)中，根据perm对这个地址标记位更新，实现了在虚拟地址所对应的二级页表里存放（物理页框的）物理地址。

通过for循环实现，函数内还给了临时变量。

```c
    /* Step 2: Map virtual address space to physical address. */
    /* Hint: Use `boot_pgdir_walk` to get the page table 
     * entry of virtual address `va`. */
    for (i = 0; i < (size / BY2PG); i++)
    // 这里回头记得修改，感觉Pb说的很有道理……
    {
        va_temp = va + i * BY2PG;	
        // 突然发现这里可以用更好的方式……
        pgtable_entry = boot_pgdir_walk(pgdir, va_temp, 1);
        // 返回页表项的虚拟地址
        *pgtable_entry = (pa + i * BY2PG) | perm | PTE_V;
        // 指向物理地址，设置标记位
    }
```

这个函数完成了对于\[va,va+size)这一片虚拟地址的页表的设置，把对应的物理地址存入了对应的页表中。

### page insert and page remove

在exercise2.7，需要填充`page_insert`函数，该函数将va虚拟地址和其要对应的物理页pp的映射关系以perm的权限设置加入页目录。

```c
int page_insert(Pde *pgdir, struct Page *pp, u_long va, u_int perm);
```

然后就是复习汇编知识……想到我的78分祭祖理论课瑟瑟发抖……从MIPS手册中查找tlbp和tlbwi指令。

> Format: TLBP MIPS32
> Purpose: To find a matching entry in the TLB.
>
> Format: TLBWI MIPS32
> Purpose: To write a TLB entry indexed by the Index register.

### 最后的最后

啊，真的好多……

写到这里脑子确实清楚了一些，明天写Extra吧。

加油！奥里给！

:::note
这是一篇从Hexo迁移的文章，创建于2020-03-30 01:46:36
:::
