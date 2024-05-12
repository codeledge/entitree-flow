import { ServerTreeNodeData } from "@/types/TreeNode";
import { incrementalId, randomParagraph, randomWord } from "deverything";

export const randomServerTreeNode = (): ServerTreeNodeData => {
  return {
    id: incrementalId().toString(),
    label: randomWord(),
    description: randomParagraph(),
  };
};
