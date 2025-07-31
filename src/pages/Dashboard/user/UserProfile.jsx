import React, { useEffect, useState } from 'react';
import { useAuth } from '../../../context/AuthContext';
import api from '../../../services/api';

const UserProfile = () => {
    const { user, loading } = useAuth();
    const [role, setRole] = useState('');
    const [joinedDate, setJoinedDate] = useState('');

    useEffect(() => {
        if (user?.email) {
            api.get(`/users/role/${user.email}`)
                .then(res => setRole(res.data.role))
                .catch(err => console.error('Failed to get role', err));

            // Simulate join date as current date for now
            setJoinedDate(new Date().toLocaleDateString());
        }
    }, [user]);

    if (loading) return <p className="text-center py-6">Loading profile...</p>;

    return (
        <section className="max-w-xl mx-auto p-6">
            <h2 className="text-3xl font-bold mb-6 text-center">My Profile</h2>

            <div className="card bg-base-200 shadow-lg p-6">
                <div className="flex flex-col items-center space-y-4">
                    <div className="avatar">
                        <div className="w-24 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                            <img src={user?.photoURL || "https://i.ibb.co/ZmFHZrj/avatar-placeholder.png"} alt="Avatar" />
                        </div>
                    </div>

                    <div className="text-center space-y-1">
                        <h3 className="text-xl font-semibold">{user?.displayName || 'Admin User'}</h3>
                        <p className="text-sm text-gray-500">{user?.email}</p>
                        <p className="badge badge-secondary capitalize">Role: {role || 'N/A'}</p>
                        <p className="text-sm text-gray-400">Joined: {joinedDate}</p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default UserProfile;
