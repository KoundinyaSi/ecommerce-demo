import React, {ReactNode} from 'react';
import Header from './Header';
import { Inter } from "next/font/google";

interface LayoutProps {
    children: ReactNode;
  }
  
  const inter = Inter({
    subsets: ["latin"],
    variable: "--font-sans",
  });

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div>
      <Header />
      <main>{children}</main>
      {/* Add footer or other shared components here */}
    </div>
  );
};

export default Layout;
