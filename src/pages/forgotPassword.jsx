import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function ForgotPassword() {

    const navigate = useNavigate();

    const [email, setEmail] = useState("");

    const handleSendOtp = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post(
                `${import.meta.env.VITE_API_URL}/api/auth/forgot-password`,
                { email }
            );

            // alert("Password reset OTP sent to email");

            navigate("/reset-password", { state: { 
                email,
                receivedOtp: response.data.otp
            } });

        } catch (error) {
            alert("Failed to send OTP");
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">

            <form
                onSubmit={handleSendOtp}
                className="bg-white p-8 rounded-xl shadow-md w-96"
            >

                <h2 className="text-xl font-bold mb-6 text-center">
                    Forgot Password
                </h2>

                <input
                    type="email"
                    placeholder="Enter your email"
                    className="w-full mb-4 px-4 py-2 border rounded-lg"
                    onChange={(e) => setEmail(e.target.value)}
                />

                <button
                    className="w-full bg-black text-white py-2 rounded-lg cursor-pointer"
                >
                    Send OTP
                </button>

            </form>

        </div>
    );
}

export default ForgotPassword;