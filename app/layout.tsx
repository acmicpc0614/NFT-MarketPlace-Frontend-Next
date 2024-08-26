import "@/styles/globals.css";
import "react-toastify/dist/ReactToastify.css";
import dynamic from "next/dynamic";
import { Metadata, Viewport } from "next";
import { headers } from "next/headers";
import { getServerSession } from "next-auth";
import clsx from "clsx";
import { ToastContainer } from "react-toastify";
import { Providers } from "./providers";
import { siteConfig } from "@/lib/config/site";
import { fontSans } from "@/lib/config/fonts";


import AosProvider from "@/lib/providers/aosProvider";
const RainbowProvider = dynamic(() => import("@/lib/providers/rainbowProvider"), {
  ssr: false,
});
const ActiveWeb3Provider = dynamic(() => import("@/lib/providers/web3Provider"), {
  ssr: false,
});

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s - ${siteConfig.name}`,
  },
  description: siteConfig.description,
  icons: {
    icon: "/favicon.ico",
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  return (
    <AosProvider>
    <html suppressHydrationWarning lang="en">
      <head />
      <body
        className={clsx(
          "min-h-screen bg-dark-blue font-sans antialiased",
          fontSans.variable
        )}
      >
        <Providers themeProps={{ attribute: "class", defaultTheme: "dark" }}>
        <RainbowProvider>
        <ActiveWeb3Provider>
                  {children}
                  <ToastContainer />
                  </ActiveWeb3Provider>
                  </RainbowProvider>
        </Providers>
      </body>
    </html>
    </AosProvider>
  );
}
