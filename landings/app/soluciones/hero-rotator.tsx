"use client";

import { useEffect, useState } from "react";

const headlines = [
  {
    lead: "Tu comunidad ya está activa. Haz que cada alumno avance dentro de",
    emphasis: "Telegram."
  },
  {
    lead: "Deja de perseguir accesos, enlaces y renovaciones a",
    emphasis: "mano."
  },
  {
    lead: "Una experiencia propia para acompañar alumnos sin perder",
    emphasis: "el control."
  }
];

export default function HeroRotator() {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const interval = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % headlines.length);
    }, 5000);

    return () => window.clearInterval(interval);
  }, []);

  const headline = headlines[activeIndex];

  return (
    <h1 className="hero-headline" aria-live="polite">
      <span key={activeIndex} className="hero-headline-swap">
        {headline.lead} <em>{headline.emphasis}</em>
      </span>
    </h1>
  );
}
