import type { Metadata } from "next";
import { JetBrains_Mono } from "next/font/google";

import "@stream-io/video-react-sdk/dist/css/styles.css";
import "./globals.css";

import ConvexClerkProvider from "../components/providers/ConvexClerkProvider";
import Navbar from "../components/Navbar";
import { ThemeProvider } from "../components/providers/ThemeProvider";
import { Toaster } from "react-hot-toast";

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "CodeInterview",
  description:
    "Inteligentni sistem za izvajanje tehničnih intervjujev z avtomatizirano analizo kandidatov",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className="min-h-full w-full overflow-x-clip"
    >
      <body
        className={[
          jetbrainsMono.variable,
          "min-h-dvh w-full overflow-x-clip",
          "font-mono antialiased",
          "bg-background text-foreground",
        ].join(" ")}
      >
        <ConvexClerkProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <div className="flex min-h-dvh w-full min-w-0 flex-col overflow-x-clip">
              <Navbar />

              <div className="min-w-0 flex-1">
                {children}
              </div>
            </div>
          </ThemeProvider>
          <Toaster />
        </ConvexClerkProvider>
      </body>
    </html>
  );
}