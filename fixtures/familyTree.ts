import { ServerTreeNode } from "@/types/TreeNode";
import { Edge } from "@xyflow/react";
import { incrementalId } from "deverything";

export const familyNodes: ServerTreeNode[] = [
  {
    id: incrementalId().toString(),
    data: { id: incrementalId().toString(), label: "Granpa" },
    type: "personNode",
  },
  {
    id: incrementalId().toString(),
    data: { id: incrementalId().toString(), label: "pa" },
    type: "personNode",
  },
  {
    id: incrementalId().toString(),
    data: { id: incrementalId().toString(), label: "me" },
    type: "personNode",
  },
  {
    id: incrementalId().toString(),
    data: { id: incrementalId().toString(), label: "gis" },
    type: "personNode",
  },
  {
    id: incrementalId().toString(),
    data: { id: incrementalId().toString(), label: "alby" },
    type: "personNode",
  },
  {
    id: incrementalId().toString(),
    data: { id: incrementalId().toString(), label: "mimmo" },
    type: "personNode",
  },
  {
    id: incrementalId().toString(),
    data: { id: incrementalId().toString(), label: "sis" },
    type: "personNode",
  },
  {
    id: incrementalId().toString(),
    data: { id: incrementalId().toString(), label: "uncle" },
    type: "personNode",
  },
  {
    id: incrementalId().toString(),
    data: { id: incrementalId().toString(), label: "aunty" },
    type: "personNode",
  },
];

export const familyEdges: Edge[] = [
  {
    id: incrementalId().toString(),
    source: familyNodes[0].id,
    label: `has`,
    target: familyNodes[1].id,
  },
  {
    id: incrementalId().toString(),
    source: familyNodes[1].id,
    label: `has`,
    target: familyNodes[2].id,
  },
  {
    id: incrementalId().toString(),
    source: familyNodes[2].id,
    label: `married to`,
    target: familyNodes[3].id,
  },
  {
    id: incrementalId().toString(),
    source: familyNodes[2].id,
    label: `has`,
    target: familyNodes[4].id,
  },
  {
    id: incrementalId().toString(),
    source: familyNodes[2].id,
    label: `has`,
    target: familyNodes[5].id,
  },
];
