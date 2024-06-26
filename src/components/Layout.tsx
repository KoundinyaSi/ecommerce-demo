import React, { ReactNode } from "react";
import Header from "./Header";
import { Inter } from "next/font/google";

interface LayoutProps {
  children: ReactNode;
}

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="align-center flex w-full flex-col justify-items-center font-interSans">
      <Header />
      {children}
    </div>
  );
};

export default Layout;
