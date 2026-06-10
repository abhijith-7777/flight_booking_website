// app/page.tsx

"use client";

import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useState } from "react";

import PopularDestinations from "./components/PopularDestinations";
import DealsSection from "./components/DealsSection";

export default function Home() {
  const router = useRouter();

  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [date, setDate] = useState("");

  return (
    <div className="relative overflow-hidden bg-gray-300 text-white">

      {/* HERO SECTION */}
      <div className="relative h-screen overflow-hidden">

        {/* VIDEO */}
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source
            src="/videos/airplane.mp4"
            type="video/mp4"
          />
        </video>

        {/* OVERLAY */}
        <div className="absolute inset-0 bg-black/50" />

        {/* CONTENT */}
        <section className="relative z-10 h-full max-w-7xl mx-auto px-6 pt-32 flex items-center">

          <div className="grid lg:grid-cols-2 gap-14 items-center w-full">

            {/* LEFT */}
            <div>

              {/* Badge */}
              <div className="inline-flex items-center gap-3 px-5 py-3 rounded-full bg-white/10 border border-white/10 backdrop-blur-xl mb-6">

                <div className="w-3 h-3 rounded-full bg-green-400 animate-pulse" />

                <span className="text-sm text-gray-200">

                  Premium Airline Experience

                </span>

              </div>

              {/* Heading */}
              <h1 className="text-5xl lg:text-6xl font-black leading-[0.9] mb-6">

                Explore
                <span className="block text-white/40">

                  The Sky

                </span>

              </h1>

              {/* Description */}
              <p className="text-gray-200 text-lg leading-relaxed max-w-xl mb-8">

                Discover luxury air travel with cinematic experiences,
                seamless booking and premium destinations.

              </p>

              {/* Buttons */}
              <div className="flex gap-4">

                <button className="px-8 py-4 rounded-2xl bg-gradient-to-r from-cyan-300 to-blue-500 text-black font-black shadow-2xl hover:scale-105 transition-all">

                  Book Flight

                </button>

                <button className="px-8 py-4 rounded-2xl border border-white/20 bg-white/10 backdrop-blur-xl hover:bg-white/20 transition-all">

                  Explore

                </button>

              </div>

            </div>

            {/* RIGHT CARD */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
              className="bg-black/35 border border-white/10 backdrop-blur-3xl rounded-[35px] px-5 py-4 shadow-2xl max-w-[470px] w-full ml-auto"
            >

              {/* Title */}
              <div className="mb-4">

                <h2 className="text-2xl font-black mb-2">

                  Where to go?

                </h2>

                <p className="text-gray-300 text-sm leading-relaxed">

                  Explore destinations with premium comfort.

                </p>

              </div>

              {/* Tabs */}
              <div className="flex gap-2 mb-5">

                <button className="px-5 py-2 rounded-full bg-white text-black font-semibold text-sm">

                  One way

                </button>

                <button className="px-5 py-2 rounded-full bg-white/10 border border-white/10 text-sm">

                  Round trip

                </button>

                <button className="px-5 py-2 rounded-full bg-white/10 border border-white/10 text-sm">

                  Multicity

                </button>

              </div>

              {/* FORM */}
              <div className="space-y-2.5">

                {/* FROM */}
                <div className="bg-white/10 border border-white/10 rounded-3xl px-4 py-3">

                  <p className="text-gray-300 text-sm mb-1">
                    From
                  </p>

                  <input
                    value={from}
                    onChange={(e) =>
                      setFrom(e.target.value)
                    }
                    placeholder="Dubai"
                    className="w-full bg-transparent outline-none text-xl font-black"
                  />

                </div>

                {/* TO */}
                <div className="bg-white/10 border border-white/10 rounded-3xl px-4 py-3">

                  <p className="text-gray-300 text-sm mb-1">
                    To
                  </p>

                  <input
                    value={to}
                    onChange={(e) =>
                      setTo(e.target.value)
                    }
                    placeholder="Seoul"
                    className="w-full bg-transparent outline-none text-xl font-black"
                  />

                </div>

                {/* DATE */}
                <div className="bg-white/10 border border-white/10 rounded-3xl px-4 py-3">

                  <p className="text-gray-300 text-sm mb-2">
                    Departure
                  </p>

                  <input
                    value={date}
                    onChange={(e) =>
                      setDate(e.target.value)
                    }
                    type="date"
                    className="w-full bg-transparent outline-none text-base"
                  />

                </div>

                {/* PASSENGERS + CLASS */}
                <div className="grid grid-cols-2 gap-3">

                  {/* Passenger */}
                  <div className="bg-white/10 border border-white/10 rounded-3xl px-4 py-3">

                    <p className="text-gray-300 text-sm mb-2">
                      Passengers
                    </p>

                    <select className="w-full bg-transparent outline-none text-base">

                      <option className="text-black">
                        1 Adult
                      </option>

                      <option className="text-black">
                        2 Adults
                      </option>

                      <option className="text-black">
                        3 Adults
                      </option>

                    </select>

                  </div>

                  {/* Class */}
                  <div className="bg-white/10 border border-white/10 rounded-3xl px-4 py-3">

                    <p className="text-gray-300 text-sm mb-2">
                      Class
                    </p>

                    <select className="w-full bg-transparent outline-none text-base">

                      <option className="text-black">
                        Economy
                      </option>

                      <option className="text-black">
                        Business
                      </option>

                      <option className="text-black">
                        First Class
                      </option>

                    </select>

                  </div>

                </div>

                {/* SEARCH BUTTON */}
                <button
                  onClick={() => {
                    router.push(
                      `/search-results?from=${from}&to=${to}&date=${date}`
                    );
                  }}
                  className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-yellow-300 to-orange-400 text-black font-black text-lg hover:scale-[1.02] transition-all shadow-2xl mt-2"
                >

                  Search Flights

                </button>

              </div>

            </motion.div>

          </div>

        </section>

      </div>

      {/* POPULAR DESTINATIONS */}
      <PopularDestinations />

      {/* DEALS */}
      <DealsSection />

      {/* FOOTER */}
      <footer className="relative z-10 border-t border-gray-200 bg-white text-black">

        <div className="max-w-7xl mx-auto px-6 py-10 flex flex-col lg:flex-row items-center justify-between gap-6">

          {/* LEFT */}
          <div>

            <h1 className="text-3xl font-black bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">

              SkyBook

            </h1>

            <p className="text-gray-500 mt-2">

              Luxury airline booking experience.

            </p>

          </div>

          {/* RIGHT */}
          <div className="flex gap-8 text-gray-600">

            <button className="hover:text-black transition">
              About
            </button>

            <button className="hover:text-black transition">
              Support
            </button>

            <button className="hover:text-black transition">
              Privacy
            </button>

            <button className="hover:text-black transition">
              Terms
            </button>

          </div>

        </div>

      </footer>

    </div>
  );
}