"use client";

import React from "react";
import { CommandMenu } from "./CommandMenu";
import { DesktopNavbar } from "./DesktopNavbar";
import { MobileNavbar } from "./MobileNavbar";

export function Navbar() {
  return (
    <>
      <CommandMenu />
      <DesktopNavbar />
      <MobileNavbar />
    </>
  );
}
