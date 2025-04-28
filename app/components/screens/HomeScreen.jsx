import React from 'react';
import MobileLayout from '../layout/MobileLayout';

const HomeScreen = () => {
  // Service cards data
  const serviceCards = [
    {
      id: 1,
      title: "Product Strategy",
      description: "From MVP definition to 0+1 builds to scaling. Strategic product planning and execution framework.",
      icon: "product-strategy"
    },
    {
      id: 2,
      title: "Marketing Strategy",
      description: "Positioning, messaging, promotion, and acquisition strategies to gain market traction.",
      icon: "marketing-strategy" 
    },
    {
      id: 3,
      title: "Go-To-Market",
      description: "Launch plans, funnels, and customer acquisition paths to drive traction and conversion.",
      icon: "go-to-market"
    },
    {
      id: 4,
      title: "Promotions & Growth",
      description: "Campaigns, user retention, and conversion optimization.",
      icon: "promotions-growth"
    }
  ];

  return (
    <MobileLayout showBackButton={false}>
      {/* Hero section */}
      <div className="hero-section mb-8">
        <h1 className="font-bold text-[28px] leading-[34px] text-black mb-3">
          A Modern Advisory Platform
        </h1>
        <h2 className="text-[18px] leading-[22px] text-black font-normal mb-5">
          for ambitious founders and professionals navigating their next big move.
        </h2>
        <p className="text-[15px] leading-[21px] text-black font-light mb-6">
          Whether you're launching your first startup, scaling a product, or transitioning into a new career—we provide the tools, strategies, and expert guidance to help you grow with clarity and confidence.
        </p>
      </div>

      {/* Partnership statement */}
      <div className="partnership-statement bg-gray-100 p-4 rounded-lg mb-10">
        <p className="text-[15px] leading-[19px] text-black font-medium text-center mb-4">
          We partner with early-stage startups and career-focused individuals to unlock traction, sharpen decision-making, and overcome growth blocks.
        </p>
      </div>

      {/* Service cards */}
      <div className="service-cards grid grid-cols-2 gap-4">
        {serviceCards.map((service) => (
          <div key={service.id} className="service-card bg-white border border-gray-200 rounded-lg p-4 flex flex-col items-center">
            <div className="service-icon-placeholder w-14 h-14 rounded-full bg-gray-200 mb-3"></div>
            <h3 className="text-[15px] font-bold text-center mb-2">{service.title}</h3>
            <p className="text-[12px] text-center">{service.description}</p>
          </div>
        ))}
      </div>
    </MobileLayout>
  );
};

export default HomeScreen; 