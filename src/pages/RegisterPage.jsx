import React, { useContext, useState } from 'react';
import Logo from "../assets/logo.png";
import { useNavigate } from 'react-router-dom';
import google from "../assets/google.png";
import { IoEyeOutline, IoEye } from "react-icons/io5";
import { AuthDataContext } from '../context/AuthContext';
import axios from 'axios';
import { signInWithPopup } from 'firebase/auth';
import { auth, provider } from '../../utils/Firebase';

function Registration() {
  const [show, setShow] = useState(false);
  const { serverUrl } = useContext(AuthDataContext);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const result = await axios.post(
        `${serverUrl}/api/auth/registration`,
        { name, email, password },
        { withCredentials: true }
      );
      console.log(result.data);
      setSuccessMsg("Registration successful!");
      setErrorMsg("");
      // Optional: clear form
      setName(""); setEmail(""); setPassword("");
      // Optional: redirect to login
      // navigate("/login");
    } catch (error) {
      setErrorMsg(error?.response?.data?.message || "Registration failed.");
      setSuccessMsg("");
    }
  };

  const googleSignup = async (params) => {
    try {
      const response = await signInWithPopup(auth,provider)
      let user = response.user
      let name = user.displayName;
      let email = user.email

      const result = await axios.post(serverUrl + "/api/auth/googleLogin",{name , email 
      },{withCredentials:true})
      console.log(result.data)
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <div className='w-[100vw] h-[100vh] bg-gradient-to-l from-[#141414] to-[#0c2025] text-white flex flex-col items-center justify-start'>
      
      {/* Header */}
      <div
        className='w-full h-[80px] flex items-center justify-start px-[30px] gap-[10px] cursor-pointer'
        onClick={() => navigate("/home")}
      >
        <img className='w-[40px]' src={Logo} alt="Logo" />
        <h1 className='text-[22px] font-sans'>Evently</h1>
      </div>

      {/* Intro */}
      <div className='w-full h-[100px] flex flex-col items-center justify-center gap-[10px] text-center'>
        <span className='text-[25px] font-semibold'>Registration Page</span>
        <span className='text-[16px]'>Welcome to ReWare, Community Clothing Exchange</span>
      </div>

      {/* Registration Card */}
      <div className='max-w-[600px] w-[90%] h-[500px] bg-[#00000025] border border-[#96969635] backdrop-blur-2xl rounded-lg shadow-lg flex items-center justify-center'>
        <form onSubmit={handleSignup} className='w-[90%] h-[90%] flex flex-col items-center justify-start gap-[20px] relative'>

          {/* Google Sign-up (non-functional placeholder) */}
          <div className='w-[90%] h-[50px] bg-[#42656cae] rounded-lg flex items-center justify-center gap-[10px] py-[20px] cursor-pointer' onClick={googleSignup}>
            <img src={google} alt="Google Logo" className='w-[20px]' />
            Registration with Google
          </div>

          {/* OR Divider */}
          <div className='w-[100%] h-[20px] flex items-center justify-center gap-[10px]'>
            <div className='w-[40%] h-[1px] bg-[#96969635]'></div>
            OR
            <div className='w-[40%] h-[1px] bg-[#96969635]'></div>
          </div>

          {/* Inputs */}
          <div className='w-[90%] flex flex-col items-center justify-center gap-[15px] relative'>
            <input
              type="text"
              className='w-full h-[50px] border-2 border-[#96969635] backdrop-blur-sm rounded-lg shadow-lg bg-transparent placeholder-[#ffffffc7] px-[20px] font-semibold'
              placeholder='UserName'
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <input
              type="email"
              className='w-full h-[50px] border-2 border-[#96969635] backdrop-blur-sm rounded-lg shadow-lg bg-transparent placeholder-[#ffffffc7] px-[20px] font-semibold'
              placeholder='Email'
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <div className='w-full relative'>
              <input
                type={show ? "text" : "password"}
                className='w-full h-[50px] border-2 border-[#96969635] backdrop-blur-sm rounded-lg shadow-lg bg-transparent placeholder-[#ffffffc7] px-[20px] font-semibold'
                placeholder='Password'
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
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

            {/* Success / Error Messages */}
            {errorMsg && <p className="text-red-400 text-sm">{errorMsg}</p>}
            {successMsg && <p className="text-green-400 text-sm">{successMsg}</p>}

            {/* Submit Button */}
            <button
              type="submit"
              className='w-full h-[50px] bg-[#6060f5] rounded-lg flex items-center justify-center mt-[10px] text-[17px] font-semibold cursor-pointer'
            >
              Register
            </button>

            {/* Login Redirect */}
            <p className='flex gap-[10px] text-[14px]'>
              Already have an account?
              <span
                className='text-[#5555f6cf] font-semibold cursor-pointer'
                onClick={() => navigate("/login")}
              >
                Login
              </span>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Registration;
