import { useEffect, useState } from "react"
import axios from "axios"
import CarCard from "../components/CarCard.jsx"

function DealerDashboard({ user }) {

    const [cars, setCars] = useState([])
    const [showModal, setShowModal] = useState(false)
    const [image, setImage] = useState(null)
    const [editingCarId, setEditingCarId] = useState(null)
    const [loading, setLoading] = useState(false)
    const [closing, setClosing] = useState(false)

    const [formData, setFormData] = useState({
        brand: "",
        model: "",
        year: "",
        price: "",
    })

    useEffect(() => {
        fetchCars()
    }, [])

    const checkVerification = () => {

        if (!user.isVerified) {

            alert("Please verify your account to perform this action.");

            return false
        }

        return true
    }

    const fetchCars = async () => {
        try {
            const res = await axios.get(
                `${import.meta.env.VITE_API_URL}/api/cars/dealer`,
                { withCredentials: true }
            )
            setCars(res.data)
        } catch (err) {
            console.log(err)
        }
    }

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (loading) return

        setLoading(true)

        try {

            const data = new FormData()

            data.append("brand", formData.brand)
            data.append("model", formData.model)
            data.append("year", formData.year)
            data.append("price", formData.price)

            if (image) {
                data.append("image", image)
            }

            if (editingCarId) {

                await axios.put(
                    `${import.meta.env.VITE_API_URL}/api/cars/update/${editingCarId}`,
                    data,
                    {
                        withCredentials: true,
                        headers: { "Content-Type": "multipart/form-data" }
                    }
                )

            } else {

                await axios.post(
                    `${import.meta.env.VITE_API_URL}/api/cars/add`,
                    data,
                    {
                        withCredentials: true,
                        headers: { "Content-Type": "multipart/form-data" }
                    }
                )

            }

            fetchCars()

            setClosing(true)

            setTimeout(() => {
                setShowModal(false)
                setClosing(false)
            }, 200)

            setFormData({
                brand: "",
                model: "",
                year: "",
                price: ""
            })

            setImage(null)
            setEditingCarId(null)

        } catch (err) {
            console.log(err)
        } finally {
            setLoading(false)
        }
    }

    const handleEdit = (car) => {

        setFormData({
            brand: car.brand,
            model: car.model,
            year: car.year,
            price: car.price
        })

        setEditingCarId(car._id)
        setShowModal(true)
    }

    const resetForm = () => {
        setFormData({
            brand: "",
            model: "",
            year: "",
            price: ""
        })
        setImage(null)
        setEditingCarId(null)
    }

    return (

        <div className="min-h-screen bg-gray-100">


            <div className="max-w-7xl mx-auto px-8 py-10">

                {cars.length === 0 ? (

                    <div className="bg-white p-14 rounded-xl shadow text-center">

                        <h2 className="text-xl font-semibold text-gray-700 mb-2">
                            No Cars Listed
                        </h2>

                        <p className="text-gray-500">
                            Click the + button to add your first car
                        </p>

                    </div>

                ) : (

                    <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-8">

                        {cars.map((car) => (
                            <CarCard
                                key={car._id}
                                car={car}
                                user={user}
                                fetchCars={fetchCars}
                                handleEdit={handleEdit}
                            />
                        ))}

                    </div>

                )}

            </div>


            <button
                onClick={() => {
                    if (!checkVerification()) return
                    resetForm()
                    setShowModal(true)
                }}
                className="fixed bottom-8 right-8 bg-blue-600 hover:bg-blue-700 text-white
                w-16 h-16 rounded-full shadow-lg text-3xl flex items-center
                justify-center transition cursor-pointer"
            >
                +
            </button>


            {showModal && (

                <div
                    className={`fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center
        transition-opacity duration-200
        ${closing ? "opacity-0" : "opacity-100"}`}
                >

                    <div className="bg-white p-8 rounded-xl w-96 shadow-xl">

                        <h2 className="text-xl font-bold mb-6">
                            Add New Car
                        </h2>

                        <form onSubmit={handleSubmit} className="space-y-4">

                            <input
                                type="text"
                                name="brand"
                                placeholder="Brand"
                                value={formData.brand}
                                onChange={handleChange}
                                className="w-full border p-2 rounded"
                                required
                            />

                            <input
                                type="text"
                                name="model"
                                placeholder="Model"
                                value={formData.model}
                                onChange={handleChange}
                                className="w-full border p-2 rounded"
                                required
                            />

                            <input
                                type="number"
                                name="year"
                                placeholder="Year"
                                value={formData.year}
                                onChange={handleChange}
                                className="w-full border p-2 rounded"
                                required
                            />

                            <input
                                type="number"
                                name="price"
                                placeholder="Price"
                                value={formData.price}
                                onChange={handleChange}
                                className="w-full border p-2 rounded"
                                required
                            />

                            <input
                                type="file"
                                accept="image/*"
                                onChange={(e) => setImage(e.target.files[0])}
                            />

                            <div className="flex justify-end gap-3 pt-2">

                                <button
                                    type="button"
                                    onClick={() => setShowModal(false)}
                                    className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 cursor-pointer"
                                >
                                    Cancel
                                </button>

                                <button
                                    type="submit"
                                    disabled={loading}
                                    className={`px-4 py-2 rounded flex items-center justify-center gap-2
    transition-all duration-200 cursor-pointer
    ${loading
                                            ? "bg-blue-400 cursor-not-allowed"
                                            : "bg-blue-600 hover:bg-blue-700 text-white"}`}
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

                                    {loading ? "Adding..." : "Add Car"}

                                </button>

                            </div>

                        </form>

                    </div>

                </div>

            )}

        </div>

    )
}

export default DealerDashboard