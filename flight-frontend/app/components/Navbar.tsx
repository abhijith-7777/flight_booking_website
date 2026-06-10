"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState, useSyncExternalStore } from "react";

type User = {
  name?: string;
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

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
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

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target as Node)
      ) {
        setIsMenuOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    window.dispatchEvent(new Event("user-auth-change"));
    setIsMenuOpen(false);
    router.push("/login");
  };

  return (
    <div className="fixed top-0 left-0 w-full z-50 px-6 pt-5">

      <div className="max-w-7xl mx-auto flex items-center justify-between px-8 py-5 rounded-[30px] border border-white/10 bg-black/20 backdrop-blur-3xl shadow-2xl">

        <Link href="/">
          <div>
            <h1 className="text-3xl font-black bg-gradient-to-r from-cyan-300 to-blue-500 bg-clip-text text-transparent">
              SkyBook
            </h1>

            <p className="text-[10px] tracking-[4px] text-gray-500 uppercase">
              Premium Air Travel
            </p>
          </div>
        </Link>

        <div className="hidden md:flex items-center gap-10 text-sm text-gray-300">
          <Link href="/">Home</Link>
          <Link href="/bookings">Bookings</Link>
          <Link href="/offers">Offers</Link>
          <Link href="/support">Support</Link>
        </div>

        <div className="flex items-center gap-4">

          {user ? (
            <div className="relative" ref={menuRef}>
              <button
                type="button"
                onClick={() => setIsMenuOpen((current) => !current)}
                className="px-5 py-3 rounded-2xl bg-white/10 border border-white/10 text-white font-semibold hover:bg-white/15 transition"
                aria-expanded={isMenuOpen}
                aria-haspopup="menu"
              >
                {user.name}
              </button>

              {isMenuOpen && (
                <div
                  className="absolute right-0 mt-3 w-48 overflow-hidden rounded-2xl border border-white/10 bg-[#071122]/95 shadow-2xl backdrop-blur-2xl"
                  role="menu"
                >
                  <Link
                    href="/account"
                    onClick={() => setIsMenuOpen(false)}
                    className="block px-5 py-3 text-sm text-gray-200 hover:bg-white/10"
                    role="menuitem"
                  >
                    My Account
                  </Link>

                  <Link
                    href="/bookings"
                    onClick={() => setIsMenuOpen(false)}
                    className="block px-5 py-3 text-sm text-gray-200 hover:bg-white/10"
                    role="menuitem"
                  >
                    Bookings
                  </Link>

                  <button
                    type="button"
                    onClick={handleLogout}
                    className="w-full px-5 py-3 text-left text-sm text-red-300 hover:bg-red-500/10"
                    role="menuitem"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link href="/login">
              <button className="px-6 py-3 rounded-2xl bg-gradient-to-r from-cyan-300 to-blue-500 text-black font-bold">
                Login
              </button>
            </Link>
          )}

        </div>

      </div>

    </div>
  );
}
