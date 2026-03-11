import axios from "axios"

function CarCard({ car, fetchCars, fetchPurchases, fetchUser, handleEdit, user, mode }) {

    const handleDelete = async () => {

        if (!checkVerification()) return

        if (!window.confirm("Delete this car?")) return

        try {

            await axios.delete(
                `${import.meta.env.VITE_API_URL}/api/cars/delete/${car._id}`,
                { withCredentials: true }
            )

            fetchCars()

        } catch (error) {
            console.log(error)
        }
    }

    const handleEditClick = () => {

        if (!checkVerification()) return

        handleEdit(car)

    }

    const handleBuy = async () => {

        if (!checkVerification()) return

        try {

            await axios.post(
                `${import.meta.env.VITE_API_URL}/api/cars/buy/${car._id}`,
                {},
                { withCredentials: true }
            )

            alert("Car Purchased!")

            fetchCars?.()
            fetchPurchases?.()
            fetchUser?.()

        } catch (error) {

            alert(error.response?.data?.message)

        }

    }

    const handleSell = async () => {


        if (!checkVerification()) return

        try {

            await axios.post(
                `${import.meta.env.VITE_API_URL}/api/cars/sell/${car._id}`,
                {},
                { withCredentials: true }
            )

            alert("Car Sold!")

            fetchCars?.()
            fetchPurchases?.()
            fetchUser?.()

        } catch (error) {

            alert(error.response?.data?.message)

        }

    }

    const checkVerification = () => {

        if (!user.isVerified) {

            alert("Please verify your account to perform this action.");

            return false
        }

        return true
    }

    return (

        <div className="bg-white rounded-xl shadow overflow-hidden relative">

            <img
                src={car.image}
                alt={car.model}
                className="w-full h-44 object-cover"
            />

            <div className="p-4">

                <h2 className="font-bold text-lg">
                    {car.brand} {car.model}
                </h2>

                <p className="text-gray-500">
                    Year: {car.year}
                </p>

                <p className="text-green-600 font-semibold">
                    ₹ {car.price}
                </p>

                <div className="flex gap-2 mt-4">

                    {user?.isDealer && (
                        <>

                            <button
                                onClick={handleEditClick}
                                className="flex-1 bg-yellow-500 text-white py-1 rounded hover:bg-yellow-600 cursor-pointer">
                                Edit
                            </button>

                            <button
                                onClick={handleDelete}
                                className="flex-1 bg-red-500 text-white py-1 rounded hover:bg-red-600 cursor-pointer">
                                Delete
                            </button>

                        </>
                    )}

                    {!user?.isDealer && mode === "market" && (
                        <button
                            onClick={handleBuy}
                            className="flex-1 bg-blue-600 text-white py-1 rounded hover:bg-blue-700 cursor-pointer">

                            Buy Car

                        </button>

                    )}

                    {/* Portfolio Sell */}

                    {!user?.isDealer && mode === "portfolio" && (

                        <button
                            onClick={handleSell}
                            className="flex-1 bg-purple-600 text-white py-1 rounded hover:bg-purple-700 cursor-pointer">

                            Sell Car

                        </button>

                    )}
                </div>
            </div>

        </div>

    )
}

export default CarCard