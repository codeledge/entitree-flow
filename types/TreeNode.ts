import { Edge, Node } from "@xyflow/react";
import { PickRequired } from "deverything";

export type ServerTreeNodeData = {
  id: string;
  label: string;
  description?: string;
  image?: string;

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

  allowRelationshipCreation?: boolean; // Default false - controls whether relationships can be created from this node
};

export type ServerTreeNode = Omit<
  Node<ServerTreeNodeData>,
  "position" | "children"
>;

export type LayoutTreeNode = PickRequired<Node, "width" | "height"> &
  Node<
    ServerTreeNodeData & {
      groupBottomY: number;
      groupLeftX: number;
      groupMaxHeight: number;
      groupMaxWidth: number;
      groupRightX: number;
      groupTopY: number;
      marginBottom: number;
      marginRight: number;
      loadingChildren?: boolean;
      loadingParents?: boolean;
      loadingSideAfter?: boolean;
      loadingSideBefore?: boolean;
    }
  >;

export type ClientTree = {
  nodes: LayoutTreeNode[];
  edges: Edge[];
};

export type ServerTree = {
  nodes: ServerTreeNode[];
  edges: Edge[];
};
