import React, { useState } from 'react';
import { Link, Outlet } from 'react-router';
import { useAuth } from '../context/AuthContext';
import Navbar from '../components/Navbar';

const DashboardLayout = () => {
    const { user, isAdmin, isModerator } = useAuth();
    const [sidebarOpen, setSidebarOpen] = useState(false);

    const handleSidebarToggle = () => setSidebarOpen((prev) => !prev);

    return (
        <>
            <Navbar />
            <div className="min-h-screen flex bg-gray-100">
                {/* Sidebar for desktop & mobile */}
                {/* Overlay for mobile */}
                {sidebarOpen && (
                    <div
                        className="fixed inset-0 bg-opacity-30 z-40 md:hidden"
                        onClick={handleSidebarToggle}
                    />
                )}
                <aside
                    className={`fixed md:static z-10 top-0 left-0 h-full w-64 bg-white shadow-lg p-6 transform transition-transform duration-200
                    ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 md:block`}
                >
                    {/* Close button for mobile */}
                    <button
                        className="md:hidden absolute top-4 right-4 text-gray-600"
                        onClick={handleSidebarToggle}
                        aria-label="Close Sidebar"
                    >
                        <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                    <div className="mb-8 flex flex-col items-center mt-8 md:mt-0">
                        <img
                            src={user?.photoURL || '/default-avatar.png'}
                            alt={user?.displayName || 'User'}
                            className="h-16 w-16 rounded-full object-cover mb-2"
                        />
                        <div className="font-bold text-lg">{user?.displayName || user?.email}</div>
                        <div className="text-xs text-gray-500">
                            {isAdmin ? 'Admin' : isModerator ? 'Moderator' : 'User'}
                        </div>
                    </div>
                    <nav className="flex flex-col gap-3">
                        {/* User Dashboard Links */}
                        {!isAdmin && !isModerator && (
                            <>
                                <Link to="/dashboard/user/profile" className="hover:text-blue-600" onClick={handleSidebarToggle}>My Profile</Link>
                                <Link to="/dashboard/user/applications" className="hover:text-blue-600" onClick={handleSidebarToggle}>My Applications</Link>
                                <Link to="/dashboard/user/reviews" className="hover:text-blue-600" onClick={handleSidebarToggle}>My Reviews</Link>
                            </>
                        )}
                        {/* Moderator Dashboard Links */}
                        {isModerator && !isAdmin && (
                            <>
                                <Link to="/dashboard/moderator/profile" className="hover:text-blue-600" onClick={handleSidebarToggle}>My Profile</Link>
                                <Link to="/dashboard/moderator/manage-scholarships" className="hover:text-blue-600" onClick={handleSidebarToggle}>Manage Scholarships</Link>
                                <Link to="/dashboard/moderator/all-reviews" className="hover:text-blue-600" onClick={handleSidebarToggle}>All Reviews</Link>
                                <Link to="/dashboard/moderator/all-applications" className="hover:text-blue-600" onClick={handleSidebarToggle}>All Applied Application</Link>
                                <Link to="/dashboard/moderator/add-scholarship" className="hover:text-blue-600" onClick={handleSidebarToggle}>Add Scholarship</Link>
                            </>
                        )}
                        {/* Admin Dashboard Links */}
                        {isAdmin && (
                            <>
                                <Link to="/dashboard/admin/profile" className="hover:text-blue-600" onClick={handleSidebarToggle}>Admin Profile</Link>
                                <Link to="/dashboard/admin/add-scholarship" className="hover:text-blue-600" onClick={handleSidebarToggle}>Add Scholarship</Link>
                                <Link to="/dashboard/admin/manage-scholarships" className="hover:text-blue-600" onClick={handleSidebarToggle}>Manage Scholarships</Link>
                                <Link to="/dashboard/admin/manage-applications" className="hover:text-blue-600" onClick={handleSidebarToggle}>Manage Applications</Link>
                                <Link to="/dashboard/admin/manage-users" className="hover:text-blue-600" onClick={handleSidebarToggle}>Manage Users</Link>
                                <Link to="/dashboard/admin/manage-reviews" className="hover:text-blue-600" onClick={handleSidebarToggle}>Manage Reviews</Link>
                            </>
                        )}
                    </nav>
                </aside>
                {/* Sidebar toggle button for mobile */}
                <button
                    className="fixed md:hidden top-20 left-4 z-50 bg-blue-600 text-white p-2 rounded-full shadow-lg"
                    onClick={handleSidebarToggle}
                    aria-label="Open Sidebar"
                >
                    <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                    </svg>
                </button>
                {/* Main Content */}
                <main className="flex-1 p-4">
                    <Outlet />
                </main>
            </div>
        </>
    );
};

export default DashboardLayout;
