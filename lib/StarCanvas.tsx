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

  {/* Blue horizon glow */}
  <div
    className="absolute bottom-0 inset-x-0 h-[40%] pointer-events-none z-[2]"
    style={{
      background:
        "radial-gradient(ellipse 80% 120% at 50% 100%, rgba(37,99,235,0.35) 0%, rgba(37,99,235,0.18) 35%, transparent 70%)",
    }}
  />

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
