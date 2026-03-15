"use client";

import Link from "next/link";
import Image from "next/image";
export default function Story() {
  return (
    <section id="about" className="py-15 bg-[#050814] text-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-10 items-center">
          {/* IMAGE */}
          <div className="flex justify-center items-center">
            <div className="relative w-[300px] h-[300px] bg-[#e5e5e5] rounded-xl flex items-center justify-center">
              <Image
                src="/group1.png"
                alt="Kinuit illustration"
                fill
                className="object-contain p-6"
              />
            </div>
          </div>

          {/* Text */}
          <div className="max-w-xl">
            <h2
              className="text-2xl md:text-3xl font-extrabold leading-tight mb-6"
              style={{ fontFamily: "var(--font-lato)" }}
            >
              The <br></br>Story Of{" "}
              <span className="text-blue-500">Kinuit</span>
            </h2>

            {/* underline */}
            <div className="w-16 h-[2px] bg-gray-500 mb-6"></div>

            <p className="text-[#D2DFFF] mb-3 text-sm tracking-wide">
              {" "}
              We Love Creating{" "}
            </p>

            <p
              className="text-white font-light tracking-wider leading-relaxed mb-8 "
              style={{ fontFamily: "var(--font-poppins)" }}
            >
              Kinuit is a team of experts from India, the US, Nigeria, and China
              who work together as one. We joined forces because we believe that
              a great idea should never be held back by a slow partner. By
              connecting our teams across the world, we make sure your project
              keeps moving and stays on track. Whether we are designing your
              look, building your tech, or helping you find customers, we work
              as a single unit focused on your success.
            </p>

            <Link
              href="#"
              className="inline-flex items-center text-white font-medium bg-[#000000] px-6 py-3 border border-white rounded-full hover:border-white hover:bg-white hover:text-black transition"
            >
              Learn More
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
