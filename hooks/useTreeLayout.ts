import { InputNode, treeLayout } from "@/lib/treeLayout";
import { LayoutTreeNode } from "@/types/TreeNode";
import { Edge, useReactFlow } from "@xyflow/react";
import { useCallback } from "react";

export const useTreeLayout = () => {
  const { setNodes, setEdges, fitView } = useReactFlow<LayoutTreeNode>();

  const onLayout = useCallback(
    (preNodes: InputNode[], preEdges: Edge[]) => {
      console.log("onLayout");
      const layouted = treeLayout(preNodes, preEdges);

      // Ensure edges have proper styling and PERSON_EDGE type
      const styledEdges = layouted.edges.map((edge) => ({
        ...edge,
        type: "PERSON_EDGE",
      }));

      setNodes(layouted.nodes);
      setEdges(styledEdges);

      window.requestAnimationFrame(() => {
        fitView({
          padding: 0.1,
          includeHiddenNodes: false,
          minZoom: 0.5,
          maxZoom: 1,
        });
      });
    },
    [fitView, setEdges, setNodes]
  );

  return {
    onLayout,
  };
};
