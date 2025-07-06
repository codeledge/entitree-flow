import { PersonNode } from "@/nodes/PersonNode";
import { Layer } from "@/types/Layer";
import { ClientTree } from "@/types/TreeNode";
import { Button, ButtonGroup } from "@mui/joy";
import {
  addEdge,
  Background,
  BaseEdge,
  Connection,
  Controls,
  EdgeLabelRenderer,
  EdgeProps,
  getBezierPath,
  MarkerType,
  OnConnect,
  Panel,
  ReactFlow,
  useEdgesState,
  useNodesState,
  useReactFlow,
} from "@xyflow/react";
import { useCallback, useState } from "react";

const nodeTypes = { personNode: PersonNode };

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
  markerEnd,
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
          strokeWidth: 2,
          stroke: "#64748b",
        }}
        markerEnd={markerEnd}
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
            zIndex: 1000,
          }}
          className="nodrag nopan"
        >
          {label}
        </div>
      </EdgeLabelRenderer>
    </>
  );
};

const edgeTypes = {
  custom: CustomEdge,
};

export const TreeFlow = ({ initialTree }: { initialTree: ClientTree }) => {
  const [layers, setLayers] = useState<Layer[]>([]);
  const [nodes, _setNodes, onNodesChange] = useNodesState(initialTree.nodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(
    initialTree.edges.map((edge) => ({
      ...edge,
      type: "custom",
      markerEnd: {
        type: MarkerType.ArrowClosed,
        width: 20,
        height: 20,
        color: "#64748b",
      },
      style: {
        strokeWidth: 2,
        stroke: "#64748b",
      },
    }))
  );

  const onConnect: OnConnect = useCallback(
    (connection: Connection) => {
      const newEdge = {
        ...connection,
        type: "custom",
        markerEnd: {
          type: MarkerType.ArrowClosed,
          width: 20,
          height: 20,
          color: "#64748b",
        },
        style: {
          strokeWidth: 2,
          stroke: "#64748b",
        },
      };
      setEdges((eds) => addEdge(newEdge, eds));
    },
    [setEdges]
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
