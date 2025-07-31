import React from 'react';
import { Link } from 'react-router';
import { FaArrowLeft } from 'react-icons/fa';

const NotFound = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-base-200 text-center px-4">
      <h1 className="text-8xl font-bold text-error mb-4">404</h1>
      <h2 className="text-3xl font-semibold mb-2 text-base-content">Page Not Found</h2>
      <p className="text-base-content mb-6 max-w-md">
        Sorry, the page you are looking for doesn't exist or has been moved.
      </p>
      <Link to="/" className="btn btn-primary gap-2">
        <FaArrowLeft /> Go Home
      </Link>
    </div>
  );
};

export default NotFound;
