---
title: Go 常见数据结构
created_at: 2025-04-11
is_public: true
---

## 堆

堆顶的元素位于 Index 为 0 的位置。

```go
package main

import (
	"container/heap"
	"fmt"
)

func main() {
	var n int
	fmt.Scan(&n)

	h := &IntHeap{}
	heap.Init(h)

	for range n {
		var num int
		fmt.Scan(&num)
		heap.Push(h, num)
	}

	for h.Len() > 0 {
		num := heap.Pop(h).(int)
		fmt.Printf("Num is: %d\n", num)
	}
}

type IntHeap []int

func (h IntHeap) Len() int           { return len(h) }
func (h IntHeap) Less(i, j int) bool { return h[i] > h[j] }
func (h IntHeap) Swap(i, j int)      { h[i], h[j] = h[j], h[i] }

func (h *IntHeap) Push(x any) {
	*h = append(*h, x.(int))
}

func (h *IntHeap) Pop() any {
    x := (*h)[len(*h)-1]
    *h = (*h)[:len(*h)-1]
    return x
}

```

## 排序

```go
package main

import (
	"fmt"
	"sort"
)

func main() {
	meetings := [][]int{}
	meetings = append(meetings, {1,2})
	meetings = append(meetings, {3,4})
	meetings = append(meetings, {2,3})

	sort.Slice(meetings, func (i, j int) bool {
		return meetings[i][0] < meetings[i][1]
	})
	for _, meeting := range meetings {
		fmt.Printf("[%d %d]", meeting[0], meeting[1])
	}
}
```

## 快速排序

```go
package main

import (
    "fmt"
    "math/rand"
)

func main() {
    array := []int{67, 45, 81, 2, 47, 21, 12}
    fmt.Println("Before:", array)

    array = quickSort(array)
    fmt.Println("After:", array)
}

func quickSort(arr []int) []int {
    if len(arr) <= 1 {
        return arr
    }
    left, right := 0, len(arr)-1
    p := rand.Intn(len(arr))
    arr[p], arr[right] = arr[right], arr[p]
    for i := range arr {
        if arr[i] < arr[right] {
            arr[left], arr[i] = arr[i], arr[left]
            left++
        }
    }
    arr[left], arr[right] = arr[right], arr[left]

    quickSort(arr[:left])
    quickSort(arr[left+1:])
    return arr
}
```
