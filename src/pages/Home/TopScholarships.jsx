import React, { useEffect, useState } from 'react';
import { Link } from 'react-router';
import api from '../../services/api';

const TopScholarships = () => {
    const [scholarships, setScholarships] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        scholarshipsFn();
    }, []);

    const scholarshipsFn = async () => {
        try {
            await api.get('/scholarships')
                .then(res => Array.isArray(res.data) ? setScholarships(res.data) : setScholarships([]))
                .catch(() => setScholarships([]))
                .finally(() => setLoading(false));

        } catch (error) {
            // 
        }
    }

    // Sort by lowest fees, then by most recently posted (createdAt descending)
    const sorted = [...scholarships].sort((a, b) => {
        if (a.applicationFees !== b.applicationFees) return a.applicationFees - b.applicationFees;
        // Use postDate if available, fallback to deadline
        if (a.postDate && b.postDate) {
            return new Date(b.postDate) - new Date(a.postDate);
        }
        return new Date(b.applicationDeadline) - new Date(a.applicationDeadline);
    });

    const topSix = sorted.slice(0, 6);

    if (loading) {
        return (
            <div className="flex justify-center items-center py-12">
                <span className="loading loading-spinner loading-lg text-accent"></span>
            </div>
        );
    }
    console.log('scholarships', scholarships);


    return (
        <section className="max-w-6xl mx-auto mt-20">
            <h2 className="text-2xl md:text-3xl font-bold mb-6 text-center">Top Scholarships</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {topSix.map(sch => (
                    <div key={sch._id} className="bg-base-300 rounded-lg shadow p-5 flex flex-col items-center">
                        <img src={sch.universityImage} alt={sch.universityName} className="h-16 w-16 object-contain mb-3" />
                        <h3 className="text-lg font-semibold mb-1">{sch.universityName}</h3>
                        <div className="text-sm text-gray-500 mb-1">{sch.universityCity}, {sch.universityCountry}</div>
                        <div className="mb-1">
                            <span className="inline-block bg-base-100 px-2 py-0.5 rounded text-xs mr-2">{sch.scholarshipCategory}</span>
                            {/* <span className="inline-block bg-green-100 text-green-700 px-2 py-0.5 rounded text-xs">{sch.subject}</span> */}
                        </div>
                        <div className="text-sm mb-1">Deadline: <span className="font-medium">{sch.applicationDeadline}</span></div>
                        <div className="text-sm mb-1">Fees: <span className="font-medium">${sch.tuitionFees}</span></div>
                        <div className="flex items-center mb-2">
                            {/* <span className="text-yellow-500 mr-1">★</span> */}
                            <span className="font-semibold">{sch.rating}</span>
                        </div>
                        <Link
                            to={`/scholarships/${sch._id}`}
                            className="mt-auto bg-accent text-white px-4 py-1.5 rounded hover:bg-accent transition text-sm"
                        >
                            Scholarship Details
                        </Link>
                    </div>
                ))}
            </div>
            <div className="flex justify-center mt-8">
                <Link
                    to="/scholarships"
                    className="bg-gray-800 text-white px-6 py-2 rounded hover:bg-gray-900 transition"
                >
                    All Scholarships
                </Link>
            </div>
        </section>
    );
};

export default TopScholarships;
