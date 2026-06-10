// app/search-results/page.tsx

"use client";

import {
  useSearchParams,
  useRouter,
} from "next/navigation";

import {
  useEffect,
  useState,
} from "react";

export default function SearchResultsPage() {
  const params = useSearchParams();

  const router = useRouter();

  // STATES
  const [from, setFrom] = useState(
    params.get("from") || ""
  );

  const [to, setTo] = useState(
    params.get("to") || ""
  );

  const [date, setDate] = useState(
    params.get("date") || ""
  );

  const [flights, setFlights] = useState<any[]>([]);

  const [loading, setLoading] = useState(true);

  // FETCH FLIGHTS
  const fetchFlights = () => {
    setLoading(true);

    fetch(
      `http://localhost:8000/search-flights?from_city=${from}&to_city=${to}`
    )
      .then((res) => res.json())
      .then((data) => {
        setFlights(data);

        setLoading(false);
      })
      .catch((err) => {
        console.log(err);

        setLoading(false);
      });
  };

  useEffect(() => {
    fetchFlights();
  }, []);

  return (
    <div className="min-h-screen relative overflow-hidden bg-[#0b1220]">

      {/* DARK CLOUD BACKGROUND */}
      <div className="absolute inset-0">

        <img
          src="https://images.unsplash.com/photo-1517479149777-5f3b1511d5ad?q=80&w=2070&auto=format&fit=crop"
          className="w-full h-full object-cover opacity-30"
        />

        <div className="absolute inset-0 bg-[#081120]/80" />

      </div>

      {/* CONTENT */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 pt-40 pb-20">

        {/* MAIN CARD */}
        <div className="bg-white/95 backdrop-blur-2xl rounded-[40px] shadow-2xl overflow-hidden">

          {/* CONTENT */}
          <div className="p-10">

            {/* SEARCH FORM */}
            <div className="grid grid-cols-5 gap-4 mb-12">

              {/* FROM */}
              <div>

                <p className="text-sm text-gray-500 mb-2">
                  From
                </p>

                <div className="bg-[#f4f6fb] rounded-2xl p-4">

                  <input
                    value={from}
                    onChange={(e) =>
                      setFrom(e.target.value)
                    }
                    placeholder="DEL"
                    className="w-full bg-transparent outline-none text-[#1e2a78] font-black text-3xl uppercase"
                  />

                  <p className="text-gray-500 text-sm mt-1">

                    Departure Airport

                  </p>

                </div>

              </div>

              {/* TO */}
              <div>

                <p className="text-sm text-gray-500 mb-2">
                  To
                </p>

                <div className="bg-[#f4f6fb] rounded-2xl p-4">

                  <input
                    value={to}
                    onChange={(e) =>
                      setTo(e.target.value)
                    }
                    placeholder="DXB"
                    className="w-full bg-transparent outline-none text-[#1e2a78] font-black text-3xl uppercase"
                  />

                  <p className="text-gray-500 text-sm mt-1">

                    Destination Airport

                  </p>

                </div>

              </div>

              {/* DATE */}
              <div>

                <p className="text-sm text-gray-500 mb-2">
                  Departure Date
                </p>

                <div className="bg-[#f4f6fb] rounded-2xl p-4">

                  <input
                    type="date"
                    value={date}
                    onChange={(e) =>
                      setDate(e.target.value)
                    }
                    className="w-full bg-transparent outline-none text-[#1e2a78] font-black text-lg"
                  />

                  <p className="text-gray-500 text-sm mt-2">

                    Premium Flight

                  </p>

                </div>

              </div>

              {/* TRAVELERS */}
              <div>

                <p className="text-sm text-gray-500 mb-2">
                  Travelers
                </p>

                <div className="bg-[#f4f6fb] rounded-2xl p-4">

                  <h2 className="text-[#1e2a78] font-black text-2xl">

                    2 Adults

                  </h2>

                  <p className="text-gray-500 text-sm mt-1">

                    Economy

                  </p>

                </div>

              </div>

              {/* BUTTON */}
              <div className="flex items-end">

                <button
                  onClick={fetchFlights}
                  className="w-full bg-[#2563eb] hover:bg-blue-700 transition text-white font-bold py-4 rounded-2xl shadow-lg"
                >

                  Search Flight

                </button>

              </div>

            </div>

            {/* FILTERS */}
            <div className="flex items-center gap-6 text-[#1e2a78] font-medium mb-12">

              <button className="flex items-center gap-2">

                🔵 One Way

              </button>

              <button className="text-gray-400">

                Return

              </button>

              <button className="text-gray-400">

                Multi City

              </button>

              <button>

                1 Adult

              </button>

              <button>

                Economy

              </button>

            </div>


           

            {/* LOADING */}
            {loading && (

              <div className="bg-[#f4f6fb] rounded-[35px] p-12 text-center">

                <h2 className="text-3xl font-black text-[#1e2a78]">

                  Loading Flights...

                </h2>

              </div>

            )}

            {/* NO FLIGHTS */}
            {!loading && flights.length === 0 && (

              <div className="bg-[#f4f6fb] rounded-[35px] p-12 text-center">

                <h2 className="text-4xl font-black text-[#1e2a78] mb-4">

                  No Flights Found

                </h2>

                <p className="text-gray-500 text-lg">

                  Try another route.

                </p>

              </div>

            )}

            {/* FLIGHTS */}
            <div className="space-y-8">

              {flights.map((flight) => (

                <div
                  key={flight.id}
                  className="bg-[#f8faff] border border-gray-100 rounded-[35px] p-8 shadow-lg hover:shadow-2xl transition-all"
                >

                  <div className="grid lg:grid-cols-5 gap-8 items-center">

                    {/* AIRLINE */}
                    <div>

                      <h2 className="text-4xl font-black text-[#1e2a78] mb-3">

                        {flight.airline}

                      </h2>

                      <p className="text-gray-400">

                        Premium Airline

                      </p>

                    </div>

                    {/* SOURCE */}
                    <div className="text-center">

                      <h2 className="text-4xl font-black text-[#1e2a78] uppercase">

                        {flight.source}

                      </h2>

                      <p className="text-gray-400 mt-2">

                        Departure

                      </p>

                    </div>

                    {/* PLANE */}
                    <div className="text-center">

                      <div className="text-5xl mb-3">

                        ✈️

                      </div>

                      <p className="text-gray-400">

                        Non Stop

                      </p>

                    </div>

                    {/* DESTINATION */}
                    <div className="text-center">

                      <h2 className="text-4xl font-black text-[#1e2a78] uppercase">

                        {flight.destination}

                      </h2>

                      <p className="text-gray-400 mt-2">

                        Arrival

                      </p>

                    </div>

                    {/* PRICE */}
                    <div className="text-right">

                      <h2 className="text-5xl font-black text-[#2563eb] mb-5">

                        ₹{flight.price}

                      </h2>

                      <button
                        onClick={() =>
                          router.push(`/seats/${flight.id}`)
                        }
                        className="bg-[#2563eb] hover:bg-blue-700 transition text-white font-bold px-8 py-4 rounded-2xl shadow-lg"
                      >

                        Book Now

                      </button>

                    </div>

                  </div>

                </div>

              ))}

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}