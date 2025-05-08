import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const WayGoHomepage = () => {
  const navigate = useNavigate();
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  // Data: Services offered by WayGo with corresponding routes
  const services = [
    {
      name: 'Tour Packages',
      image: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
      description: 'Curated experiences across Sri Lanka with expert planning',
      route: '/destinations'
    },
    {
      name: 'Hotel Booking',
      image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
      description: 'Best rates for luxury resorts to budget stays island-wide',
      route: '/hotel-booking'
    },
    {
      name: 'Guided Tours',
      image: 'https://images.unsplash.com/photo-1501555088652-021faa106b9b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2073&q=80',
      description: 'Knowledgeable local guides for immersive cultural experiences',
      route: '/services/guide'
    },
    {
      name: 'Vehicle Rental',
      image: 'https://images.unsplash.com/photo-1494905998402-395d579af36f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
      description: 'Reliable transportation options with professional drivers',
      route: '/services/car-rental'
    }
  ];

  // Data: Popular destinations in Sri Lanka
  const destinations = [
    {
      name: 'Sigiriya',
      image: 'https://images.unsplash.com/photo-1582139329536-e7284fece509?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
      description: 'Ancient rock fortress with stunning frescoes'
    },
    {
      name: 'Ella',
      image: 'https://images.unsplash.com/photo-1564569914211-75e5d9c6109f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
      description: 'Scenic hill country with waterfalls and tea plantations'
    },
    {
      name: 'Galle',
      image: 'https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2089&q=80',
      description: 'Historic Dutch fort and beautiful coastal views'
    },
    {
      name: 'Kandy',
      image: 'https://images.unsplash.com/photo-1554469384-e58fac16e23a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80',
      description: 'Cultural heart with the Temple of the Sacred Tooth Relic'
    }
  ];

  // Data: Testimonials from travelers
  const testimonials = [
    {
      name: 'Sarah Johnson',
      rating: 5,
      comment: 'WayGo made our Sri Lanka trip unforgettable! The guides were knowledgeable and the hotels were perfect.',
      avatar: 'https://randomuser.me/api/portraits/women/43.jpg'
    },
    {
      name: 'Michael Chen',
      rating: 4,
      comment: 'Excellent service from start to finish. The tour packages are well-planned and great value.',
      avatar: 'https://randomuser.me/api/portraits/men/32.jpg'
    },
    {
      name: 'Priya Fernando',
      rating: 5,
      comment: 'As a local, I was impressed by how WayGo showcases our country. Highly recommended!',
      avatar: 'https://randomuser.me/api/portraits/women/65.jpg'
    }
  ];

  

  // Handlers for navigating testimonials
  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  // Handler for service card click
  const handleServiceClick = (route) => {
    navigate(route);
  };

  return (
    <div className="font-sans text-gray-800 antialiased">
      {/* Hero Section: Video background with call-to-action buttons */}
      <section className="relative h-screen max-h-[900px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-black/40 z-0">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover"
            poster="https://images.unsplash.com/photo-1527631746610-bca00a040d60?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80"
          >
            <source src="https://assets.mixkit.co/videos/preview/mixkit-waves-coming-to-the-beach-5016-large.mp4" type="video/mp4" />
          </video>
        </div>

        <div className="container mx-auto px-6 text-center relative z-10">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
              Discover <span className="text-amber-400">Sri Lanka</span> Differently
            </h1>
            <p className="text-xl md:text-2xl text-white/90 mb-10 max-w-2xl mx-auto font-light">
              Authentic experiences crafted by local experts
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => navigate('/destinations')}
                className="bg-amber-600 hover:bg-amber-700 text-white px-8 py-4 rounded-full font-semibold text-lg shadow-lg transition-all transform hover:scale-105"
              >
                Explore Tours
              </button>
              <button
                onClick={() => navigate('/blog')}
                className="bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white border border-white/30 px-8 py-4 rounded-full font-semibold text-lg transition-all transform hover:scale-105"
              >
                Travel Stories
              </button>
            </div>
          </div>
        </div>

        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-10 h-16 rounded-3xl border-4 border-white/50 flex justify-center p-1">
            <div className="w-2 h-2 rounded-full bg-white/80 animate-scroll"></div>
          </div>
        </div>
      </section>

      {/* Services Section: Displaying services in a modern card grid */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <span className="text-sm uppercase tracking-widest text-amber-600 font-medium">Our Services</span>
            <h2 className="text-4xl font-bold mt-4 text-gray-900">Tailored Travel Experiences</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-amber-400 to-amber-600 mx-auto mt-6"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((service, index) => (
              <div
                key={index}
                onClick={() => handleServiceClick(service.route)}
                className="group relative overflow-hidden rounded-xl shadow-lg hover:shadow-2xl transition-all duration-500 cursor-pointer"
              >
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={service.image}
                    alt={service.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>
                </div>
                <div className="absolute bottom-0 left-0 w-full p-6">
                  <h3 className="text-xl font-bold text-white mb-2">{service.name}</h3>
                  <p className="text-white/90 text-sm mb-4">{service.description}</p>
                  <div className="text-amber-400 hover:text-amber-300 font-medium text-sm flex items-center group">
                    Learn more
                    <svg className="w-4 h-4 ml-1 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                    </svg>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Destinations Section: Highlighting must-visit destinations */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="flex flex-col lg:flex-row items-center mb-16">
            <div className="lg:w-1/2 lg:pr-12 mb-10 lg:mb-0">
              <span className="text-sm uppercase tracking-widest text-amber-600 font-medium">Explore</span>
              <h2 className="text-4xl font-bold mt-4 text-gray-900">Must-Visit Destinations</h2>
              <div className="w-24 h-1 bg-gradient-to-r from-amber-400 to-amber-600 mt-6 mb-8"></div>
              <p className="text-gray-600 mb-8">
                From the awe-inspiring ancient cities rich with history to the pristine, sun-drenched beaches that stretch endlessly, embark on the ultimate journey across Sri Lanka’s most breathtaking landscapes. Experience the magic of this tropical paradise with our expertly curated tours, designed to immerse you in its vibrant culture, stunning natural beauty, and hidden wonders at every turn.
              </p>
              <button
                onClick={() => navigate('/destinations')}
                className="inline-flex items-center text-amber-600 hover:text-amber-700 font-medium"
              >
                View all destinations
                <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                </svg>
              </button>
            </div>
            <div className="lg:w-1/2 grid grid-cols-2 gap-6">
              {destinations.slice(0, 2).map((destination, index) => (
                <div
                  key={index}
                  className="relative group overflow-hidden rounded-xl aspect-square cursor-pointer"
                  onClick={() => navigate('/destinations')}
                >
                  <img
                    src={destination.image}
                    alt={destination.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>
                  <div className="absolute bottom-0 left-0 p-6">
                    <h3 className="text-xl font-bold text-white">{destination.name}</h3>
                    <p className="text-white/90 text-sm mt-1">{destination.description}</p>
                  </div>
                </div>
              ))}
              {destinations.slice(2, 4).map((destination, index) => (
                <div
                  key={index + 2}
                  className="relative group overflow-hidden rounded-xl aspect-square cursor-pointer"
                  onClick={() => navigate('/destinations')}
                >
                  <img
                    src={destination.image}
                    alt={destination.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>
                  <div className="absolute bottom-0 left-0 p-6">
                    <h3 className="text-xl font-bold text-white">{destination.name}</h3>
                    <p className="text-white/90 text-sm mt-1">{destination.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section: Carousel for traveler reviews */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <span className="text-sm uppercase tracking-widest text-amber-600 font-medium">Testimonials</span>
            <h2 className="text-4xl font-bold mt-4 text-gray-900">Travelers Share Their Stories</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-amber-400 to-amber-600 mx-auto mt-6"></div>
          </div>

          <div className="max-w-5xl mx-auto relative">
            <div className="bg-gradient-to-br from-amber-50 to-white p-10 rounded-3xl shadow-xl">
              <div className="flex flex-col md:flex-row items-center">
                <div className="md:w-1/3 mb-8 md:mb-0 flex justify-center">
                  <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-white shadow-lg">
                    <img
                      src={testimonials[currentTestimonial].avatar}
                      alt={testimonials[currentTestimonial].name}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                  </div>
                </div>
                <div className="md:w-2/3 md:pl-10">
                  <div className="flex justify-center md:justify-start mb-4">
                    {[...Array(5)].map((_, i) => (
                      <svg
                        key={i}
                        className={`w-6 h-6 ${i < testimonials[currentTestimonial].rating ? 'text-amber-500' : 'text-gray-300'}`}
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                      </svg>
                    ))}
                  </div>
                  <blockquote className="text-xl italic text-gray-700 mb-6 text-center md:text-left">
                    "{testimonials[currentTestimonial].comment}"
                  </blockquote>
                  <p className="font-semibold text-gray-900 text-center md:text-left">
                    {testimonials[currentTestimonial].name}
                  </p>
                </div>
              </div>
            </div>

            <div className="flex justify-center mt-8 space-x-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentTestimonial(index)}
                  className={`w-3 h-3 rounded-full transition-all ${index === currentTestimonial ? 'bg-amber-600 w-6' : 'bg-gray-300'}`}
                  aria-label={`Go to testimonial ${index + 1}`}
                ></button>
              ))}
            </div>

            <button
              onClick={prevTestimonial}
              className="hidden md:block absolute left-0 top-1/2 -translate-y-1/2 -translate-x-12 bg-white p-4 rounded-full shadow-lg hover:bg-amber-50 transition-colors"
              aria-label="Previous testimonial"
            >
              <svg className="w-6 h-6 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path>
              </svg>
            </button>

            <button
              onClick={nextTestimonial}
              className="hidden md:block absolute right-0 top-1/2 -translate-y-1/2 translate-x-12 bg-white p-4 rounded-full shadow-lg hover:bg-amber-50 transition-colors"
              aria-label="Next testimonial"
            >
              <svg className="w-6 h-6 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
              </svg>
            </button>
          </div>
        </div>
      </section>

      {/* Stats Section: Displaying key statistics */}
      <section className="py-16 bg-amber-600 text-white">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div className="p-6">
              <div className="text-4xl font-bold mb-2">10K+</div>
              <div className="text-sm uppercase tracking-widest">Happy Travelers</div>
            </div>
            <div className="p-6">
              <div className="text-4xl font-bold mb-2">200+</div>
              <div className="text-sm uppercase tracking-widest">Tour Packages</div>
            </div>
            <div className="p-6">
              <div className="text-4xl font-bold mb-2">50+</div>
              <div className="text-sm uppercase tracking-widest">Local Guides</div>
            </div>
            <div className="p-6">
              <div className="text-4xl font-bold mb-2">15</div>
              <div className="text-sm uppercase tracking-widest">Years Experience</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section: Split background with contact and subscription options */}
      <section className="relative">
        <div className="absolute inset-0 bg-amber-600"></div>
        <div className="absolute inset-0 bg-amber-600 w-1/2"></div>
        <div className="container mx-auto px-6 relative">
          <div className="flex flex-col lg:flex-row">
            <div className="lg:w-1/2 py-20 lg:py-32 px-6 lg:pr-12 text-white">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to explore Sri Lanka?</h2>
              <p className="text-lg mb-8 opacity-90">
                Our travel experts are ready to craft your perfect itinerary. Get in touch today.
              </p>
              <button
                onClick={() => navigate('/contact')}
                className="bg-white text-amber-600 hover:bg-gray-100 px-8 py-4 rounded-full font-semibold text-lg shadow-lg transition-all transform hover:scale-105"
              >
                Contact Our Experts
              </button>
            </div>
            <div className="lg:w-1/2 py-20 lg:py-32 px-6 lg:pl-12 text-white bg-gray-900 bg-opacity-90 lg:bg-transparent">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Get Exclusive Offers</h2>
              <p className="text-lg mb-8 opacity-90">
                Subscribe to our newsletter for special deals and travel inspiration.
              </p>
              <form className="flex flex-col sm:flex-row gap-4">
                <div className="relative flex-grow">
                  <div className="absolute inset-y-0 left-5 flex items-center pointer-events-none">
                    <svg className="w-5 h-5 text-white/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                    </svg>
                  </div>
                  <input
                    type="email"
                    placeholder="Your email address"
                    className="w-full pl-12 pr-6 py-4 rounded-full bg-white/10 border border-white/20 focus:outline-none focus:ring-2 focus:ring-amber-400 text-white placeholder-white/60 transition-all duration-200 hover:bg-white/15"
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="bg-white text-amber-600 hover:bg-gray-100 px-8 py-4 rounded-full font-semibold text-lg shadow-lg transition-all transform hover:scale-105"
                >
                  Subscribe
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default WayGoHomepage;
