import { createClient } from "@sanity/client";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET;
const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2024-06-01";
const readToken =
  process.env.SANITY_API_READ_TOKEN || process.env.SANITY_API_WRITE_TOKEN;

export const sanityConfig = {
  projectId,
  dataset,
  apiVersion
};

export const sanityClient =
  projectId && dataset
    ? createClient({
        projectId,
        dataset,
        apiVersion,
        // Avoid stale data in production
        useCdn: false,
        token: process.env.NODE_ENV === "production" ? undefined : readToken,
        perspective:
          process.env.NODE_ENV === "production" || !readToken ? undefined : "drafts"
      })
    : null;

export type PoemLine = { es: string; en: string };
export type PoemParagraph = { lines: PoemLine[] };
export type PoemData = {
  title?: string;
  email?: string;
  name?: string;
  role?: string;
  paragraphs: PoemParagraph[];
};

export const fallbackPoem: PoemData = {
  title: "Muchas vidas",
  email: "j@jesuscerron.com",
  name: "Jesús Cerrón Aguilar",
  role: "Writer, Student, and Tech Enthusiast",
  paragraphs: [
    {
      lines: [
        { es: "Me gustaría tener muchas vidas.", en: "I would like to have many lives." },
        {
          es: "Muchas vidas distintas, ajenas la una a la otra.",
          en: "Many different lives, unrelated to one another"
        },
        {
          es: "Muchas vidas para vivir con disgustos y alegrías.",
          en: "Many lives to live with sorrows and joys"
        },
        { es: "Muchas vidas para disfrutar y para sufrir.", en: "Many lives to enjoy and to suffer." }
      ]
    },
    {
      lines: [
        { es: "Con muchas vidas, viviría más.", en: "With many lives, I would live more." },
        {
          es: "Con muchas sorpresas y con muchas desilusiones.",
          en: "With many surprises and many disappointments"
        },
        {
          es: "Muchas vidas, son muchas penas, son muchos triunfos.",
          en: "Many lives are many sorrows, many triumphs."
        }
      ]
    },
    {
      lines: [
        { es: "Muchas vidas,", en: "Many lives," },
        { es: "porque una no me alcanza,", en: "because one is not enough for me," },
        { es: "No me alcanza con ser poeta", en: "It is not enough to be a poet" },
        { es: "No me alcanza con ser amante", en: "It is not enough to be a lover" },
        { es: "No me alcanza para ser humano.", en: "It is not enough to be human." }
      ]
    },
    {
      lines: [
        { es: "Muchas vidas,", en: "Many lives," },
        { es: "Para poca vida.", en: "for so little life." }
      ]
    }
  ]
};
