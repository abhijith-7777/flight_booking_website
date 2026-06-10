"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export default function CheckoutPage() {
  const params = useSearchParams();
  const router = useRouter();

  const flightId = params.get("flight_id");
  const seat = params.get("seat");

  const [flight, setFlight] = useState<any>(null);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [passport, setPassport] = useState("");

  useEffect(() => {
    fetch("http://localhost:8000/flights")
      .then((res) => res.json())
      .then((data) => {
        const found = data.find(
          (f: any) => f.id == flightId
        );

        setFlight(found);
      });
  }, [flightId]);

  const confirmBooking = async () => {
    const user = JSON.parse(
      localStorage.getItem("user") || "{}"
    );

    const res = await fetch(
      "http://localhost:8000/book",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user_id: user.id,
          flight_id: Number(flightId),
          seat_number: seat,
        }),
      }
    );

    const data = await res.json();

    if (data.success) {
      router.push(
        `/confirmation?booking_id=${data.data.booking_id}&seat=${seat}`
      );
    } else {
      alert(data.error);
    }
  };

  if (!flight) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white">
        Loading...
      </div>
    );
  }

  const tax = 850;
  const total = flight.price + tax;

  return (
    <div className="min-h-screen bg-[#060816] text-white px-6 py-10">

      {/* Background Glow */}
      <div className="absolute top-[-100px] left-[-100px] w-[400px] h-[400px] bg-cyan-500/20 blur-3xl rounded-full" />
      <div className="absolute bottom-[-100px] right-[-100px] w-[400px] h-[400px] bg-purple-500/20 blur-3xl rounded-full" />

      <div className="relative z-10 max-w-6xl mx-auto grid lg:grid-cols-3 gap-8">

        {/* LEFT */}
        <div className="lg:col-span-2 space-y-6">

          {/* Flight Card */}
          <div className="bg-white/5 border border-white/10 rounded-[35px] p-8 backdrop-blur-2xl">

            <div className="flex items-center justify-between mb-8">

              <div>
                <p className="text-gray-400 mb-2">
                  Departure
                </p>

                <h1 className="text-6xl font-black">
                  {flight.source}
                </h1>
              </div>

              <div className="flex flex-col items-center min-w-[180px]">

                <p className="text-cyan-300 text-sm mb-3">
                  NON STOP
                </p>

                <div className="flex items-center gap-3 w-full">
                  <div className="flex-1 h-[2px] bg-cyan-400" />
                  <span className="text-3xl">
                    ✈️
                  </span>
                  <div className="flex-1 h-[2px] bg-blue-500" />
                </div>

                <p className="text-gray-500 text-sm mt-3">
                  10:00 AM • 2h 30m
                </p>

              </div>

              <div className="text-right">
                <p className="text-gray-400 mb-2">
                  Arrival
                </p>

                <h1 className="text-6xl font-black">
                  {flight.destination}
                </h1>
              </div>

            </div>

            {/* Details */}
            <div className="grid md:grid-cols-3 gap-5">

              <div className="bg-white/5 rounded-2xl border border-white/10 p-5">
                <p className="text-gray-400 text-sm mb-2">
                  Date
                </p>

                <h2 className="text-xl font-bold">
                  25 May 2026
                </h2>
              </div>

              <div className="bg-white/5 rounded-2xl border border-white/10 p-5">
                <p className="text-gray-400 text-sm mb-2">
                  Departure Time
                </p>

                <h2 className="text-xl font-bold">
                  10:00 AM
                </h2>
              </div>

              <div className="bg-white/5 rounded-2xl border border-white/10 p-5">
                <p className="text-gray-400 text-sm mb-2">
                  Seat
                </p>

                <h2 className="text-xl font-bold text-cyan-300">
                  {seat}
                </h2>
              </div>

            </div>

          </div>

          {/* Passenger */}
          <div className="bg-white/5 border border-white/10 rounded-[35px] p-8 backdrop-blur-2xl">

            <h2 className="text-3xl font-black mb-6">
              Passenger Details
            </h2>

            <div className="grid md:grid-cols-2 gap-5">

              <input
  value={name}
  onChange={(e) => setName(e.target.value)}
  placeholder="Full Name"
  className="bg-white/5 border border-white/10 rounded-2xl p-5 outline-none"
/>

              <input
  value={email}
  onChange={(e) => setEmail(e.target.value)}
  placeholder="Email"
  className="bg-white/5 border border-white/10 rounded-2xl p-5 outline-none"
/>

              <input
  value={phone}
  onChange={(e) => setPhone(e.target.value)}
  placeholder="Phone Number"
  className="bg-white/5 border border-white/10 rounded-2xl p-5 outline-none"
/>

              <input
  value={passport}
  onChange={(e) => setPassport(e.target.value)}
  placeholder="Passport / ID"
  className="bg-white/5 border border-white/10 rounded-2xl p-5 outline-none"
/>

            </div>

          </div>

        </div>

        {/* RIGHT */}
        <div className="space-y-6">

          {/* Payment Summary */}
          <div className="bg-white/5 border border-white/10 rounded-[35px] p-8 backdrop-blur-2xl sticky top-28">

            <h2 className="text-3xl font-black mb-8">
              Payment Summary
            </h2>

            <div className="space-y-5">

              <div className="flex justify-between">
                <span className="text-gray-400">
                  Flight Fare
                </span>

                <span>
                  ₹{flight.price}
                </span>
              </div>

              <div className="flex justify-between">
                <span className="text-gray-400">
                  Taxes & Fees
                </span>

                <span>
                  ₹{tax}
                </span>
              </div>

              <div className="border-t border-white/10 pt-5 flex justify-between text-2xl font-black">

                <span>Total</span>

                <span className="text-cyan-300">
                  ₹{total}
                </span>

              </div>

            </div>

            {/* Fake Cards */}
            <div className="mt-8 flex gap-3">

              <div className="flex-1 h-14 rounded-2xl bg-gradient-to-r from-yellow-300 to-orange-400" />

              <div className="flex-1 h-14 rounded-2xl bg-gradient-to-r from-cyan-300 to-blue-500" />

            </div>

            <button
              onClick={() => {

  if (!name || !email || !phone) {
    alert("Please fill all details");
    return;
  }

  const bookingData = {
    flightId,
    seat,
    name,
    email,
    phone,
    passport,
    airline: flight.airline,
    source: flight.source,
    destination: flight.destination,
    price: total,
  };

  localStorage.setItem(
    "bookingData",
    JSON.stringify(bookingData)
  );

  router.push("/payment");

}}
              className="w-full mt-8 py-5 rounded-2xl bg-gradient-to-r from-cyan-300 to-blue-500 text-black font-black text-lg hover:scale-[1.02] transition"
            >
              Pay & Confirm Booking
            </button>

          </div>

        </div>

      </div>

    </div>
  );
}