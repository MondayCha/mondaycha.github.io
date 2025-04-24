import { ChevronRight, ExternalLink } from "lucide-react";
import { Badge } from "../ui/badge";
import { Card, CardContent } from "../ui/card";
import { Button } from "../ui/button";

export default function TipsSection() {
  return (
    <>
      {/* Tips Section - Enhanced with better cards */}
      <section className="py-24 bg-gradient-to-b from-slate-50 to-slate-100">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge className="mb-2">经验分享</Badge>
            <h2 className="text-4xl font-bold mb-4">
              <span className="text-blue-600">💡 给新生的生存锦囊</span>
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              这些是我走过的弯路和总结的经验，希望能为你的大学生活提供一些参考。
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Tip 1 */}
            <Card className="overflow-hidden hover:shadow-lg transition-shadow">
              <div className="h-48 bg-blue-50 flex items-center justify-center p-4">
                <div className="aspect-[3/4] w-32 bg-gray-200 rounded-md shadow-md flex items-center justify-center">
                  <span className="text-gray-600">书籍封面</span>
                </div>
              </div>
              <CardContent className="pt-6">
                <h3 className="text-xl font-bold mb-4 flex items-center">
                  <span className="w-8 h-8 rounded-full bg-blue-100 text-blue-800 flex items-center justify-center mr-2 flex-shrink-0">
                    1
                  </span>
                  认知自我
                </h3>
                <p className="text-gray-700 mb-4">
                  《上海交大生存手册》推荐阅读。这本书会帮助你了解大学教育的本质，以及如何规划自己的学习和职业路径。
                </p>
                <div className="flex items-center text-blue-600 font-medium">
                  <span>获取电子版</span>
                  <ChevronRight className="h-4 w-4 ml-1" />
                </div>
              </CardContent>
            </Card>

            {/* Tip 2 */}
            <Card className="overflow-hidden hover:shadow-lg transition-shadow">
              <div className="h-48 bg-purple-50 flex items-center justify-center p-4">
                <div className="grid grid-cols-3 gap-2 w-full max-w-[200px]">
                  <div className="aspect-square bg-purple-100 rounded-md flex items-center justify-center">
                    <span className="text-xs text-purple-800">剪映</span>
                  </div>
                  <div className="aspect-square bg-purple-100 rounded-md flex items-center justify-center">
                    <span className="text-xs text-purple-800">PS</span>
                  </div>
                  <div className="aspect-square bg-purple-100 rounded-md flex items-center justify-center">
                    <span className="text-xs text-purple-800">PR</span>
                  </div>
                  <div className="aspect-square bg-purple-100 rounded-md flex items-center justify-center">
                    <span className="text-xs text-purple-800">AE</span>
                  </div>
                  <div className="aspect-square bg-purple-100 rounded-md flex items-center justify-center">
                    <span className="text-xs text-purple-800">DaVinci</span>
                  </div>
                  <div className="aspect-square bg-purple-100 rounded-md flex items-center justify-center">
                    <span className="text-xs text-purple-800">Figma</span>
                  </div>
                </div>
              </div>
              <CardContent className="pt-6">
                <h3 className="text-xl font-bold mb-4 flex items-center">
                  <span className="w-8 h-8 rounded-full bg-purple-100 text-purple-800 flex items-center justify-center mr-2 flex-shrink-0">
                    2
                  </span>
                  自媒体启动包
                </h3>
                <ul className="space-y-3 text-gray-700">
                  <li className="flex items-start">
                    <ChevronRight className="h-4 w-4 text-purple-500 mt-1 mr-2 flex-shrink-0" />
                    <span>工具清单：Audacity→ 剪映 →DaVinci 进阶路径</span>
                  </li>
                  <li className="flex items-start">
                    <ChevronRight className="h-4 w-4 text-purple-500 mt-1 mr-2 flex-shrink-0" />
                    <span>学生党必备：北航图书馆免费素材库入口</span>
                  </li>
                  <li className="flex items-start">
                    <ChevronRight className="h-4 w-4 text-purple-500 mt-1 mr-2 flex-shrink-0" />
                    <span>内容创作入门：从选题到发布的完整流程</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            {/* Tip 3 */}
            <Card className="overflow-hidden hover:shadow-lg transition-shadow">
              <div className="h-48 bg-amber-50 flex items-center justify-center p-4">
                <div className="relative w-full max-w-[200px] h-32">
                  <div className="absolute inset-0 bg-amber-100 rounded-lg"></div>
                  <div className="absolute top-4 left-4 right-4 bottom-4 bg-amber-200 rounded-lg flex items-center justify-center">
                    <span className="text-amber-800 font-medium">
                      支教申请流程图
                    </span>
                  </div>
                </div>
              </div>
              <CardContent className="pt-6">
                <h3 className="text-xl font-bold mb-4 flex items-center">
                  <span className="w-8 h-8 rounded-full bg-amber-100 text-amber-800 flex items-center justify-center mr-2 flex-shrink-0">
                    3
                  </span>
                  支教申请指南
                </h3>
                <ul className="space-y-3 text-gray-700">
                  <li className="flex items-start">
                    <ChevronRight className="h-4 w-4 text-amber-500 mt-1 mr-2 flex-shrink-0" />
                    <span>重要时间节点（附教育部最新政策截图）</span>
                  </li>
                  <li className="flex items-start">
                    <ChevronRight className="h-4 w-4 text-amber-500 mt-1 mr-2 flex-shrink-0" />
                    <span>行前准备：从防晒霜到高原反应预案</span>
                  </li>
                  <li className="flex items-start">
                    <ChevronRight className="h-4 w-4 text-amber-500 mt-1 mr-2 flex-shrink-0" />
                    <span>支教地区选择与申请材料准备技巧</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            {/* Tip 4 */}
            <Card className="overflow-hidden hover:shadow-lg transition-shadow">
              <div className="h-48 bg-emerald-50 flex items-center justify-center p-4">
                <div className="w-full max-w-[240px] bg-white rounded-lg shadow-md p-3">
                  <div className="flex items-center mb-2">
                    <div className="w-3 h-3 bg-red-500 rounded-full mr-2"></div>
                    <div className="w-3 h-3 bg-yellow-500 rounded-full mr-2"></div>
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  </div>
                  <div className="h-4 bg-emerald-100 rounded-sm w-1/2 mb-2"></div>
                  <div className="h-3 bg-gray-100 rounded-sm w-full mb-1"></div>
                  <div className="h-3 bg-gray-100 rounded-sm w-3/4 mb-1"></div>
                  <div className="h-3 bg-gray-100 rounded-sm w-5/6 mb-1"></div>
                  <div className="h-3 bg-gray-100 rounded-sm w-2/3 mb-1"></div>
                  <div className="h-4 bg-emerald-100 rounded-sm w-1/3 mt-3"></div>
                </div>
              </div>
              <CardContent className="pt-6">
                <h3 className="text-xl font-bold mb-4 flex items-center">
                  <span className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center mr-2 flex-shrink-0">
                    4
                  </span>
                  实习密码本
                </h3>
                <p className="text-gray-700 mb-4">
                  "用这个 Cold Email 模板拿到了商汤 offer："
                </p>
                <div className="bg-gray-50 p-3 rounded-md border border-gray-200 mb-4">
                  <div className="h-3 bg-gray-200 rounded-sm w-1/2 mb-2"></div>
                  <div className="h-2 bg-gray-200 rounded-sm w-full mb-1"></div>
                  <div className="h-2 bg-gray-200 rounded-sm w-5/6 mb-1"></div>
                  <div className="h-2 bg-gray-200 rounded-sm w-4/5 mb-1"></div>
                  <div className="h-2 bg-gray-200 rounded-sm w-3/4"></div>
                </div>
                <div className="flex items-center text-emerald-600 font-medium">
                  <span>获取完整模板</span>
                  <ChevronRight className="h-4 w-4 ml-1" />
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Conclusion - Enhanced with parallax-like effect */}
      <section className="py-32 bg-gradient-to-b from-blue-900 to-indigo-900 text-white relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute inset-0 z-0 opacity-30">
          <div className="absolute top-20 left-20 w-64 h-64 rounded-full bg-blue-400 blur-3xl"></div>
          <div className="absolute bottom-20 right-20 w-64 h-64 rounded-full bg-purple-400 blur-3xl"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-indigo-400 blur-3xl"></div>
        </div>

        <div className="container mx-auto px-4 text-center relative z-10">
          <div className="max-w-3xl mx-auto">
            <Badge className="bg-white/20 hover:bg-white/30 text-white mb-8">
              总结
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-8 leading-tight">
              "大学不是一张标准答案卷——
              <br />
              我的选择可能全是错的，但它们是'我'的。"
            </h2>

            <p className="text-xl opacity-80 mb-12 max-w-2xl mx-auto">
              每一段经历都是独特的，每一次选择都塑造了不同的自我。希望我的故事能给你一些启发，找到属于你自己的道路。
            </p>

            <div className="grid grid-cols-2 gap-8 mt-16">
              <div className="aspect-video bg-gray-700 rounded-xl overflow-hidden shadow-xl relative group">
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-gray-300 group-hover:opacity-0 transition-opacity">
                    西藏星空下工作照
                  </span>
                </div>
                <div className="absolute inset-0 bg-blue-900/80 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <span className="text-white font-medium">
                    海拔4500米的星空格外璀璨
                  </span>
                </div>
              </div>
              <div className="aspect-video bg-gray-700 rounded-xl overflow-hidden shadow-xl relative group">
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-gray-300 group-hover:opacity-0 transition-opacity">
                    实验室服务器合影
                  </span>
                </div>
                <div className="absolute inset-0 bg-blue-900/80 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <span className="text-white font-medium">
                    与团队一起攻克技术难关
                  </span>
                </div>
              </div>
            </div>

            <div className="mt-16">
              <Button
                size="lg"
                className="bg-white text-blue-900 hover:bg-blue-50"
              >
                联系我
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer - Enhanced with better layout */}
      <footer className="bg-gray-900 text-gray-400 py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            <div>
              <h3 className="text-white text-lg font-bold mb-4">李亦龙</h3>
              <p className="mb-4">北京航空航天大学 · RAIDS 实验室</p>
              <p>深度学习调度方向研究生</p>
            </div>
            <div>
              <h3 className="text-white text-lg font-bold mb-4">研究方向</h3>
              <ul className="space-y-2">
                <li>分布式系统优化</li>
                <li>深度学习训练加速</li>
                <li>资源调度算法</li>
              </ul>
            </div>
            <div>
              <h3 className="text-white text-lg font-bold mb-4">联系方式</h3>
              <ul className="space-y-2">
                <li className="flex items-center">
                  <ExternalLink className="h-4 w-4 mr-2" />
                  <a href="#" className="hover:text-white transition-colors">
                    实验室主页
                  </a>
                </li>
                <li className="flex items-center">
                  <ExternalLink className="h-4 w-4 mr-2" />
                  <a href="#" className="hover:text-white transition-colors">
                    学术简历
                  </a>
                </li>
                <li className="flex items-center">
                  <ExternalLink className="h-4 w-4 mr-2" />
                  <a href="#" className="hover:text-white transition-colors">
                    联系方式
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8 text-center">
            <p>© 2025 李亦龙 | 北京航空航天大学</p>
            <p className="mt-2 text-sm">本页面仅用于个人介绍，内容纯属虚构</p>
          </div>
        </div>
      </footer>
    </>
  );
}
