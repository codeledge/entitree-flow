import { familyEdges, familyNodes } from "@/fixtures/familyTree";
import { z } from "zod";
import { publicProcedure, trpcRouter } from "./trpcServer";

export const trpcRootRouter = trpcRouter({
  getNode: publicProcedure
    .input(
      z.object({
        id: z.string(),
      })
    )
    .query(async ({ input }) => {
      const node = [...familyNodes];

      const rootNode = node.find((node) => node.id === input.id)!;
      rootNode.data.isRoot = true;
      rootNode.data.showChildren = true;
      rootNode.data.showParents = true;

      return { nodes: node, edges: familyEdges };
    }),
  getChildren: publicProcedure
    .input(
      z.object({
        parentId: z.string(),
      })
    )
    .query(async ({ input }) => {
      const edges = familyEdges.filter(
        ({ source }) => source === input.parentId
      );
      const nodes = familyNodes
        .filter(({ id }) => edges.some(({ target }) => target === id))
        .map((node) => {
          const childEdges = familyEdges.filter(
            ({ source }) => source === node.id
          );

          return {
            ...node,
            data: {
              ...node.data,
              childCount: childEdges.length,
            },
          };
        });
      return { nodes, edges };
    }),
});

export type TrpcRootRouter = typeof trpcRootRouter;
