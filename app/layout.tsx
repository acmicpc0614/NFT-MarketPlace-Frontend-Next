import "@/styles/globals.css";
import "react-toastify/dist/ReactToastify.css";
import { Metadata, Viewport } from "next";
import clsx from "clsx";
import { ToastContainer } from "react-toastify";
import { Providers } from "./providers";
import { siteConfig } from "@/lib/config/site";
import { fontSans } from "@/lib/config/fonts";
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
    <html suppressHydrationWarning lang="en">
      <head />
      <body
        className={clsx(
          "min-h-screen bg-dark-blue font-sans antialiased",
          fontSans.variable
        )}
      >
        <Providers themeProps={{ attribute: "class", defaultTheme: "dark" }}>
          {children}
          <ToastContainer />
        </Providers>
      </body>
    </html>

  );
}
