// app/components/Footer.tsx

"use client";

import { useRouter } from "next/navigation";

export default function Footer() {
  const router = useRouter();

  return (
    <footer className="relative mt-32 overflow-hidden">

      {/* Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[300px] bg-cyan-500/10 blur-3xl rounded-full" />

      {/* Main Footer */}
      <div className="relative z-10 mx-6 mb-6 rounded-[40px] border border-white/10 bg-white/5 backdrop-blur-3xl">

        <div className="max-w-7xl mx-auto px-8 py-16">

          {/* Top */}
          <div className="grid lg:grid-cols-4 gap-14">

            {/* Brand */}
            <div>

              <div
                onClick={() => router.push("/")}
                className="flex items-center gap-4 cursor-pointer mb-6"
              >

                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-cyan-300 to-blue-500 flex items-center justify-center text-black text-2xl shadow-xl shadow-cyan-500/20">

                  ✈️

                </div>

                <div>

                  <h1 className="text-3xl font-black bg-gradient-to-r from-cyan-300 via-blue-400 to-purple-400 bg-clip-text text-transparent">

                    SkyBook

                  </h1>

                  <p className="text-xs text-gray-400 tracking-[3px] uppercase mt-1">

                    Premium Air Travel

                  </p>

                </div>

              </div>

              <p className="text-gray-400 leading-relaxed">

                Experience seamless premium flight booking
                with luxurious travel experiences,
                world-class destinations, and modern aviation comfort.

              </p>

            </div>

            {/* Company */}
            <div>

              <h2 className="text-xl font-black mb-6">
                Company
              </h2>

              <div className="flex flex-col gap-4 text-gray-400">

                <button className="text-left hover:text-cyan-300 transition">
                  About Us
                </button>

                <button className="text-left hover:text-cyan-300 transition">
                  Careers
                </button>

                <button className="text-left hover:text-cyan-300 transition">
                  Press
                </button>

                <button className="text-left hover:text-cyan-300 transition">
                  Blog
                </button>

              </div>

            </div>

            {/* Support */}
            <div>

              <h2 className="text-xl font-black mb-6">
                Support
              </h2>

              <div className="flex flex-col gap-4 text-gray-400">

                <button className="text-left hover:text-cyan-300 transition">
                  Help Center
                </button>

                <button className="text-left hover:text-cyan-300 transition">
                  Flight Status
                </button>

                <button className="text-left hover:text-cyan-300 transition">
                  Cancellation
                </button>

                <button className="text-left hover:text-cyan-300 transition">
                  Contact Us
                </button>

              </div>

            </div>

            {/* Newsletter */}
            <div>

              <h2 className="text-xl font-black mb-6">
                Stay Updated
              </h2>

              <p className="text-gray-400 mb-6">

                Subscribe for exclusive flight deals and premium offers.

              </p>

              <div className="space-y-4">

                <input
                  placeholder="Enter your email"
                  className="w-full px-5 py-4 rounded-2xl bg-white/5 border border-white/10 outline-none text-white placeholder:text-gray-500"
                />

                <button className="w-full py-4 rounded-2xl bg-gradient-to-r from-cyan-300 to-blue-500 text-black font-black hover:scale-[1.02] transition-all shadow-xl shadow-cyan-500/20">

                  Subscribe

                </button>

              </div>

            </div>

          </div>

          {/* Divider */}
          <div className="my-12 border-t border-white/10" />

          {/* Bottom */}
          <div className="flex flex-col lg:flex-row items-center justify-between gap-6">

            <p className="text-gray-500 text-sm">

              © 2026 SkyBook Airlines. All rights reserved.

            </p>

            {/* Socials */}
            <div className="flex items-center gap-5">

              <button className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition text-xl">

                🌐

              </button>

              <button className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition text-xl">

                📸

              </button>

              <button className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition text-xl">

                🐦

              </button>

              <button className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition text-xl">

                ▶️

              </button>

            </div>

          </div>

        </div>

      </div>

    </footer>
  );
}