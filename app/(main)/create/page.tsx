"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import {
  Breadcrumbs,
  BreadcrumbItem,
  Input,

} from "@nextui-org/react";

import {POLICY_ABI} from "@/lib/constants/policyABI";
import {USDC_ABI} from "@/lib/constants/usdcABI";
import {POLICY_ADDRESS, USDC_ADDRESS} from "@/lib/constants/address"

import useWeb3 from "@/lib/hooks/useWeb3";
import useToast from "@/lib/hooks/toast/useToast";
import PrimaryButton from "@/lib/components/button/PrimaryButton";
import { Contract, ethers } from "ethers";

const CreateNFT = () => {

  const router = useRouter();
  const customToast = useToast();

  const {
    address,
    isConnected,
    isConnecting,
    isReconnecting,
    connector,
    chainId,
    signer,
  } = useWeb3();

  const [contractFactory, setContractFactory] = useState<Contract | undefined>(
    undefined
  );
  const [USDC_contract, setUSDC_contract] = useState<Contract | undefined>(
    undefined
  );
  const [userAddress, setUserAddress] = useState<any>(undefined);

  useEffect(() => {
    if (address && chainId && signer) {
      const _contractFactory = new ethers.Contract(
        POLICY_ADDRESS,
        POLICY_ABI,
        signer
      );
      setContractFactory(_contractFactory);// policy contract

      const _contractMarketplace = new ethers.Contract(
        USDC_ADDRESS,
        USDC_ABI,
        signer
      );
      setUSDC_contract(_contractMarketplace); // usdc contract
      setUserAddress(signer._address);
    }
  }, [address, chainId, signer]);

  const isAdmin = async () => {
    if(userAddress === undefined) return false;
    try {
      if(!contractFactory) throw "no contract factory";
      const isadmin = async () => contractFactory.isAdmin(userAddress);
      return isadmin;
    } catch (error:any) {
      return false;
    }
  }

  const handlePolicyAdd = async () => {
    const isAdminFlag = await isAdmin();
    try {
      if(isAdminFlag) {
        if(!contractFactory) throw "no contract factory";
        const tx1 = await contractFactory.addPolicy(
          "first Policy", 100, "This is description for first policy."
        );
        await tx1.wait();
        customToast("success", "Successfully added policy.");
      }
      else  {
        customToast("failed", "Only admin can add policy.");
      }
    } catch(err:any) {
      if(String(err.code) === "ACTION_REHECTED")
        customToast("failed", "Rejected transaction.");
      else customToast("failed", "Unknown error has occured.");
    }
  }

  return (
    <div className=" pt-32">
      <div className="container" id="detailed-container">
        <Breadcrumbs
          separator=">>"
          itemClasses={{
            separator: "px-2",
          }}
          className="my-6"
        >
          <BreadcrumbItem>Home</BreadcrumbItem>
          <BreadcrumbItem>Create Policies</BreadcrumbItem>
        </Breadcrumbs>
        <div className="flex flex-col lg:flex-row gap-3 pb-6">
          <div className="w-full p-4 bg-white/5 rounded-md">
            <div className="lg:h-[calc(100vh-400px)]  ">
              <div className="w-full h-full flex justify-center items-center text-center">
                <div className="flex flex-col gap-10 w-[80%] max-w-[1000px]">
                  <Input
                    label="Policy name"
                    name="name"
                    placeholder="Enter your Policy name"
                    type="text"
                    variant="underlined"
                  />
                  <Input
                    label="Policy Cost"
                    name="cost"
                    placeholder="100"
                    type="number"
                    variant="underlined"
                  />                    
                  <Input
                    label="Policy Description"
                    name="description"
                    placeholder="Enter your Policy description"
                    type="text"
                    variant="underlined"
                  />
                  <div className="w-full flex justify-center">
                    <PrimaryButton
                      text="Add Policy"
                      className="w-[400px]"
                      onClick={handlePolicyAdd}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateNFT;
