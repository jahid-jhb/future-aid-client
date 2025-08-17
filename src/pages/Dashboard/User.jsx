import React, { useEffect, useState } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import api from '../../services/api';
import { useAuth } from '../../context/AuthContext';

const User = () => {
    const [stats, setStats] = useState({
        pending: 0,
        approved: 0,
        rejected: 0
    });
    const { user } = useAuth();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUserStats = async () => {
            try {
                const res = await api.get('/my-applications');
                const applications = res.data;

                // Calculate statistics
                const stats = applications.reduce((acc, app) => {
                    acc[app.status.toLowerCase()]++;
                    return acc;
                }, { pending: 0, approved: 0, rejected: 0 });

                setStats(stats);
            } catch (error) {
                console.error('Error fetching user stats:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchUserStats();
    }, [user]);

    const chartData = [
        { name: 'Pending', value: stats.pending },
        { name: 'Approved', value: stats.approved },
        { name: 'Rejected', value: stats.rejected }
    ];

    const COLORS = ['#FDB022', '#34D399', '#EF4444'];

    if (loading) {
        return (
            <div className="flex justify-center items-center h-96">
                <span className="loading loading-spinner loading-lg text-accent"></span>
            </div>
        );
    }

    const totalApplications = stats.pending + stats.approved + stats.rejected;

    return (
        <div className="h-full max-w-3xl mx-auto mt-10 p-6 bg-base-300 rounded shadow">
            <h2 className="text-2xl font-bold mb-4 text-accent">Dashboard</h2>
            <p className="mb-8 text-gray-700">
                Welcome to your dashboard! Here you can view your profile, manage your scholarship applications, and see your reviews.
            </p>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                <div className="bg-base-100 p-4 rounded-lg">
                    <h3 className="font-semibold text-yellow-800">Pending</h3>
                    <p className="text-2xl font-bold text-yellow-600">{stats.pending}</p>
                </div>
                <div className="bg-base-100 p-4 rounded-lg">
                    <h3 className="font-semibold text-accent/80">Approved</h3>
                    <p className="text-2xl font-bold text-accent">{stats.approved}</p>
                </div>
                <div className="bg-base-100 p-4 rounded-lg">
                    <h3 className="font-semibold text-red-800">Rejected</h3>
                    <p className="text-2xl font-bold text-red-600">{stats.rejected}</p>
                </div>
            </div>

            {/* Application Status Chart */}
            {totalApplications > 0 ? (
                <div className="h-80 w-full">
                    <h3 className="text-lg font-semibold mb-4 text-center">Application Status Overview</h3>
                    <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                            <Pie
                                data={chartData}
                                cx="50%"
                                cy="50%"
                                labelLine={false}
                                outerRadius={80}
                                fill="#8884d8"
                                dataKey="value"
                                label={({ name, value }) => `${name}: ${value}`}
                            >
                                {chartData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                ))}
                            </Pie>
                            <Tooltip />
                            <Legend />
                        </PieChart>
                    </ResponsiveContainer>
                </div>
            ) : (
                <p className="text-center text-gray-500">No applications yet</p>
            )}
        </div>
    );
};

export default User;
