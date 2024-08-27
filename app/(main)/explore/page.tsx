"use client";
import { useEffect, useState } from "react";
import {
  Button,
  Input,
  Breadcrumbs,
  BreadcrumbItem,
} from "@nextui-org/react";
import { Icon } from "@iconify/react";
import { useRouter } from "next/navigation";

import NFTDetails from "@/app/(main)/explore/NFTDetails.json";
import POLICY_TEST_DATA from"@/app/(main)/explore/PolicyTestList.json";
import PrimaryButton from "@/lib/components/button/PrimaryButton";
import useToast from "@/lib/hooks/toast/useToast";
import {POLICY_ABI} from "@/lib/constants/policyABI";
import {USDC_ABI} from "@/lib/constants/usdcABI";
import {POLICY_ADDRESS, USDC_ADDRESS} from "@/lib/constants/address"

import useWeb3 from "@/lib/hooks/useWeb3";
import { Contract, ethers } from "ethers";
import PolicyItem from "@/lib/components/policyItem/PolicyItem";


const Explorer = () => {
  const [selectedItem, setSelectedItem] = useState(0);
  const [selectedNFT, setSelectedNFT] = useState(-1);
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


  return (
    <div>
      <div className="container pt-32">
        <div className="flex justify-between items-center my-6">
          <span>
            <Breadcrumbs
              separator=">>"
              itemClasses={{
                separator: "px-2",
              }}
            >
              <BreadcrumbItem>Home</BreadcrumbItem>
              <BreadcrumbItem onClick={() => setSelectedNFT(-1)}>
                POLICY EXPLORE
              </BreadcrumbItem>
              {selectedNFT !== -1 && (
                <BreadcrumbItem>
                  {NFTDetails[selectedNFT - 1].name}
                </BreadcrumbItem>
              )}
            </Breadcrumbs>
          </span>
          <div className="flex flex-row gap-5">
            <Button radius="full" onClick={() => setSelectedItem(0)}>All POLICIES</Button>
            <Button radius="full" onClick={() => setSelectedItem(1)}>Purchased POLICY</Button>
            <Button radius="full" onClick={() => setSelectedItem(2)}>POLICY Management</Button>
          </div>
        </div>
        <div>
          <div className="flex flex-col lg:flex-row gap-4 p-2 mt-6 bg-white/10 rounded-md">
            <Input
              aria-label="Search"
              classNames={{
                inputWrapper: "w-full h-full bg-white/10",
              }}
              labelPlacement="outside"
              placeholder="Search Prompts"
              radius="sm"
              startContent={
                <Icon
                  className="text-default-500"
                  icon="solar:magnifer-linear"
                  width={20}
                />
              }
            />
          </div>
          <div className="explorer-identifier my-4 flex flex-wrap gap-2 lg:gap-4">
            <Button radius="full">#Something</Button>
            <Button radius="full">#Something</Button>
            <Button radius="full">#Something</Button>
            <Button radius="full">#Something</Button>
            <Button radius="full">#Something</Button>
            <Button radius="full">#Something</Button>
          </div>

          <div className="flex flex-col lg:flex-row gap-3 pb-6">
            <div className="w-full p-4 bg-white/5 rounded-md">
              <div className="lg:h-[calc(100vh-400px)]  ">
                <div className="w-full h-full flex justify-center items-center text-center">
                    {
                      selectedItem === 2 ? 
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
                            />
                          </div>
                        </div>
                        : selectedItem === 1 ? 
                        <div className="">puchased</div> : 
                        <div className="w-full h-full gap-4 flex flex-col max-h-112 overflow-y-auto">
                          {
                            POLICY_TEST_DATA.map((item, idx) => <PolicyItem key={idx} name={item.name} cost={item.cost} description={item.description}/>
                            )
                          }

                        </div>            
                      }
                  </div>
                </div>
              </div>
            </div> 
        </div>
      </div>
    </div>
  );
};

export default Explorer;
