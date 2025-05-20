import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import { FaLock, FaKey } from "react-icons/fa";
import { colors } from "../Constants/Colors";
import ApiService from "../Services/ApiService";
import { FaHome } from "react-icons/fa";

const ChangePassword = () => {
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [focusedField, setFocusedField] = useState({ password: false, confirmPassword: false });
    const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
    const [loading, setLoading] = useState(false);

    const location = useLocation();
    const navigate = useNavigate();

    const email = location.state?.email ? location.state.email : localStorage.getItem("userEmail");

    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth < 768);
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            toast.error("Passwords do not match!");
            return;
        }

        setLoading(true);
        try {
            if (!email) {
                toast.error("Email not found. Please try again.");
                return;
            }
            const response = await ApiService.resetPassword(email, password);
            if (response.success) {
                toast.success("Password changed successfully!");
                navigate("/");
            } else {
                toast.error("Failed to change password. Please try again.");
            }
        } catch (error) {
            console.error("Error changing password:", error);
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
                className="flex flex-col md:flex-row w-full max-w-4xl rounded-xl overflow-hidden shadow-2xl"
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
                            <FaKey className="text-white text-xl" />
                        </motion.div>
                    </div>

                    <h2 className="text-3xl font-bold mb-2 text-center" style={{ color: colors.primary }}>
                        Change Password
                    </h2>
                    <p className="text-gray-500 text-center mb-8">Set your new password</p>

                    <form onSubmit={handleSubmit}>
                        {/* New Password */}
                        <div className="relative mb-6">
                            <FaLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                            <input
                                type="password"
                                id="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                onFocus={() => setFocusedField(prev => ({ ...prev, password: true }))}
                                onBlur={() => !password && setFocusedField(prev => ({ ...prev, password: false }))}
                                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-opacity-50 transition-all duration-200"
                                style={{ borderColor: focusedField.password ? colors.primary : "#d1d5db" }}
                                required
                            />
                            <label
                                htmlFor="password"
                                className={`absolute left-10 transition-all duration-200 pointer-events-none ${focusedField.password || password
                                    ? "top-0 text-xs bg-white px-1 -mt-3"
                                    : "top-3.5 text-gray-400"
                                    }`}
                                style={{ color: focusedField.password || password ? colors.primary : "inherit" }}
                            >
                                New Password
                            </label>
                        </div>

                        {/* Confirm Password */}
                        <div className="relative mb-6">
                            <FaLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                            <input
                                type="password"
                                id="confirmPassword"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                onFocus={() => setFocusedField(prev => ({ ...prev, confirmPassword: true }))}
                                onBlur={() => !confirmPassword && setFocusedField(prev => ({ ...prev, confirmPassword: false }))}
                                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-opacity-50 transition-all duration-200"
                                style={{ borderColor: focusedField.confirmPassword ? colors.primary : "#d1d5db" }}
                                required
                            />
                            <label
                                htmlFor="confirmPassword"
                                className={`absolute left-10 transition-all duration-200 pointer-events-none ${focusedField.confirmPassword || confirmPassword
                                    ? "top-0 text-xs bg-white px-1 -mt-3"
                                    : "top-3.5 text-gray-400"
                                    }`}
                                style={{ color: focusedField.confirmPassword || confirmPassword ? colors.primary : "inherit" }}
                            >
                                Confirm Password
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
                            {loading ? "Changing..." : "Change Password"}
                        </motion.button>
                    </form>
                </motion.div>

                {/* Right Banner Section */}
                <motion.div
                    initial={isMobile ? { opacity: 0 } : { x: 50, opacity: 0 }}
                    animate={isMobile ? { opacity: 1 } : { x: 0, opacity: 1 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                    className="md:w-1/2 p-8 md:p-10 flex flex-col justify-center items-center text-center relative"
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
                            Stay Secure
                        </h1>
                        <p className="mb-6 text-lg md:text-xl" style={{ color: "rgba(255,255,255,0.8)" }}>
                            Create a strong password to protect your account.
                        </p>
                        <motion.button
                            whileHover={{ scale: 1.05, rotate: 1 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => navigate("/")}
                            className="flex items-center justify-center gap-2 py-3 px-6 rounded-lg transition-all duration-200 shadow-md mx-auto"
                            style={{
                                backgroundColor: colors.white,
                                color: colors.primary,
                            }}
                        >
                            <FaHome /> Back to Home
                        </motion.button>

                    </motion.div>
                </motion.div>
            </motion.div>
        </div>
    );
};

export default ChangePassword;
