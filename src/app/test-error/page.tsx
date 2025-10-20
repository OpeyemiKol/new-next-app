"use client";

import { useEffect } from "react";

export default function TestErrorPage() {
  useEffect(() => {
    // Throw only when this component mounts in the browser
    throw new Error("This is a test error from TestError page!");
  }, []);

  return (
    <div className="p-8 text-center">
      <h1 className="text-2xl font-bold">Loading Test Error...</h1>
      <p className="text-gray-600">This will throw once mounted.</p>
    </div>
  );
}
