"use client";

import Link from "next/link";

export default function NotFound() {
  return (
    <div className="text-center p-20 text-gray-600">
      <h1 className="text-4xl font-bold mb-4">404 - Page Not Found</h1>
      <p className="mb-6">The page you are looking for does not exist.</p>
      <Link
        href="/"
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
      >
        Go Back Home
      </Link>
    </div>
  );
}
