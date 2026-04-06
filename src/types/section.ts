import type { ComponentType } from "react";

export type SectionType = "text" | "list" | "highlight" | "callout" | "unknown";

export type CalloutSeverity = "info" | "warning" | "error";

export type ListItem =
  | string
  | {
      text: string;
      meta?: string;
    };

interface BaseSection {
  id?: string;
}

export interface TextSection extends BaseSection {
  type: "text";
  content: string;
}

export interface ListSection extends BaseSection {
  type: "list";
  items: ListItem[];
}

export interface HighlightSection extends BaseSection {
  type: "highlight";
  content: string;
}

export interface CalloutSection extends BaseSection {
  type: "callout";
  content: string;
  severity: CalloutSeverity;
  icon?: string;
}

export interface UnknownSection extends BaseSection {
  type: "unknown";
  originalType: string;
  payload: unknown;
  reason: "missing-type" | "invalid-shape" | "unsupported-type";
}

export type Section =
  | TextSection
  | ListSection
  | HighlightSection
  | CalloutSection
  | UnknownSection;

export interface PageData {
  title: string;
  sections: Section[];
}

export type SectionComponentProps<TSection extends Section = Section> = {
  section: TSection;
  index: number;
};

export type SectionComponent<TSection extends Section = Section> =
  ComponentType<SectionComponentProps<TSection>>;
