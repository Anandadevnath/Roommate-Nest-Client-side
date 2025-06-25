import React, { useState } from 'react';
import { sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '../../firebase.init';
import NavBar from '../NavBar/NavBar';
import Footer from '../Footer/Footer';

const ForgotPassword = () => {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');

    const handleResetPassword = async () => {
        try {
            await sendPasswordResetEmail(auth, email);
            setMessage('Password reset email sent! Check your inbox.');
        } catch (error) {
            console.error('Error sending reset email:', error);
            setMessage('Failed to send reset email. Please try again.');
        }
    };

    return (
        <>
            {/* NavBar */}
            <NavBar />

            {/* Main Content */}
            <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-black">
                <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
                    <h1 className="text-2xl font-bold mb-4 text-center">Reset Password</h1>
                    <div>
                        <label htmlFor="email" className="block text-gray-600 mb-1">Email</label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                            required
                        />
                    </div>
                    <button
                        onClick={handleResetPassword}
                        className="w-full bg-teal-600 text-white py-2 rounded-md hover:bg-teal-700 transition mt-4"
                    >
                        Reset Password
                    </button>
                    {message && <p className="text-green-500 mt-4 text-center">{message}</p>}
                </div>
            </div>

            {/* Footer */}
            <Footer />
        </>
    );
};

export default ForgotPassword;