import React from "react";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

const Infobar: React.FC = () => {
  return (
    <div className="py-3 mt-4 w-full bg-[#F4F4F4] flex flex-row items-center justify-center">
      <IoIosArrowBack />
      <h3 className="px-6 text-center font-extra-semibold">
        Get 10% off on business sign up
      </h3>
      <IoIosArrowForward />
    </div>
  );
};
export default Infobar;
