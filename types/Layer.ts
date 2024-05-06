import { Edge, Node } from "@xyflow/react";

export type Layer = {
  id: string;
  isCurrent: boolean;
  nodes: Node[];
  edges: Edge[];
};
