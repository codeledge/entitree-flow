import { ClientTree } from "@/types/TreeNode";
import { useEdgesState, useNodesState } from "@xyflow/react";
import { useEffect } from "react";

export const useTreeSync = (initialTree: ClientTree) => {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialTree.nodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialTree.edges);

  // Update nodes and edges when initialTree changes
  useEffect(() => {
    setNodes(initialTree.nodes);
    setEdges(initialTree.edges);
  }, [initialTree, setNodes, setEdges]);

  return {
    nodes,
    edges,
    setNodes,
    setEdges,
    onNodesChange,
    onEdgesChange,
  };
};
