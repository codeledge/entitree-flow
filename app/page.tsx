"use client";
import { familyEdges, familyNodes } from "@/fixtures/familyTree";
import { treeLayout } from "@/lib/treeLayout";
import { Layer } from "@/types/Layer";
import { Button, ButtonGroup } from "@mui/joy";
import Sheet from "@mui/joy/Sheet";
import {
  addEdge,
  Background,
  ColorMode,
  Controls,
  OnConnect,
  Panel,
  ReactFlow,
  useEdgesState,
  useNodesState,
} from "@xyflow/react";
import { useCallback, useState } from "react";

import "@xyflow/react/dist/style.css";

const layer1 = {
  id: "1",
  isCurrent: true,
  ...treeLayout(familyNodes[0], familyNodes, familyEdges, {
    outEdgeFilter: (edge) => edge.label === "has",
    sideAfterEdgeFilter: (edge) => edge.label === "married to",
  }),
};

export default function Home() {
  const [colorMode, setColorMode] = useState<ColorMode>("dark");
  const [layers, setLayers] = useState<Layer[]>([layer1]);
  const [nodes, setNodes, onNodesChange] = useNodesState(
    layers.map((l) => l.nodes).flat()
  );
  const [edges, setEdges, onEdgesChange] = useEdgesState(
    layers.map((l) => l.edges).flat()
  );

  const onConnect: OnConnect = useCallback(
    (connection) => setEdges((eds) => addEdge(connection, eds)),
    [setEdges]
  );

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
          // ".react-flow__controls-button": {
          //   background: "lightgrey",
          //   borderBottom: "none",
          // },
          // ".react-flow__controls": {
          //   background: "lightgrey",
          // },
          ".react-flow__node": {
            p: "5px",
            borderRadius: "md",
            // background: "#111",
          },
          // ".react-flow__edge-text": {
          //   fill: "white",
          //   fontSize: "xs",
          // },
          // ".react-flow__edge-textbg": {
          //   fill: "#111",
          // },
        }}
        variant="outlined"
      >
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          fitView
          colorMode={colorMode}
          proOptions={{
            hideAttribution: true,
          }}
        >
          <Background />
          {/* <MiniMap /> */}
          <Controls />
          {layers.length > 0 && (
            <Panel position="bottom-right">
              Layers
              <ButtonGroup orientation="vertical">
                {layers.map((layer) => (
                  <Button
                    key={layer.id}
                    onClick={() => {
                      setLayers((layers) => {
                        return layers.map((l) => {
                          if (l.id === layer.id) {
                            return { ...l, isCurrent: true };
                          }
                          return { ...l, isCurrent: false };
                        });
                      });
                    }}
                  >
                    {layer.id}
                  </Button>
                ))}
              </ButtonGroup>
            </Panel>
          )}
        </ReactFlow>
      </Sheet>
    </Sheet>
  );
}
