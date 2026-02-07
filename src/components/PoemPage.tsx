"use client";

import { useEffect, useMemo, useState } from "react";
import { FaEnvelope } from "react-icons/fa6";
import type { PoemData } from "@/lib/sanity";

type Props = {
  poem: PoemData;
};

export default function PoemPage({ poem }: Props) {
  const paragraphs = useMemo(() => poem.paragraphs, [poem.paragraphs]);
  const [visibleCount, setVisibleCount] = useState(0);
  const [activeLine, setActiveLine] = useState<{ p: number; l: number } | null>(null);

  useEffect(() => {
    if (visibleCount >= paragraphs.length) return;
    const timer = window.setTimeout(() => {
      setVisibleCount((prev) => Math.min(prev + 1, paragraphs.length));
    }, 900);
    return () => window.clearTimeout(timer);
  }, [visibleCount, paragraphs.length]);

  const email = poem.email || "j@jesuscerron.com";
  const name = poem.name || "Jesús Cerrón Aguilar";
  const role = poem.role || "Writer, Student, and Tech Enthusiast";

  return (
    <main className="page">
      <header className="topbar">
        <a href={`mailto:${email}`} className="mail" aria-label="Correo">
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
              {paragraph.lines.map((line, lIndex) => {
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
          <p className="name">{name}</p>
          <span className="divider">·</span>
          <p className="role">{role}</p>
        </div>
      </div>
    </main>
  );
}
