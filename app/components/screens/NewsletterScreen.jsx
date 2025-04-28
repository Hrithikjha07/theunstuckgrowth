import React from 'react';
import MobileLayout from '../layout/MobileLayout';

const NewsletterScreen = () => {
  // Testimonials for the newsletter page
  const testimonials = [
    {
      id: 1,
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      author: "Name LastName",
      title: "Job Title",
      company: "Company"
    },
    {
      id: 2,
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      author: "Name LastName",
      title: "Job Title",
      company: "Company"
    },
    {
      id: 3,
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      author: "Name LastName",
      title: "Job Title",
      company: "Company"
    }
  ];

  return (
    <MobileLayout title="NEWSLETTER">
      {/* Newsletter signup section */}
      <div className="newsletter-signup mb-8">
        <h2 className="text-[18px] font-bold mb-3">Join Our Newsletter:</h2>
        <p className="text-[14px] text-gray-700 mb-4">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </p>
        
        <div className="signup-form mb-4">
          <div className="input-group mb-2">
            <input 
              type="email" 
              placeholder="Email" 
              className="w-full p-2 border border-gray-300 rounded mb-2"
            />
            <button className="w-full py-2 bg-black text-white rounded">
              Subscribe
            </button>
          </div>
          <p className="text-[12px] text-gray-500">No spam. Only valuable insights.</p>
        </div>
      </div>

      {/* Testimonials section */}
      <div className="testimonials-section">
        {testimonials.map((testimonial) => (
          <div key={testimonial.id} className="testimonial-card mb-6 bg-gray-100 p-4 rounded-lg">
            <p className="testimonial-text text-[14px] mb-3">
              {testimonial.text}
            </p>
            <div className="testimonial-author flex items-center">
              <div className="author-icon w-8 h-8 bg-gray-300 rounded-full mr-2"></div>
              <div className="author-info">
                <p className="author-name text-[13px] font-medium">{testimonial.author}</p>
                <p className="author-title text-[11px] text-gray-600">{testimonial.title} • {testimonial.company}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </MobileLayout>
  );
};

export default NewsletterScreen; 