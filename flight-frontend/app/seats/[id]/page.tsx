// app/seats/[id]/page.tsx

"use client";

import { useEffect, useState } from "react";

import { useParams, useRouter } from "next/navigation";

export default function SeatsPage() {
  const { id } = useParams();

  const router = useRouter();

  const [seats, setSeats] = useState<any[]>([]);

  const [flight, setFlight] = useState<any>(null);

  const [selectedSeats, setSelectedSeats] = useState<string[]>([]);

  const [error, setError] = useState("");

  // FETCH DATA
  useEffect(() => {
    // SEATS
    fetch(`http://localhost:8000/seats/${id}`)
      .then((res) => res.json())
      .then((data) => setSeats(data))
      .catch(() => setError("Failed to load seats"));

    // FLIGHT
    fetch(`http://localhost:8000/flights/${id}`)
      .then((res) => res.json())
      .then((data) => setFlight(data));
  }, [id]);

  // SELECT SEAT
  const toggleSeat = (seat: any) => {
    if (seat.is_booked) return;

    if (selectedSeats.includes(seat.seat_number)) {
      setSelectedSeats(selectedSeats.filter((s) => s !== seat.seat_number));
    } else {
      setSelectedSeats([...selectedSeats, seat.seat_number]);
    }
  };

  // CONTINUE
  const continueBooking = () => {
    if (selectedSeats.length === 0) {
      setError("Select at least one seat");

      return;
    }

    router.push(`/checkout?flight_id=${id}&seat=${selectedSeats.join(",")}`);
  };

  return (
    <div className="min-h-screen bg-[#e9e6ff] px-6 py-10 overflow-hidden">
      {/* TITLE */}
      <h1 className="text-5xl font-black text-[#16113a] mb-10">Choose Seats</h1>

      {/* MAIN */}
      <div className="grid lg:grid-cols-[380px_1fr] gap-10 max-w-7xl mx-auto">
        {/* LEFT */}
        <div className="space-y-6">
          {/* FLIGHT CARD */}
          <div className="bg-white rounded-[35px] p-7 shadow-lg">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-black text-[#16113a]">
                Your Flight
              </h2>

              <button className="w-10 h-10 rounded-full border flex items-center justify-center">
                ↑
              </button>
            </div>

            {/* ROUTE */}
            <div className="grid grid-cols-2 gap-6 mb-8">
              <div>
                <p className="text-gray-400 mb-2">Departure</p>

                <h2 className="font-black text-xl text-[#16113a] uppercase">
                  {flight?.source}
                </h2>
              </div>

              <div className="text-right">
                <p className="text-gray-400 mb-2">Arrival</p>

                <h2 className="font-black text-xl text-[#16113a] uppercase">
                  {flight?.destination}
                </h2>
              </div>
            </div>

            {/* DATE */}
            <div className="grid grid-cols-2 gap-6 mb-8">
              <div>
                <p className="text-gray-400 mb-2">Date</p>

                <h2 className="font-black text-xl text-[#16113a]">
                  15 Sep 2026
                </h2>
              </div>

              <div className="text-right">
                <p className="text-gray-400 mb-2">Quantity</p>

                <h2 className="font-black text-xl text-[#16113a]">
                  {selectedSeats.length || 1} people
                </h2>
              </div>
            </div>

            {/* INNER CARD */}
            <div className="border rounded-[30px] p-6">
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-5xl font-black text-[#2563eb]">
                  {flight?.airline}
                </h2>

                <button className="bg-[#16113a] text-white px-6 py-3 rounded-full font-semibold">
                  Details
                </button>
              </div>

              {/* TIMES */}
              <div className="grid grid-cols-3 items-center mb-8">
                <div>
                  <h2 className="font-black text-xl uppercase">
                    {flight?.source}
                  </h2>

                  <p className="text-gray-400">08:30</p>
                </div>

                <div className="text-center">
                  <p className="text-gray-400">12 Hours</p>

                  <div className="h-[2px] bg-gray-200 my-2" />

                  <p className="text-gray-400">Non Stop</p>
                </div>

                <div className="text-right">
                  <h2 className="font-black text-xl uppercase">
                    {flight?.destination}
                  </h2>

                  <p className="text-gray-400">12:00</p>
                </div>
              </div>

              {/* CLASS */}
              <div className="flex items-center gap-4 bg-[#f6f6ff] rounded-[25px] p-4">
                <img
                  src="https://images.unsplash.com/photo-1540339832862-474599807836?q=80&w=800&auto=format&fit=crop"
                  className="w-20 h-20 rounded-2xl object-cover"
                />

                <div>
                  <h2 className="font-black text-xl text-[#16113a]">
                    Economy Class
                  </h2>

                  <p className="text-gray-400">Premium Comfort</p>
                </div>
              </div>
            </div>
          </div>

          {/* TRANSACTION */}
          <div className="bg-white rounded-[35px] p-7 shadow-lg">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-black text-[#16113a]">
                Transaction Details
              </h2>
            </div>

            <div className="grid grid-cols-3 gap-6 mb-8">
              <div>
                <p className="text-gray-400 mb-2">Quantity</p>

                <h2 className="font-black text-lg">
                  {selectedSeats.length || 1}
                </h2>
              </div>

              <div>
                <p className="text-gray-400 mb-2">Class</p>

                <h2 className="font-black text-lg">Economy</h2>
              </div>

              <div>
                <p className="text-gray-400 mb-2">Seats</p>

                <h2 className="font-black text-lg">
                  {selectedSeats.join(", ") || "--"}
                </h2>
              </div>
            </div>

            {/* TOTAL */}
            <div className="border-t pt-6 flex items-center justify-between">
              <p className="text-gray-400 text-lg">Grand Total</p>

              <h2 className="text-5xl font-black text-[#2563eb]">
                ₹
                {(
                  (selectedSeats.length || 1) * (flight?.price || 4500)
                ).toLocaleString()}
              </h2>
            </div>
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className="relative flex justify-center">
          {/* AIRPLANE BODY */}
          <div className="relative bg-[#f8f8ff] w-[620px] min-h-[980px] rounded-t-[320px] rounded-b-[60px] shadow-xl overflow-hidden border border-[#ececff]">
            {/* COCKPIT */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[340px] h-[180px] bg-[#ececf7] rounded-b-[220px]" />

            {/* WINDOWS */}
            <div className="absolute top-[50px] left-[70px] w-[70px] h-[140px] bg-[#ececf7] rounded-full rotate-[18deg]" />

            <div className="absolute top-[50px] right-[70px] w-[70px] h-[140px] bg-[#ececf7] rounded-full rotate-[-18deg]" />

            {/* CONTENT */}
            <div className="relative z-10 pt-56 px-10 pb-10">
              {/* TITLE */}
              <div className="text-center mb-8">
                <h2 className="text-3xl font-black text-[#16113a] mb-5">
                  Economy Class
                </h2>

                {/* LEGEND */}
                <div className="flex items-center justify-center gap-8">
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 rounded border-2 border-orange-400" />

                    <p className="text-gray-500">Available</p>
                  </div>

                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 rounded bg-gray-300" />

                    <p className="text-gray-500">Booked</p>
                  </div>

                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 rounded bg-[#2563eb]" />

                    <p className="text-gray-500">Selected</p>
                  </div>
                </div>
              </div>

              {/* SEAT ROWS */}
              <div className="space-y-6">
                {Array.from({
                  length: Math.ceil(seats.length / 6),
                }).map((_, rowIndex) => {
                  const rowSeats = seats.slice(rowIndex * 6, rowIndex * 6 + 6);

                  return (
                    <div
                      key={rowIndex}
                      className="flex justify-center items-center gap-10"
                    >
                      {/* LEFT */}
                      <div className="flex gap-4">
                        {rowSeats
                          .slice(0, 3)
                          .map((seat: any, index: number) => {
                            const isSelected = selectedSeats.includes(
                              seat.seat_number,
                            );

                            const isBooked = seat.is_booked;

                            return (
                              <button
                                key={`${seat.seat_number}-${seat.id}-${index}`}
                                onClick={() => toggleSeat(seat)}
                                disabled={isBooked}
                                className={`
                                    w-16 h-16 rounded-2xl font-black text-lg transition-all shadow-md
                                    ${
                                      isBooked
                                        ? "bg-[#d9dce7] text-gray-600 cursor-not-allowed"
                                        : isSelected
                                          ? "bg-[#2563eb] text-white scale-105"
                                          : "border-2 border-orange-400 text-[#16113a] hover:bg-orange-50"
                                    }
                                  `}
                              >
                                {seat.seat_number}
                              </button>
                            );
                          })}
                      </div>

                      {/* AISLE */}
                      <div className="w-10" />

                      {/* RIGHT */}
                      <div className="flex gap-4">
                        {rowSeats
                          .slice(3, 6)
                          .map((seat: any, index: number) => {
                            const isSelected = selectedSeats.includes(
                              seat.seat_number,
                            );

                            const isBooked = seat.is_booked;

                            return (
                              <button
                                key={`${seat.seat_number}-${seat.id}-${index}`}
                                onClick={() => toggleSeat(seat)}
                                disabled={isBooked}
                                className={`
                                    w-16 h-16 rounded-2xl font-black text-lg transition-all shadow-md
                                    ${
                                      isBooked
                                        ? "bg-[#d9dce7] text-gray-600 cursor-not-allowed"
                                        : isSelected
                                          ? "bg-[#2563eb] text-white scale-105"
                                          : "border-2 border-orange-400 text-[#16113a] hover:bg-orange-50"
                                    }
                                  `}
                              >
                                {seat.seat_number}
                              </button>
                            );
                          })}
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* BUTTON */}
              <div className="mt-14 flex justify-center">
                <button
                  onClick={continueBooking}
                  className="bg-[#2563eb] hover:bg-blue-700 transition text-white font-black px-20 py-5 rounded-full text-xl shadow-xl"
                >
                  Continue Booking
                </button>
              </div>

              {/* ERROR */}
              {error && (
                <div className="mt-6 text-center text-red-500 font-semibold">
                  {error}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
