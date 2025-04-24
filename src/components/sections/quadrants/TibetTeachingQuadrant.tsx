import { Clock, BookOpen, Heart } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export default function TibetTeachingQuadrant() {
  return (
    <div className="mb-32">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        <div className="order-2 md:order-1">
          <div className="relative">
            <div className="aspect-[4/3] bg-gray-200 rounded-2xl overflow-hidden shadow-lg">
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-gray-600">支教学校全景</span>
              </div>
            </div>
            <div className="absolute -bottom-6 -right-6 aspect-square w-48 bg-gray-200 rounded-xl overflow-hidden shadow-lg">
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-gray-600">学生作品截图</span>
              </div>
            </div>
          </div>
        </div>
        <div className="order-1 md:order-2">
          <Badge className="bg-amber-100 text-amber-800 hover:bg-amber-200 mb-4">
            支教经历
          </Badge>
          <h3 className="text-3xl font-bold mb-6 text-amber-800">
            西藏支教：按下暂停键的一年
          </h3>
          <div className="w-16 h-1 bg-amber-500 mb-8"></div>

          <div className="bg-amber-50 border-l-4 border-amber-500 pl-6 py-4 mb-8">
            <p className="text-xl italic text-gray-700">
              "在海拔 3500 米的教室里，学生告诉我：
              <br />
              '我的梦想是在拉萨开一家改装车店'"
            </p>
          </div>

          <div className="space-y-6">
            <div className="flex items-start">
              <div className="w-10 h-10 bg-amber-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                <Clock className="h-5 w-5 text-amber-800" />
              </div>
              <div className="ml-4">
                <h4 className="font-bold text-lg mb-1">每日日程</h4>
                <p className="text-gray-700">
                  上午教数学，晚上自学 CMU
                  15445、MIT6.S081。找到了专注学习的最佳状态。
                </p>
              </div>
            </div>

            <div className="flex items-start">
              <div className="w-10 h-10 bg-amber-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                <BookOpen className="h-5 w-5 text-amber-800" />
              </div>
              <div className="ml-4">
                <h4 className="font-bold text-lg mb-1">教学收获</h4>
                <p className="text-gray-700">
                  如何用最简单的语言解释复杂概念，这成为了我后来做技术分享的核心能力。支教不仅是付出，更是一场自我成长的旅程。
                </p>
              </div>
            </div>

            <div className="flex items-start">
              <div className="w-10 h-10 bg-amber-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                <Heart className="h-5 w-5 text-amber-800" />
              </div>
              <div className="ml-4">
                <h4 className="font-bold text-lg mb-1">心灵成长</h4>
                <p className="text-gray-700">
                  我反而找到了内心的平静。这段经历让我重新思考了科技与人文的关系，以及我想要的生活方式。
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
