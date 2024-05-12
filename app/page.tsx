import { familyEdges, familyNodes } from "@/fixtures/familyTree";
import { treeLayout } from "@/lib/treeLayout";
import HomeClientPage from "./HomeClientPage";

export default function HomePage() {
  const clientTree = treeLayout(familyNodes[0], familyNodes, familyEdges, {
    outEdgeFilter: (edge) => edge.label === "has",
    sideAfterEdgeFilter: (edge) => edge.label === "married to",
  });

  return <HomeClientPage clientTree={clientTree} />;
}
