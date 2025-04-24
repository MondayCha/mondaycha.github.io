import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  ChevronRight,
  Server,
  Database,
  CpuIcon,
  Cpu,
  BrainCircuit,
  GitBranch,
  Lock,
  BarChart,
} from "lucide-react";

export default function LabSection() {
  return (
    <section className="py-24 bg-gradient-to-b from-slate-900 to-indigo-900 text-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <Badge className="bg-indigo-200 text-indigo-800 hover:bg-indigo-300 mb-4">
            学术研究
          </Badge>
          <h2 className="text-4xl font-bold mb-4 text-white">
            <span className="text-indigo-300">⚡ RAIDS实验室</span>
            ：我的学术成长
          </h2>
          <p className="text-gray-300 max-w-2xl mx-auto">
            从初入实验室到负责核心项目，这是一段从理论到实践、从学习到创新的旅程。
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16 items-center">
          <div className="order-2 md:order-1">
            <div className="bg-gradient-to-br from-indigo-800/50 to-purple-800/50 rounded-2xl p-8 backdrop-blur-sm border border-indigo-700/50 shadow-xl">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <Badge className="bg-indigo-600 hover:bg-indigo-700 text-white mb-2">
                    我的研究内容
                  </Badge>
                  <h3 className="text-2xl font-bold">机器学习系统相关</h3>
                </div>
                <Cpu className="h-10 w-10 text-indigo-300" />
              </div>

              <p className="text-gray-300 mb-6">
                专注于基于Kubernetes的机器学习平台研发，如：
                多租户资源调度策略、异构GPU集群管理、深度学习训练加速等。
                目前负责实验室云原生机器学习平台的核心开发工作。
              </p>

              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-indigo-800/50 rounded-lg p-4 border border-indigo-700/50">
                  <BrainCircuit className="h-6 w-6 text-indigo-300 mb-2" />
                  <h4 className="font-semibold mb-1">平台架构设计</h4>
                  <p className="text-sm text-gray-300">
                    设计微服务架构，实现前后端分离
                  </p>
                </div>
                <div className="bg-indigo-800/50 rounded-lg p-4 border border-indigo-700/50">
                  <GitBranch className="h-6 w-6 text-indigo-300 mb-2" />
                  <h4 className="font-semibold mb-1">资源调度优化</h4>
                  <p className="text-sm text-gray-300">
                    开发两级配额管理和资源回收机制
                  </p>
                </div>
              </div>

              <div className="space-y-2 mb-6">
                <div className="flex items-center justify-between">
                  <span>管理GPU规模</span>
                  <span className="font-medium">220+</span>
                </div>
                <div className="w-full bg-indigo-900/50 h-2 rounded-full overflow-hidden">
                  <div
                    className="bg-indigo-400 h-full rounded-full"
                    style={{ width: "80%" }}
                  ></div>
                </div>

                <div className="flex items-center justify-between">
                  <span>服务用户数</span>
                  <span className="font-medium">200+</span>
                </div>
                <div className="w-full bg-indigo-900/50 h-2 rounded-full overflow-hidden">
                  <div
                    className="bg-indigo-400 h-full rounded-full"
                    style={{ width: "40%" }}
                  ></div>
                </div>

                <div className="flex items-center justify-between">
                  <span>稳定运行时间</span>
                  <span className="font-medium">4个月</span>
                </div>
                <div className="w-full bg-indigo-900/50 h-2 rounded-full overflow-hidden">
                  <div
                    className="bg-indigo-400 h-full rounded-full"
                    style={{ width: "60%" }}
                  ></div>
                </div>
              </div>

              <Button className="bg-indigo-600 hover:bg-indigo-700 text-white w-full">
                查看项目详情
                <ChevronRight className="ml-1 h-4 w-4" />
              </Button>
            </div>
          </div>

          <div className="order-1 md:order-2">
            <h3 className="text-2xl font-bold mb-6 text-indigo-300">
              实验室介绍
            </h3>
            <p className="text-gray-300 mb-6">
              北航RAIDS实验室（Reliable, Automated and Intelligent Distributed
              Systems Lab）专注于大规模分布式智能计算系统（Systems for AI 和 AI
              for Systems）的研究。
            </p>

            <div className="space-y-4 mb-8">
              <div className="flex items-start">
                <div className="w-10 h-10 rounded-full bg-indigo-800 flex items-center justify-center flex-shrink-0 mt-1">
                  <Server className="h-5 w-5 text-indigo-300" />
                </div>
                <div className="ml-4">
                  <h4 className="font-bold text-lg">一流的研究设施</h4>
                  <p className="text-gray-300">
                    实验室拥有多台多卡服务器，如NVIDIA A100、V100等高性能
                    GPU，为大规模实验提供坚实硬件基础。
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="w-10 h-10 rounded-full bg-indigo-800 flex items-center justify-center flex-shrink-0 mt-1">
                  <Database className="h-5 w-5 text-indigo-300" />
                </div>
                <div className="ml-4">
                  <h4 className="font-bold text-lg">产学研合作</h4>
                  <p className="text-gray-300">
                    与华为、阿里云、快手、字节跳动等企业保持紧密合作，共同推进前沿技术的落地应用。
                  </p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div className="aspect-square bg-indigo-800/50 rounded-lg flex items-center justify-center border border-indigo-700/50 relative overflow-hidden group">
                <span className="text-gray-300 group-hover:opacity-0 transition-opacity">
                  实验室合影
                </span>
                <div className="absolute inset-0 bg-indigo-600/80 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <span className="text-white font-medium text-sm">
                    2023年学术年会
                  </span>
                </div>
              </div>
              <div className="aspect-square bg-indigo-800/50 rounded-lg flex items-center justify-center border border-indigo-700/50 relative overflow-hidden group">
                <span className="text-gray-300 group-hover:opacity-0 transition-opacity">
                  设备展示
                </span>
                <div className="absolute inset-0 bg-indigo-600/80 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <span className="text-white font-medium text-sm">
                    GPU集群架构
                  </span>
                </div>
              </div>
              <div className="aspect-square bg-indigo-800/50 rounded-lg flex items-center justify-center border border-indigo-700/50 relative overflow-hidden group">
                <span className="text-gray-300 group-hover:opacity-0 transition-opacity">
                  研讨会现场
                </span>
                <div className="absolute inset-0 bg-indigo-600/80 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <span className="text-white font-medium text-sm">
                    技术交流会
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* <div className="bg-gradient-to-r from-indigo-800/30 to-purple-800/30 rounded-2xl p-8 backdrop-blur-sm border border-indigo-700/50">
          <h3 className="text-2xl font-bold mb-6 text-center text-white">
            主要研究项目
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="bg-gradient-to-br from-blue-900 to-blue-800 border-0 text-white">
              <CardContent className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <h4 className="text-xl font-bold">ElasticFlow</h4>
                  <BarChart className="h-6 w-6 text-blue-300" />
                </div>
                <p className="text-gray-300 mb-4">
                  一种针对多GPU集群的资源调度框架，自动优化多任务训练场景下的资源分配。
                </p>
                <div className="space-y-2">
                  <div className="flex items-center text-sm text-gray-300">
                    <span className="w-3 h-3 bg-blue-400 rounded-full mr-2"></span>
                    <span>吞吐量提升34%</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-300">
                    <span className="w-3 h-3 bg-blue-400 rounded-full mr-2"></span>
                    <span>SLO满足率提升28%</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-purple-900 to-purple-800 border-0 text-white">
              <CardContent className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <h4 className="text-xl font-bold">DeepSpeed+</h4>
                  <Cpu className="h-6 w-6 text-purple-300" />
                </div>
                <p className="text-gray-300 mb-4">
                  在微软DeepSpeed基础上的优化版本，针对异构设备场景下的大模型训练进行了性能优化。
                </p>
                <div className="space-y-2">
                  <div className="flex items-center text-sm text-gray-300">
                    <span className="w-3 h-3 bg-purple-400 rounded-full mr-2"></span>
                    <span>内存效率提升42%</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-300">
                    <span className="w-3 h-3 bg-purple-400 rounded-full mr-2"></span>
                    <span>训练速度提升19%</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-indigo-900 to-indigo-800 border-0 text-white">
              <CardContent className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <h4 className="text-xl font-bold">AutoScaler</h4>
                  <BrainCircuit className="h-6 w-6 text-indigo-300" />
                </div>
                <p className="text-gray-300 mb-4">
                  基于强化学习的自动扩缩容系统，实现分布式训练任务的弹性扩展与资源最优分配。
                </p>
                <div className="space-y-2">
                  <div className="flex items-center text-sm text-gray-300">
                    <span className="w-3 h-3 bg-indigo-400 rounded-full mr-2"></span>
                    <span>资源利用率提升51%</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-300">
                    <span className="w-3 h-3 bg-indigo-400 rounded-full mr-2"></span>
                    <span>训练成本降低37%</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div> */}
      </div>
    </section>
  );
}
