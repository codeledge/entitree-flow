"use client";
import { GlobalStyles } from "@mui/joy";
import CssBaseline from "@mui/joy/CssBaseline";
import { CssVarsProvider } from "@mui/joy/styles";
import * as React from "react";
import NextAppDirEmotionCacheProvider from "./EmotionCache";
import theme from "./theme";

export default function ThemeRegistry({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <NextAppDirEmotionCacheProvider options={{ key: "joy" }}>
      <CssVarsProvider theme={theme} defaultMode="dark">
        <CssBaseline />
        <GlobalStyles
          styles={(theme) => ({
            ":root": {
              "--Header-height": "52px",
            },
          })}
        />
        {children}
      </CssVarsProvider>
    </NextAppDirEmotionCacheProvider>
  );
}
