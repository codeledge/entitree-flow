import { ServerTreeNode } from "@/types/TreeNode";
import { Node } from "@xyflow/react";

export const stackedLayout = (
  nodes: ServerTreeNode[],
  options: {
    direction?: "TD" | "LR";
    margin?: number;
    nodeWidth?: number;
    nodeHeight?: number;
    size?: number;
  } = {}
): Node[] => {
  const margin = options?.margin ?? 0;
  const nodeWidth = options?.nodeWidth ?? 300;
  const nodeHeight = options?.nodeHeight ?? 100;

  const layoutNodes = nodes.map((node, index) => {
    if (options?.direction === "TD") {
      return {
        ...node,
        position: node.position ?? {
          x: options.size
            ? Math.floor(index / options.size) * (nodeWidth + margin)
            : 0,
          y: options.size
            ? (index % options.size) * (nodeHeight + margin)
            : index * (nodeHeight + margin),
        },
      };
    } else {
      return {
        ...node,
        position: node.position ?? {
          x: options.size
            ? (index % options.size) * (nodeWidth + margin)
            : index * (nodeWidth + margin),
          y: options.size
            ? Math.floor(index / options.size) * (nodeHeight + margin)
            : 0,
        },
      };
    }
  });

  return layoutNodes;
};
