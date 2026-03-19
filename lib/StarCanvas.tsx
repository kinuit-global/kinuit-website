export default function HeroBackground() {
  return (
    <>
  {/* Radial blue glow */}
  <div
    className="absolute pointer-events-none z-0"
    style={{
      top: "-5%",
      left: "50%",
      transform: "translateX(-50%)",
      width: "1000px",
      height: "700px",
      background:
        "radial-gradient(ellipse 70% 65% at 50% 28%, rgba(37,99,235,0.30) 0%, rgba(37,99,235,0.10) 45%, transparent 72%)",
    }}
  />

  {/* Grid squares */}
  <div
    className="absolute bottom-0 inset-x-0 h-[45%] pointer-events-none z-[1]"
    style={{
      backgroundImage: `
        linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px),
        linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)
      `,
      backgroundSize: "120px 120px",
      maskImage:
        "linear-gradient(to top, rgba(0,0,0,1), rgba(0,0,0,0.6) 40%, transparent 100%)",
    }}
  />

  {/* Blue horizon glow */}
  <div
    className="absolute bottom-0 inset-x-0 h-[40%] pointer-events-none z-[2]"
    style={{
      background:
        "radial-gradient(ellipse 80% 120% at 50% 100%, rgba(37,99,235,0.35) 0%, rgba(37,99,235,0.18) 35%, transparent 70%)",
    }}
  />

  {/* Horizon glowing line */}
  {/* <div
    className="absolute bottom-[40%] left-0 right-0 h-[2px] pointer-events-none z-[3]"
    style={{
      background:
        "linear-gradient(90deg, transparent, #3b82f6, #3b82f6, transparent)",
      boxShadow: "0 0 18px rgba(59,130,246,0.9)",
    }}
  /> */}

  {/* Bottom fade */}
  <div
    className="absolute bottom-0 inset-x-0 h-24 pointer-events-none z-[4]"
    style={{
      background:
        "linear-gradient(to bottom, transparent 0%, #080a18 100%)",
    }}
  />
</>

);
}
