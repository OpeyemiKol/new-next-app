"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const router = useRouter();

  useEffect(() => {
    console.error("Global error caught:", error);
  }, [error]);

  return (
    <html>
      <body className="p-8 text-center">
        <h2 className="text-2xl font-bold text-red-600 mb-4">
          Something went wrong globally 😢
        </h2>
        <p className="mb-6 text-gray-700">{error.message}</p>
        <div className="flex gap-4 justify-center">
          <button
            onClick={() => reset()}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded"
          >
            Try Again
          </button>
          <button
            onClick={() => router.push("/")}
            className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded"
          >
            Go Home
          </button>
        </div>
      </body>
    </html>
  );
}
