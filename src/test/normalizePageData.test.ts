import { describe, expect, it } from "vitest";
import { fixtures } from "../mockData";
import { normalizePageData } from "../validation/normalizePageData";

describe("normalizePageData", () => {
  it("returns safe fallback when root payload is invalid", () => {
    const result = normalizePageData("invalid-root");

    expect(result.title).toBe("Untitled");
    expect(result.sections).toHaveLength(1);
    expect(result.sections[0]).toMatchObject({
      type: "unknown",
      reason: "invalid-shape",
      originalType: "invalid-page",
    });
  });

  it("normalizes legacy text body into content", () => {
    const result = normalizePageData(fixtures.minimalLegacy);

    expect(result.title).toBe("Legacy-only");
    expect(result.sections[0]).toMatchObject({
      type: "text",
      content: "Body-only text node.",
    });
  });

  it("normalizes mixed list items and filters invalid entries", () => {
    const result = normalizePageData({
      title: "List case",
      sections: [
        {
          type: "list",
          items: ["A", { text: "B", meta: "x" }, { bad: "entry" }],
        },
        { type: "list", items: null },
      ],
    });

    expect(result.sections[0]).toMatchObject({
      type: "list",
      items: ["A", { text: "B", meta: "x" }],
    });
    expect(result.sections[1]).toMatchObject({ type: "list", items: [] });
  });

  it("maps unknown and missing type sections to unknown fallback", () => {
    const result = normalizePageData({
      title: "Unknown types",
      sections: [
        { type: "freetext", payload: "future" },
        { content: "missing type" },
      ],
    });

    expect(result.sections[0]).toMatchObject({
      type: "unknown",
      reason: "unsupported-type",
      originalType: "freetext",
    });
    expect(result.sections[1]).toMatchObject({
      type: "unknown",
      reason: "missing-type",
      originalType: "missing",
    });
  });

  it("uses default callout severity when payload is invalid", () => {
    const result = normalizePageData({
      title: "Callout",
      sections: [
        {
          type: "callout",
          content: "Severity fallback",
          severity: "critical",
        },
      ],
    });

    expect(result.sections[0]).toMatchObject({
      type: "callout",
      content: "Severity fallback",
      severity: "info",
    });
  });
});
