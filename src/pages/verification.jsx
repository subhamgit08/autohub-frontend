import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Verification = () => {
    const navigate = useNavigate();
    const [otp, setOtp] = useState(["", "", "", "", "", ""]);
    const inputs = useRef([]);

    const handleChange = (value, index) => {
        if (!/^[0-9]?$/.test(value)) return;

        const newOtp = [...otp];
        newOtp[index] = value;
        setOtp(newOtp);

        if (value && index < 5) {
            inputs.current[index + 1].focus();
        }
    };

    const handleKeyDown = (e, index) => {
        if (e.key === "Backspace" && !otp[index] && index > 0) {
            inputs.current[index - 1].focus();
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const otpValue = otp.join("");

        console.log("OTP Value:", otpValue);
        console.log("OTP Type:", typeof otpValue);
        if (otpValue.length !== 6) {
            alert("Please enter full OTP");
            return;
        }
        try {
            const res = await axios.post(
                `${import.meta.env.VITE_API_URL}/api/auth/verify-otp`,
                { otp: otpValue },
                { withCredentials: true } 
            );

            if (res.data.success) {
                alert("Email verified successfully");
                navigate("/dashboard");
            }

        } catch (error) {
            alert("Not a valid OTP");
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">

            <div className="bg-white shadow-lg rounded-xl p-8 w-95 text-center">

                <h2 className="text-2xl font-semibold mb-2">Verify OTP</h2>
                <p className="text-gray-500 text-sm mb-6">
                    Enter the 6 digit code sent to your phone
                </p>

                <form onSubmit={handleSubmit}>
                    <div className="flex justify-between mb-6">
                        {otp.map((digit, index) => (
                            <input
                                key={index}
                                type="text"
                                maxLength="1"
                                value={digit}
                                ref={(el) => (inputs.current[index] = el)}
                                onChange={(e) => handleChange(e.target.value, index)}
                                onKeyDown={(e) => handleKeyDown(e, index)}
                                className="w-12 h-12 text-center text-xl border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        ))}
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition cursor-pointer"
                    >
                        Verify
                    </button>
                </form>

                <p className="text-sm text-gray-500 mt-4">
                    Didn't receive code?{" "}
                    <span className="text-blue-600 cursor-pointer hover:underline">
                        Resend
                    </span>
                </p>

            </div>

        </div>
    );
};

export default Verification;