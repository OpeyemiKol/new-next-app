"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

const LandingPage = () => {
  const router = useRouter();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center text-white overflow-hidden bg-[url('/bgimage2.jpg')] bg-cover bg-center bg-no-repeat px-6 py-12">
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-md z-0" />

      {/* Animated Glow Dots Background */}
      <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_top_left,var(--tw-gradient-stops))] from-purple-500/10 via-transparent to-transparent animate-pulse z-0" />

      {/* Content */}
      <div className="relative z-10 text-center max-w-3xl animate-fadeInUp">
        <h1 className="text-4xl md:text-5xl font-extrabold mb-6 drop-shadow-lg">
          Welcome to <span className="text-yellow-400">Opeyemi’s Todo App</span>
        </h1>

        <p className="text-lg md:text-xl mb-10 text-blue-100 max-w-2xl mx-auto leading-relaxed">
          Elevate your task management with a sleek, interactive, and
          productivity-first todo application.
        </p>

        {/* Features Card */}
        <div className="bg-white/10 backdrop-blur-2xl border border-white/20 rounded-2xl p-8 mb-10 max-w-xl mx-auto shadow-lg transition-transform duration-300 hover:scale-105">
          <h2 className="text-xl font-semibold mb-4 text-yellow-300">
            ✨ Features
          </h2>
          <ul className="list-disc list-inside text-base text-blue-100 space-y-2 text-left">
            <li>✅ Add and manage todos</li>
            <li>✏️ Edit tasks instantly</li>
            <li>🗑️ Remove unwanted items</li>
            <li>🔍 Live search and filters</li>
            <li>📄 Paginated view for large lists</li>
            <li>🌈 Seamless UI transitions</li>
          </ul>
        </div>

        {/* CTA Button */}
        <button
          onClick={() => router.push("/todos")}
          className="bg-yellow-400 cursor-pointer hover:bg-yellow-500 text-blue-900 font-semibold px-8 py-3 rounded-full text-lg shadow-xl transition-all duration-300 hover:scale-105 animate-bounceSlow"
        >
          Enter App 🚀
        </button>
      </div>

      {/* Footer */}
      <footer className="absolute bottom-4 text-sm text-blue-200 z-10">
        Crafted with 💡 by{" "}
        <span className="font-semibold text-white">Opeyemi</span>
      </footer>
    </div>
  );
};

export default LandingPage;
