import Link from "next/link";
import React from "react";
import ThemeSwitch from "./ThemeSwitch";
import { Lilita_One } from "next/font/google";

const font = Lilita_One({ weight: "400", subsets: ["latin"] });

const Navbar = () => {
  return (
    <div className="mx-auto max-w-5xl px-6 sticky top-0 rounded-3xl">
      <div className="flex justify-between items-center h-16 w-full">
        <Link href="/">
          <div className={`font-bold text-3xl dark:text-amber-50`}>
            ex
            <span className="text-blue-500">ploring</span>
          </div>
        </Link>
        <ThemeSwitch />
      </div>
    </div>
  );
};

export default Navbar;
