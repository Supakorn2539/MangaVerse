import React, { useState, useEffect } from 'react';

const Home = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  // Automatically change slides every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
    }, 3000); // 3000 ms = 3 seconds

    return () => clearInterval(interval); // Clear interval on unmount
  }, []);

  // Function to change the slide manually
  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  const featuredManga = [
    { title: 'Solo Leveling', image: '/api/placeholder/150/200' },
    { title: 'Mount Hua Sect', image: '/api/placeholder/150/200' },
    { title: 'The Academic Sylph', image: '/api/placeholder/150/200' },
    { title: 'Eleceed', image: '/api/placeholder/150/200' },
  ]

  const slides = [
    { id: 1, image: '/path/to/image1.jpg', title: 'Slide 1', text: 'Description for slide 1' },
    { id: 2, image: '/path/to/image2.jpg', title: 'Slide 2', text: 'Description for slide 2' },
    { id: 3, image: '/path/to/image3.jpg', title: 'Slide 3', text: 'Description for slide 3' }
  ];
  const Allmanga = () => {
    const featuredManga = [
      { title: 'Solo Leveling', image: '/api/placeholder/150/200' },
      { title: 'Mount Hua Sect', image: '/api/placeholder/150/200' },
      { title: 'The Academic Sylph', image: '/api/placeholder/150/200' },
      { title: 'Eleceed', image: '/api/placeholder/150/200' },
    ]
  };
  const allManga = [
    ...featuredManga,
    { title: 'Reawakened Man', image: '/api/placeholder/150/200' },
    { title: 'Swordmaster', image: '/api/placeholder/150/200' },
    { title: 'Return of Immortal', image: '/api/placeholder/150/200' },
    { title: 'The Genius', image: '/api/placeholder/150/200' },
    { title: 'Noblesse', image: '/api/placeholder/150/200' },
    { title: 'Soul Land', image: '/api/placeholder/150/200' },
    { title: 'Tokyo Ghoul', image: '/api/placeholder/150/200' },
    { title: 'Overlord', image: '/api/placeholder/150/200' },
  ];
  return (
    <div>
      <div className="relative  w-full max-w-4xl mx-auto">
        <div className="overflow-hidden relative">
          {/* Slideshow Images */}
          <div className="flex transition-transform duration-500 ease-in-out" style={{ transform: `translateX(-${currentSlide * 100}%)` }}>
            {slides.map((slide) => (
              <div key={slide.id} className="w-full flex-shrink-0">
                <img src={slide.image} alt={slide.title} className="w-full h-[300px] object-cover" />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black via-transparent to-transparent p-4 text-white">
                  <h2 className="text-xl font-bold">{slide.title}</h2>
                  <p>{slide.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Navigation Dots */}
        <div className="absolute bottom-5 left-0 right-0 flex justify-center space-x-2">
          {slides.map((_, index) => (
            <button
              key={index}
              className={`w-3 h-3 rounded-full ${index === currentSlide ? 'bg-white' : 'bg-gray-400'}`}
              onClick={() => goToSlide(index)}
            ></button>
          ))}
        </div>
      </div>

      <div>
        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Featured Manga</h2>
          <div className="grid grid-cols-4 gap-4">
            {featuredManga.map((manga, index) => (
              <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden">
                <img src={manga.image} alt={manga.title} className="w-full h-48 object-cover" />
                <div className="p-2">
                  <h3 className="text-sm font-medium truncate">{manga.title}</h3>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>

      <div>
        <section className='h-fit'>
          <h2 className="text-xl font-semibold mb-4">All Manga</h2>
          <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 gap-4 h-fit">
            {allManga.map((manga, index) => (
              <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden h-fit">
                <img src={manga.image} alt={manga.title} className="w-full h-48 object-cover" />
                <div className="p-2">
                  <h3 className="text-sm font-medium truncate">{manga.title}</h3>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
      <section className="mt-8 flex justify-center items-center space-x-2">
        <div className="flex space-x-1">
          {[1, 2, 3].map((page) => (
            <button
              key={page}
              className={`w-8 h-8 flex items-center justify-center rounded-full 
                          ${page === 1 ? 'bg-purple-600 text-white' : 'bg-gray-200 text-gray-600'}`}
            >
              {page}
            </button>
          ))}
        </div>
      </section>
    </div>
  )
}

export default Home
