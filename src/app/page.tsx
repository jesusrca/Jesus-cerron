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
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL;

  return {
    title,
    description,
    keywords,
    openGraph: {
      title,
      description,
      type: "website",
      url: siteUrl,
      images: ogImage ? [{ url: ogImage }] : undefined
    },
    other: {
      "fb:app_id": process.env.NEXT_PUBLIC_FB_APP_ID
    }
  };
}

export default async function Home() {
  const poem = await fetchPoem();
  return <PoemPage poem={poem} />;
}
