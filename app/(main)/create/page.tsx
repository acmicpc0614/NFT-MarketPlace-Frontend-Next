"use client";
import { useEffect, useState } from "react";
// import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
// import { useAccount } from "wagmi";
import {
  Breadcrumbs,
  BreadcrumbItem,
  Spinner,
  Spacer,

} from "@nextui-org/react";

import ImageCard from "./components/ImageCard";

import PrimaryButton from "@/lib/components/button/PrimaryButton";

import useToast from "@/lib/hooks/toast/useToast";


enum WorkingTabs {
  Image = "image",
  Video = "video",
  Music = "music",
}

const CreateNFT = () => {
  const router = useRouter();
  // const { data } = useSession();
  // const { isConnected, address } = useAccount();

  const customToast = useToast();

  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [genImg, setGenImg] = useState<any[]>([]);
  const [selectedImage, setSelectedImage] = useState(0);
  const [inputText, setInputText] = useState("");


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
          <BreadcrumbItem>Create NFTs</BreadcrumbItem>
        </Breadcrumbs>
        <div className="flex flex-col lg:flex-row gap-3 pb-6">
          <div className="w-full p-4 bg-white/5 rounded-md">
            <div className="lg:h-[calc(100vh-220px)]  ">
              <div className="w-full h-full flex justify-center items-center text-center">
                {isGenerating && (
                  <Spinner
                    label="Loading..."
                    size="lg"
                    style={{ color: "#15BFFD", background: "transparent" }}
                  />
                )}
                {!isGenerating && genImg.length !== 3 && (
                  <div className="max-w-[500px] flex justify-center items-center flex-col text-center">
                    <img src="/generate.svg" alt="Not Found" />
                    <p>Generated images will appear here</p>
                    <p className="font-small">
                      Looks like you haven't created anything yet! Click the
                      button below to copy a sample prompt and then click
                      Generate.
                    </p>
                    <PrimaryButton
                      className="min-w-[300px] mt-8"
                      text="Use sample prompt"
                    />
                  </div>
                )}
                {!isGenerating && genImg.length === 3 && (
                  <div className="w-full">
                    <h3>Select Image and Mint Your NFT</h3>
                    <div className="mt-10 grid lg:grid-cols-3 gap-3">
                      {genImg.length === 3 &&
                        genImg.map((item, id) => {
                          return (
                            <ImageCard
                              key={id}
                              id={id}
                              selectedImage={selectedImage}
                              setSelectedImage={setSelectedImage}
                              imgSrc={item}
                              prompt={inputText}
                            />
                          );
                        })}
                    </div>
                    <Spacer y={6} />
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateNFT;
