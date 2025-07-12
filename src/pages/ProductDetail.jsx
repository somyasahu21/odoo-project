import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ProductCard from '../components/ProductCard';
import placeholderImage from '../assets/upload.png'; // ✅ Add this placeholder in your assets folder

function ProductDetail() {
  const [formData, setFormData] = useState({
    name: '',
    category: '',
    subCategory: '',
    size: '',
    condition: '',
    description: '',
    price: '',
  });

  const [images, setImages] = useState({
    image1: null,
    image2: null,
    image3: null,
    image4: null,
  });

  const [preview, setPreview] = useState({});
  const [previousListings, setPreviousListings] = useState([]);

  useEffect(() => {
    axios
      .get('http://localhost:8000/api/product/myuploads', { withCredentials: true })
      .then((res) => setPreviousListings(res.data))
      .catch((err) => console.error('Failed to load previous listings:', err));
  }, []);

  const handleInputChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleImageChange = (e) => {
    const { name, files } = e.target;
    const file = files[0];
    if (file) {
      setImages(prev => ({ ...prev, [name]: file }));
      setPreview(prev => ({ ...prev, [name]: URL.createObjectURL(file) }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const submissionData = new FormData();

    Object.entries(formData).forEach(([key, value]) => submissionData.append(key, value));
    Object.entries(images).forEach(([key, value]) => {
      if (value) submissionData.append(key, value);
    });

    try {
      await axios.post('http://localhost:8000/api/product/addproduct', submissionData, {
        headers: { 'Content-Type': 'multipart/form-data' },
        withCredentials: true,
      });
      alert('Item uploaded successfully!');

      setFormData({
        name: '',
        category: '',
        subCategory: '',
        size: '',
        condition: '',
        description: '',
        price: '',
      });
      setImages({ image1: null, image2: null, image3: null, image4: null });
      setPreview({});
    } catch (err) {
      console.error(err);
      alert('Upload failed');
    }
  };

  const imageKeys = ['image1', 'image2', 'image3', 'image4'];

  return (
    <div className="max-w-6xl mx-auto p-6 font-sans">
      <h2 className="text-3xl font-bold mb-8 text-green-700">Add Product</h2>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Left Column – Styled Image Upload Section */}
        <div className="bg-white p-4 shadow rounded-lg">
          <h3 className="text-lg font-semibold mb-4 text-gray-800">Upload Images</h3>
          <div className="flex gap-4 flex-wrap">
            {imageKeys.map((key, index) => (
              <label
                key={key}
                htmlFor={key}
                className="w-[90px] h-[90px] md:w-[120px] md:h-[120px] cursor-pointer bg-gray-100 rounded-lg flex items-center justify-center border border-gray-300 hover:border-green-500 transition"
              >
                <img
                  src={preview[key] || placeholderImage}
                  alt={`Preview ${index + 1}`}
                  className={`w-full h-full object-cover rounded-lg border-2 ${
                    preview[key] ? 'border-green-400' : 'border-gray-300 opacity-40'
                  } hover:border-green-600 transition-all duration-200`}
                />
                <input
                  type="file"
                  id={key}
                  name={key}
                  accept="image/*"
                  hidden
                  onChange={handleImageChange}
                />
              </label>
            ))}
          </div>
        </div>

        {/* Right Column – Form */}
        <div className="bg-white p-4 shadow rounded-lg">
          <h3 className="text-lg font-semibold mb-3">Product Details</h3>
          <form onSubmit={handleSubmit} className="space-y-3">
            <input type="text" name="name" placeholder="Product Title" value={formData.name} onChange={handleInputChange} className="w-full border p-2 rounded" required />
            <input type="text" name="category" placeholder="Category" value={formData.category} onChange={handleInputChange} className="w-full border p-2 rounded" required />
            <input type="text" name="subCategory" placeholder="Sub Category" value={formData.subCategory} onChange={handleInputChange} className="w-full border p-2 rounded" required />
            <input type="text" name="size" placeholder="Size (e.g. M, L)" value={formData.size} onChange={handleInputChange} className="w-full border p-2 rounded" required />
            <input type="text" name="condition" placeholder="Condition (e.g. Like New)" value={formData.condition} onChange={handleInputChange} className="w-full border p-2 rounded" required />
            <input type="number" name="price" placeholder="Price" value={formData.price} onChange={handleInputChange} className="w-full border p-2 rounded" required />
            <textarea name="description" placeholder="Description" value={formData.description} onChange={handleInputChange} rows="3" className="w-full border p-2 rounded" />
            <button type="submit" className="w-full bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700">Submit</button>
          </form>
        </div>
      </div>

      {/* Previous Listings */}
      <div className="mt-12">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-semibold">Previous Listings</h3>
          <button className="text-sm text-red-500 underline">Accidentally Wrong?</button>
        </div>
        {previousListings.length === 0 ? (
          <p className="text-gray-500">You haven't listed any items yet.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {previousListings.map(item => (
              <ProductCard key={item._id} product={item} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default ProductDetail;
