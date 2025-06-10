import React from 'react';
import MobileLayout from '../layout/MobileLayout';

const TestimonialsScreen = () => {
  // Testimonials data
  const testimonials = [
    {
      id: 1,
      text: "She was quickly able to provide actionable insights to improve my resume drastically. She goes above and beyond to ensure your progress. I highly recommend working with her.",
      author: "Product Owner, Tesla",
      image: "/placeholder-author.jpg"
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
    <MobileLayout title="TESTIMONIALS">
      {/* Featured testimonial */}
      <div className="featured-testimonial mb-8 bg-blue-300 p-5 rounded-lg">
        <div className="quote-icon text-[32px] mb-2">❝</div>
        <p className="quote-text text-[15px] mb-3">
          {testimonials[0].text}
        </p>
        <p className="quote-author text-[13px] font-medium text-right">
          —{testimonials[0].author}
        </p>
      </div>

      {/* More testimonials */}
      <div className="more-testimonials">
        {testimonials.slice(1).map((testimonial) => (
          <div key={testimonial.id} className="testimonial-card mb-6 bg-gray-100 p-4 rounded-lg">
            <p className="testimonial-text text-[14px] mb-3">
              {testimonial.text}
            </p>
            <div className="testimonial-author flex items-center">
              <div className="author-icon w-8 h-8 bg-gray-300 rounded-full mr-2"></div>
              <div className="author-info">
                <p className="author-name text-[13px] font-medium">
                  {testimonial.title && testimonial.company 
                    ? `${testimonial.title} • ${testimonial.company}`
                    : testimonial.author
                  }
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </MobileLayout>
  );
};

export default TestimonialsScreen; 