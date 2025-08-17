import React, { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
    const { user, logout, isAdmin, isModerator } = useAuth();
    const navigate = useNavigate();
    const [menuOpen, setMenuOpen] = useState(false);

    const handleLogout = async () => {
        try {
            await logout();
            navigate('/login');
        } catch (err) {
            // Optionally show error toast
        }
    };

    const handleMenuToggle = () => setMenuOpen((prev) => !prev);

    return (
        <nav className="bg-base-300 shadow sticky top-0 z-50">
            <div className="max-w-6xl mx-auto py-3 flex items-center justify-between">
                {/* Logo */}
                <Link to="/" className="flex items-center gap-2 font-bold text-xl text-accent">
                    <img src="/logo.png" alt="Logo" className="h-8 w-8" />
                    FutureAid
                </Link>
                {/* Hamburger */}
                <button
                    className="md:hidden ml-auto  focus:outline-none"
                    onClick={handleMenuToggle}
                    aria-label="Toggle Menu"
                >
                    <svg className="h-7 w-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        {menuOpen ? (
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        ) : (
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8h16M4 16h16" />
                        )}
                    </svg>
                </button>
                {/* Nav Links */}
                <div className={`flex-col md:flex-row md:flex items-center gap-6 absolute md:static top-full left-0 w-full md:w-auto bg-white md:bg-transparent shadow md:shadow-none transition-all duration-200 z-40 ${menuOpen ? 'flex' : 'hidden md:flex'}`}>
                    <NavLink to="/" className={({ isActive }) => isActive ? 'text-accent-600 font-semibold py-2 md:py-0 block' : ' py-2 md:py-0 block'}>
                        Home
                    </NavLink>
                    <NavLink to="/scholarships" className={({ isActive }) => isActive ? 'text-accent-600 font-semibold py-2 md:py-0 block' : ' py-2 md:py-0 block'}>
                        All Scholarship
                    </NavLink>
                    {user && (
                        <>
                            {(!isAdmin && !isModerator) && (
                                <NavLink to="/dashboard/user" className={({ isActive }) => isActive ? 'text-accent-600 font-semibold py-2 md:py-0 block' : ' py-2 md:py-0 block'}>
                                    Dashboard
                                </NavLink>
                            )}
                            {isAdmin && (
                                <NavLink to="/dashboard/admin" className={({ isActive }) => isActive ? 'text-accent-600 font-semibold py-2 md:py-0 block' : ' py-2 md:py-0 block'}>
                                    Admin Dashboard
                                </NavLink>
                            )}
                            {isModerator && (
                                <NavLink to="/dashboard/moderator" className={({ isActive }) => isActive ? 'text-accent-600 font-semibold py-2 md:py-0 block' : ' py-2 md:py-0 block'}>
                                    Moderator Dashboard
                                </NavLink>
                            )}
                        </>
                    )}
                    {/* Auth Buttons */}
                    <div className="flex flex-col md:flex-row items-center gap-4 md:ml-4 w-full md:w-auto">
                        {user ? (
                            <>
                                <img
                                    src={user.photoURL || 'https://i.ibb.co/Y4T3L26b/user.png'}
                                    alt={user.displayName || 'User'}
                                    className="h-8 w-8 rounded-full object-cover border mb-2 md:mb-0"
                                />
                                <span className=" font-medium mb-2 md:mb-0">{user.displayName || user.email}</span>
                                <button
                                    onClick={handleLogout}
                                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition mb-2 md:mb-0"
                                >
                                    Logout
                                </button>
                            </>
                        ) : (
                            <NavLink
                                to="/login"
                                className={({ isActive }) => isActive ? 'bg-accent-600 text-white px-4 py-1.5 rounded' : 'bg-accent-100 text-accent-700 px-4 py-1.5 rounded'}
                            >
                                Login
                            </NavLink>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
