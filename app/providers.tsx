"use client";

import * as React from "react";
import { NextUIProvider } from "@nextui-org/system";
import { useRouter } from "next/navigation";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { ThemeProviderProps } from "next-themes/dist/types";
import '@rainbow-me/rainbowkit/styles.css';
import {
  RainbowKitProvider,
  getDefaultWallets,
  getDefaultConfig,
} from "@rainbow-me/rainbowkit";
import {
  metaMaskWallet,
  rainbowWallet,
  walletConnectWallet,
  trustWallet,
  ledgerWallet,
  phantomWallet,
  okxWallet,
} from "@rainbow-me/rainbowkit/wallets";
import { base, baseSepolia, sepolia } from "wagmi/chains";
import  ActiveWeb3Provider from "@/lib/hooks/Web3Context";
import { WagmiProvider } from "wagmi";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
export interface ProvidersProps {
  children: React.ReactNode;
  themeProps?: ThemeProviderProps;
}
const { wallets } = getDefaultWallets();
const config = getDefaultConfig({
  appName: "RainbowKit demo",
  projectId: "e89228fed40d4c6e9520912214dfd68b",
  wallets: [
    ...wallets,
    {
      groupName: "Other",
      wallets: [metaMaskWallet],
    },
  ],
  chains: [
    baseSepolia,
    base,
    sepolia,
    // ...(process.env.NEXT_PUBLIC_ENABLE_TESTNETS === 'true' ? [sepolia] : []),
  ],
  ssr: true,
});

const queryClient = new QueryClient();
export function Providers({ children, themeProps }: ProvidersProps) {
  const router = useRouter();

  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider>
          <ActiveWeb3Provider>
            <NextUIProvider navigate={router.push}>
              <NextThemesProvider {...themeProps}>
                {children}
              </NextThemesProvider>
            </NextUIProvider>
          </ActiveWeb3Provider>
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}
