import * as trpc from "@trpc/server";
import { CreateNextContextOptions } from "@trpc/server/adapters/next";

export const trpcContext = async (opts: CreateNextContextOptions) => {
  console.log("opts", opts);
  return {
    session: {},
  };
};

export type TrpcContext = trpc.inferAsyncReturnType<typeof trpcContext>;
