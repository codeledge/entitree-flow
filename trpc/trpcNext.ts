import { httpBatchLink } from "@trpc/client";
import { trpcRootRouter } from "./trpcRouter";

export const serverClient = trpcRootRouter.createCaller({
  links: [
    httpBatchLink({
      url: "http://localhost:3000/api/trpc",
    }),
  ],
});
