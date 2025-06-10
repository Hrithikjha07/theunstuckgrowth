import React from 'react';
import MobileLayout from '../layout/MobileLayout';

const ServicesScreen = () => {
  // Service categories
  const serviceCategories = [
    {
      id: 1,
      title: "Product Advisory",
      expanded: true
    },
    {
      id: 2,
      title: "Start-Up Consulting",
      expanded: true
    },
    {
      id: 3,
      title: "TBA",
      expanded: true
    },
    {
      id: 4,
      title: "MBA Application",
      expanded: true
    }
  ];
  
  // Premium services
  const premiumServices = [
    {
      id: 1,
      title: "Paid Digital Guides & Templates",
      expanded: false
    },
    {
      id: 2,
      title: "Premium Notion Templates & Tools",
      expanded: false
    },
    {
      id: 3,
      title: "Mini-Courses & Micro-Learning Modules",
      expanded: true,
      hasSubscription: true
    },
    {
      id: 4,
      title: "Personalized Feedback Services",
      expanded: false
    },
    {
      id: 5,
      title: "Live & Recorded Workshops",
      expanded: false
    }
  ];
  
  // Subscription info
  const subscriptionInfo = {
    title: "Paid Community OR Subscription",
    tag: "PM Growth Circle",
    features: [
      "A private Slack/Discord group where members get exclusive guides, templates, and problem-solving sessions.",
      "Monthly live case studies & masterclasses",
      "A monthly membership where PMs can book quick 20-min calls with you for advice"
    ],
    ctaButtons: [
      {
        text: "Purchase",
        variant: "outline"
      },
      {
        text: "Subscribe",
        variant: "solid"
      }
    ]
  };

  return (
    <MobileLayout title="SERVICES">
      {/* Basic services */}
      <div className="services-section mb-8">
        {serviceCategories.map((category) => (
          <div key={category.id} className="service-category mb-2">
            <div className="service-header flex justify-between items-center py-3 border-b border-gray-300">
              <h3 className="font-medium text-[15px]">{category.title}</h3>
              <span>{category.expanded ? "▾" : "▸"}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Premium services */}
      <div className="premium-services-section mb-8">
        {premiumServices.map((service) => (
          <div key={service.id} className="premium-service mb-4">
            <div className="service-header flex justify-between items-center py-3 border-b border-gray-300">
              <h3 className="font-medium text-[15px]">{service.title}</h3>
              <span>{service.expanded ? "▾" : "Show ▸"}</span>
            </div>
            
            {/* If expanded and has subscription info */}
            {service.expanded && service.hasSubscription && (
              <div className="subscription-info mt-4 p-4 border border-gray-200 rounded-lg">
                <div className="subscription-header flex items-center mb-3">
                  <div className="icon-placeholder w-8 h-8 rounded-full bg-orange-400 mr-2"></div>
                  <div>
                    <h4 className="font-bold text-[14px]">{subscriptionInfo.title}</h4>
                    <div className="tag text-[12px] text-orange-500">{subscriptionInfo.tag}</div>
                  </div>
                </div>
                
                <ul className="feature-list mb-4">
                  {subscriptionInfo.features.map((feature, idx) => (
                    <li key={idx} className="mb-2 text-[13px] flex items-start">
                      <span className="mr-2">•</span>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                
                <div className="cta-buttons flex gap-3">
                  {subscriptionInfo.ctaButtons.map((button, idx) => (
                    <button 
                      key={idx} 
                      className={`py-2 px-4 rounded text-[14px] ${
                        button.variant === 'solid' 
                          ? 'bg-black text-white' 
                          : 'border border-black text-black'
                      }`}
                    >
                      {button.text}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* More basic services (repeated) */}
      <div className="more-services-section">
        {serviceCategories.map((category) => (
          <div key={`bottom-${category.id}`} className="service-category mb-2">
            <div className="service-header flex justify-between items-center py-3 border-b border-gray-300">
              <h3 className="font-medium text-[15px]">{category.title}</h3>
              <span>{category.expanded ? "▾" : "▸"}</span>
            </div>
          </div>
        ))}
      </div>
    </MobileLayout>
  );
};

export default ServicesScreen; 