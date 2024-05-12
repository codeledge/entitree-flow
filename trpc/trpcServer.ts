import { initTRPC } from "@trpc/server";

const t = initTRPC.create();

export const createCallerFactory = t.createCallerFactory;
export const trpcRouter = t.router;
export const publicProcedure = t.procedure;
