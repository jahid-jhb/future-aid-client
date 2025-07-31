import React, { useEffect, useState } from 'react';
import { useAuth } from '../../../context/AuthContext';
import api from '../../../services/api';
import { useNavigate } from 'react-router';
import Swal from 'sweetalert2';
import { FaEdit, FaTrashAlt, FaInfoCircle, FaStar } from 'react-icons/fa';

const UserApplications = () => {
    const { user } = useAuth();
    const [applications, setApplications] = useState([]);
    const [reviewModal, setReviewModal] = useState(null);
    const [editModal, setEditModal] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        fetchApplications();
    }, []);

    const fetchApplications = async () => {
        try {
            const res = await api.get('/my-applications');
            setApplications(res.data);
        } catch (err) {
            console.error('Failed to fetch applications', err);
        }
    };

    const handleCancel = async (id) => {
        const confirm = await Swal.fire({
            title: 'Cancel Application?',
            text: 'Are you sure you want to cancel this application?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, cancel it'
        });
        if (confirm.isConfirmed) {
            try {
                await api.delete(`/applications/${id}`);
                Swal.fire('Cancelled', 'Your application has been removed.', 'success');
                fetchApplications();
            } catch {
                Swal.fire('Error', 'Failed to cancel application.', 'error');
            }
        }
    };

    const handleEdit = (app) => {
        if (app.status !== 'pending') {
            Swal.fire('Not Allowed', 'You cannot edit this application unless it is pending.', 'info');
        } else {
            setEditModal(app);
        }
    };

    const handleEditSubmit = async (e) => {
        e.preventDefault();
        const form = e.target;
        const updated = {
            subjectCategory: form.category.value,
            degree: form.degree.value,
            applicationFees: parseFloat(form.fees.value),
            serviceCharge: parseFloat(form.charge.value)
        };
        try {
            await api.patch(`/applications/${editModal._id}`, updated);
            Swal.fire('Updated', 'Application updated successfully.', 'success');
            setEditModal(null);
            fetchApplications();
        } catch {
            Swal.fire('Error', 'Failed to update application.', 'error');
        }
    };

    const handleReviewSubmit = async (e) => {
        e.preventDefault();
        const form = e.target;
        const review = {
            scholarshipId: reviewModal.scholarshipId,
            scholarshipName: reviewModal.scholarshipName,
            universityName: reviewModal.universityName,
            universityId: reviewModal.universityId,
            rating: parseInt(form.rating.value),
            reviewText: form.comment.value,
            reviewDate: new Date(),
            userName: user.displayName,
            userEmail: user.email,
            userImage: user.photoURL || ''
        };
        try {
            await api.post('/reviews', review);
            Swal.fire('Success', 'Review added.', 'success');
            setReviewModal(null);
        } catch {
            Swal.fire('Error', 'Could not submit review.', 'error');
        }
    };

    return (
        <section className="p-6 max-w-7xl mx-auto">
            <h2 className="text-3xl font-bold mb-6">My Applications</h2>

            {applications.length === 0 ? (
                <p className="text-gray-500">You have not applied for any scholarships yet.</p>
            ) : (
                <div className="overflow-x-auto">
                    <table className="table w-full">
                        <thead>
                            <tr>
                                <th>University</th>
                                <th>Address</th>
                                <th>Category</th>
                                <th>Degree</th>
                                <th>Fees</th>
                                <th>Service Charge</th>
                                <th>Status</th>
                                <th>Feedback</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {applications.map(app => (
                                <tr key={app._id}>
                                    <td>{app.universityName}</td>
                                    <td>{`${app.universityAddress?.city || 'N/A'}, ${app.universityAddress?.country || 'N/A'}`}</td>
                                    <td>{app.subjectCategory}</td>
                                    <td>{app.degree}</td>
                                    <td>${app.applicationFees}</td>
                                    <td>${app.serviceCharge || 0}</td>
                                    <td>
                                        <span className={`badge badge-${app.status === 'pending' ? 'warning' : app.status === 'processing' ? 'info' : app.status === 'completed' ? 'success' : 'error'}`}>{app.status === 'rejected' ? 'Rejected' : app.status}</span>
                                    </td>
                                    <td>{app.feedback || '—'}</td>
                                    <td className="flex gap-2">
                                        <button className="btn btn-sm btn-info" onClick={() => navigate(`/scholarships/${app.scholarshipId}`)}><FaInfoCircle /></button>
                                        <button className="btn btn-sm btn-warning" onClick={() => handleEdit(app)}><FaEdit /></button>
                                        <button className="btn btn-sm btn-error" onClick={() => handleCancel(app._id)}><FaTrashAlt /></button>
                                        <button className="btn btn-sm btn-primary" onClick={() => setReviewModal(app)}><FaStar /></button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

            {reviewModal && (
                <dialog open className="modal">
                    <div className="modal-box">
                        <h3 className="font-bold text-lg mb-4">Add Review</h3>
                        <form onSubmit={handleReviewSubmit} className="space-y-4">
                            <input type="number" name="rating" min="1" max="5" required placeholder="Rating (1-5)" className="input input-bordered w-full" />
                            <textarea name="comment" placeholder="Write your comment..." required className="textarea textarea-bordered w-full" rows="4"></textarea>
                            <div className="modal-action">
                                <button type="submit" className="btn btn-success">Submit</button>
                                <button type="button" onClick={() => setReviewModal(null)} className="btn">Cancel</button>
                            </div>
                        </form>
                    </div>
                </dialog>
            )}

            {editModal && (
                <dialog open className="modal">
                    <div className="modal-box">
                        <h3 className="font-bold text-lg mb-4">Edit Application</h3>
                        <form onSubmit={handleEditSubmit} className="space-y-4">
                            <input type="text" name="category" defaultValue={editModal.subjectCategory} required className="input input-bordered w-full" />
                            <input type="text" name="degree" defaultValue={editModal.degree} required className="input input-bordered w-full" />
                            <input type="number" name="fees" defaultValue={editModal.applicationFees} step="0.01" required className="input input-bordered w-full" />
                            <input type="number" name="charge" defaultValue={editModal.serviceCharge || 0} step="0.01" className="input input-bordered w-full" />
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

export default UserApplications;
