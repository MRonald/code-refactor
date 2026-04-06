import React from "react";
import SectionRenderer from "./components/SectionRenderer";
import type { Section } from "./types/section";
import { normalizePageData } from "./validation/normalizePageData";

/**
 * Starter view: wired to `data` in mockData—payloads are intentionally inconsistent;
 * many cases unhandled here.
 */
type ResultViewProps = {
  data: unknown;
};

function buildSectionKey(section: Section, index: number): string {
  if (section.id) {
    return `${section.id}-${index}`;
  }

  return `${section.type}-${index}`;
}

export default function ResultView({ data }: ResultViewProps) {
  const normalizedData = React.useMemo(() => normalizePageData(data), [data]);

  return (
    <div>
      <h1>{normalizedData.title}</h1>
      {normalizedData.sections.map((section, index) => (
        <SectionRenderer
          key={buildSectionKey(section, index)}
          section={section}
          index={index}
        />
      ))}
    </div>
  );
}
