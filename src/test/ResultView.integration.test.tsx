import React from "react";
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import ResultView from "../ResultView";
import { data, fixtures } from "../mockData";

describe("ResultView integration", () => {
  it("renders default payload with title and known section content", async () => {
    render(<ResultView data={data} />);

    expect(
      screen.getByRole("heading", { name: "Payment Analysis" }),
    ).toBeInTheDocument();

    expect(
      await screen.findByText("Standard summary paragraph."),
    ).toBeInTheDocument();
    expect(
      await screen.findByText(
        "Legacy ingest still sends `body` instead of `content`.",
      ),
    ).toBeInTheDocument();
  });

  it("renders fallback for unknown section type without crashing", async () => {
    render(<ResultView data={data} />);

    expect(
      await screen.findByText('Section type "freetext" is not supported yet.'),
    ).toBeInTheDocument();
  });

  it("supports payload without sections array", () => {
    render(<ResultView data={fixtures.missingSections} />);

    expect(
      screen.getByRole("heading", { name: "Report without sections array" }),
    ).toBeInTheDocument();
  });

  it("renders safe fallback when payload is totally invalid", async () => {
    render(<ResultView data={null} />);

    expect(
      screen.getByRole("heading", { name: "Untitled" }),
    ).toBeInTheDocument();
    expect(
      await screen.findByText(
        'Section type "invalid-page" is not supported yet.',
      ),
    ).toBeInTheDocument();
  });
});
