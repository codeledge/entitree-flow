"use client";
import { familyEdges, familyNodes } from "@/fixtures/familyTree";
import { treeLayout } from "@/lib/treeLayout";
import Sheet from "@mui/joy/Sheet";
import { ReactFlowProvider } from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import { Flow } from "./Flow";

export default function Home() {
  const layout = treeLayout(familyNodes[0], familyNodes, familyEdges, {
    outEdgeFilter: (edge) => edge.label === "has",
    sideAfterEdgeFilter: (edge) => edge.label === "married to",
  });

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
          <Flow initialNodes={layout.nodes} initialEdges={layout.edges} />
        </ReactFlowProvider>
      </Sheet>
    </Sheet>
  );
}
