"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Error({
  error,
}: {
  error: Error & { digest?: string };
}) {
  const router = useRouter();

  useEffect(() => {
    console.error("Error caught in TestError route:", error);
  }, [error]);

  return (
    <div className="p-8 text-center">
      <h2 className="text-2xl font-bold text-red-600 mb-4">
        Oops! Something went wrong 😬
      </h2>
      <p className="mb-6 text-gray-700">{error.message}</p>
      <button
        onClick={() => router.push("/")}
        className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded"
      >
        Go Back Home
      </button>
    </div>
  );
}
