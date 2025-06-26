import React, { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';
import NavBar from './NavBar/NavBar';
import Footer from './Footer/Footer';
import Swal from 'sweetalert2';

const Dashboard = () => {
  const { user } = useContext(AuthContext);
  const [stats, setStats] = useState({
    totalItems: 0,
    myItems: 0,
    availableItems: 0,
    totalLikes: 0,
    recentItems: []
  });
  const [analytics, setAnalytics] = useState({
    totalListings: 0,
    availableListings: 0,
    totalLikes: 0,
    totalViews: 0,
    recentListings: [],
    topLocations: [],
    priceStats: { avgRent: 0, minRent: 0, maxRent: 0 }
  });
  const [myListings, setMyListings] = useState([]);
  const [allListings, setAllListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview'); 
  const [viewMode, setViewMode] = useState('cards'); 
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('newest');
  const navigate = useNavigate();

  // Redirect if not logged in
  useEffect(() => {
    if (!user?.email) {
      navigate('/login');
      return;
    }
    fetchDashboardData();
  }, [user]);

  const fetchDashboardData = async () => {
    setLoading(true);
    try {
      await Promise.all([
        fetchStats(),
        fetchAnalytics(),
        fetchMyListings(),
        fetchAllListings()
      ]);
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Failed to load dashboard data. Please try again.',
        background: 'rgba(17, 24, 39, 0.95)',
        color: '#fff',
      });
    } finally {
      setLoading(false);
    }
  };

  const fetchStats = async () => {
    try {
      const response = await fetch(`https://server-side-70by.onrender.com/dashboard/stats?email=${encodeURIComponent(user.email)}`);
      if (response.ok) {
        const data = await response.json();
        setStats(data);
      }
    } catch (error) {
      console.error('Error fetching stats:', error);
    }
  };

  const fetchAnalytics = async () => {
    try {
      const response = await fetch('https://server-side-70by.onrender.com/analytics');
      if (response.ok) {
        const data = await response.json();
        setAnalytics(data);
      }
    } catch (error) {
      console.error('Error fetching analytics:', error);
    }
  };

  const fetchMyListings = async () => {
    try {
      const response = await fetch(`https://server-side-70by.onrender.com/my-listings?email=${encodeURIComponent(user.email)}`);
      if (response.ok) {
        const data = await response.json();
        setMyListings(data);
      }
    } catch (error) {
      console.error('Error fetching my listings:', error);
    }
  };

  const fetchAllListings = async () => {
    try {
      const response = await fetch('https://server-side-70by.onrender.com/all-items?limit=20');
      if (response.ok) {
        const data = await response.json();
        setAllListings(data.items || []);
      }
    } catch (error) {
      console.error('Error fetching all listings:', error);
    }
  };

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
    });
    
    if (result.isConfirmed) {
      try {
        const response = await fetch(`https://server-side-70by.onrender.com/roommates/${id}`, { method: 'DELETE' });
        if (response.ok) {
          setMyListings(prev => prev.filter(item => item._id !== id));
          await fetchStats(); // Refresh stats
          Swal.fire({
            title: 'Deleted!',
            text: 'Your listing has been deleted successfully.',
            icon: 'success',
            background: 'rgba(17, 24, 39, 0.95)',
            color: '#fff',
            timer: 2000,
            showConfirmButton: false,
          });
        }
      } catch (error) {
        console.error('Error deleting listing:', error);
      }
    }
  };

  const handleUpdate = (id) => {
    navigate(`/update/${id}`);
  };

  const handleLike = async (id) => {
    try {
      const response = await fetch(`https://server-side-70by.onrender.com/roommates/${id}/like`, {
        method: 'PATCH'
      });
      if (response.ok) {
        const data = await response.json();
        setAllListings(prev => prev.map(item => 
          item._id === id ? { ...item, likeCount: data.likeCount } : item
        ));
      }
    } catch (error) {
      console.error('Error liking item:', error);
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const filteredMyListings = myListings
    .filter(item => 
      item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.location.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      switch (sortBy) {
        case 'oldest':
          return new Date(a.createdAt) - new Date(b.createdAt);
        case 'rent-low':
          return a.rent - b.rent;
        case 'rent-high':
          return b.rent - a.rent;
        case 'title':
          return a.title.localeCompare(b.title);
        case 'newest':
        default:
          return new Date(b.createdAt) - new Date(a.createdAt);
      }
    });

  if (loading) {
    return (
      <>
        <div className="min-h-screen bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#0f172a] flex items-center justify-center">
          <div className="glass-card p-8 rounded-2xl">
            <div className="flex items-center space-x-4">
              <div className="animate-spin rounded-full h-8 w-8 border-4 border-purple-400 border-t-transparent"></div>
              <span className="text-white text-lg font-medium">Loading dashboard...</span>
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

        <div className="relative z-10 max-w-7xl mx-auto">
          {/* Header Section */}
          <div className="text-center mb-12 mt-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
              Dashboard
            </h1>
            <p className="text-gray-300 text-lg">Welcome back, {user?.displayName || user?.email}!</p>
          </div>

          {/* Navigation Tabs */}
          <div className="flex flex-wrap justify-center mb-8">
            <div className="glass-card p-2 rounded-2xl border border-white/10">
              <div className="flex space-x-2">
                <button
                  onClick={() => setActiveTab('overview')}
                  className={`px-6 py-3 rounded-xl transition-all duration-300 font-medium ${
                    activeTab === 'overview'
                      ? 'bg-purple-600 text-white shadow-lg'
                      : 'text-gray-300 hover:text-white hover:bg-white/10'
                  }`}
                >
                  Overview
                </button>
                <button
                  onClick={() => setActiveTab('all-items')}
                  className={`px-6 py-3 rounded-xl transition-all duration-300 font-medium ${
                    activeTab === 'all-items'
                      ? 'bg-purple-600 text-white shadow-lg'
                      : 'text-gray-300 hover:text-white hover:bg-white/10'
                  }`}
                >
                  All Items
                </button>
                <button
                  onClick={() => setActiveTab('add-item')}
                  className={`px-6 py-3 rounded-xl transition-all duration-300 font-medium ${
                    activeTab === 'add-item'
                      ? 'bg-purple-600 text-white shadow-lg'
                      : 'text-gray-300 hover:text-white hover:bg-white/10'
                  }`}
                >
                  Add Item
                </button>
                <button
                  onClick={() => setActiveTab('my-listings')}
                  className={`px-6 py-3 rounded-xl transition-all duration-300 font-medium ${
                    activeTab === 'my-listings'
                      ? 'bg-purple-600 text-white shadow-lg'
                      : 'text-gray-300 hover:text-white hover:bg-white/10'
                  }`}
                >
                  My Items ({stats.myItems})
                </button>
              </div>
            </div>
          </div>

          {/* Overview Tab */}
          {activeTab === 'overview' && (
            <div className="space-y-8">
              {/* Personal Stats Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="glass-card p-6 rounded-2xl border border-white/10">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-blue-500/20 rounded-full flex items-center justify-center">
                      <svg className="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-white">{stats.myItems}</h3>
                      <p className="text-gray-400">My Items</p>
                    </div>
                  </div>
                </div>

                <div className="glass-card p-6 rounded-2xl border border-white/10">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-red-500/20 rounded-full flex items-center justify-center">
                      <svg className="w-6 h-6 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-white">{stats.totalLikes}</h3>
                      <p className="text-gray-400">Total Likes</p>
                    </div>
                  </div>
                </div>

                <div className="glass-card p-6 rounded-2xl border border-white/10">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-green-500/20 rounded-full flex items-center justify-center">
                      <svg className="w-6 h-6 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-white">{stats.availableItems}</h3>
                      <p className="text-gray-400">Available Globally</p>
                    </div>
                  </div>
                </div>

                <div className="glass-card p-6 rounded-2xl border border-white/10">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-purple-500/20 rounded-full flex items-center justify-center">
                      <svg className="w-6 h-6 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-white">{stats.totalItems}</h3>
                      <p className="text-gray-400">Total Items</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Recent Activity & Analytics */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Recent Listings */}
                <div className="glass-card p-6 rounded-2xl border border-white/10">
                  <h3 className="text-xl font-bold text-white mb-6 flex items-center">
                    <svg className="w-5 h-5 mr-2 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    Recent Activity
                  </h3>
                  <div className="space-y-4">
                    {stats.recentItems.slice(0, 5).map((item) => (
                      <div key={item._id} className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                        <div className="flex-1">
                          <h4 className="text-white font-medium line-clamp-1">{item.title}</h4>
                          <p className="text-gray-400 text-sm">{formatDate(item.createdAt)}</p>
                        </div>
                        <div className="flex items-center space-x-3">
                          <span className="text-purple-400 font-bold">${item.rent}</span>
                          <span className="text-red-400 text-sm">❤️ {item.likeCount}</span>
                        </div>
                      </div>
                    ))}
                    {stats.recentItems.length === 0 && (
                      <div className="text-center py-8 text-gray-400">
                        <p>No recent activity</p>
                        <button
                          onClick={() => navigate('/create-room')}
                          className="mt-3 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
                        >
                          Create Your First Listing
                        </button>
                      </div>
                    )}
                  </div>
                </div>

                {/* Platform Analytics */}
                <div className="glass-card p-6 rounded-2xl border border-white/10">
                  <h3 className="text-xl font-bold text-white mb-6 flex items-center">
                    <svg className="w-5 h-5 mr-2 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                    </svg>
                    Platform Insights
                  </h3>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center p-3 bg-white/5 rounded-lg">
                      <span className="text-gray-300">Average Rent</span>
                      <span className="text-white font-bold">${Math.round(analytics.priceStats.avgRent)}</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-white/5 rounded-lg">
                      <span className="text-gray-300">Total Views</span>
                      <span className="text-white font-bold">{analytics.totalViews.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-white/5 rounded-lg">
                      <span className="text-gray-300">Total Likes</span>
                      <span className="text-white font-bold">{analytics.totalLikes.toLocaleString()}</span>
                    </div>
                    
                    {/* Top Locations */}
                    <div className="mt-6">
                      <h4 className="text-white font-medium mb-3">Popular Locations</h4>
                      <div className="space-y-2">
                        {analytics.topLocations.slice(0, 3).map((location, index) => (
                          <div key={location._id} className="flex justify-between items-center text-sm">
                            <span className="text-gray-300">{location._id}</span>
                            <span className="text-purple-400">{location.count} listings</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="glass-card p-6 rounded-2xl border border-white/10">
                <h3 className="text-xl font-bold text-white mb-6">Quick Actions</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <button
                    onClick={() => navigate('/createroom')}
                    className="flex items-center space-x-3 p-4 bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl text-white hover:from-purple-700 hover:to-blue-700 transition-all duration-300"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>
                    <span className="font-medium">Create New Listing</span>
                  </button>
                  <button
                    onClick={() => setActiveTab('my-listings')}
                    className="flex items-center space-x-3 p-4 bg-white/10 rounded-xl text-white hover:bg-white/20 transition-all duration-300"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                    <span className="font-medium">Manage Listings</span>
                  </button>
                  <button
                    onClick={() => navigate('/allitems')}
                    className="flex items-center space-x-3 p-4 bg-white/10 rounded-xl text-white hover:bg-white/20 transition-all duration-300"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                    <span className="font-medium">Browse All Listings</span>
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* All Items Tab */}
          {activeTab === 'all-items' && (
            <div className="space-y-6">
              <div className="text-center mb-6">
                <h2 className="text-3xl font-bold text-white mb-4">All Items</h2>
                <p className="text-gray-300 text-lg">Browse all available roommate listings on the platform</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {allListings.map((item) => (
                  <div key={item._id} className="glass-card p-6 rounded-2xl border border-white/10 hover:transform hover:scale-105 transition-all duration-300 card-hover">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <h3 className="text-lg font-bold text-white mb-2 line-clamp-2">{item.title}</h3>
                        <div className="flex items-center text-gray-400 mb-2">
                          <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                          </svg>
                          <span className="text-sm">{item.location}</span>
                        </div>
                      </div>
                      <div className={`px-2 py-1 rounded-full text-xs font-medium ${
                        item.availability === 'available' 
                          ? 'bg-green-500/20 text-green-400 border border-green-500/30' 
                          : 'bg-red-500/20 text-red-400 border border-red-500/30'
                      }`}>
                        {item.availability}
                      </div>
                    </div>

                    <div className="space-y-3 mb-6">
                      <div className="flex items-center justify-between">
                        <span className="text-gray-400 text-sm">Monthly Rent</span>
                        <span className="text-xl font-bold text-purple-400">${item.rent}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-gray-400 text-sm">Room Type</span>
                        <span className="text-white font-medium">{item.roomType}</span>
                      </div>
                      <p className="text-gray-300 text-sm line-clamp-2">{item.description}</p>
                      
                      <div className="flex items-center justify-between pt-2 border-t border-gray-600/30">
                        <div className="flex items-center space-x-2 text-gray-400 text-sm">
                          <span>❤️ {item.likeCount || 0}</span>
                          <span>👁️ {item.viewCount || 0}</span>
                        </div>
                        <span className="text-gray-400 text-xs">by {item.userName}</span>
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <button
                        onClick={() => handleLike(item._id)}
                        className="px-3 py-2 bg-red-500/20 text-red-400 rounded-lg hover:bg-red-500/30 transition-all duration-300 flex items-center space-x-1"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                        </svg>
                      </button>
                      <button
                        onClick={() => navigate(`/details/${item._id}`)}
                        className="flex-1 px-4 py-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg hover:from-purple-700 hover:to-blue-700 transition-all duration-300 font-medium"
                      >
                        View Details
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {allListings.length === 0 && (
                <div className="text-center py-12">
                  <div className="w-20 h-20 bg-gray-500/20 rounded-full mx-auto mb-6 flex items-center justify-center">
                    <svg className="w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 009.586 13H7" />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-2">No items available</h3>
                  <p className="text-gray-400">Check back later for new listings!</p>
                </div>
              )}

              <div className="text-center mt-8">
                <button
                  onClick={() => navigate('/allitems')}
                  className="px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-xl hover:from-purple-700 hover:to-blue-700 transition-all duration-300 font-medium"
                >
                  View Full Listings Page
                </button>
              </div>
            </div>
          )}

          {/* Add Item Tab */}
          {activeTab === 'add-item' && (
            <div className="space-y-6">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-white mb-4">Add New Item</h2>
                <p className="text-gray-300 text-lg">Create a new roommate listing</p>
              </div>

              <div className="max-w-2xl mx-auto">
                <div className="glass-card p-8 rounded-2xl border border-white/10">
                  <div className="text-center">
                    <div className="w-20 h-20 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full mx-auto mb-6 flex items-center justify-center">
                      <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                      </svg>
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-4">Ready to Add Your Listing?</h3>
                    <p className="text-gray-300 mb-8">Click below to create a new roommate listing with all the details</p>
                    <button
                      onClick={() => navigate('/createroom')}
                      className="px-8 py-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-xl hover:from-purple-700 hover:to-blue-700 transition-all duration-300 font-medium text-lg flex items-center space-x-3 mx-auto"
                    >
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                      </svg>
                      <span>Create New Listing</span>
                    </button>
                  </div>

                  <div className="mt-8 pt-8 border-t border-gray-600/30">
                    <h4 className="text-lg font-semibold text-white mb-4">Quick Tips:</h4>
                    <ul className="space-y-2 text-gray-300">
                      <li className="flex items-center space-x-2">
                        <svg className="w-4 h-4 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span>Add detailed description and clear photos</span>
                      </li>
                      <li className="flex items-center space-x-2">
                        <svg className="w-4 h-4 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span>Include accurate location and rent information</span>
                      </li>
                      <li className="flex items-center space-x-2">
                        <svg className="w-4 h-4 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span>Specify room type and lifestyle preferences</span>
                      </li>
                      <li className="flex items-center space-x-2">
                        <svg className="w-4 h-4 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span>Provide clear contact information</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* My Listings Tab */}
          {activeTab === 'my-listings' && (
            <div className="space-y-6">
              {/* Controls */}
              <div className="glass-card p-6 rounded-2xl border border-white/10">
                <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
                  <div className="relative flex-1 max-w-md">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3">
                      <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                      </svg>
                    </div>
                    <input
                      type="text"
                      placeholder="Search your listings..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 bg-white/5 border border-gray-500/30 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300"
                    />
                  </div>

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
                      <option value="title" className="bg-gray-800">Title A-Z</option>
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

              {/* Listings Display */}
              {filteredMyListings.length === 0 ? (
                <div className="glass-card p-12 rounded-2xl border border-white/10 text-center">
                  <div className="w-20 h-20 bg-gray-500/20 rounded-full mx-auto mb-6 flex items-center justify-center">
                    <svg className="w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-2">
                    {searchTerm ? 'No listings match your search' : 'No listings yet'}
                  </h3>
                  <p className="text-gray-400 mb-6">
                    {searchTerm 
                      ? 'Try adjusting your search terms' 
                      : 'Create your first roommate listing to get started'
                    }
                  </p>
                  {!searchTerm && (
                    <button
                      onClick={() => navigate('/createroom')}
                      className="px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-xl hover:from-purple-700 hover:to-blue-700 transition-all duration-300 font-medium"
                    >
                      Create Your First Listing
                    </button>
                  )}
                </div>
              ) : (
                <>
                  {viewMode === 'cards' ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                      {filteredMyListings.map((item) => (
                        <div key={item._id} className="glass-card p-6 rounded-2xl border border-white/10 hover:transform hover:scale-105 transition-all duration-300 card-hover">
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

                          <div className="space-y-3 mb-6">
                            <div className="flex items-center justify-between">
                              <span className="text-gray-400 text-sm">Monthly Rent</span>
                              <span className="text-2xl font-bold text-purple-400">${item.rent}</span>
                            </div>
                            <div className="flex items-center justify-between">
                              <span className="text-gray-400 text-sm">Room Type</span>
                              <span className="text-white font-medium">{item.roomType}</span>
                            </div>
                            <div className="flex items-center justify-between">
                              <span className="text-gray-400 text-sm">Created</span>
                              <span className="text-white text-sm">{formatDate(item.createdAt)}</span>
                            </div>
                            <div className="flex items-center justify-between pt-2 border-t border-gray-600/30">
                              <span className="text-gray-400 text-sm">Engagement</span>
                              <div className="flex items-center space-x-2 text-sm">
                                <span className="text-red-400">❤️ {item.likeCount}</span>
                                <span className="text-blue-400">👁️ {item.viewCount}</span>
                              </div>
                            </div>
                          </div>

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
                  ) : (
                    <div className="glass-card rounded-2xl border border-white/10 overflow-hidden">
                      <div className="overflow-x-auto">
                        <table className="w-full">
                          <thead>
                            <tr className="text-left text-gray-300 bg-white/5">
                              <th className="py-4 px-6 font-medium">Listing</th>
                              <th className="py-4 px-6 font-medium">Location</th>
                              <th className="py-4 px-6 font-medium">Rent</th>
                              <th className="py-4 px-6 font-medium">Type</th>
                              <th className="py-4 px-6 font-medium">Status</th>
                              <th className="py-4 px-6 font-medium">Engagement</th>
                              <th className="py-4 px-6 font-medium">Actions</th>
                            </tr>
                          </thead>
                          <tbody>
                            {filteredMyListings.map((item, idx) => (
                              <tr
                                key={item._id}
                                className={`border-t border-gray-700/50 hover:bg-white/5 transition-all duration-300 ${
                                  idx % 2 === 0 ? 'bg-transparent' : 'bg-white/2'
                                }`}
                              >
                                <td className="py-4 px-6">
                                  <div>
                                    <div className="font-semibold text-white text-lg line-clamp-1">{item.title}</div>
                                    <div className="text-gray-400 text-sm">{formatDate(item.createdAt)}</div>
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
                                  <div className="flex items-center space-x-2 text-sm">
                                    <span className="text-red-400">❤️ {item.likeCount}</span>
                                    <span className="text-blue-400">👁️ {item.viewCount}</span>
                                  </div>
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
            </div>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Dashboard;
