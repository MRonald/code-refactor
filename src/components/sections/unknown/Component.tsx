import type { SectionComponentProps } from "../../../types/section";

export default function UnknownSectionComponent({
  section,
}: SectionComponentProps) {
  const unknownType =
    section.type === "unknown" ? section.originalType : section.type;

  return (
    <div role="status">Section type "{unknownType}" is not supported yet.</div>
  );
}
