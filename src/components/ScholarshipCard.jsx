import React from 'react';
import { Link } from 'react-router';

const ScholarshipCard = ({ scholarship }) => {
    if (!scholarship) return null;

    const {
        _id,
        university,
        logo,
        category,
        location,
        deadline,
        subject,
        fees,
        rating,
    } = scholarship;

    return (
        <div className="bg-white rounded-lg shadow p-5 flex flex-col items-center">
            <img src={logo} alt={university} className="h-16 w-16 object-contain mb-3" />
            <h3 className="text-lg font-semibold mb-1">{university}</h3>
            <div className="text-sm text-gray-500 mb-1">{location}</div>
            <div className="mb-1">
                <span className="inline-block bg-blue-100 text-blue-700 px-2 py-0.5 rounded text-xs mr-2">{category}</span>
                <span className="inline-block bg-green-100 text-green-700 px-2 py-0.5 rounded text-xs">{subject}</span>
            </div>
            <div className="text-sm mb-1">Deadline: <span className="font-medium">{deadline}</span></div>
            <div className="text-sm mb-1">Fees: <span className="font-medium">${fees}</span></div>
            <div className="flex items-center mb-2">
                <span className="text-yellow-500 mr-1">★</span>
                <span className="font-semibold">{rating}</span>
            </div>
            <Link
                to={`/scholarships/${_id}`}
                className="mt-auto bg-blue-600 text-white px-4 py-1.5 rounded hover:bg-blue-700 transition text-sm"
            >
                Scholarship Details
            </Link>
        </div>
    );
};

export default ScholarshipCard;
