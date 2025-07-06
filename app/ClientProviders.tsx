"use client";
import TrpcProvider from "@/trpc/TrpcProvider";
import { ReactFlowProvider } from "@xyflow/react";
import React from "react";
import ThemeRegistry from "../themes/ThemeRegistry";

export default function ClientProviders({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ThemeRegistry>
      <TrpcProvider>
        <ReactFlowProvider>{children}</ReactFlowProvider>
      </TrpcProvider>
    </ThemeRegistry>
  );
}
