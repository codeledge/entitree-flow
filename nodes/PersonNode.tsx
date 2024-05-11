import { treeLayout } from "@/lib/treeLayout";
import { TreeNode } from "@/types/TreeNode";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import { Button, Sheet } from "@mui/joy";
import { Handle, NodeProps, Position, useReactFlow } from "@xyflow/react";

export const PersonNode = (node: NodeProps<TreeNode>) => {
  const { setNodes, getEdges, setEdges, getNodes } = useReactFlow<TreeNode>();

  const toggleChildren = (id: string) => {
    const nodes = getNodes().map((node) => {
      if (node.id === id) {
        return {
          ...node,
          data: {
            ...node.data,
            showChildren: !node.data.showChildren,
          },
        };
      }
      return node;
    });

    const layouted = treeLayout(nodes[0], nodes, getEdges(), {
      outEdgeFilter: (edge) => edge.label === "has",
      sideAfterEdgeFilter: (edge) => edge.label === "married to",
    });

    setNodes(layouted.nodes);
  };

  return (
    <Sheet sx={{ p: 1, borderRadius: 10, border: "1px solid lightgrey" }}>
      <Handle type="target" position={Position.Top} />
      {!!node.data.parentCount && (
        <Button
          onClick={() => {}}
          size="sm"
          sx={{
            position: "absolute",
            top: -26,
            left: "50%",
            transform: "translateX(-50%)",
            fontSize: 10,
            padding: "2px 4px 2px 0",
            minHeight: 16,
          }}
          variant="plain"
          color="neutral"
        >
          <ArrowDropUpIcon /> {node.data.parentCount}
        </Button>
      )}
      {node.data.label}
      <Handle type="source" position={Position.Bottom} />
      {!!node.data.childCount && (
        <Button
          onClick={() => {
            toggleChildren(node.id);
          }}
          size="sm"
          sx={{
            position: "absolute",
            bottom: -26,
            left: "50%",
            transform: "translateX(-50%)",
            fontSize: 10,
            padding: "2px 4px 2px 0",
            minHeight: 16,
          }}
          variant="plain"
          color="neutral"
        >
          <ArrowDropUpIcon /> {node.data.childCount}
        </Button>
      )}
    </Sheet>
  );
};
