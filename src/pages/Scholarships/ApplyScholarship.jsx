import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router';
import Swal from 'sweetalert2';
import { useAuth } from '../../context/AuthContext';
import api from '../../services/api';

const ApplyScholarship = () => {
    const { id } = useParams();
    const { user } = useAuth();
    const navigate = useNavigate();
    const [scholarship, setScholarship] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        api.get(`/scholarships/${id}`)
            .then(res => setScholarship(res.data))
            .catch(() => Swal.fire('Error', 'Failed to load scholarship', 'error'))
            .finally(() => setLoading(false));
    }, [id]);

    const handleProceedToPayment = (e) => {
        e.preventDefault();
        navigate('/payment', {
            state: { scholarship }
        });
    };

    if (loading) return <p className="text-center py-10">Loading scholarship info...</p>;
    if (!scholarship) return <p className="text-center py-10 text-red-500">Scholarship not found.</p>;

    return (
        <section className="max-w-2xl mx-auto p-6">
            <h2 className="text-3xl font-bold mb-6">Apply for Scholarship</h2>

            <div className="card bg-base-200 p-6 shadow-md">
                <form onSubmit={handleProceedToPayment} className="space-y-4">
                    {/* User Info */}
                    <div>
                        <label className="label">
                            <span className="label-text">Your Name</span>
                        </label>
                        <input
                            type="text"
                            value={user?.displayName || ''}
                            className="input input-bordered w-full"
                            disabled
                        />
                    </div>

                    <div>
                        <label className="label">
                            <span className="label-text">Your Email</span>
                        </label>
                        <input
                            type="email"
                            value={user?.email || ''}
                            className="input input-bordered w-full"
                            disabled
                        />
                    </div>

                    {/* Scholarship Info */}
                    <div>
                        <label className="label">
                            <span className="label-text">Scholarship Name</span>
                        </label>
                        <input
                            type="text"
                            value={scholarship.scholarshipName}
                            className="input input-bordered w-full"
                            disabled
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="label">
                                <span className="label-text">University</span>
                            </label>
                            <input
                                type="text"
                                value={scholarship.universityName}
                                className="input input-bordered w-full"
                                disabled
                            />
                        </div>

                        <div>
                            <label className="label">
                                <span className="label-text">Degree</span>
                            </label>
                            <input
                                type="text"
                                value={scholarship.degree}
                                className="input input-bordered w-full"
                                disabled
                            />
                        </div>
                    </div>

                    <div>
                        <label className="label">
                            <span className="label-text">Application Fees (USD)</span>
                        </label>
                        <input
                            type="text"
                            value={`$${scholarship.applicationFees}`}
                            className="input input-bordered w-full"
                            disabled
                        />
                    </div>

                    <button type="submit" className="btn bg-accent w-full mt-4">
                        Proceed to Payment
                    </button>
                </form>
            </div>
        </section>
    );
};

export default ApplyScholarship;
