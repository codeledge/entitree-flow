import { familyNodes } from "@/fixtures/familyTree";
import { treeLayout } from "@/lib/treeLayout";
import { trpcCaller } from "@/trpc/trpcCaller";
import HomeClientPage from "./HomeClientPage";

export default async function HomePage() {
  const root = await trpcCaller({}).getNode({ id: familyNodes[0].id });

  root.data.isRoot = true;

  const clientTree = treeLayout([root], []);

  return <HomeClientPage initialTree={clientTree} />;
}
