import { trpcRootRouter } from "./trpcRouter";
import { createCallerFactory } from "./trpcServer";

export const createCaller = createCallerFactory(trpcRootRouter);

export const trpcCaller = createCaller({
  foo: "bar",
});
