import { ServerNode } from "@/types/ServerNode";
import { Edge } from "@xyflow/react";
import { incrementalId } from "deverything";

export const familyNodes: ServerNode[] = [
  {
    id: incrementalId().toString(),
    data: { label: "Granpa" },
    type: "personNode",
  },
  {
    id: incrementalId().toString(),
    data: { label: "pa" },
    type: "personNode",
  },
  {
    id: incrementalId().toString(),
    data: { label: "me" },
    type: "personNode",
  },
  {
    id: incrementalId().toString(),
    data: { label: "gis" },
    type: "personNode",
  },
  {
    id: incrementalId().toString(),
    data: { label: "alby" },
    type: "personNode",
  },
  {
    id: incrementalId().toString(),
    data: { label: "mimmo" },
    type: "personNode",
  },
  {
    id: incrementalId().toString(),
    data: { label: "sis" },
    type: "personNode",
  },
  {
    id: incrementalId().toString(),
    data: { label: "uncle" },
    type: "personNode",
  },
  {
    id: incrementalId().toString(),
    data: { label: "aunty" },
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
