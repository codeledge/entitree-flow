import { Session } from "next-auth";
import { trpcRootRouter } from "./trpcRouter";
import { createCallerFactory } from "./trpcServer";

export const createCaller = createCallerFactory(trpcRootRouter);

export const trpcCaller = ({ session }: { session?: Session | null }) =>
  createCaller({
    session,
  });
