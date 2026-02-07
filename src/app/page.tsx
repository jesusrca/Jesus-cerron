import PoemPage from "@/components/PoemPage";
import { fetchPoem } from "@/lib/poem";

export const dynamic = "force-dynamic";

export async function generateMetadata() {
  const poem = await fetchPoem();
  const title = poem.seoTitle || poem.title || "Jesús Cerrón Aguilar";
  const description =
    poem.seoDescription ||
    "Escritor, estudiante y entusiasta de tecnología.";
  const keywords = poem.seoKeywords || [
    "escritor",
    "poesía",
    "tecnología",
    "portafolio"
  ];
  const ogImage = poem.seoImage?.asset?.url;

  return {
    title,
    description,
    keywords,
    openGraph: {
      title,
      description,
      images: ogImage ? [{ url: ogImage }] : undefined
    }
  };
}

export default async function Home() {
  const poem = await fetchPoem();
  return <PoemPage poem={poem} />;
}
