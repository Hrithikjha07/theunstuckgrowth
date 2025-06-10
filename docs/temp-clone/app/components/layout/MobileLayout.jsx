import React from 'react';
import { CalendarIcon, ChevronLeftIcon, MenuIcon } from "lucide-react";
import { Button } from "../ui/button";

const MobileLayout = ({ children, showBackButton = true, title = "" }) => {
  return (
    <div className="mobile-layout bg-white w-[393px] mx-auto relative min-h-[700px]">
      {/* Header */}
      <header className="fixed w-[393px] h-[90px] top-0 left-0 right-0 mx-auto bg-black z-10">
        <div className="relative w-[357px] h-14 top-[22px] left-5">
          <div className="absolute w-[357px] h-[55px] top-0 left-0">
            <Button
              variant="ghost"
              className="flex flex-col w-10 h-10 items-center justify-center gap-2 absolute top-2 left-[315px] bg-[#00000033] rounded p-0"
            >
              <MenuIcon className="text-white" />
            </Button>

            <div className="absolute w-[120px] top-0 left-0 font-bold text-white text-[17px] tracking-[0] leading-[19px]">
              the unStuck gRowth
            </div>
          </div>

          <Button
            variant="ghost"
            className="absolute w-[58px] h-[55px] top-px left-[257px] p-0"
          >
            <CalendarIcon className="h-8 w-8 text-white" />
          </Button>
        </div>
      </header>

      {/* Content Container */}
      <div className="pt-[110px] px-5 pb-8">
        {/* Back button and title */}
        {(showBackButton || title) && (
          <div className="flex justify-between items-center mb-5">
            {showBackButton && (
              <Button
                variant="outline"
                className="w-[84px] h-[30px] rounded-[20px] border border-solid border-black bg-white text-black text-xs py-0 px-4 flex items-center"
              >
                <ChevronLeftIcon className="h-3 w-3 mr-1" />
                BACK
              </Button>
            )}
            
            {title && (
              <h2 className="text-right font-bold text-[19px] text-[#000000b2] ml-auto">
                {title}
              </h2>
            )}
          </div>
        )}

        {/* Page content */}
        {children}
      </div>
    </div>
  );
};

export default MobileLayout; 