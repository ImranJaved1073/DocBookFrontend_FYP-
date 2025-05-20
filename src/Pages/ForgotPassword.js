import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import { FaEnvelopeOpenText } from "react-icons/fa";
import { colors } from "../Constants/Colors";
import ApiService from "../Services/ApiService";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [focused, setFocused] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  const navigate = useNavigate();

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await ApiService.verifyEmail(email);
      if (response.success) {
        toast.success("Email verified successfully!");
        navigate("/change-password", { state: { email } });
      } else {
        toast.error("Email verification failed. Please try again.");
      }
    } catch (error) {
      console.error("Error verifying email:", error);
      toast.error("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gray-50">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="flex flex-col md:flex-row sm:w-full w-13/20 sm:max-w-md md:max-w-3xl lg:max-w-4xl rounded-xl overflow-hidden shadow-2xl"
      >
        {/* Form Section */}
        <motion.div
          initial={isMobile ? { opacity: 1 } : { x: -50, opacity: 0 }}
          animate={isMobile ? { opacity: 1 } : { x: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="md:w-1/2 p-8 md:p-10 bg-white"
        >
          <div className="flex justify-center mb-6">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.4 }}
              className="w-16 h-16 rounded-full flex items-center justify-center"
              style={{ backgroundColor: colors.primary }}
            >
              <FaEnvelopeOpenText className="text-white text-xl" />
            </motion.div>
          </div>

          <h2 className="text-3xl font-bold mb-2 text-center" style={{ color: colors.primary }}>
            Forgot Password
          </h2>
          <p className="text-gray-500 text-center mb-8">Enter your email to verify</p>

          <form onSubmit={handleSubmit}>
            <div className="relative mb-6">
              <FaEnvelopeOpenText className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onFocus={() => setFocused(true)}
                onBlur={() => !email && setFocused(false)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-opacity-50 transition-all duration-200"
                style={{ borderColor: focused ? colors.primary : "#d1d5db" }}
                required
              />
              <label
                htmlFor="email"
                className={`absolute left-10 transition-all duration-200 pointer-events-none ${
                  focused || email ? "top-0 text-xs bg-white px-1 -mt-3" : "top-3.5 text-gray-400"
                }`}
                style={{ color: focused || email ? colors.primary : "inherit" }}
              >
                Email
              </label>
            </div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              className="w-full py-3 px-4 rounded-lg transition-all duration-200 shadow-md flex items-center justify-center gap-2"
              style={{
                backgroundColor: colors.primary,
                color: colors.white,
              }}
              disabled={loading}
            >
              {loading ? "Verifying..." : "Verify Email"}
            </motion.button>
          </form>
        </motion.div>

        {/* Right Banner Section */}
        <motion.div
  initial={{ x: 50, opacity: 0 }}
  animate={{ x: 0, opacity: 1 }}
  transition={{ duration: 0.6, delay: 0.4 }}
  className="hidden md:flex md:w-1/2 p-8 md:p-10 flex-col justify-center items-center text-center relative"
  style={{ backgroundColor: colors.primary }}
>

          <div className="absolute top-0 left-0 w-full h-full overflow-hidden opacity-10">
            <div className="absolute top-10 left-10 w-20 h-20 rounded-full bg-white"></div>
            <div className="absolute bottom-10 right-10 w-32 h-32 rounded-full bg-white"></div>
            <div className="absolute top-1/2 left-1/4 w-16 h-16 rounded-full bg-white"></div>
          </div>

          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.6 }}
            className="relative z-10"
          >
            <h1 className="text-3xl md:text-4xl font-bold mb-4" style={{ color: colors.white }}>
              Let’s Reset It
            </h1>
            <p className="mb-6 text-lg md:text-xl" style={{ color: "rgba(255,255,255,0.8)" }}>
              Forgot Password? Reset it now by verifying your email.
            </p>
            <motion.button
              whileHover={{ scale: 1.05, rotate: 1 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate("/login")}
              className="py-3 px-6 rounded-lg transition-all duration-200 shadow-md"
              style={{
                backgroundColor: colors.white,
                color: colors.primary,
              }}
            >
              Back to Login
            </motion.button>
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default ForgotPassword;
