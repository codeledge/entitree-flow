import { InputNode, treeLayout } from "@/lib/treeLayout";
import { LayoutTreeNode } from "@/types/TreeNode";
import { Edge, useReactFlow } from "@xyflow/react";
import { useCallback } from "react";

export const useTreeLayout = () => {
  const { setNodes, setEdges, fitView } = useReactFlow<LayoutTreeNode>();

  const onLayout = useCallback(
    (preNodes: InputNode[], preEdges: Edge[]) => {
      const layouted = treeLayout(preNodes, preEdges);

      setNodes(layouted.nodes);
      setEdges(layouted.edges);

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
