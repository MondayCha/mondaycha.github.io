import type { ReactNode } from "react";
import clsx from "clsx";
import Link from "@docusaurus/Link";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import Layout from "@theme/Layout";
import Heading from "@theme/Heading";
import HeroSection from "@/components/sections/HeroSection";
import QuadrantsSection from "@/components/sections/QuadrantsSection";
import LabSection from "@/components/sections/LabSection";
import TipsSection from "@/components/sections/TipsSection";

function Hero() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100">
      <HeroSection />
      {/* <JourneySection /> */}
      {/* <QuadrantsSection /> */}
      {/* <LabSection /> */}
      {/* <TipsSection /> */}
    </div>
  );
}

export default function Home(): ReactNode {
  const { siteConfig } = useDocusaurusContext();
  return (
    <Layout
      title={`Hello from ${siteConfig.title}`}
      description="Description will go into a meta tag in <head />"
    >
      <main>
        <Hero />
      </main>
    </Layout>
  );
}
