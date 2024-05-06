import { ServerNode } from "@/types/ServerNode";
import { Edge, Node } from "@xyflow/react";

export const treeLayout = (
  root: ServerNode,
  nodes: ServerNode[],
  edges: Edge[],
  options: {
    defaultNodeWidth?: number;
    defaultNodeHeight?: number;
    nodeMinSpacing?: number;
    outEdgeFilter?: (edge: Edge) => boolean;
    sideBeforeEdgeFilter?: (edge: Edge) => boolean;
    sideAfterEdgeFilter?: (edge: Edge) => boolean;
    inEdgeFilter?: (edge: Edge) => boolean;
  } = {}
): {
  nodes: Node[];
  edges: Edge[];
} => {
  const nodeMinSpacing = options.nodeMinSpacing || 20;
  const defaultNodeWidth = options.defaultNodeWidth || 150;
  const defaultNodeHeight = options.defaultNodeHeight || 30;

  const serverNodesMap = nodes.reduce((acc, node) => {
    acc[node.id] = node;
    return acc;
  }, {} as Record<string, ServerNode>);

  const disaplayNodesMap: Record<string, Node> = {
    [root.id]: {
      ...root,
      width: root.width || defaultNodeWidth,
      height: root.height || defaultNodeHeight,
      position: { x: 0, y: 0 },
    },
  };

  const drillChildren = (currentNode: Node, depth: number) => {
    const childEdges = edges
      .filter((edge) => edge.source === currentNode.id)
      .filter(options?.outEdgeFilter || (() => true));

    childEdges.forEach((edge, edgeIndex) => {
      const child = serverNodesMap[edge.target];

      if (!child) {
        return;
      }

      const previousEdge = childEdges[edgeIndex - 1];
      let x = currentNode.position.x;
      if (previousEdge) {
        const previousNode = disaplayNodesMap[previousEdge.target];
        x = previousNode.position!.x + previousNode.width! + nodeMinSpacing;
      }

      disaplayNodesMap[child.id] = {
        ...child,
        width: child.width || defaultNodeWidth,
        height: child.height || defaultNodeHeight,
        position: {
          x,
          y: currentNode.position.y + currentNode.height! + nodeMinSpacing,
        },
      };

      drillChildren(disaplayNodesMap[child.id], depth + 1);
    });
  };

  drillChildren(disaplayNodesMap[root.id], 1);

  return {
    nodes: Object.values(disaplayNodesMap),
    edges: edges,
  };
};
