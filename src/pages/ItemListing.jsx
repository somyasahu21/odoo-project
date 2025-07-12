import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

function ItemListing() {
  const { id } = useParams();
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`http://localhost:8000/api/product/${id}`)
      .then((res) => {
        setItem(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error fetching item:', err);
        setLoading(false);
      });
  }, [id]);

  if (loading) return <div className="text-center py-10">Loading...</div>;
  if (!item) return <div className="text-center text-red-500 py-10">Item not found.</div>;

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      {/* Item Display */}
      <div className="flex flex-col md:flex-row gap-6 bg-white p-6 rounded-lg shadow-md">
        {/* Left: Main Product Image */}
        <div className="md:w-1/2 flex items-center justify-center">
          <img
            src={item.image1 || "https://via.placeholder.com/500x400"}
            alt={item.name}
            className="w-full h-auto rounded-lg object-cover max-h-[400px]"
          />
        </div>

        {/* Right: Product Info */}
        <div className="md:w-1/2 space-y-4">
          <h1 className="text-3xl font-bold text-green-700">{item.name}</h1>
          <p className="text-gray-700">Category: <span className="font-semibold">{item.category}</span></p>
          <p className="text-gray-700">Subcategory: <span className="font-semibold">{item.subCategory}</span></p>
          <p className="text-gray-700">Size: <span className="font-semibold">{item.size || 'N/A'}</span></p>
          <p className="text-gray-700">Condition: <span className="font-semibold">{item.condition || 'Good'}</span></p>
          <p className="text-gray-700 font-semibold text-lg">Price: ₹{item.price}</p>
          <p className="text-gray-600">{item.description}</p>

          <button className="bg-green-600 text-white px-6 py-2 rounded-md hover:bg-green-700 transition">
            Request Swap
          </button>
        </div>
      </div>

      {/* Lower: Related/Additional Images */}
      <div className="mt-10">
        <h2 className="text-xl font-semibold mb-4">More Images</h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {[item.image1, item.image2, item.image3, item.image4]
            .filter((img) => img)
            .map((img, i) => (
              <img
                key={i}
                src={img}
                alt={`Image ${i + 1}`}
                className="w-full h-40 object-cover rounded-lg border"
              />
            ))}
        </div>
      </div>
    </div>
  );
}

export default ItemListing;
