import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";

function ResetPassword() {

    const navigate = useNavigate();
    const location = useLocation();

    const email = location.state?.email;
    const receivedOtp = location.state?.receivedOtp;

    const [otp, setOtp] = useState("");
    const [password, setPassword] = useState("");

    useEffect(() => {
        if (receivedOtp) {
            alert(`(Test Mode) Your Reset OTP is: ${receivedOtp}`);
        }
    }, [receivedOtp]);

    const handleReset = async (e) => {

        e.preventDefault();

        if (!otp || !password) {
            alert("Please fill in all fields");
            return;
        }
        try {

            const res = await axios.post(
                `${import.meta.env.VITE_API_URL}/api/auth/reset-password`,
                {
                    email,
                    otp,
                    newPassword: password
                }
            );

            if (res.data.success) {
                alert("Password reset successful");
                navigate("/login");
            }

        } catch (error) {
            alert("Invalid OTP or expired");
        }
    };

    return (

        <div className="min-h-screen flex items-center justify-center bg-gray-100">

            <form
                onSubmit={handleReset}
                className="bg-white p-8 rounded-xl shadow-md w-96"
            >

                <h2 className="text-xl font-bold mb-6 text-center">
                    Reset Password
                </h2>

                <input
                    type="text"
                    placeholder="Enter OTP"
                    className="w-full mb-4 px-4 py-2 border rounded-lg"
                    onChange={(e) => setOtp(e.target.value)}
                />

                <input
                    type="password"
                    placeholder="New Password"
                    className="w-full mb-4 px-4 py-2 border rounded-lg"
                    onChange={(e) => setPassword(e.target.value)}
                />

                <button
                    className="w-full bg-black text-white py-2 rounded-lg"
                >
                    Reset Password
                </button>

            </form>

        </div>

    );
}

export default ResetPassword;