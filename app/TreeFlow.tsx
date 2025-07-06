import { PersonNode } from "@/nodes/PersonNode";
import { Layer } from "@/types/Layer";
import { ClientTree } from "@/types/TreeNode";
import { Button, ButtonGroup } from "@mui/joy";
import {
  Background,
  BaseEdge,
  Connection,
  Controls,
  EdgeLabelRenderer,
  EdgeProps,
  getBezierPath,
  OnConnect,
  Panel,
  ReactFlow,
  useEdgesState,
  useNodesState,
  useReactFlow,
} from "@xyflow/react";
import { useCallback, useMemo, useState } from "react";

// Custom edge component to better display relationship labels
const CustomEdge = ({
  id,
  sourceX,
  sourceY,
  targetX,
  targetY,
  sourcePosition,
  targetPosition,
  style = {},
  label,
}: EdgeProps) => {
  const [edgePath, labelX, labelY] = getBezierPath({
    sourceX,
    sourceY,
    sourcePosition,
    targetX,
    targetY,
    targetPosition,
  });

  return (
    <>
      <BaseEdge
        id={id}
        path={edgePath}
        style={{
          ...style,
          strokeWidth: 4, // Thicker line
          stroke: "#64748b",
          zIndex: -1, // Render behind all content
          opacity: 0.5, // 0.5 opacity
        }}
      />
      <EdgeLabelRenderer>
        <div
          style={{
            position: "absolute",
            transform: `translate(-50%, -50%) translate(${labelX}px,${labelY}px)`,
            fontSize: 12,
            fontWeight: 500,
            background: "rgba(0, 0, 0, 0.8)",
            color: "white",
            padding: "2px 6px",
            borderRadius: "4px",
            pointerEvents: "none",
            zIndex: 10, // Render above edges but behind nodes
            maxWidth: "200px", // Limit width to approximate node width
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
          }}
          className="nodrag nopan"
          title={typeof label === "string" ? label : undefined} // Show full text on hover
        >
          {label}
        </div>
      </EdgeLabelRenderer>
    </>
  );
};

export const TreeFlow = ({ initialTree }: { initialTree: ClientTree }) => {
  const [layers, setLayers] = useState<Layer[]>([]);
  const [nodes, _setNodes, onNodesChange] = useNodesState(initialTree.nodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(
    initialTree.edges.map((edge) => ({
      ...edge,
      type: "custom",
      style: {
        strokeWidth: 4, // Thicker line
        stroke: "#64748b",
        zIndex: -1, // Render behind all content
        opacity: 0.5, // 0.5 opacity
      },
    }))
  );

  // Memoize nodeTypes and edgeTypes to prevent recreation on every render
  const nodeTypes = useMemo(
    () => ({
      personNode: PersonNode,
    }),
    []
  );

  const edgeTypes = useMemo(
    () => ({
      custom: CustomEdge,
    }),
    []
  );

  const onConnect: OnConnect = useCallback(
    (connection: Connection) => {
      const newEdge = {
        ...connection,
        id: `edge-${Date.now()}`, // Generate unique ID
        type: "custom",
        style: {
          strokeWidth: 4, // Thicker line
          stroke: "#64748b",
          zIndex: -1, // Render behind all content
          opacity: 0.5, // 0.5 opacity
        },
      };
      setEdges((eds) => [...eds, newEdge]);
    },
    [setEdges, nodes]
  );

  return (
    <ReactFlow
      nodes={nodes}
      edges={edges}
      onNodesChange={onNodesChange}
      onEdgesChange={onEdgesChange}
      onConnect={onConnect}
      fitView
      fitViewOptions={{
        padding: 0.1,
        includeHiddenNodes: false,
        minZoom: 0.5,
        maxZoom: 2,
      }}
      colorMode={"dark"}
      nodeTypes={nodeTypes}
      edgeTypes={edgeTypes}
      proOptions={{
        hideAttribution: true,
      }}
      // debug
    >
      <Background />
      <Panel position="top-left">
        <RandomButton />
      </Panel>
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
  );
};

const RandomButton = () => {
  const reactflowZ = useReactFlow();

  return (
    <Button
      onClick={() => {
        // const node = last(layer1.nodes);
        // reactflowZ.setCenter(
        //   node.position.x + node.width! / 2,
        //   node.position.y + node.height! / 2,
        //   { zoom: 2, duration: 500 }
        // );
      }}
    >
      Zoom random
    </Button>
  );
};
