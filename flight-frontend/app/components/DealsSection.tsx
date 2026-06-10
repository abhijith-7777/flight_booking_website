"use client";

const deals = [
  {
    city: "Egypt",
    route: "DXB → SPX",
    price: "$450",
    image:
      "https://images.unsplash.com/photo-1572252009286-268acec5ca0a?q=80&w=1200&auto=format&fit=crop",
  },
  {
    city: "Istanbul",
    route: "DXB → IST",
    price: "$390",
    image:
      "https://images.unsplash.com/photo-1527838832700-5059252407fa?q=80&w=1200&auto=format&fit=crop",
  },
  {
    city: "Colombia",
    route: "DXB → COL",
    price: "$1665",
    image:
      "https://images.unsplash.com/photo-1539037116277-4db20889f2d4?q=80&w=1200&auto=format&fit=crop",
  },
];

export default function DealsSection() {
  return (
    <section className="relative z-20 bg-gray-300 text-black max-w-7xl mx-auto px-6 pb-28">

      <div className="flex items-center justify-between mb-14">

        <h1 className="text-5xl font-black leading-none">
          Round &
          <span className="block text-black/40">
            multicity deals
          </span>
        </h1>

        <button className="text-gray-600 hover:text-white transition">
          More deals →
        </button>

      </div>

      <div className="grid lg:grid-cols-3 gap-8">

        {deals.map((deal, index) => (
          <div
            key={index}
            className="group relative overflow-hidden rounded-[35px] h-[420px]"
          >

            <img
              src={deal.image}
              className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition duration-700"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

            <div className="relative z-10 h-full flex flex-col justify-between p-8">

              <div>
                <p className="text-sm text-cyan-300 mb-4">
                  {deal.route}
                </p>

                <h2 className="text-5xl font-black mb-3">
                  {deal.city}
                </h2>

                <p className="text-gray-300">
                  Book flights with premium experiences.
                </p>
              </div>

              <div className="flex items-center justify-between">

                <div className="px-5 py-3 rounded-2xl bg-white/10 border border-white/10 backdrop-blur-xl">
                  {deal.price}
                </div>

                <button className="w-16 h-16 rounded-full bg-white/10 border border-white/10 backdrop-blur-xl text-2xl hover:bg-white hover:text-black transition-all">
                  ↗
                </button>

              </div>

            </div>

          </div>
        ))}

      </div>

    </section>
  );
}
