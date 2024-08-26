"use client";
import { useEffect, useState } from "react";
// import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
// import { useAccount } from "wagmi";
import {
  Breadcrumbs,
  BreadcrumbItem,
  Tab,
  Tabs,
  Spinner,
  Spacer,
  Input,
} from "@nextui-org/react";

import TabImage from "./components/tabs/TabImage";
import TabVideo from "./components/tabs/TabVideo";
import TabMusic from "./components/tabs/TabMusic";
import ImageCard from "./components/ImageCard";
import { GalleryIcon } from "./components/icons/GalleryIcon";
import { VideoIcon } from "./components/icons/VideoIcon";
import { MusicIcon } from "./components/icons/MusicIcon";
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

  const [activeTab, setActiveTab] = useState<WorkingTabs>(WorkingTabs.Image);
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [genImg, setGenImg] = useState<any[]>([]);
  const [selectedImage, setSelectedImage] = useState(0);
  const [inputText, setInputText] = useState("");
  const [model_id, setModel_id] = useState("");
  const [imageSize, setImageSize] = useState(0);
  const [nftName, setNftName] = useState("");
  const [royalty, setRoyalty] = useState(0);

  //hooks

  const imageSizeArr = [
    { width: 1024, height: 1024 },
    { width: 1024, height: 768 },
    { width: 768, height: 1024 },
    { width: 1024, height: 576 },
    { width: 576, height: 1024 },
  ];



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
          <div className="lg:max-w-[350px] px-3 bg-white/5 rounded-md  p-4 pr-0">
            <div className="lg:h-[calc(100vh-220px)] lg:overflow-y-auto pr-4 flex flex-col">
              <Tabs
                fullWidth
                color="primary"
                classNames={{
                  base: "w-full",
                  tabList:
                    "gap-3 px-3 py-0 w-full relative rounded-none border-b border-divider",
                  tabContent: "group-data-[selected=true]:text-[#06b6d4]",
                  cursor: "w-full bg-[#22d3ee]",
                  tab: "px-2 h-12",
                }}
                selectedKey={activeTab}
                variant="underlined"
                onSelectionChange={(selected) =>
                  setActiveTab(selected as WorkingTabs)
                }
              >
                <Tab
                  key="image"
                  title={
                    <div className="flex items-center space-x-1">
                      <GalleryIcon />
                      <span>Image</span>
                    </div>
                  }
                />
                <Tab
                  key="video"
                  title={
                    <div className="flex items-center space-x-1">
                      <VideoIcon />
                      <span>Video</span>
                    </div>
                  }
                />
                <Tab
                  key="music"
                  title={
                    <div className="flex items-center space-x-1">
                      <MusicIcon />
                      <span>Music</span>
                    </div>
                  }
                />
              </Tabs>
              {(
                <TabImage
                  modelSetter={setModel_id}
                  inputText={inputText}
                  setInputText={setInputText}
                  imageSize={imageSize}
                  setImageSize={setImageSize}
                />
              ) ||
                (activeTab == WorkingTabs.Video && <TabVideo />) ||
                (activeTab == WorkingTabs.Music && <TabMusic />)}
              <div className="flex flex-col gap-3 py-6">
                <div className="flex justify-center">
                  <PrimaryButton
                    text="Create Now"
                    isLoading={isGenerating}
                  />
                </div>
              </div>
            </div>
          </div>
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
