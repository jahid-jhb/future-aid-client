import React from 'react';
import { Link } from 'react-router';

const Footer = () => (
    <footer className="border-t-2 border-accent mt-12">
        <div className="max-w-6xl mx-auto px-4 py-8 flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-2">
                <img src="/logo.png" alt="FutureAid Logo" className="h-8 w-8" />
                <span className="font-bold text-lg">FutureAid</span>
            </div>
            <div className="flex gap-6">
                <Link to="/" className="hover:text-accent-400 transition">Home</Link>
                <Link to="/scholarships" className="hover:text-accent-400 transition">All Scholarships</Link>
                <Link to="/dashboard/user" className="hover:text-accent-400 transition">Dashboard</Link>
            </div>
            <div className="text-sm text-gray-400">
                &copy; {new Date().getFullYear()} FutureAid. All rights reserved.
            </div>
        </div>
    </footer>
);

export default Footer;
