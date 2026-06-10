"use client";

const destinations = [
  {
    city: "Paris, France",
    route: "DXB → CDG",
    image:
      "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?q=80&w=1200&auto=format&fit=crop",
  },
  {
    city: "Rome, Italy",
    route: "DXB → ROM",
    image:
      "https://images.unsplash.com/photo-1552832230-c0197dd311b5?q=80&w=1200&auto=format&fit=crop",
  },
  {
    city: "Spain, Andalusia",
    route: "DXB → AGP",
    image:
      "https://images.unsplash.com/photo-1543783207-ec64e4d95325?q=80&w=1200&auto=format&fit=crop",
  },
];

export default function PopularDestinations() {
  return (
    <section className="relative z-20 bg-gray-300 text-black rounded-t-[60px] max-w-7xl mx-auto px-6 py-28">

      <div className="flex items-center justify-between mb-14">

        <div>
          <h1 className="text-5xl font-black leading-none mb-4">
            Popular
            <span className="block text-black/40">
              destinations
            </span>
          </h1>
        </div>

        <button className="text-gray-600 hover:text-white transition">
          More destinations →
        </button>

      </div>

      <div className="flex flex-wrap gap-4 mb-12">

        <div className="px-6 py-4 rounded-2xl bg-gray-100 border border-gray-200 backdrop-blur-xl">
          Any City
        </div>

        <div className="px-6 py-4 rounded-2xl bg-gray-100 border border-gray-200 backdrop-blur-xl">
          $200 - $1500
        </div>

        <div className="px-6 py-4 rounded-2xl bg-gray-100 border border-gray-200 backdrop-blur-xl">
          06:00 AM - 12:00 PM
        </div>

      </div>

      <div className="grid lg:grid-cols-3 gap-8">

        {destinations.map((item, index) => (
          <div
            key={index}
            className="group relative overflow-hidden rounded-[35px] h-[460px]"
          >

            <img
              src={item.image}
              className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition duration-700"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

            <div className="relative z-10 h-full flex flex-col justify-between p-8">

              <div>
                <p className="text-sm text-cyan-300 mb-4">
                  {item.route}
                </p>

                <h2 className="text-4xl font-black max-w-[220px] leading-tight">
                  {item.city}
                </h2>
              </div>

              <button className="w-full py-5 rounded-2xl bg-white text-black font-black hover:scale-[1.02] transition-all">
                Search Flights
              </button>

            </div>

          </div>
        ))}

      </div>

    </section>
  );
}
