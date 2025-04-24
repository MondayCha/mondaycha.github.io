import { Heart, Users, Calendar, Star, Zap, Coffee, Code } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export default function ContentCreatorQuadrant() {
  return (
    <div className="mb-32">
      <div className="text-center mb-12">
        <Badge className="bg-purple-100 text-purple-800 hover:bg-purple-200 mb-4">
          内容创作
        </Badge>
        <h3 className="text-3xl font-bold mb-4 text-purple-800">
          数码博主@码呆茶
        </h3>
        <div className="w-16 h-1 bg-purple-500 mx-auto mb-6"></div>
        <p className="text-xl text-gray-700 italic max-w-2xl mx-auto">
          很多幸运的巧合之下
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2 bg-purple-50 rounded-2xl overflow-hidden shadow-md">
          <div className="grid grid-cols-2">
            <div className="aspect-square  flex items-center justify-center">
              <img
                width={700}
                height={700}
                alt=""
                className="h-full object-cover inset-0 bg-gradient-to-tr from-blue-500/20 to-transparent"
              />
            </div>
            <div className="p-8 flex flex-col justify-center">
              <h4 className="font-bold text-xl mb-4">作品背后的故事</h4>
              <p className="text-gray-700 mb-4">
                我的创作内容以文字为主，在自媒体时代是逐渐被淘汰的形式。
                每篇内容的创建周期在一周左右，我会先写一个大纲，再拍摄图片，最后细化文案。
              </p>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-6">
          <div className="bg-purple-50 rounded-xl p-6 shadow-sm flex-1">
            <Coffee className="h-6 w-6 text-purple-500 mb-3" />
            <h4 className="font-bold text-lg mb-2">爆款内容公式</h4>
            <p className="text-gray-700">
              硬核拆解(30%) + 冷笑话(70%) =
              我的个人风格。在数码领域，专业与幽默的结合往往能打破次元壁。
            </p>
          </div>
          <div className="bg-purple-50 rounded-xl p-6 shadow-sm flex-1">
            <Code className="h-6 w-6 text-purple-500 mb-3" />
            <h4 className="font-bold text-lg mb-2">创作形式的变迁</h4>
            <p className="text-gray-700">
              目前视频还是更加能够吸引用户的形式，但考虑到我的时间成本，
              我没有跟上这个趋势。
            </p>
          </div>
        </div>
      </div>

      <div className="mt-8 grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl p-6 shadow-sm border border-purple-100 flex items-center">
          <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mr-4">
            <Users className="h-6 w-6 text-purple-800" />
          </div>
          <div>
            <p className="text-sm text-gray-500">知乎粉丝数量</p>
            <p className="text-2xl font-bold text-purple-800">1.9万</p>
          </div>
        </div>
        <div className="bg-white rounded-xl p-6 shadow-sm border border-purple-100 flex items-center">
          <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mr-4">
            <Calendar className="h-6 w-6 text-purple-800" />
          </div>
          <div>
            <p className="text-sm text-gray-500">创作时长</p>
            <p className="text-2xl font-bold text-purple-800">6年</p>
          </div>
        </div>
        <div className="bg-white rounded-xl p-6 shadow-sm border border-purple-100 flex items-center">
          <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mr-4">
            <Star className="h-6 w-6 text-purple-800" />
          </div>
          <div>
            <p className="text-sm text-gray-500">阅读量</p>
            <p className="text-2xl font-bold text-purple-800">641w+</p>
          </div>
        </div>
        <div className="bg-white rounded-xl p-6 shadow-sm border border-purple-100 flex items-center">
          <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mr-4">
            <Zap className="h-6 w-6 text-purple-800" />
          </div>
          <div>
            <p className="text-sm text-gray-500">商业合作</p>
            <p className="text-2xl font-bold text-purple-800">
              Surface、Apple 等
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
