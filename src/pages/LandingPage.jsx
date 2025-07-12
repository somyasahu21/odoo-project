import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import heroImg from '../assets/hero.jpg';
import ProductCard from '../components/ProductCard';
import axios from 'axios';

function LandingPage() {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get('http://localhost:8000/api/product/list') // Update if needed
      .then((res) => setProducts(res.data))
      .catch((err) => console.error("Fetch error:", err));
  }, []);

  return (
    <div className="text-gray-800 font-sans bg-gray-50 min-h-screen">

      {/* Hero Section with Title + CTA */}
      <section className="relative w-full h-[400px] md:h-[500px] overflow-hidden">
        <img src={heroImg} alt="Hero" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-black bg-opacity-30 flex flex-col justify-center items-center text-center px-4">
          <h1 className="text-3xl md:text-5xl font-bold text-white mb-4">
            Swap Smarter. Live Greener.
          </h1>
          <p className="text-white text-lg md:text-xl mb-6 max-w-2xl">
            Discover the future of sustainable fashion. Join a community that swaps instead of shops.
          </p>
          <button
            onClick={() => navigate('/signup')}
            className="bg-green-600 hover:bg-green-700 text-white font-semibold px-6 py-3 rounded-md shadow-md transition-all duration-300"
          >
            Get Started
          </button>
        </div>
      </section>

      {/* Categories */}
      <section className="py-10 px-6 md:px-20">
        <h2 className="text-2xl font-bold mb-6">Browse by Category</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
          {['Tops', 'Bottoms', 'Shoes', 'Accessories', 'Kids', 'Winter Wear'].map((cat) => (
            <div
              key={cat}
              className="bg-white border rounded-lg py-6 text-center shadow hover:shadow-md cursor-pointer transition"
            >
              {cat}
            </div>
          ))}
        </div>
      </section>

      {/* Product Listings */}
      <section className="py-10 px-6 md:px-20 bg-white">
        <h2 className="text-2xl font-bold mb-6">Featured Listings</h2>
        {products.length === 0 ? (
          <p className="text-gray-500">No items listed yet.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {products.slice(0, 8).map((item) => (
              <ProductCard key={item._id} product={item} />
            ))}
          </div>
        )}
      </section>

      {/* Footer */}
      <footer className="bg-green-100 text-center py-6 text-sm text-gray-600 mt-10">
        &copy; {new Date().getFullYear()} Reware – A sustainable clothing community.
      </footer>
    </div>
  );
}

export default LandingPage;
