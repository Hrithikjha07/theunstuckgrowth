import { CalendarIcon, ChevronLeftIcon, MenuIcon } from "lucide-react";
import React from "react";
import { Button } from "../ui/button";
import { Card, CardContent } from "../ui/card";

export const SuccessStories = () => {
  // Success stories data for mapping
  const successStories = [
    "A product leader who transitioned into a Principal PM role at Zalando after refining their analytical thinking and interview strategy.",
    "An engineer who moved into a Senior PM role at Amazon, mastering case studies and leadership principles",
    "An MBA student who secured a Consultant offer at McKinsey after rigorous coaching on case studies and PEI strategies",
    "A job seeker who successfully landed a Director role at Pinterest, navigating complex leadership interviews",
    "A UX designer who strengthened their portfolio and secured a role at Google",
    "A finance professional who pivoted into product management at JP Morgan",
    "A startup founder who successfully raised VC funding and achieved 50% user base growth",
    "MBA applicants who gained admission into Chicago Booth, Wharton, Kellogg, LBS, ISB, and more through essay reviews and interview prep",
  ];

  return (
    <div className="bg-white flex flex-row justify-center w-full">
      <div className="bg-white w-[393px] h-[1075px] relative">
        {/* Header */}
        <header className="fixed w-[393px] h-[90px] top-0 left-0 right-0 mx-auto bg-black">
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

        {/* Content Container - positioned below fixed header */}
        <div className="pt-[110px] px-5">
          {/* Back button */}
          <Button
            variant="outline"
            className="w-[84px] h-[30px] rounded-[20px] border border-solid border-black bg-white text-black text-xs py-0 px-4 flex items-center mb-5"
          >
            <ChevronLeftIcon className="h-3 w-3 mr-1" />
            BACK
          </Button>

          {/* Title */}
          <h2 className="w-full text-right font-bold text-[19px] text-[#000000b2] mb-6">
            SUCCESS STORIES
          </h2>

          {/* Subtitle */}
          <div className="w-full flex items-center justify-center px-[30px] py-2.5 mb-8">
            <p className="font-light text-black text-[18px] text-center leading-[24px]">
              We've had the privilege of working with some incredible
              professionals who have achieved outstanding results
            </p>
          </div>

          {/* Success stories list */}
          <div className="w-full">
            <Card className="w-full border-none shadow-none">
              <CardContent className="p-0">
                {successStories.map((story, index) => (
                  <div
                    key={index}
                    className="py-4 border-b border-[#000000b2] mb-3"
                  >
                    <div className="font-bold text-black text-[15px] leading-[19px]">
                      {story}
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SuccessStories; 