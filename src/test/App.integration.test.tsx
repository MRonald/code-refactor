import React from "react";
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import App from "../App";

describe("App integration", () => {
  it("renders data and fixtures as independent sections with same title importance", () => {
    render(<App />);

    const primaryHeadings = screen.getAllByRole("heading", { level: 1 });
    expect(primaryHeadings).toHaveLength(4);

    expect(
      screen.getByRole("heading", { name: "Payment Analysis" }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: "Untitled" }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: "Report without sections array" }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: "Legacy-only" }),
    ).toBeInTheDocument();
  });

  it("does not mix content between independent sections", async () => {
    render(<App />);

    expect(
      await screen.findAllByText("Standard summary paragraph."),
    ).toHaveLength(1);
    expect(
      await screen.findAllByText("Only body copy when title missing."),
    ).toHaveLength(1);
    expect(await screen.findAllByText("Body-only text node.")).toHaveLength(1);
  });
});
