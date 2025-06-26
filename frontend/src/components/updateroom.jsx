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
    const navigate = useNavigate();

    useEffect(() => {
        fetch(`http://localhost:5000/roommates/${id}`)
            .then(res => res.json())
            .then(data => {
                setForm({
                    ...data,
                    lifestyle: Array.isArray(data.lifestyle) ? data.lifestyle.join(', ') : data.lifestyle,
                });
                setLoading(false);
            })
            .catch(() => setLoading(false));
    }, [id]);

    const handleFormChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        setUpdating(true);
        setError('');
        try {
            const res = await fetch(`http://localhost:5000/roommates/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    ...form,
                    lifestyle: form.lifestyle.split(',').map(s => s.trim()),
                }),
            });
            const data = await res.json();
            if (!res.ok) throw new Error(data.error || 'Failed to update post');
            Swal.fire({
                icon: 'success',
                title: 'Success!',
                text: 'Roommate post updated successfully.',
                timer: 2000,
                showConfirmButton: false,
            });
            setTimeout(() => navigate('/mylist'), 2000);
        } catch (err) {
            setError(err.message);
        }
        setUpdating(false);
    };

    if (loading) return <div className="text-center mt-20">Loading...</div>;

    return (
        <>
            <NavBar />
            <div className="flex justify-center items-center min-h-screen bg-[#0f172a] update mt-10 lg:-mb-12">
                <form onSubmit={handleFormSubmit} className="bg-[#334155] shadow-lg rounded-lg p-6 w-full max-w-xl">
                    <h2 className="text-2xl font-bold mb-4 text-white">Update Roommate Post</h2>
                    {error && <div className="text-red-600 mb-2">{error}</div>}
                    <div className="grid grid-cols-1 gap-4">
                        <input name="title" value={form.title} onChange={handleFormChange} required className="input input-bordered" placeholder="Title" />
                        <input name="location" value={form.location} onChange={handleFormChange} required className="input input-bordered" placeholder="Location" />
                        <input name="rent" value={form.rent} onChange={handleFormChange} required className="input input-bordered" placeholder="Rent" type="number" />
                        <input name="roomType" value={form.roomType} onChange={handleFormChange} required className="input input-bordered" placeholder="Room Type (Single, Shared, etc.)" />
                        <input name="lifestyle" value={form.lifestyle} onChange={handleFormChange} className="input input-bordered" placeholder="Lifestyle Preferences (comma separated)" />
                        <textarea name="description" value={form.description} onChange={handleFormChange} required className="textarea textarea-bordered" placeholder="Description" />
                        <input name="contactInfo" value={form.contactInfo} onChange={handleFormChange} required className="input input-bordered" placeholder="Contact Info" />
                        <select name="availability" value={form.availability} onChange={handleFormChange} className="input input-bordered">
                            <option value="available">Available</option>
                            <option value="not available">Not Available</option>
                        </select>
                        <input name="userEmail" value={form.userEmail} readOnly className="input input-bordered text-black bg-gray-100 cursor-not-allowed" placeholder="User Email" />
                        <input name="userName" value={form.userName} readOnly className="input input-bordered bg-gray-100 text-black cursor-not-allowed" placeholder="User Name" />
                    </div>
                    <button type="submit" className="btn btn-primary mt-4" disabled={updating}>
                        {updating ? 'Updating...' : 'Update'}
                    </button>
                </form>
            </div>
            <Footer />
        </>
    );
};

export default UpdateRoommatePost;