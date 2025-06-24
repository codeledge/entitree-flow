"use client";
import { ClientTree } from "@/types/TreeNode";
import { Box, Typography } from "@mui/joy";
import Sheet from "@mui/joy/Sheet";
import "@xyflow/react/dist/style.css";
import { TreeFlow } from "./TreeFlow";
import { WikidataSearch } from "./WikidataSearch";

export default function HomeClientPage({
  initialTree,
}: {
  initialTree: ClientTree;
}) {
  console.log(initialTree);

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
          <WikidataSearch />
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
        <TreeFlow initialTree={initialTree} />
      </Sheet>
    </Sheet>
  );
}
