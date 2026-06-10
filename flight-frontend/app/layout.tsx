"use client";

import "./globals.css";

import {
  usePathname,
} from "next/navigation";

import Navbar from "@/app/components/Navbar";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  const pathname = usePathname();

  const hideNavbar =
  pathname.startsWith("/seats") ||
  pathname.startsWith("/confirmation") ||
  pathname.startsWith("/checkout") ||
  pathname.startsWith("/payment");


  return (
    <html lang="en">

      <body className="overflow-x-hidden">

        {!hideNavbar && <Navbar />}

        {children}

      </body>

    </html>
  );
}

