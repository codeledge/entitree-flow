import { createTRPCReact } from "@trpc/react-query";
import { TrpcRootRouter } from "./trpcRouter";

export const trpcReact = createTRPCReact<TrpcRootRouter>({});
