import React from "react";

const testimonials = [
  {
    id: 1,
    name: "Sarah Johnson",
    role: "First-time Buyer",
    quote:
      "I was nervous about buying my first home, but this platform made the process so easy. I found my dream apartment in just two weeks!",
    image:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80",
  },
  {
    id: 2,
    name: "Michael Chen",
    role: "Property Investor",
    quote:
      "As someone who buys properties regularly, I appreciate the detailed filters and high-quality listings. This is now my go-to platform for all my investments.",
    image:
      "https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80",
  },
  {
    id: 3,
    name: "Emily Rodriguez",
    role: "Relocated for Work",
    quote:
      "When I had to move for my job, I was worried about finding a good place remotely. The virtual tours and responsive agents made it possible!",
    image:
      "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80",
  },
];

const TestimonialCard: React.FC<{ testimonial: (typeof testimonials)[0] }> = ({
  testimonial,
}) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div className="flex items-center mb-4">
        <img
          src={testimonial.image}
          alt={testimonial.name}
          className="w-14 h-14 rounded-full object-cover mr-4"
        />
        <div>
          <h4 className="font-semibold text-gray-800">{testimonial.name}</h4>
          <p className="text-sm text-gray-600">{testimonial.role}</p>
        </div>
      </div>
      <div className="mb-4">
        <svg
          className="w-8 h-8 text-blue-200 mb-2"
          fill="currentColor"
          viewBox="0 0 32 32"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M10 8c-4.4 0-8 3.6-8 8s3.6 8 8 8h.5c-.3-2.5-2.5-4.5-5-4.5v-2c3.9 0 7-3.1 7-7V8h-2.5zm18 0c-4.4 0-8 3.6-8 8s3.6 8 8 8h.5c-.3-2.5-2.5-4.5-5-4.5v-2c3.9 0 7-3.1 7-7V8h-2.5z" />
        </svg>
        <p className="text-gray-700 italic">{testimonial.quote}</p>
      </div>
      <div className="flex">
        {[1, 2, 3, 4, 5].map((star) => (
          <svg
            key={star}
            className="w-5 h-5 text-yellow-400"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        ))}
      </div>
    </div>
  );
};

const Testimonials: React.FC = () => {
  return (
    <section className="py-16 bg-gray-100 w-full">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">
            What Our Users Say
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Don't just take our word for it - hear from some of our satisfied
            users
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <TestimonialCard key={testimonial.id} testimonial={testimonial} />
          ))}
        </div>

        <div className="text-center mt-12">
          <p className="text-gray-600 mb-4">
            Join thousands of happy customers who found their perfect property
          </p>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
