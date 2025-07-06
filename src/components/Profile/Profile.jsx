import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../contexts/AuthContext';
import { updateProfile } from 'firebase/auth';
import { auth } from '../../firebase.init';
import NavBar from '../NavBar/NavBar';
import Footer from '../Footer/Footer';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Profile = () => {
    const { user } = useContext(AuthContext);
    const [name, setName] = useState(user?.displayName || '');
    const [photoURL, setPhotoURL] = useState(user?.photoURL || '');
    const [successMessage, setSuccessMessage] = useState('');

    useEffect(() => {
        setName(user?.displayName || '');
        setPhotoURL(user?.photoURL || '');
    }, [user]);

    const handleUpdateProfile = async (e) => {
        e.preventDefault();
        try {
            const currentUser = auth.currentUser;
            if (currentUser) {
                await updateProfile(currentUser, {
                    displayName: name,
                    photoURL,
                });
                setSuccessMessage('Profile updated successfully!');
                toast.success('Profile updated successfully!'); // Trigger toast notification
            }
        } catch (error) {
            console.error('Error updating profile:', error);
            toast.error('Failed to update profile. Please try again.'); // Trigger error toast
        }
    };

    return (
        <>
            <NavBar />
            <div className="container mx-auto px-4 py-10 mt-8 text-black">
                <div className="bg-white shadow-lg rounded-lg p-8 max-w-md mx-auto">
                    <h1 className="text-2xl font-bold mb-4 text-center">My Profile</h1>
                    <div className="text-center mb-6">
                        <img
                            src={photoURL || 'https://via.placeholder.com/150'}
                            alt="Profile"
                            className="w-24 h-24 rounded-full mx-auto mb-4"
                        />
                        <p className="text-gray-800 font-semibold">{user?.email}</p>
                    </div>
                    <form onSubmit={handleUpdateProfile} className="space-y-4">
                        <div>
                            <label htmlFor="name" className="block text-gray-600 mb-1">Name</label>
                            <input
                                type="text"
                                id="name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                        <div>
                            <label htmlFor="photoURL" className="block text-gray-600 mb-1">Photo URL</label>
                            <input
                                type="text"
                                id="photoURL"
                                value={photoURL}
                                onChange={(e) => setPhotoURL(e.target.value)}
                                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                        <button
                            type="submit"
                            className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
                        >
                            Save Changes
                        </button>
                    </form>
                    {successMessage && (
                        <p className="text-green-500 mt-4 text-center">{successMessage}</p>
                    )}
                </div>
            </div>
            <Footer />
            <ToastContainer /> {/* Add ToastContainer here */}
        </>
    );
};

export default Profile;