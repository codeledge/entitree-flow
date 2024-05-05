import { Edge, Node } from "reactflow";

export type Layer = {
  id: string;
  isCurrent: boolean;
  nodes: Node[];
  edges: Edge[];
};
