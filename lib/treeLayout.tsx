import { ClientTree, LayoutTreeNode, ServerTreeNode } from "@/types/TreeNode";
import { Edge } from "@xyflow/react";

export const treeLayout = (
  root: ServerTreeNode,
  nodes: ServerTreeNode[],
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
): ClientTree => {
  const nodeMinSpacing = options.nodeMinSpacing || 80;
  const defaultNodeWidth = options.defaultNodeWidth || 150;
  const defaultNodeHeight = options.defaultNodeHeight || 30;

  const inputNodesMap = nodes.reduce((acc, node) => {
    acc[node.id] = node;
    return acc;
  }, {} as Record<string, ServerTreeNode>);

  const outputNodesMap: Record<string, LayoutTreeNode> = {
    [root.id]: {
      ...root,
      width: root.width || defaultNodeWidth,
      height: root.height || defaultNodeHeight,
      position: { x: 0, y: 0 },
      data: {
        ...root.data,
        groupTopY: 0,
        groupLeftX: 0,
        groupBottomY: root.height || defaultNodeHeight,
        groupMaxHeight: root.height || defaultNodeHeight,
        groupMaxWidth: root.width || defaultNodeWidth,
        groupRightX: root.width || defaultNodeWidth,
        marginBottom: nodeMinSpacing,
        marginRight: nodeMinSpacing,
        isRoot: true,
      },
    },
  };

  const drillChildren = (currentNode: LayoutTreeNode, depth: number) => {
    const childEdges = edges
      .filter((edge) => edge.source === currentNode.id)
      .filter(options?.outEdgeFilter || (() => true));

    currentNode.data.childCount = childEdges.length;

    console.log(currentNode.data.label, currentNode.data.showChildren);

    if (currentNode.data.showChildren === false) return;
    childEdges.forEach((edge, edgeIndex) => {
      const child = inputNodesMap[edge.target];

      if (!child) {
        return;
      }

      const previousEdge = childEdges[edgeIndex - 1];
      let x = currentNode.position.x;
      if (previousEdge) {
        const previousNode = outputNodesMap[previousEdge.target];
        x = previousNode.position!.x + previousNode.width! + nodeMinSpacing;
      }

      outputNodesMap[child.id] = {
        ...child,
        width: child.width || defaultNodeWidth,
        height: child.height || defaultNodeHeight,
        position: {
          x,
          y: currentNode.position.y + currentNode.height! + nodeMinSpacing,
        },
        data: {
          ...child.data,
          groupTopY: 0,
          groupLeftX: 0,
          groupBottomY: child.height || defaultNodeHeight,
          groupMaxHeight: child.height || defaultNodeHeight,
          groupMaxWidth: child.width || defaultNodeWidth,
          groupRightX: child.width || defaultNodeWidth,
          marginBottom: nodeMinSpacing,
          marginRight: nodeMinSpacing,
        },
      };

      drillChildren(outputNodesMap[child.id], depth + 1);
    });
  };

  drillChildren(outputNodesMap[root.id], 1);

  return {
    nodes: Object.values(outputNodesMap),
    edges: edges,
  };
};
