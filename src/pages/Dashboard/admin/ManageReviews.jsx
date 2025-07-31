import React, { useEffect, useState } from 'react';
import api from '../../../services/api';
import Swal from 'sweetalert2';
import { FaTrashAlt } from 'react-icons/fa';
import { useAuth } from '../../../context/AuthContext';

const ManageReviews = () => {

    const { user } = useAuth();
    const [reviews, setReviews] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchReviews();
    }, []);

    const fetchReviews = async () => {
        try {
            const res = await api.get(`/reviews?email=${user.email}`);
            setReviews(res.data);
        } catch (err) {
            console.error('Failed to fetch reviews:', err);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        const confirm = await Swal.fire({
            title: 'Delete this review?',
            text: 'This cannot be undone.',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, delete it'
        });

        if (confirm.isConfirmed) {
            try {
                await api.delete(`/reviews/${id}`);
                setReviews(reviews.filter(r => r._id !== id));
                Swal.fire('Deleted!', 'Review has been removed.', 'success');
            } catch (err) {
                Swal.fire('Error', 'Failed to delete review', 'error');
            }
        }
    };

    return (
        <section className="p-6 max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold mb-6">Manage Reviews</h2>

            {loading ? (
                <p>Loading reviews...</p>
            ) : reviews.length === 0 ? (
                <p className="text-gray-500">No reviews available.</p>
            ) : (
                <div className="overflow-x-auto">
                    <table className="table table-zebra w-full">
                        <thead>
                            <tr>
                                <th>Reviewer</th>
                                <th>Scholarship</th>
                                <th>Review</th>
                                <th>Date</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {reviews.map((r) => (
                                <tr key={r._id}>
                                    <td>{r.userEmail}</td>
                                    <td>{r.scholarshipId}</td>
                                    <td>{r.reviewText?.slice(0, 80)}...</td>
                                    <td>{new Date(r.reviewDate).toLocaleDateString()}</td>
                                    <td>
                                        <button onClick={() => handleDelete(r._id)} className="btn btn-sm btn-outline btn-error">
                                            <FaTrashAlt />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </section>
    );
};

export default ManageReviews;
