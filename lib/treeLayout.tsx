import { ClientTree, LayoutTreeNode, ServerTreeNode } from "@/types/TreeNode";
import { Edge } from "@xyflow/react";
import { HashMap } from "deverything";

export type InputNode = ServerTreeNode | LayoutTreeNode;

export const treeLayout = (
  nodes: InputNode[],
  edges: Edge[],
  options: {
    defaultNodeWidth: number;
    defaultNodeHeight: number;
    nodeSiblingMinSeparation: number;
    nodeGenerationSeparation: number;
    outEdgeFilter?: (edge: Edge) => boolean;
    sideBeforeEdgeFilter?: (edge: Edge) => boolean;
    sideAfterEdgeFilter?: (edge: Edge) => boolean;
    inEdgeFilter?: (edge: Edge) => boolean;
  } = {
    defaultNodeWidth: 250,
    defaultNodeHeight: 100,
    nodeSiblingMinSeparation: 80,
    nodeGenerationSeparation: 80,
  }
): ClientTree => {
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

  const rootWidth = root.width || options.defaultNodeWidth;
  const rootHeight = root.height || options.defaultNodeHeight;

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
        marginBottom: options.nodeGenerationSeparation,
        marginRight: options.nodeSiblingMinSeparation,
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
        x =
          previousNode.position.x +
          previousNode.width +
          options.nodeSiblingMinSeparation;
      }

      outputEdgesMap[edge.id] = edge;

      outputNodesMap[child.id] = {
        ...child,
        width: child.width || options.defaultNodeWidth,
        height: child.height || options.defaultNodeHeight,
        position: {
          x,
          y:
            currentNode.position.y +
            currentNode.height! +
            options.nodeGenerationSeparation,
        },
        data: {
          ...child.data,
          groupTopY: 0,
          groupLeftX: 0,
          groupBottomY: child.height || options.defaultNodeHeight,
          groupMaxHeight: child.height || options.defaultNodeHeight,
          groupMaxWidth: child.width || options.defaultNodeWidth,
          groupRightX: child.width || options.defaultNodeWidth,
          marginBottom: options.nodeSiblingMinSeparation,
          marginRight: options.nodeSiblingMinSeparation,
        },
      };

      drillChildren(outputNodesMap[child.id], depth + 1);
    });
  };

  const drillParents = (currentNode: LayoutTreeNode, depth: number) => {
    const parentEdges = edges
      .filter((edge) => edge.target === currentNode.id)
      .filter(options?.inEdgeFilter || (() => true));

    if (currentNode.data.showParents === false) return;
    parentEdges.forEach((edge, edgeIndex) => {
      const parent = inputNodesMap[edge.source];

      if (!parent) {
        return;
      }

      const previousEdge = parentEdges[edgeIndex - 1];
      let x = currentNode.position.x;
      if (previousEdge) {
        const previousNode = outputNodesMap[previousEdge.source];
        x =
          previousNode.position.x +
          previousNode.width +
          options.nodeSiblingMinSeparation;
      }

      outputEdgesMap[edge.id] = edge;

      outputNodesMap[parent.id] = {
        ...parent,
        width: parent.width || options.defaultNodeWidth,
        height: parent.height || options.defaultNodeHeight,
        position: {
          x,
          y:
            currentNode.position.y -
            (parent.height || options.defaultNodeHeight) -
            options.nodeGenerationSeparation,
        },
        data: {
          ...parent.data,
          groupTopY: 0,
          groupLeftX: 0,
          groupBottomY: parent.height || options.defaultNodeHeight,
          groupMaxHeight: parent.height || options.defaultNodeHeight,
          groupMaxWidth: parent.width || options.defaultNodeWidth,
          groupRightX: parent.width || options.defaultNodeWidth,
          marginBottom: options.nodeGenerationSeparation,
          marginRight: options.nodeSiblingMinSeparation,
        },
      };

      drillParents(outputNodesMap[parent.id], depth + 1);
    });
  };

  drillChildren(outputNodesMap[root.id], 1);
  drillParents(outputNodesMap[root.id], 1);

  return {
    nodes: Object.values(outputNodesMap),
    edges: Object.values(outputEdgesMap),
  };
};
