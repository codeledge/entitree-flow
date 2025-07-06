import { InputNode, treeLayout } from "@/lib/treeLayout";
import { LayoutTreeNode } from "@/types/TreeNode";
import { Edge, MarkerType, useReactFlow } from "@xyflow/react";
import { useCallback } from "react";

export const useTreeLayout = () => {
  const { setNodes, setEdges, fitView } = useReactFlow<LayoutTreeNode>();

  const onLayout = useCallback(
    (preNodes: InputNode[], preEdges: Edge[]) => {
      const layouted = treeLayout(preNodes, preEdges);

      // Ensure edges have proper styling and custom type
      const styledEdges = layouted.edges.map((edge) => ({
        ...edge,
        type: "custom",
        markerEnd: {
          type: MarkerType.ArrowClosed,
          width: 20,
          height: 20,
          color: "#64748b",
        },
        style: {
          strokeWidth: 2,
          stroke: "#64748b",
        },
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
