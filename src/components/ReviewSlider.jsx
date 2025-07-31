import React, { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import api from '../services/api';


const ReviewSlider = ({ scholarshipId }) => {
    const [reviews, setReviews] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!scholarshipId) {
            setReviews([]);
            setLoading(false);
            return;
        }
        api.get(`/reviews/${scholarshipId}`)
            .then(res => Array.isArray(res.data) ? setReviews(res.data) : setReviews([]))
            .catch(() => setReviews([]))
            .finally(() => setLoading(false));
    }, [scholarshipId]);

    if (loading) {
        return (
            <div className="flex justify-center items-center py-12">
                <span className="loading loading-spinner loading-lg text-blue-600"></span>
            </div>
        );
    }

    if (!Array.isArray(reviews) || !reviews.length) {
        return <div className="text-center py-8 text-gray-500">No reviews yet.</div>;
    }

    return (
        <div className="w-full max-w-3xl mx-auto my-12">
            <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center text-blue-700">What Our Students Say</h2>
            <Swiper
                modules={[Pagination, Autoplay]}
                pagination={{ clickable: true }}
                autoplay={{ delay: 3500, disableOnInteraction: false }}
                loop={true}
                spaceBetween={32}
                slidesPerView={1}
                className="py-6"
            >
                {reviews.map((review) => (
                    <SwiperSlide key={review._id}>
                        <div className="card bg-base-100 shadow-xl border border-blue-100 mx-2">
                            <div className="card-body items-center text-center">
                                <div className="avatar mb-3">
                                    <div className="w-20 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                                        <img
                                            src={review.reviewerImage || '/default-avatar.png'}
                                            alt={review.reviewerName}
                                        />
                                    </div>
                                </div>
                                <h4 className="font-bold text-lg text-blue-700">{review.reviewerName}</h4>
                                <div className="text-gray-400 text-sm mb-2">
                                    {review.reviewDate
                                        ? new Date(review.reviewDate).toLocaleDateString()
                                        : ''}
                                </div>
                                <div className="flex items-center justify-center mb-2">
                                    <div className="rating rating-sm">
                                        {Array.from({ length: 5 }).map((_, i) => (
                                            <input
                                                key={i}
                                                type="radio"
                                                name={`rating-${review._id}`}
                                                className="mask mask-star-2 bg-yellow-400"
                                                checked={Math.round(review.rating) === i + 1}
                                                readOnly
                                            />
                                        ))}
                                    </div>
                                    <span className="ml-2 font-semibold text-yellow-600">{review.rating}</span>
                                </div>
                                <p className="text-gray-700 italic">"{review.comment}"</p>
                            </div>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
};

export default ReviewSlider;
