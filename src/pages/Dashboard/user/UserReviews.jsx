import React, { useEffect, useState } from 'react';
import api from '../../../services/api';
import Swal from 'sweetalert2';
import { useAuth } from '../../../context/AuthContext';
import { FaTrashAlt, FaEdit } from 'react-icons/fa';

const UserReviews = () => {
    const { user } = useAuth();
    const [reviews, setReviews] = useState([]);
    const [loading, setLoading] = useState(true);
    const [editModal, setEditModal] = useState(null);

    useEffect(() => {
        fetchReviews();
    }, []);

    const fetchReviews = async () => {
        try {
            const res = await api.get(`/reviews/user/${user.email}`);
            setReviews(res.data);
        } catch (err) {
            console.error('Error loading reviews:', err);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        const confirm = await Swal.fire({
            title: 'Delete Review?',
            text: 'You are about to delete your review.',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, delete it'
        });

        if (confirm.isConfirmed) {
            try {
                await api.delete(`/reviews/${id}`);
                setReviews(reviews.filter(r => r._id !== id));
                Swal.fire('Deleted!', 'Review removed successfully.', 'success');
            } catch (err) {
                Swal.fire('Error', 'Failed to delete review', 'error');
            }
        }
    };

    const handleEditSubmit = async (e) => {
        e.preventDefault();
        const form = e.target;
        const updated = {
            scholarshipName: form.scholarshipName.value,
            universityName: form.universityName.value,
            reviewText: form.reviewText.value,
            reviewDate: new Date()
        };
        try {
            await api.patch(`/reviews/${editModal._id}`, updated);
            Swal.fire('Updated', 'Review updated successfully.', 'success');
            setEditModal(null);
            fetchReviews();
        } catch {
            Swal.fire('Error', 'Failed to update review', 'error');
        }
    };

    return (
        <section className="p-6 max-w-5xl mx-auto">
            <h2 className="text-3xl font-bold mb-6">My Reviews</h2>

            {loading ? (
                <p>Loading your reviews...</p>
            ) : reviews.length === 0 ? (
                <p className="text-gray-500">You haven’t submitted any reviews yet.</p>
            ) : (
                <div className="overflow-x-auto">
                    <table className="table table-zebra w-full">
                        <thead>
                            <tr>
                                <th>Scholarship</th>
                                <th>University</th>
                                <th>Review</th>
                                <th>Date</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {reviews.map((r) => (
                                <tr key={r._id}>
                                    <td>{r.scholarshipName}</td>
                                    <td>{r.universityName}</td>
                                    <td>{r.reviewText}</td>
                                    <td>{new Date(r.reviewDate).toLocaleDateString()}</td>
                                    <td className="flex gap-2">
                                        <button
                                            onClick={() => setEditModal(r)}
                                            className="btn btn-sm btn-warning"
                                        >
                                            <FaEdit />
                                        </button>
                                        <button
                                            onClick={() => handleDelete(r._id)}
                                            className="btn btn-sm btn-error"
                                        >
                                            <FaTrashAlt />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

            {editModal && (
                <dialog open className="modal">
                    <div className="modal-box">
                        <h3 className="font-bold text-lg mb-4">Edit Review</h3>
                        <form onSubmit={handleEditSubmit} className="space-y-4">
                            <input
                                type="text"
                                name="scholarshipName"
                                defaultValue={editModal.scholarshipName}
                                required
                                className="input input-bordered w-full"
                            />
                            <input
                                type="text"
                                name="universityName"
                                defaultValue={editModal.universityName}
                                required
                                className="input input-bordered w-full"
                            />
                            <textarea
                                name="reviewText"
                                defaultValue={editModal.reviewText}
                                required
                                className="textarea textarea-bordered w-full"
                                rows="4"
                            ></textarea>
                            <div className="modal-action">
                                <button type="submit" className="btn btn-success">Update</button>
                                <button type="button" onClick={() => setEditModal(null)} className="btn">Cancel</button>
                            </div>
                        </form>
                    </div>
                </dialog>
            )}
        </section>
    );
};

export default UserReviews;
