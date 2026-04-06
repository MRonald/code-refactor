import React, { lazy } from "react";
import type { LazyExoticComponent } from "react";
import type { SectionComponent } from "../types/section";

type SectionModule = {
  default: SectionComponent;
};

type Loader = () => Promise<SectionModule>;

const sectionModuleLoaders = import.meta.glob<SectionModule>(
  "../components/sections/*/Component.tsx",
);

function extractSectionType(modulePath: string): string | null {
  const match = modulePath.match(/\/sections\/([^/]+)\/Component\.tsx$/);
  return match?.[1] ?? null;
}

export class SectionRegistry {
  private readonly loaders = new Map<string, Loader>();
  private readonly cache = new Map<
    string,
    LazyExoticComponent<SectionComponent>
  >();

  constructor(loaders: Record<string, Loader>) {
    Object.entries(loaders).forEach(([modulePath, loader]) => {
      const type = extractSectionType(modulePath);
      if (type) {
        this.loaders.set(type, loader);
      }
    });
  }

  has(type: string): boolean {
    return this.loaders.has(type);
  }

  resolve(type: string): LazyExoticComponent<SectionComponent> {
    const resolvedType = this.has(type) ? type : "unknown";
    const fromCache = this.cache.get(resolvedType);

    if (fromCache) {
      return fromCache;
    }

    const loader = this.loaders.get(resolvedType);

    if (!loader) {
      const InlineFallback: SectionComponent = ({ section }) =>
        React.createElement(
          "div",
          { role: "status" },
          `Section type \"${section.type}\" has no renderer.`,
        );

      const fallbackComponent = lazy(async () => ({ default: InlineFallback }));
      this.cache.set(resolvedType, fallbackComponent);
      return fallbackComponent;
    }

    const component = lazy(async () => {
      try {
        return await loader();
      } catch (error) {
        const unknownLoader = this.loaders.get("unknown");
        if (unknownLoader && resolvedType !== "unknown") {
          return unknownLoader();
        }
        throw error;
      }
    });

    this.cache.set(resolvedType, component);
    return component;
  }
}

export const sectionRegistry = new SectionRegistry(sectionModuleLoaders);
