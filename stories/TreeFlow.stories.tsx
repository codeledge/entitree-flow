import { randomServerTreeNode } from "@/fixtures/randomTreeNode";
import type { Meta, StoryObj } from "@storybook/react";
import { Edge, ReactFlowProvider } from "@xyflow/react";
import { incrementalId } from "deverything";
import HomeClientPage from "../app/HomeClientPage";
import { familyEdges, familyNodes } from "../fixtures/familyTree";
import { treeLayout } from "../lib/treeLayout";
import ThemeRegistry from "../themes/ThemeRegistry";
import TrpcProvider from "../trpc/TrpcProvider";
import { ClientTree, ServerTreeNode } from "../types/TreeNode";

// Create a wrapper component with necessary providers
const HomeClientPageWrapper = ({
  initialTree,
}: {
  initialTree: ClientTree;
}) => {
  return (
    <TrpcProvider>
      <ThemeRegistry>
        <ReactFlowProvider>
          <HomeClientPage initialTree={initialTree} />
        </ReactFlowProvider>
      </ThemeRegistry>
    </TrpcProvider>
  );
};

const meta: Meta<typeof HomeClientPageWrapper> = {
  title: "Pages/HomeClientPage",
  component: HomeClientPageWrapper,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
  argTypes: {
    initialTree: {
      control: "object",
      description: "Initial tree data with nodes and edges",
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// Create a proper ClientTree using the treeLayout function
const createSampleTree = (): ClientTree => {
  // Set one node as root
  const nodesWithRoot = familyNodes.map((node, index) => ({
    ...node,
    data: {
      ...node.data,
      isRoot: index === 0, // Make first node the root
      parentCount: 3,
      childCount: 322,
    },
  }));

  return treeLayout(nodesWithRoot, familyEdges);
};

// Sample tree data
const sampleTree: ClientTree = createSampleTree();

export const Default: Story = {
  args: {
    initialTree: sampleTree,
  },
};

export const Empty: Story = {
  args: {
    initialTree: {
      nodes: [],
      edges: [],
    },
  },
};

export const SingleNode: Story = {
  args: {
    initialTree: (() => {
      const singleNodeWithRoot = [
        { ...familyNodes[0], data: { ...familyNodes[0].data, isRoot: true } },
      ];
      return treeLayout(singleNodeWithRoot, []);
    })(),
  },
};

export const Onechild: Story = {
  args: {
    initialTree: (() => {
      const nodes: ServerTreeNode[] = [
        {
          id: incrementalId().toString(),
          data: {
            ...randomServerTreeNode(),
            isRoot: true,
            childCount: 1,
          },
          type: "personNode",
        },
        {
          id: incrementalId().toString(),
          data: { ...randomServerTreeNode() },
          type: "personNode",
        },
      ];

      const edges: Edge[] = [
        {
          id: incrementalId().toString(),
          source: familyNodes[0].id,
          label: `has`,
          target: familyNodes[1].id,
        },
      ];

      return treeLayout(nodes, edges);
    })(),
  },
};
