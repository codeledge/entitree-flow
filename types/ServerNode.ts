import { Node } from "@xyflow/react";

export type ServerNode = Omit<Node, "position"> &
  Partial<Pick<Node, "position">>;
