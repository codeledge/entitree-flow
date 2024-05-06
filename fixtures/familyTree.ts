import { ServerNode } from "@/types/ServerNode";
import { Edge } from "@xyflow/react";
import { incrementalId } from "deverything";

export const familyNodes: ServerNode[] = [
  {
    id: incrementalId().toString(),
    data: { label: "Granpa" },
  },
  {
    id: incrementalId().toString(),
    data: { label: "pa" },
  },
  {
    id: incrementalId().toString(),
    data: { label: "me" },
  },
  {
    id: incrementalId().toString(),
    data: { label: "gis" },
  },
  {
    id: incrementalId().toString(),
    data: { label: "alby" },
  },
  {
    id: incrementalId().toString(),
    data: { label: "mimmo" },
  },
  {
    id: incrementalId().toString(),
    data: { label: "sis" },
  },
  {
    id: incrementalId().toString(),
    data: { label: "uncle" },
  },
  {
    id: incrementalId().toString(),
    data: { label: "aunty" },
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
