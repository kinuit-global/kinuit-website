"use client";
import React, { useEffect, useRef, useState, useMemo } from "react";
import * as THREE from "three";
import { useTheme } from "next-themes";

interface GlobeProps {
  size?: number;
}

export default function Globe({ size = 1200 }: GlobeProps) {
  const globeRef = useRef<any>(null);
  const { theme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [GlobeGL, setGlobeGL] = useState<any>(null);
  const [countries, setCountries] = useState<any>({ features: [] });

  const currentTheme = resolvedTheme || theme;

  // Prevent hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);
  useEffect(() => {
    import("react-globe.gl").then((mod) => setGlobeGL(() => mod.default));

    // Fetch raw GeoJSON for continent outlines
    fetch('https://raw.githubusercontent.com/vasturiano/react-globe.gl/master/example/datasets/ne_110m_admin_0_countries.geojson')
      .then(res => res.json())
      .then(setCountries);
  }, []);

  // Configure automatic rotation safely exactly when Globe finishes rendering
  const handleGlobeReady = () => {
    if (globeRef.current) {
      const controls = globeRef.current.controls();
      controls.autoRotate = true;
      controls.autoRotateSpeed = 0.5;
      controls.enableZoom = false;

      globeRef.current.pointOfView({ lat: 11, lng: 78, altitude: 2 });
    }
  };

  // Quebec coordinates specifically structured for react-globe.gl point formatting
  const markerData = useMemo(() => [
    { lat: 11.1271, lng: 78.6569, label: "Tamilnadu", color: "#FB6415", size: 0.1 }
  ], []);

  // Theme-aware globe material
  const nativeGlobeMaterial = useMemo(() => {
    const isDark = currentTheme === "dark";
    return new THREE.MeshPhongMaterial({
      color: isDark ? "#010206" : "#f8fafc",
      emissive: isDark ? "#000000" : "#f1f5f9",
      emissiveIntensity: isDark ? 0 : 0.2,
      shininess: isDark ? 5 : 1,
      transparent: true,
      opacity: isDark ? 0.95 : 0.85
    });
  }, [currentTheme]);

  if (!mounted || !GlobeGL) return <div style={{ width: size, height: size }} className="bg-transparent" />;

  const isDark = currentTheme === "dark";

  return (
    <div
      style={{ width: size, height: size }}
      className="relative flex items-center justify-center mx-auto pointer-events-none fade-in"
    >

      {/* Absolute bounding box for rendering the full interactive Map engine */}
      <div className={`absolute inset-0 z-10 flex items-center justify-center opacity-90 ${isDark ? "mix-blend-screen" : "mix-blend-multiply"}`}>
        <GlobeGL
          ref={globeRef}
          width={size}
          height={size}
          backgroundColor="rgba(0,0,0,0)" // Makes canvas background transparent wrapping the core

          showGlobe={true}
          showAtmosphere={true}
          atmosphereColor={isDark ? "#ffffff" : "#cbd5e1"}
          atmosphereAltitude={isDark ? 0.1 : 0.15}
          globeMaterial={nativeGlobeMaterial}
          onGlobeReady={handleGlobeReady}

          showGraticules={true}
          graticulesColor={isDark ? "rgba(255,255,255,0.15)" : "rgba(0,0,0,0.05)"}

          polygonsData={countries.features}
          polygonCapColor={() => "rgba(0,0,0,0)"}
          polygonSideColor={() => "rgba(0,0,0,0)"}
          polygonStrokeColor={() => isDark ? "rgba(255,255,255,0.8)" : "rgba(0,0,0,0.15)"}

          pointsData={markerData}
          pointColor={(d: any) => d.color}
          pointAltitude={0.01}
          pointRadius={(d: any) => d.size}
          pointsMerge={true}

          // Halo ring representing the marker pulsing effect
          ringsData={markerData}
          ringColor={(d: any) => d.color}
          ringMaxRadius={2}
          ringPropagationSpeed={1}
          ringRepeatPeriod={800}
        />
      </div>

      {/* Custom CSS edge glow fading matching the horizon perfectly */}
      <div
        style={{ width: size * 0.5, height: size * 0.2 }}
        className={`absolute top-[35%] left-1/2 -translate-x-1/2 blur-[60px] rounded-[100%] z-0 ${isDark ? "bg-white/5" : "bg-slate-400/5"}`}
      />
    </div>
  );
}
