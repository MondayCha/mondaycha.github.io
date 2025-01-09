---
title: CV
created_at: 2025-01-09
is_public: true
---

## 修改意见

1. 没有必要为了一页而一页，重点写一下实习内容
1. 开源经历可以细到具体的 PR
1. 详略不够得当，公开课可以单独放

## 附件

```typst


#show heading: set text(
  font: ("Linux Biolinum", "Noto Serif SC"),
  fill: rgb(0, 91, 172),
  lang: "zh",
)

#show link: underline

#show emph: set text(
  fill: rgb(0, 91, 172),
  // 加粗
  weight: "bold",
)

#set par(
  justify: true,
  leading: 0.7em,
)

// Uncomment the following lines to adjust the size of text
// The recommend resume text size is from `10pt` to `12pt`
#set text(
  size: 11pt,
  font: (
    "Linux Biolinum","Noto Serif SC",
  )
)

// Feel free to change the margin below to best fit your own CV
#set page(
  margin: (x: 0.9cm, y: 1.6cm),
)

// For more customizable options, please refer to official reference: https://typst.app/docs/reference/
#let chiline() = {
  v(-2pt);
  line(length: 100%, stroke: rgb(0, 91, 172));
  v(-5pt)
}

// a function make text gray
#let gray(body) = {
  set text(fill: rgb(128, 128, 128));
  body;
}


= 李亦龙

电话: 13718250032 |
邮箱: #link("mailto:mondaycha@outlook.com") |
#link("https://github.com/mondaycha")[Github]

== 教育经历
#chiline()

#emph("北京航空航天大学") #h(1fr) 2023.09 -- 2026.01 (预期) \
#gray[计算机科学与技术 · 硕士生] #h(1fr) #gray[排名 53/308 (前20%)] \

#emph("北京航空航天大学") #h(1fr) 2018.09 -- 2022.06 \
#gray[计算机科学与技术 · 学士]   #h(1fr) #gray[GPA 3.71/4 (前40%)] \

== 项目经历
#chiline()

#emph("异构云资源混合调度与智能运维平台") #h(1fr) 2023.07 -- 2026.06 \
#gray[北航 RAIDS Lab · 项目开发负责人 (12 人团队)] #h(1fr) #gray[Scheduler Plugins, Client-go, Gin, React]\
基于Kubernetes搭建机器学习平台 (即将开源), 从 Slurm 系统平滑迁移, 已上线 1 个月
- 从零设计平台整体架构: 支持作业调度与可观测、深度学习镜像制备、模型和数据集管理等功能
- 负责异构百卡集群运维与答疑: 接入可观测、网关、数据库、存储等组件, 支持实验室 150+ 同学的科研工作
- 参与调度算法设计: 通过多优先级队列、作业画像与预测、GPU共享等方式, 可提升GPU利用率约10%

== 实习经历
#chiline()

#emph("小红书") #h(1fr) 2024.04 -- 2025.1 \
#gray[云原生平台 · 调度与效能组 · 后端开发实习生] #h(1fr) #gray[Karmada, Virtual-Kubelet, Scheduler Plugins] \
参与小红书#link("https://www.bilibili.com/video/BV13tqBYfE6i")[多集群]、#link("https://xie.infoq.cn/article/a0b714509cad111e080107f97")[弹性混部池]、#link("https://koordinator.sh/")[统一调度器]的运维与功能优化
- 参与#link("https://kccncossaidevchn2024.sched.com/event/1eqP8/leveraging-multi-cluster-architecture-for-resilient-and-elastic-hybrid-cloud-at-xiaohongshu-feng-xiong-mao-hongcai-ren-huawei")[多集群 HPA 功能]开发: 以工作负载粒度, 汇聚并推送单集群 Metrics 至多集群控制面
- 修复混部池有状态服务启动异常问题: 使用#link("https://kubernetes.io/docs/tasks/manage-kubernetes-objects/update-api-object-kubectl-patch/")[双路策略合并补丁]，优化VK对 ReadinessGates 的同步策略
- 参与统一调度器的迁移重构工作: 通过 Kind 和 Kwok 模拟大规模多集群场景，验证调度器正确性与性能

#link("https://www.interpretown.com/")[#emph("InterpreTown")] #h(1fr) 2023.10 -- 2024.04 \
#gray[在线翻译 · 初创公司 (种子轮) · DevOps实习生] #h(1fr) #gray[React, Express.js, MongoDB, Github Action] \


#emph("商汤科技") #h(1fr) 2021.10 -- 2022.09 \
#gray[研究院 · ISP & Codec团队 · AI图像编解码实习生] #h(1fr) #gray[ONNX, WebAssembly, Flask, React] \

#emph("字节跳动") #h(1fr) 2021.02 -- 2021.06 \
#gray[抖音 · 用户增长 (User Growth) 团队 · iOS客户端实习生] #h(1fr) #gray[Objective-C] \

== 社会工作
#chiline()

#emph("山南市职业技术学校") #h(1fr) 2022.08 -- 2023.07 \
#gray[西部计划 · 北航第24届研究生支教团 · 山南分队队员] #h(1fr) #gray[中国 · 西藏]\
负责高二学年3个班级100名学生的数学课程教学, 联合发起“#link("https://xibu.youth.cn/gzdt/gddt/202209/t20220916_14002967.htm")[心系雅砻，科创未来]”志愿项目
- 为解决学生中文输入不准确问题, 基于 N-Gram 算法开发#link("https://github.com/MondayCha/sentence-matching-toolkit")[文本相似度匹配软件], 缩短90%周统计时间
- 自学课程: #link("https://www.zhihu.com/column/c_1618291703873589248")[CMU 15-445] 数据库系统, #link("https://www.zhihu.com/column/c_1644145847276462080")[MIT 6.5840] 分布式系统 (Map Reduce & Raft), #link("https://www.zhihu.com/column/c_1618291703873589248")[相关博客]点赞500+

== 专业技能
#chiline()

*编程语言: *熟悉 Go, 了解 C/C++,  Rust, TypeScript, 可使用 Python, Ruby, Java 等\
*框架工具: * vLLM, KServe, Volcano, Kueue, Grafana, Promtheus, Helm, Bash, Vim, Git, Copilot 等 \
*外语: * 英语 (CET-6)\

== 其他
#chiline()
*开源参与: *向 #link("https://github.com/volcano-sh/devices/commits/release-1.1?author=mondaycha")[Volcano]、#link("https://github.com/kubernetes-sigs/kwok/commits/main?author=mondaycha")[Kwok]、#link("https://github.com/ceph/ceph-csi/commits/devel?author=mondaycha")[Ceph-CSI] 等项目合入 PR, Github 个人项目获得 140+ Star \
*自我评价: *热爱编程,  注重代码规范, 有一定的工程经验和团队协作经验; 乐于分享, #link("https://www.zhihu.com/people/Dlee-01")[知乎]获关注数19k+
```
