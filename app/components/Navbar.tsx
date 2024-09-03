import Link from "next/link";
import React from "react";
import ThemeSwitch from "./ThemeSwitch";


const Navbar = () => {
  return (
    <div className="mx-auto max-w-5xl px-6 sticky top-5 rounded-3xl bg-white dark:bg-gray-800">
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
