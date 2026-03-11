import { useState } from "react"
import { useNavigate } from "react-router-dom"

function Signup() {
    const navigate = useNavigate()
    const [form, setForm] = useState({
        name: "",
        email: "",
        password: "",
        isDealer: false,
        dealerCode: "",
    })

    const handleSubmit = async (e) => {
        e.preventDefault()

        const submitData = {
            ...form,
            dealerCode: form.isDealer ? form.dealerCode : ""
        }

        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/signup`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(submitData),
            })

            const data = await response.json()

            if (response.ok) {
                alert("Signup successful!")
                navigate("/login")
            } else {
                alert(data.message)
            }

        } catch (error) {
            console.log(error)
            alert("Server error")
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">

            <form
                onSubmit={handleSubmit}
                className="bg-white p-8 rounded-xl shadow-md w-96"
            >
                <h2 className="text-2xl font-bold mb-6 text-center">Sign Up</h2>

                <input
                    type="name"
                    placeholder="Name"
                    required
                    className="w-full mb-4 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                />

                <input
                    type="email"
                    placeholder="Email"
                    required
                    className="w-full mb-4 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                />

                <input
                    type="password"
                    placeholder="Password"
                    required
                    className="w-full mb-6 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                    onChange={(e) => setForm({ ...form, password: e.target.value })}
                />

                <div className="mb-4">
                    <label className="mr-4">
                        <input
                            type="radio"
                            name="userType"
                            checked={!form.isDealer}
                            onChange={() => setForm({ ...form, isDealer: false })}
                        />
                        <span className="ml-2">Customer</span>
                    </label>

                    <label>
                        <input
                            type="radio"
                            name="userType"
                            checked={form.isDealer}
                            onChange={() => setForm({ ...form, isDealer: true })}
                        />
                        <span className="ml-2">Dealer</span>
                    </label>
                </div>

                {form.isDealer && (
                    <input
                        type="text"
                        placeholder="Dealer Code"
                        required={form.isDealer}
                        className="w-full mb-4 px-4 py-2 border rounded-lg"
                        onChange={(e) =>
                            setForm({ ...form, dealerCode: e.target.value })
                        }
                    />
                )}

                <button
                    type="submit"
                    className="w-full bg-black text-white py-2 rounded-lg hover:bg-gray-800 transition cursor-pointer"
                >
                    Create Account
                </button>

                <button
                    type="button"
                    onClick={()=>navigate("/login")}    
                    className="text-blue-700 cursor-pointer mt-2"
                >
                    Already have an account? Login
                </button>
            </form>

        </div>
    )
}

export default Signup
