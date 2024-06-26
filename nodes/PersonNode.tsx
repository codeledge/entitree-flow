import { treeLayout } from "@/lib/treeLayout";
import { trpcReact } from "@/trpc/trpcReact";
import { LayoutTreeNode } from "@/types/TreeNode";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import { Button, Sheet } from "@mui/joy";
import { Handle, NodeProps, Position, useReactFlow } from "@xyflow/react";

export const PersonNode = (node: NodeProps<LayoutTreeNode>) => {
  const { setNodes, getEdges, setEdges, getNodes, getNode, updateNodeData } =
    useReactFlow<LayoutTreeNode>();

  const utils = trpcReact.useUtils();

  const toggleChildren = async (id: string) => {
    const node = getNode(id)!;

    if (!node.data.showChildren) {
      const partialTree = await utils.getChildren.fetch({
        parentId: id,
      });
      updateNodeData(id, {
        showChildren: true,
      });

      const postNodes = [...getNodes(), ...partialTree.nodes];
      const postEdges = [...getEdges(), ...partialTree.edges];

      const layouted = treeLayout(postNodes, postEdges);
      setNodes(layouted.nodes);
      setEdges(layouted.edges);
    } else {
      updateNodeData(id, {
        showChildren: false,
      });
      const postNodes = getNodes();
      const layouted = treeLayout(postNodes, getEdges());
      setNodes(layouted.nodes);
      setEdges(layouted.edges);
    }
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
