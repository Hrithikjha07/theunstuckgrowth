import React from 'react';
import MobileLayout from '../layout/MobileLayout';

const CaseStudiesScreen = () => {
  // Case studies data
  const caseStudies = [
    {
      id: 1,
      title: "SCALING A MUSIC REVIEW PLATFORM",
      description: "Developed a promising music performance review platform.",
      link: "#"
    },
    {
      id: 2,
      title: "FUNDING FOR A GRIEF SUPPORT PLATFORM",
      description: "A grief support platform provided free mental health resources but struggled...",
      link: "#"
    },
    {
      id: 3,
      title: "SCALING A D2C COSMETIC BRAND",
      description: "A D2C brand selling cosmetics aimed to grow online sales while expanding into retail.",
      link: "#"
    },
    {
      id: 4,
      title: "STARTUP LAUNCH: LANGUAGE LEARNING APP",
      description: "A startup built a language learning app but faced difficulty in user acquisition and...",
      link: "#"
    }
  ];

  return (
    <MobileLayout title="CASE STUDIES">
      {/* Case studies list */}
      <div className="case-studies-list space-y-4 mt-4">
        {caseStudies.map((study) => (
          <div 
            key={study.id} 
            className="case-study-card border border-gray-300 rounded-lg p-4"
          >
            <h3 className="font-bold text-[16px] mb-2">{study.title}</h3>
            <p className="text-[14px] mb-2">{study.description}</p>
            <div className="text-right">
              <a 
                href={study.link} 
                className="text-[14px] font-medium"
              >
                Learn More
              </a>
            </div>
          </div>
        ))}
      </div>
    </MobileLayout>
  );
};

export default CaseStudiesScreen; 