import React from 'react';
import { useParams, useNavigate } from 'react-router';
import { useQuery } from '@tanstack/react-query';
import api from '../../services/api';
import Swal from 'sweetalert2';
import { FaStar } from 'react-icons/fa';
import { useAuth } from '../../context/AuthContext';

const ScholarshipDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { user } = useAuth();

    // Fetch scholarship data
    const { data: scholarship = {}, isLoading } = useQuery({
        queryKey: ['scholarship', id],
        queryFn: async () => {
            const res = await api.get(`/scholarships/${id}`);
            return res.data;
        }
    });

    // Fetch reviews
    const { data: reviews = [] } = useQuery({
        queryKey: ['reviews', id],
        queryFn: async () => {
            const res = await api.get(`/reviews/${id}`);
            return res.data;
        }
    });

    const handleApply = () => {
        if (!user) {
            Swal.fire('Login Required', 'Please login first', 'warning');
            return navigate('/login');
        }
        navigate(`/apply/${id}`);
    };

    if (isLoading) return <p className="text-center py-10">Loading...</p>;

    return (
        <div className="max-w-4xl mx-auto px-4 py-10">
            <div className="bg-base-100 shadow-xl rounded-box p-6">
                <div className="flex flex-col md:flex-row gap-6 items-center mb-6">
                    <img src={scholarship.universityImage} alt="university" className="w-32 h-32 rounded-full object-cover" />
                    <div>
                        <h2 className="text-3xl font-bold">{scholarship.universityName}</h2>
                        <p>{scholarship.universityCountry}, {scholarship.universityCity}</p>
                        <p>Rank: #{scholarship.universityRank}</p>
                        <div className="mt-2">
                            <span className="badge badge-info">{scholarship.scholarshipCategory}</span>
                            <span className="badge badge-secondary ml-2">{scholarship.subjectCategory}</span>
                        </div>
                    </div>
                </div>

                <div className="grid gap-2">
                    <p><strong>Application Deadline:</strong> {scholarship.applicationDeadline}</p>
                    <p><strong>Subject Name:</strong> {scholarship.subjectCategory}</p>
                    <p><strong>Stipend:</strong> {scholarship.stipend || 'N/A'}</p>
                    <p><strong>Post Date:</strong> {scholarship.postDate}</p>
                    <p><strong>Application Fees:</strong> ${scholarship.applicationFees}</p>
                    <p><strong>Service Charge:</strong> ${scholarship.serviceCharge}</p>
                    <p><strong>Description:</strong> {scholarship.description || 'No additional info provided.'}</p>
                </div>

                <div className="mt-6 text-right">
                    <button onClick={handleApply} className="btn btn-primary">
                        Apply for this Scholarship
                    </button>
                </div>
            </div>

            <div className="mt-10">
                <h3 className="text-2xl font-semibold mb-4">Reviews</h3>
                {reviews.length > 0 ? (
                    <div className="grid md:grid-cols-2 gap-4">
                        {reviews.map((review) => (
                            <div key={review._id} className="bg-base-200 p-4 rounded shadow">
                                <div className="flex items-center gap-3 mb-2">
                                    <img
                                        src={review.userPhoto || 'https://i.ibb.co/2yqQmtm/default-user.png'}
                                        className="w-10 h-10 rounded-full"
                                        alt={review.userName}
                                    />
                                    <div>
                                        <p className="font-semibold">{review.userName}</p>
                                        <p className="text-sm text-gray-500">{new Date(review.reviewDate).toLocaleDateString()}</p>
                                    </div>
                                </div>
                                <p className="mb-2">{review.comment}</p>
                                <div className="flex items-center text-yellow-500">
                                    {[...Array(review.rating || 0)].map((_, i) => <FaStar key={i} />)}
                                    <span className="ml-2 text-sm">({review.rating})</span>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p>No reviews yet for this scholarship.</p>
                )}
            </div>
        </div>
    );
};

export default ScholarshipDetails;
