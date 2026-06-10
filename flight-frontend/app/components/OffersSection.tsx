// app/components/OffersSection.tsx

"use client";

export default function OffersSection() {
  const offers = [
    {
      title: "First Flight Offer",
      discount: "₹1500 OFF",
      code: "FIRST1500",
      color: "from-cyan-300 to-blue-500",
      icon: "✈️",
    },
    {
      title: "Summer Vacation",
      discount: "20% OFF",
      code: "SUMMER20",
      color: "from-purple-400 to-pink-500",
      icon: "🌴",
    },
    {
      title: "International Trip",
      discount: "₹3000 OFF",
      code: "GLOBAL3000",
      color: "from-yellow-300 to-orange-500",
      icon: "🌍",
    },
  ];

  return (
    <section className="relative mt-28 px-6 overflow-hidden">

      {/* Glow */}
      <div className="absolute left-0 top-10 w-[350px] h-[350px] bg-cyan-500/10 blur-3xl rounded-full" />
      <div className="absolute right-0 bottom-0 w-[350px] h-[350px] bg-purple-500/10 blur-3xl rounded-full" />

      <div className="relative z-10 max-w-7xl mx-auto">

        {/* Heading */}
        <div className="text-center mb-16">

          <p className="uppercase tracking-[6px] text-cyan-300 text-sm mb-4">

            Exclusive Deals

          </p>

          <h1 className="text-6xl font-black mb-6">

            Premium Flight
            <span className="block bg-gradient-to-r from-cyan-300 via-blue-400 to-purple-400 bg-clip-text text-transparent">

              Offers & Rewards

            </span>

          </h1>

          <p className="text-gray-400 text-lg max-w-2xl mx-auto">

            Unlock luxury travel experiences with special discounts and exclusive booking rewards.

          </p>

        </div>

        {/* Cards */}
        <div className="grid lg:grid-cols-3 gap-8">

          {offers.map((offer, index) => (
            <div
              key={index}
              className="group relative overflow-hidden rounded-[40px] border border-white/10 bg-white/5 backdrop-blur-2xl p-8 hover:-translate-y-2 transition-all duration-300"
            >

              {/* Gradient Glow */}
              <div className={`absolute inset-0 opacity-20 bg-gradient-to-br ${offer.color}`} />

              {/* Content */}
              <div className="relative z-10">

                {/* Top */}
                <div className="flex items-center justify-between mb-10">

                  <div className={`w-20 h-20 rounded-3xl bg-gradient-to-br ${offer.color} flex items-center justify-center text-4xl shadow-2xl`}>

                    {offer.icon}

                  </div>

                  <div className="bg-white/10 border border-white/10 px-4 py-2 rounded-full text-sm text-cyan-300">

                    Limited Time

                  </div>

                </div>

                {/* Offer */}
                <p className="text-gray-400 text-sm mb-3">

                  {offer.title}

                </p>

                <h2 className="text-5xl font-black mb-6">

                  {offer.discount}

                </h2>

                {/* Coupon */}
                <div className="flex items-center justify-between bg-black/20 border border-dashed border-white/20 rounded-2xl px-5 py-4 mb-8">

                  <div>

                    <p className="text-xs text-gray-500 mb-1">
                      Coupon Code
                    </p>

                    <h3 className="text-xl font-black tracking-[3px]">

                      {offer.code}

                    </h3>

                  </div>

                  <button className="px-5 py-3 rounded-xl bg-white text-black font-bold hover:scale-105 transition-all">

                    Apply

                  </button>

                </div>

                {/* Bottom */}
                <button className={`w-full py-5 rounded-2xl bg-gradient-to-r ${offer.color} text-black font-black text-lg hover:scale-[1.02] transition-all shadow-2xl`}>

                  Book Now

                </button>

              </div>

            </div>
          ))}

        </div>

      </div>

    </section>
  );
}