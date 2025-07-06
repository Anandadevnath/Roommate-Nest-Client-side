import React, { useEffect, useState, useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext'; 
import { useNavigate } from 'react-router-dom';
import NavBar from './NavBar/NavBar';
import Footer from './Footer/Footer';
import Swal from 'sweetalert2';

function MyList() {
  const { user } = useContext(AuthContext);
  const [myListings, setMyListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState('cards'); // 'cards' or 'table'
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('newest'); // 'newest', 'oldest', 'rent-low', 'rent-high'
  const navigate = useNavigate();

  useEffect(() => {
    if (!user?.email) return;
    fetch(`https://server-side-70by.onrender.com/my-listings?email=${user.email}`)
      .then(res => res.json())
      .then(data => {
        setMyListings(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [user]);

  // Filter and sort listings
  const filteredAndSortedListings = myListings
    .filter(item => 
      item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.roomType.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      switch (sortBy) {
        case 'oldest':
          return new Date(a.createdAt) - new Date(b.createdAt);
        case 'rent-low':
          return a.rent - b.rent;
        case 'rent-high':
          return b.rent - a.rent;
        case 'newest':
        default:
          return new Date(b.createdAt) - new Date(a.createdAt);
      }
    });

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: 'Delete Listing?',
      text: "This action cannot be undone!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#ef4444',
      cancelButtonColor: '#6b7280',
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'Cancel',
      background: 'rgba(17, 24, 39, 0.95)',
      color: '#fff',
      backdrop: 'rgba(0, 0, 0, 0.8)',
      customClass: {
        popup: 'backdrop-blur-sm'
      }
    });
    
    if (result.isConfirmed) {
      const res = await fetch(`https://server-side-70by.onrender.com/roommates/${id}`, { method: 'DELETE' });
      if (res.ok) {
        setMyListings(myListings.filter(item => item._id !== id));
        Swal.fire({
          title: 'Deleted!',
          text: 'Your listing has been deleted successfully.',
          icon: 'success',
          background: 'rgba(17, 24, 39, 0.95)',
          color: '#fff',
          timer: 2000,
          showConfirmButton: false,
          customClass: {
            popup: 'backdrop-blur-sm'
          }
        });
      }
    }
  };

  const handleUpdate = (id) => {
    navigate(`/update/${id}`);
  };

  if (loading) {
    return (
      <>
        <div className="min-h-screen bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#0f172a] flex items-center justify-center">
          <div className="glass-card p-8 rounded-2xl">
            <div className="flex items-center space-x-4">
              <div className="animate-spin rounded-full h-8 w-8 border-4 border-purple-400 border-t-transparent"></div>
              <span className="text-white text-lg font-medium">Loading your listings...</span>
            </div>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <NavBar />
      <div className="min-h-screen bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#0f172a]  py-12 px-4 relative overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
          <div className="absolute top-40 left-40 w-80 h-80 bg-indigo-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto">
          {/* Header Section */}
          <div className="text-center mb-12 mt-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
              My Roommate Listings
            </h1>
            <p className="text-gray-300 text-lg max-w-2xl mx-auto">
              Manage your listings, track performance, and connect with potential roommates
            </p>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="glass-card p-6 rounded-2xl border border-white/10">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-green-500/20 rounded-full flex items-center justify-center">
                  <svg className="w-6 h-6 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-white">{myListings.length}</h3>
                  <p className="text-gray-400">Total Listings</p>
                </div>
              </div>
            </div>

            <div className="glass-card p-6 rounded-2xl border border-white/10">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-blue-500/20 rounded-full flex items-center justify-center">
                  <svg className="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-white">{myListings.filter(item => item.availability === 'available').length}</h3>
                  <p className="text-gray-400">Available</p>
                </div>
              </div>
            </div>

            <div className="glass-card p-6 rounded-2xl border border-white/10">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-purple-500/20 rounded-full flex items-center justify-center">
                  <svg className="w-6 h-6 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-white">
                    ${myListings.length > 0 ? Math.round(myListings.reduce((sum, item) => sum + item.rent, 0) / myListings.length) : 0}
                  </h3>
                  <p className="text-gray-400">Avg. Rent</p>
                </div>
              </div>
            </div>
          </div>

          {/* Controls Section */}
          <div className="glass-card p-6 rounded-2xl border border-white/10 mb-8">
            <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
              {/* Search */}
              <div className="relative flex-1 max-w-md">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3">
                  <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
                <input
                  type="text"
                  placeholder="Search listings..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-white/5 border border-gray-500/30 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300"
                />
              </div>

              {/* Sort and View Controls */}
              <div className="flex gap-4 items-center">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="px-4 py-3 bg-white/5 border border-gray-500/30 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300"
                >
                  <option value="newest" className="bg-gray-800">Newest First</option>
                  <option value="oldest" className="bg-gray-800">Oldest First</option>
                  <option value="rent-low" className="bg-gray-800">Rent: Low to High</option>
                  <option value="rent-high" className="bg-gray-800">Rent: High to Low</option>
                </select>

                <div className="flex bg-white/5 rounded-xl border border-gray-500/30 overflow-hidden">
                  <button
                    onClick={() => setViewMode('cards')}
                    className={`px-4 py-3 transition-all duration-300 ${
                      viewMode === 'cards' 
                        ? 'bg-purple-600 text-white' 
                        : 'text-gray-400 hover:text-white hover:bg-white/10'
                    }`}
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                    </svg>
                  </button>
                  <button
                    onClick={() => setViewMode('table')}
                    className={`px-4 py-3 transition-all duration-300 ${
                      viewMode === 'table' 
                        ? 'bg-purple-600 text-white' 
                        : 'text-gray-400 hover:text-white hover:bg-white/10'
                    }`}
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
          {/* Content Section */}
          {filteredAndSortedListings.length === 0 ? (
            <div className="glass-card p-12 rounded-2xl border border-white/10 text-center">
              <div className="w-20 h-20 bg-gray-500/20 rounded-full mx-auto mb-6 flex items-center justify-center">
                <svg className="w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">
                {searchTerm ? 'No listings match your search' : 'No listings found'}
              </h3>
              <p className="text-gray-400 mb-6">
                {searchTerm 
                  ? 'Try adjusting your search terms or filters' 
                  : 'Create your first roommate listing to get started'
                }
              </p>
              {!searchTerm && (
                <button
                  onClick={() => navigate('/create-room')}
                  className="px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-xl hover:from-purple-700 hover:to-blue-700 transition-all duration-300 font-medium hover:transform hover:scale-105"
                >
                  Create Your First Listing
                </button>
              )}
            </div>
          ) : (
            <>
              {/* Cards View */}
              {viewMode === 'cards' && (
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                  {filteredAndSortedListings.map((item) => (
                    <div key={item._id} className="glass-card p-6 rounded-2xl border border-white/10 hover:transform hover:scale-105 transition-all duration-300 card-hover">
                      {/* Card Header */}
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex-1">
                          <h3 className="text-xl font-bold text-white mb-2 line-clamp-2">{item.title}</h3>
                          <div className="flex items-center text-gray-400 mb-2">
                            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                            <span className="text-sm">{item.location}</span>
                          </div>
                        </div>
                        <div className={`px-3 py-1 rounded-full text-xs font-medium ${
                          item.availability === 'available' 
                            ? 'bg-green-500/20 text-green-400 border border-green-500/30' 
                            : 'bg-red-500/20 text-red-400 border border-red-500/30'
                        }`}>
                          {item.availability}
                        </div>
                      </div>

                      {/* Card Content */}
                      <div className="space-y-3 mb-6">
                        <div className="flex items-center justify-between">
                          <span className="text-gray-400 text-sm">Monthly Rent</span>
                          <span className="text-2xl font-bold text-purple-400">${item.rent}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-gray-400 text-sm">Room Type</span>
                          <span className="text-white font-medium">{item.roomType}</span>
                        </div>
                        {item.lifestyle && (
                          <div className="flex flex-wrap gap-1">
                            {(Array.isArray(item.lifestyle) ? item.lifestyle : item.lifestyle.split(',')).slice(0, 3).map((lifestyle, idx) => (
                              <span key={idx} className="px-2 py-1 bg-blue-500/20 text-blue-300 rounded-lg text-xs">
                                {lifestyle.trim()}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>

                      {/* Card Actions */}
                      <div className="flex gap-3">
                        <button
                          onClick={() => handleUpdate(item._id)}
                          className="flex-1 px-4 py-2 bg-gradient-to-r from-yellow-500 to-orange-500 text-white rounded-xl hover:from-yellow-600 hover:to-orange-600 transition-all duration-300 font-medium flex items-center justify-center space-x-2"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                          </svg>
                          <span>Edit</span>
                        </button>
                        <button
                          onClick={() => handleDelete(item._id)}
                          className="flex-1 px-4 py-2 bg-gradient-to-r from-red-500 to-pink-500 text-white rounded-xl hover:from-red-600 hover:to-pink-600 transition-all duration-300 font-medium flex items-center justify-center space-x-2"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                          <span>Delete</span>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Table View */}
              {viewMode === 'table' && (
                <div className="glass-card rounded-2xl border border-white/10 overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="text-left text-gray-300 bg-white/5">
                          <th className="py-4 px-6 font-medium">Listing</th>
                          <th className="py-4 px-6 font-medium">Location</th>
                          <th className="py-4 px-6 font-medium">Rent</th>
                          <th className="py-4 px-6 font-medium">Room Type</th>
                          <th className="py-4 px-6 font-medium">Status</th>
                          <th className="py-4 px-6 font-medium">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {filteredAndSortedListings.map((item, idx) => (
                          <tr
                            key={item._id}
                            className={`border-t border-gray-700/50 hover:bg-white/5 transition-all duration-300 ${
                              idx % 2 === 0 ? 'bg-transparent' : 'bg-white/2'
                            }`}
                          >
                            <td className="py-4 px-6">
                              <div>
                                <div className="font-semibold text-white text-lg">{item.title}</div>
                                <div className="text-gray-400 text-sm line-clamp-1">{item.description}</div>
                              </div>
                            </td>
                            <td className="py-4 px-6 text-gray-300">{item.location}</td>
                            <td className="py-4 px-6">
                              <span className="text-purple-400 font-bold text-lg">${item.rent}</span>
                              <span className="text-gray-400 text-sm">/month</span>
                            </td>
                            <td className="py-4 px-6 text-gray-300">{item.roomType}</td>
                            <td className="py-4 px-6">
                              <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                                item.availability === 'available' 
                                  ? 'bg-green-500/20 text-green-400 border border-green-500/30' 
                                  : 'bg-red-500/20 text-red-400 border border-red-500/30'
                              }`}>
                                {item.availability}
                              </span>
                            </td>
                            <td className="py-4 px-6">
                              <div className="flex gap-2">
                                <button
                                  onClick={() => handleUpdate(item._id)}
                                  className="px-3 py-1.5 bg-gradient-to-r from-yellow-500 to-orange-500 text-white rounded-lg hover:from-yellow-600 hover:to-orange-600 transition-all duration-300 text-sm font-medium"
                                >
                                  Edit
                                </button>
                                <button
                                  onClick={() => handleDelete(item._id)}
                                  className="px-3 py-1.5 bg-gradient-to-r from-red-500 to-pink-500 text-white rounded-lg hover:from-red-600 hover:to-pink-600 transition-all duration-300 text-sm font-medium"
                                >
                                  Delete
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </>
          )}

          {/* Quick Actions */}
          <div className="mt-8 text-center">
            <button
              onClick={() => navigate('/createroom')}
              className="inline-flex items-center space-x-2 px-8 py-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-xl hover:from-purple-700 hover:to-blue-700 transition-all duration-300 font-medium hover:transform hover:scale-105 shadow-lg hover:shadow-purple-500/25"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
              <span>Create New Listing</span>
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default MyList;