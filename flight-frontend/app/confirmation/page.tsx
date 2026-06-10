"use client";

import { useSearchParams } from "next/navigation";
import { QRCodeCanvas } from "qrcode.react";

export default function ConfirmationPage() {
  const params = useSearchParams();

  const bookingId =
    params.get("booking_id") || "SKY12345";

  const flightId =
    params.get("flight_id") || "N/A";

  const seat =
    params.get("seat") || "N/A";

  const pnr =
    params.get("pnr") ||
    "SKY" + String(bookingId).padStart(5, "0");

  return (
    <div className="min-h-screen bg-[#07111f] text-white px-4 py-10">

      {/* Glow */}
      <div className="fixed top-0 left-0 w-96 h-96 bg-cyan-500/10 blur-3xl rounded-full" />
      <div className="fixed bottom-0 right-0 w-96 h-96 bg-blue-500/10 blur-3xl rounded-full" />

      <div className="relative max-w-5xl mx-auto">

        {/* Success */}
        <div className="text-center mb-10">

          <div className="text-7xl mb-4">
            🎉
          </div>

          <h1 className="text-5xl font-black text-green-400">

            Booking Confirmed

          </h1>

          <p className="text-gray-400 mt-3">

            Your flight ticket has been generated successfully

          </p>

        </div>

        {/* Ticket */}
        <div className="bg-white/5 border border-white/10 rounded-[40px] overflow-hidden backdrop-blur-xl">

          {/* Header */}
          <div className="bg-gradient-to-r from-cyan-500 to-blue-600 p-8">

            <div className="flex flex-col md:flex-row justify-between items-center">

              <div>

                <h2 className="text-4xl font-black">

                  SKYBOOK AIRLINES

                </h2>

                <p className="opacity-90">

                  Digital Boarding Pass

                </p>

              </div>

              <div className="text-right mt-4 md:mt-0">

                <p className="text-sm opacity-80">
                  PNR
                </p>

                <h3 className="text-3xl font-black">
                  {pnr}
                </h3>

              </div>

            </div>

          </div>

          {/* Content */}
          <div className="grid lg:grid-cols-3 gap-8 p-8">

            {/* Left */}
            <div className="lg:col-span-2">

              <div className="grid md:grid-cols-2 gap-6">

                <div className="bg-white/5 rounded-3xl p-6">

                  <p className="text-gray-400 mb-2">
                    Booking ID
                  </p>

                  <h3 className="text-2xl font-bold">
                    {bookingId}
                  </h3>

                </div>

                <div className="bg-white/5 rounded-3xl p-6">

                  <p className="text-gray-400 mb-2">
                    Flight ID
                  </p>

                  <h3 className="text-2xl font-bold">
                    {flightId}
                  </h3>

                </div>

                <div className="bg-white/5 rounded-3xl p-6">

                  <p className="text-gray-400 mb-2">
                    Seat Number
                  </p>

                  <h3 className="text-2xl font-bold text-cyan-300">
                    {seat}
                  </h3>

                </div>

                <div className="bg-white/5 rounded-3xl p-6">

                  <p className="text-gray-400 mb-2">
                    Status
                  </p>

                  <h3 className="text-2xl font-bold text-green-400">
                    Confirmed
                  </h3>

                </div>

              </div>

              {/* Route */}
              <div className="mt-8 bg-white/5 rounded-3xl p-8">

                <div className="flex items-center justify-between">

                  <div>

                    <p className="text-gray-400">
                      Departure
                    </p>

                    <h2 className="text-5xl font-black">
                      DEL
                    </h2>

                  </div>

                  <div className="text-center">

                    <div className="text-5xl">
                      ✈️
                    </div>

                    <p className="text-cyan-300 mt-2">
                      NON STOP
                    </p>

                  </div>

                  <div className="text-right">

                    <p className="text-gray-400">
                      Arrival
                    </p>

                    <h2 className="text-5xl font-black">
                      DXB
                    </h2>

                  </div>

                </div>

              </div>

            </div>

            {/* QR */}
            <div>

              <div className="bg-white rounded-3xl p-6 flex flex-col items-center">

                <QRCodeCanvas
                  value={`${pnr}-${seat}-${bookingId}`}
                  size={220}
                />

                <h3 className="text-black font-bold mt-4">
                  Boarding Pass QR
                </h3>

              </div>

              <button
                onClick={() =>
                  window.print()
                }
                className="w-full mt-6 py-4 rounded-2xl bg-gradient-to-r from-cyan-400 to-blue-500 text-black font-black"
              >

                Download Ticket PDF

              </button>

              <button
                onClick={() =>
                  window.location.href = "/"
                }
                className="w-full mt-4 py-4 rounded-2xl border border-white/20"
              >

                Back To Home

              </button>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}
