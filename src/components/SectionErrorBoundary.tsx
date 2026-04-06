import React from "react";

type SectionErrorBoundaryProps = {
  sectionType: string;
  children: React.ReactNode;
};

type SectionErrorBoundaryState = {
  hasError: boolean;
};

export default class SectionErrorBoundary extends React.Component<
  SectionErrorBoundaryProps,
  SectionErrorBoundaryState
> {
  state: SectionErrorBoundaryState = {
    hasError: false,
  };

  static getDerivedStateFromError(): SectionErrorBoundaryState {
    return { hasError: true };
  }

  componentDidCatch(error: Error): void {
    console.error(
      `Failed to render section type: ${this.props.sectionType}`,
      error,
    );
  }

  render(): React.ReactNode {
    if (this.state.hasError) {
      return <div role="alert">This section could not be rendered safely.</div>;
    }

    return this.props.children;
  }
}
