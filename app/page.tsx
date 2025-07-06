import { familyNodes } from "@/fixtures/familyTree";
import { treeLayout } from "@/lib/treeLayout";
import { trpcCaller } from "@/trpc/trpcCaller";
import HomeClientPage from "./HomeClientPage";

export default async function HomePage() {
  const { nodes, edges } = await trpcCaller({}).getNode({
    id: familyNodes[2].id,
  });

  const clientTree = treeLayout(nodes, edges);

  return <HomeClientPage initialTree={clientTree} />;
}
