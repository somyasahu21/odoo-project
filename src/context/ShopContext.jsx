import React, { createContext, useContext, useEffect, useState } from 'react';
import { AuthDataContext } from './AuthContext';
import { userDataContext } from './UserContext';
import axios from 'axios';
import { toast } from 'react-toastify';

export const ShopDataContext = createContext();

function ShopContext({ children }) {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState('');
  const [showSearch, setShowSearch] = useState(false);
  const [cartItem, setCartItem] = useState([]);
  const [loading, setLoading] = useState(false);

  const { serverUrl } = useContext(AuthDataContext);
  const { userData } = useContext(userDataContext);

  const currency = 'Rs';
  const registration_fees = 10;

  // Fetch products
  const getProduct = async () => {
    try {
      const result = await axios.get(`${serverUrl}/api/product/list`);
      setProducts(result.data);
    } catch (error) {
      console.error("Error fetching products:", error.message);
    }
  };

  // Add item to cart
  const addtoCart = async (itemId, member) => {
    if (!member) {
      console.warn("Please select a member size before adding to cart.");
      return;
    }

    let cartData = structuredClone(cartItem);

    if (cartData[itemId]) {
      if (cartData[itemId][member]) {
        cartData[itemId][member] += 1;
      } else {
        cartData[itemId][member] = 1;
      }
    } else {
      cartData[itemId] = {};
      cartData[itemId][member] = 1;
    }

    setCartItem(cartData); // Update locally first

    if (userData) {
      setLoading(true);
      try {
        await axios.post(
          `${serverUrl}/api/cart/add`,
          { itemId, member },
          { withCredentials: true }
        );
      } catch (error) {
        console.error("Error adding to cart:", error.message);
        toast.error(error.message);
      } finally {
        setLoading(false);
      }
    }
  };

  // Fetch user's cart from backend
  const getUserCart = async () => {
    if (!userData) return;

    try {
      const result = await axios.get(`${serverUrl}/api/cart/get`, {}, { withCredentials: true });
      setCartItem(result.data);
    } catch (error) {
      console.error("Error fetching user cart:", error.message);
      toast.error(error.message);
    }
  };

  // Update quantity
  const updateQuantity = async (itemId, member, quantity) => {
    let cartData = structuredClone(cartItem);
    cartData[itemId][member] = quantity;
    setCartItem(cartData);

    if (userData) {
      try {
        await axios.post(`${serverUrl}/api/cart/update`, { itemId, member, quantity }, { withCredentials: true });
      } catch (error) {
        console.error("Error updating cart:", error.message);
        toast.error(error.message);
      }
    }
  };

  // Get total item count
  const getCartCount = () => {
    let totalCount = 0;
    for (const itemId in cartItem) {
      for (const member in cartItem[itemId]) {
        try {
          if (cartItem[itemId][member] > 0) {
            totalCount += cartItem[itemId][member];
          }
        } catch (error) {
          console.error("Cart count error:", error);
        }
      }
    }
    return totalCount;
  };

  // Get total cart amount
  const getCartAmount = () => {
    let totalAmount = 0;
    for (const itemId in cartItem) {
      const product = products.find((p) => p._id === itemId);
      if (!product) continue;

      for (const member in cartItem[itemId]) {
        const qty = cartItem[itemId][member];
        if (qty > 0) {
          totalAmount += product.price * qty;
        }
      }
    }
    return totalAmount;
  };

  // Load products and cart on mount
  useEffect(() => {
    getProduct();
  }, []);

  useEffect(() => {
    getUserCart();
  }, [userData]); // 🧠 Only fetch cart if userData changes

  const value = {
    products,
    currency,
    registration_fees,
    getProduct,
    search,
    setSearch,
    showSearch,
    setShowSearch,
    cartItem,
    setCartItem,
    addtoCart,
    getCartCount,
    loading,
    updateQuantity,
    getCartAmount,
  };

  return (
    <ShopDataContext.Provider value={value}>
      {children}
    </ShopDataContext.Provider>
  );
}

export default ShopContext;
