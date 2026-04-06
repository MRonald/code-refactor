import type {
  ListItem,
  ListSection,
  SectionComponentProps,
} from "../../../types/section";

function renderListItem(item: ListItem): string {
  return typeof item === "string" ? item : item.text;
}

export default function ListSectionComponent({
  section,
}: SectionComponentProps<ListSection>) {
  return (
    <ul>
      {section.items.map((item, itemIndex) => (
        <li key={itemIndex}>{renderListItem(item)}</li>
      ))}
    </ul>
  );
}
