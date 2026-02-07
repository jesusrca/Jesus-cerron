import { NextResponse } from "next/server";
import { sanityClient, sanityConfig } from "@/lib/sanity";

const query = `*[_type == "poem"] | order(_updatedAt desc)[0]{
  _id,
  _updatedAt,
  title,
  email,
  name,
  role,
  "paragraphs": paragraphs[]{ "lines": lines[]{ es, en } }
}`;

export async function GET() {
  try {
    if (!sanityClient) {
      return NextResponse.json(
        {
          ok: false,
          error: "sanityClient is null",
          config: sanityConfig
        },
        { status: 500 }
      );
    }

    const data = await sanityClient.fetch(query);
    return NextResponse.json({
      ok: true,
      config: sanityConfig,
      data
    });
  } catch (error) {
    return NextResponse.json(
      {
        ok: false,
        error: error instanceof Error ? error.message : String(error),
        config: sanityConfig
      },
      { status: 500 }
    );
  }
}
