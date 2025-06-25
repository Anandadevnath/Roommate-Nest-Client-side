import React, { useEffect, useState, useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext'; 
import { useNavigate } from 'react-router-dom';
import NavBar from './NavBar/NavBar';
import Swal from 'sweetalert2';

function MyList() {
  const { user } = useContext(AuthContext);
  const [myListings, setMyListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user?.email) return;
    fetch(`https://backend-five-pied-99.vercel.app/my-listings?email=${user.email}`)
      .then(res => res.json())
      .then(data => {
        setMyListings(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [user]);

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: "This listing will be permanently deleted!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!',
      background: '#1e293b',
      color: '#fff'
    });
    if (result.isConfirmed) {
      const res = await fetch(`https://backend-five-pied-99.vercel.app/roommates/${id}`, { method: 'DELETE' });
      if (res.ok) {
        setMyListings(myListings.filter(item => item._id !== id));
        Swal.fire({
          title: 'Deleted!',
          text: 'Your listing has been deleted.',
          icon: 'success',
          background: '#1e293b',
          color: '#fff',
          timer: 1500,
          showConfirmButton: false
        });
      }
    }
  };

  const handleUpdate = (id) => {
    navigate(`/update/${id}`);
  };

  return (
    <>
      <NavBar />
      <div className="container mx-auto px-2 sm:px-4 py-10 mt-16">
        <h2 className="text-3xl sm:text-4xl font-extrabold mb-8 text-center text-white roomate">My Roommate Listings</h2>
        {loading ? (
          <div className="text-center text-white text-lg">Loading...</div>
        ) : myListings.length === 0 ? (
          <div className="text-center text-gray-400 text-lg">No listings found.</div>
        ) : (
          <>
            {/* Desktop Table */}
            <div className="hidden md:block overflow-x-auto">
              <table className="min-w-full bg-[#1e293b] shadow-xl rounded-2xl overflow-hidden border border-gray-700">
                <thead>
                  <tr className="text-left text-gray-300 uppercase text-sm bg-[#0f172a] border-b border-gray-700">
                    <th className="py-4 px-5">Title</th>
                    <th className="py-4 px-5">Location</th>
                    <th className="py-4 px-5">Rent</th>
                    <th className="py-4 px-5">Room Type</th>
                    <th className="py-4 px-5">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {myListings.map((item, idx) => (
                    <tr
                      key={item._id}
                      className={`transition duration-200 ${
                        idx % 2 === 0 ? 'bg-[#1e293b]' : 'bg-[#273449]'
                      } hover:bg-[#334155]`}
                    >
                      <td className="py-4 px-5 border-b border-gray-700 text-white font-semibold">{item.title}</td>
                      <td className="py-4 px-5 border-b border-gray-700 text-gray-300">{item.location}</td>
                      <td className="py-4 px-5 border-b border-gray-700 text-blue-400">${item.rent}/month</td>
                      <td className="py-4 px-5 border-b border-gray-700 text-gray-300">{item.roomType}</td>
                      <td className="py-4 px-5 border-b border-gray-700">
                        <div className="flex gap-3">
                          <button
                            className="px-4 py-1.5 rounded-lg bg-yellow-500 hover:bg-yellow-600 text-white font-semibold shadow-md transition duration-150"
                            onClick={() => handleUpdate(item._id)}
                          >
                            Update
                          </button>
                          <button
                            className="px-4 py-1.5 rounded-lg bg-red-600 hover:bg-red-700 text-white font-semibold shadow-md transition duration-150"
                            onClick={() => handleDelete(item._id)}
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

            {/* Mobile Cards */}
            <div className="md:hidden flex flex-col gap-4">
              {myListings.map((item) => (
                <div key={item._id} className="bg-[#1e293b] rounded-xl shadow p-4 flex flex-col gap-2">
                  <div className="flex justify-between items-center">
                    <div>
                      <div className="font-semibold text-lg text-white">{item.title}</div>
                      <div className="text-sm text-gray-400">{item.location}</div>
                    </div>
                    <span className="text-xs bg-blue-600 text-white px-2 py-1 rounded">{item.roomType}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <div className="text-blue-400 font-bold">${item.rent}/month</div>
                  </div>
                  <div className="flex gap-2 mt-2">
                    <button
                      className="flex-1 px-3 py-2 rounded-lg bg-yellow-500 hover:bg-yellow-600 text-white font-semibold shadow-md transition"
                      onClick={() => handleUpdate(item._id)}
                    >
                      Update
                    </button>
                    <button
                      className="flex-1 px-3 py-2 rounded-lg bg-red-600 hover:bg-red-700 text-white font-semibold shadow-md transition"
                      onClick={() => handleDelete(item._id)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </>
  );
}

export default MyList;