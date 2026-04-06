import type { CSSProperties } from "react";
import type {
  CalloutSection,
  SectionComponentProps,
} from "../../../types/section";

const severityStyles: Record<CalloutSection["severity"], CSSProperties> = {
  info: {
    borderLeft: "4px solid #0b7285",
    background: "#e3fafc",
  },
  warning: {
    borderLeft: "4px solid #f08c00",
    background: "#fff3bf",
  },
  error: {
    borderLeft: "4px solid #c92a2a",
    background: "#ffe3e3",
  },
};

export default function CalloutSectionComponent({
  section,
}: SectionComponentProps<CalloutSection>) {
  const style = severityStyles[section.severity];

  return (
    <aside
      style={{ ...style, padding: "0.75rem 1rem", borderRadius: "0.25rem" }}
    >
      {section.icon ? <strong>{section.icon}: </strong> : null}
      <span>{section.content}</span>
    </aside>
  );
}
