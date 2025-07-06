import type { Metadata } from "next";
import ClientProviders from "./ClientProviders";

export const metadata: Metadata = {
  title: "Entitree Flow",
  description: "wow",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </head>
      <body>
        <ClientProviders>{children}</ClientProviders>
      </body>
    </html>
  );
}
