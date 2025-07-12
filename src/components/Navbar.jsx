import React, { useState, useRef, useEffect, useContext } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  IoSearch, IoHomeOutline, IoInformationCircleOutline,
  IoCalendarOutline, IoPersonCircleOutline
} from 'react-icons/io5';
import { FaCircleUser } from 'react-icons/fa6';
import logo from '../assets/logo.png';
import { userDataContext } from '../context/UserContext';
import { AuthDataContext } from '../context/AuthContext';
import axios from 'axios';

function Navbar() {
  const [isDark, setIsDark] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [search, setSearch] = useState('');
  const inputRef = useRef();
  const profileRef = useRef();
  const searchRef = useRef();
  const navigate = useNavigate();
  const location = useLocation();

  const { userData, setUserdata } = useContext(userDataContext);
  const { serverUrl } = useContext(AuthDataContext);

  const navLinks = [
    { name: 'home', icon: <IoHomeOutline size={24} />, path: '/home' },
    { name: 'dashboard', icon: <IoCalendarOutline size={24} />, path: '/dashboard' },
    { name: 'add', icon: <IoInformationCircleOutline size={24} />, path: '/product/new' },
  ];

  useEffect(() => {
    function handleClickOutside(event) {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setShowProfile(false);
      }
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowSearch(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    if (showSearch && inputRef.current) {
      inputRef.current.focus();
    }
  }, [showSearch]);

  const handleLogout = async () => {
    try {
      await axios.get(`${serverUrl}/api/auth/logout`, { withCredentials: true });
      setUserdata(null);
      navigate('/login');
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const textColor = isDark ? 'text-white' : 'text-black';
  const bgColor = isDark ? 'bg-[#1a1a1a]' : 'bg-[#ecfafa]';

  return (
    <>
      <header className={`fixed top-0 left-0 w-full h-[70px] ${bgColor} shadow-md flex items-center justify-between px-6 md:px-10 z-50 transition-all duration-300`}>
        {/* Logo */}
        <div className="flex items-center gap-3 cursor-pointer" onClick={() => navigate('/home')}>
          <img src={logo} alt="Logo" className="w-8" />
          <h1 className={`text-xl font-bold ${textColor}`}>Reware</h1>
        </div>

        {/* Desktop Nav */}
        <nav className="hidden md:flex">
          <ul className="flex gap-6">
            {navLinks.map(({ name, path }) => {
              const isActive = location.pathname === path;
              return (
                <li
                  key={name}
                  className={`uppercase text-sm px-4 py-2 rounded-full cursor-pointer transition-all duration-200 
                    ${textColor}
                    ${isActive ? 'bg-green-600 text-white' : 'hover:bg-gray-300/40'}`}
                  onClick={() => navigate(path)}
                >
                  {name}
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Icons */}
        <div className="flex items-center gap-4 relative">
          {/* Search */}
          <div ref={searchRef}>
            <IoSearch
              className={`w-7 h-7 cursor-pointer ${textColor}`}
              onClick={() => setShowSearch(!showSearch)}
            />
          </div>

          {/* Theme Toggle */}
          <div
            onClick={() => setIsDark(!isDark)}
            className={`w-7 h-7 flex items-center justify-center rounded-full border cursor-pointer ${isDark ? 'border-white text-white' : 'border-black text-black'}`}
          >
            {isDark ? '🌙' : '☀️'}
          </div>

          {/* Profile */}
          <div ref={profileRef}>
            {userData ? (
              <div
                onClick={() => setShowProfile(!showProfile)}
                className="w-8 h-8 bg-green-600 text-white rounded-full flex items-center justify-center cursor-pointer uppercase font-bold"
              >
                {userData.name?.charAt(0)}
              </div>
            ) : (
              <FaCircleUser
                className={`w-7 h-7 cursor-pointer ${textColor}`}
                onClick={() => setShowProfile(!showProfile)}
              />
            )}
          </div>
        </div>

        {/* Search Input */}
        {showSearch && (
          <div className="absolute top-[70px] left-0 w-full bg-white dark:bg-[#222] py-4 px-6 z-50">
            <div className="w-full flex justify-center">
              <div className="relative w-full md:w-1/3">
                <input
                  ref={inputRef}
                  type="text"
                  placeholder="Search..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 rounded-full bg-[#233533] text-white placeholder-gray-300 focus:outline-none"
                />
                <IoSearch className="absolute left-3 top-2.5 text-white" />
              </div>
            </div>
          </div>
        )}

        {/* Profile Dropdown */}
        {showProfile && (
          <div className="absolute top-[70px] right-6 w-[200px] bg-black border border-gray-500 rounded-lg shadow-lg z-50 animate-fadeIn">
            <ul className="flex flex-col py-3 text-white text-sm">
              <li className="px-4 py-2 hover:bg-gray-700 cursor-pointer" onClick={() => { navigate('/home'); setShowProfile(false); }}>Home</li>
              <li className="px-4 py-2 hover:bg-gray-700 cursor-pointer" onClick={() => { navigate('/dashboard'); setShowProfile(false); }}>Browse</li>
              {!userData ? (
                <>
                  <li className="px-4 py-2 hover:bg-gray-700 cursor-pointer" onClick={() => { navigate('/login'); setShowProfile(false); }}>Login</li>
                  <li className="px-4 py-2 hover:bg-gray-700 cursor-pointer" onClick={() => { navigate('/signup'); setShowProfile(false); }}>Signup</li>
                </>
              ) : (
                <li className="px-4 py-2 hover:bg-gray-700 cursor-pointer text-red-500" onClick={handleLogout}>Logout</li>
              )}
            </ul>
          </div>
        )}
      </header>

      {/* Bottom Nav for Mobile */}
      <nav className={`fixed bottom-0 left-0 w-full bg-white dark:bg-[#1a1a1a] border-t border-gray-300 dark:border-gray-700 flex justify-around items-center py-2 z-50 md:hidden`}>
        {[...navLinks, { name: 'login', icon: <IoPersonCircleOutline size={24} />, path: '/login' }].map(({ name, icon, path }) => {
          const isActive = location.pathname === path;
          return (
            <button
              key={name}
              onClick={() => navigate(path)}
              className={`flex flex-col items-center text-xs transition-colors duration-200 ${isActive ? 'text-green-600 dark:text-green-400' : 'text-gray-600 dark:text-gray-400'}`}
            >
              <div className="text-2xl mb-1">{icon}</div>
              <span className="uppercase font-semibold">{name}</span>
            </button>
          );
        })}
      </nav>
    </>
  );
}

export default Navbar;
