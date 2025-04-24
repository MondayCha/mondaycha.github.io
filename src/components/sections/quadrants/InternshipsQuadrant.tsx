import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function InternshipsQuadrant() {
  return (
    <div>
      <div className="text-center mb-16">
        <Badge className="bg-emerald-100 text-emerald-800 hover:bg-emerald-200 mb-4">
          职场历练
        </Badge>
        <h3 className="text-3xl font-bold mb-4 text-emerald-800">
          实习版图：从大厂到创业公司
        </h3>
        <div className="w-16 h-1 bg-emerald-500 mx-auto mb-6"></div>
        <p className="text-xl text-gray-700 italic max-w-2xl mx-auto">
          每一段实习经历都是一次成长，每一家公司都教会了我不同的技能。
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* ByteDance Card */}
        <Card className="overflow-hidden hover:shadow-lg transition-shadow">
          <div className="h-32 bg-gradient-to-r from-teal-400 to-emerald-500 flex items-center justify-center">
            <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center">
              <span className="font-bold text-emerald-500">字节</span>
            </div>
          </div>
          <CardContent className="pt-6">
            <h4 className="font-bold text-xl mb-2">字节跳动</h4>
            <p className="text-gray-500 mb-4">iOS开发实习生</p>
            <div className="h-px bg-gray-200 my-4"></div>
            <h5 className="font-medium text-lg mb-2">收获</h5>
            <p className="text-gray-700">
              参与抖音客户端多个核心功能开发，理解了亿级用户产品的开发流程和质量标准，掌握了Objective-C和iOS开发基础。
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              <Badge variant="outline" className="bg-gray-50">
                iOS开发
              </Badge>
              <Badge variant="outline" className="bg-gray-50">
                大型产品
              </Badge>
              <Badge variant="outline" className="bg-gray-50">
                质量意识
              </Badge>
            </div>
          </CardContent>
        </Card>

        {/* SenseTime Card */}
        <Card className="overflow-hidden hover:shadow-lg transition-shadow">
          <div className="h-32 bg-gradient-to-r from-blue-400 to-indigo-500 flex items-center justify-center">
            <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center">
              <span className="font-bold text-indigo-500">商汤</span>
            </div>
          </div>
          <CardContent className="pt-6">
            <h4 className="font-bold text-xl mb-2">商汤科技</h4>
            <p className="text-gray-500 mb-4">AI图像编解码实习生</p>
            <div className="h-px bg-gray-200 my-4"></div>
            <h5 className="font-medium text-lg mb-2">收获</h5>
            <p className="text-gray-700">
              独立开发AI图像编解码产品前后端，探索WebAssembly端侧推理优化，在算法团队中培养了全栈能力和工程化思维。
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              <Badge variant="outline" className="bg-gray-50">
                全栈开发
              </Badge>
              <Badge variant="outline" className="bg-gray-50">
                WebAssembly
              </Badge>
              <Badge variant="outline" className="bg-gray-50">
                AI工程化
              </Badge>
            </div>
          </CardContent>
        </Card>

        {/* InterpreTown Card */}
        <Card className="overflow-hidden hover:shadow-lg transition-shadow">
          <div className="h-32 bg-gradient-to-r from-purple-400 to-pink-500 flex items-center justify-center">
            <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center">
              <span className="font-bold text-pink-500">IT</span>
            </div>
          </div>
          <CardContent className="pt-6">
            <h4 className="font-bold text-xl mb-2">InterpreTown</h4>
            <p className="text-gray-500 mb-4">DevOps实习生</p>
            <div className="h-px bg-gray-200 my-4"></div>
            <h5 className="font-medium text-lg mb-2">收获</h5>
            <p className="text-gray-700">
              体验创业公司从0到1的过程，优化CI/CD流程和匹配算法，学会了在资源受限环境下做出高效技术决策。
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              <Badge variant="outline" className="bg-gray-50">
                创业公司
              </Badge>
              <Badge variant="outline" className="bg-gray-50">
                DevOps
              </Badge>
              <Badge variant="outline" className="bg-gray-50">
                全栈思维
              </Badge>
            </div>
          </CardContent>
        </Card>

        {/* Xiaohongshu Card */}
        <Card className="overflow-hidden hover:shadow-lg transition-shadow">
          <div className="h-32 bg-gradient-to-r from-red-400 to-rose-500 flex items-center justify-center">
            <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center">
              <span className="font-bold text-rose-500">小红书</span>
            </div>
          </div>
          <CardContent className="pt-6">
            <h4 className="font-bold text-xl mb-2">小红书</h4>
            <p className="text-gray-500 mb-4">云原生后端开发实习生</p>
            <div className="h-px bg-gray-200 my-4"></div>
            <h5 className="font-medium text-lg mb-2">收获</h5>
            <p className="text-gray-700">
              深入参与多集群调度、弹性混部等云原生项目，积累了大规模分布式系统和生产环境优化的宝贵经验。
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              <Badge variant="outline" className="bg-gray-50">
                云原生
              </Badge>
              <Badge variant="outline" className="bg-gray-50">
                Kubernetes
              </Badge>
              <Badge variant="outline" className="bg-gray-50">
                分布式系统
              </Badge>
            </div>
          </CardContent>
        </Card>

        {/* Alibaba Cloud Card */}
        <Card className="overflow-hidden hover:shadow-lg transition-shadow">
          <div className="h-32 bg-gradient-to-r from-orange-400 to-amber-500 flex items-center justify-center">
            <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center">
              <span className="font-bold text-amber-500">阿里云</span>
            </div>
          </div>
          <CardContent className="pt-6">
            <h4 className="font-bold text-xl mb-2">阿里云</h4>
            <p className="text-gray-500 mb-4">研究型实习生</p>
            <div className="h-px bg-gray-200 my-4"></div>
            <h5 className="font-medium text-lg mb-2">收获</h5>
            <p className="text-gray-700">
              参与GPU调度算法研究，将学术研究与工业实践结合，正在准备论文投稿，积累了科研与工程结合的经验。
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              <Badge variant="outline" className="bg-gray-50">
                算法研究
              </Badge>
              <Badge variant="outline" className="bg-gray-50">
                GPU调度
              </Badge>
              <Badge variant="outline" className="bg-gray-50">
                学术论文
              </Badge>
            </div>
          </CardContent>
        </Card>

        {/* Next Opportunity Card */}
        <Card className="overflow-hidden hover:shadow-lg transition-shadow border-dashed border-2 border-gray-300 bg-gray-50">
          <div className="h-32 bg-gradient-to-r from-gray-100 to-gray-200 flex items-center justify-center">
            <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center border-2 border-dashed border-gray-300">
              <span className="font-bold text-gray-400">✨</span>
            </div>
          </div>
          <CardContent className="pt-6">
            <h4 className="font-bold text-xl mb-2 text-gray-500">
              许愿好 Offer
            </h4>
            <p className="text-gray-500 mb-4">期待下一段旅程</p>
            <div className="h-px bg-gray-200 my-4"></div>
            <h5 className="font-medium text-lg mb-2 text-gray-500">我能带来</h5>
            <p className="text-gray-600">
              跨领域的实践经验、扎实的工程能力、持续的学习热情，以及对技术的深度思考。
            </p>
            <div className="mt-4">
              <Button variant="outline" className="w-full">
                联系我
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
