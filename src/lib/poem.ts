import { fallbackPoem, PoemData, sanityClient } from "./sanity";

const poemQuery = `*[_type == "poem"] | order(_updatedAt desc)[0]{
  title,
  seoTitle,
  seoDescription,
  seoKeywords,
  "seoImage": seoImage{
    "asset": asset->{
      _id,
      url
    }
  },
  email,
  name,
  role,
  "paragraphs": paragraphs[]{ "lines": lines[]{ es, en } }
}`;

export async function fetchPoem(): Promise<PoemData> {
  if (!sanityClient) return fallbackPoem;

  try {
    const data = await sanityClient.fetch<PoemData | null>(poemQuery);
    if (!data?.paragraphs?.length) return fallbackPoem;
    return {
      title: data.title,
      seoTitle: data.seoTitle,
      seoDescription: data.seoDescription,
      seoKeywords: data.seoKeywords,
      seoImage: data.seoImage,
      email: data.email,
      name: data.name,
      role: data.role,
      paragraphs: data.paragraphs
    };
  } catch {
    return fallbackPoem;
  }
}
