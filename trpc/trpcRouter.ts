import { z } from "zod";
import { publicProcedure, trpcRouter } from "./trpcServer";

export const trpcRootRouter = trpcRouter({
  getNode: publicProcedure
    .input(
      z.object({
        id: z.string(),
      })
    )
    .query(async () => {
      return;
    }),
});

export type TrpcRootRouter = typeof trpcRootRouter;
