'use client';

import { Component, type ReactNode } from 'react';

type Props = { children: ReactNode };
type State = { hasError: boolean };

export default class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: unknown) {
    console.error(error);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-background flex items-center justify-center px-6">
          <div className="max-w-md mx-auto text-center py-16">
            <p className="font-display text-2xl font-semibold text-navy mb-3">
              Something went wrong, please refresh
            </p>
            <p className="text-navy/70 mb-6">
              We hit an unexpected error. Refreshing the page usually fixes it.
            </p>
            <button
              type="button"
              onClick={() => window.location.reload()}
              className="inline-block bg-brass text-navy rounded-lg px-6 py-3 font-medium hover:bg-brass-dark transition-colors"
            >
              Refresh
            </button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}
