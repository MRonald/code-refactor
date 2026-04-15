import { z } from "zod";
import type {
  CalloutSeverity,
  ListItem,
  PageData,
  Section,
  UnknownSection,
} from "../types/section";

const dataSchema = z.object({
  title: z.unknown().optional(),
  sections: z.unknown().optional(),
});

const listItemObjectSchema = z.object({
  text: z.string(),
  meta: z.string().optional(),
});

const severitySchema = z.enum(["info", "warning", "error"]);

function parseId(value: unknown): string | undefined {
  return typeof value === "string" && value.trim() ? value : undefined;
}

function parseString(value: unknown): string {
  return typeof value === "string" ? value : "";
}

function toUnknownSection(
  payload: unknown,
  id: string | undefined,
  reason: UnknownSection["reason"],
  originalType: string,
): UnknownSection {
  return {
    type: "unknown",
    id,
    payload,
    reason,
    originalType,
  };
}

function normalizeListItems(rawItems: unknown): ListItem[] {
  if (!Array.isArray(rawItems)) {
    return [];
  }

  return rawItems.flatMap((item) => {
    if (typeof item === "string") {
      return item;
    }

    const parsedObject = listItemObjectSchema.safeParse(item);
    if (parsedObject.success) {
      return parsedObject.data;
    }

    return [];
  });
}

function normalizeSection(rawSection: unknown): Section {
  if (!rawSection || typeof rawSection !== "object") {
    return toUnknownSection(rawSection, undefined, "invalid-shape", "invalid");
  }

  const section = rawSection as Record<string, unknown>;
  const id = parseId(section.id);

  if (typeof section.type !== "string") {
    return toUnknownSection(rawSection, id, "missing-type", "missing");
  }

  switch (section.type) {
    case "text": {
      const contentCandidate =
        typeof section.content === "string"
          ? section.content
          : typeof section.body === "string"
            ? section.body
            : "";
      return {
        type: "text",
        id,
        content: contentCandidate,
      };
    }
    case "list": {
      return {
        type: "list",
        id,
        items: normalizeListItems(section.items),
      };
    }
    case "highlight": {
      return {
        type: "highlight",
        id,
        content: parseString(section.content),
      };
    }
    case "progress": {
      const label = parseString(section.label);
      const value =
        typeof section.value === "number" &&
        section.value >= 0 &&
        section.value <= 100
          ? section.value
          : 0;

      return {
        type: "progress",
        id,
        label,
        value,
      };
    }
    case "callout": {
      const parsedSeverity = severitySchema.safeParse(section.severity);
      const severity: CalloutSeverity = parsedSeverity.success
        ? parsedSeverity.data
        : "info";

      return {
        type: "callout",
        id,
        content: parseString(section.content),
        severity,
        icon: parseId(section.icon),
      };
    }
    default:
      return toUnknownSection(rawSection, id, "unsupported-type", section.type);
  }
}

export function normalizePageData(rawData: unknown): PageData {
  const parsedData = dataSchema.safeParse(rawData);

  if (!parsedData.success) {
    return {
      title: "Untitled",
      sections: [
        toUnknownSection(rawData, undefined, "invalid-shape", "invalid-page"),
      ],
    };
  }

  const title =
    typeof parsedData.data.title === "string" && parsedData.data.title.trim()
      ? parsedData.data.title
      : "Untitled";

  const rawSections = Array.isArray(parsedData.data.sections)
    ? parsedData.data.sections
    : [];

  return {
    title,
    sections: rawSections.map(normalizeSection),
  };
}
