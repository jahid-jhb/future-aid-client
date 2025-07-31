import React, { useEffect, useState } from 'react';
import api from '../../../services/api';
import Swal from 'sweetalert2';
import { FaTrashAlt } from 'react-icons/fa';
import { useAuth } from '../../../context/AuthContext';

const ManageApplications = () => {

    const { user } = useAuth();
    const [applications, setApplications] = useState([]);
    const [loading, setLoading] = useState(true);
    const [statusFilter, setStatusFilter] = useState('all');
    const [sortBy, setSortBy] = useState('');

    useEffect(() => {
        const fetchApps = async () => {
            try {
                const res = await api.get(`/applications?email=${user.email}`);
                setApplications(res.data);
            } catch (err) {
                console.error('Failed to load applications', err);
            } finally {
                setLoading(false);
            }
        };
        fetchApps();
    }, [user.email]);

    const handleUpdateStatus = async (id, status) => {
        const { value: feedback } = await Swal.fire({
            title: `Provide feedback for ${status}`,
            input: 'text',
            inputLabel: 'Feedback (optional)',
            inputPlaceholder: 'Write something...',
            showCancelButton: true,
        });

        try {
            await api.patch(`/applications/${id}`, {
                status,
                feedback: feedback || ''
            });
            Swal.fire('Updated!', `Application ${status}.`, 'success');
            setApplications(applications.map(app =>
                app._id === id ? { ...app, status, feedback } : app
            ));
        } catch (err) {
            Swal.fire('Error', 'Failed to update application', 'error');
        }
    };

    const handleDelete = async (id) => {
        const confirm = await Swal.fire({
            title: 'Delete Application?',
            text: 'This action cannot be undone.',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, delete it'
        });

        if (confirm.isConfirmed) {
            try {
                await api.delete(`/applications/${id}`);
                setApplications(applications.filter(app => app._id !== id));
                Swal.fire('Deleted!', 'Application has been removed.', 'success');
            } catch (err) {
                Swal.fire('Error', 'Failed to delete application', 'error');
            }
        }
    };

    const filteredApps = applications
        .filter(app => statusFilter === 'all' ? true : app.status === statusFilter)
        .sort((a, b) => {
            if (sortBy === 'appliedAt') {
                return new Date(b.appliedAt) - new Date(a.appliedAt);
            } else if (sortBy === 'deadline') {
                return new Date(b.scholarshipDeadline) - new Date(a.scholarshipDeadline);
            } else {
                return 0;
            }
        });

    return (
        <section className="p-6 max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold mb-6">Manage Applications</h2>

            <div className="mb-6 flex flex-col md:flex-row justify-between gap-4 items-center">
                <div className="flex gap-4 items-center">
                    <label>Status Filter:</label>
                    <select className="select select-bordered" value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
                        <option value="all">All</option>
                        <option value="pending">Pending</option>
                        <option value="approved">Approved</option>
                        <option value="rejected">Rejected</option>
                    </select>
                </div>
                <div className="flex gap-4 items-center">
                    <label>Sort By Date:</label>
                    <select className="select select-bordered" value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
                        <option value="">None</option>
                        <option value="appliedAt">Applied Date</option>
                        <option value="deadline">Scholarship Deadline</option>
                    </select>
                </div>
            </div>

            {loading ? (
                <p>Loading applications...</p>
            ) : filteredApps.length === 0 ? (
                <p className="text-gray-500">No applications to display.</p>
            ) : (
                <div className="overflow-x-auto">
                    <table className="table table-zebra w-full">
                        <thead>
                            <tr>
                                <th>Scholarship</th>
                                <th>User Email</th>
                                <th>Status</th>
                                <th>Applied At</th>
                                <th>Deadline</th>
                                <th>Feedback</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredApps.map(app => (
                                <tr key={app._id}>
                                    <td>{app.scholarshipName || 'N/A'}</td>
                                    <td>{app.userEmail}</td>
                                    <td>
                                        <span className={`badge ${app.status === 'pending' ? 'badge-warning' : app.status === 'approved' ? 'badge-success' : 'badge-error'}`}>
                                            {app.status}
                                        </span>
                                    </td>
                                    <td>{new Date(app.appliedAt).toLocaleString()}</td>
                                    <td>{app.scholarshipDeadline ? new Date(app.scholarshipDeadline).toLocaleDateString() : 'N/A'}</td>
                                    <td>{app.feedback || '-'}</td>
                                    <td className="flex gap-2">
                                        {app.status === 'pending' && (
                                            <>
                                                <button onClick={() => handleUpdateStatus(app._id, 'approved')} className="btn btn-xs btn-success">Approve</button>
                                                <button onClick={() => handleUpdateStatus(app._id, 'rejected')} className="btn btn-xs btn-error">Reject</button>
                                            </>
                                        )}
                                        <button onClick={() => handleDelete(app._id)} className="btn btn-xs btn-outline btn-error">
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

export default ManageApplications;
