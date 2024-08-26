"use client";
import { useCallback, useEffect, useRef } from "react";
import { getCsrfToken, signIn } from "next-auth/react";
import { SiweMessage } from "siwe";

import { Button } from "@nextui-org/button";

import WalletIcon from "@/public/icon/wallet.svg";

const SiweButton = () => {

  const modalOpened = useRef(false);


  return (
    <Button
      startContent={<WalletIcon className="text-default-500" width={24} />}
      variant="bordered"
    >
      Sign Up with Wallet
    </Button>
  );
};

export default SiweButton;
