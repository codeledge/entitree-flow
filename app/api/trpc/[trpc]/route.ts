import { trpcRootRouter } from "@/trpc/trpcRouter";
import { fetchRequestHandler } from "@trpc/server/adapters/fetch";

const handler = (req: Request) => {
  return fetchRequestHandler({
    endpoint: "/api/trpc",
    req,
    router: trpcRootRouter,
    // createContext: trpcContext,
  });
};

export { handler as GET, handler as POST };
