import React, { useContext, useState } from 'react';
import Logo from "../assets/logo.png";
import { useNavigate } from 'react-router-dom';
import google from "../assets/google.png";
import { IoEyeOutline, IoEye } from "react-icons/io5";
import { AuthDataContext } from '../context/AuthContext.jsx'; 
import { userDataContext } from '../context/UserContext.jsx'; 
import axios from 'axios';
import { signInWithPopup } from 'firebase/auth';
import { auth, provider } from '../../utils/Firebase';

function Login() {
  const [show, setShow] = useState(false); 
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { serverUrl } = useContext(AuthDataContext); 
  const { getCurrentUser } = useContext(userDataContext); 
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const result = await axios.post(
        `${serverUrl}/api/auth/login`,
        { email, password },
        { withCredentials: true }
      );
      console.log("Login success:", result.data);
      await getCurrentUser();
      navigate("/home");
    } catch (error) {
      console.error("Login failed:", error.response?.data || error.message);
    }
  };

  const googleLogin = async () => {
    try {
      const response = await signInWithPopup(auth, provider);
      const user = response.user;
      const name = user.displayName;
      const email = user.email;

      const result = await axios.post(
        `${serverUrl}/api/auth/googleLogin`,
        { name, email },
        { withCredentials: true }
      );
      console.log("Google login:", result.data);
      await getCurrentUser(); // ✅ update context
      navigate("/home");
    } catch (error) {
      console.error("Google login error:", error);
    }
  };

  return (
    <div className='w-[100vw] h-[100vh] bg-gradient-to-l from-[#141414] to-[#0c2025] text-white flex flex-col items-center justify-start'>
      {/* Header */}
      <div
        className='w-full h-[80px] flex items-center justify-start px-[30px] gap-[10px] cursor-pointer'
        onClick={() => navigate("/home")}
      >
        <img className='w-[40px]' src={Logo} alt="Logo" />
        <h1 className='text-[22px] font-sans'>Reware</h1>
      </div>

      {/* Intro Text */}
      <div className='w-full h-[100px] flex flex-col items-center justify-center gap-[10px] text-center'>
        <span className='text-[25px] font-semibold'>Login Page</span>
        <span className='text-[16px]'>Welcome to Reware, Community Clothing Exchange</span>
      </div>

      {/* Login Card */}
      <div className='max-w-[600px] w-[90%] h-[500px] bg-[#00000025] border border-[#96969635] backdrop-blur-2xl rounded-lg shadow-lg flex items-center justify-center'>
        <form onSubmit={handleLogin} className='w-[90%] h-[90%] flex flex-col items-center justify-start gap-[20px] relative'>

          {/* Google Button */}
          <div className='w-[90%] h-[50px] bg-[#42656cae] rounded-lg flex items-center justify-center gap-[10px] py-[20px] cursor-pointer' onClick={googleLogin}>
            <img src={google} alt="Google Logo" className='w-[20px]' />
            Registration with Google
          </div>

          {/* OR Line */}
          <div className='w-[100%] h-[20px] flex items-center justify-center gap-[10px]'>
            <div className='w-[40%] h-[1px] bg-[#96969635]'></div>
            OR
            <div className='w-[40%] h-[1px] bg-[#96969635]'></div>
          </div>

          {/* Inputs */}
          <div className='w-[90%] flex flex-col items-center justify-center gap-[15px] relative'>
            <input
              type="email"
              className='w-full h-[50px] border-2 border-[#96969635] backdrop-blur-sm rounded-lg shadow-lg bg-transparent placeholder-[#ffffffc7] px-[20px] font-semibold'
              placeholder='Email'
              required
              onChange={(e) => setEmail(e.target.value)}
              value={email}
            />
            <div className='w-full relative'>
              <input
                type={show ? "text" : "password"}
                className='w-full h-[50px] border-2 border-[#96969635] backdrop-blur-sm rounded-lg shadow-lg bg-transparent placeholder-[#ffffffc7] px-[20px] font-semibold'
                placeholder='Password'
                required
                onChange={(e) => setPassword(e.target.value)}
                value={password}
              />
              {show ? (
                <IoEye
                  className='w-[20px] h-[20px] cursor-pointer absolute right-[15px] top-[15px]'
                  onClick={() => setShow(false)}
                />
              ) : (
                <IoEyeOutline
                  className='w-[20px] h-[20px] cursor-pointer absolute right-[15px] top-[15px]'
                  onClick={() => setShow(true)}
                />
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className='w-full h-[50px] bg-[#6060f5] rounded-lg flex items-center justify-center mt-[20px] text-[17px] font-semibold cursor-pointer'
            >
              Login
            </button>

            {/* Signup Redirect */}
            <p className='flex gap-[10px]'>
              You haven't any account?
              <span
                className='text-[#5555f6cf] text-[17px] font-semibold cursor-pointer'
                onClick={() => navigate("/signup")}
              >
                Create New Account
              </span>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
