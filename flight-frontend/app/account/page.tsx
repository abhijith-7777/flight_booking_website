"use client";

import Link from "next/link";
import { useSyncExternalStore } from "react";

type User = {
  name?: string;
  email?: string;
};

function getStoredUser() {
  if (typeof window === "undefined") {
    return null;
  }

  const stored = localStorage.getItem("user");
  return stored ? stored : null;
}

function parseUser(stored: string | null): User | null {
  if (!stored) {
    return null;
  }

  try {
    return JSON.parse(stored) as User;
  } catch {
    return null;
  }
}

export default function AccountPage() {
  const storedUser = useSyncExternalStore(
    (onStoreChange) => {
      window.addEventListener("storage", onStoreChange);
      window.addEventListener("user-auth-change", onStoreChange);

      return () => {
        window.removeEventListener("storage", onStoreChange);
        window.removeEventListener("user-auth-change", onStoreChange);
      };
    },
    getStoredUser,
    () => null
  );
  const user = parseUser(storedUser);

  return (
    <main className="min-h-screen px-6 pt-36 pb-16">
      <section className="max-w-3xl mx-auto rounded-[28px] border border-white/10 bg-white/5 p-8 shadow-2xl backdrop-blur-2xl">
        <p className="text-sm uppercase tracking-[4px] text-cyan-300">
          My Account
        </p>

        <h1 className="mt-3 text-4xl font-black">
          {user?.name || "Guest"}
        </h1>

        <div className="mt-8 space-y-4 text-gray-300">
          <div className="rounded-2xl border border-white/10 bg-black/20 p-5">
            <p className="text-xs uppercase tracking-[3px] text-gray-500">
              Name
            </p>
            <p className="mt-2 text-lg text-white">{user?.name || "Not set"}</p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-black/20 p-5">
            <p className="text-xs uppercase tracking-[3px] text-gray-500">
              Email
            </p>
            <p className="mt-2 text-lg text-white">
              {user?.email || "Not set"}
            </p>
          </div>
        </div>

        <div className="mt-8 flex flex-wrap gap-3">
          <Link
            href="/bookings"
            className="rounded-2xl bg-gradient-to-r from-cyan-300 to-blue-500 px-6 py-3 font-bold text-black"
          >
            View Bookings
          </Link>

          <Link
            href="/"
            className="rounded-2xl border border-white/10 bg-white/10 px-6 py-3 font-bold text-white"
          >
            Home
          </Link>
        </div>
      </section>
    </main>
  );
}
