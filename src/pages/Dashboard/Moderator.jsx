import React from 'react';

const Moderator = () => {
    return (
        <div className="max-w-3xl mx-auto mt-10 p-6 bg-white rounded shadow">
            <h2 className="text-2xl font-bold mb-4 text-accent">Moderator Dashboard</h2>
            <p className="mb-4 text-gray-700">
                Welcome to the Moderator Dashboard. Here you can manage scholarships, applications, and reviews.
            </p>
            <ul className="list-disc pl-6 text-gray-600 space-y-2">
                <li>View and edit your profile</li>
                <li>Manage all scholarships</li>
                <li>Review and manage all applications</li>
                <li>View and respond to user inquiries</li>
                <li>Generate reports on scholarship performance</li>
            </ul>
        </div>
    );
};

export default Moderator;
