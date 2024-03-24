import React from "react";
import Link from "next/link";
import { CiSearch } from "react-icons/ci";
import { IoCartOutline } from "react-icons/io5";
import Infobar from "./Infobar";

const Header: React.FC = () => {
  const navLinks = ["Categories", "Sale", "Clearance", "New Stock", "Trending"];
  return (
    <header className="bg-white text-black flex flex-col py-4">
      <ul className="mr-5 flex w-full justify-end space-x-4 self-end">
        <li>
          <Link href="/">Help</Link>
        </li>
        <li>
          <Link href="/">Orders & Returns</Link>
        </li>
        <li>Hi, User</li>
      </ul>
      <nav className="container flex w-full pt-4">
        <h1 className=" text-4xl font-bold">
          <Link className="ml-6" href="/">
            ECOMMERCE
          </Link>
        </h1>
        <ul className="flex w-full align-center justify-items-center justify-center space-x-6 self-center">
          {navLinks.map((navLink) => (
            <li key={navLink}>
              <Link href="/" className="font-semibold">{navLink}</Link>
              </li>
          ))}
        </ul>
        <ul className="flex w-1/5 justify-center space-x-6 self-center justify-self-end">
          <li className="mr-5">
            <Link href="/">
              <CiSearch className="size-5" />
            </Link>
          </li>
          <li className="mr-5">
            <Link href="/">
              <IoCartOutline className="size-5" />
            </Link>
          </li>
        </ul>
      </nav>
      <Infobar />
    </header>
  );
};

export default Header;
