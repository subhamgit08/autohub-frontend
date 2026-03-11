import { useEffect, useState } from "react"
import axios from "axios"
import CarCard from "../components/CarCard.jsx"

function CustomerDashboard({ user, setUser }) {

  const [activeTab, setActiveTab] = useState("market")

  const [cars, setCars] = useState([])
  const [purchases, setPurchases] = useState([])

  useEffect(() => {

    fetchCars()
    fetchPurchases()

  }, [])

  const fetchCars = async () => {

    try {

      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/cars/all`
      )

      setCars(res.data)

    } catch (err) {

      console.log(err)

    }

  }

  const fetchPurchases = async () => {

    try {

      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/cars/purchases`,
        { withCredentials: true }
      )

      setPurchases(res.data)

    } catch (err) {

      console.log(err)

    }

  }

  const fetchUser = async () => {

    try {

        const res = await axios.get(
            `${import.meta.env.VITE_API_URL}/api/auth/me`,
            { withCredentials: true }
        )

        setUser(res.data)

    } catch (err) {

        console.log(err)

    }

  }

  return (

    <div className="min-h-screen bg-gray-100">

      <div className="max-w-7xl mx-auto px-8 py-10">


        {/* TABS */}

        <div className="flex gap-6 mb-10">

          <button
            onClick={() => setActiveTab("market")}
            className={`px-6 py-2 rounded-lg font-medium 
                        ${activeTab === "market"
                ? "bg-black text-white"
                : "bg-white shadow"}`}>

            Market

          </button>

          <button
            onClick={() => setActiveTab("portfolio")}
            className={`px-6 py-2 rounded-lg font-medium 
                        ${activeTab === "portfolio"
                ? "bg-black text-white"
                : "bg-white shadow"}`}>

            My Garage

          </button>

        </div>


        {/* MARKET SECTION */}

        {activeTab === "market" && (

          <div>

            <h2 className="text-xl font-semibold mb-6">
              Available Cars
            </h2>

            {cars.length === 0 ? (

              <p className="text-gray-500">
                No cars available
              </p>

            ) : (

              <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-8">

                {cars.map((car) => (

                  <CarCard
                    key={car._id}
                    car={car}
                    user={user}
                    mode="market"
                    fetchCars={fetchCars}
                    fetchPurchases={fetchPurchases}
                    fetchUser={fetchUser}
                  />

                ))}

              </div>

            )}

          </div>

        )}


        {/* PORTFOLIO SECTION */}

        {activeTab === "portfolio" && (

          <div>

            <h2 className="text-xl font-semibold mb-6">
              My Cars
            </h2>

            {purchases.length === 0 ? (

              <p className="text-gray-500">
                You haven't bought any cars yet
              </p>

            ) : (

              <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-8">

                {purchases.map((purchase) => (

                  <CarCard
                    key={purchase._id}
                    car={purchase.car}
                    user={user}
                    mode="portfolio"
                    fetchPurchases={fetchPurchases}
                    fetchUser={fetchUser}
                  />

                ))}

              </div>

            )}

          </div>

        )}

      </div>

    </div>

  )

}

export default CustomerDashboard