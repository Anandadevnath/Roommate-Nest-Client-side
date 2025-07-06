import React, { useEffect, useState, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';
import NavBar from './NavBar/NavBar';
import Swal from 'sweetalert2';
import Footer from './Footer/Footer';

const UpdateRoommatePost = () => {
    const { id } = useParams();
    const { user } = useContext(AuthContext);
    const [form, setForm] = useState({
        title: '',
        location: '',
        rent: '',
        roomType: '',
        lifestyle: '',
        description: '',
        contactInfo: '',
        availability: 'available',
        userEmail: '',
        userName: '',
    });
    const [loading, setLoading] = useState(true);
    const [updating, setUpdating] = useState(false);
    const [error, setError] = useState('');
    const [fieldErrors, setFieldErrors] = useState({});
    const [isFormChanged, setIsFormChanged] = useState(false);
    const [originalForm, setOriginalForm] = useState({});
    const [showSuccess, setShowSuccess] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        fetch(`https://server-side-70by.onrender.com/roommates/${id}`)
            .then(res => res.json())
            .then(data => {
                const formData = {
                    ...data,
                    lifestyle: Array.isArray(data.lifestyle) ? data.lifestyle.join(', ') : data.lifestyle,
                };
                setForm(formData);
                setOriginalForm(formData);
                setLoading(false);
            })
            .catch(() => setLoading(false));
    }, [id]);

    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.ctrlKey && e.key === 's') {
                e.preventDefault();
                if (isFormChanged && !updating) {
                    handleFormSubmit(e);
                }
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [isFormChanged, updating, form]);

    useEffect(() => {
        const handleBeforeUnload = (e) => {
            if (isFormChanged) {
                e.preventDefault();
                e.returnValue = '';
            }
        };

        window.addEventListener('beforeunload', handleBeforeUnload);
        return () => window.removeEventListener('beforeunload', handleBeforeUnload);
    }, [isFormChanged]);

    const handleFormChange = (e) => {
        const { name, value } = e.target;
        const newForm = { ...form, [name]: value };
        setForm(newForm);
        setIsFormChanged(JSON.stringify(newForm) !== JSON.stringify(originalForm));
        if (fieldErrors[name]) {
            setFieldErrors(prev => ({ ...prev, [name]: '' }));
        }

        validateField(name, value);
    };

    const validateField = (name, value) => {
        let error = '';

        switch (name) {
            case 'rent':
                if (value && (isNaN(value) || value < 0)) {
                    error = 'Rent must be a positive number';
                }
                break;
            case 'contactInfo':
                if (value && !(/\S+@\S+\.\S+/.test(value) || /^\d{10,}$/.test(value.replace(/\D/g, '')))) {
                    error = 'Enter a valid email or phone number';
                }
                break;
            case 'title':
                if (value && value.length < 5) {
                    error = 'Title must be at least 5 characters';
                }
                break;
            default:
                break;
        }

        if (error) {
            setFieldErrors(prev => ({ ...prev, [name]: error }));
        }
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        setUpdating(true);
        setError('');
        try {
            const res = await fetch(`https://server-side-70by.onrender.com/roommates/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    ...form,
                    lifestyle: form.lifestyle.split(',').map(s => s.trim()),
                }),
            });
            const data = await res.json();
            if (!res.ok) throw new Error(data.error || 'Failed to update post');

            setShowSuccess(true);
            setIsFormChanged(false);

            Swal.fire({
                icon: 'success',
                title: 'Success!',
                text: 'Roommate post updated successfully.',
                timer: 2000,
                showConfirmButton: false,
                background: 'rgba(17, 24, 39, 0.95)',
                color: '#fff',
            });

            setTimeout(() => {
                setShowSuccess(false);
                navigate('/mylist');
            }, 2000);
        } catch (err) {
            setError(err.message);
        }
        setUpdating(false);
    };

    const handleCancel = () => {
        if (isFormChanged) {
            Swal.fire({
                title: 'Unsaved Changes',
                text: 'You have unsaved changes. Are you sure you want to leave?',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#ef4444',
                cancelButtonColor: '#6b7280',
                confirmButtonText: 'Yes, leave',
                cancelButtonText: 'Stay',
                background: 'rgba(17, 24, 39, 0.95)',
                color: '#fff',
            }).then((result) => {
                if (result.isConfirmed) {
                    navigate('/mylist');
                }
            });
        } else {
            navigate('/mylist');
        }
    };

    if (loading) {
        return (
            <>
                <div className="min-h-screen bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#0f172a] flex items-center justify-center">
                    <div className="glass-card p-8 rounded-2xl">
                        <div className="flex items-center space-x-4">
                            <div className="animate-spin rounded-full h-8 w-8 border-4 border-purple-400 border-t-transparent"></div>
                            <span className="text-white text-lg font-medium">Loading update form...</span>
                        </div>
                    </div>
                </div>
            </>
        );
    }

    return (
        <>
            <NavBar />
            <div className="min-h-screen bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#0f172a] py-12 px-4 relative overflow-hidden">
                {/* Animated Background Elements */}
                <div className="absolute inset-0 overflow-hidden">
                    <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
                    <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
                    <div className="absolute top-40 left-40 w-80 h-80 bg-indigo-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>
                </div>

                <div className="relative z-10 max-w-2xl mx-auto">
                    {/* Header Section */}
                    <div className="text-center mb-8 mt-12">
                        <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                            Update Roommate Post
                        </h1>
                        <p className="text-gray-300 text-lg">Modify your listing to attract the perfect roommate</p>
                    </div>

                    {/* Main Form Card */}
                    <div className="glass-card rounded-3xl p-8 shadow-2xl border border-white/10 backdrop-blur-lg">
                        {error && (
                            <div className="mb-6 p-4 bg-red-500/20 border border-red-500/30 rounded-xl text-red-300 flex items-center space-x-2">
                                <svg className="w-5 h-5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                                </svg>
                                <span>{error}</span>
                            </div>
                        )}

                        <form onSubmit={handleFormSubmit} className="space-y-6">
                            {/* Form Grid */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {/* Title Field */}
                                <div className="md:col-span-2">
                                    <label className="block text-sm font-medium text-gray-300 mb-2">Post Title *</label>
                                    <div className="relative">
                                        <input
                                            name="title"
                                            value={form.title}
                                            onChange={handleFormChange}
                                            required
                                            className={`w-full px-4 py-3 bg-white/5 border rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:border-transparent transition-all duration-300 hover:border-gray-400/50 ${fieldErrors.title
                                                ? 'border-red-500/50 focus:ring-red-500'
                                                : 'border-gray-500/30 focus:ring-purple-500'
                                                }`}
                                            placeholder="Enter an attractive title for your listing"
                                        />
                                        <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                                            {fieldErrors.title ? (
                                                <svg className="w-5 h-5 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                </svg>
                                            ) : (
                                                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                                                </svg>
                                            )}
                                        </div>
                                    </div>
                                    {fieldErrors.title && (
                                        <p className="mt-1 text-sm text-red-400 flex items-center space-x-1">
                                            <svg className="w-4 h-4 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                                            </svg>
                                            <span>{fieldErrors.title}</span>
                                        </p>
                                    )}
                                </div>

                                {/* Location Field */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-2">Location *</label>
                                    <div className="relative">
                                        <input
                                            name="location"
                                            value={form.location}
                                            onChange={handleFormChange}
                                            required
                                            className="w-full px-4 py-3 bg-white/5 border border-gray-500/30 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 hover:border-gray-400/50"
                                            placeholder="City, State"
                                        />
                                        <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                                            <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                            </svg>
                                        </div>
                                    </div>
                                </div>

                                {/* Rent Field */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-2">Monthly Rent *</label>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 flex items-center pl-3">
                                            <span className="text-gray-400 text-lg">$</span>
                                        </div>
                                        <input
                                            name="rent"
                                            value={form.rent}
                                            onChange={handleFormChange}
                                            required
                                            type="number"
                                            className={`w-full pl-8 pr-4 py-3 bg-white/5 border rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:border-transparent transition-all duration-300 hover:border-gray-400/50 ${fieldErrors.rent
                                                ? 'border-red-500/50 focus:ring-red-500'
                                                : 'border-gray-500/30 focus:ring-purple-500'
                                                }`}
                                            placeholder="1200"
                                        />
                                    </div>
                                    {fieldErrors.rent && (
                                        <p className="mt-1 text-sm text-red-400 flex items-center space-x-1">
                                            <svg className="w-4 h-4 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                                            </svg>
                                            <span>{fieldErrors.rent}</span>
                                        </p>
                                    )}
                                </div>

                                {/* Room Type Field */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-2">Room Type *</label>
                                    <select
                                        name="roomType"
                                        value={form.roomType}
                                        onChange={handleFormChange}
                                        required
                                        className="w-full px-4 py-3 bg-white/5 border border-gray-500/30 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 hover:border-gray-400/50"
                                    >
                                        <option value="" className="bg-gray-800">Select Room Type</option>
                                        <option value="Single" className="bg-gray-800">Single Room</option>
                                        <option value="Shared" className="bg-gray-800">Shared Room</option>
                                        <option value="Master" className="bg-gray-800">Master Bedroom</option>
                                        <option value="Studio" className="bg-gray-800">Studio</option>
                                    </select>
                                </div>

                                {/* Availability Field */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-2">Availability Status</label>
                                    <select
                                        name="availability"
                                        value={form.availability}
                                        onChange={handleFormChange}
                                        className="w-full px-4 py-3 bg-white/5 border border-gray-500/30 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 hover:border-gray-400/50"
                                    >
                                        <option value="available" className="bg-gray-800">Available</option>
                                        <option value="not available" className="bg-gray-800">Not Available</option>
                                    </select>
                                </div>

                                {/* Lifestyle Field */}
                                <div className="md:col-span-2">
                                    <label className="block text-sm font-medium text-gray-300 mb-2">Lifestyle Preferences</label>
                                    <input
                                        name="lifestyle"
                                        value={form.lifestyle}
                                        onChange={handleFormChange}
                                        className="w-full px-4 py-3 bg-white/5 border border-gray-500/30 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 hover:border-gray-400/50"
                                        placeholder="e.g., Non-smoker, Pet-friendly, Quiet, Social (comma separated)"
                                    />
                                </div>

                                {/* Description Field */}
                                <div className="md:col-span-2">
                                    <label className="block text-sm font-medium text-gray-300 mb-2">Description *</label>
                                    <textarea
                                        name="description"
                                        value={form.description}
                                        onChange={handleFormChange}
                                        required
                                        rows={4}
                                        className="w-full px-4 py-3 bg-white/5 border border-gray-500/30 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 hover:border-gray-400/50 resize-none"
                                        placeholder="Describe your ideal roommate and living situation..."
                                    />
                                </div>

                                {/* Contact Info Field */}
                                <div className="md:col-span-2">
                                    <label className="block text-sm font-medium text-gray-300 mb-2">Contact Information *</label>
                                    <div className="relative">
                                        <input
                                            name="contactInfo"
                                            value={form.contactInfo}
                                            onChange={handleFormChange}
                                            required
                                            className={`w-full px-4 py-3 bg-white/5 border rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:border-transparent transition-all duration-300 hover:border-gray-400/50 ${fieldErrors.contactInfo
                                                ? 'border-red-500/50 focus:ring-red-500'
                                                : 'border-gray-500/30 focus:ring-purple-500'
                                                }`}
                                            placeholder="Phone number or email for contact"
                                        />
                                        <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                                            {fieldErrors.contactInfo ? (
                                                <svg className="w-5 h-5 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                </svg>
                                            ) : (
                                                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                                </svg>
                                            )}
                                        </div>
                                    </div>
                                    {fieldErrors.contactInfo && (
                                        <p className="mt-1 text-sm text-red-400 flex items-center space-x-1">
                                            <svg className="w-4 h-4 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                                            </svg>
                                            <span>{fieldErrors.contactInfo}</span>
                                        </p>
                                    )}
                                </div>

                                {/* Read-only Fields */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-2">User Email</label>
                                    <input
                                        name="userEmail"
                                        value={form.userEmail}
                                        readOnly
                                        className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600/50 rounded-xl text-gray-300 cursor-not-allowed"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-2">User Name</label>
                                    <input
                                        name="userName"
                                        value={form.userName}
                                        readOnly
                                        className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600/50 rounded-xl text-gray-300 cursor-not-allowed"
                                    />
                                </div>
                            </div>

                            {/* Action Buttons */}
                            <div className="flex flex-col sm:flex-row gap-4 pt-6">
                                <button
                                    type="button"
                                    onClick={handleCancel}
                                    className="flex-1 px-6 py-3 bg-gray-600/30 text-gray-300 rounded-xl border border-gray-500/30 hover:bg-gray-600/50 transition-all duration-300 font-medium hover:transform hover:scale-105"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    disabled={updating || !isFormChanged}
                                    className={`flex-1 px-6 py-3 rounded-xl transition-all duration-300 font-medium flex items-center justify-center space-x-2 hover:transform hover:scale-105 ${updating || !isFormChanged
                                        ? 'bg-gray-600/50 text-gray-400 cursor-not-allowed'
                                        : 'bg-gradient-to-r from-purple-600 to-blue-600 text-white hover:from-purple-700 hover:to-blue-700 shadow-lg hover:shadow-purple-500/25'
                                        }`}
                                >
                                    {updating ? (
                                        <>
                                            <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
                                            <span>Updating...</span>
                                        </>
                                    ) : isFormChanged ? (
                                        <>
                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                                            </svg>
                                            <span>Update Listing</span>
                                        </>
                                    ) : (
                                        <>
                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                            </svg>
                                            <span>No Changes</span>
                                        </>
                                    )}
                                </button>
                            </div>
                        </form>
                    </div>

                    {/* Info Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
                        <div className="glass-card p-4 rounded-xl border border-white/10">
                            <div className="flex items-center space-x-3">
                                <div className="w-10 h-10 bg-green-500/20 rounded-full flex items-center justify-center">
                                    <svg className="w-5 h-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                </div>
                                <div>
                                    <h3 className="text-white font-medium">Quick Update</h3>
                                    <p className="text-gray-400 text-sm">Changes are saved instantly</p>
                                </div>
                            </div>
                        </div>

                        <div className="glass-card p-4 rounded-xl border border-white/10">
                            <div className="flex items-center space-x-3">
                                <div className="w-10 h-10 bg-blue-500/20 rounded-full flex items-center justify-center">
                                    <svg className="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                                    </svg>
                                </div>
                                <div>
                                    <h3 className="text-white font-medium">Boost Visibility</h3>
                                    <p className="text-gray-400 text-sm">Complete all fields for better reach</p>
                                </div>
                            </div>
                        </div>

                        <div className="glass-card p-4 rounded-xl border border-white/10">
                            <div className="flex items-center space-x-3">
                                <div className="w-10 h-10 bg-purple-500/20 rounded-full flex items-center justify-center">
                                    <svg className="w-5 h-5 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zM21 5a2 2 0 00-2-2h-4a2 2 0 00-2 2v12a4 4 0 004 4h4a2 2 0 002-2V5z" />
                                    </svg>
                                </div>
                                <div>
                                    <h3 className="text-white font-medium">Quick Save</h3>
                                    <p className="text-gray-400 text-sm">Press Ctrl+S to save quickly</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Floating Save Indicator */}
                {isFormChanged && (
                    <div className="fixed bottom-6 right-6 z-50">
                        <div className="glass-card px-4 py-2 rounded-full border border-orange-500/30 bg-orange-500/10 backdrop-blur-lg animate-pulse">
                            <div className="flex items-center space-x-2 text-orange-300">
                                <div className="w-2 h-2 bg-orange-400 rounded-full animate-ping"></div>
                                <span className="text-sm font-medium">Unsaved changes</span>
                            </div>
                        </div>
                    </div>
                )}

                {/* Success Overlay */}
                {showSuccess && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
                        <div className="glass-card p-8 rounded-3xl text-center animate-bounce">
                            <div className="w-20 h-20 bg-green-500/20 rounded-full mx-auto mb-4 flex items-center justify-center">
                                <svg className="w-10 h-10 text-green-400 animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>
                            <h3 className="text-2xl font-bold text-white mb-2">Updated Successfully!</h3>
                            <p className="text-gray-300">Redirecting you back to your listings...</p>
                        </div>
                    </div>
                )}
            </div>
            <Footer />
        </>
    );
};

export default UpdateRoommatePost;