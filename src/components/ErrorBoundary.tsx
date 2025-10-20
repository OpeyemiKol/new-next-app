"use client";

import type { ReactNode } from "react";
import { ErrorBoundary as ReactErrorBoundary } from "react-error-boundary";
import type { FallbackProps } from "react-error-boundary";

function ErrorFallback({ error, resetErrorBoundary }: FallbackProps) {
  return (
    <div className="text-center p-10 text-red-600">
      <h2 className="text-2xl font-bold">Something went wrong</h2>
      <p className="my-4">{error.message}</p>
      <button
        onClick={resetErrorBoundary}
        className="mt-4 px-4 py-2 bg-red-500 cursor-pointer text-white rounded"
      >
        Try Again
      </button>
    </div>
  );
}

interface ErrorBoundaryProps {
  children: ReactNode;
}

const ErrorBoundary = ({ children }: ErrorBoundaryProps) => {
  return (
    <ReactErrorBoundary
      FallbackComponent={ErrorFallback}
      onReset={() => {
        // reload client-side
        if (typeof window !== "undefined") {
          window.location.reload();
        }
      }}
    >
      {children}
    </ReactErrorBoundary>
  );
};

export default ErrorBoundary;
