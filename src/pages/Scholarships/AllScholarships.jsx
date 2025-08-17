import React, { useEffect, useState } from 'react';
import { Link } from 'react-router';
import api from '../../services/api';

const AllScholarships = () => {
    const [scholarships, setScholarships] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [filtered, setFiltered] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(6);
    const [sortBy, setSortBy] = useState('deadline');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchScholarships();
    }, []);

    useEffect(() => {
        const search = searchTerm.toLowerCase();
        let results = scholarships.filter(s =>
            s.scholarshipName?.toLowerCase().includes(search) ||
            s.universityName?.toLowerCase().includes(search) ||
            s.degree?.toLowerCase().includes(search)
        );

        // Apply sorting
        results = sortScholarships(results);

        setFiltered(results);
        setCurrentPage(1); // Reset to first page on search/sort
    }, [searchTerm, scholarships, sortBy]);

    const fetchScholarships = async () => {
        try {
            const res = await api.get('/scholarships');
            setScholarships(Array.isArray(res.data) ? res.data : []);
        } catch (err) {
            console.error('Failed to fetch scholarships:', err);
            setScholarships([]);
        } finally {
            setLoading(false);
        }
    };

    const sortScholarships = (items) => {
        return [...items].sort((a, b) => {
            switch (sortBy) {
                case 'deadline':
                    return new Date(a.applicationDeadline) - new Date(b.applicationDeadline);
                case 'fees-low':
                    return a.tuitionFees - b.tuitionFees;
                case 'fees-high':
                    return b.tuitionFees - a.tuitionFees;
                case 'rating-high':
                    return b.rating - a.rating;
                case 'name':
                    return a.universityName.localeCompare(b.universityName);
                default:
                    return 0;
            }
        });
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <span className="loading loading-spinner loading-lg text-accent"></span>
            </div>
        );
    }

    return (
        <section className="mt-20 max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold mb-6 text-center">All Scholarships</h2>

            <div className="flex flex-col md:flex-row gap-4 mb-6 justify-between items-center">
                <input
                    type="text"
                    value={searchTerm}
                    onChange={e => setSearchTerm(e.target.value)}
                    placeholder="Search by scholarship name, university, or degree"
                    className="input input-bordered w-full max-w-md"
                />

                <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="select select-bordered w-full md:w-auto"
                >
                    <option value="deadline">Deadline (Earliest)</option>
                    <option value="fees-low">Fees (Low to High)</option>
                    <option value="fees-high">Fees (High to Low)</option>
                    <option value="rating-high">Rating (High to Low)</option>
                    <option value="name">University Name (A-Z)</option>
                </select>
            </div>

            {filtered.length === 0 ? (
                <p className="text-center text-gray-500 py-8">No scholarships found.</p>
            ) : (
                <>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filtered.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage).map(sch => (
                            <div key={sch._id} className="bg-base-300 rounded-lg shadow p-5 flex flex-col items-center">
                                <img src={sch.universityImage} alt={sch.universityName} className="h-16 w-16 object-contain mb-3" />
                                <h3 className="text-lg font-semibold mb-1">{sch.universityName}</h3>
                                <div className="text-sm text-gray-500 mb-1">{sch.universityCity}, {sch.universityCountry}</div>
                                <div className="mb-1">
                                    <span className="inline-block bg-base-100 px-2 py-0.5 rounded text-xs mr-2">{sch.scholarshipCategory}</span>
                                </div>
                                <div className="text-sm mb-1">Deadline: <span className="font-medium">{sch.applicationDeadline}</span></div>
                                <div className="text-sm mb-1">Fees: <span className="font-medium">${sch.tuitionFees}</span></div>
                                <div className="flex items-center mb-2">
                                    <div className="rating rating-sm">
                                        {[1, 2, 3, 4, 5].map((star) => (
                                            <input
                                                key={star}
                                                type="radio"
                                                name={`rating-${sch._id}`}
                                                className="mask mask-star-2 bg-yellow-400"
                                                checked={Math.round(sch.rating) === star}
                                                readOnly
                                            />
                                        ))}
                                    </div>
                                    <span className="ml-2 font-semibold">{sch.rating}</span>
                                </div>
                                <Link
                                    to={`/scholarships/${sch._id}`}
                                    className="mt-2 btn btn-sm btn-accent text-white"
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
                                    className={`btn btn-sm ${currentPage === i + 1 ? 'bg-blue-600 text-white' : 'btn-outline'}`}
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
