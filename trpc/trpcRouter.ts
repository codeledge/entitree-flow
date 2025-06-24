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
      const node = familyNodes.find((node) => node.id === input.id)!;

      const edges = familyEdges.filter(({ source }) => source === node.id);

      node.data.childCount = edges.length;

      return node;
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
          node.data.childCount = childEdges.length;
          return node;
        });
      return { nodes, edges };
    }),
});

export type TrpcRootRouter = typeof trpcRootRouter;
