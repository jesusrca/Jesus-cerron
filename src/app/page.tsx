import PoemPage from "@/components/PoemPage";
import { fetchPoem } from "@/lib/poem";

export const dynamic = "force-dynamic";

export default async function Home() {
  const poem = await fetchPoem();
  return <PoemPage poem={poem} />;
}
