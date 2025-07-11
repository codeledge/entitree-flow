import { edgeTypes } from "@/flowTypes/edgeTypes";
import { nodeTypes } from "@/flowTypes/nodeTypes";
import { Layer } from "@/types/Layer";
import { ClientTree } from "@/types/TreeNode";
import { Button, ButtonGroup } from "@mui/joy";
import {
  Background,
  Controls,
  Panel,
  ReactFlow,
  useEdgesState,
  useNodesState,
  useReactFlow,
} from "@xyflow/react";
import { useState } from "react";

export const TreeFlow = ({ initialTree }: { initialTree: ClientTree }) => {
  const [layers, setLayers] = useState<Layer[]>([]);
  const [nodes, _setNodes, onNodesChange] = useNodesState(initialTree.nodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialTree.edges);

  return (
    <ReactFlow
      nodes={nodes}
      edges={edges}
      onNodesChange={onNodesChange}
      onEdgesChange={onEdgesChange}
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
