"use client";

const clients = [
  "CLIENT 1",
  "CLIENT 2",
  "CLIENT 3",
  "CLIENT 4",
  "CLIENT 5",
  "CLIENT 6",
];

export default function Clients() {
  const allClients = [...clients, ...clients];

  return (
    <section className="py-16 overflow-hidden bg-[#050612]">
      
      {/* Title */}
      <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-center mb-10 text-white">
        Our <span className="text-[#0059FF]">Clients</span>
      </h2>

      {/* Gradient fade on the sides */}
      <div
        className="overflow-hidden"
        style={{
          maskImage:
            "linear-gradient(to right, transparent, black 15%, black 85%, transparent)",
          WebkitMaskImage:
            "linear-gradient(to right, transparent, black 15%, black 85%, transparent)",
        }}
      >
        {/* Moving row */}
        <div className="flex w-max gap-8 md:gap-12 whitespace-nowrap animate-marquee">

          {allClients.map((client, index) => (
            <div
              key={index}
              className="flex items-center gap-2 text-white font-semibold text-base md:text-base"
            >
              <span>{client}</span>
              <span className="text-blue-600">✦</span>
            </div>
          ))}

        </div>
      </div>

    </section>
  );
}