import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import axios from "axios"

import DealerDashboard from "./DealerDashboard"
import CustomerDashboard from "./CustomerDashboard"


function Dashboard() {

    const [user, setUser] = useState(null)
    const navigate = useNavigate()

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/auth/me`, {
                    withCredentials: true
                });

                setUser(response.data);

            } catch (error) {
                console.error(error);
                if (error.response && error.response.status === 401) {
                    navigate("/login");
                } else {
                    navigate("/homepage");
                }
            }
        };

        fetchUser();
    }, [])

    const handleVerify = async () => {
        try {
            await axios.post(`${import.meta.env.VITE_API_URL}/api/auth/send-otp`, 
                {email: user.email},
                { withCredentials: true }
            );
            navigate("/verification", { state: { email } });
        } catch (error) {
            console.log(error);
            alert("Failed to send otp");
        }
    }

    const handleLogout = async () => {
        try {
            await fetch(`${import.meta.env.VITE_API_URL}/api/auth/logout`, {
                method: "POST",
                credentials: "include"
            })

            navigate("/")

        } catch (error) {
            console.error(error)
        }
    }

    if (!user) {
        return <div className="text-center mt-10">Loading...</div>
    }

    return (

        <div className="min-h-screen bg-gray-100">

            {/* NAVBAR */}
            <div className="bg-white shadow-sm border-b">

                <div className="max-w-7xl mx-auto px-8 py-4 flex justify-between items-center">

                    <h1 className="text-2xl font-bold text-gray-800">
                        {user.name}'s Dashboard
                    </h1>

                    <div className="flex items-center gap-4">

                        {!user.isVerified && (
                            <button
                                onClick={handleVerify}
                                className="px-4 py-2 text-sm rounded-lg text-white
                            bg-blue-600 hover:bg-blue-700 transition shadow-sm cursor-pointer"
                            >
                                Verify Account
                            </button>
                        )}

                        {user.isVerified && (
                            <span className="bg-green-100 text-green-700 text-sm px-3 py-1 rounded-full font-medium">
                                ✔ Verified
                            </span>
                        )}

                        {!user.isDealer && (
                            <div className="bg-gray-100 px-4 py-1 rounded-lg text-sm font-medium">
                                Wallet: ₹{user.walletBalance}
                            </div>
                        )}

                        <button
                            onClick={handleLogout}
                            className="bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition cursor-pointer"
                        >
                            Logout
                        </button>

                    </div>

                </div>

            </div>


            <div className="max-w-7xl mx-auto">

                {user.isDealer ? (

                    <DealerDashboard
                        user={user}
                    />

                ) : (

                    <CustomerDashboard
                        user={user}
                        setUser={setUser}
                    />

                )}

            </div>

        </div>

    )
}

export default Dashboard