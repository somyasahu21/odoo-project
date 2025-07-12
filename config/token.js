// src/config/token.js

import jwt from "jsonwebtoken";

/**
 * Generate JWT token for user authentication.
 * @param {string} userId - MongoDB user ID
 * @returns {string} JWT token
 */
export const genToken = (userId) => {
  try {
    const token = jwt.sign(
      { id: userId },                      
      process.env.JWT_SECRET,            
      { expiresIn: "7d" }
    );
    return token;
  } catch (error) {
    console.error("Token generation error:", error.message);
    throw new Error("Failed to generate token");
  }
}

export const genToken1 = (email) => {
  try {
    const token = jwt.sign(
      { email},                      
      process.env.JWT_SECRET,            
      { expiresIn: "7d" }
    );
    return token;
  } catch (error) {
    console.error("Token generation error:", error.message);
    throw new Error("Failed to generate token");
  }
};
