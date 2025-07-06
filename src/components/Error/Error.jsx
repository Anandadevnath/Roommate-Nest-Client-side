import React from 'react';
import { Link } from 'react-router-dom';

function Error() {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-gray-800">
            <img
                src="https://i.postimg.cc/Gm3XDx98/Screenshot-2025-05-08-170252.png"
                alt="404 Error"
                className="w-full max-w-md mb-8"
            />
            <h1 className="text-3xl font-bold mb-4">Oops! Page Not Found</h1>
            <p className="text-gray-600 mb-6 text-center">
                The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
            </p>
            <Link
                to="/"
                className="bg-teal-600 text-white px-6 py-3 rounded-md hover:bg-teal-700 transition"
            >
                Go to Home
            </Link>
        </div>
    );
}

export default Error;