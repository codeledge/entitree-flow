import { ClientTree, LayoutTreeNode, ServerTreeNode } from "@/types/TreeNode";
import { Edge } from "@xyflow/react";
import { HashMap } from "deverything";

export type InputNode = ServerTreeNode | LayoutTreeNode;

export const treeLayout = (
  nodes: InputNode[],
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
  const defaultNodeWidth = options.defaultNodeWidth || 250;
  const defaultNodeHeight = options.defaultNodeHeight || 100;

  let root: InputNode | undefined;

  const inputNodesMap = nodes.reduce((acc, node) => {
    acc[node.id] = node;
    if (node.data.isRoot) {
      root = node;
    }
    return acc;
  }, {} as Record<string, InputNode>);

  if (!root) {
    throw new Error("No root node found");
  }

  const rootWidth = root.width || defaultNodeWidth;
  const rootHeight = root.height || defaultNodeHeight;

  const outputNodesMap: HashMap<LayoutTreeNode> = {
    [root.id]: {
      ...root,
      width: rootWidth,
      height: rootHeight,
      position: { x: 0, y: 0 },
      data: {
        ...root.data,
        groupTopY: 0,
        groupLeftX: 0,
        groupBottomY: rootHeight,
        groupMaxHeight: rootHeight,
        groupMaxWidth: rootWidth,
        groupRightX: rootWidth,
        marginBottom: nodeMinSpacing,
        marginRight: nodeMinSpacing,
        isRoot: true,
      },
    },
  };

  const outputEdgesMap: HashMap<Edge> = {};

  const drillChildren = (currentNode: LayoutTreeNode, depth: number) => {
    const childEdges = edges
      .filter((edge) => edge.source === currentNode.id)
      .filter(options?.outEdgeFilter || (() => true));

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

      outputEdgesMap[edge.id] = edge;

      outputNodesMap[child.id] = {
        ...child,
        width: child.width || defaultNodeWidth,
        height: child.height || defaultNodeHeight,
        position: {
          x,
          y: currentNode.position.y + currentNode.height! + nodeMinSpacing,
        },
        style: {
          width: child.width || defaultNodeWidth,
          height: child.height || defaultNodeHeight,
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
    edges: Object.values(outputEdgesMap),
  };
};
