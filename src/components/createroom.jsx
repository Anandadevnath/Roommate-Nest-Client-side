import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import NavBar from './NavBar/NavBar';
import { AuthContext } from '../contexts/AuthContext';
import Swal from 'sweetalert2';
import Footer from './Footer/Footer';

const CreateRoommatePost = () => {
    const { user } = useContext(AuthContext);
    const [form, setForm] = useState({
        title: '',
        location: '',
        rent: '',
        roomType: '',
        lifestyle: [],
        description: '',
        contactInfo: '',
        availability: 'available',
        userEmail: user?.email || '',
        userName: user?.displayName || '',
    });
    const [posting, setPosting] = useState(false);
    const [postError, setPostError] = useState('');
    const navigate = useNavigate();

    const handleFormChange = (e) => {
        const { name, value, type, checked } = e.target;
        if (type === 'checkbox') {
            setForm((prevForm) => {
                const updatedLifestyle = checked
                    ? [...prevForm.lifestyle, value]
                    : prevForm.lifestyle.filter((pref) => pref !== value);
                return { ...prevForm, lifestyle: updatedLifestyle };
            });
        } else {
            setForm({ ...form, [name]: value });
        }
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        setPosting(true);
        setPostError('');
        try {
            const res = await fetch('https://server-side-70by.onrender.com/roommates', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(form),
            });
            const data = await res.json();
            if (!res.ok) throw new Error(data.error || 'Failed to create post');
            setForm({
                title: '',
                location: '',
                rent: '',
                roomType: '',
                lifestyle: [],
                description: '',
                contactInfo: '',
                availability: 'available',
                userEmail: user?.email || '',
                userName: user?.displayName || '',
            });
            Swal.fire({
                icon: 'success',
                title: 'Success!',
                text: 'Roommate post created successfully.',
                timer: 2000,
                showConfirmButton: false,
            });
            setTimeout(() => navigate('/'), 2000);
        } catch (err) {
            setPostError(err.message);
        }
        setPosting(false);
    };

    const lifestyleOptions = [
        'Non-smoker', 'Vegetarian', 'Pet-friendly', 'Night Owl',
        'Early Bird', 'Quiet', 'Social', 'Student', 'Professional',
    ];

    return (
        <>
            <NavBar />
            <div className="flex justify-center items-center min-h-screen bg-gray-900 createrheader lg:mt-12 mt-16">
                <form onSubmit={handleFormSubmit} className="bg-[#111827] createtitle text-white shadow-lg rounded-xl p-8 w-full max-w-2xl">
                    <h2 className="text-2xl font-bold mb-6 createsection">Add Roommate Listing</h2>
                    {postError && <div className="text-red-400 mb-4">{postError}</div>}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <input name="title" value={form.title} onChange={handleFormChange} required className="bg-gray-800 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="e.g., Looking for a roommate in NYC" />
                        <input name="location" value={form.location} onChange={handleFormChange} required className="bg-gray-800 p-3 rounded-md" placeholder="e.g., Manhattan, New York" />
                        <input name="rent" value={form.rent} onChange={handleFormChange} required type="number" className="bg-gray-800 p-3 rounded-md" placeholder="e.g., 1200" />
                        <select name="roomType" value={form.roomType} onChange={handleFormChange} required className="bg-gray-800 p-3 rounded-md">
                            <option value="">Select a room type</option>
                            <option value="Single">Single</option>
                            <option value="Shared">Shared</option>
                        </select>
                        <input name="contactInfo" value={form.contactInfo} onChange={handleFormChange} required className="bg-gray-800 p-3 rounded-md" placeholder="e.g., (123) 456-7890" />
                        <select name="availability" value={form.availability} onChange={handleFormChange} className="bg-gray-800 p-3 rounded-md">
                            <option value="available">Available</option>
                            <option value="not available">Not Available</option>
                        </select>
                    </div>

                    <div className="mt-6">
                        <label className="block mb-2 font-semibold createsmall">Lifestyle Preferences</label>
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                            {lifestyleOptions.map((option) => (
                                <label key={option} className="flex items-center space-x-2 createop">
                                    <input
                                        type="checkbox"
                                        name="lifestyle"
                                        value={option}
                                        checked={form.lifestyle.includes(option)}
                                        onChange={handleFormChange}
                                        className="accent-blue-500"
                                    />
                                    <span>{option}</span>
                                </label>
                            ))}
                        </div>
                    </div>

                    <div className="mt-6">
                        <textarea
                            name="description"
                            value={form.description}
                            onChange={handleFormChange}
                            required
                            rows="4"
                            className="bg-gray-800 w-full p-3 rounded-md resize-none"
                            placeholder="Describe the room and what you're looking for in a roommate..."
                        ></textarea>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
                        <input name="userName" value={form.userName} readOnly className="bg-gray-700 text-white p-3 rounded-md cursor-not-allowed" placeholder="Your Name" />
                        <input name="userEmail" value={form.userEmail} readOnly className="bg-gray-700 text-white p-3 rounded-md cursor-not-allowed" placeholder="Your Email" />
                    </div>

                    <button type="submit" className="w-full bg-blue-500 hover:bg-blue-600 text-white py-3 mt-6 rounded-md transition duration-200" disabled={posting}>
                        {posting ? 'Posting...' : 'Add Listing'}
                    </button>
                </form>
            </div>
            <Footer />
        </>
    );
};

export default CreateRoommatePost;
