import { defineConfig } from "sanity";
import { deskTool } from "sanity/desk";
import { visionTool } from "@sanity/vision";

const projectId =
  process.env.SANITY_STUDIO_PROJECT_ID ||
  process.env.SANITY_PROJECT_ID ||
  process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ||
  "";
const dataset =
  process.env.SANITY_STUDIO_DATASET ||
  process.env.SANITY_DATASET ||
  process.env.NEXT_PUBLIC_SANITY_DATASET ||
  "production";

export default defineConfig({
  name: "default",
  title: "Jesús Cerrón Landing",
  projectId,
  dataset,
  plugins: [deskTool(), visionTool()],
  schema: {
    types: [
      {
        name: "poem",
        title: "Poema",
        type: "document",
        fields: [
          { name: "title", title: "Título", type: "string" },
          { name: "email", title: "Email", type: "string" },
          { name: "name", title: "Nombre", type: "string" },
          { name: "role", title: "Rol", type: "string" },
          {
            name: "paragraphs",
            title: "Párrafos",
            type: "array",
            of: [
              {
                name: "paragraph",
                title: "Párrafo",
                type: "object",
                fields: [
                  {
                    name: "lines",
                    title: "Líneas",
                    type: "array",
                    of: [
                      {
                        name: "line",
                        title: "Línea",
                        type: "object",
                        fields: [
                          { name: "es", title: "Español", type: "string" },
                          { name: "en", title: "Inglés", type: "string" }
                        ],
                        preview: {
                          select: { es: "es", en: "en" },
                          prepare({ es, en }: { es?: string; en?: string }) {
                            return {
                              title: es || "(sin español)",
                              subtitle: en || "(sin inglés)"
                            };
                          }
                        }
                      }
                    ]
                  }
                ],
                preview: {
                  select: { lines: "lines" },
                  prepare({
                    lines
                  }: {
                    lines?: Array<{ es?: string; en?: string }>;
                  }) {
                    const first = lines?.[0];
                    const title = first?.es || "(párrafo vacío)";
                    const count = lines?.length || 0;
                    return {
                      title,
                      subtitle: `${count} línea${count === 1 ? "" : "s"}`
                    };
                  }
                }
              }
            ]
          }
        ]
      }
    ]
  }
});
