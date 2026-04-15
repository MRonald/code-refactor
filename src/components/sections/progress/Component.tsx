import type {
  SectionComponentProps,
  ProgressSection,
} from "../../../types/section";

export default function ProgressSectionComponent({
  section,
}: SectionComponentProps<ProgressSection>) {
  return (
    <p>
      {section.label}: {section.value}%
    </p>
  );
}
