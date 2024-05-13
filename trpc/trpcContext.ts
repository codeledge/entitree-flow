import { CreateNextContextOptions } from "@trpc/server/adapters/next";

export const trpcContext = async ({ req }: CreateNextContextOptions) => {
  return {
    // @ts-ignore
    session: 1 == 1 ? {} : 1 === 2 ? null : undefined,
  };
};

export type TrpcContext = Awaited<ReturnType<typeof trpcContext>>;
