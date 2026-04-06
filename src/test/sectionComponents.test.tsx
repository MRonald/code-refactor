import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import CalloutSectionComponent from "../components/sections/callout/Component";
import HighlightSectionComponent from "../components/sections/highlight/Component";
import ListSectionComponent from "../components/sections/list/Component";
import TextSectionComponent from "../components/sections/text/Component";
import UnknownSectionComponent from "../components/sections/unknown/Component";

describe("section components", () => {
  it("renders text section content", () => {
    render(
      <TextSectionComponent
        section={{ type: "text", content: "Text body" }}
        index={0}
      />,
    );

    expect(screen.getByText("Text body")).toBeInTheDocument();
  });

  it("renders list section for string and object items", () => {
    render(
      <ListSectionComponent
        section={{
          type: "list",
          items: ["First", { text: "Second", meta: "hidden" }],
        }}
        index={0}
      />,
    );

    expect(screen.getByText("First")).toBeInTheDocument();
    expect(screen.getByText("Second")).toBeInTheDocument();
  });

  it("renders highlight section content", () => {
    render(
      <HighlightSectionComponent
        section={{ type: "highlight", content: "Warning" }}
        index={0}
      />,
    );

    expect(screen.getByText("Warning")).toBeInTheDocument();
  });

  it("renders callout section with icon and message", () => {
    render(
      <CalloutSectionComponent
        section={{
          type: "callout",
          content: "Investigate transaction",
          severity: "warning",
          icon: "alert",
        }}
        index={0}
      />,
    );

    expect(screen.getByText(/alert:/i)).toBeInTheDocument();
    expect(screen.getByText("Investigate transaction")).toBeInTheDocument();
  });

  it("renders unknown section with original type", () => {
    render(
      <UnknownSectionComponent
        section={{
          type: "unknown",
          originalType: "freetext",
          payload: "future data",
          reason: "unsupported-type",
        }}
        index={0}
      />,
    );

    expect(
      screen.getByText('Section type "freetext" is not supported yet.'),
    ).toBeInTheDocument();
  });
});
