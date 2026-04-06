import type {
  SectionComponentProps,
  TextSection,
} from "../../../types/section";

export default function TextSectionComponent({
  section,
}: SectionComponentProps<TextSection>) {
  return <p>{section.content}</p>;
}
