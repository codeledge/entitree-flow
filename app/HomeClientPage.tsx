"use client";
import { ClientTree } from "@/types/TreeNode";
import Sheet from "@mui/joy/Sheet";
import { ReactFlowProvider } from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import { TreeFlow } from "./TreeFlow";

export default function HomeClientPage({
  clientTree,
}: {
  clientTree: ClientTree;
}) {
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
          alignItems: "center",
          justifyContent: "space-between",
          position: "fixed",
          top: 0,
          width: "100vw",
          height: "var(--Header-height)",
          zIndex: 9998,
          p: 2,
          gap: 1,
          borderBottom: "1px solid",
          borderColor: "background.level3",
          boxShadow: "sm",
        }}
      >
        Hello
      </Sheet>
      <Sheet
        sx={{
          width: "100vw",
          height: "calc(100vh - var(--Header-height))",
          marginTop: "var(--Header-height)",
          ".react-flow__node": {
            p: "5px",
            borderRadius: "md",
          },
        }}
        variant="outlined"
      >
        <ReactFlowProvider>
          <TreeFlow initialTree={clientTree} />
        </ReactFlowProvider>
      </Sheet>
    </Sheet>
  );
}
