import { ServerTreeNode } from "@/types/TreeNode";
import { Edge } from "@xyflow/react";
import { incrementalId, randomParagraph } from "deverything";

const familyNodes: ServerTreeNode[] = [
  {
    id: "1",
    data: {
      id: "1",
      label: "Super Granpa",
      description: randomParagraph(),
    },
    type: "PERSON_NODE",
  },
  {
    id: "2",
    data: {
      id: "2",
      label: "Super Granma",
      description: randomParagraph(),
    },
    type: "PERSON_NODE",
  },
  {
    id: "3",
    data: {
      id: "3",
      label: "Granpa",
      description: randomParagraph(),
    },
    type: "PERSON_NODE",
  },
  {
    id: "4",
    data: {
      id: "4",
      label: "pa",
    },
    type: "PERSON_NODE",
  },
  {
    id: "5",
    data: {
      id: "5",
      label: "me",
    },
    type: "PERSON_NODE",
  },
  {
    id: "6",
    data: {
      id: "6",
      label: "gis",
    },
    type: "PERSON_NODE",
  },
  {
    id: "7",
    data: {
      id: "7",
      label: "alby",
    },
    type: "PERSON_NODE",
  },
  {
    id: "8",
    data: {
      id: "8",
      label: "mimmo",
    },
    type: "PERSON_NODE",
  },
  {
    id: "9",
    data: {
      id: "9",
      label: "sis",
    },
    type: "PERSON_NODE",
  },
  {
    id: "10",
    data: {
      id: "10",
      label: "uncle",
    },
    type: "PERSON_NODE",
  },
  {
    id: "11",
    data: {
      id: "11",
      label: "aunty",
    },
    type: "PERSON_NODE",
  },
];

const familyEdges: Edge[] = [
  {
    id: incrementalId().toString(),
    source: familyNodes[0].id,
    label: `has`,
    target: familyNodes[2].id,
    type: "PERSON_EDGE",
  },
  {
    id: incrementalId().toString(),
    source: familyNodes[1].id,
    label: `has`,
    target: familyNodes[2].id,
    type: "PERSON_EDGE",
  },

  {
    id: incrementalId().toString(),
    source: familyNodes[2].id,
    label: randomParagraph(),
    target: familyNodes[3].id,
    type: "PERSON_EDGE",
  },
  {
    id: incrementalId().toString(),
    source: familyNodes[3].id,
    label: `has`,
    target: familyNodes[4].id,
    type: "PERSON_EDGE",
  },
  {
    id: incrementalId().toString(),
    source: familyNodes[4].id,
    label: `married to`,
    target: familyNodes[5].id,
    type: "PERSON_EDGE",
  },
  {
    id: incrementalId().toString(),
    source: familyNodes[4].id,
    label: `has`,
    target: familyNodes[6].id,
    type: "PERSON_EDGE",
  },
  {
    id: incrementalId().toString(),
    source: familyNodes[4].id,
    label: `has`,
    target: familyNodes[7].id,
    type: "PERSON_EDGE",
  },
];

familyNodes.forEach((node) => {
  node.data.childCount = familyEdges.filter(
    (edge) => edge.source === node.id
  ).length;
  node.data.parentCount = familyEdges.filter(
    (edge) => edge.target === node.id
  ).length;
});

export { familyEdges, familyNodes };
