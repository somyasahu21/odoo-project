import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ProductCard from '../components/ProductCard';

function Dashboard() {
  const [user, setUser] = useState(null);
  const [myItems, setMyItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('listings');

  // Fetch user info
  useEffect(() => {
    axios
      .get('http://localhost:8000/api/auth/me', { withCredentials: true })
      .then((res) => setUser(res.data))
      .catch((err) => console.error("User fetch error:", err));
  }, []);

  // Fetch user listings
  useEffect(() => {
    if (activeTab === 'listings') {
      setLoading(true);
      axios
        .get('http://localhost:8000/api/product/myuploads', { withCredentials: true })
        .then((res) => {
          setMyItems(res.data);
          setLoading(false);
        })
        .catch((err) => {
          console.error('Error loading uploads:', err);
          setLoading(false);
        });
    }
  }, [activeTab]);

  return (
    <div className="max-w-7xl mx-auto px-6 py-10 font-sans">
      <h1 className="text-4xl font-bold mb-6 text-green-700">My Dashboard</h1>

      {/* User Info */}
      <div className="flex items-center gap-6 mb-10 p-6 bg-white rounded shadow">
        {/* Avatar */}
        <div className="w-16 h-16 rounded-full bg-green-600 text-white flex items-center justify-center text-2xl font-bold uppercase">
          {user?.name?.charAt(0)}
        </div>
        {/* Details */}
        <div>
          <h2 className="text-xl font-semibold">{user?.name || 'User Name'}</h2>
          <p className="text-gray-500">{user?.email}</p>
        </div>
      </div>

      {/* Tab Selector */}
      <div className="flex space-x-6 mb-8 border-b border-gray-200">
        <button
          className={`pb-2 text-lg font-medium ${
            activeTab === 'listings'
              ? 'border-b-4 border-green-500 text-green-600'
              : 'text-gray-500 hover:text-green-600'
          }`}
          onClick={() => setActiveTab('listings')}
        >
          My Listings
        </button>
        <button
          className={`pb-2 text-lg font-medium ${
            activeTab === 'purchases'
              ? 'border-b-4 border-green-500 text-green-600'
              : 'text-gray-500 hover:text-green-600'
          }`}
          onClick={() => setActiveTab('purchases')}
        >
          My Purchases
        </button>
      </div>

      {/* Tab Content */}
      {activeTab === 'listings' && (
        <div>
          {loading ? (
            <p className="text-gray-500">Loading your listings...</p>
          ) : myItems.length === 0 ? (
            <p className="text-gray-600">You haven't uploaded any products yet.</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
              {myItems.map((item) => (
                <ProductCard key={item._id} product={item} />
              ))}
            </div>
          )}
        </div>
      )}

      {activeTab === 'purchases' && (
        <div className="text-gray-600 text-center mt-8">
          <p>🛍️ Your purchased items will appear here in the future.</p>
        </div>
      )}
    </div>
  );
}

export default Dashboard;
