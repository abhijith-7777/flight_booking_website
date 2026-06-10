"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function SignupPage() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const signup = async () => {
    const res = await fetch("http://localhost:8000/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        email,
        password,
      }),
    });

    const data = await res.json();

    if (data.success) {
      alert("Signup successful");
      router.push("/login");
    } else {
      alert(data.error);
    }
  };

  return (
    <main className="min-h-screen relative overflow-hidden bg-[#040816] text-white">

      <div className="absolute inset-0">

        <img
          src="https://images.unsplash.com/photo-1517479149777-5f3b1511d5ad?q=80&w=2070&auto=format&fit=crop"
          alt=""
          className="w-full h-full object-cover opacity-30"
        />

        <div className="absolute inset-0 bg-[#040816]/80" />

      </div>

      <section className="relative z-10 max-w-7xl mx-auto px-6 pt-36 pb-16">

        <div className="grid lg:grid-cols-[1fr_470px] gap-10 items-center min-h-[calc(100vh-13rem)]">

          <div>

            <div className="inline-flex items-center gap-3 px-5 py-3 rounded-full bg-white/10 border border-white/10 backdrop-blur-xl mb-6">

              <div className="w-3 h-3 rounded-full bg-green-400 animate-pulse" />

              <span className="text-sm text-gray-200">
                Join premium air travel
              </span>

            </div>

            <p className="uppercase tracking-[4px] text-cyan-300 text-xs mb-4">
              Create Account
            </p>

            <h1 className="text-5xl lg:text-6xl font-black leading-[0.9] mb-6">
              Start
              <span className="block text-white/40">
                Flying Smarter
              </span>
            </h1>

            <p className="text-gray-200 text-lg leading-relaxed max-w-xl mb-8">
              Save traveler details, book seats faster, and keep your upcoming
              SkyBook flights easy to manage.
            </p>

            <div className="grid sm:grid-cols-3 gap-3 max-w-2xl">

              <div className="rounded-3xl border border-white/10 bg-white/10 p-5 backdrop-blur-2xl">
                <p className="text-2xl font-black text-white">Easy</p>
                <p className="mt-1 text-sm text-gray-300">Trip planning</p>
              </div>

              <div className="rounded-3xl border border-white/10 bg-white/10 p-5 backdrop-blur-2xl">
                <p className="text-2xl font-black text-white">Quick</p>
                <p className="mt-1 text-sm text-gray-300">Checkout flow</p>
              </div>

              <div className="rounded-3xl border border-white/10 bg-white/10 p-5 backdrop-blur-2xl">
                <p className="text-2xl font-black text-white">Clean</p>
                <p className="mt-1 text-sm text-gray-300">Account hub</p>
              </div>

            </div>

          </div>

          <div className="bg-black/35 border border-white/10 backdrop-blur-3xl rounded-[35px] px-5 py-5 shadow-2xl">

            <div className="mb-6">

              <h2 className="text-3xl font-black mb-2">
                Sign Up
              </h2>

              <p className="text-gray-300 text-sm leading-relaxed">
                Add your details to create a SkyBook profile.
              </p>

            </div>

            <div className="space-y-4">

              <div className="bg-white/10 border border-white/10 rounded-3xl px-4 py-3">

                <p className="text-gray-300 text-sm mb-1">
                  Full Name
                </p>

                <input
                  placeholder="Your name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-transparent outline-none text-lg font-semibold"
                />

              </div>

              <div className="bg-white/10 border border-white/10 rounded-3xl px-4 py-3">

                <p className="text-gray-300 text-sm mb-1">
                  Email
                </p>

                <input
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-transparent outline-none text-lg font-semibold"
                />

              </div>

              <div className="bg-white/10 border border-white/10 rounded-3xl px-4 py-3">

                <p className="text-gray-300 text-sm mb-1">
                  Password
                </p>

                <input
                  type="password"
                  placeholder="Create password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-transparent outline-none text-lg font-semibold"
                />

              </div>

              <button
                onClick={signup}
                className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-cyan-300 to-blue-500 text-black font-black text-lg hover:scale-[1.02] transition-all shadow-2xl"
              >
                Create Account
              </button>

              <p className="text-center text-sm text-gray-300">
                Already have an account?{" "}
                <Link
                  href="/login"
                  className="text-cyan-300 font-semibold hover:text-cyan-200 transition"
                >
                  Login
                </Link>
              </p>

            </div>

          </div>

        </div>

      </section>

    </main>
  );
}
