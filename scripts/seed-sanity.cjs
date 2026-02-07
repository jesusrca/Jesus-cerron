/* eslint-disable no-console */
const dotenv = require("dotenv");
dotenv.config({ path: ".env.local" });
const { createClient } = require("@sanity/client");

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
const token = process.env.SANITY_API_WRITE_TOKEN;

if (!projectId || !token) {
  console.error(
    "Missing env vars. Set NEXT_PUBLIC_SANITY_PROJECT_ID and SANITY_API_WRITE_TOKEN."
  );
  process.exit(1);
}

const client = createClient({
  projectId,
  dataset,
  apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2024-06-01",
  token,
  useCdn: false
});

const doc = {
  _id: "poem.default",
  _type: "poem",
  title: "Muchas vidas",
  email: "j@jesuscerron.com",
  name: "Jesús Cerrón Aguilar",
  role: "Writer, Student, and Tech Enthusiast",
  paragraphs: [
    {
      _type: "paragraph",
      lines: [
        {
          _type: "line",
          es: "Me gustaría tener muchas vidas.",
          en: "I would like to have many lives."
        },
        {
          _type: "line",
          es: "Muchas vidas distintas, ajenas la una a la otra.",
          en: "Many different lives, unrelated to one another"
        },
        {
          _type: "line",
          es: "Muchas vidas para vivir con disgustos y alegrías.",
          en: "Many lives to live with sorrows and joys"
        },
        {
          _type: "line",
          es: "Muchas vidas para disfrutar y para sufrir.",
          en: "Many lives to enjoy and to suffer."
        }
      ]
    },
    {
      _type: "paragraph",
      lines: [
        {
          _type: "line",
          es: "Con muchas vidas, viviría más.",
          en: "With many lives, I would live more."
        },
        {
          _type: "line",
          es: "Con muchas sorpresas y con muchas desilusiones.",
          en: "With many surprises and many disappointments"
        },
        {
          _type: "line",
          es: "Muchas vidas, son muchas penas, son muchos triunfos.",
          en: "Many lives are many sorrows, many triumphs."
        }
      ]
    },
    {
      _type: "paragraph",
      lines: [
        { _type: "line", es: "Muchas vidas,", en: "Many lives," },
        {
          _type: "line",
          es: "porque una no me alcanza,",
          en: "because one is not enough for me,"
        },
        {
          _type: "line",
          es: "No me alcanza con ser poeta",
          en: "It is not enough to be a poet"
        },
        {
          _type: "line",
          es: "No me alcanza con ser amante",
          en: "It is not enough to be a lover"
        },
        {
          _type: "line",
          es: "No me alcanza para ser humano.",
          en: "It is not enough to be human."
        }
      ]
    },
    {
      _type: "paragraph",
      lines: [
        { _type: "line", es: "Muchas vidas,", en: "Many lives," },
        { _type: "line", es: "Para poca vida.", en: "for so little life." }
      ]
    }
  ]
};

async function run() {
  const result = await client.createOrReplace(doc);
  console.log(`Seed complete: ${result._id}`);
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
