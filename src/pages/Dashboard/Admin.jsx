import React from 'react';
import AdminChart from './AdminChart';

const Admin = () => {
    return (
        <div className="max-w-3xl mx-auto mt-10 p-6 bg-base-300 rounded shadow">
            <h2 className="text-2xl font-bold mb-4 text-accent">Admin Dashboard</h2>
            <p className="mb-4 text-gray-700">
                Welcome to the Admin Dashboard. Here you can manage scholarships, users, applications, and reviews.
            </p>
            
            <AdminChart />
        </div>
    );
};

export default Admin;