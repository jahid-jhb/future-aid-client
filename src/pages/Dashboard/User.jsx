import React from 'react';

const User = () => {
    return (
        <div className="max-w-3xl mx-auto mt-10 p-6 bg-white rounded shadow">
            <h2 className="text-2xl font-bold mb-4 text-accent">User Dashboard</h2>
            <p className="mb-4 text-gray-700">
                Welcome to your dashboard! Here you can view your profile, manage your scholarship applications, and see your reviews.
            </p>
            <ul className="list-disc pl-6 text-gray-600 space-y-2">
                <li>View and edit your profile</li>
                <li>See all your scholarship applications</li>
                <li>Check feedback and application status</li>
                <li>Write and manage your reviews</li>
            </ul>
        </div>
    );
};

export default User;