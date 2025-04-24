import { Badge } from "@/components/ui/badge";
import VolunteerQuadrant from "./quadrants/VolunteerQuadrant";
import ContentCreatorQuadrant from "./quadrants/ContentCreatorQuadrant";
import TibetTeachingQuadrant from "./quadrants/TibetTeachingQuadrant";
import InternshipsQuadrant from "./quadrants/InternshipsQuadrant";

export default function QuadrantsSection() {
  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <ContentCreatorQuadrant />
        <TibetTeachingQuadrant />
        <InternshipsQuadrant />
      </div>
    </section>
  );
}
