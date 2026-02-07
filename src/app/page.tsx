"use client";

import { useEffect, useMemo, useState } from "react";
import { FaEnvelope } from "react-icons/fa6";

const poem = [
  [
    { es: "Me gustaría tener muchas vidas.", en: "I would like to have many lives." },
    {
      es: "Muchas vidas distintas, ajenas la una a la otra",
      en: "Many different lives, unrelated to one another"
    },
    {
      es: "Muchas vidas para vivir con disgustos y alegrías",
      en: "Many lives to live with sorrows and joys"
    },
    { es: "Muchas vidas para disfrutar y para sufrir.", en: "Many lives to enjoy and to suffer." }
  ],
  [
    { es: "Con muchas vidas, viviría más.", en: "With many lives, I would live more." },
    {
      es: "Con muchas sorpresas y con muchas desilusiones",
      en: "With many surprises and many disappointments"
    },
    {
      es: "Muchas vidas, son muchas penas, son muchos triunfos.",
      en: "Many lives are many sorrows, many triumphs."
    }
  ],
  [
    { es: "Muchas vidas,", en: "Many lives," },
    { es: "porque una no me alcanza,", en: "because one is not enough for me," },
    { es: "No me alcanza con ser poeta", en: "It is not enough to be a poet" },
    { es: "No me alcanza con ser amante", en: "It is not enough to be a lover" },
    { es: "No me alcanza para ser humano.", en: "It is not enough to be human." }
  ],
  [
    { es: "Muchas vidas,", en: "Many lives," },
    { es: "Para poca vida.", en: "for so little life." }
  ]
];

export default function Home() {
  const paragraphs = useMemo(() => poem, []);
  const [visibleCount, setVisibleCount] = useState(0);
  const [activeLine, setActiveLine] = useState<{ p: number; l: number } | null>(null);

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
          {paragraphs.map((paragraph, pIndex) => (
            <div
              key={`p-${pIndex}`}
              className={`line ${pIndex < visibleCount ? "is-visible" : ""}`}
            >
              {paragraph.map((line, lIndex) => {
                const isActive =
                  activeLine?.p === pIndex && activeLine?.l === lIndex;
                return (
                  <span
                    key={`${pIndex}-${lIndex}`}
                    className={`line-item ${isActive ? "is-active" : ""}`}
                    onMouseEnter={() => setActiveLine({ p: pIndex, l: lIndex })}
                    onMouseLeave={() => setActiveLine(null)}
                    onClick={() =>
                      setActiveLine((prev) =>
                        prev?.p === pIndex && prev?.l === lIndex
                          ? null
                          : { p: pIndex, l: lIndex }
                      )
                    }
                  >
                    {line.es}
                    <span className="tooltip">{line.en}</span>
                  </span>
                );
              })}
            </div>
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
