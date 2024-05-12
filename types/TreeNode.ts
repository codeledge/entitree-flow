import { Edge, Node } from "@xyflow/react";

export type ServerTreeNodeData = {
  id: string;
  label: string;
  description?: string;

  isAncestor?: boolean;
  isDescendant?: boolean;
  isSide?: boolean;
  isSideAfter?: boolean;
  isSideBefore?: boolean;
  isRoot?: boolean;
  isSource?: boolean;
  isTarget?: boolean;

  childCount?: number;
  parentCount?: number;
  sideBeforeCount?: number;
  sideAfterCount?: number;

  showChildren?: boolean;
  showParents?: boolean;
  showSideAfter?: boolean;
  showSideBefore?: boolean;
};

export type ServerTreeNode = Omit<Node<ServerTreeNodeData>, "position"> &
  Partial<Pick<Node<ServerTreeNodeData>, "position">>;

export type LayoutTreeNode = Node<
  ServerTreeNodeData & {
    groupBottomY: number;
    groupLeftX: number;
    groupMaxHeight: number;
    groupMaxWidth: number;
    groupRightX: number;
    groupTopY: number;
    marginBottom: number;
    marginRight: number;
  }
>;

export type ClientTree = {
  nodes: LayoutTreeNode[];
  edges: Edge[];
};
