import React from 'react';
import ModeratorChart from './ModeratorChart';

const Moderator = () => {
    return (
        <div className="max-w-3xl mx-auto mt-10 p-6 bg-base-300 rounded shadow">
            <h2 className="text-2xl font-bold mb-4 text-accent">Moderator Dashboard</h2>
            <p className="mb-4 text-gray-700">
                Welcome to the Moderator Dashboard. Here you can manage scholarships, applications, and reviews.
            </p>
            <ModeratorChart />
        </div>
    );
};

export default Moderator;
