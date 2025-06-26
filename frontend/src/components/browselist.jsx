import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import NavBar from './NavBar/NavBar';

function BrowseList() {
    const [roommates, setRoommates] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState('');
    const [city, setCity] = useState('');
    const [maxRent, setMaxRent] = useState('');
    const [roomType, setRoomType] = useState('Any Type');
    const [availability, setAvailability] = useState('All Listings');
    const [sort, setSort] = useState('Newest First');
    const navigate = useNavigate();

    useEffect(() => {
        fetch('http://localhost:5000/roommates')
            .then(res => res.json())
            .then(data => {
                setRoommates(data);
                setLoading(false);
            })
            .catch(() => setLoading(false));
    }, []);

    // Filter and sort logic
    const filteredRoommates = roommates
        .filter(r => {
            const matchesSearch =
                search === '' ||
                r.title?.toLowerCase().includes(search.toLowerCase()) ||
                r.location?.toLowerCase().includes(search.toLowerCase()) ||
                r.userName?.toLowerCase().includes(search.toLowerCase()) ||
                r.userEmail?.toLowerCase().includes(search.toLowerCase());
            const matchesCity =
                city === '' ||
                r.location?.toLowerCase().includes(city.toLowerCase());
            const matchesRent =
                maxRent === '' ||
                Number(r.rent) <= Number(maxRent);
            const matchesRoomType =
                roomType === 'Any Type' ||
                r.roomType === roomType;
            const matchesAvailability =
                availability === 'All Listings' ||
                (availability === 'Available Only' && r.availability === 'available');
            return matchesSearch && matchesCity && matchesRent && matchesRoomType && matchesAvailability;
        })
        .sort((a, b) => {
            if (sort === 'Newest First') {
                return new Date(b.createdAt) - new Date(a.createdAt);
            }
            if (sort === 'Oldest First') {
                return new Date(a.createdAt) - new Date(b.createdAt);
            }
            if (sort === 'Lowest Rent') {
                return Number(a.rent) - Number(b.rent);
            }
            if (sort === 'Highest Rent') {
                return Number(b.rent) - Number(a.rent);
            }
            return 0;
        });

    return (
        <>
            <NavBar />
            <div className="bg-[#0f172a] browseheading min-h-screen text-white px-2 sm:px-4 md:px-8 py-10 mt-12">
                <h2 className="text-3xl font-bold mb-6">Browse Roommate Listings</h2>

                {/* Search and Filter Section */}
                <div className="bg-[#1e293b] p-4 sm:p-6 rounded-lg mb-6">
                    <div className="grid grid-cols-1 md:grid-cols-5 gap-4 items-center">
                        <input
                            type="text"
                            placeholder="Search by keyword, location, or username"
                            value={search}
                            onChange={e => setSearch(e.target.value)}
                            className="col-span-1 md:col-span-2 px-3 py-2 rounded-md bg-[#334155] text-white placeholder-gray-400 focus:outline-none"
                        />
                        <input
                            type="text"
                            placeholder="City, State"
                            value={city}
                            onChange={e => setCity(e.target.value)}
                            className="px-3 py-2 rounded-md bg-[#334155] text-white placeholder-gray-400 focus:outline-none"
                        />
                        <input
                            type="number"
                            placeholder="Max Rent"
                            value={maxRent}
                            onChange={e => setMaxRent(e.target.value)}
                            className="px-3 py-2 rounded-md bg-[#334155] text-white placeholder-gray-400 focus:outline-none"
                        />
                        <button className="bg-sky-500 hover:bg-sky-600 text-white px-4 py-2 rounded-md hidden md:block" disabled>
                            Search
                        </button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                        <select
                            value={roomType}
                            onChange={e => setRoomType(e.target.value)}
                            className="px-3 py-2 rounded-md bg-[#334155] text-white focus:outline-none"
                        >
                            <option>Any Type</option>
                            <option>Private Room</option>
                            <option>Shared Room</option>
                        </select>
                        <select
                            value={availability}
                            onChange={e => setAvailability(e.target.value)}
                            className="px-3 py-2 rounded-md bg-[#334155] text-white focus:outline-none"
                        >
                            <option>All Listings</option>
                            <option>Available Only</option>
                        </select>
                        <select
                            value={sort}
                            onChange={e => setSort(e.target.value)}
                            className="px-3 py-2 rounded-md bg-[#334155] text-white focus:outline-none"
                        >
                            <option>Newest First</option>
                            <option>Oldest First</option>
                            <option>Lowest Rent</option>
                            <option>Highest Rent</option>
                        </select>
                    </div>
                </div>

                {/* Listings Table for desktop, Cards for mobile */}
                {loading ? (
                    <div className="text-center text-gray-400">Loading...</div>
                ) : (
                    <>
                        {/* Desktop Table */}
                        <div className="hidden md:block overflow-x-auto bg-[#1e293b] rounded-lg shadow">
                            <table className="min-w-full divide-y divide-gray-700">
                                <thead>
                                    <tr className="text-left text-sm text-gray-500 uppercase">
                                        <th className="px-4 py-3">Listing</th>
                                        <th className="px-4 py-3">Room Type</th>
                                        <th className="px-4 py-3">Price</th>
                                        <th className="px-4 py-3">Posted By</th>
                                        <th className="px-4 py-3">Date Posted</th>
                                        <th className="px-4 py-3">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-700">
                                    {filteredRoommates.map((roommate) => (
                                        <tr key={roommate._id} className="hover:bg-[#334155]">
                                            <td className="px-4 py-3">
                                                <div className="font-semibold text-white">{roommate.title}</div>
                                                <div className="text-sm text-gray-500">{roommate.location}</div>
                                            </td>
                                            <td className="px-4 py-3">{roommate.roomType}</td>
                                            <td className="px-4 py-3">${roommate.rent}/month</td>
                                            <td className="px-4 py-3">{roommate.userName || roommate.userEmail}</td>
                                            <td className="px-4 py-3">{new Date(roommate.createdAt).toLocaleDateString()}</td>
                                            <td className="px-4 py-3">
                                                <button
                                                    className="px-3 py-1 border border-sky-500 text-sky-500 hover:bg-sky-500 hover:text-white rounded-md text-sm"
                                                    onClick={() => navigate(`/details/${roommate._id}`)}
                                                >
                                                    See more
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                            {filteredRoommates.length === 0 && (
                                <div className="text-center text-gray-400 py-8">No listings found.</div>
                            )}
                        </div>

                        {/* Mobile Cards */}
                        <div className="md:hidden flex flex-col gap-4">
                            {filteredRoommates.length === 0 && (
                                <div className="text-center text-gray-400 py-8">No listings found.</div>
                            )}
                            {filteredRoommates.map((roommate) => (
                                <div key={roommate._id} className="bg-[#1e293b] rounded-lg shadow p-4 flex flex-col gap-2">
                                    <div className="flex justify-between items-center">
                                        <div>
                                            <div className="font-semibold text-lg text-white">{roommate.title}</div>
                                            <div className="text-sm text-gray-400">{roommate.location}</div>
                                        </div>
                                        <span className="text-xs bg-blue-600 text-white px-2 py-1 rounded">{roommate.roomType}</span>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <div className="text-blue-400 font-bold">${roommate.rent}/month</div>
                                        <div className="text-xs text-gray-400">{new Date(roommate.createdAt).toLocaleDateString()}</div>
                                    </div>
                                    <div className="text-sm text-gray-300">Posted by: {roommate.userName || roommate.userEmail}</div>
                                    <button
                                        className="mt-2 px-3 py-2 border border-sky-500 text-sky-500 hover:bg-sky-500 hover:text-white rounded-md text-sm w-full"
                                        onClick={() => navigate(`/details/${roommate._id}`)}
                                    >
                                        See more
                                    </button>
                                </div>
                            ))}
                        </div>
                    </>
                )}
            </div>
        </>
    );
}

export default BrowseList;