import React, { useEffect, useState } from 'react';
import api from '../../services/api';
import {
    BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid,
    PieChart, Pie, Cell, Legend
} from 'recharts';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const AdminChart = () => {
    const [scholarships, setScholarships] = useState([]);
    const [applications, setApplications] = useState([]);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const [sRes, aRes] = await Promise.all([
                api.get('/scholarships'),
                api.get('/applications')
            ]);
            setScholarships(sRes.data);
            setApplications(aRes.data);
        } catch (err) {
            console.error('Error fetching analytics data', err);
        }
    };

    // Application counts by status
    const statusStats = ['pending', 'processing', 'completed', 'rejected'].map(status => ({
        name: status,
        value: applications.filter(app => app.status === status).length
    }));

    // Applications per scholarship
    const appPerScholarship = scholarships.map(s => ({
        name: s.name,
        applications: applications.filter(a => a.scholarshipId === s._id).length
    })).slice(0, 8); // Top 8 only for readability

    return (
        <section className="p-6 max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold mb-6">📊 Admin Analytics</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="bg-base-200 p-4 rounded-xl shadow">
                    <h3 className="text-xl font-semibold mb-4">Applications by Status</h3>
                    <ResponsiveContainer width="100%" height={300}>
                        <PieChart>
                            <Pie
                                data={statusStats}
                                dataKey="value"
                                nameKey="name"
                                cx="50%"
                                cy="50%"
                                outerRadius={100}
                                fill="#8884d8"
                                label
                            >
                                {statusStats.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                ))}
                            </Pie>
                            <Legend />
                            <Tooltip />
                        </PieChart>
                    </ResponsiveContainer>
                </div>

                <div className="bg-base-200 p-4 rounded-xl shadow">
                    <h3 className="text-xl font-semibold mb-4">Top Scholarships by Applications</h3>
                    <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={appPerScholarship}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" tick={{ fontSize: 12 }} />
                            <YAxis />
                            <Tooltip />
                            <Bar dataKey="applications" fill="#00C49F" />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </section>
    );
};

export default AdminChart;
