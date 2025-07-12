// src/components/ProductCard.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';

function ProductCard({ product }) {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`/listing/${product._id}`)}
      className="bg-white border border-gray-200 rounded-lg p-4 shadow hover:shadow-lg transition cursor-pointer"
    >
      <img
        src={product.image1 || "https://via.placeholder.com/200"}
        alt={product.name}
        className="w-full h-40 object-cover rounded-md mb-3"
      />
      <h4 className="font-semibold text-lg truncate">{product.name}</h4>
      <p className="text-sm text-gray-600">
        Size: {product.size || 'N/A'} • {product.condition || 'Good'}
      </p>
      <p className="text-green-700 font-semibold mt-2">₹{product.price}</p>
    </div>
  );
}

export default ProductCard;
