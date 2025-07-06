import { useTreeLayout } from "@/hooks/useTreeLayout";
import { trpcReact } from "@/trpc/trpcReact";
import { LayoutTreeNode, ServerTree } from "@/types/TreeNode";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import PersonIcon from "@mui/icons-material/Person";
import { Avatar, Box, Button, Sheet, Typography } from "@mui/joy";
import { Handle, NodeProps, Position, useReactFlow } from "@xyflow/react";
import { useCallback } from "react";

export const PersonNode = (node: NodeProps<LayoutTreeNode>) => {
  const { getEdges, getNodes, getNode, updateNodeData } =
    useReactFlow<LayoutTreeNode>();

  const { onLayout } = useTreeLayout();

  const onCollapse = useCallback(
    (nodeId?: string) => {
      const postNodes = getNodes().map((node) => {
        if (node.id === nodeId) {
          return {
            ...node,
            data: {
              ...node.data,
              showChildren: false,
            },
          };
        }
        return node;
      });

      onLayout(postNodes, getEdges());
    },
    [getNodes, onLayout, getEdges]
  );

  const onExpand = useCallback(
    (sourceId: string, addTree: ServerTree) => {
      const nodes = getNodes();

      const layoutNodes = nodes.map((node) => {
        if (node.id === sourceId) {
          return {
            ...node,
            data: {
              ...node.data,
              showChildren: true,
              loadingChildren: false,
            },
          };
        }
        return node;
      });

      const preNodes = [...layoutNodes, ...addTree.nodes];
      const preEdges = [...getEdges(), ...addTree.edges];

      onLayout(preNodes, preEdges);
    },
    [getNodes, getEdges, onLayout]
  );

  const utils = trpcReact.useUtils();

  const toggleChildren = async (id: string) => {
    const node = getNode(id);
    if (!node) {
      return;
    }

    if (!node.data.showChildren) {
      updateNodeData(id, {
        loadingChildren: true,
      });

      const partialTree = await utils.getChildren.fetch({
        parentId: id,
      });

      onExpand(id, partialTree as ServerTree);
    } else {
      onCollapse(id);
    }
  };

  return (
    <Sheet
      sx={{
        borderRadius: 8,
        border: "1px solid lightgrey",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        position: "relative",
      }}
    >
      {/* React Flow Handles */}
      <Handle
        type="target"
        position={Position.Top}
        style={{
          background: "#64748b",
          width: 8,
          height: 8,
          border: "2px solid #fff",
        }}
      />
      <Handle
        type="source"
        position={Position.Bottom}
        style={{
          display: "none",
        }}
      />

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
      <Box
        sx={{
          display: "flex",
          alignItems: "flex-start",
          gap: "12px",
          flex: 1,
          padding: "8px",
        }}
      >
        <Avatar
          src={node.data.image}
          alt={node.data.label}
          sx={{
            flexShrink: 0,
            width: 80,
            height: 80,
            borderRadius: "6px",
          }}
        >
          <PersonIcon />
        </Avatar>
        <Box
          sx={{
            flex: 1,
            minWidth: 0,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <Typography
            level="body-sm"
            fontWeight="lg"
            sx={{
              wordBreak: "break-word",
              lineHeight: 1.2,
              display: "flex",
              alignItems: "flex-start",
            }}
          >
            {node.data.label}
          </Typography>
          {node.data.description && (
            <Typography
              level="body-xs"
              color="neutral"
              sx={{
                mt: 0.5,
                fontSize: "0.7rem",
                lineHeight: 1.3,
                wordBreak: "break-word",
                overflowWrap: "break-word",
                display: "-webkit-box",
                WebkitLineClamp: 2,
                WebkitBoxOrient: "vertical",
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}
            >
              {node.data.description}
            </Typography>
          )}
        </Box>
      </Box>
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
          {node.data.loadingChildren ? (
            <>loading</>
          ) : (
            <>
              <ArrowDropUpIcon /> {node.data.childCount}
            </>
          )}
        </Button>
      )}
    </Sheet>
  );
};
