import React from "react";

/**
 * Starter view: wired to `data` in mockData—payloads are intentionally inconsistent;
 * many cases unhandled here.
 */
export default function ResultView({ data }: any) {
  const sections = Array.isArray(data?.sections) ? data.sections : [];

  const renderListItem = (item: unknown): string => {
    if (typeof item === "string") {
      return item;
    }

    if (item && typeof item === "object" && "text" in item) {
      const text = (item as { text?: unknown }).text;
      return typeof text === "string" ? text : "";
    }

    return "";
  };

  return (
    <div>
      <h1>{typeof data?.title === "string" ? data.title : "Untitled"}</h1>
      {sections.map((s: any, i: number) => {
        if (s.type === "text") {
          const content =
            typeof s.content === "string"
              ? s.content
              : typeof s.body === "string"
                ? s.body
                : "";
          return <p key={i}>{content}</p>;
        }
        if (s.type === "list") {
          const items = Array.isArray(s.items) ? s.items : [];
          return (
            <ul key={i}>
              {items.map((item: unknown, idx: number) => (
                <li key={idx}>{renderListItem(item)}</li>
              ))}
            </ul>
          );
        }
        if (s.type === "highlight") {
          return (
            <strong key={i}>
              {typeof s.content === "string" ? s.content : ""}
            </strong>
          );
        }
        return <div key={i}>Unknown section</div>;
      })}
    </div>
  );
}
