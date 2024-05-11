import { Node } from "@xyflow/react";

export type TreeNode = Node<{
  label: string;
  description?: string;
  groupBottomY: number;
  groupLeftX: number;
  groupMaxHeight: number;
  groupMaxWidth: number;
  groupRightX: number;
  groupTopY: number;
  isAncestor?: boolean;
  isDescendant?: boolean;
  isSide?: boolean;
  isSideAfter?: boolean;
  isSideBefore?: boolean;
  isRoot?: boolean;
  isSource?: boolean;
  isTarget?: boolean;
  marginBottom: number;
  marginRight: number;
  childCount?: number;
  parentCount?: number;
  sideBeforeCount?: number;
  sideAfterCount?: number;
  showChildren?: boolean;
  showParents?: boolean;
}>;
