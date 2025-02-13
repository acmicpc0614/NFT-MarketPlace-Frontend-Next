"use client";
import { useCallback, useMemo } from "react";
// import { useSession } from "next-auth/react";
import { Image } from "@nextui-org/react";
import { usePathname, useRouter } from "next/navigation";

import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenu,
  NavbarMenuItem,
  NavbarMenuToggle,
  Link,
  Button,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Badge,
} from "@nextui-org/react";
import { Icon } from "@iconify/react";

// import ToggleProfile from "@/lib/components/profile/ToggleProfile";
import PrimaryButton from "@/lib/components/button/PrimaryButton";
import { ConnectButton } from "@rainbow-me/rainbowkit";

export default function Header() {
  const router = useRouter();
  let address = undefined;
  const path = usePathname();

  const onLogo = useCallback(() => {
    router.push("/");
  }, []);

  const logoElement = useMemo(() => {
    return (
      <Image
        classNames={{ img: "h-16 w-16" }}
        src="/logo.png"
        className="hover:cursor-pointer"
        onClick={onLogo}
        alt="Not Found"
      />
    );
  }, []);


  return (
    <div className="px-4 z-50 w-full fixed top-4">
      <Navbar
        classNames={{
          base: "bg-transparent backdrop-filter-none",
          wrapper:
            "px-4 sm:px-6 bg-white/15 border-1 border-white/30 backdrop-blur-xl backdrop-saturate-150 rounded-full",
          item: "data-[active=true]:text-primary max-w-[1536px]",
        }}
        height="100px"
        maxWidth="2xl"
      >
        <NavbarBrand>
          <NavbarMenuToggle className="mr-2 h-6 sm:hidden" />
          {logoElement}
        </NavbarBrand>
        <NavbarContent
          className="ml-4 hidden h-12 w-full max-w-fit gap-8 rounded-full px-8 sm:flex"
          justify="start"
        >
          <NavbarItem isActive={path.includes("explore") ? true : false}>
            <Link className="flex gap-2 text-inherit" href="/explore">
              Explorer POLICY
            </Link>
          </NavbarItem>
          <NavbarItem isActive={path.includes("create") ? true : false}>
            <Link
              aria-current="page"
              className="flex gap-2 text-inherit"
              href="/create"
            >
              Create POLICY
            </Link>
          </NavbarItem>
          <NavbarItem isActive={path.includes("eventpage") ? true : false}>
            <Link className="flex gap-2 text-inherit" href="/eventpage">
              EVENT
            </Link>
          </NavbarItem>
        </NavbarContent>
        <ConnectButton/>
        {/* Mobile Menu */}
        <NavbarMenu>
          <NavbarMenuItem isActive>
            <Link
              aria-current="page"
              className="w-full"
              color="primary"
              href="/explore"
            >
              Explorer POLICY
            </Link>
          </NavbarMenuItem>
          <NavbarMenuItem>
            <Link className="w-full" color="foreground" href="/create">
              Create POLICY
            </Link>
          </NavbarMenuItem>
          <NavbarMenuItem>
            <Link className="w-full" color="foreground" href="/eventpage">
              EVENT
            </Link>
          </NavbarMenuItem>
        </NavbarMenu>
      </Navbar>
    </div>
  );
}
