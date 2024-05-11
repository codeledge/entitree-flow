import { PersonNode } from "@/nodes/PersonNode";
import { Layer } from "@/types/Layer";
import { TreeNode } from "@/types/TreeNode";
import { Button, ButtonGroup } from "@mui/joy";
import {
  addEdge,
  Background,
  Controls,
  Edge,
  OnConnect,
  Panel,
  ReactFlow,
  useEdgesState,
  useNodesState,
  useReactFlow,
} from "@xyflow/react";
import { useCallback, useState } from "react";

const nodeTypes = { personNode: PersonNode };

export const Flow = ({
  initialNodes,
  initialEdges,
}: {
  initialNodes: TreeNode[];
  initialEdges: Edge[];
}) => {
  const [layers, setLayers] = useState<Layer[]>([]);
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const onConnect: OnConnect = useCallback(
    (connection) => setEdges((eds) => addEdge(connection, eds)),
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
      colorMode={"dark"}
      nodeTypes={nodeTypes}
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
