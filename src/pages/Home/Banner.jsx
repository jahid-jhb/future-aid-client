import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';

const slides = [
    {
        img: 'https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=800&q=80',
        title: 'Find Your Dream Scholarship',
        desc: 'Explore top scholarships from leading universities worldwide and apply easily.',
    },
    {
        img: 'https://images.unsplash.com/photo-1503676382389-4809596d5290?auto=format&fit=crop&w=800&q=80',
        title: 'Secure Your Future',
        desc: 'Get financial aid and make your higher education affordable and accessible.',
    },
    {
        img: 'https://images.unsplash.com/photo-1513258496099-48168024aec0?auto=format&fit=crop&w=800&q=80',
        title: 'Apply With Confidence',
        desc: 'Simple application process, transparent status, and expert support for every step.',
    },
];

const Banner = () => {
    return (
        <div className="w-full max-w-6xl mx-auto mt-6 rounded-lg overflow-hidden shadow-lg">
            <Swiper
                modules={[Autoplay, Pagination]}
                autoplay={{ delay: 3500, disableOnInteraction: false }}
                pagination={{ clickable: true }}
                loop={true}
                className="h-64 md:h-80"
            >
                {slides.map((slide, idx) => (
                    <SwiperSlide key={idx}>
                        <div className="relative h-64 md:h-80 flex items-center justify-center">
                            <img
                                src={slide.img}
                                alt={slide.title}
                                className="absolute inset-0 w-full h-full object-cover"
                            />
                            <div className="relative z-10 bg-black/20 backdrop-blur-xs p-8 rounded text-center text-white max-w-xl mx-auto">
                                <h2 className="text-2xl md:text-4xl font-bold mb-2">{slide.title}</h2>
                                <p className="text-base md:text-lg">{slide.desc}</p>
                            </div>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
};

export default Banner;
