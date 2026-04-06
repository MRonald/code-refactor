import React, { Suspense } from "react";
import type { Section } from "../types/section";
import { sectionRegistry } from "../registry/sectionRegistry";
import SectionErrorBoundary from "./SectionErrorBoundary";

type SectionRendererProps = {
  section: Section;
  index: number;
};

export default function SectionRenderer({
  section,
  index,
}: SectionRendererProps) {
  const SectionComponent = sectionRegistry.resolve(section.type);

  return (
    <SectionErrorBoundary sectionType={section.type}>
      <Suspense fallback={<div role="status">Loading section...</div>}>
        <SectionComponent section={section} index={index} />
      </Suspense>
    </SectionErrorBoundary>
  );
}
