"use client";
import { treeLayout } from "@/lib/treeLayout";
import { ClientTree } from "@/types/TreeNode";
import { Box, Typography } from "@mui/joy";
import Sheet from "@mui/joy/Sheet";
import { ReactFlowProvider } from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import { useState } from "react";
import { TreeFlow } from "./TreeFlow";
import { WikidataSearch } from "./WikidataSearch";

interface WikidataItem {
  id: string;
  label: string;
  description: string;
  url: string;
  image?: string;
}

const createTreeFromWikidataItem = (item: WikidataItem): ClientTree => {
  const rootNode = {
    id: item.id,
    data: {
      id: item.id,
      label: item.label,
      description: item.description,
      image: item.image,
      isRoot: true,
      childCount: 0,
      parentCount: 0,
    },
    type: "personNode",
    position: { x: 0, y: 0 },
  };

  return treeLayout([rootNode], []);
};

export default function HomeClientPage({
  clientTree: initialTree,
}: {
  clientTree: ClientTree;
}) {
  // console.log(initialTree);
  const [currentTree, setCurrentTree] = useState<ClientTree>(initialTree);

  const handleItemSelect = (item: WikidataItem) => {
    const newTree = createTreeFromWikidataItem(item);
    setCurrentTree(newTree);
  };

  return (
    <Sheet
      sx={{
        display: "flex",
        flexFlow: "row nowrap",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
      }}
    >
      <Sheet
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          position: "fixed",
          top: 0,
          width: "100vw",
          height: "var(--Header-height)",
          zIndex: 99999,
          px: 2,
          py: 1,
          gap: 2,
          borderBottom: "1px solid",
          borderColor: "background.level3",
          boxShadow: "sm",
          backgroundColor: "background.surface",
        }}
      >
        {/* Left section - App title */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            minWidth: "fit-content",
            flexShrink: 0,
          }}
        >
          <Typography
            level="h4"
            sx={{
              margin: 0,
              fontWeight: "bold",
              whiteSpace: "nowrap",
            }}
          >
            EntiTree Flow
          </Typography>
        </Box>

        {/* Center section - Search box */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flex: 1,
            maxWidth: "300px",
            margin: "0 auto",
          }}
        >
          <WikidataSearch onItemSelect={handleItemSelect} />
        </Box>

        {/* Right section - Placeholder for additional actions */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            minWidth: "fit-content",
            flexShrink: 0,
          }}
        >
          {/* Placeholder for additional header actions */}
        </Box>
      </Sheet>
      <Sheet
        sx={{
          width: "100vw",
          height: "calc(100vh - var(--Header-height))",
          marginTop: "var(--Header-height)",
        }}
      >
        <ReactFlowProvider>
          <TreeFlow initialTree={currentTree} />
        </ReactFlowProvider>
      </Sheet>
    </Sheet>
  );
}
