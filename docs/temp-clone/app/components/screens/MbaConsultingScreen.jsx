import React from 'react';
import MobileLayout from '../layout/MobileLayout';

const MbaConsultingScreen = () => {
  // MBA Consulting service details
  const serviceDetails = {
    title: "MBA APPLICATION CONSULTING",
    features: [
      "Four 1-hour call for each school.",
      "Personalized Strategy",
      "Target School Selection",
      "Essay and CV Guidance"
    ],
    ctaText: "Learn More"
  };

  // Form fields
  const formFields = [
    { id: "firstName", label: "First Name", type: "text" },
    { id: "lastName", label: "Last Name", type: "text" },
    { id: "jobTitle", label: "Job Title", type: "text" },
    { id: "email", label: "Email", type: "email" },
    { id: "message", label: "Message", type: "textarea" }
  ];

  return (
    <MobileLayout title="MBA APPLICATION CONSULTING">
      {/* Service description */}
      <div className="service-description mb-6">
        <div className="icon-placeholder mb-4 flex justify-center">
          <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center">
            <span className="text-2xl">🎓</span>
          </div>
        </div>
        
        <h2 className="text-[18px] font-bold mb-2 text-center">{serviceDetails.title}</h2>
        
        <ul className="feature-list mb-4">
          {serviceDetails.features.map((feature, idx) => (
            <li key={idx} className="mb-2 text-[14px] flex items-start">
              <span className="mr-2">•</span>
              <span>{feature}</span>
            </li>
          ))}
        </ul>
        
        <button className="w-full py-2 border border-black rounded mb-8">
          {serviceDetails.ctaText}
        </button>
      </div>

      {/* Contact form */}
      <div className="contact-form mb-8">
        <h3 className="text-[16px] font-bold mb-4">MBA APPLICATION:</h3>
        <p className="text-[14px] text-gray-600 mb-4">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
        </p>
        
        <form className="space-y-4">
          {formFields.map((field) => (
            <div key={field.id} className="form-field">
              <input 
                type={field.type}
                id={field.id}
                placeholder={field.label}
                className="w-full p-2 border border-gray-300 rounded"
              />
            </div>
          ))}
          
          <button className="w-full py-3 bg-black text-white rounded font-medium">
            Book a FREE CONSULTATION
          </button>
        </form>
      </div>
    </MobileLayout>
  );
};

export default MbaConsultingScreen; 