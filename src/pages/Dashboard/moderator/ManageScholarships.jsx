import React, { useEffect, useState } from 'react';
import api from '../../../services/api';
import Swal from 'sweetalert2';
import { FaEdit, FaEye, FaTrashAlt } from 'react-icons/fa';
import { useAuth } from '../../../context/AuthContext';

const ManageScholarships = () => {

    const { user } = useAuth();
    const [scholarships, setScholarships] = useState([]);
    const [selectedScholarship, setSelectedScholarship] = useState(null);
    const [editData, setEditData] = useState(null);
    const [modalType, setModalType] = useState(null); // 'view' | 'edit'


    useEffect(() => {
        fetchScholarships();
    }, []);

    const fetchScholarships = async () => {
        try {
            const res = await api.get('/scholarships');
            setScholarships(res.data);
        } catch (err) {
            // console.error('Failed to fetch scholarships');
        }
    };

    const handleDelete = async (id) => {
        const confirm = await Swal.fire({
            title: 'Are you sure?',
            text: 'You will not be able to recover this scholarship!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, delete it!',
        });

        if (confirm.isConfirmed) {
            try {
                await api.delete(`/scholarships/${id}?email=${user.email}`);
                setScholarships(scholarships.filter(s => s._id !== id));
                Swal.fire('Deleted!', 'Scholarship has been removed.', 'success');
            } catch (err) {
                Swal.fire('Error', 'Failed to delete scholarship', 'error');
            }
        }
    };

    const openModal = (type, scholarship) => {
        setModalType(type);
        setSelectedScholarship(scholarship);
        if (type === 'edit') setEditData({ ...scholarship });
        document.getElementById('modal_control').showModal();
    };

    const handleEditChange = (e) => {
        const { name, value } = e.target;
        setEditData({ ...editData, [name]: value });
    };

    const handleUpdate = async () => {
        try {
            const res = await api.patch(`/scholarships/${editData._id}?email=${user.email}`, editData);
            // console.log(res.data);

            if (res.data.modifiedCount || res.data.matchedCount) {
                Swal.fire({
                    title: 'Updated!',
                    text: 'Scholarship updated successfully!',
                    icon: 'success'
                });
                fetchScholarships(); // Refresh the list
                document.getElementById('modal_control').close();

            }
        } catch (err) {
            Swal.fire('Error', 'Update failed', 'error');
            document.getElementById('modal_control').close();
        }
    };

    return (
        <section className="p-6 max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold mb-6">Manage Scholarships</h2>

            <div className="overflow-x-auto">
                <table className="table table-zebra w-full">
                    <thead>
                        <tr>
                            <th>Scholarship Name</th>
                            <th>University</th>
                            <th>Subject</th>
                            <th>Degree</th>
                            <th>App. Fees</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {scholarships.map((s) => (
                            <tr key={s._id}>
                                <td>{s.scholarshipName}</td>
                                <td>{s.universityName}</td>
                                <td>{s.subjectCategory}</td>
                                <td>{s.degree}</td>
                                <td>${s.applicationFees}</td>
                                <td className="flex gap-2">
                                    <button onClick={() => openModal('view', s)} className="btn btn-sm btn-outline btn-info">
                                        <FaEye />
                                    </button>
                                    <button onClick={() => openModal('edit', s)} className="btn btn-sm btn-outline btn-success">
                                        <FaEdit />
                                    </button>
                                    <button onClick={() => handleDelete(s._id)} className="btn btn-sm btn-outline btn-error">
                                        <FaTrashAlt />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Modal */}
            <dialog id="modal_control" className="modal">
                <div className="modal-box max-w-3xl">
                    <h3 className="font-bold text-lg mb-4">
                        {modalType === 'view' ? 'Scholarship Details' : 'Edit Scholarship'}
                    </h3>
                    <form method="dialog">
                        {/* if there is a button in form, it will close the modal */}
                        <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                    </form>

                    {modalType === 'view' && selectedScholarship && (
                        <div className="space-y-2">
                            <p><strong>University:</strong> {selectedScholarship.universityName}</p>
                            <p><strong>Country:</strong> {selectedScholarship.universityCountry}</p>
                            <p><strong>Subject:</strong> {selectedScholarship.subjectCategory}</p>
                            <p><strong>Degree:</strong> {selectedScholarship.degree}</p>
                            <p><strong>Fees:</strong> ${selectedScholarship.applicationFees}</p>
                            <p><strong>Deadline:</strong> {selectedScholarship.applicationDeadline}</p>
                            <p><strong>Description:</strong> {selectedScholarship.description}</p>
                        </div>
                    )}

                    {modalType === 'edit' && editData && (
                        <div className="grid grid-cols-2 gap-4">
                            <input name="scholarshipName" value={editData.scholarshipName} onChange={handleEditChange} className="input input-bordered" />
                            <input name="universityName" value={editData.universityName} onChange={handleEditChange} className="input input-bordered" />
                            <input name="subjectCategory" value={editData.subjectCategory} onChange={handleEditChange} className="input input-bordered" />
                            <input name="degree" value={editData.degree} onChange={handleEditChange} className="input input-bordered" />
                            <input name="applicationFees" value={editData.applicationFees} onChange={handleEditChange} className="input input-bordered" />
                            <input name="applicationDeadline" value={editData.applicationDeadline} onChange={handleEditChange} className="input input-bordered" />
                            <textarea name="description" value={editData.description} onChange={handleEditChange} className="textarea textarea-bordered col-span-2"></textarea>
                            <div className="modal-action col-span-2">
                                <form method="dialog">
                                    <button className="btn mr-2">Close</button>
                                    <button type="button" onClick={handleUpdate} className="btn bg-accent">Update</button>
                                </form>
                            </div>
                        </div>
                    )}
                </div>
            </dialog>
        </section>
    );
};

export default ManageScholarships;
