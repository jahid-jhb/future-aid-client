import React, { useEffect, useState } from 'react';
import { Link } from 'react-router';
import api from '../../services/api';

const AllScholarships = () => {
    const [scholarships, setScholarships] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [filtered, setFiltered] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(6);

    useEffect(() => {
        fetchScholarships();
    }, []);

    useEffect(() => {
        const search = searchTerm.toLowerCase();
        const results = scholarships.filter(s =>
            s.scholarshipName.toLowerCase().includes(search) ||
            s.universityName.toLowerCase().includes(search) ||
            s.degree.toLowerCase().includes(search)
        );
        setFiltered(results);
        setCurrentPage(1); // reset to first page on search
    }, [searchTerm, scholarships]);

    const fetchScholarships = async () => {
        try {
            const res = await api.get('/scholarships');
            setScholarships(res.data);
            setFiltered(res.data);
        } catch (err) {
            console.error('Failed to fetch scholarships:', err);
        }
    };

    return (
        <section className="p-6 max-w-7xl mx-auto">
            <h2 className="text-3xl font-bold mb-6 text-center">All Scholarships</h2>
            <div className="flex gap-2 mb-6 justify-center">
                <input
                    type="text"
                    value={searchTerm}
                    onChange={e => setSearchTerm(e.target.value)}
                    placeholder="Search by scholarship name, university, or degree"
                    className="input input-bordered w-full max-w-md"
                />
            </div>

            {filtered.length === 0 ? (
                <p className="text-center text-gray-500">No scholarships found.</p>
            ) : (
                <>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filtered.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage).map(sch => (
                            <div key={sch._id} className="bg-white rounded-lg shadow p-5 flex flex-col items-center">
                                <img src={sch.universityImage} alt={sch.universityName} className="h-16 w-16 object-contain mb-3" />
                                <h3 className="text-lg font-semibold mb-1">{sch.universityName}</h3>
                                <div className="text-sm text-gray-500 mb-1">{sch.universityCity}, {sch.universityCountry}</div>
                                <div className="mb-1">
                                    <span className="inline-block bg-blue-100 text-blue-700 px-2 py-0.5 rounded text-xs mr-2">{sch.scholarshipCategory}</span>
                                </div>
                                <div className="text-sm mb-1">Deadline: <span className="font-medium">{sch.applicationDeadline}</span></div>
                                <div className="text-sm mb-1">Fees: <span className="font-medium">${sch.tuitionFees}</span></div>
                                <div className="flex items-center mb-2">
                                    <span className="text-yellow-500 mr-1">★</span>
                                    <span className="font-semibold">{sch.rating}</span>
                                </div>
                                <Link
                                    to={`/scholarships/${sch._id}`}
                                    className="mt-auto bg-blue-600 text-white px-4 py-1.5 rounded hover:bg-blue-700 transition text-sm"
                                >
                                    Scholarship Details
                                </Link>
                            </div>
                        ))}
                    </div>
                    {filtered.length > itemsPerPage && (
                        <div className="mt-8 flex justify-center gap-2">
                            {Array.from({ length: Math.ceil(filtered.length / itemsPerPage) }, (_, i) => (
                                <button
                                    key={i}
                                    onClick={() => setCurrentPage(i + 1)}
                                    className={`btn btn-sm ${currentPage === i + 1 ? 'btn-primary' : 'btn-outline'}`}
                                >
                                    {i + 1}
                                </button>
                            ))}
                        </div>
                    )}
                </>
            )}
        </section>
    );
};

export default AllScholarships;
