"use client";
import Link from "next/link";
import { useCallback, useMemo } from "react";
import { useRouter } from "next/navigation";

export default function Footer() {
  const router = useRouter();

  const onLogo = useCallback(() => {
    router.push("/");
  }, []);

  const logoElement = useMemo(() => {
    return (
      <img src="/logo.png" role="button" tabIndex={0} className="hover:cursor-pointer h-[80px] w-[80px]" onClick={onLogo} alt="Not Found" />
    );
  }, []);

  return (
    <div className="w-full rounded-t-md border-t border-[#15BFFD44] ">
      <div className="footer__wrapper">
        <div className="footer__container">
          <footer className="">
            <div className="flex flex-col xl:flex-row mx-auto justify-between gap-10 py-4">
              <div className="flex flex-row gap-3">
                {logoElement}
                <div className="flex flex-col xl:gap-5 gap-2">
                  <div className="font-small  mt-3">
                  You will create a decentralized application that allows users to connect their wallets, interact with a smart contract, and purchase insurance coverage. The dApp should allow users to manage their insured assets and submit claims in case of an incident. You will create a decentralized application that allows users to connect their wallets, interact with a smart contract, and purchase insurance coverage. The dApp should allow users to manage their insured assets and submit claims in case of an incident.
                  </div>
{/*  TODO */}
                  <div className="flex gap-3 mt-3">
                    <span><img src="/socials/facebook.svg" alt="Not Found" /></span>
                    <span><img src="/socials/instagram.svg" alt="Not Found" /></span>
                    <span><img src="/socials/twitter.svg" alt="Not Found" /></span>
                    <span><img src="/socials/linkedin.svg" alt="Not Found" /></span>
                    <span><img src="/socials/telegram.svg" alt="Not Found" /></span>
                    <span><img src="/socials/discord.svg" alt="Not Found" /></span>
                    <span><img src="/socials/youtube.svg" alt="Not Found" /></span> 
                  </div>
                </div>
              </div>
              <div className="flex flex-row justify-between gap-10">
                <div className="font-small flex justify-between lg:gap-10">
                  <ul className="flex flex-col gap-2 lg:gap-4">
                    <li className="font-medium">Policy</li>
                    <li><Link href="/explore" />Explore</li>
                    <li><Link href="/explore" />Create</li>
                    <li><Link href="/explore" />Earn</li>
                    <li><Link href="/explore" />Campaign</li>
                  </ul>
                </div>
                <div className="max-w-[400px] flex flex-col justify-center gap-4">
                  <p className="text-[20px] font-bold">Stay in the loop</p>
                  <p className="font-small">You will create a decentralized application that allows users to connect their wallets, interact with a smart contract.</p>
                  <div className="relative flex rounded-md">
                    <div className="rounded-l-md p-2 bg-white/10">
                      <input type="email" className="font-small border-none outline-none bg-transparent" placeholder="Enter your email address" /> 
                    </div>
                    <div className="inset-0 bg-light-blue rounded-r-md flex items-center px-2 hover:cursor-pointer"><span>SUBSCRIBE</span></div>
                  </div>
                </div>
              </div>
            </div>
            <div className="w-full h-[1px] my-3 bg-white/10"></div>
            <p className="text-center text-[#727483]">Copyright ©2024BQ-Labs. All rights reserved.</p>
          </footer>
        </div>
      </div>
    </div>
  );
}