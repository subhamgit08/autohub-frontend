// import { useState } from "react"
// import { useNavigate } from "react-router-dom";

// function Login() {

//     const navigate = useNavigate();
//     const [form, setform] = useState({
//         email: "",
//         password: "",
//         isDealer: false,
//         dealerCode: "",
//     });
//     const handleLogin = async (e) => {
//         e.preventDefault()

//         try {
//             const response = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/login`, {
//                 method: "POST",
//                 headers: {
//                     "Content-Type": "application/json",
//                 },
//                 credentials: "include",
//                 body: JSON.stringify(form),
//             })

//             const data = await response.json()

//             if (response.ok) {
//                 alert("Login successful!")
//                 navigate("/dashboard");
//                 console.log(data)
//             } else {
//                 alert(data.message || "Login failed")
//             }

//         } catch (error) {
//             console.error(error)
//             alert("Server error")
//         }
//     }
//     return (
//         <div className="min-h-screen flex items-center justify-center bg-gray-100">
//             <form
//                 onSubmit={handleLogin}
//                 className="bg-white p-8 rounded-xl shadow-md w-96"
//             >
//                 <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>

//                 <input
//                     type="email"
//                     placeholder="Email"
//                     className="w-full mb-4 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
//                     onChange={(e) => setform({ ...form, email: e.target.value })}
//                 />

//                 <input
//                     type="password"
//                     placeholder="Password"
//                     className="w-full mb-6 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
//                     onChange={(e) => setform({ ...form, password: e.target.value })}
//                 />
                

//                 <input
//                     type="text"
//                     placeholder="Dealer Code"
//                     required={form.isDealer}
//                     className="w-full mb-4 px-4 py-2 border rounded-lg"
//                     onChange={(e) =>
//                         setform({ ...form, dealerCode: e.target.value })
//                     }
//                 />

//                 <button
//                     className="w-full bg-black text-white py-2 rounded-lg hover:bg-gray-800 transition cursor-pointer"
//                 >
//                     Login
//                 </button>

//                 <p
//                     onClick={() => navigate("/forgot-password")}
//                     className="text-sm text-blue-600 cursor-pointer mb-4 hover:underline mt-5"
//                 >
//                     Forgot Password?
//                 </p>

//                 <button
//                     type="button"
//                     onClick={() => navigate("/signup")}
//                     className="text-blue-700 cursor-pointer mt-2"
//                 >
//                     Don't have an account ? SignUp
//                 </button>
//             </form>
//         </div>
//     )
// }

// export default Login

import { useState } from "react"
import { useNavigate } from "react-router-dom";

function Login() {

    const navigate = useNavigate();

    const [loading, setLoading] = useState(false)

    const [form, setform] = useState({
        email: "",
        password: "",
        isDealer: false,
        dealerCode: "",
    });

    const handleLogin = async (e) => {
        e.preventDefault()

        if (loading) return
        setLoading(true)

        try {

            const response = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/login`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include",
                body: JSON.stringify(form),
            })

            const data = await response.json()

            if (response.ok) {
                alert("Login successful!")
                navigate("/dashboard");
            } else {
                alert(data.message || "Login failed")
            }

        } catch (error) {
            console.error(error)
            alert("Server error")
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">

            <form
                onSubmit={handleLogin}
                className="bg-white p-8 rounded-xl shadow-md w-96"
            >

                <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>

                <input
                    type="email"
                    placeholder="Email"
                    className="w-full mb-4 px-4 py-2 border rounded-lg"
                    onChange={(e) => setform({ ...form, email: e.target.value })}
                />

                <input
                    type="password"
                    placeholder="Password"
                    className="w-full mb-6 px-4 py-2 border rounded-lg"
                    onChange={(e) => setform({ ...form, password: e.target.value })}
                />

                <input
                    type="text"
                    placeholder="Dealer Code"
                    required={form.isDealer}
                    className="w-full mb-4 px-4 py-2 border rounded-lg"
                    onChange={(e) =>
                        setform({ ...form, dealerCode: e.target.value })
                    }
                />

                <button
                    type="submit"
                    disabled={loading}
                    className={`w-full py-2 rounded-lg flex items-center justify-center gap-2
                    ${loading
                        ? "bg-gray-500 cursor-not-allowed text-white"
                        : "bg-black text-white hover:bg-gray-800"}`
                    }
                >

                    {loading && (
                        <svg
                            className="animate-spin h-4 w-4"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                        >
                            <circle
                                className="opacity-25"
                                cx="12"
                                cy="12"
                                r="10"
                                stroke="white"
                                strokeWidth="4"
                            ></circle>

                            <path
                                className="opacity-75"
                                fill="white"
                                d="M4 12a8 8 0 018-8v8H4z"
                            ></path>
                        </svg>
                    )}

                    {loading ? "Logging in..." : "Login"}

                </button>

                <p
                    onClick={() => navigate("/forgot-password")}
                    className="text-sm text-blue-600 cursor-pointer mb-4 hover:underline mt-5"
                >
                    Forgot Password?
                </p>

                <button
                    type="button"
                    onClick={() => navigate("/signup")}
                    className="text-blue-700 cursor-pointer mt-2"
                >
                    Don't have an account ? SignUp
                </button>

            </form>

        </div>
    )
}

export default Login