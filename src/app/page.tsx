"use client";

import { useEffect, useMemo, useState } from "react";
import { FaEnvelope } from "react-icons/fa6";

const poem = [
  `Me gustaría tener muchas vidas.
Muchas vidas distintas, ajenas la una a la otra
Muchas vidas para vivir con disgustos y alegrías
Muchas vidas para disfrutar y para sufrir.`,
  `Con muchas vidas, viviría más.
Con muchas sorpresas y con muchas desilusiones
Muchas vidas, son muchas penas, son muchos triunfos.`,
  `Muchas vidas,
porque una no me alcanza,
No me alcanza con ser poeta
No me alcanza con ser amante
No me alcanza para ser humano.`,
  `Muchas vidas,
Para poca vida.`
];

export default function Home() {
  const paragraphs = useMemo(() => poem, []);
  const [visibleCount, setVisibleCount] = useState(0);

  useEffect(() => {
    if (visibleCount >= paragraphs.length) return;
    const timer = window.setTimeout(() => {
      setVisibleCount((prev) => Math.min(prev + 1, paragraphs.length));
    }, 900);
    return () => window.clearTimeout(timer);
  }, [visibleCount, paragraphs.length]);

  return (
    <main className="page">
      <header className="topbar">
        <a href="mailto:j@jesuscerron.com" className="mail" aria-label="Correo">
          <FaEnvelope />
        </a>
      </header>

      <div className="frame" aria-label="Presentación de Jesús C. Aguilar">
        <div className="poem" aria-live="polite">
          {paragraphs.map((paragraph, index) => (
            <p
              key={paragraph}
              className={`line ${index < visibleCount ? "is-visible" : ""}`}
            >
              {paragraph}
            </p>
          ))}
        </div>
        <div className="identity">
          <p className="name">Jesús C. Aguilar</p>
          <span className="divider">·</span>
          <p className="role">Writer, Student, and Tech Enthusiast</p>
        </div>
      </div>
    </main>
  );
}
