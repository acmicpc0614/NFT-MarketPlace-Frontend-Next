"use client";
import React, { useEffect } from "react";

import Header from "@/lib/components/layout/Header";
import Footer from "@/lib/components/layout/Footer";

// import useAuthSession from "@/lib/auth/hooks/useAuthSession";
// import { removeLocalStorageItem, setLocalStorageItem } from "@/lib/storage";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {


  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  );
}
