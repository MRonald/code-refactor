import type {
  HighlightSection,
  SectionComponentProps,
} from "../../../types/section";

export default function HighlightSectionComponent({
  section,
}: SectionComponentProps<HighlightSection>) {
  return <strong>{section.content}</strong>;
}
