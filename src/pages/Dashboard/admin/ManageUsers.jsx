import React, { useEffect, useState } from 'react';
import api from '../../../services/api';
import Swal from 'sweetalert2';
import { FaTrashAlt } from 'react-icons/fa';
import { useAuth } from '../../../context/AuthContext';

const ManageUsers = () => {

    const { user } = useAuth();

    const [users, setUsers] = useState([]);

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            const res = await api.get(`/users?email=${user.email}`);
            setUsers(res.data);
        } catch (err) {
            console.error('Failed to load users', err);
        }
    };

    const handleRoleChange = async (userId, newRole) => {
        const confirm = await Swal.fire({
            title: 'Change Role?',
            text: `Are you sure to change the role to ${newRole}?`,
            icon: 'question',
            showCancelButton: true,
            confirmButtonText: 'Yes, change it'
        });

        if (confirm.isConfirmed) {
            try {
                const res = await api.patch(`/users/role/${userId}?email=${user.email}`, { role: newRole });
                if (res.data.modifiedCount || res.data.matchedCount) {
                    Swal.fire('Success', 'Role updated', 'success');
                    fetchUsers();
                }
            } catch (err) {
                Swal.fire('Error', 'Failed to update role', 'error');
            }
        }
    };

    const handleDelete = async (userId) => {
        const confirm = await Swal.fire({
            title: 'Delete User?',
            text: 'This action cannot be undone.',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, delete'
        });

        if (confirm.isConfirmed) {
            try {
                await api.delete(`/users/${userId}?email=${user.email}`);
                setUsers(users.filter(user => user._id !== userId));
                Swal.fire('Deleted!', 'User removed.', 'success');
            } catch (err) {
                Swal.fire('Error', 'Failed to delete user', 'error');
            }
        }
    };

    return (
        <section className="p-6 max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold mb-6">Manage Users</h2>

            {users.length === 0 ? (
                <p className="text-gray-500">No users found.</p>
            ) : (
                <div className="overflow-x-auto">
                    <table className="table table-zebra w-full">
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Current Role</th>
                                <th>Change Role</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map(u => (
                                <tr key={u._id}>
                                    <td>{u.name || 'N/A'}</td>
                                    <td>{u.email}</td>
                                    <td className="capitalize">
                                        <span className="badge badge-outline">{u.role}</span>
                                    </td>
                                    <td>
                                        <select
                                            value={u.role}
                                            onChange={(e) => handleRoleChange(u._id, e.target.value)}
                                            className="select select-sm select-bordered"
                                        >
                                            <option value="user">user</option>
                                            <option value="moderator">moderator</option>
                                            <option value="admin">admin</option>
                                        </select>
                                    </td>
                                    <td>
                                        <button
                                            onClick={() => handleDelete(u._id)}
                                            className="btn btn-sm btn-outline btn-error"
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
        </section>
    );
};

export default ManageUsers;
