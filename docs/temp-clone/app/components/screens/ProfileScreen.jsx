import React from 'react';
import MobileLayout from '../layout/MobileLayout';

const ProfileScreen = () => {
  // Stats data
  const stats = [
    {
      number: "200+",
      description: "candidates were admitted to top Master's and MBA universities, including ",
      highlight: "Kellogg, ESCP France, Ross, Chicago, Booth, Wharton, NYU, LBS",
      ending: ", & more."
    },
    {
      number: "500+",
      description: "Professionals secured roles at ",
      highlight: "Amazon, Google, Microsoft, Tesla, McKinsey, Blue Origin, Palantir, Capital One, Meta, Walmart, JP Morgan",
      ending: ", and more."
    }
  ];

  // Testimonial data
  const testimonial = {
    text: "I had a fantastic session with Swati. She reviewed my resume thoroughly and supported me exactly where I needed to change things, something that I really needed at this point. Overall, I had a wonderful experience with her.",
    author: "—Product Design Manager, Synchrony"
  };

  // Services data
  const services = [
    {
      id: 1,
      title: "MBA APPLICATION CONSULTING",
      features: [
        "Four 1-hour call for each school.",
        "Personalized Strategy",
        "Target School Selection",
        "Essay and CV Guidance"
      ]
    },
    {
      id: 2,
      title: "ADVISORY SERVICE / CAREER ACCELERATION OR JOB SEARCH",
      features: [
        "Resume Review",
        "Portfolio Development/Review",
        "Skill Building",
        "End-to-End Job Search Strategy"
      ]
    },
    {
      id: 3,
      title: "START-UP ADVISORY",
      features: [
        "Product Strategy",
        "Marketing Strategy",
        "Go-to-Market Planning",
        "Business Growth",
        "Startup Scaling"
      ]
    }
  ];

  return (
    <MobileLayout showBackButton={false}>
      {/* Profile header */}
      <div className="profile-header flex mb-6">
        <div className="profile-image w-1/3">
          <div className="w-20 h-20 bg-gray-300 rounded-md overflow-hidden">
            <img src="/images/swati.jpg" alt="Swati Shukla" className="w-full h-full object-cover" />
          </div>
          <div className="text-[12px] text-gray-700 mt-1">Mentor/Advisor</div>
        </div>
        <div className="profile-title w-2/3">
          <h1 className="text-[32px] font-bold leading-9">SWATI<br />SHUKLA</h1>
        </div>
      </div>

      {/* Bio */}
      <div className="bio mb-6">
        <p className="text-[15px] leading-tight">
          A results-driven <strong>product leader, mentor, and startup advisor with 15 years of experience in product management, strategy, analytics, and sales & marketing across global organizations, including Amazon, McKinsey.</strong> Having built and scaled B2B and B2C products, led cross-functional teams, and driven high-impact innovations, I leverage my expertise to <strong>empower professionals and startups to achieve their goals</strong>. Beyond my corporate career, I am passionate about <strong>mentorship and career coaching</strong>.
        </p>
      </div>

      {/* Stats */}
      <div className="stats-section bg-gray-200 p-4 rounded-lg mb-6">
        <div className="grid grid-cols-2 gap-4">
          {stats.map((stat, index) => (
            <div key={index} className="stat-card">
              <div className="stat-number text-[24px] font-bold mb-1">{stat.number}</div>
              <p className="stat-text text-[12px]">
                {stat.description}
                <strong>{stat.highlight}</strong>
                {stat.ending}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Testimonial */}
      <div className="testimonial bg-blue-300 p-4 rounded-lg mb-6">
        <div className="quote-icon text-[32px] mb-2">❝</div>
        <p className="quote-text text-[14px] mb-2">{testimonial.text}</p>
        <p className="quote-author text-[12px] font-medium text-right">{testimonial.author}</p>
      </div>

      {/* Services */}
      <div className="services-section mb-6">
        {services.map((service) => (
          <div key={service.id} className="service-card mb-4">
            <h3 className="service-title text-[16px] font-bold mb-2">{service.title}</h3>
            <ul className="service-features list-disc pl-5">
              {service.features.map((feature, index) => (
                <li key={index} className="text-[14px] mb-1">{feature}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* CTA */}
      <div className="cta-section text-center mt-8">
        <a href="#" className="btn-primary bg-black text-white py-3 px-6 rounded-lg inline-block font-medium">
          Book A FREE CONSULTATION
        </a>
      </div>
    </MobileLayout>
  );
};

export default ProfileScreen; 