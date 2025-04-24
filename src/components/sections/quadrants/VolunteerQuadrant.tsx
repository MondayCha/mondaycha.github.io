import { ChevronRight, Users, Award } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export default function VolunteerQuadrant() {
  return (
    <div className="mb-32">
      <div className="flex flex-col md:flex-row items-center">
        <div className="md:w-1/3 mb-8 md:mb-0">
          <div className="relative">
            <div className="absolute -top-6 -left-6 w-24 h-24 bg-blue-100 rounded-full z-0"></div>
            <div className="relative z-10">
              <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-200 mb-4">
                志愿服务
              </Badge>
              <h3 className="text-3xl font-bold mb-4 text-blue-800">
                蓝天志愿者协会
              </h3>
              <div className="w-16 h-1 bg-blue-500 mb-6"></div>
              <p className="text-lg text-gray-700 italic mb-4">
                "在服务他人的过程中，也寻找自己。"
              </p>
            </div>
          </div>
        </div>
        <div className="md:w-2/3 md:pl-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-blue-50 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
              <Users className="h-8 w-8 text-blue-500 mb-4" />
              <h4 className="font-bold text-xl mb-2">大一：加入平面设计组</h4>
              <p className="text-gray-700">
                参与多个志愿项目的宣传品设计，如海报、宣传册等。
              </p>
            </div>
            <div className="bg-blue-50 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
              <Award className="h-8 w-8 text-blue-500 mb-4" />
              <h4 className="font-bold text-xl mb-2">大二：留任宣传部干事</h4>
              <p className="text-gray-700">
                参与志愿活动的筹划与组织，参与挑战杯、花园小课堂等志愿活动。
              </p>
            </div>
          </div>
          <div className="mt-8 grid grid-cols-2 gap-4">
            <div className="aspect-video bg-gray-200 rounded-lg overflow-hidden relative group">
              <div className="absolute inset-0 flex items-center justify-center">
                
              </div>
              <div className="absolute inset-0 bg-blue-900/80 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <span className="text-white font-medium">
                  125志愿者日手提袋设计
                </span>
              </div>
            </div>
            <div className="aspect-video bg-gray-200 rounded-lg overflow-hidden relative group">
              <div className="absolute inset-0 flex items-center justify-center">
                
              </div>
              <div className="absolute inset-0 bg-blue-900/80 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <span className="text-white font-medium">会场展板设计</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
