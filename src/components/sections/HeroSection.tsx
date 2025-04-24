import { ArrowDown, MapPin, School, Cpu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
// import MyPhoto from "@site/static/img/liyilong.png";

export default function HeroSection() {
  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-blue-900 via-indigo-900 to-blue-950 z-10"></div>
      {/* Decorative elements */}
      <div className="absolute inset-0 z-0 opacity-20">
        <div className="absolute top-20 left-20 w-64 h-64 rounded-full bg-blue-400 blur-3xl"></div>
        <div className="absolute bottom-20 right-20 w-64 h-64 rounded-full bg-purple-400 blur-3xl"></div>
      </div>
      {/* Decorative elements */}
      <div className="absolute inset-0 z-0 opacity-30">
        <div className="absolute top-20 left-20 w-64 h-64 rounded-full bg-blue-400 blur-3xl"></div>
        <div className="absolute bottom-20 right-20 w-64 h-64 rounded-full bg-purple-400 blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-indigo-400 blur-3xl"></div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 container mx-auto px-4 relative z-20">
        <div className="flex flex-col justify-center text-white">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
            李亦龙的
            <br />
            知识库
          </h1>
          <div className="flex flex-wrap items-center gap-4 mb-8">
            <div className="flex items-center space-x-1 bg-white/10 px-3 py-1 rounded-full">
              <MapPin className="h-4 w-4" />
              <span>福建莆田</span>
            </div>
            <div className="flex items-center space-x-1 bg-white/10 px-3 py-1 rounded-full">
              <School className="h-4 w-4" />
              <span>北航 RAIDS 实验室</span>
            </div>
            <div className="flex items-center space-x-1 bg-white/10 px-3 py-1 rounded-full">
              <Cpu className="h-4 w-4" />
              <span>分布式系统方向</span>
            </div>
          </div>
          <p className="text-xl opacity-90 mb-8 max-w-lg">
            记录我的学习、生活和成长历程。
          </p>
          <div className="flex items-center gap-4">
            <Button
              size="lg"
              className="bg-white text-blue-900 hover:bg-blue-50"
            >
              了解更多
              <ArrowDown className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
        <div className="hidden md:flex items-center justify-center">
          <div className="relative w-3/4 aspect-[3/4] rounded-2xl overflow-hidden shadow-2xl transform rotate-2 hover:rotate-0 transition-transform duration-500">
            {/* Hero image placeholder - creative layout with two images */}
            <div className="absolute inset-0 flex">
              {/* 类似工牌的效果 */}
              <div className="w-full bg-gray-300 flex items-center justify-center relative overflow-hidden">
                {/* <img
                  width={700}
                  height={700}
                  alt=""
                  src={MyPhoto}
                  className="absolute object-cover left-0 right-0 inset-0 bg-gradient-to-tr from-blue-500/20 to-transparent"
                /> */}

                {/* <div className="absolute bottom-8 right-4  backdrop-blur-md  p-2 rounded-lg">
                  <h2 className="text-2xl text-right font-bold">李亦龙</h2>
                  <p className="text-sm text-right text-muted-foreground">
                    18373580 → SY2206118
                  </p>
                  <p className="text-sm text-right text-muted-foreground">
                    硕士研究生二年级
                  </p>
                </div> */}
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Scroll indicator */}
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-20 animate-bounce">
        <div className="w-8 h-12 rounded-full border-2 border-white flex items-start justify-center pt-2">
          <div className="w-1 h-3 bg-white rounded-full animate-pulse"></div>
        </div>
      </div>
    </section>
  );
}
