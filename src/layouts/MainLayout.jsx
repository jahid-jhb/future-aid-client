import React from 'react';
import { Outlet } from 'react-router';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const MainLayout = () => {
    return (
        <>
            <Navbar />
            <main className="min-h-[70vh]">
                <Outlet />
            </main>
            <Footer />
        </>
    );
};

export default MainLayout;
