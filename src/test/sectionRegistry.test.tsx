import React, { Suspense } from "react";
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { SectionRegistry } from "../registry/sectionRegistry";
import type { SectionComponent } from "../types/section";

function createLoader(label: string) {
  const Component: SectionComponent = ({ section }) => (
    <div>{`${label}:${section.type}`}</div>
  );

  return async () => ({ default: Component });
}

describe("SectionRegistry", () => {
  it("registers loaders based on folder convention", () => {
    const registry = new SectionRegistry({
      "../components/sections/text/Component.tsx": createLoader("text"),
      "../components/sections/unknown/Component.tsx": createLoader("unknown"),
    });

    expect(registry.has("text")).toBe(true);
    expect(registry.has("unknown")).toBe(true);
    expect(registry.has("missing")).toBe(false);
  });

  it("returns cached lazy component for repeated resolves", () => {
    const registry = new SectionRegistry({
      "../components/sections/text/Component.tsx": createLoader("text"),
      "../components/sections/unknown/Component.tsx": createLoader("unknown"),
    });

    const first = registry.resolve("text");
    const second = registry.resolve("text");

    expect(first).toBe(second);
  });

  it("falls back to unknown loader for unregistered section types", () => {
    const registry = new SectionRegistry({
      "../components/sections/text/Component.tsx": createLoader("text"),
      "../components/sections/unknown/Component.tsx": createLoader("unknown"),
    });

    const unknownFromMissing = registry.resolve("missing");
    const unknownDirect = registry.resolve("unknown");

    expect(unknownFromMissing).toBe(unknownDirect);
  });

  it("uses unknown loader when a specific loader fails", async () => {
    const registry = new SectionRegistry({
      "../components/sections/text/Component.tsx": async () => {
        throw new Error("loader failure");
      },
      "../components/sections/unknown/Component.tsx": createLoader("unknown"),
    });

    const Resolved = registry.resolve("text");

    render(
      <Suspense fallback={<div>loading</div>}>
        <Resolved section={{ type: "text", content: "Hello" }} index={0} />
      </Suspense>,
    );

    expect(await screen.findByText("unknown:text")).toBeInTheDocument();
  });
});
