import { initTRPC } from "@trpc/server";
import { TrpcContext } from "./trpcContext";

const trpcServer = initTRPC.context<TrpcContext>().create();

export const createCallerFactory = trpcServer.createCallerFactory;
export const trpcRouter = trpcServer.router;
export const publicProcedure = trpcServer.procedure;
