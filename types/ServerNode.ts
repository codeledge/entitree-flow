import { Node } from "@xyflow/react";

export type NodeData = {
  label: string;
  description?: string;
};

export type ServerNode = Omit<Node<NodeData>, "position"> &
  Partial<Pick<Node<NodeData>, "position">>;
