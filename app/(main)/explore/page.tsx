"use client";
import { useEffect, useState } from "react";
import {
  Button,
  Input,
  Image,
  Switch,
  Breadcrumbs,
  BreadcrumbItem,
} from "@nextui-org/react";
import { Icon } from "@iconify/react";
import { useRouter } from "next/navigation";

import MultiCarousel from "@/lib/components/carousel/MultiCarousel";
import NFTShowcaseCard from "@/lib/components/card/NFTShowcaseCard";
import PrimaryButton from "@/lib/components/button/PrimaryButton";
import ImageContainer from "@/lib/components/container/ImageCotainer";
import { fetchServer } from "@/lib/net/fetch/fetch";
import useColNums from "@/lib/hooks/useColNums";

import FeaturedIcon from "@/public/icon/featured.svg";
import PFPIcon from "@/public/icon/pfp.svg";
import VideoIcon from "@/public/icon/movie.svg";
import MusicIcon from "@/public/icon/music.svg";
import NewIcon from "@/public/icon/new.svg";

import NFTDetails from "@/app/(main)/explore/NFTDetails.json";

import type { CommentType } from "@/lib/components/card/NFTViewCard";
import type { NFTData } from "@/app/(main)/profile/tabs/TabNFT";

const Explorer = () => {
  const [selectedItem, setSelectedItem] = useState(0);
  const [selectedNFT, setSelectedNFT] = useState(-1);
  const [listedNFTs, setListedNFTs] = useState<NFTData[]>([]);

  const router = useRouter();

  const cols = useColNums();

  useEffect(() => {
    const fetchListedNFTs = async () => {
      const res = await fetchServer("/nft/listed");

      setListedNFTs(res);
    };

    fetchListedNFTs();
  }, []);

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
          <Switch defaultSelected color="primary">
            <span>Buy Now</span>
          </Switch>
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
          <div className="explorer-identifier mt-8 flex flex-wrap gap-2 lg:gap-4">
            <Button radius="full">#Something</Button>
            <Button radius="full">#Something</Button>
            <Button radius="full">#Something</Button>
            <Button radius="full">#Something</Button>
            <Button radius="full">#Something</Button>
            <Button radius="full">#Something</Button>
          </div>

          <div className="mt-16 text-center">
            <h2 className="">Latest Polices</h2>
            <p className="mb-10">The latest Polices created by admin</p>
            <ImageContainer cols={cols}>
              {listedNFTs.map((nft, index) => {
                return (
                  <NFTShowcaseCard
                    key={index}
                    asset={`${process.env.NEXT_PUBLIC_API_BASE_URL}${nft.asset_url}`}
                    hash={nft.asset_hash}
                  />
                );
              })}
            </ImageContainer>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Explorer;
