import React from 'react';

const AboutSwati = () => {
  // Testimonial data
  const testimonial = {
    text: "She was quickly able to provide actionable insights to improve my resume drastically. She goes above and beyond to ensure your progress. I highly recommend working with her.",
    author: "—Product Owner, Fiserv",
  };

  // Stats data
  const stats = [
    {
      number: "200+",
      description:
        "candidates were admitted to top Master's and MBA universities, including ",
      highlight:
        "Kellogg, ESCP France, Ross, Chicago, Booth, Wharton, NYU, LBS",
      ending: ", & more.",
    },
    {
      number: "500+",
      description: "Professionals secured roles at ",
      highlight:
        "Amazon, Google, Microsoft, Tesla, McKinsey, Blue Origin, Palantir, Capital One, Meta, Walmart, JP Morgan,",
      ending: " and more.",
    },
  ];

  // Services data
  const services = [
    {
      id: 1,
      title: "MBA APPLICATION CONSULTING",
      features: [
        "Four 1-hour call for each school.",
        "Personalized Strategy",
        "Target School Selection",
        "Essay and CV Guidance",
      ],
    },
    {
      id: 2,
      title: "ADVISORY SERVICE / CAREER ACCELERATION OR JOB SEARCH",
      features: [
        "Resume Review",
        "Portfolio Development/Review",
        "Skill Building",
        "End-to-End Job Search Strategy",
      ],
    },
    {
      id: 3,
      title: "START-UP ADVISORY",
      features: [
        "Product Strategy",
        "Marketing Strategy",
        "Go-to-Market Planning",
        "Business Growth",
        "Startup Scaling",
      ],
    },
  ];

  return (
    <section id="about-swati" className="about-swati">
      <div className="container">
        <div className="section-header">
          <h2>About Swati Shukla</h2>
          <p>Mentor / Advisor at The Unstuck Growth</p>
        </div>
        
        {/* Profile Section */}
        <div className="swati-profile">
          <div className="profile-image">
            {/* Updated image path */}
            <img src="images/swati.jpg" alt="Swati Shukla" />
          </div>
          
          <div className="profile-info">
            <h3>Mentor/Advisor</h3>
            <h2>SWATI<br />SHUKLA</h2>
          </div>
        </div>
        
        {/* Bio Section */}
        <div className="about-text">
          <p>
            A results-driven <strong>product leader, mentor, and startup advisor with 15 years of
            experience in product management, strategy, analytics, and sales &amp; marketing across 
            global organizations, including Amazon, McKinsey.</strong> Having built and scaled B2B 
            and B2C products, led cross-functional teams, and driven high-impact innovations, I 
            leverage my expertise to <strong>empower professionals and startups to achieve their goals</strong>. 
            Beyond my corporate career, I am passionate about <strong>mentorship and career coaching</strong>.
          </p>
        </div>
        
        {/* Stats Section */}
        <div className="achievement-boxes">
          {stats.map((stat, index) => (
            <div key={index} className="achievement-box">
              <p className="number">{stat.number}</p>
              <p className="description">
                {stat.description}
                <strong>{stat.highlight}</strong>
                {stat.ending}
              </p>
            </div>
          ))}
        </div>
        
        {/* Testimonial */}
        <div className="testimonial featured-testimonial">
          <div className="quote">
            <i className="fas fa-quote-left"></i>
            <p>{testimonial.text}</p>
            <p className="client">{testimonial.author}</p>
          </div>
        </div>
        
        {/* Services Section */}
        <div className="services-list">
          <h3 className="section-title">Services Offered</h3>
          
          {services.map((service) => (
            <div key={service.id} className="service-item">
              <h3>{service.title}</h3>
              <ul>
                {service.features.map((feature, index) => (
                  <li key={index}>{feature}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        
        {/* Logos Section */}
        <div className="partners">
          <h3>Our Clients Work At</h3>
          <div className="partner-logos">
            <span>Amazon</span>
            <span>Google</span>
            <span>Microsoft</span>
            <span>McKinsey</span>
            <span>Tesla</span>
            <span>Palantir</span>
          </div>
        </div>
        
        {/* CTA Button */}
        <div className="text-center">
          <a href="#contact" className="btn primary">Book A FREE CONSULTATION</a>
        </div>
      </div>
    </section>
  );
};

export default AboutSwati; 