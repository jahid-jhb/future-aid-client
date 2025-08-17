import React from 'react';
import AdminChart from './AdminChart';

const Admin = () => {
    return (
        <div className="max-w-3xl mx-auto mt-10 p-6 bg-white rounded shadow">
            <h2 className="text-2xl font-bold mb-4 text-accent-700">Admin Dashboard</h2>
            <p className="mb-4 text-gray-700">
                Welcome to the Admin Dashboard. Here you can manage scholarships, users, applications, and reviews.
            </p>
            {/* <ul className="list-disc pl-6 text-gray-600 space-y-2">
                <li>View and edit your profile</li>
                <li>Add new scholarships</li>
                <li>Manage all scholarships</li>
                <li>Manage all applications</li>
                <li>Manage users and change roles</li>
                <li>Manage all reviews</li>
                <li>Access analytics and reports</li>
            </ul> */}
            <AdminChart />
        </div>
    );
};

export default Admin;