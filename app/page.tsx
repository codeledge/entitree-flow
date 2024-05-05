"use client";
import { ServerNode, stackedLayout } from "@/lib/stackedLayout";
import { Layer } from "@/types/Layer";
import { Button, ButtonGroup } from "@mui/joy";
import Sheet from "@mui/joy/Sheet";
import { incrementalId, randomWord } from "deverything";
import { useCallback, useState } from "react";
import ReactFlow, {
  addEdge,
  Background,
  Controls,
  Edge,
  OnConnect,
  Panel,
  useEdgesState,
  useNodesState,
} from "reactflow";

import "reactflow/dist/base.css";

const initialNodes: ServerNode[] = [
  {
    id: incrementalId().toString(),
    data: { label: "Giorgio" },
  },
  {
    id: incrementalId().toString(),
    data: { label: "Giorgino" },
  },
];
const initialEdges: Edge[] = [
  {
    id: incrementalId().toString(),
    source: initialNodes[0].id,
    label: `Giorgiamoci`,
    target: initialNodes[1].id,
  },
];

const layer1 = {
  id: "1",
  isCurrent: true,
  nodes: stackedLayout(initialNodes, {
    direction: "TD",
    size: 4,
    margin: 0,
  }),
  edges: initialEdges,
};

const topNodes: ServerNode[] = [
  {
    id: incrementalId().toString(),
    position: { x: 0, y: 0 },
    data: { label: randomWord() },
  },
  {
    id: incrementalId().toString(),
    position: { x: 200, y: 100 },
    data: { label: randomWord() },
  },
];

const topEdges: Edge[] = [
  {
    id: incrementalId().toString(),
    source: topNodes[0].id,
    label: `Figuriamocu`,
    target: topNodes[1].id,
  },
];

const layer2 = {
  id: "2",
  isCurrent: true,
  nodes: stackedLayout(topNodes, {
    direction: "TD",
    size: 4,
    margin: 0,
  }),
  edges: topEdges,
};

export default function Home() {
  const [layers, setLayers] = useState<Layer[]>([layer1, layer2]);
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
          width: "80vw",
          height: "80vh",
          mx: "auto",
          my: 4,
          display: "flex",
          flexDirection: "column",
          gap: 2,
          borderRadius: "sm",
          boxShadow: "md",
          ".react-flow__controls-button": {
            background: "lightgrey",
            borderBottom: "none",
          },
          ".react-flow__controls": {
            background: "lightgrey",
          },
          ".react-flow__node": {
            px: 2,
            py: 1,
            borderRadius: "md",
            background: "#111",
          },
          ".react-flow__edge-text": {
            fill: "white",
            fontSize: "xs",
          },
          ".react-flow__edge-textbg": {
            fill: "#111",
          },
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
                  <Button key={layer.id}>{layer.id}</Button>
                ))}
              </ButtonGroup>
            </Panel>
          )}
        </ReactFlow>
      </Sheet>
    </Sheet>
  );
}
