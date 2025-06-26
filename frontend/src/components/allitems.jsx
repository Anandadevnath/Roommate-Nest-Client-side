import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import NavBar from './NavBar/NavBar';
import Footer from './Footer/Footer';
import Swal from 'sweetalert2';

const AllItems = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchSuggestions, setSearchSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [filters, setFilters] = useState({
    location: '',
    minRent: '',
    maxRent: '',
    roomType: 'All',
    availability: 'All',
    sort: 'newest',
    order: 'desc'
  });
  const [filterOptions, setFilterOptions] = useState({
    roomTypes: [],
    locations: [],
    rentRange: { minRent: 0, maxRent: 5000 }
  });
  const [pagination, setPagination] = useState({
    current: 1,
    pages: 1,
    total: 0
  });
  const [viewMode, setViewMode] = useState('grid'); 
  const [trending, setTrending] = useState([]);
  const [showFilters, setShowFilters] = useState(false);
  const navigate = useNavigate();

  // Fetch filter options on mount
  useEffect(() => {
    fetchFilterOptions();
    fetchTrending();
    fetchItems(); // Initial fetch
  }, []);

  // Fetch items when filters or pagination change
  useEffect(() => {
    if (pagination.current > 0) {
      fetchItems();
    }
  }, [filters, pagination.current]);

  // Search suggestions debounced
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (searchTerm.length >= 2) {
        fetchSearchSuggestions();
      } else {
        setSearchSuggestions([]);
      }
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [searchTerm]);

  const fetchFilterOptions = async () => {
    try {
      const response = await fetch('https://server-side-70by.onrender.com/filter-options');
      const data = await response.json();
      setFilterOptions(data);
    } catch (error) {
      console.error('Error fetching filter options:', error);
    }
  };

  const fetchTrending = async () => {
    try {
      const response = await fetch('https://server-side-70by.onrender.com/trending?limit=6');
      const data = await response.json();
      setTrending(data);
    } catch (error) {
      console.error('Error fetching trending:', error);
    }
  };

  const fetchSearchSuggestions = async () => {
    try {
      const response = await fetch(`https://server-side-70by.onrender.com/search-suggestions?query=${encodeURIComponent(searchTerm)}`);
      const data = await response.json();
      setSearchSuggestions(data);
    } catch (error) {
      console.error('Error fetching suggestions:', error);
    }
  };

  const fetchItems = async () => {
    setLoading(true);
    try {
      const queryParams = new URLSearchParams();
      
      // Add pagination
      queryParams.append('page', pagination?.current || 1);
      queryParams.append('limit', '12');
      
      // Add search term if exists
      if (searchTerm.trim()) {
        queryParams.append('search', searchTerm.trim());
      }
      
      // Add filters only if they have valid values
      if (filters.location && filters.location !== 'All') {
        queryParams.append('location', filters.location);
      }
      if (filters.minRent && filters.minRent !== '') {
        queryParams.append('minRent', filters.minRent);
      }
      if (filters.maxRent && filters.maxRent !== '') {
        queryParams.append('maxRent', filters.maxRent);
      }
      if (filters.roomType && filters.roomType !== 'All') {
        queryParams.append('roomType', filters.roomType);
      }
      if (filters.availability && filters.availability !== 'All') {
        queryParams.append('availability', filters.availability);
      }
      if (filters.sort) {
        queryParams.append('sort', filters.sort);
      }
      if (filters.order) {
        queryParams.append('order', filters.order);
      }

      const response = await fetch(`https://server-side-70by.onrender.com/all-items?${queryParams}`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      
      setItems(data.items || []);
      setPagination(data.pagination || { current: 1, pages: 1, total: 0 });
    } catch (error) {
      console.error('Error fetching items:', error);
      setItems([]);
      setPagination({ current: 1, pages: 1, total: 0 });
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Failed to fetch listings. Please try again.',
        background: 'rgba(17, 24, 39, 0.95)',
        color: '#fff',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    setPagination(prev => ({ ...prev, current: 1 }));
    fetchItems();
    setShowSuggestions(false);
  };

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }));
    setPagination(prev => ({ ...prev, current: 1 }));
  };

  const handleSuggestionClick = (suggestion) => {
    setSearchTerm(suggestion);
    setShowSuggestions(false);
    setPagination(prev => ({ ...prev, current: 1 }));
    setTimeout(fetchItems, 100);
  };

  const handleLike = async (id) => {
    try {
      const response = await fetch(`https://server-side-70by.onrender.com/roommates/${id}/like`, {
        method: 'PATCH'
      });
      if (response.ok) {
        const data = await response.json();
        setItems(prev => prev.map(item => 
          item._id === id ? { ...item, likeCount: data.likeCount } : item
        ));
      }
    } catch (error) {
      console.error('Error liking item:', error);
    }
  };

  const handleViewDetails = (id) => {
    navigate(`/details/${id}`);
  };

  const resetFilters = () => {
    setFilters({
      location: '',
      minRent: '',
      maxRent: '',
      roomType: 'All',
      availability: 'All',
      sort: 'newest',
      order: 'desc'
    });
    setSearchTerm('');
    setPagination(prev => ({ ...prev, current: 1 }));
  };

  if (loading && items.length === 0) {
    return (
      <>
        <div className="min-h-screen bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#0f172a] flex items-center justify-center">
          <div className="glass-card p-8 rounded-2xl">
            <div className="flex items-center space-x-4">
              <div className="animate-spin rounded-full h-8 w-8 border-4 border-purple-400 border-t-transparent"></div>
              <span className="text-white text-lg font-medium">Loading listings...</span>
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
              Find Your Perfect Roommate
            </h1>
            <p className="text-gray-300 text-lg max-w-2xl mx-auto">
              Discover thousands of verified listings from trusted hosts in your area
            </p>
          </div>

          {/* Search Section */}
          <div className="glass-card p-6 rounded-2xl border border-white/10 mb-8">
            <form onSubmit={handleSearch} className="relative">
              <div className="flex gap-4">
                <div className="flex-1 relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-4">
                    <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  </div>
                  <input
                    type="text"
                    placeholder="Search by title, location, or description..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    onFocus={() => setShowSuggestions(true)}
                    onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
                    className="w-full pl-12 pr-4 py-4 bg-white/5 border border-gray-500/30 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 text-lg"
                  />
                  
                  {/* Search Suggestions */}
                  {showSuggestions && searchSuggestions.length > 0 && (
                    <div className="absolute top-full left-0 right-0 mt-2 bg-gray-800/95 backdrop-blur-lg border border-gray-600/50 rounded-xl shadow-xl z-50 max-h-60 overflow-y-auto">
                      {searchSuggestions.map((suggestion, index) => (
                        <button
                          key={index}
                          type="button"
                          onClick={() => handleSuggestionClick(suggestion)}
                          className="w-full text-left px-4 py-3 text-white hover:bg-purple-600/30 transition-colors duration-200 first:rounded-t-xl last:rounded-b-xl"
                        >
                          {suggestion}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
                
                <button
                  type="button"
                  onClick={() => setShowFilters(!showFilters)}
                  className={`px-6 py-4 rounded-xl border transition-all duration-300 flex items-center space-x-2 ${
                    showFilters 
                      ? 'bg-purple-600 border-purple-500 text-white' 
                      : 'bg-white/5 border-gray-500/30 text-gray-300 hover:bg-white/10'
                  }`}
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.414A1 1 0 013 6.707V4z" />
                  </svg>
                  <span>Filters</span>
                </button>
                
                <button
                  type="submit"
                  className="px-8 py-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-xl hover:from-purple-700 hover:to-blue-700 transition-all duration-300 font-medium flex items-center space-x-2"
                >
                  <span>Search</span>
                </button>
              </div>
            </form>
          </div>

          {/* Filters Panel */}
          {showFilters && (
            <div className="glass-card p-6 rounded-2xl border border-white/10 mb-8">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Location</label>
                  <select
                    value={filters.location}
                    onChange={(e) => handleFilterChange('location', e.target.value)}
                    className="w-full px-4 py-3 bg-white/5 border border-gray-500/30 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                  >
                    <option value="" className="bg-gray-800">All Locations</option>
                    {filterOptions.locations.map(location => (
                      <option key={location} value={location} className="bg-gray-800">{location}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Room Type</label>
                  <select
                    value={filters.roomType}
                    onChange={(e) => handleFilterChange('roomType', e.target.value)}
                    className="w-full px-4 py-3 bg-white/5 border border-gray-500/30 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                  >
                    <option value="All" className="bg-gray-800">All Types</option>
                    {filterOptions.roomTypes.map(type => (
                      <option key={type} value={type} className="bg-gray-800">{type}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Min Rent</label>
                  <input
                    type="number"
                    placeholder="Min"
                    value={filters.minRent}
                    onChange={(e) => handleFilterChange('minRent', e.target.value)}
                    className="w-full px-4 py-3 bg-white/5 border border-gray-500/30 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Max Rent</label>
                  <input
                    type="number"
                    placeholder="Max"
                    value={filters.maxRent}
                    onChange={(e) => handleFilterChange('maxRent', e.target.value)}
                    className="w-full px-4 py-3 bg-white/5 border border-gray-500/30 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                </div>
              </div>

              <div className="flex flex-wrap gap-4 items-center justify-between">
                <div className="flex gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Sort By</label>
                    <select
                      value={filters.sort}
                      onChange={(e) => handleFilterChange('sort', e.target.value)}
                      className="px-4 py-3 bg-white/5 border border-gray-500/30 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                    >
                      <option value="newest" className="bg-gray-800">Newest</option>
                      <option value="oldest" className="bg-gray-800">Oldest</option>
                      <option value="rent" className="bg-gray-800">Rent</option>
                      <option value="likes" className="bg-gray-800">Most Liked</option>
                      <option value="title" className="bg-gray-800">Title</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Availability</label>
                    <select
                      value={filters.availability}
                      onChange={(e) => handleFilterChange('availability', e.target.value)}
                      className="px-4 py-3 bg-white/5 border border-gray-500/30 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                    >
                      <option value="All" className="bg-gray-800">All</option>
                      <option value="available" className="bg-gray-800">Available</option>
                      <option value="not available" className="bg-gray-800">Not Available</option>
                    </select>
                  </div>
                </div>

                <button
                  onClick={resetFilters}
                  className="px-6 py-3 bg-gray-600/30 text-gray-300 rounded-xl hover:bg-gray-600/50 transition-all duration-300 font-medium"
                >
                  Reset Filters
                </button>
              </div>
            </div>
          )}

          {/* Trending Section */}
          {trending.length > 0 && !searchTerm && (
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
                <svg className="w-6 h-6 text-yellow-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                Trending Now
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {trending.slice(0, 3).map((item) => (
                  <div key={item._id} className="glass-card p-4 rounded-xl border border-yellow-500/20 hover:border-yellow-500/40 transition-all duration-300">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-white line-clamp-1">{item.title}</h3>
                        <p className="text-gray-400 text-sm">{item.location}</p>
                      </div>
                      <div className="px-2 py-1 bg-yellow-500/20 text-yellow-400 rounded-lg text-xs font-medium">
                        🔥 Trending
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-purple-400 font-bold text-xl">${item.rent}/mo</span>
                      <div className="flex items-center space-x-2 text-gray-400 text-sm">
                        <span>{item.likeCount} ❤️</span>
                        <span>{item.viewCount} 👁️</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Results Header */}
          <div className="flex flex-col md:flex-row justify-between items-center mb-6">          <div className="text-white mb-4 md:mb-0">
            <span className="text-lg">
              Showing {items.length} of {pagination?.total || 0} listings
            </span>
            {searchTerm && (
              <span className="text-gray-400 ml-2">for "{searchTerm}"</span>
            )}
          </div>

            <div className="flex items-center space-x-4">
              <div className="flex bg-white/5 rounded-xl border border-gray-500/30 overflow-hidden">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`px-4 py-2 transition-all duration-300 ${
                    viewMode === 'grid' 
                      ? 'bg-purple-600 text-white' 
                      : 'text-gray-400 hover:text-white hover:bg-white/10'
                  }`}
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                  </svg>
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`px-4 py-2 transition-all duration-300 ${
                    viewMode === 'list' 
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

          {/* Loading State */}
          {loading && (
            <div className="flex justify-center py-12">
              <div className="animate-spin rounded-full h-8 w-8 border-4 border-purple-400 border-t-transparent"></div>
            </div>
          )}

          {/* No Results */}
          {!loading && items.length === 0 && (
            <div className="glass-card p-12 rounded-2xl border border-white/10 text-center">
              <div className="w-20 h-20 bg-gray-500/20 rounded-full mx-auto mb-6 flex items-center justify-center">
                <svg className="w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">No listings found</h3>
              <p className="text-gray-400 mb-6">
                Try adjusting your search terms or filters to find more results
              </p>
              <button
                onClick={resetFilters}
                className="px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-xl hover:from-purple-700 hover:to-blue-700 transition-all duration-300 font-medium"
              >
                Clear All Filters
              </button>
            </div>
          )}

          {/* Results Grid/List */}
          {!loading && items.length > 0 && (
            <>
              {viewMode === 'grid' ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
                  {items.map((item) => (
                    <div key={item._id} className="glass-card p-6 rounded-2xl border border-white/10 hover:transform hover:scale-105 transition-all duration-300 card-hover">
                      {/* Card Header */}
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
                            ? 'bg-green-500/20 text-green-400' 
                            : 'bg-red-500/20 text-red-400'
                        }`}>
                          {item.availability}
                        </div>
                      </div>

                      {/* Card Content */}
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
                        
                        {/* Stats */}
                        <div className="flex items-center justify-between pt-2 border-t border-gray-600/30">
                          <div className="flex items-center space-x-3 text-gray-400 text-sm">
                            <span className="flex items-center">
                              <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                              </svg>
                              {item.likeCount}
                            </span>
                            <span className="flex items-center">
                              <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                              </svg>
                              {item.viewCount}
                            </span>
                          </div>
                          <span className="text-gray-400 text-xs">
                            by {item.userName}
                          </span>
                        </div>
                      </div>

                      {/* Card Actions */}
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
                          onClick={() => handleViewDetails(item._id)}
                          className="flex-1 px-4 py-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg hover:from-purple-700 hover:to-blue-700 transition-all duration-300 font-medium"
                        >
                          View Details
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="space-y-4 mb-8">
                  {items.map((item) => (
                    <div key={item._id} className="glass-card p-6 rounded-2xl border border-white/10 hover:bg-white/5 transition-all duration-300">
                      <div className="flex flex-col md:flex-row gap-6">
                        <div className="flex-1">
                          <div className="flex items-start justify-between mb-3">
                            <div>
                              <h3 className="text-xl font-bold text-white mb-2">{item.title}</h3>
                              <div className="flex items-center text-gray-400 mb-2">
                                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                </svg>
                                <span>{item.location}</span>
                                <span className="mx-2">•</span>
                                <span>{item.roomType}</span>
                              </div>
                            </div>
                            <div className={`px-3 py-1 rounded-full text-sm font-medium ${
                              item.availability === 'available' 
                                ? 'bg-green-500/20 text-green-400' 
                                : 'bg-red-500/20 text-red-400'
                            }`}>
                              {item.availability}
                            </div>
                          </div>
                          
                          <p className="text-gray-300 mb-4 line-clamp-2">{item.description}</p>
                          
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-4 text-gray-400 text-sm">
                              <span className="flex items-center">
                                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                                </svg>
                                {item.likeCount} likes
                              </span>
                              <span className="flex items-center">
                                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                </svg>
                                {item.viewCount} views
                              </span>
                              <span>by {item.userName}</span>
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex flex-col justify-between items-end">
                          <div className="text-right mb-4">
                            <div className="text-3xl font-bold text-purple-400">${item.rent}</div>
                            <div className="text-gray-400 text-sm">per month</div>
                          </div>
                          
                          <div className="flex gap-2">
                            <button
                              onClick={() => handleLike(item._id)}
                              className="px-4 py-2 bg-red-500/20 text-red-400 rounded-lg hover:bg-red-500/30 transition-all duration-300"
                            >
                              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                              </svg>
                            </button>
                            <button
                              onClick={() => handleViewDetails(item._id)}
                              className="px-6 py-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg hover:from-purple-700 hover:to-blue-700 transition-all duration-300 font-medium"
                            >
                              View Details
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Pagination */}
              {pagination.pages > 1 && (
                <div className="flex justify-center items-center space-x-2">
                  <button
                    onClick={() => setPagination(prev => ({ ...prev, current: Math.max(1, prev.current - 1) }))}
                    disabled={pagination.current === 1}
                    className="px-4 py-2 bg-white/5 border border-gray-500/30 rounded-lg text-gray-300 hover:bg-white/10 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
                  >
                    Previous
                  </button>
                  
                  {Array.from({ length: Math.min(5, pagination.pages) }, (_, i) => {
                    let pageNum;
                    if (pagination.pages <= 5) {
                      pageNum = i + 1;
                    } else if (pagination.current <= 3) {
                      pageNum = i + 1;
                    } else if (pagination.current >= pagination.pages - 2) {
                      pageNum = pagination.pages - 4 + i;
                    } else {
                      pageNum = pagination.current - 2 + i;
                    }
                    
                    return (
                      <button
                        key={pageNum}
                        onClick={() => setPagination(prev => ({ ...prev, current: pageNum }))}
                        className={`px-4 py-2 rounded-lg transition-all duration-300 ${
                          pagination.current === pageNum
                            ? 'bg-purple-600 text-white'
                            : 'bg-white/5 border border-gray-500/30 text-gray-300 hover:bg-white/10'
                        }`}
                      >
                        {pageNum}
                      </button>
                    );
                  })}
                  
                  <button
                    onClick={() => setPagination(prev => ({ ...prev, current: Math.min(pagination.pages, prev.current + 1) }))}
                    disabled={pagination.current === pagination.pages}
                    className="px-4 py-2 bg-white/5 border border-gray-500/30 rounded-lg text-gray-300 hover:bg-white/10 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
                  >
                    Next
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default AllItems;
