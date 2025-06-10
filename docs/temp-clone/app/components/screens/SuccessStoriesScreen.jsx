import React from 'react';
import MobileLayout from '../layout/MobileLayout';
import { Card, CardContent } from '../ui/card';

const SuccessStoriesScreen = () => {
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
    <MobileLayout title="SUCCESS STORIES">
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
    </MobileLayout>
  );
};

export default SuccessStoriesScreen; 