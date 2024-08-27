"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";

import PrimaryButton from "@/lib/components/button/PrimaryButton";


const HeroStatus = ({
  icon,
  state,
  text,
}: {
  icon: string;
  state: string;
  text: string;
}) => {
  return (
  <div className="flex items-center hover:cursor-pointer transition-transform duration-100">
      <img className="w-10 h-10 lg:w-20 lg:h-20" src={icon} alt="Not Found" />
      <div className="ml-3">
        <p className="text-[18px] lg:text-[32px] font-semibold leading-[100%]">
          {state}
        </p>
        <p className="mt-2 text-[10px] lg:text-[16px]">{text}</p>
      </div>
    </div>
  );
};

export default function HeroSection() {
  const router = useRouter();

  return (
    <section className="">
      <div className="container">
        <div className="flex flex-col lg:flex-row flex-wrap py-4">
          <div className="flex-[50%] flex items-center">
            <div>
              <h2 className="">
              BQ Labs Insurance
              Protocol
                <p className="gradient">Policy World</p>
              </h2>
              <p className="mt-4 mb-8">
              You will create a decentralized application that allows users to connect their wallets, interact with a smart contract, and purchase insurance coverage. The dApp should allow users to manage their insured assets and submit claims in case of an incident.
              </p>
              <div className="flex flex-col lg:flex-row items-center gap-4 lg:gap-8">
                <PrimaryButton
                  text="Get Started"
                  className="w-[200px]"
                  onClick={() => router.push("/")}
                />
                <Link
                  href="https://web.telegram.org/"
                  className="text-[16px] text-light-blue font-medium underline underline-offset-4 uppercase"
                >
                  Join Community
                </Link>
              </div>
            </div>
          </div>
          <div className="flex-[50%]">
            <img src="/state.png" className="float-right" alt="Not Found" />
          </div>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 justify-items-stretch gap-y-4 bg-white/5 rounded-md p-4 lg:py-6 lg:px-10">
          <HeroStatus icon="/total.svg" state="9526" text="Total Items" />
          <HeroStatus icon="/users.svg" state="1420" text="Total Owners" />
          <HeroStatus icon="/floor.svg" state="0.50" text="Floor Price" />
          <HeroStatus
            icon="/volume.svg"
            state="10.1K"
            text="Volume Traded (ETH)"
          />
        </div>
      </div>
    </section>
  );
}
