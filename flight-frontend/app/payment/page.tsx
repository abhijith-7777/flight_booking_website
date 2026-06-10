// app/payment/page.tsx

"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import Script from "next/script";

export default function PaymentPage() {
  const router = useRouter();

  const [booking, setBooking] = useState<any>(null);

  const [flightId, setFlightId] = useState("");

  const [seat, setSeat] = useState("");

  const [flight, setFlight] = useState<any>(null);

  const [timeLeft, setTimeLeft] = useState(600);

  // Timer
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);

          alert("Session Expired");

          router.push("/");

          return 0;
        }

        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Fetch Flight
  useEffect(() => {
    const data = localStorage.getItem("bookingData");

    if (!data) return;

    const bookingData = JSON.parse(data);

    setBooking(bookingData);

    setFlightId(bookingData.flightId);

    setSeat(bookingData.seat);

    fetch("http://localhost:8000/flights")
      .then((res) => res.json())
      .then((data) => {
        const found = data.find((f: any) => f.id == bookingData.flightId);

        setFlight(found);
      });
  }, []);

  // Time Format
  const minutes = Math.floor(timeLeft / 60);

  const seconds = timeLeft % 60;

  // Payment
  const payNow = async () => {
    const user = JSON.parse(localStorage.getItem("user") || "{}");

    if (!user.id) {
      alert("Please login before booking your flight");
      router.push("/login");
      return;
    }

    if (!flight || !flightId || !seat) {
      alert("Booking details are missing. Please select your flight and seat again.");
      router.push("/");
      return;
    }

    try {
      const res = await fetch("http://localhost:8000/create-order", {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          amount: flight.price + 850,
        }),
      });

      const order = await res.json();

      if (!(window as any).Razorpay) {
        alert("Razorpay SDK failed to load");

        return;
      }

      const options = {
        key: "rzp_test_SpxtMp8AwxBH6b", // YOUR KEY

        amount: order.amount,

        currency: order.currency,

        name: "SkyBook Airlines",

        description: "Flight Booking Payment",

        image: "https://cdn-icons-png.flaticon.com/512/870/870143.png",

        order_id: order.id,

        theme: {
          color: "#22d3ee",
        },

        handler: async function (_response: any) {
          // Book Ticket
          const bookingRes = await fetch("http://localhost:8000/book", {
            method: "POST",

            headers: {
              "Content-Type": "application/json",
            },

            body: JSON.stringify({
              user_id: user.id,

              flight_id: Number(flightId),

              seat_number: seat,
            }),
          });

          const bookingData = await bookingRes.json();

          console.log(bookingData);

          if (!bookingRes.ok || !bookingData.success || !bookingData.data) {
            alert(bookingData.detail || bookingData.error || "Booking Failed");

            return;
          }

          const confirmationParams = new URLSearchParams({
            booking_id: String(bookingData.data.booking_id),
            flight_id: String(bookingData.data.flight_id),
            seat: String(bookingData.data.seat),
          });

          if (bookingData.data.pnr) {
            confirmationParams.set("pnr", String(bookingData.data.pnr));
          }

          router.push(`/confirmation?${confirmationParams.toString()}`);
        },
      };

      const razor = new (window as any).Razorpay(options);

      razor.open();
    } catch (error) {
      console.log(error);

      alert("Payment Failed");
    }
  };

  if (!flight) {
    return (
      <div className="h-screen flex items-center justify-center text-white">
        Loading...
      </div>
    );
  }

  return (
    <>
      {/* Razorpay Script */}
      <Script src="https://checkout.razorpay.com/v1/checkout.js" />

      <div className="min-h-screen text-white px-6 py-10 relative overflow-hidden">
        {/* Glow */}
        <div className="absolute top-[-150px] left-[-120px] w-[450px] h-[450px] bg-cyan-500/10 blur-3xl rounded-full" />

        <div className="absolute bottom-[-150px] right-[-120px] w-[450px] h-[450px] bg-purple-500/10 blur-3xl rounded-full" />

        <div className="relative z-10 max-w-7xl mx-auto grid lg:grid-cols-3 gap-8">
          {/* LEFT */}
          <div className="lg:col-span-2 space-y-8">
            {/* Flight Card */}
            <div className="bg-white/5 border border-white/10 rounded-[35px] p-8 backdrop-blur-3xl">
              <div className="flex items-center justify-between mb-8">
                {/* Departure */}
                <div>
                  <p className="text-gray-400 mb-2">Departure</p>

                  <h1 className="text-6xl font-black">{flight.source}</h1>
                </div>

                {/* Plane */}
                <div className="text-center">
                  <div className="text-5xl mb-3">✈️</div>

                  <p className="text-cyan-300">NON STOP</p>
                </div>

                {/* Arrival */}
                <div className="text-right">
                  <p className="text-gray-400 mb-2">Arrival</p>

                  <h1 className="text-6xl font-black">{flight.destination}</h1>
                </div>
              </div>

              {/* Details */}
              <div className="grid md:grid-cols-3 gap-5">
                {/* Airline */}
                <div className="bg-white/5 rounded-2xl p-5 border border-white/10">
                  <p className="text-gray-400 text-sm mb-2">Airline</p>

                  <h2 className="text-2xl font-black">{flight.airline}</h2>
                </div>

                {/* Seat */}
                <div className="bg-white/5 rounded-2xl p-5 border border-white/10">
                  <p className="text-gray-400 text-sm mb-2">Seat</p>

                  <h2 className="text-2xl font-black text-cyan-300">{seat}</h2>
                </div>

                {/* Time */}
                <div className="bg-white/5 rounded-2xl p-5 border border-white/10">
                  <p className="text-gray-400 text-sm mb-2">Departure</p>

                  <h2 className="text-2xl font-black">10:00 AM</h2>
                </div>
              </div>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-[35px] p-8 backdrop-blur-3xl">
              <h2 className="text-3xl font-black mb-8">Passenger Details</h2>

              <div className="grid md:grid-cols-2 gap-5">
                <div>
                  <p className="text-gray-400 mb-2">Full Name</p>

                  <h2 className="text-xl font-bold">{booking?.name}</h2>
                </div>

                <div>
                  <p className="text-gray-400 mb-2">Email</p>

                  <h2 className="text-xl font-bold">{booking?.email}</h2>
                </div>

                <div>
                  <p className="text-gray-400 mb-2">Phone</p>

                  <h2 className="text-xl font-bold">{booking?.phone}</h2>
                </div>

                <div>
                  <p className="text-gray-400 mb-2">Passport</p>

                  <h2 className="text-xl font-bold">{booking?.passport}</h2>
                </div>
              </div>
            </div>

            {/* Payment Methods */}
            <div className="bg-white/5 border border-white/10 rounded-[35px] p-8 backdrop-blur-3xl">
              <h2 className="text-3xl font-black mb-8">Payment Methods</h2>

              <div className="grid md:grid-cols-3 gap-5">
                {/* GPay */}
                <div className="bg-white/5 border border-white/10 rounded-3xl p-6">
                  <div className="text-5xl mb-5">💳</div>

                  <h2 className="text-2xl font-black mb-2">Google Pay</h2>

                  <p className="text-gray-400 text-sm">Fast UPI payments</p>
                </div>

                {/* PhonePe */}
                <div className="bg-white/5 border border-white/10 rounded-3xl p-6">
                  <div className="text-5xl mb-5">📱</div>

                  <h2 className="text-2xl font-black mb-2">PhonePe</h2>

                  <p className="text-gray-400 text-sm">Secure UPI transfer</p>
                </div>

                {/* Cards */}
                <div className="bg-white/5 border border-white/10 rounded-3xl p-6">
                  <div className="text-5xl mb-5">💳</div>

                  <h2 className="text-2xl font-black mb-2">Cards</h2>

                  <p className="text-gray-400 text-sm">Visa & Mastercard</p>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT */}
          <div>
            <div className="sticky top-28 bg-white/5 border border-white/10 rounded-[35px] p-8 backdrop-blur-3xl">
              {/* Timer */}
              <div className="mb-8 text-center">
                <p className="text-gray-400 mb-3">Complete payment within</p>

                <h1 className="text-6xl font-black text-red-400">
                  {minutes}:{seconds.toString().padStart(2, "0")}
                </h1>
              </div>

              {/* Summary */}
              <div className="space-y-5">
                <div className="flex justify-between">
                  <span className="text-gray-400">Flight Fare</span>

                  <span>₹{flight.price}</span>
                </div>

                <div className="flex justify-between">
                  <span className="text-gray-400">Taxes</span>

                  <span>₹850</span>
                </div>

                <div className="border-t border-white/10 pt-5 flex justify-between text-2xl font-black">
                  <span>Total</span>

                  <span className="text-cyan-300">₹{flight.price + 850}</span>
                </div>
              </div>

              {/* Button */}
              <button
                onClick={payNow}
                className="w-full mt-10 py-5 rounded-2xl bg-gradient-to-r from-cyan-300 to-blue-500 text-black font-black text-lg hover:scale-[1.02] transition-all shadow-2xl shadow-cyan-500/20"
              >
                Pay Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
